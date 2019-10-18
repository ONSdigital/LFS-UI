import React, { Component, ChangeEvent } from 'react';
import { ONSTextInput } from './ONSTextInput';
import { ONSColumnOrder } from './ONSColumnOrder';
import { ONSPagination } from './ONSPagination';
import { ONSButton } from './ONSButton';
import { ONSCheckbox } from './ONSCheckbox';
import ReactModal from 'react-modal';

var Modal = require('react-bootstrap/Modal')

interface Props {
    Title : string,
    Data : Data | null,
    Headers?: Header[],
    Pagination : boolean,
    Steps?: number,
    pageChange? : (offset: number, steps: number) => void,
    Create? : boolean,
    CreateFunction? : (...props : any[]) => void
}

interface Header{
  label: string,
  column_name: string,
  filter: boolean,
  order: boolean,
  create? : boolean,
  onChange? : ((...props: any[]) => void) | undefined
}

interface State {
    Headers?: string[],
    customHeaders?: Header[],
    Data: Data | null,
    FilteredData: Data | null,
    ShowData: Data | null
    Filters : Filters,
    Pagination : boolean,
    Sort: Sort | null,
    showModal: boolean,
    payload? : Payload,
    offset: number,
}

interface Payload {
  [key: string] : any;
}

  interface Data{
    Rows : Row,
    Count : number
  }
  
  interface Row{
    [key: number]: Cell
  }
  
  interface Cell{
    [key: string]: object
  }

  interface Filters{
    [key: string] : string
  }

  interface Sort{
    column : string,
    type : "Asc" | "Desc"
  }

  interface ColumnSorts{
    [key : string] : ONSColumnOrder
  }

export class ONSTable extends Component <Props, State>{
  sortElements : ColumnSorts = {};
  constructor(props : Props) {
    super(props);
    this.state = {Data: null, FilteredData: null, ShowData: null, Filters: {}, Sort: null, Pagination: props.Pagination, showModal: false, offset: 0}
  }

  pageChange = (offset: number, steps: number) => {
    if(this.props.pageChange){
      this.setState({offset: offset});
      this.props.pageChange(offset, steps)
    }
  }


  componentWillReceiveProps(newProps: Props){
        if(newProps.Data != null){
            this.setState({
              Headers: Object.keys(newProps.Data.Rows[0]), 
              customHeaders: newProps.Headers,
              Data: JSON.parse(JSON.stringify(newProps.Data)),
              FilteredData: JSON.parse(JSON.stringify(newProps.Data)),
              ShowData: JSON.parse(JSON.stringify(newProps.Data))
            })
        }
  }

  closeModal = () => {
    this.setState({showModal:false, payload: undefined})
  }

  saveChanges = () => {
    if(this.props.CreateFunction) this.props.CreateFunction(this.state.payload);
    this.closeModal();
  }

  updatePayload = (e: ChangeEvent<HTMLInputElement>, property: string) => {
    let payload = this.state.payload;
    if(!payload) payload = {};
    payload[property] = e.target.value;
    this.setState({payload:payload})
  }
  
  openModal = () => this.setState({showModal:true})

  modal = () => {
    if(this.state.customHeaders)
    return(
      // Modal was messinhg with the submit button so we made our own and its wayyy cooler
      <ReactModal 
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"        
          className='Modal'
          shouldFocusAfterRender={true}
          shouldReturnFocusAfterClose={true}
      >
        <h1>Add User</h1>
        {this.state.customHeaders.map((header, index) =>
          {return header.create === true &&
          <ONSTextInput label={header.label} onChange={this.updatePayload}/>}
        )}
      <hr/>
      <h2/>
        <ONSButton primary={true} small={false} label={" Save "} onClick={this.saveChanges}/> 
        <ONSButton label="Cancel" small={false} primary={false} onClick={this.closeModal}/>
      </ReactModal>
    );
    }

  format = (x : object, column: string|null, row: number|null, passedChange : ((e: ChangeEvent<HTMLInputElement>, ...props: any[]) => void) | undefined) =>{ 
    if(typeof(x) === "boolean"){
      return(<ONSCheckbox checked={x} id={column+"_"+row} onChange={(e:any, onChange : ((e: ChangeEvent<HTMLInputElement>, ...props: any[]) => void) | undefined, ...props: any[]) => this.onChange(e, passedChange, row, column, typeof(x))}/>)
    }
    if(typeof(x) === "object"){
        let y = x as object[];
        let toReturn = "";
        y.forEach(z => {
            toReturn += String(z) + ","
        })
        return toReturn;
    }
    return x;
  }

  onChange = (e: any, onChange : ((e: ChangeEvent<HTMLInputElement>, ...props: any[]) => void) | undefined, row: number | null, column: string | null, type: string) => {
    if(onChange !== undefined){
      onChange(e, row, column, this.state.offset)
    }
  }

  filter = (e: ChangeEvent<HTMLInputElement>, column: string) => {
    let filters = this.state.Filters;
    filters[column] = e.target.value;
    this.applyFilters(filters)
  }

  sort = (column: string, dir: "Asc" | "Desc" | null) => {
    if(dir === null){
      this.setState({ShowData : JSON.parse(JSON.stringify(this.state.FilteredData))})
      return
    }
    let sort = {
      column : column,
      type: dir 
    }
    this.sortData(sort)
  } 

  sortData = (sort: Sort) => {
    let data = JSON.parse(JSON.stringify(this.state.FilteredData));
    if(data === null){
      return;
    }
    if(this.state.Sort !== null){
      if(sort.column !== this.state.Sort.column){
        this.sortElements[this.state.Sort.column].setState({desc: true, asc: true, sort: false});
      }
    }
    let rows = data.Rows as Cell[];
    rows.sort((a,b) =>
    {
      if(a[sort.column] < b[sort.column]){
        if(sort.type === "Asc") return -1;
        else return 1
      }
      if (a[sort.column] > b[sort.column]) {
        if(sort.type === "Asc") return 1;
        else return -1
      }
      return 0;
    });
    data.Rows = rows;
    this.setState({ShowData: data, Sort: sort})

  }

  applyFilters = (filters : Filters) => {
    let data = JSON.parse(JSON.stringify(this.state.Data));
    if(filters === null || data === null){
      return;
    }
    let rows = data.Rows as Cell[];
    Object.keys(filters).forEach(column => {
      rows = rows.filter(x => String(x[column]).includes(filters[column]))
    });
    data.Rows = rows;
    this.setState({FilteredData: data, Filters: filters, ShowData: JSON.parse(JSON.stringify(data))});
  }

  getCustomHeader = (header: Header) => {
    return(
      <th scope="col" className="table__header " aria-sort="none">
        {header.label}
        {header.order &&
        <ONSColumnOrder ref={(input : ONSColumnOrder) => { this.sortElements[header.column_name] = input }} onClick={( e: "Asc" | "Desc" | null) => this.sort(header.column_name, e)}/>
        }
        {header.filter &&
          [<br/>, <ONSTextInput fit={true} placeholder={"Filter by "+header.label} onChange={(e) => this.filter(e, header.column_name)}/>]
        }
      </th>
    )
  }

  genericTable = () => {
    if(this.state.ShowData === null || this.state.Headers === undefined || this.state.Data === null){
      return;
    }
    let headers = this.state.Headers;
    let rows = this.state.ShowData.Rows;
    return(
      <div>
        <table style={{fontSize:"14px"}} className="table  table--sortable" data-aria-sort="Sort by" data-aria-asc="ascending" data-aria-desc="descending">
            <caption className="table__caption">{this.props.Title}</caption>
            <thead className="table__head">
            <tr className="table__row">
                {headers.map((header, index) =>
                    <th scope="col" className="table__header " aria-sort="none">{header}</th>
                )}
            </tr>
            </thead>
            <tbody className="table__body">
                {Object.keys(this.state.ShowData.Rows).map((row, index) =>
                    <tr className="table__row">
                        {headers.map((header, index) =>
                        <td className="table__cell ">{this.format(rows[parseInt(row)][header], header, parseInt(row), undefined)}</td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
        {this.state.Pagination && this.props.pageChange !== undefined && this.props.Steps !== undefined &&
          <ONSPagination steps={this.props.Steps} count={this.state.Data.Count} pageChange={this.pageChange}/>
        }
      </div>
    );
  }

  getCreateElement = () => {
    if(this.props.CreateFunction !== undefined){
      return(
        <div style={{marginLeft:"10px", display:"inline-block"}}>
          <ONSButton primary={false} small={true} label="Add Row" onClick={this.openModal}/>
        </div>
      )
    }
  }

  customTable = () => {
    if(this.state.ShowData === null || this.state.customHeaders === undefined || this.state.Data === null){
      return;
    }
    let headers = this.state.customHeaders;
    let rows = this.state.ShowData.Rows;
    return(
      <div>
        <table style={{fontSize:"14px"}} className="table  table--sortable" data-aria-sort="Sort by" data-aria-asc="ascending" data-aria-desc="descending">
            <caption className="table__caption">{this.props.Title} {this.getCreateElement()}</caption>
            <thead className="table__head">
            <tr className="table__row">
                {headers.map((header, index) =>
                    {return this.getCustomHeader(header)}
                )}
            </tr>
            </thead>
            <tbody className="table__body">
                {Object.keys(this.state.ShowData.Rows).map((row, index) =>
                    <tr className="table__row">
                        {headers.map((header, index) =>
                        <td className="table__cell ">{this.format(rows[parseInt(row)][header.column_name], header.column_name, parseInt(row), header.onChange)}</td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
        {this.state.Pagination && this.props.pageChange !== undefined && this.props.Steps !== undefined &&
          <ONSPagination steps={this.props.Steps} count={this.state.Data.Count} pageChange={this.pageChange}/>
        }
      </div>
    );
  }

    render() {
        if(this.state.Data != null && this.state.Headers){
            if(this.state.customHeaders !== undefined){
              return(
                [this.modal(),
                this.customTable()]
              )
            }else{
              return (
                [this.modal(),
                this.genericTable()]
              );
            }
        }else{
            return(
                <p>"Loading..."</p>
            );
        }
    }
}

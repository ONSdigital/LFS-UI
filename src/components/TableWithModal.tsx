import React, {ChangeEvent, Component} from "react";
import ReactModal from 'react-modal';
import {ONSTextInput} from './ONSTextInput';
import {ONSButton} from './ONSButton';
import {ONSTable} from './ONSTable';
import {batchHeaders, uploadHeaders, userHeaders} from '../utilities/Headers'

interface Props {
    CreateFunction? : (...props : any[]) => void
    table : String
    returnedData?: Data | null,
    summaryOpen?: boolean | null
}

interface State {
    customHeaders?: Header[],
    showSaveModal: boolean,
    showSummaryModal: boolean,
    showUploadModel: boolean
    payload? : Payload,
    UploadsData: Data | null
    UploadStatusData: Data |null
    Users: Data | null
    UserData: Data | null
}

interface Header{
    label: string,
    column_name: string,
    filter: boolean,
    order: boolean,
    create? : boolean,
    onChange? : ((...props: any[]) => void) | undefined
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

export class TableWithModal extends Component <Props, State> {
    constructor(props : Props) {
        super(props);
        let data = null;
        if (this.props.table === "batch" && this.props.returnedData !== null) {
            data = (this.props.returnedData ? this.props.returnedData : null)
        }
        this.state = {showSaveModal: false, showSummaryModal: (this.props.summaryOpen ? true : false), showUploadModel: false, UploadsData: data, UploadStatusData: null, Users: null, UserData: null};
        this.getUploads();
        this.getUploadStatuses();
        this.getUsers();
    }

    static getDerivedStateFromProps(newProps: Props) {
        if (newProps.returnedData !== undefined) {
            return {UploadsData: newProps.returnedData};
        } else return null;
    }
    
    //summary modal functions
    openSummaryModal = () => this.setState({showSummaryModal:true});
   
    closeSummaryModal = () => this.setState({showSummaryModal:false});

    //Upload modal functions
    openUploadModal = () => this.setState({showUploadModel: true});

    closeUploadModal = () => this.setState({showUploadModel: false});

    setMockUploadData = (response: any) => {
            this.setState({UploadsData: response})
        };
    
    setMockUploadStatusData = (response: any) => {
        this.setState({UploadStatusData: response})
    };

    getUploads = () => {
        fetch('/jsons/Sources.json')
            .then(response => response.json())
            .then(response => this.setMockUploadData(response))
    };

    getUploadStatuses = () => {
        fetch('/jsons/Upload_Statuses.json')
            .then(response => response.json())
            .then(response => this.setMockUploadStatusData(response))
        };
    
    acceptLoad = () => {
        console.log("Load Accepted");
        this.closeSummaryModal()
    };
    
    rejectLoad = () => {
        console.log("Load Rejected");
        this.closeSummaryModal()
    };

    //save modal functions
    openSaveModal = () => {
        console.log("=============");
        this.setState({showSaveModal:true});
    };

    closeSaveModal = () => {
        this.setState({showSaveModal:false, payload: undefined})
    };

    getUsers = () => {
        fetch('/jsons/Users.json')
            .then(response => response.json())
            .then(response => this.setMockUserData(response))
        };
    
    setMockUserData = (response: any) => {
        let users = response.Rows as object[];
        users = users.slice(0, 20);
        this.setState({UserData: response, Users: {Rows: users as any, Count: response.Count}})
    };

    saveChanges = () => {
            if(this.props.CreateFunction) this.props.CreateFunction(this.state.payload);
            this.closeSaveModal();
    };
        
    updatePayload = (e: ChangeEvent<HTMLInputElement>, property: string) => {
        let payload = this.state.payload;
        if(!payload) payload = {};
        payload[property] = e.target.value;
        this.setState({payload:payload})
    };

    createUser = (payload : any) => {
            console.log(payload)
    };

    mockUsers = (offset: number, steps: number) => {
        if(this.state.UserData !== null){
            let users = this.state.UserData.Rows as object[];
            users = users.slice(offset, offset+steps);
            this.setState({Users: {Rows: users as any, Count: this.state.UserData.Count}});
        }
    };

    //modals and tables
    saveModal = () => {
        if(this.state.showSaveModal){
        return(
          // Modal was messinhg with the submit button so we made our own and its wayyy cooler
          <ReactModal 
              isOpen={this.state.showSaveModal}
              contentLabel="Minimal Modal Example"        
              className='Modal'
              shouldFocusAfterRender={true}
              shouldReturnFocusAfterClose={true}
          >
            <h1>Add User</h1>
            {userHeaders().map((header) =>
              {return header.create === true &&
              <ONSTextInput label={header.label} onChange={this.updatePayload}/>}
            )}
            <ONSButton primary={true} small={false} label={" Save "} onClick={this.saveChanges}/> 
            <ONSButton label="Cancel" small={false} primary={false} onClick={this.closeSaveModal}/>
          </ReactModal>
        );}
    };

    summaryModal = () => {
        if(this.state.showSummaryModal)
            return(<ReactModal
                    isOpen={this.state.showSummaryModal}
                    contentLabel="Minimal Modal Example"
                    className='Modal'
                    shouldFocusAfterRender={true}
                    shouldReturnFocusAfterClose={true}
                    ariaHideApp={false}>
                    <div>
                        <ONSTable Data={this.state.UploadStatusData} Title="File Upload Status 2" Headers={uploadHeaders()} Pagination={false}/>
                        <ONSButton label="Export / View Report" primary={false} small={false}/>
                    </div>
                    <br/>
                    <div>
                        <ONSButton label="Accept" primary={true} small={false} onClick={this.acceptLoad}/>
                        <ONSButton label="Reject" primary={false} small={false} onClick={this.rejectLoad} marginRight={155}/>
                        <ONSButton label="Close" primary={false} small={false} onClick={this.closeSummaryModal}/>
                    </div>
                </ReactModal>
            )
    };

    uploadModel = () => {
        if(this.state.showUploadModel)
            return(<ReactModal
                    isOpen={this.state.showUploadModel}
                    contentLabel="Minimal Modal Example"
                    className='Modal'
                    shouldFocusAfterRender={true}
                    shouldReturnFocusAfterClose={true}
                    ariaHideApp={false}>

                    <div>
  <div className="text-right">
                        <button type="button" className="close" aria-label="Close" onClick={this.closeUploadModal}>
                            <span >&times;</span>
                        </button>  </div>
{/* <ONSButton label="Close" primary={false} small={false} onClick={this.closeUploadModal}/> */}

                        {/*<SurveyFileUpload period={'18'} year={'2014'} surveyType={'gb'}/>*/}
                    </div>
                    <br/>
                    <div>
                    </div>
                </ReactModal>
            )
    };

    table = ()  => {
        let Table = this.props.table;

        if(Table === "batch") return <ONSTable Data={this.state.UploadsData} Title="File Upload Status" Headers={batchHeaders} Pagination={false} openModal={this.openSummaryModal}/>;
        if(Table === "admin") return <ONSTable Data={this.state.Users} Title="Users" CreateFunction={this.createUser} Headers={userHeaders()} Pagination={true} Steps={20} pageChange={this.mockUsers} openModal={this.openSaveModal}/>
    };

    render(){
        return(
            <>
                {[this.saveModal(),
                this.summaryModal(),
                this.uploadModel()]}
                <>
                    {this.table()}
                </>
            </>
        )    
    }
}
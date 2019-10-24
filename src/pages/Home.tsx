import React, { Component } from 'react';
import { ONSPanel } from '../components/ONSPanel';
import { ONSTextInput } from '../components/ONSTextInput';
import { ONSUpload } from '../components/ONSUpload';
import {ONSTable} from "../components/ONSTable";
import {ONSAccordionTable} from "../components/ONSAccordionTable";

interface State {
    Outputs: Data | null,
    OutputData : Data | null
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

export class Home extends Component <{}, State> {
  displayName = Home.name;

    constructor(props: any) {
        super(props);
        this.state = {Outputs: null, OutputData: null}
        this.getOutputs();
    }

    getOutputs = () => {
        fetch('/jsons/MOCK_RUNS.json')
            .then(response => response.json())
            .then(response => this.setMockOutputData(response))
    }

    setMockOutputData = (response: any) => {
        //-------Delete this when using api
        let outputs = response.Rows as object[];
        outputs = outputs.slice(0, 20)
        this.setState({OutputData: response, Outputs: {Rows: outputs as any, Count: response.Count}})
    }

    mockOutputs = (offset: number, steps: number) => {
        //-------Use fetch method to api here to get from DB
        if(this.state.OutputData !== null){
            let outputs = this.state.OutputData.Rows as object[];
            outputs = outputs.slice(offset, offset+steps)
            this.setState({Outputs: {Rows: outputs as any, Count: this.state.OutputData.Count}});
        }
    }


    outputHeaders = () => {
        let headers = [];
        headers.push(
            {
                label: "Batch ID",
                column_name: "BatchID",
                filter: false,
                order: false,
            },
            {
                label: "Batch Type",
                column_name: "batchtype",
                filter: false,
                order: false,
            },
            {
                label: "Period",
                column_name: "period",
                filter: false,
                order: false,
                onChange: this.fullChange
            },
            {
                label: "Year",
                column_name: "year",
                filter: false,
                order: false,
                onChange: this.fullChange
            },
            {
                label: "Status",
                column_name: "status",
                filter: false,
                order: false,
                onChange: this.fullChange
            }
        );
        return(
            headers
        );
    };

    singleChange = (e: any, row: number, column: string, offset: number) => {
        console.log("single change")
    }

    fullChange = (e: any, row: number, column: string, offset: number) => {
        console.log("full change")
    }


    render() {
        return (
            <div className="container">
                <div id="accordion" className="accordion">
                    <button type="button"
                            className="btn btn--secondary btn--small js-collapsible-all u-wa--@xs u-mb-s u-d-no"
                            data-close-all="Hide all" data-group="accordion">
                        <span className="btn__inner js-collapsible-all-inner">Show all</span>
                    </button>
                    <details id="accordion-1" className="details js-collapsible details--accordion" open
                             data-btn-close="Hide" data-group="accordion">
                        <summary className="details__summary js-collapsible-summary">
                            <div className="details__heading">
                                <span className="details__title u-fs-r--b">Total retail turnover</span>
                                <button type="button"
                                        className="btn details__btn btn--secondary btn--small js-collapsible-button u-d-no u-d-no@xs@s">
                                    <span className="btn__inner js-collapsible-button-inner">Show</span>
                                </button>
                            </div>
                        </summary>
                        <div id="accordion-1-content" className="details__content js-collapsible-content">
                            <h3 className="u-fs-r">Include:</h3>
                            <ul className="list">
                                <li className="list__item">VAT</li>
                                <li className="list__item">internet sales</li>
                                <li className="list__item">retail sales from outlets in Great Britain to <a href="#">customers
                                    abroad</a></li>
                            </ul>
                            <h3 className="u-fs-r">Exclude:</h3>
                            <ul className="list">
                                <li className="list__item">revenue from mobile phone network commission and top-up</li>
                                <li className="list__item">sales from catering facilities used by customers</li>
                                <li className="list__item">lottery sales and commission from lottery sales</li>
                                <li className="list__item">sales of car accessories and motor vehicles</li>
                                <li className="list__item">NHS receipts</li>
                                <li className="list__item">automotive fuel</li>
                            </ul>
                        </div>
                    </details>
                    <details id="accordion-2" className="details js-collapsible details--accordion" open
                             data-btn-close="Hide" data-group="accordion">
                        <summary className="details__summary js-collapsible-summary">
                            <div className="details__heading">
                                <span className="details__title u-fs-r--b">Food sales</span>
                                <button type="button"
                                        className="btn details__btn btn--secondary btn--small js-collapsible-button u-d-no u-d-no@xs@s">
                                    <span className="btn__inner js-collapsible-button-inner">Show</span>
                                </button>
                            </div>
                        </summary>
                        <div id="accordion-2-content" className="details__content js-collapsible-content">
                            <h3 className="u-fs-r">Include:</h3>
                            <ul className="list">
                                <li className="list__item">all fresh food</li>
                                <li className="list__item">other food for human consumption (except chocolate and sugar
                                    confectionery)
                                </li>
                                <li className="list__item">soft drinks</li>
                            </ul>
                            <h3 className="u-fs-r">Exclude:</h3>
                            <ul className="list">
                                <li className="list__item">sales from catering facilities used by customers</li>
                            </ul>
                        </div>
                    </details>
                    <details id="accordion-3" className="details js-collapsible details--accordion" open
                             data-btn-close="Hide" data-group="accordion">
                        <summary className="details__summary js-collapsible-summary">
                            <div className="details__heading">
                                <span className="details__title u-fs-r--b">Alcohol, confectionery, soft drinks and tobacco sales</span>
                                <button type="button"
                                        className="btn details__btn btn--secondary btn--small js-collapsible-button u-d-no u-d-no@xs@s">
                                    <span className="btn__inner js-collapsible-button-inner">Show</span>
                                </button>
                            </div>
                        </summary>
                        <div id="accordion-3-content" className="details__content js-collapsible-content">
                            <h3 className="u-fs-r">Include:</h3>
                            <ul className="list">
                                <li className="list__item">chocolate and sugar confectionery</li>
                                <li className="list__item">tobacco and smokers’ requisites</li>
                            </ul>
                        </div>
                    </details>
                </div>


                <div className="container">
                    <ONSAccordionTable Data={this.state.Outputs} Title="Recent Batches" Headers={this.outputHeaders()} Pagination={true} Steps={20} pageChange={this.mockOutputs}/>
                </div>
            </div>

        );
    }
}


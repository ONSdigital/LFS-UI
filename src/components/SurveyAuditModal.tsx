import React, {Component} from 'react';
import {ONSMetadata} from "./ONS_DesignSystem/ONSMetadata";
import {ONSButton} from "./ONS_DesignSystem/ONSButton";
import ReactModal from "react-modal";
import {getSurveyAudit} from "../utilities/http";
import {monthNumberToString} from "../utilities/Common_Functions";

interface Props {
    week: string
    month: string
    year: string
    surveyType: string
    closeSummaryModal: any
    modelOpen: boolean
}

interface State {
    batchFound: boolean
    summaryOpen: boolean
    uploadType: string
    importAudit: any
    metaData: Array<MetaDataListItem>
}

interface MetaDataListItem {
    R: string
    L: string
}

export class SurveyAuditModal extends Component <Props, State> {

    constructor(props: any) {
        super(props);

        this.state = {
            metaData: [],
            batchFound: true,
            summaryOpen: false,
            uploadType: "",
            importAudit: null,
        };
    }

    componentDidMount(): void {
        this.getSurveyImportAudit(this.props.week, this.props.month, this.props.surveyType)
    }

    getSurveyImportAudit = (week: string, month: string, type: string) => {
        getSurveyAudit(type, this.props.year, (type === 'GB' ? week : month))
            .then(r => {
                if (r !== undefined && r.length !== 0) {
                    this.setState({importAudit: r[0]})
                } else {
                    this.setState({importAudit: null})
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    acceptLoad = () => {
        console.log("Load Accepted");
        this.props.closeSummaryModal()
    };

    rejectLoad = () => {
        console.log("Load Rejected");
        this.props.closeSummaryModal()
    };

    summaryTitle = () => {
        let period = monthNumberToString(+this.props.month);
        if (this.props.surveyType === "GB") {
            period = "Week " + this.props.week;
        }

        return "Import Summary " + this.props.surveyType + " " + period
    };

    summaryMetaData() {
        console.log(this.state.importAudit);
        if (this.state.importAudit !== null) {
            return (
                [{
                    L: "Variables in File",
                    R: this.state.importAudit.numVarFile,
                }, {
                    L: "Variables Uploaded",
                    R: this.state.importAudit.numVarLoaded,
                }, {
                    L: "Observations in File",
                    R: this.state.importAudit.numObFile,
                }, {
                    L: "Observations Uploaded",
                    R: this.state.importAudit.numObLoaded,
                },
                ]
            )
        } else {
            return (
                [{
                    L: "Error",
                    R: "Error Occurred when getting Surrey Audit"
                }
                ]
            )
        }
    }

    render() {
        return (
            <ReactModal
                isOpen={this.props.modelOpen}
                contentLabel="Minimal Modal Example"
                className='Modal'
                shouldFocusAfterRender={true}
                shouldReturnFocusAfterClose={true}
                ariaHideApp={false}>
                <h3>{this.summaryTitle()}</h3>
                <div>
                    <ONSMetadata List={this.summaryMetaData()} LSpacing="9" RSpacing="2"/>
                    <ONSButton label="Export / View Report" primary={false} small={false}/>
                </div>
                <br/>
                <div>
                    <ONSButton label="Accept" primary={true} small={false} onClick={this.acceptLoad}/>
                    <ONSButton label="Reject" primary={false} small={false} onClick={this.rejectLoad}
                               marginRight={155}/>
                    <ONSButton label="Close" primary={false} small={false} onClick={this.props.closeSummaryModal}/>
                </div>
            </ReactModal>
        );
    }
}

import React, {Component} from "react";
import {ONSButton} from "../../components/ONS_DesignSystem/ONSButton";
import ReactModal from "react-modal";
import dateFormatter from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import {ReportExport} from "../../components/ReportExport";
import {ONSPanel} from "../../components/ONS_DesignSystem/ONSPanel";

dateFormatter.extend(advancedFormat);

interface Props {
    importName: string
    fileName: string
    closeSummaryModal: any
    modalOpen: boolean
    reloadBatchData: Function
    uploadLink: string
    reportFileType: string
}

interface State {
    batchFound: boolean
    summaryOpen: boolean
    uploadType: string
    importAudit: any
    metaData: Array<MetaDataListItem>
    panel: Panel
}

interface Panel {
    label: string,
    visible: boolean
    status: string
}

interface MetaDataListItem {
    R: string
    L: string
}

export class BulkAmendmentsModal extends Component <Props, State> {

    constructor(props: any) {
        super(props);

        this.state = {
            metaData: [],
            batchFound: true,
            summaryOpen: false,
            uploadType: "",
            importAudit: null,
            panel: {
                label: "",
                visible: false,
                status: "info"
            }
        };
    }

    componentDidMount(): void {
        // this.getSurveyImportAudit(this.props.week, this.props.month, this.props.surveyType);
    }

    // getSurveyImportAudit = (week: string, month: string, type: string) => {
    //     getSurveyAudit(type, this.props.year, (type === "GB" ? week : month))
    //         .then(r => {
    //             if (r !== undefined && r.length !== 0) {
    //                 this.setState({importAudit: r[0]});
    //             } else {
    //                 this.setState({importAudit: null});
    //             }
    //         })
    //         .catch(error => {
    //             (isDevEnv() && console.log(error));
    //         });
    // };
    //
    // sendSurveyAuditResponse = (accept: boolean) => {
    //     surveyAuditResponse(this.props.surveyType, (accept ? "accept" : "reject"), this.props.year, (this.props.surveyType === "GB" ? this.props.week : this.props.month))
    //         .then(() => {
    //             this.props.reloadBatchData();
    //         });
    // };

    acceptLoad = () => {
        // this.sendSurveyAuditResponse(true);
        this.props.closeSummaryModal();
    };

    rejectLoad = () => {
        // this.sendSurveyAuditResponse(false);
        this.props.closeSummaryModal();
    };

    summaryTitle = () => {

        return;
    };

    setPanel = (message: string, status: string, visible: boolean = true) => {
        this.setState({
            panel: {
                label: message,
                visible: visible,
                status: status
            }
        });
    };

    // TODO: Waiting for returned data
    // summaryMetaData() {
    //     if (this.state.importAudit !== null) {
    //         return (
    //             [{
    //                 L: "Reference Date",
    //                 R: dateFormatter(this.state.importAudit.referenceDate).format("Do MMMM YYYY")
    //             }, {
    //                 L: "Variables in File",
    //                 R: this.state.importAudit.numVarFile
    //             }, {
    //                 L: "Variables Uploaded",
    //                 R: this.state.importAudit.numVarLoaded
    //             }, {
    //                 L: "Observations in File",
    //                 R: this.state.importAudit.numObFile
    //             }, {
    //                 L: "Observations Uploaded",
    //                 R: this.state.importAudit.numObLoaded
    //             }
    //             ]
    //         );
    //     } else {
    //         return (
    //             [{
    //                 L: "Error",
    //                 R: "Error Occurred when getting Surrey Audit"
    //             }
    //             ]
    //         );
    //     }
    // }

    render() {
        return (
            <ReactModal
                isOpen={this.props.modalOpen}
                contentLabel="Minimal Modal Example"
                className='Bigger-Modal'
                shouldFocusAfterRender={true}
                shouldReturnFocusAfterClose={true}
                ariaHideApp={false}>
                <div className="Modal-Content">
                    <h3>{this.props.importName}</h3>
                    {
                        this.state.panel.visible &&
                        <>
                            <ONSPanel status={this.state.panel.status} label={this.state.panel.label}>
                                <p>{this.state.panel.label}</p>
                            </ONSPanel>
                            <br/>
                        </>
                    }
                    {/*<div>*/}
                    {/*    <ONSMetadata List={this.summaryMetaData()} LSpacing="6" RSpacing="5"/>*/}
                    {/*    <ONSButton label="Export / View Report" primary={false} small={false}/>*/}
                    {/*</div>*/}
                    {/*<br/>*/}
                    {/*{*/}
                    {/*    this.props.status === 1 || this.props.status === 2 ?*/}
                    {/*<ReportExport hidden={false} setPanel={this.setPanel}*/}
                    {/*              importName={this.state.uploadLink}/>*/}

                    <ReportExport hidden={false}
                                  setPanel={this.setPanel}
                                  importName={this.props.uploadLink}
                                  reportFileType={this.props.reportFileType}/>

                    {/*        :*/}
                    {/*        <ONSButton label="Close" primary={false} small={false} onClick={this.props.closeSummaryModal}/>*/}
                    {/*}*/}
                </div>
                <footer className="Modal-Footer">
                    <ONSButton label="Accept" primary={true} small={false} onClick={this.acceptLoad}/>
                    <ONSButton label="Reject" primary={false} small={false} onClick={this.rejectLoad}
                               marginRight={255}/>
                    <ONSButton label="Close" primary={false} small={false}
                               onClick={this.props.closeSummaryModal}/>
                </footer>
            </ReactModal>
        );
    }
}

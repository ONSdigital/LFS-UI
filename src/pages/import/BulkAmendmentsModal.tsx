import React, {Component} from "react";
import {ONSButton} from "../../components/ONS_DesignSystem/ONSButton";
import ReactModal from "react-modal";
import dateFormatter from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import {ONSPanel} from "../../components/ONS_DesignSystem/ONSPanel";
import {ONSAccordionTable} from "../../components/ONS_DesignSystem/ONSAccordionTable";
import {AMENDMENT_HEADERS} from "../../utilities/Headers";

dateFormatter.extend(advancedFormat);

interface Props {
    importName: string
    fileName: string
    closeSummaryModal: any
    modalOpen: boolean
    reloadBatchData: Function
    uploadLink: string
    reportFileType: string
    amendments: any[]
    panel: Panel
}

interface Panel {
    label: string,
    visible: boolean
    status: string
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

interface AmendmentItem {
    caseNo: string
    found: boolean
    refDate: string
    variable: string
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
            panel: props.panel
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

    setPanel = (message: string, status: string, visible: boolean = true) => {
        this.setState({
            panel: {
                label: message,
                visible: visible,
                status: status
            }
        });
    };

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
                    <ONSAccordionTable Headers={AMENDMENT_HEADERS}
                                       data={this.props.amendments}
                                       Row={amendmentItemTableRow}
                                       expandedRowEnabled={false}
                                       noDataMessage={"No Amendments Errors Found"}
                                       pagination={true}
                                       paginationSize={6}/>
                    {/*<ReportExport hidden={false}*/}
                    {/*              setPanel={this.setPanel}*/}
                    {/*              importName={this.props.uploadLink}*/}
                    {/*              reportFileType={this.props.reportFileType}/>*/}
                </div>
                <footer className="Modal-Footer">
                    <ONSButton label="Accept" primary={true} small={false} onClick={this.acceptLoad}/>
                    <ONSButton label="Reject" primary={false} small={false} onClick={this.rejectLoad}
                               marginRight={355}/>
                    <ONSButton label="Close" primary={false} small={false}
                               onClick={this.props.closeSummaryModal}/>
                </footer>
            </ReactModal>
        );
    }
}

const amendmentItemTableRow = (rowData: any) => {
    let row: AmendmentItem = rowData.row;
    return (
        <>
            <td className="table__cell ">
                {row.caseNo}
            </td>
            <td className="table__cell ">
                {row.variable}
            </td>

            <td className="table__cell ">
                {row.found ? "Yes" : "No"}
            </td>
            <td className="table__cell ">
                {row.refDate}
            </td>

        </>
    );
};

import React, {Component} from "react";
import {ONSButton} from "../../components/ONS_DesignSystem/ONSButton";
import ReactModal from "react-modal";
import dateFormatter from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import {ONSPanel} from "../../components/ONS_DesignSystem/ONSPanel";
import {ONSAccordionTable} from "../../components/ONS_DesignSystem/ONSAccordionTable";
import {AMENDMENT_HEADERS} from "../../utilities/Headers";
import XLSX from "xlsx";


dateFormatter.extend(advancedFormat);

interface Props {
    importName: string
    fileName: string
    closeBulkAmendmentsModal: any
    modalOpen: boolean
    amendmentsResponse: any
    panel: Panel
    fileUpload: Function
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
        console.log(this.props.amendmentsResponse);
        if (this.props.amendmentsResponse.status === "OK" && this.props.importName === "Bulk Amendments") {
            this.setState({
                panel: {
                    label: "Validation completed with no errors",
                    visible: true,
                    status: "success"
                }
            });
        } else {
            this.setState({panel: this.props.panel});
        }
    }


    acceptLoad = () => {
        this.props.fileUpload("Bulk Amendments Accept");
        this.props.closeBulkAmendmentsModal();
    };

    rejectLoad = () => {
        // this.sendSurveyAuditResponse(false);
        this.props.closeBulkAmendmentsModal(true);
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

    exportReport = () => {
        let data = this.props.amendmentsResponse.AmendmentItems;
        let worksheet = XLSX.utils.json_to_sheet(data);
        worksheet["!cols"] = [
            {wch: 20},
            {wch: 20},
            {wch: 20},
            {wch: 20},
        ];
        let new_workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");
        XLSX.writeFile(new_workbook, "Bulk_Amendments_File.xlsx");
    };

    render() {
        let response = this.props.amendmentsResponse;
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
                    {
                        this.props.importName === "Bulk Amendments Accept" &&
                        <>
                            <h4>{response.detail}</h4>
                            <p>{response.message}</p>
                        </>
                    }
                    {
                        (this.props.amendmentsResponse.status !== "OK" && response.AmendmentItems !== undefined) &&
                        <ONSAccordionTable Headers={AMENDMENT_HEADERS}
                                           data={response.AmendmentItems}
                                           Row={amendmentItemTableRow}
                                           expandedRowEnabled={false}
                                           noDataMessage={"No Amendments Errors Found"}
                                           pagination={true}
                                           paginationSize={6}/>
                    }
                </div>
                <footer className="Modal-Footer">
                    {
                        this.props.importName === "Bulk Amendments" ?
                            <>
                                <ONSButton label="Accept" primary={true} small={false} onClick={this.acceptLoad} testid="accept-button"/>
                                {
                                    this.props.amendmentsResponse.status !== "OK" ? 
                                        <>
                                            <ONSButton label="Reject" primary={false} small={false} onClick={this.rejectLoad}/>
                                            <ONSButton label="Export" primary={true} small={false} onClick={this.exportReport}
                                                    marginRight={240} exportExcelBtn={true}/>
                                        </>
                                        :
                                        <>
                                            <ONSButton label="Reject" primary={false} small={false} onClick={this.rejectLoad} marginRight={365}/>
                                        </>
                                } 
                                <ONSButton label="Close" primary={false} small={false}
                                           onClick={() => this.props.closeBulkAmendmentsModal(true)}/>
                            </>
                            :
                            <ONSButton label="Close" primary={false} small={false}
                                       onClick={() => this.props.closeBulkAmendmentsModal(true)}/>
                    }
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
                {row.refDate.substr(0, 2) + "/" + row.refDate.substr(2, 2) + "/" + row.refDate.substr(4)}
            </td>

        </>
    );
};

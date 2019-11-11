import React, {Component} from "react";
import {ONSAccordionTable} from "../components/ONS_DesignSystem/ONSAccordionTable";
import {uploadHeaders} from "../utilities/Headers"
import {ONSStatus} from "../components/ONS_DesignSystem/ONSStatus";
import {getStatusStyle} from '../utilities/Common_Functions';
import {ONSProgressBar} from "../components/ONS_DesignSystem/ONSProgressBar";

interface Props {
    import: String
    hidden: boolean
}

interface State {
    uploadStatusData: UploadStatusData[] | null
    uploadStatusCode: number
    uploadPercentage: number
}

interface UploadStatusData {
    step: string
    date: string
    status: string
}

export class Address extends Component <Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = (
            {
                uploadStatusData: [{
                    step: 'Uploading',
                    date: new Date().toDateString(),
                    status: "Starting Import"
                }],
                uploadStatusCode: 0,
                uploadPercentage: 50
            })

    }

    randomPercentage = () => {
        setTimeout(() => {
            let number = Math.floor((Math.random() * 100) + 1);
            this.setState({
                uploadStatusData: [{
                    step: 'Uploading',
                    date: new Date().toDateString(),
                    status: "Importing: " + number + "%"
                }],
                uploadPercentage: number
            })
        }, 1000);

    };

    componentDidMount(): void {
        this.randomPercentage()
    }

    goToUploadPage = (row: any) => {
        window.location.href = "/surveyUpload/" + row.type.toLowerCase() + "/" + row.week + "/" + row.month + "/" + row.year
    };

    BatchUploadTableRow = (rowData: any) => {
        let row = rowData.row;
        return (
            <>
                <td className="table__cell ">
                    {row.step}
                </td>
                <td className="table__cell ">
                    {row.date}
                </td>
                <td className="table__cell ">
                    <ONSStatus label={row.status} small={false}
                               status={getStatusStyle(this.state.uploadStatusCode).colour}/>
                </td>
            </>
        )
    };

    addressHidden = () => {
        console.log(this.props.import);
        if (this.props.import === "address") return this.props.hidden;
        else return true
    };

    render() {
        return (
            <div hidden={!this.addressHidden()}>
                {/* <br></br> */}
                {/* <h3>Address Upload</h3> */}
                <div style={{width: "60%"}}>
                    <table>
                        <ONSAccordionTable Headers={uploadHeaders} data={this.state.uploadStatusData}
                                           Row={this.BatchUploadTableRow} expandedRowEnabled={false}
                                           noDataMessage={"No Data"}/>
                    </table>
                    <ONSProgressBar statusCode={this.state.uploadStatusCode} percentage={this.state.uploadPercentage}/>
                </div>
            </div>
        )
    }
}
import React, {Component} from "react";
import {ONSAccordionTable} from "../components/ONSAccordionTable";
import {uploadHeaders} from "../utilities/Headers"
import {ONSStatus} from "../components/ONSStatus";
import {ONSButton} from '../components/ONSButton';
import {getMonth, getStatusStyle, monthNumberToString, qList} from '../utilities/Common_Functions';

interface Props {
    import: String
    hidden: boolean
}

interface State {
    UploadStatusData: [] | null
}

export class Address extends Component <Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = ({UploadStatusData: null})

    }

    uploadStatusData = 
        [{
            "step": "Upload",
            "date" : "2019/08 12:44",
            "status": "",
        }]

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
                    <ONSStatus label={getStatusStyle(+row.status).text} small={false}
                                status={getStatusStyle(+row.status).colour}/>
                </td>
            </>
        )
    };
    
    addressHidden = () => {
        console.log(this.props.import)
        if(this.props.import === "address") return this.props.hidden
        else return true
    }

    render() {
        return (
        <div hidden={this.addressHidden()}>
            {/* <br></br> */}
            {/* <h3>Address Upload</h3> */}
            <table>
                 <ONSAccordionTable Headers={uploadHeaders} data={this.uploadStatusData} Row={this.BatchUploadTableRow} expandedRowEnabled={false} noDataMessage={"No Data"}/>
            </table>
        </div>
        )
    }
}
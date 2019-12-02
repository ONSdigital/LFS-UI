import React, {Component} from 'react';
import {ONSPanel} from '../../components/ONS_DesignSystem/ONSPanel';
import {ONSButton} from '../../components/ONS_DesignSystem/ONSButton';
import {getMonth, qList,} from '../../utilities/Common_Functions';
import {ONSMetadata} from '../../components/ONS_DesignSystem/ONSMetadata';
import {GenericNotFound} from "../GenericNotFound";
import DocumentTitle from "react-document-title";
import {SurveyAuditModal} from "../../components/SurveyAuditModal";
import {ReferenceFileImportTable} from "./ReferenceFileImportTable";

interface State {
    UploadsData: Data | null
    batchType: string
    year: string
    period: string
    batchData: [] | null
    metadata: Array<MetaDataListItem>
    batchFound: boolean,
    summaryOpen: boolean
    surveyAuditWeek: string
    surveyAuditMonth: string
    importAudit: any
    surveyAuditUploadType: string

}

interface MetaDataListItem {
    R: string
    L: string
}

interface Data {
    Rows: Row
    Count: number
}

interface Row {
    [key: number]: Cell
}

interface Cell {
    [key: string]: object
}

interface Props {
    match: any
}

export class View_Quarterly_Batch extends Component <Props, State> {
    displayName = View_Quarterly_Batch.name;

    constructor(props: any) {
        super(props);

        this.state = {
            UploadsData: null,
            batchType: 'quarterly',
            year: props.match.params.year,
            period: props.match.params.period,
            batchData: null,
            metadata: [],
            batchFound: true,
            summaryOpen: false,
            surveyAuditWeek: "",
            surveyAuditMonth: "",
            surveyAuditUploadType: "",
            importAudit: null,
        };
    }

    componentDidMount(): void {
        this.batchData();
        this.updateMetaDataList();
    }

    batchData = () => {
        // getBatchData(this.state.batchType, this.state.year, this.state.period)
        //     .then(r => {
        //         if (r[0] === undefined) {
        //             // Batch does not exist, load not found page
        //             this.setState({batchFound: false})
        //         }
        //         this.setState({batchData: r});
        //         this.updateMetaDataList()
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         this.setState({batchFound: false});
        //     });
    };

    formatMetaData() {
        return (
            [{
                L: "Batch Type",
                R: 'Quarterly',
            }, {
                L: "Year",
                R: this.state.year.toString(),
            }, {
                L: "Period",
                R: this.state.period.toString(),
            }, {
                L: "Status",
                R: "",
            }
            ]
        )
    }

    updateMetaDataList = () => {
        this.setState({metadata: this.formatMetaData()})
    };

    render() {
        return (
            <DocumentTitle
                title={'LFS Manage Batch ' + this.state.period + " " + this.state.year}>
                <div className="container">
                    {
                        this.state.batchFound ?
                            <>
                                <ONSMetadata List={this.state.metadata}/>
                                <div style={{width: "55%"}}>
                                    <ONSPanel label="Quarterly Batch" status="info" spacious={false}>
                                        <p>Design Weights Must be Imported to Run Process</p>
                                    </ONSPanel>
                                    <br/>
                                </div>
                                <div>
                                    <ONSButton label="Run Quarterly Process" small={false} primary={true}
                                               marginRight={10}/>
                                    {(() => {
                                        if (qList.some(item => String(getMonth(this.state.period)) === String(item))) {
                                            return (
                                                <ONSButton label="Run Interim Weighting" small={false} primary={false}/>
                                            )
                                        }
                                    })()}
                                </div>
                                <br/>
                                <div style={{width: "80%"}}>
                                    <ReferenceFileImportTable/>
                                </div>
                            </>
                            :
                            <GenericNotFound label={"Quarterly batch Not Found "}/>
                    }
                </div>
            </DocumentTitle>
        );
    }
}

import React, {useState} from "react";
import {ONSButton} from "./ONS_DesignSystem/ONSButton";
import {getImportReportFile} from "../utilities/http/http";
import {getImportReportFile} from "../utilities/http";
import {toUpperCaseFirstChar} from "../utilities/Common_Functions";

interface Props {
    hidden: boolean
    setPanel: Function
    importName: string
    url?: string
    reportFileType: string
}

export const ReportExport = (props: Props) => {
    let [loading, setLoading] = useState(false);
    const onClick = () => {
        setLoading(true);
        if (props.url) {
            let a = document.createElement('a');
            a.href = props.url
            a.download = props.importName + ' Summary Report.xlsx';
            a.click();
            setLoading(false)}
        else getImportReportFile(props.importName)
            .then(response => {
                if (response.status !== 200) {
                    props.setPanel("Error Occurred When Getting Report: " + response.statusText, "error");
                    setLoading(false);
                    return;
                }
                response.blob().then((blob: any) => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement("a");
                    a.href = url;
                    a.download = toUpperCaseFirstChar(props.importName) + " Summary Report" + props.reportFileType;
                    a.click();
                    setLoading(false);
                });
            })
            .catch(err => {
                console.log(err);
                props.setPanel("Error Occurred When Getting Report: " + err, "error");
                setLoading(true);
            });
    };

    return (
        <div hidden={props.hidden}>
            <br/>
            <ONSButton label={"Download Report"}
                       primary={true}
                       small={false}
                       exportExcelBtn={true}
                       onClick={onClick}
                       loading={loading}/>
            <br/>
            <br/>
        </div>
    );
};
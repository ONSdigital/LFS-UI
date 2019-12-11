import React, {useState} from "react";
import {ONSButton} from "./ONS_DesignSystem/ONSButton";
import {getImportReportFile} from "../utilities/http/http";

interface Props {
    hidden: boolean
    setPanel: Function
    importName: string
}

export const ReportExport = (props: Props) => {
    let [loading, setLoading] = useState(false)
    const onClick = () => {
        setLoading(true);
        getImportReportFile(props.importName)
            .then(response => {
                response.blob().then((blob: any) => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = 'Population Summary Report.xlsx';
                    a.click();
                    setLoading(false)
                });
            })
            .catch(err => {
                console.log(err);
                props.setPanel("Error Occuered When Getting Report: " + err, "error");
                setLoading(true)
            });
    };

    return (
        <div hidden={props.hidden}>
            <br/>
            <ONSButton label={'Download Report'}
                       primary={true}
                       small={false}
                       exportExcelBtn={true}
                       onClick={onClick}
                       loading={loading}/>
            <br/>
            <br/>
        </div>
    )
};
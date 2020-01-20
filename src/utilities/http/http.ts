import {requestPromise, requestPromiseJson} from "./requestPromise";

function postImportFile(importFile: any, link: string, fileName: string): Promise<any> {
    let url = "/imports/" + link;
    let formData = new FormData();
    formData.append("lfsFile", importFile[0]);
    formData.append("fileName", fileName);
    
    return requestPromise("POST", url, formData);
}

function getVariableDefinitions(variable: string | null = null): Promise<any> {
    let url = "/variable/definitions" + (variable !== null ? "/" + variable : "");

    return requestPromiseJson("GET", url);
}

function getValueLabels(variable: string | null = null): Promise<any> {
    let url = "/value/labels" + (variable !== null ? "/" + variable : "");

    return requestPromiseJson("GET", url);
}

function getSurveyAudit(survey: string, year: string, period: string): Promise<any> {
    let url = "/audits/" + (survey === "GB" ? "week" : "month") + "/" + year + "/" + period;

    return requestPromiseJson("GET", url);
}

function getImportReportFile(importName: string): Promise<any> {
    let url = "/" + importName + "/report/population";

    return new Promise((resolve: any, reject: any) => {
        fetch(url, {
            "method": "GET"
        })
            .then(response => {
                console.log("Response");
                console.log(response);
                resolve(response);
            })
            .catch(err => {
                console.log("Error");
                console.log(err);
                reject(err);
            });
    });
}

export {postImportFile, getVariableDefinitions, getValueLabels, getSurveyAudit, getImportReportFile};

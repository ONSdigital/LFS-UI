import {requestPromise} from "./requestPromise";

function postSurveyFile(lfsfile: any, fileName: string, fileType: string, survey: string, period: string, year: string): Promise<any> {
    let url = "/imports/" + fileType + "/" + survey + "/" + year + "/" + period;
    let formData = new FormData();
    formData.append("lfsFile", lfsfile[0]);
    formData.append("fileName", fileName);
    formData.append("fileSource", survey);

    return requestPromise("POST", url, formData);
}

function surveyAuditResponse(survey: string, status: string, year: string, period: string): Promise<any> {
    let url = "/survey/" + survey.toLowerCase() + "/status/" + status + "/" + year + "/" + period;
    return requestPromise("POST", url);
}

export {postSurveyFile, surveyAuditResponse};
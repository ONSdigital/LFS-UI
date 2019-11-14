function postSurveyFile(lfsfile: any, fileName: string, fileType: string, survey: string, period: string, year: string): Promise<any> {
    let url = "/imports/" + fileType + "/" + survey + "/" +  year + "/" +  period;
    let formData = new FormData();
    formData.append("lfsFile", lfsfile[0]);
    formData.append("fileName", fileName);
    formData.append("fileSource", survey);

    return genericRequest("POST", url, formData);
}

function postImportFile(importFile: any, link :string, fileName: string): Promise<any> {
    let url = "/imports/" + link;
    let formData = new FormData();
    formData.append("lfsFile", importFile[0]);
    formData.append("fileName", fileName);

    return genericRequest("POST", url, formData);
}

function createNewBatch(batchType: string, year: string, period: string, description: string): Promise<any> {
    let formData = new FormData();
    formData.append("description", description);
    let url = "/batches/" + batchType + "/" + year + (batchType !== 'annually' ? "/" + period : "");

    return genericRequest("POST", url, formData);
}

function getBatchData(batchType: string, year: string, period: string): Promise<any> {
    let url = "/batches/display/" + batchType + "/" + year + (batchType !== 'annually' ? "/" + period : "");
    return genericRequest("GET",url);
}

function getAllBatches(): Promise<any> {
    let url = "/dashboard";
    return genericRequest("GET",url);
}

function getSurveyAudit(survey: string, year: string, period: string): Promise<any> {
    let url = "/audits/" + (survey === 'gb' ? 'week' : 'month') + "/" + year + "/" + period;
    return genericRequest("GET", url)
}


function genericRequest(method: string, url: string, body: any = null): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
        fetch(url, {
            "method": method,
            "body": (body !== null ? body : body)
        })
            .then(response => {
                console.log("Response");
                console.log(response);
                resolve(response.json());
            })
            .catch(err => {
                console.log("Error");
                console.log(err);
                reject(err)
            });
    })
}

export {postSurveyFile, postImportFile, createNewBatch, getAllBatches, getBatchData, getSurveyAudit}

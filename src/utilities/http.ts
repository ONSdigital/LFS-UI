function postSurveyFile(lfsfile: any, fileName: string, fileType: string, survey: string, period: string, year: string): Promise<any> {

    let formData = new FormData();
    formData.append("lfsFile", lfsfile[0]);
    formData.append("fileName", fileName);
    formData.append("fileSource", survey);

    return new Promise((resolve: any, reject: any) => {
        fetch("/imports/" + fileType + "/" + survey + "/" +  period + "/" +  year, {
            "method": "POST",
            "body": formData,
        })
            .then(response => {
                console.log(response);
                resolve(response.json());
            })
            .catch(err => {
                console.log(err);
                reject(err)
            });
    })
}

function createNewBatch(batchType: string, year: string, period: string, description: string): Promise<any> {

    let formData = new FormData();
    formData.append("description", description);

    let url = "/batches/" + batchType + "/" + year + (batchType !== 'annually' ? "/" + period : "");

    return new Promise((resolve: any, reject: any) => {
        fetch(url, {
            "method": "POST",
            "body": formData,
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

function getBatchData(batchType: string, year: string, period: string): Promise<any> {

    let url = "/batches/display/" + batchType + "/" + year + (batchType !== 'annually' ? "/" + period : "");

    return new Promise((resolve: any, reject: any) => {
        fetch(url, {
            "method": "GET"
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

function getAllBatches(): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
        fetch("/dashboard", {
            "method": "GET"
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

export {postSurveyFile, createNewBatch, getAllBatches, getBatchData}

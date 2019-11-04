export function postFile(lfsfile: any, fileName: string, fileType: string, fileSource: string, survey: string): Promise<any> {

    let formData = new FormData();
    formData.append("lfsFile", lfsfile[0]);
    formData.append("fileName", fileName);
    formData.append("fileType", fileType);
    formData.append("fileSource", fileSource);

    return new Promise((resolve: any, reject: any) => {
        fetch("/import/survey/" + survey, {
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

export function createNewBatch(batchType: string, year: string, period: string, description: string): Promise<any> {

    let formData = new FormData();
    formData.append("description", description);

    let url = "/batches/" + batchType + "/" + year  + (batchType !== 'annually' ? "/" + period : "");

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

export function getBatch(batchType: string, year: string, period: string): Promise<any> {

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

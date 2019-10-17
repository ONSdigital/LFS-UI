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
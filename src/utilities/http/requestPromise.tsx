function requestPromise(method: string, url: string, body: any = null): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
        fetch(url, {
            "method": method,
            "body": (body !== null ? body : body)
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

export {requestPromise};

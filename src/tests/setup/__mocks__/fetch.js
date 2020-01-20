export default function(url, payload) {
    console.log(url);
    switch (url) {
        case "/imports/survey/gb/2019/1":
            let GbFileName = payload.body.get("lfsFile").name;
            if (GbFileName === "chucknorris_invalid_file.sav") {
                return Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve({status: "ERROR", errorMessage: "Error Occurred"})
                });
            } else if (GbFileName === "chucknorris_server_not_online.sav") {
                // Mock server not being online
                return Promise.reject("SyntaxError: Unexpected token P in JSON at position 0");
            } else {
                return Promise.resolve({status: 200, json: () => Promise.resolve({status: "OK"})});
            }
        case "/imports/survey/ni/2019/5":
            let NiFileName = payload.body.get("lfsFile").name;
            if (NiFileName === "chucknorris_unknown_error.sav") {
                return Promise.resolve({status: 200, json: () => Promise.resolve({status: "999"})});
            } else if (NiFileName === "chucknorris_weird_error.sav") {
                return Promise.reject("Something strange has Occurred here");
            }
        case "/imports/design/weights": {
            console.log(url);
            return Promise.resolve({status: 200, json: {status: "OK"}});
        }
        case "/audits/week/2019/1":
            console.log(url);
            return Promise.resolve({
                status: 200, json: () => Promise.resolve([{
                    uploadDate: "2020-01-09T12:57:45.013877Z",
                    status: 3,
                    message: "Insert survey row failed"
                }])
            });
        case "/audits/month/2019/5":
            console.log(url);
            return Promise.resolve(undefined);
        case "/login/Admin":
            return Promise.resolve({status: 200, json: () => Promise.resolve({status: "OK"})});
        default:
            console.log("default");
            return Promise.reject("URL not Mocked For Test");
    }
}

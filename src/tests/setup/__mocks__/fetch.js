export default function(url, payload) {
    console.log(url);
    switch (url) {
        case "/imports/survey/gb/2019/1":
            let fileName = payload.body.get("lfsFile").name;
            if (fileName === "chucknorris_invalid_file.sav") {
                return Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve({status: "ERROR", errorMessage: "Error Occurred"})
                });
            } else if (fileName === "chucknorris_server_not_online.sav") {
                // Mock server not being online
                return Promise.reject("SyntaxError: Unexpected token P in JSON at position 0");
            } else {
                return Promise.resolve({status: 200, json: () => Promise.resolve({status: "OK"})});
            }
            return;
        case "/imports/survey/ni/2019/5":
            let fileName2 = payload.body.get("lfsFile").name;
            if (fileName2 === "chucknorris_unknown_error.sav") {
                return Promise.resolve({status: 200, json: () => Promise.resolve({status: null})});
            } else if (fileName2 === "chucknorris_weird_error.sav") {
                return Promise.reject("Something strange has Occurred here");
            }
        case "/imports/design/weights": {
            console.log(url);
            return Promise.resolve({status: 200, json: {status: "OK"}});
        }
        case "/audits/week/2019/1":
            console.log(url);
            return Promise.resolve([{
                uploadDate: "2020-01-09T12:57:45.013877Z",
                status: 3,
                message: "Insert survey row failed"
            }]);
        case "/audits/monrh/2019/5":
            console.log(url);
            return Promise.resolve();
        case "/login/Admin":
            return Promise.resolve({status: 200, json: () => Promise.resolve({status: "OK"})});
        default:
            console.log("default");
            return Promise.reject("URL not Mocked For Test");
    }
}

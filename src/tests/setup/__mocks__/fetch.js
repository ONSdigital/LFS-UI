export default function(url, payload) {
    console.log(url);
    return Promise.resolve({
        status: 200,
        json: () => {
            switch (url) {
                case "/imports/survey/gb/2019/1":
                    let fileName = payload.body.get("lfsFile").name;
                    if (fileName === "chucknorris_invalid_file.sav") {
                        return Promise.resolve({status: "ERROR", errorMessage: "Error Occurred"});
                    } else if (fileName === "chucknorris_server_not_online.sav") {
                        // Mock server not being online
                        return Promise.reject("SyntaxError: Unexpected token P in JSON at position 0");
                    } else {
                        return Promise.resolve({status: "OK"});
                    }
                case "/imports/survey/ni/2019/5":
                    let fileName2 = payload.body.get("lfsFile").name;
                    if (fileName2 === "chucknorris_unknown_error.sav") {
                        return Promise.resolve({status: null});
                    } else if (fileName2 === "chucknorris_weird_error.sav") {
                        return Promise.reject("Something strange has Occurred here");
                    }
                case "/audits/week/2019/1":
                    return Promise.resolve([{
                        uploadDate: "2020-01-09T12:57:45.013877Z",
                        status: 3,
                        message: "Insert survey row failed"
                    }]);
                case "/audits/monrh/2019/5":
                    return Promise.resolve();
                case "/login/Admin":
                    return Promise.resolve({status: "OK"});
                default:
                    return Promise.reject("URL not Mocked For Test");
            }
        }
    });
}
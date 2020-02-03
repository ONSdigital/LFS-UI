import {batch_progress, dashboard_data} from "./mock_data";

export default function(url, payload) {
    console.log(url);
    switch (url) {
        case "/imports/survey/gb/2019/1":
            let GbFileName = payload.body.get("lfsFile").name;
            if (GbFileName === "GB_File_invalid_file.sav") {
                return Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve({status: "ERROR", errorMessage: "Error Occurred"})
                });
            } else if (GbFileName === "GB_File_server_not_online.sav") {
                // Mock server not being online
                return Promise.reject("SyntaxError: Unexpected token P in JSON at position 0");
            } else {
                return Promise.resolve({status: 200, json: () => Promise.resolve({status: "OK"})});
            }
        case "/imports/survey/ni/2019/5":
            let NiFileName = payload.body.get("lfsFile").name;
            if (NiFileName === "NI_File_unknown_error.sav") {
                return Promise.resolve({status: 200, json: () => Promise.resolve({status: "999"})});
            } else if (NiFileName === "NI_File_weird_error.sav") {
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
            return Promise.resolve({status: 200, json: () => Promise.resolve(undefined)});
        case "/login/Admin":
            if (payload.headers.password === "password") {
                return Promise.resolve({status: 200, json: () => Promise.resolve({status: "OK"})});
            } else {
                return Promise.resolve({status: 400, json: () => Promise.resolve({status: "ERROR"})});
            }
        case "/dashboard":
            if (process.env.NODE_ENV === "development") {
                return  Promise.reject({status: 500, json: () => Promise.resolve(dashboard_data)});
            }
            return Promise.resolve({status: 200, json: () => Promise.resolve(dashboard_data)});
        case "/jsons/MOCK_BATCH_PROGRESS.json":
            return Promise.resolve({status: 200, json: () => Promise.resolve(batch_progress)});
        case "/jsons/MOCK_RUNS.json":
            return Promise.resolve({status: 200, json: () => Promise.resolve({"Rows": dashboard_data})});
        default:
            console.log("default");
            return Promise.reject("URL not Mocked For Test");
    }
}

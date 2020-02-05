export const variableDefinitionData = [
    {id: 1, variable: "IOUTCOME", label: {String: "LABELS0", Valid: true}, description: {Valid: false}, type: "double", length: 8, precision: 0, alias: {String: "", Valid: false}, editable: false, imputation: false, dv: false, validFrom: "2019-12-18T15:14:49.306583Z"},
    {id: 2, variable: "IOUTCOME", label: {String: "LABELS0", Valid: true}, description: {String: "Previous Definition description", Valid: true}, type: "double", length: 8, precision: 0, alias: {String: "", Valid: false}, editable: false, imputation: false, dv: false, validFrom: "2018-12-18T15:14:49.306583Z"},
    {id: 3, variable: "IOUTCOME", label: {String: "LABELS0", Valid: true}, description: {Valid: false}, type: "double", length: 8, precision: 0, alias: {String: "", Valid: true}, editable: true, imputation: true, dv: true, validFrom: "2017-12-18T15:14:49.306583Z"},
    {id: 4, variable: "DVHRPNUM", label: {String: "LABELS1", Valid: true}, description: {String: "Mock Data", Valid: true}, type: "double", length: 8, precision: 0, alias: {String: "", Valid: true}, editable: true, imputation: true, dv: true, validFrom: "2019-12-18T15:14:49.306584Z"}
];

export const valueLabelsData = [
    {variable: "ILLST17", label_name: "ILLST17", valid_from: "2019-12-10T00:00:00Z", label_value: 1, description: "1 day", last_updated: "2019-12-19T15:54:25.866691Z"},
    {variable: "ILLST17", label_name: "ILLST17", valid_from: "2019-12-10T00:00:00Z", label_value: 2, description: "2 days", last_updated: "2019-12-19T15:54:25.866691Z"},
    {variable: "ILLST17", label_name: "ILLST17", valid_from: "2019-12-10T00:00:00Z", label_value: 3, description: "3 days", last_updated: "2019-12-19T15:54:25.866692Z"},
    {variable: "DVHRPNUM", label_name: "DVHRPNUM", valid_from: "2019-12-10T00:00:00Z", label_value: 4, description: "4 days", last_updated: "2019-12-19T15:54:25.866692Z"}
];

const dashboard_data = [
    {id: 1, type: "Monthly", period: "1", year: 2019, status: 4},
    {id: 2, type: "Monthly", period: "2", year: 2019, status: 4},
    {id: 3, type: "Monthly", period: "3", year: 2019, status: 4},
    {id: 4, type: "Quarterly", period: "Q1", year: 2019, status: 4},
    {id: 5, type: "Monthly", period: "4", year: 2019, status: 0},
    {id: 6, type: "Monthly", period: "5", year: 2019, status: 0},
    {id: 7, type: "Monthly", period: "6", year: 2019, status: 0},
    {id: 8, type: "Quarterly", period: "Q2", year: 2019, status: 0},
    {"id":9,"type":"Annually","period":"2019","year":2019,"status":0}];

const batch_progress = {
    "Rows": [{"id": 0, "step": "Import Survey Files", "status": "Completed"},
        {"id": 1, "step": "Run Monthly Process", "status": "In Progress"},
        {"id": 2, "step": "Run Monthly Weighting", "status": "Failed"},
        {"id": 3, "step": "Run Monthly ____", "status": "Not Run"}],
    "Count": 4
};

const user_data = [{"user_id":1,"username":"adam","password":"CcF0mfmKsHe","role":"user"},
    {"user_id":2,"username":"Bradley","password":"X4xkLGF6m","role":"admin"},
    {"user_id":3,"username":"Charles","password":"DC0zPNYobw","role":"admin"},
    {"user_id":4,"username":"David","password":"6Ll01OhpbN","role":"admin"}];


const role_data = [{"Name": "Admin", "Pages": [0,1,2,3,4,5,6,7,8,9]},
    {"Name": "User", "Pages": [2,3,4,5,6,7,8,9]}];

export {variableDefinitionData, valueLabelsData, dashboard_data, batch_progress, user_data, role_data};

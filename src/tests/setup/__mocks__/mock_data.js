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
    "Rows": [
        {
            "id": 0,
            "step": "Import Survey Files",
            "status": "Completed"
        },
        {
            "id": 1,
            "step": "Run Monthly Process",
            "status": "In Progress"
        },
        {
            "id": 2,
            "step": "Run Monthly Weighting",
            "status": "Failed"
        },
        {
            "id": 3,
            "step": "Run Monthly ____",
            "status": "Not Run"
        }
    ],
    "Count": 4
}
;
export {dashboard_data, batch_progress};
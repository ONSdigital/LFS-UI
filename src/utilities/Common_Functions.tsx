function weeks() {
    let i;
    let weekList = [];
    for (i=1; i<=52; i++) {
        weekList.push({"label":"Week "+String(i), "value":String(i)})
    }
    return weekList
}

const monthNames = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

function monthNumberToString(MonthNum: number): string {
    let Month: string = "";
    switch (MonthNum){
        case 1: Month = 'January'; break;
        case 2: Month = 'February'; break;
        case 3: Month = 'March'; break;
        case 4: Month = 'April'; break;
        case 5: Month = 'May'; break;
        case 6: Month = 'June'; break;
        case 7: Month = 'July'; break;
        case 8: Month = 'August'; break;
        case 9: Month = 'September'; break;
        case 10: Month = 'October'; break;
        case 11: Month = 'November'; break;
        case 12: Month = 'December'; break;
    }
    return Month
}

function months() {

    let i;
    let monthlist = [];
    var date = new Date();
    const month = date.getMonth();
    for (i=0; i<12; i++){
        if (month-i>=0)
            monthlist.push({"label":monthNames[month-i], "value":((month-i)+1).toString()});
        else{
            monthlist.push({"label":monthNames[month+12-i], "value":((month+12-i)+1).toString()})

        }
    }
    return monthlist
}

const quarters = [{"label":"Q1", "value":"Q1"},
                  {"label":"Q2", "value":"Q2"}, 
                  {"label":"Q3", "value":"Q3"}, 
                  {"label":"Q4", "value":"Q4"}];

function years() {
    let i;
    let yearlist = [];
    var date = new Date(); 
    const year = date.getFullYear();
    for (i=0; i<10; i++){
        yearlist.push({"label":String(year-i), "value":String(year-i)})
    }
    return yearlist
}

function getMonth (Batch_ID: String) {
    var Month = Batch_ID.substring(0,3)
    switch (Month){
      case 'Jan': Month = 'January'; break;
      case 'Feb': Month = 'February'; break;
      case 'Mar': Month = 'March'; break;
      case 'Apr': Month = 'April'; break;
      case 'May': break;
      case 'Jun': Month = 'June'; break;
      case 'Jul': Month = 'July'; break;
      case 'Aug': Month = 'August'; break;
      case 'Sep': Month = 'September'; break;
      case 'Oct': Month = 'October'; break;
      case 'Nov': Month = 'November'; break;
      case 'Dec': Month = 'December'; break;
    }
    return Month
  }

  function getYear (Batch_ID: String) {
    return Batch_ID.substring(3,7)
  }

const batches = [{"label":"Monthly", "value":"monthly"}, 
        {"label":"Quarterly", "value":"quarterly"}, 
        {"label":"Yearly", "value":"yearly"}]

const qList = ["January", "February", "April", "May", "July", "August", "October", "November"]

interface status {
    text: string,
    colour: string
    hexCode: string
}

function getUploadStatusStyle(statusNo: number) {
    let status: status = {text: "", colour: 'info', hexCode: '#222'};
    switch (statusNo){
        case 0: status = {text: "Not Started", colour: 'dead', hexCode: '#989898'}; break;
        case 1: status = {text: "Importing", colour: 'info', hexCode: '#5e7dd8'}; break;
        case 2: status = {text: "Undecided", colour: 'info', hexCode: '#5e7dd8'}; break;
        case 3: status = {text: "Upload Failed", colour: 'error', hexCode: '#fd112e'}; break;
        case 4: status = {text: "Upload Accepted", colour: 'success', hexCode: '#12c864'}; break;
        case 5: status = {text: "Upload Rejected", colour: 'error', hexCode: '#fd112e'}; break;
    }
    return status
}

function getReferenceStatusStyle(statusNo: number) {
    let status: status = {text: "", colour: 'info', hexCode: '#222'};
    switch (statusNo){
        case 0: status = {text: "Not Started", colour: 'dead', hexCode: '#989898'}; break;
        case 1: status = {text: "Importing", colour: 'info', hexCode: '#5e7dd8'}; break;
        case 2: status = {text: "Upload Failed", colour: 'error', hexCode: '#fd112e'}; break;
    }
    return status
}

function getBatchProgressStatusStyle(statusText: string) {
    let status: status = {text: "", colour: 'dead', hexCode: '#888'};
    switch (statusText){
        case "Completed": status = {text: "Completed", colour: 'success', hexCode: '#12c864'}; break;
        case "In Progress": status = {text: "In Progress", colour: 'info', hexCode: '#5e7dd8'}; break;
        case "Failed": status = {text: "Failed", colour: 'error', hexCode: '#fd112e'}; break;
        case "Not Run": status = {text: "Not Run", colour: 'dead', hexCode: '#888'}; break;
    }
    return status
}

function getFileImportStatusStyle(statusNo: number) {
    let status: status = {text: "", colour: 'info', hexCode: '#222'};
    switch (statusNo){
        case 0: status = {text: "Not Started", colour: 'info', hexCode: '#888'}; break;
        case 1: status = {text: "In Progress", colour: 'info', hexCode: '#5e7dd8'}; break;
        case 2: status = {text: "Import Complete", colour: 'success', hexCode: '#12c864'}; break;
        case 3: status = {text: "Import Failed", colour: 'error', hexCode: '#fd112e'}; break;
    }
    return status
}


function getStatusStyle(statusNo: number) {
    let status: status = {text: "", colour: 'info', hexCode: '#222'};
    switch (statusNo){
        case 0: status = {text: "Not Started", colour: 'dead', hexCode: '#5e7dd8'}; break;
        case 1: status = {text: "In Progress", colour: 'info', hexCode: '#12c864'}; break;
        // case 2: status = {text: "File Reloaded", colour: 'success', hexCode: '#12c864'}; break;
        case 3: status = {text: "Failed", colour: 'error', hexCode: '#fd112e'}; break;
        case 4: status = {text: "Successful - Complete", colour: 'success', hexCode: '#12c864'}; break;
    }
    return status
}

function toUpperCaseFirstChar(string: string){
    return string.charAt(0).toUpperCase() + string.slice(1, string.length)
}

function isDevEnv() {
    return process.env.NODE_ENV === 'development'
}

function fullPeriodPlease (currentPeriod: string, currentYear: string) {
    if(currentPeriod !== "Q"){
        currentPeriod = monthNumberToString(Number(currentPeriod)).substring(0, 3)
    }
    return `${currentPeriod} ${currentYear}`
}

function currentDateAsString(): string {
    let dateTime = new Date();
    let date = dateTime.getDate();
    let month: any = dateTime.getMonth();
    let year = dateTime.getFullYear();
    if(month < 10) month = "0" + month

    return `${String(date)}/${String(month)}/${String(year)}`
}

export{ getReferenceStatusStyle, currentDateAsString, fullPeriodPlease, weeks, months, quarters, years, batches, getMonth, getYear, qList, monthNames, monthNumberToString, getStatusStyle, toUpperCaseFirstChar, getUploadStatusStyle, isDevEnv, getBatchProgressStatusStyle, getFileImportStatusStyle}
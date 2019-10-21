function weeks() {
    let i;
    let weekList = []
    for (i=1; i<=52; i++) {
        weekList.push({"label":"Week "+String(i), "value":String(i)})
    }
    return weekList
}

function months() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", 
                        "August", "September", "October", "November", "December"];
    let i;
    let monthlist = [];
    var date = new Date();
    const month = date.getMonth();
    for (i=0; i<12; i++){
        if (month-i>=0)
            monthlist.push({"label":monthNames[month-i], "value":monthNames[month-i]})
        else{
            monthlist.push({"label":monthNames[month+12-i], "value":monthNames[month+12-i]})

        }
    }
    return monthlist
}

const quarters = [{"label":"Q1", "value":"Q2"}, 
                  {"label":"Q2", "value":"Q2"}, 
                  {"label":"Q3", "value":"Q3"}, 
                  {"label":"Q4", "value":"Q4"}]

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

const runs = [{"label":"Monthly", "value":"monthly"}, 
        {"label":"Quarterly", "value":"quarterly"}, 
        {"label":"Yearly", "value":"yearly"}]

export{weeks, months, quarters, years, runs}
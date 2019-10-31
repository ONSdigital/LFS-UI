function batchHeaders() {
    return(
    [{
        label: "Source",
        column_name: "source",
        filter: false,
        order: true
    },{
        label: "Week",
        column_name: "week",
        filter: false,
        order: false
    },{
        label: "Status",
        column_name: "status",
        filter: false,
        order: false
    },{
        label: "",
        column_name: "button",
        filter: false,
        order: false
    }]
    )
};

function uploadHeaders() {
    return(
        [{
        label: "Step",
        column_name: "step",
        filter: false,
        order: true
        },{
        label: "Date",
        column_name: "date",
        filter: false,
        order: false
        },{
        label: "Status",
        column_name: "status",
        filter: false,
        order: false
        }])
    };




function userHeaders() {
    return(
        [{
        label: "User_ID",
        column_name: "user_id",
        filter: false,
        order: true,
        create: false,
        },{
        label: "Username",
        column_name: "username",
        filter: false,
        order: true,
        create: true
        },{
        label: "Password",
        column_name: "password",
        filter: false,
        order: false,
        create: true
        },{
        label: "Role",
        column_name: "role",
        filter: false,
        order: false,
        create: true
        }]
    )
};

function roleHeaders () {
    return(
      [{
        label: "Role Name",
        column_name: "Name",
        filter: false,
        order: true
      },{
        label: "Page Access",
        column_name: "Pages",
        filter: false,
        order: false
      }]
    )
  };

export{ batchHeaders, uploadHeaders, userHeaders, roleHeaders }
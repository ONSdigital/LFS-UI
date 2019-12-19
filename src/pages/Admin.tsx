import React, {Component, Fragment} from "react";
import {roleHeaders, userHeaders} from "../utilities/Headers";
import {ONSAccordionTable} from "../components/ONS_DesignSystem/ONSAccordionTable";
import {ONSButton} from "../components/ONS_DesignSystem/ONSButton";
import ReactModal from "react-modal";
import {ONSTextInput} from "../components/ONS_DesignSystem/ONSTextInput";
import DocumentTitle from "react-document-title";

interface State {
    UserData: Data | null
    Users: any[] | null
    RoleData: any[] | null
    showSaveModal: boolean
}

interface Data {
    Rows: Row,
    Count: number
}

interface Row {
    [key: number]: Cell
}

interface Cell {
    [key: string]: object
}

export class Admin extends Component <{}, State> {
    displayName = Admin.name;

    constructor(props: any) {
        super(props);
        this.state = {UserData: null, Users: [], RoleData: [], showSaveModal: false};
        this.getRoles();
        this.getUsers();
    }

    //user table is created in TableWithModal so all stuff is there
    getRoles = () => {
        fetch("/jsons/Roles.json")
            .then(response => response.json())
            .then(response => this.setMockRoleData(response));
    };

    setMockRoleData = (response: any) => {
        this.setState({RoleData: response.Rows});
    };

    getUsers = () => {
        fetch("/jsons/Users.json")
            .then(response => response.json())
            .then(response => this.setMockUserData(response));
    };

    setMockUserData = (response: any) => {
        this.setState({Users: response.Rows});
    };

    createUser = (payload: any) => {
        console.log(payload);
    };

    //save modal functions
    openSaveModal = () => {
        this.setState({showSaveModal: true});
    };

    closeSaveModal = () => {
        this.setState({showSaveModal: false});
    };

    saveModal = () => {
        if (this.state.showSaveModal) {
            return (
                // Modal was messinhg with the submit button so we made our own and its wayyy cooler
                <ReactModal
                    key={1}
                    isOpen={this.state.showSaveModal}
                    contentLabel="Minimal Modal Example"
                    className='Modal'
                    shouldFocusAfterRender={true}
                    shouldReturnFocusAfterClose={true}
                >
                    <h1>Add User</h1>
                    {userHeaders().map((header, index) => {
                            return header.create &&
                                (
                                    <Fragment key={index}>
                                        <ONSTextInput label={header.label}/>
                                    </Fragment>
                                );
                        }
                    )}
                    <br/>
                    <ONSButton primary={true} small={false} label={" Save "} onClick={this.createUser}/>
                    <ONSButton label="Cancel" small={false} primary={false} onClick={this.closeSaveModal}/>
                </ReactModal>
            );
        }
    };

    RoleTableRow = (rowData: any) => {
        let row = rowData.row;
        return (
            <>
                <td className="table__cell ">
                    {row.Name}
                </td>
                <td className="table__cell ">
                    {row.Pages.map(((item: string) => item + " , "))}
                </td>
            </>
        );
    };

    UsersTableRow = (rowData: any) => {
        let row = rowData.row;
        return (
            <>
                <td className="table__cell ">
                    {row.user_id}
                </td>
                <td className="table__cell ">
                    {row.username}
                </td>
                <td className="table__cell ">
                    {row.password}
                </td>
                <td className="table__cell ">
                    {row.role}
                </td>
            </>
        );
    };

    render() {
        return (
            <DocumentTitle title={"LFS User Management"}>
                <div className="container">
                    <br></br>
                    {[this.saveModal()]}
                    <ONSAccordionTable Headers={roleHeaders()}
                                       data={this.state.RoleData}
                                       Row={this.RoleTableRow}
                                       expandedRowEnabled={false}
                                       noDataMessage={"No Roles Found"}/>
                    <ONSButton label={"New User"} primary={false} onClick={this.openSaveModal}/>
                    <hr/>
                    <ONSAccordionTable Headers={userHeaders()}
                                       data={this.state.Users}
                                       Row={this.UsersTableRow}
                                       expandedRowEnabled={false}
                                       pagination={true}
                                       paginationSize={10}
                                       noDataMessage={"No Users Found"}/>
                </div>
            </DocumentTitle>
        );
    }
}

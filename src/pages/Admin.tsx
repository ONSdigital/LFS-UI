import React, { Component } from 'react';
import { ONSTable } from '../components/ONSTable';

interface State {
  UserData: Data | null
  Users: Data | null
  RoleData: Data | null
}

interface Data{
  Rows : Row,
  Count : number
}

interface Row{
  [key: number]: Cell
}

interface Cell{
  [key: string]: object
}

export class Admin extends Component <{}, State>{
  displayName = Admin.name
  constructor(props: any) {
    super(props);
    this.state = {UserData: null, Users: null, RoleData: null}
    this.getUsers();
    this.getRoles();
  }

  getUsers = () => {
    fetch('/jsons/Users.json')
        .then(response => response.json())
        .then(response => this.setMockUserData(response))
  }

  getRoles = () => {
    fetch('/jsons/Roles.json')
        .then(response => response.json())
        .then(response => this.setMockRoleData(response))
  }

  setMockRoleData = (response: any) => {
    this.setState({RoleData: response})
  }

  setMockUserData = (response: any) => {
    let users = response.Rows as object[];
    users = users.slice(0, 20)
    this.setState({UserData: response, Users: {Rows: users as any, Count: response.Count}})
  }

  mockUsers = (offset: number, steps: number) => {
    if(this.state.UserData !== null){
      let users = this.state.UserData.Rows as object[];
      users = users.slice(offset, offset+steps)
      this.setState({Users: {Rows: users as any, Count: this.state.UserData.Count}});
    }
  }

  userHeaders = () => {
    return(
      [{
        label: "User_ID",
        column_name: "user_id",
        filter: false,
        order: true,
        create: false,
      },{
        label: "username",
        column_name: "username",
        filter: false,
        order: true,
        create: true
      },{
        label: "password",
        column_name: "password",
        filter: false,
        order: false,
        create: true
      },{
        label: "role",
        column_name: "role",
        filter: false,
        order: false,
        create: true
      }]
    )
  }

  roleHeaders = () => {
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
  }

  createUser = (payload : any) => {
    console.log(payload)
  }

  render() {
    return (
      <div className="container">
        <ONSTable Data={this.state.RoleData} Title="Roles" Headers={this.roleHeaders()} Pagination={false}/>
        <hr/>
        <ONSTable Data={this.state.Users} Title="Users" CreateFunction={this.createUser} Headers={this.userHeaders()} Pagination={true} Steps={20} pageChange={this.mockUsers}/>
      </div>
    );
  }
}

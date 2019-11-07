import React, {Component} from 'react';
import {ONSTable} from '../components/ONS_DesignSystem/ONSTable';
import {TableWithModal} from '../components/TableWithModal'
import {roleHeaders} from '../utilities/Headers'

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
  displayName = Admin.name;
  constructor(props: any) {
    super(props);
    this.state = {UserData: null, Users: null, RoleData: null};
    this.getRoles();
  }
  //user table is created in TableWithModal so all stuff is there
  getRoles = () => {
    fetch('/jsons/Roles.json')
        .then(response => response.json())
        .then(response => this.setMockRoleData(response))
  };

  setMockRoleData = (response: any) => {
    this.setState({RoleData: response})
  };

  createUser = (payload : any) => {
    console.log(payload)
  };

  render() {
    return (
      <div className="container">
        <ONSTable Data={this.state.RoleData} Title="Roles" Headers={roleHeaders()} Pagination={false}/>
        <hr/>
        <TableWithModal table="admin" ></TableWithModal>
        </div>
    );
  }
}

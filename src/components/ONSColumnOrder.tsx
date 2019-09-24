import React, { Component } from 'react';

interface Props{
  onClick: (e: "Asc" | "Desc" | null) => void
}

interface State{
  desc: boolean,
  asc: boolean,
  sort: boolean,
}

export class ONSColumnOrder extends Component <Props, State>{
  constructor(props : Props) {
    super(props);
    this.state = {desc: true, asc: true, sort: false}
  }


  clickHandler = () => {
    if(!this.state.sort){
      this.setState({desc: true, asc: false, sort: true})
      this.props.onClick("Desc");
    }else if(this.state.desc){
      this.setState({desc: false, asc: true, sort: true})
      this.props.onClick("Asc");
    }else{
      this.setState({desc: true, asc: true, sort: false})
      this.props.onClick(null);
    }
  }

  render() {
    return (
      <div style={{display:"inline-block", marginLeft:"10px", cursor:"pointer"}} onClick={() => this.clickHandler()}>
        {this.state.asc &&
          <img src={process.env.PUBLIC_URL + '/img/Sort-Up.svg'} style={{width:"10px", display: "block", marginBottom: this.state.sort ? "0px" : "-10px"}}/>
        }
        {this.state.desc &&
          <img src={process.env.PUBLIC_URL + '/img/Sort-Down.svg'} style={{width:"10px"}}/>
        }
      </div>
    );
  }
}

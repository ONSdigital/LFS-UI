import React, {Component, Fragment} from "react";

interface Props {
    List : any
    LSpacing?: string
    RSpacing?: string
}


export class ONSMetadata extends Component < Props, {} > {
   
    render () {         
        let Lspacing = this.props.LSpacing;
        let Rspacing = this.props.RSpacing;

        if(this.props.LSpacing === undefined) Lspacing = "2";
        if(this.props.RSpacing === undefined) Rspacing = "10";
        
        if (this.props.List !== null) {
            return(
                <div>
                    <dl className="metadata metadata__list grid grid--gutterless u-cf u-mb-l" title="This is an example of the metadata component" aria-label="This is an example of the metadata component">
                        {this.props.List.map((item:any) => (
                            <Fragment key ={item.L}>
                                <dt className={"metadata__term grid__col col-" + Lspacing + "@m"}>{item.L}:</dt>
                                <dd className={"metadata__value grid__col col-" + Rspacing + "@m"}>{item.R}</dd>
                            </Fragment>)
                        )}
                    </dl>
                </div>
            )
        }

    }
}

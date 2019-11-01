import React, {Component} from "react";

interface Props {
    List : any
    RightList? : any
}

export class ONSMetadata extends Component < Props, {} > {
    constructor(props : Props) {super(props);}
    
    render () {
        return(
            <div>
                <dl className="metadata metadata__list grid grid--gutterless u-cf u-mb-l" title="This is an example of the metadata component" aria-label="This is an example of the metadata component">
                    {this.props.List.map((item:any) => (<div>
                                                            <dt className="metadata__term grid__col col-2@m">{item.L}:</dt>  
                                                            <dd className="metadata__value grid__col col-10@m">{item.R}</dd>
                                                        </div>)
                    )}
                </dl>
            </div>
        )
    }
}
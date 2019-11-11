import React from 'react';
import {getStatusStyle} from "../../utilities/Common_Functions";

interface Props {
    statusCode: number
    percentage: number
}

interface FillerProps {
    percentage: number
    statusCode: number
}

export const ONSProgressBar = (props: Props) => (
    <p className="field">
        <p className="field">
            <div className={'progress-bar'}>
                <Filler percentage={props.percentage} statusCode={props.statusCode}/>
            </div>
        </p>
    </p>
);

const Filler = (props: FillerProps) => {
    return <div className="progress-bar-filler" style={{width: `${props.percentage}%`, background: `${getStatusStyle(props.statusCode).hexCode}`}}/>
};
import React from "react";
import {getFileImportStatusStyle} from "../../utilities/Common_Functions";

interface Props {
    statusCode: number
    percentage: number
}

interface FillerProps {
    percentage: number
    statusCode: number
}

export const ONSProgressBar = (props: Props) => (
    <div className="field">
        <div className={'progress-bar'}>
            <Filler percentage={props.percentage} statusCode={props.statusCode}/>
        </div>
    </div>
);

const Filler = (props: FillerProps) => {
    return <div className="progress-bar-filler"
                style={{width: `${props.percentage}%`, background: `${getFileImportStatusStyle(props.statusCode).hexCode}`}}/>
};
import {useHistory} from "react-router-dom";
import {useEffect} from "react";

interface Props {
    url: string
}

export function RedirectComponent(props : Props) {
    let history = useHistory();

    useEffect(() => {
        history.push(props.url);
    });
}
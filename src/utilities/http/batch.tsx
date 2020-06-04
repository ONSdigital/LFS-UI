import {requestPromiseJson} from "./requestPromise";
import { monthNumberToString } from "../Common_Functions";


function createNewBatch(batchType: string, year: string, period: string, description: string): Promise<any> {
    let formData = new FormData();

    formData.append("description", description);
    if(period[0] !== "Q") {
        let fullPeriod = monthNumberToString(parseInt(period)).substring(0,3) + " " + year
        formData.append("fullPeriod", fullPeriod);
    }
    let url = "/batches/" + batchType + "/" + year + (batchType !== 'annually' ? "/" + period : "");

    return requestPromiseJson("POST", url, formData);
}

function getBatchData(batchType: string, year: string, period: string): Promise<any> {
    let url = "/batches/display/" + batchType + "/" + year + (batchType !== 'annually' ? "/" + period : "");

    return requestPromiseJson("GET",url);
}

function getAllBatches(): Promise<any> {
    let url = "/dashboard";

    return requestPromiseJson("GET",url);
}

export {createNewBatch, getBatchData, getAllBatches}
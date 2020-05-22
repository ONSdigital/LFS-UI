import {requestPromiseJson} from "./requestPromise";

function createNewBatch(batchType: string, year: string, period: string, description: string): Promise<any> {
    let formData = new FormData();
    formData.append("description", description);
    let url = "imports/batches/" + batchType + "/" + year + (batchType !== 'annually' ? "/" + period : "");

    return requestPromiseJson("POST", url, formData);
}

function getBatchData(batchType: string, year: string, period: string): Promise<any> {
    let url = "/batches/display/" + batchType + "/" + year + (batchType !== 'annually' ? "/" + period : "");

    return requestPromiseJson("GET",url);
}

function getAllBatches(): Promise<any> {
    let url = "imports/dashboard";

    return requestPromiseJson("GET",url);
}

export {createNewBatch, getBatchData, getAllBatches}
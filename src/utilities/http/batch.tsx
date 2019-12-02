import {requestPromise} from "./requestPromise";

function createNewBatch(batchType: string, year: string, period: string, description: string): Promise<any> {
    let formData = new FormData();
    formData.append("description", description);
    let url = "/batches/" + batchType + "/" + year + (batchType !== 'annually' ? "/" + period : "");

    return requestPromise("POST", url, formData);
}

function getBatchData(batchType: string, year: string, period: string): Promise<any> {
    let url = "/batches/display/" + batchType + "/" + year + (batchType !== 'annually' ? "/" + period : "");

    return requestPromise("GET",url);
}

function getAllBatches(): Promise<any> {
    let url = "/dashboard";

    return requestPromise("GET",url);
}

export {createNewBatch, getBatchData, getAllBatches}
/* eslint-disable no-restricted-globals */
const workercode = () => {
    self.onmessage = function(e) {
        console.log('Polling Livy Server');
        // do the polling here then return the result
        function fetchStatus(batchNo) {
            const url = "http://localhost:3000/livy/batches/" + batchNo
            var state = fetch(url)
                .then(function(response) {return response.json()})
                .then(function(data) {
                    return data.state})
            return state
        };
        // do the polling here then return the result
        var refreshStatus = setInterval(async () => {
            const resp = await fetchStatus(e.data);
            if(resp !== "running") {
                //Posting message back to main script
                self.postMessage(resp);
                clearInterval(refreshStatus)
            }
        }, 1000);
    }
};


let code = workercode.toString();
code = code.substring(code.indexOf("{")+1, code.lastIndexOf("}"));

const blob = new Blob([code], {type: "application/javascript"});
const worker_script = URL.createObjectURL(blob);

module.exports = worker_script;
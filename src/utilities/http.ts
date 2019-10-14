const request = require('request');
const FormData = require('form-data');

const options = {
    url: 'http://127.0.0.1:8000/import/survey/1',

};

export function postFile(lfsfile: string, fileName: string, fileType: string, fileSource: string) {
    let form = new FormData();

    form.append('lfsfile', lfsfile);
    form.append('fileName',fileName);
    form.append('fileType', fileType);
    form.append('fileSource', fileSource);

    request.post(
        {
            url:'http://127.0.0.1:8000/import/survey/1',
            formData: form,
            headers: {
                'User-Agent': 'request',
                'Content-Type' : 'multipart/form-data'
            }
        }, function optionalCallback(err: Error, httpResponse: any, body: any) {
        console.error('upload:', httpResponse);
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
    });
}
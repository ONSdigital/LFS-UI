import { getMonthandYear } from "../../util/getMonthandYear"

export default function(url, payload) {
  let variableDefinitionsUrl = '/imports/variable/definitions/' + getMonthandYear("-", 17)
  console.log(url)
  console.log(payload)
  switch(url){
    // GB survey import
    case '/imports/survey/gb/2019/1': 
      console.log(url)
      return Promise.resolve({status: 200, json:()=> Promise.resolve({status: "OK"})})
    // Design weights import
    case '/imports/design/weights':{
      console.log(url)
      return Promise.resolve({status: 200, json:{status: "OK"}})}
    case '/audits/week/2019/1':
      console.log(url)
      return Promise.resolve([{
      uploadDate: "2020-01-09T12:57:45.013877Z",
      status: 3,
      message: "Insert survey row failed"
      }])
    case '/audits/monrh/2019/5':
      console.log(url)
      return Promise.resolve()
    case variableDefinitionsUrl:
      return Promise.resolve({status: 200, json:{status: "OK"}})
    case '/imports/population':
      return Promise.resolve({status: 200, json:{status: "OK"}})
    case '/population/report':
      console.log("herererere")
      var data = new Blob(["res"], {size: 1498187, type: 'application/vnd.ms-excel'});
      return Promise.resolve({status: 200, json:{status: "OK"}, blob:()=> Promise.resolve({blob: data})})
    case '/imports/survey/amendments/validate':
      let filename = payload.body.get("lfsFile").name
      if (filename === "Bulk Amendments.csv") 
        return Promise.resolve({status: 200, json:()=> Promise.resolve({status: "OK"})})
      else if (filename === "Bulk Amendments Reject.csv") 
        return Promise.resolve({status: 403, json:()=> Promise.resolve({status: "ERROR", errorMessage: "Unmatched items in Bulk Amendments file"})})
      return
    case '/imports/survey/amendments':
      return Promise.resolve({status: 200, json:()=> Promise.resolve({status: "OK"})})
    default: 
      console.log("default")
      return
  } 
}
  
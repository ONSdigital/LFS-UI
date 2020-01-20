export default function(url, payload) {
  console.log(url)
        switch(url){
          case '/imports/survey/gb/2019/1': 
            console.log(url)
            return Promise.resolve({status: 200, json:()=> Promise.resolve({status: "OK"})})
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
          default: 
           console.log("default")
           return
        } 
      }
  
export default function(url, payload) {
  console.log(url)
    return Promise.resolve({
      json: () => {
        switch(url){
          case '/imports/survey/gb/2019/1': 
            return Promise.resolve({status: "OK"})
          case '/audits/week/2019/1':
            return Promise.resolve([{
              uploadDate: "2020-01-09T12:57:45.013877Z",
              status: 3,
              message: "Insert survey row failed"
            }])
          case '/audits/monrh/2019/5':
            return Promise.resolve()
            default: return
        } 
      }
   })
  }
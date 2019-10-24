import {Cookies} from "react-cookie";
import moment from "moment";

function loginUser(username: string, password: string, cookies: Cookies) {
    const request = async () => {
        const res = await fetch("/login/" + username, {
            "headers":{
                "password": password
            }
        });
        const data = await res.json();

        //TODO: Intermittent bug with login. Remove console.log when resolved
        console.log("DEBUG: password = " + password);
        console.log("DEBUG: data.status = " + data.status);

        if(data.status === "OK") {
            let user = {
                name: username
            };

            // Set Session Cookie, Expires in 30 minutes
            let cookieExpire = moment(new Date()).add(30, 'm').toDate();
            cookies.set('username', user.name, { path: '/' , expires: cookieExpire});
            return user;
        }
        return null;
    };

    return request()
}

export {
    loginUser
}
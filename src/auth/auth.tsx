import {Cookies} from "react-cookie";
import dateFormatter from "dayjs";

function createNewUserCookie(cookies: Cookies, user: { name: string }) {
    // Set Session Cookie, Expires in 30 minutes
    let cookieExpire = dateFormatter(new Date()).add(30, 'm').toDate();
    cookies.set('username', user.name, {path: '/', expires: cookieExpire, sameSite: true});
    return user;

}

function loginUser(username: string, password: string, cookies: Cookies) {
    const request = async () => {
        const res = await fetch("/login/" + username, {
            "headers":{
                "password": password
            }
        });

        // Temp User Setup for when React can't get to the server to authenticate in development environment
        if (!res.ok && process.env.NODE_ENV === 'development') {
            console.log("Error Calling Server, Setting TEMP USER");
            return createNewUserCookie(cookies, {name: "DEV_USER"});
        }
        const data = await res.json();

        //TODO: Intermittent bug with login. Remove console.log when resolved
        console.log("DEBUG: password = " + password);
        console.log("DEBUG: data.status = " + data.status);

        if(data.status === "OK") {
            let user = {
                name: username
            };
            return createNewUserCookie(cookies, user);
        }
        return null;
    };

    return request()
}

export {
    loginUser
}
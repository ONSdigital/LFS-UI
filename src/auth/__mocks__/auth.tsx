import {Cookies} from "react-cookie";

function loginUser(username: string, password: string, cookies: Cookies) {
    return {
        name: "user"
    };
}

export {
    loginUser
}
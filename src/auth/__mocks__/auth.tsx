import {Cookies} from "react-cookie";

function loginUser(username: string, password: string, cookies: Cookies) {
    const request = () => {
        console.log("AUTH MOCK - Username: " + username + " Password : " + password);
        if (username === "Admin" && password === "password") {
            cookies.set("username", username, {path: "/", expires: new Date(), sameSite: true});
            return {
                name: "Admin"
            };
        } else {
            return null;
        }
    };

    return request();
}

export {
    loginUser
};
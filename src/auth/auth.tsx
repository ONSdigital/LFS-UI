let users: any[] = []

function loginUser(username: string, password: string) {
    const request = async () => {
        const res = await fetch("/login/" + username, {
            "headers":{
                "password": password
            }
        });
        const data = await res.json();

        //TODO: Intermittent bug with login. Remove console.log when resolved --->
        console.log("DEBUG: password = " + password)
        console.log("DEBUG: data.status = " + data.status)
        //TODO: <---

        if(data.status === "OK"){
            let user = {
                name: username,
                //TODO: Role functionality to be removed
                role: {
                    name: "Admin",
                    pages: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                }
            };
            return user
        }
        return undefined;
    };

    return request()
}

function verifyUserToken() {

    let tokens = getTokens();

    console.log(tokens);
    if (tokens !== undefined) {
        let user = {
            name: "Admin",
            role: {
                name: "Admin",
                pages: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            }
        };
        return user;
    }
    return undefined;
}

function storeTokens(token: string, refreshToken: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
}

function getTokens() {
    let token: string = '';
    let refreshToken: string = '';

    let storedToken: any = localStorage.getItem("token");
    if (typeof storedToken === 'string') {
        token = storedToken
    }

    let storedRefreshToken: any = localStorage.getItem("refreshToken");
    if (typeof storedRefreshToken === 'string') {
        refreshToken = storedRefreshToken
    }

    if (token !== '' && refreshToken !== '') {
        return [token, refreshToken];
    }
    return undefined
}


export {
    loginUser,
    verifyUserToken
}
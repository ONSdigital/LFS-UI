let users: any[] = []

function getUsers() {
    console.log("getUsers start")
    fetch('/jsons/Users.json')
        .then(response => response.json())
        .then(response => users = response.Rows)
    console.log("users: " + users)
    console.log("getUsers end")
    return users

}

function loginUser(username: string, password: string) {
    console.log("loginUser: " + username)
    let userList: any[] = getUsers();
    console.log("loginUser continued...")
    console.log(userList);
    let serverURL = process.env.SERVER_URL;

    fetch ("/login/" + username)
        .then(res => res.json())
        .then((data) => {
            console.log("got this: " + data);
            let user = {
                name: "Admin",
                role: {
                    name: "Admin",
                    pages: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                }
            };
            return user
            console.log("user: " + user)
        })
        .catch(console.log);

    return ''
}

function verifyUserToken() {
    // TODO: send to sever and authenticate the token
    let tokens = getTokens()

    console.log(tokens)
    if (tokens !== undefined) {
        let user = {
            name: "Admin",
            role: {
                name: "Admin",
                pages: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            }
        }
        return user;
    }
    return undefined;
}

function storeTokens(token: string, refreshToken: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
}

function getTokens() {
    let token: string = ''
    let refreshToken: string = ''

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
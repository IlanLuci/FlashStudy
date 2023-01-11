const liveServer = 'https://api.flashstudy.org';
const localServer = 'http://localhost:5000';
const activeServer = location.host.startsWith('localhost') ? localServer : liveServer;

let cookies = document.cookie.split(';');
let jwt;

for (cookie in cookies) {
    if (cookies[cookie].trim().startsWith('jwt')) {
        jwt = cookies[cookie].trim().slice(4);
    }
}

function fetcher(endpoint, options) {
    let updatedOptions = { ...options };

    if (jwt) {
        updatedOptions.headers = {
            ...options ? options.headers : null,
            'x-access-token': jwt
        }
    }
    return fetch(`${activeServer}${endpoint}`, updatedOptions)
}

function logout() {
    //remove jwt from user storage
    document.cookie = 'jwt=';

    //log out user on backend
    // ...
    
    //reload page
    location.reload();
}
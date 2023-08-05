const liveServer = 'https://api.flashstudy.org/v1';
const localServer = 'http://localhost:5001';
const activeServer = location.host.startsWith('localhost') || location.host.startsWith('127.0.0.1')  ? localServer : liveServer;

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
            'x-access-token': jwt,
            // not sure if this actually works as expected -- hopefully reduces preflight requests?
            'Access-Control-Max-Age': 86400
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

// dropdown in header
function dropdown() {
    document.getElementById("dropdown").classList.toggle("show");
}

window.onclick = (event) => {
    if (!event.target.matches('#new')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
        
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

if (navigator.userAgent.match(/Android/i)
|| navigator.userAgent.match(/webOS/i)
|| navigator.userAgent.match(/iPhone/i)
|| navigator.userAgent.match(/iPad/i)
|| navigator.userAgent.match(/iPod/i)
|| navigator.userAgent.match(/BlackBerry/i)
|| navigator.userAgent.match(/Windows Phone/i)) {
    if (!location.pathname.startsWith('/mobile')) {
        window.open('/mobile', '_self');
    }
}
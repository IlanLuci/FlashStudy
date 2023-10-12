const liveServer = 'https://api.flashstudy.org/v1';
const localServer = 'http://localhost:5001/v1';
const activeServer = location.host.startsWith('localhost') || location.host.startsWith('127.0.0.1') ? localServer : liveServer;

function fetcher(endpoint, options) {
    let updatedOptions = { ...options };

    updatedOptions.headers = {
        ...options ? options.headers : null,
    }

    // allow set cookie headers and such
    updatedOptions.credentials = 'include';

    return fetch(`${activeServer}${endpoint}`, updatedOptions)
}

async function logout() {
    await fetcher('/auth/logout')
    
    //reload page
    location.assign('/');
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
const liveServer = 'https://api.flashstudy.org/v1';
const localServer = 'http://localhost:5001/v1';
const activeServer = location.host.startsWith('localhost') || location.host.startsWith('127.0.0.1') ? localServer : liveServer;

let _refreshInFlight = null;
function _tryRefresh() {
    if (!_refreshInFlight) {
        _refreshInFlight = fetch(`${activeServer}/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
        }).then(r => r.ok).catch(() => false).finally(() => { _refreshInFlight = null; });
    }
    return _refreshInFlight;
}

async function fetcher(endpoint, options) {
    const skipRefresh =
        endpoint.startsWith('/auth/refresh') ||
        endpoint.startsWith('/auth/login') ||
        endpoint.startsWith('/auth/register');

    const updatedOptions = { ...options };
    updatedOptions.headers = { ...(options ? options.headers : null) };
    updatedOptions.credentials = 'include';

    let response;
    try {
        response = await fetch(`${activeServer}${endpoint}`, updatedOptions);
    } catch (err) {
        alert('Connection error');
        return null;
    }

    if (response.status === 401 && !skipRefresh) {
        const refreshed = await _tryRefresh();
        if (refreshed) {
            try {
                response = await fetch(`${activeServer}${endpoint}`, updatedOptions);
            } catch (err) {
                alert('Connection error');
                return null;
            }
        }
    }

    return response;
}

async function logout() {
    await fetcher('/auth/logout');
    location.assign('/');
}

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

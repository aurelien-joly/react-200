import fetchIntercept from 'fetch-intercept';
import {getLoginInfo} from './hardCodedCredentials';

function setAuthorization(header){
    if (JSON.parse(localStorage.getItem('user')) != null){
        header.append('Authorization','Bearer ' + JSON.parse(localStorage.getItem('user')).id_token);
    }
}

fetchIntercept.register({
    request: function (url, config) {
        let headers;
        if (config === undefined){
            config = {};
            headers = new Headers();
        }else{
            headers = new Headers(config.headers);
        }
        setAuthorization(headers);
        config.headers = headers;
        return [url, config];
    },
    requestError: function (error) {
        return Promise.reject(error);
    },
    response: function (response) {
        return response;
    },
    responseError: function (error) {
        return Promise.reject(error);
    }
});




const authenticationOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body : JSON.stringify(getLoginInfo())
};

export function authenticate() {
    if (localStorage.getItem('user') == null){
        return fetch(`api/authenticate`, authenticationOptions)
            .then(handleResponse);
    }
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('user');
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        localStorage.setItem('user', JSON.stringify(data));
    });
}
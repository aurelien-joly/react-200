export async function fetchPeople() {
  if (localStorage.getItem('user') == null){
    authenticate();
  }
  const response = await fetch('/api/people',{
  headers: {
       'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('user')).id_token
     }
  });
  return await response.json();
}


export async function searchPeople(searchString) {
  if (localStorage.getItem('user') == null){
    authenticate();
  }
  const response = await fetch('/api/_search/people?query='+searchString,{
  headers: {
       'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('user')).id_token
     }
  });
  return await response.json();
}

export async function updatePerson(id, patch) {
  if (localStorage.getItem('user') == null){
    authenticate();
  }
  const response = await fetch(`/api/people/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(patch),
    headers: { 'Content-Type': 'application/json' }
  });
  return await response.json();
}

function authenticate() {
    var loginInfo = '{"password": "admin","rememberMe": true,"username": "admin"}';
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body : loginInfo
    };
    console.log("authenticating user");
    return fetch(`api/authenticate`, requestOptions)
        .then(handleResponse)
        .then(token => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(token));

            return token;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function logout(){
    localStorage.removeItem('user');
}

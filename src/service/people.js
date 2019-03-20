import {authenticate} from './authentication'

export async function fetchPeople() {
  await authenticate();
  const response = await fetch('/api/people');
  return await response.json();
}


export async function searchPeople(searchString) {
  await authenticate();
  const response = await fetch('/api/_search/people?query='+searchString,);
  return await response.json();
}

export async function updatePerson(id, patch) {
  await authenticate();
  patch.id = id;
  const response = await fetch(`/api/people/`+id, {
    method: 'PATCH',
    body: JSON.stringify(patch),
    headers: { 'Content-Type': 'application/json' }
  });
  return await response.json();
}



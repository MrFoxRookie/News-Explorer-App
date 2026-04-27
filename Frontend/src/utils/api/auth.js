const BASE_URL = import.meta.env.VITE_API_URL;

function handleResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }

  return res.json();
}

export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
}

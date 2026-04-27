const BASE_URL = import.meta.env.VITE_API_URL;

function handleResponse(res) {
  if (!res.ok) {
    return Promise.reject(new Error(`Error: ${res.status}`));
  }

  return res.json();
}

export function handleSignin(email, password) {
  return fetch(`${BASE_URL}/users/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(handleResponse);
}

const BASE_URL = import.meta.env.VITE_API_URL;

function handleResponse(res) {
  if (!res.ok) {
    return res.json().then((err) => Promise.reject(err));
  }

  return res.json();
}

export function handleSignup(email, password, username) {
  return fetch(`${BASE_URL}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      username,
    }),
  }).then(handleResponse);
}

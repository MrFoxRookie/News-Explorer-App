const BASE_URL = import.meta.env.VITE_API_URL;

function handleResponse(res) {
  if (!res.ok) {
    return Promise.reject(new Error(`Error: ${res.status}`));
  }

  return res.json();
}

export function handleGetSavedArticles() {
  const token = localStorage.getItem("token");

  return fetch(`${BASE_URL}/saved-news`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
}

const BASE_URL = import.meta.env.VITE_API_URL;

function handleResponse(res) {
  if (!res.ok) {
    return Promise.reject(new Error(`Error: ${res.status}`));
  }

  return res.json();
}

export function handleAddArticle({
  description,
  publishedAt,
  source,
  title,
  url,
  urlToImage,
}) {
  const token = localStorage.getItem("token");

  return fetch(`${BASE_URL}/saved-news`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      description,
      publishedAt,
      source,
      title,
      url,
      urlToImage,
    }),
  }).then(handleResponse);
}

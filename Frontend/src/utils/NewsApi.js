class NewsApi {
  constructor({ baseUrl, apiKey }) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  getNews(keyword) {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const from = sevenDaysAgo.toISOString().split("T")[0];
    const to = today.toISOString().split("T")[0];

    return fetch(
      `${this.baseUrl}/everything?q=${keyword}&from=${from}&to=${to}&pageSize=100&apiKey=${this.apiKey}`,
    ).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    });
  }
}

export const newsApi = new NewsApi({
  baseUrl: "https://nomoreparties.co/news/v2",
  apiKey: "5febb8273de444a9ab310a34fc50b056",
});

export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  async _makeRequest(endPoint, method = "GET", body = null) {
    const options = {
      method,
      headers: { ...this._headers },
    };
    if (body) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }
    try {
      const res = await fetch(`${this._baseUrl}/${endPoint}`, options);
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      return await res.json();
    } catch (err) {
      return console.log(err);
    }
  }
  async getInitialCards() {
    return this._makeRequest("/cards");
  }
  async getUserInfo() {
    return this._makeRequest("/users/me");
  }
  async setUserInfo(name, about) {
    return this._makeRequest("/users/me", "PATCH", { name, about });
  }
  async addCard(data) {
    return this._makeRequest("/cards", "POST", data);
  }
  async removeCard(cardId) {
    return this._makeRequest(`/cards/${cardId}`, "DELETE");
  }
  async likeCard(cardId) {
    return this._makeRequest(`/cards/${cardId}/likes`, "PUT");
  }
  async removeLike(cardId) {
    return this._makeRequest(`/cards/${cardId}/likes`, "DELETE");
  }
  async updateAvatar(data) {
    return this._makeRequest("/users/me/avatar", "PATCH", data);
  }
  async getUserInfoAndCards() {
    try {
      const [userInfo, cards] = await Promise.all([
        this.getUserInfo(),
        this.getInitialCards(),
      ]);
      return { userInfo, cards };
    } catch (error) {
      return await Promise.reject(error);
    }
  }
}

import { urlApi, ACCESS_TOKEN, REFRESH_TOKEN } from './consts';

class Api {
  constructor(url) {
    this._url = url;
  }

  _getResponseData(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  }

  //получение ингредиентов с сервера
  getIngredients() {
    return fetch(`${this._url}/api/ingredients`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  //создание заказа
  async addOrder(request) {
    const res = await fetch(`${this._url}/api/orders`, request);

    return this._getResponseData(res);
  }

  //создание пользователя
  async addUser(request) {
    const res = await fetch(`${this._url}/api/auth/register`, request);

    return this._getResponseData(res);
  }

  //авторизация пользователя
  async authUser(request) {
    const res = await fetch(`${this._url}/api/auth/login`, request);

    return this._getResponseData(res)
  }

  //запрос на востановление пароля
  async forgotUserPassword(request) {
    const res = await fetch(`${this._url}/api/password-reset`, request);

    return this._getResponseData(res);
  }

  //сброс пароля
  async resetUserPassword(request) {
    const res = await fetch(`${this._url}/api/password-reset/reset`, request);

    return this._getResponseData(res);
  }

  //выход из профиля
  async outUser(request) {
    const res = await fetch(`${this._url}/api/auth/logout`, request);

    return this._getResponseData(res)
  }

  //обновляем accessToken токен
  async refreshToken() {
    const res = await  fetch(`${this._url}/api/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem(REFRESH_TOKEN),
      }),
    })

    return this._getResponseData(res);
  };

  async getUser(request) {
    try{
      const res = await fetch(`${this._url}/api/auth/user`, request);
      return await this._getResponseData(res);
    }
    catch (err) {
      if (err.message === "jwt expired") {
        const refreshData = await this.refreshToken(); //обновляем токен
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem(REFRESH_TOKEN, refreshData.refreshToken);
        localStorage.setItem(ACCESS_TOKEN, refreshData.accessToken);
        request.headers.authorization = refreshData.accessToken;
        const res = await fetch(`${this._url}/api/auth/user`, request); //повторяем запрос
        return this._getResponseData(res);
      } else {
        return Promise.reject(err);
      }
    }
  }

  async updateUser(request) {
    try{
      const res = await fetch(`${this._url}/api/auth/user`, request);
      return await this._getResponseData(res);
    }
    catch (err) {
      if (err.message === "jwt expired") {
        const refreshData = await this.refreshToken(); //обновляем токен
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem(REFRESH_TOKEN, refreshData.refreshToken);
        localStorage.setItem(ACCESS_TOKEN, refreshData.accessToken);
        request.headers.authorization = refreshData.accessToken;
        const res = await fetch(`${this._url}/api/auth/user`, request); //повторяем запрос
        return this._getResponseData(res);
      } else {
        return Promise.reject(err);
      }
    }
  }
}

export const api = new Api(urlApi);

import { urlApi } from './consts';

class Api {
  constructor(url) {
    url = this.url;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    return res.json();
  }

  //получение ингредиентов с сервера
  getIngredients() {
    return fetch(`${urlApi}/api/ingredients`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}

export const api = new Api(urlApi);

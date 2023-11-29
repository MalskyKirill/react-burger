import { urlApi } from './consts';

class Api {
  constructor(url) {
    this._url = url;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    return res.json();
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
  addOrder(indrediantsId) {
    return fetch(`${this._url}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ingredients: indrediantsId}),
    }).then((res) => {
      return this._getResponseData(res);
    })
  }
}

export const api = new Api(urlApi);

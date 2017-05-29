import 'es6-promise';

const API_ROOT = 'http://127.0.0.1:3001';

function anonymLogin() {
  return fetch(`${ API_ROOT }/registrate_anonym`, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    //body: JSON.stringify({ a: 7, str: 'Some string: &=&' }),
  }).then(res => res.json())
    .then(res => {
      const { token } = res;
      localStorage.token = token;
      return fetch(`${ API_ROOT }/api/user?token=${ token }`, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(res => res.json())
        .then(res => ({
          token,
          user: res.user,
          expiredAt: new Date(res.expiredAt),
        }));
    });
}

function loggedIn() {
  return !!localStorage.token;
},

function getToken() {
  return localStorage.token;
},


export default {
  anonymLogin, loggedIn, getToken
};

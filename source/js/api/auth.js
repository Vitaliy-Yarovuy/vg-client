import 'es6-promise';

const API_ROOT = `http://${location.hostname}:3001`;

localStorage.token = null;

 let _token;


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
      //localStorage.token = token;
      _token = token;
      return getUserInfo();  
    });
}

function getUserInfo(){
   const token = getToken();
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
}

function loggedIn() {
  return !!_token;
  //return !!localStorage.token;
}

function getToken() {
  return _token;
  // return localStorage.token;
}

export default {
  anonymLogin, loggedIn, getToken
};

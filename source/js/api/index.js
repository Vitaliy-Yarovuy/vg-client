import 'es6-promise';

function testAsync() {
  return new Promise(resolve => {
    setTimeout(() => {
      const date = new Date();
      let seconds = date.getSeconds();
      let minutes = date.getMinutes();

      seconds = seconds < 10 ? `0${ seconds }` : seconds;
      minutes = minutes < 10 ? `0${ minutes }` : minutes;

      resolve(`Current time: ${ date.getHours() }:${ minutes }:${ seconds }`);
    }, (Math.random() * 1000) + 1000); // 1-2 seconds delay
  });
}



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

      return fetch(`${ API_ROOT }/api/user`, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ token }`,
        },
      }).then(res => res.json())
        .then(res => ({
          token,
          user: res.user,
          expiredAt: new Date(res.expiredAt),
        }));
    });
}


export default {
  testAsync, anonymLogin,
};

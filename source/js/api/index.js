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


function anonymLogin() {
  return fetch('http://127.0.0.1:3001/registate_anonym', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    //body: JSON.stringify({ a: 7, str: 'Some string: &=&' }),
  }).then(res => res.json())
    .then(res => {
      const { token, user } = res;

      return {
        token,
        user
      };

      // fetch('http://127.0.0.1:3001/restricted', {
      //   method: 'get',
      //   headers: {
      //     'Authorization': `Bearer ${ token }`,
      //   },
      // }).then(res => console.log(res));
    });
}


export default {
  testAsync, anonymLogin,
};

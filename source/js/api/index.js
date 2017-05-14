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
const API_WS_ROOT = 'ws://127.0.0.1:3002';

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

      connectWS(`${ API_WS_ROOT }/ws?token=${ token }`)

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


function connectWS(uri){
  let ws = new WebSocket(uri)

  ws.onopen = function() {
    console.log('Connected');
  }

  ws.onmessage = function(evt) {
    console.log('message:',evt.data);
  }

  setInterval(function() {
    ws.send('Hello, Server!');
  }, 1000);

}


export default {
  testAsync, anonymLogin,
};

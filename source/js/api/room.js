import { ANONYM_LOGIN_ACTION_SUCCESS, LOGOUT_ACTION } from 'actions/auth';
import { getToken } from 'api/auth';

const API_WS_ROOT = 'ws://127.0.0.1:3002';
let ws = null;


function connect(){
  ws = new WebSocket(`${ API_WS_ROOT }/ws?token=${ getToken() }`);


  ws.onopen = function() {
    console.log('Connected');
  }

  ws.onmessage = function(evt) {
    console.log('message:',evt.data);
  }

  ws.onclose = function(evt) {
    clearInterval(id);
    ws = null
    console.log('Closed:',evt);
  }

  let id = setInterval(function() {
    ws.send('Hello, Server!');
  }, 1000);

}

function disconnect(){
  ws.close();
}


function load(){
  return fetch(`http://127.0.0.1:3002/room?token=${ getToken() }`, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    //body: JSON.stringify({ a: 7, str: 'Some string: &=&' }),
  }).then(res => res.json())
}




export default {
  connect, disconnect, load
};


// export default  ({ dispatch })=> next => action => {
//     if(action.type === ANONYM_LOGIN_ACTION_SUCCESS) {
//       connect(action.data.token);
//     }
//     if(action.type === LOGOUT_ACTION) {
//       disconnect();
//     }
//     return next(action);
// }


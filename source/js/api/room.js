import { ANONYM_LOGIN_ACTION_SUCCESS, LOGOUT_ACTION } from 'actions/auth';
import auth from 'api/auth';

const API_WS_ROOT = 'ws://127.0.0.1:3002';
let ws = null;
const loop = ()=>null;

function connect(onOpen = loop, onMessage = loop, onclose = loop){
  const token = auth.getToken();
  ws = new WebSocket(`${ API_WS_ROOT }/ws?token=${ token }`);

  ws.onopen = function() {
    console.log('Connected');
    onOpen();
  }

  ws.onmessage = function(evt) {
    console.log('message:',evt.data);
    onMessage(evt);
  }

  ws.onclose = function(evt) {
    clearInterval(id);
    ws = null
    console.log('Closed:',evt);
    onclose();
  }

  let id = setInterval(function() {
    ws.send('Hello, Server!');
  }, 1000);

}

function disconnect(){
  ws.close();
}


function load(){
  const token = auth.getToken();
  return fetch(`http://127.0.0.1:3002/room?token=${ token }`, {
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


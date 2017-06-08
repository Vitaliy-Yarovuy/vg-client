import { ANONYM_LOGIN_ACTION_SUCCESS, LOGOUT_ACTION } from 'actions/auth';
import auth from 'api/auth';

const API_WS_ROOT = `ws://${location.hostname}:3002`;
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
    console.log('message:', evt.data);
    try{
      const data = JSON.parse(evt.data);
      onMessage(data);
    } catch(e){};
  }

  ws.onclose = function(evt) {
    ws = null
    console.log('Closed:',evt);
    onclose();
  }

}

function disconnect(){
  ws && ws.close();
}


function send(message){
   ws && ws.send(JSON.stringify(message));
}


function load(){
  const token = auth.getToken();
  return fetch(`http://${location.hostname}:3002/room?token=${ token }`, {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())
}




export default {
  connect, disconnect, load, send
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


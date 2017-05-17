const API_WS_ROOT = 'ws://127.0.0.1:3002';
let ws = null;


function connect(token){
  ws = new WebSocket(`${ API_WS_ROOT }/ws?token=${ token }`)

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



export default {
  connect, disconnect,
};

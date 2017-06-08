import api from 'api/room';
import {responceWaiting} from 'actions/app';

export const ENTER_ROOM_ACTION= 'ENTER_ROOM_ACTION';
export const LEAVE_ROOM_ACTION = 'LEAVE_ROOM_ACTION';
export const LOAD_ROOM_STATE_ACTION = 'LOAD_ROOM_STATE_ACTION';
//export const SEND_MESSAGE_ACTION = 'SEND_MESSAGE_ACTION';
export const RECEIVE_MESSAGE_ACTION = 'RECEIVE_MESSAGE_ACTION';


function enterRoom() {
  return {
    type: ENTER_ROOM_ACTION
  };
}

function leaveRoom() {
  return {
    type: LEAVE_ROOM_ACTION,
  };
}


function loadRoomData(data) {
  return {
    type: LOAD_ROOM_STATE_ACTION,
    data
  };
}

function leaveRoom() {
  return {
    type: LEAVE_ROOM_ACTION,
  };
}

function receiveMessage(user, message) {
  return {
    type: RECEIVE_MESSAGE_ACTION,
    data: { user, message }
  };
}



export function enterAndConnectToRoom() {
  	return (dispatch) => {
	    dispatch(responceWaiting(true));
		api.load().then((data)=>{
			dispatch(loadRoomData(data));
			api.connect(()=>{
				setTimeout(() => {
				 	dispatch(responceWaiting(false));
				 	dispatch(enterRoom());
				}, 500);
			},(receiveData)=>{
				const {user, message} = receiveData;
				dispatch(receiveMessage(user, message));
			})	
		})
  };
}

export function leaveAndDisconectToRoom() {
	return (dispatch) => {	
		api.disconnect();
	 	dispatch(leaveRoom());
	}; 
}


export function sendMessage(message) {
	return (dispatch) => {	
		api.send({message});
	 	// dispatch(receiveMessage('me', message));
	}; 
}

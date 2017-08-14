import api from 'api/room';
import {responceWaiting} from 'actions/app';
import  uuid from 'uuid/v1';

export const ENTER_ROOM_ACTION= 'ENTER_ROOM_ACTION';
export const LEAVE_ROOM_ACTION = 'LEAVE_ROOM_ACTION';
export const USER_ENTERED_ROOM_ACTION= 'USER_ENTERED_ROOM_ACTION';
export const USER_LEAVED_ROOM_ACTION = 'USER_LEAVED_ROOM_ACTION';
export const LOAD_ROOM_STATE_ACTION = 'LOAD_ROOM_STATE_ACTION';
export const SEND_MESSAGE_ACTION = 'SEND_MESSAGE_ACTION';
export const RECEIVE_MESSAGE_ACTION = 'RECEIVE_MESSAGE_ACTION';
export const CREATE_ONLINE_GAME_ACTION = 'CREATE_ONLINE_GAME_ACTION';
export const JOIN_ONLINE_GAME_ACTION = 'JOIN_ONLINE_GAME_ACTION';


const addID = (obj)=>({id: uuid(), ...obj});

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
    user,
    data: message
  };
}


function createGameMessage(user, message) {
  return addID({
    type: CREATE_ONLINE_GAME_ACTION,
    user,
    data: message
  });
}

function joinGameMessage(user, id) {
  return addID({
    type: JOIN_ONLINE_GAME_ACTION,
    user,
    data: id
  });
}




export function enterAndConnectToRoom() {
  	return (dispatch) => {
	    dispatch(responceWaiting(true));

  		api.load().then((data)=>{
  			dispatch(loadRoomData(data));

  			api.connect(() => {
  				setTimeout(() => {
  				 	dispatch(responceWaiting(false));
  				 	dispatch(enterRoom());
  				}, 500);
  			},(receiveData)=>{
  				console.log('receive from ws')
  				dispatch(receiveData);
  			});	

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
	return (dispatch, getState) => {	
    const { user } = getState().app; 
		api.send(addID({user, type:SEND_MESSAGE_ACTION, data:message}));
	 	dispatch(receiveMessage('me', message));
	}; 
}

export function createGame(message) {
  return (dispatch, getState) => {
    dispatch(responceWaiting(true));
    const { user } = getState().app;  
    api.send(createGameMessage(user, message));
  }; 
}



export const RESPONCE_WAITING = 'RESPONCE_WAITING';
export const LOGOUT_ACTION = 'LOGOUT_ACTION';
export const LOGIN_ACTION = 'LOGIN_ACTION';


export function responceWaiting(data) {
  return { 
  	type: RESPONCE_WAITING, 
  	data, 
  };
}

export function login(data) {
  return {
    type: LOGIN_ACTION,
    data,
  };
}

export function logout() {
  return {
    type: LOGOUT_ACTION,
  };
}

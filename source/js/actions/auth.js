import api from 'api';


export const LOGOUT_ACTION = 'LOGOUT_ACTION';
export const ANONYM_LOGIN_ACTION_START = 'ANONYM_LOGIN_ACTION_START';
export const ANONYM_LOGIN_ACTION_SUCCESS = 'ANONYM_LOGIN_ACTION_SUCCESS';


function anonymLoginStart() {
  return {
    type: ANONYM_LOGIN_ACTION_START,
  };
}

function anonymLoginSuccess(data) {
  return {
    type: ANONYM_LOGIN_ACTION_SUCCESS,
    data,
  };
}

export function anonymLogin() {
  return (dispatch) => {
    dispatch(anonymLoginStart());

    api.anonymLogin()
      .then(data => {
        setTimeout( () => dispatch(anonymLoginSuccess(data)), 500);
      });
      // .catch(error => dispatch(testAsyncError(error)));
  };
}

export function logout() {
  return {
    type: LOGOUT_ACTION,
  };
}



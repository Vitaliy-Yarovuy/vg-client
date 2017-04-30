import api from 'api';


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
  return function (dispatch) {
    dispatch(anonymLoginStart());

    api.anonymLogin()
      .then(data => dispatch(anonymLoginSuccess(data)));
      // .catch(error => dispatch(testAsyncError(error)));
  };
}

// Update

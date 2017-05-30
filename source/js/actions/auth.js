import api from 'api/auth';
import {responceWaiting, login, logout} from 'actions/app';



function anonymLogin() {
  return (dispatch) => {
    dispatch(responceWaiting(true));
    
    api.anonymLogin()
      .then(data => {
        setTimeout( () => {
          dispatch(responceWaiting(false));
          dispatch(login(data));
        }, 500);
      });
      // .catch(error => dispatch(testAsyncError(error)));
  };
}


export {
  anonymLogin, logout
}
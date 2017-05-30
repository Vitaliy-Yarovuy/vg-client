import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { anonymLogin, logout } from 'actions/auth';
import { enterAndConnectToRoom, leaveAndDisconectToRoom } from 'actions/room';


@connect(state => ({
  app: state.app,
  room: state.room
}))
export default class AuthPage extends Component {
  static propTypes = {
    app: PropTypes.object,
    room: PropTypes.object,
    dispatch: PropTypes.func,
  };

  render() {
    const {
      app,
      room,
      dispatch,
    } = this.props;

    const login = () => {
      return dispatch(anonymLogin());
    };

    const logoutAction = () => {
      return dispatch(logout());
    };

    const enterToRoom = () => {
      return dispatch(enterAndConnectToRoom());
    };

    const leaveRoom = () => {
      return dispatch(leaveAndDisconectToRoom());
    };



    return (
      <div className='BoardPage' style={{ position: 'relative' }}>
        <h2>AUTH</h2>
        <dl className='dl-horizontal' >
          <dt>user</dt>
          <dd>{app.user || '...'}</dd>
          <dt>token</dt>
          <dd style={{ wordBreak: 'break-word' }}>{app.token || '...'}</dd>
        </dl>


        <div className='btn-group' role='group'>
          <Button bsStyle='primary' onClick={ login } disabled={ !!app.user }>Login as Noname</Button>
          <Button bsStyle='primary' onClick={ logoutAction } disabled={ !app.user }>Log out</Button>
        </div>

        
        <hr />
        { app.user ?
          <div>
            <h2>Room</h2>
            <div className='btn-group' role='group'>
              <Button bsStyle='primary' onClick={ enterToRoom } disabled={ !!room.entered }>Enter</Button>
              <Button bsStyle='primary' onClick={ leaveRoom } disabled={ !room.entered }>Leave</Button>
            </div>
          </div>
          :null  
        }    

      </div>
    );
  }
}

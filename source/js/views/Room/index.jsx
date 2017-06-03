import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, FormControl } from 'react-bootstrap';
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

    const enterToRoom = () => {
      return dispatch(enterAndConnectToRoom());
    };

    const leaveRoom = () => {
      return dispatch(leaveAndDisconectToRoom());
    };

    const sendMessage = () => {
      return alert(this.messageText.value);
    };

    return (
      <div className='RoomPage' style={{ position: 'relative' }}>
        <h2>Room</h2>
        <div className='btn-group' role='group'>
          <Button bsStyle='primary' onClick={ enterToRoom } disabled={ !!room.entered }>Enter</Button>
          <Button bsStyle='primary' onClick={ leaveRoom } disabled={ !room.entered }>Leave</Button>
        </div>
        <h3>users:</h3>
        <p>
            {room.users.map(user => 
               <kbd style={{marginRight: '5px'}}>{user}</kbd>  
            )}
        </p>
        <h3>boards:</h3>
        <p>---</p>
        <h3>messages:</h3>
        <section>
            {room.msgs.map(message => 
              <p>{message}</p>
            )}
        </section>   
        <FormControl inputRef={(input) => { this.messageText = input; }} componentClass="textarea" placeholder="textarea" />
        <Button bsStyle='secondary' onClick={ sendMessage } >submit</Button>
      </div>
    );
  }
}

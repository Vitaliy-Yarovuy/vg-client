import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, FormControl, FormGroup, InputGroup, Table } from 'react-bootstrap';
import { anonymLogin, logout } from 'actions/auth';
import { enterAndConnectToRoom, leaveAndDisconectToRoom, sendMessage, createGame } from 'actions/room';


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

    const sendMsg = () => setTimeout (()=>{
      const message = this.messageText.value;
      this.messageText.value = '';
      return dispatch(sendMessage(message));
    });

    const createMatch = () => setTimeout (()=>{
      const message = this.gameTitle.value;
      this.gameTitle.value = '';
      return dispatch(createGame(message));
    });

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


        <FormGroup>
          <InputGroup>
            <FormControl  inputRef={(input) => { this.gameTitle = input; }}  type="text" />
            <InputGroup.Button>
              <Button onClick={ createMatch }>create match</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>


        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>#</th>
              <th>title</th>
              <th>user</th>
              <th>join</th>
            </tr>
          </thead>
          <tbody>
            {room.games.map((game,i)=>(
              <tr key={i+'g'}>
                <td>{i}</td>
                <td>{game.title}</td>
                <td>{game.user}</td>
                <td><Button bsStyle='primary'>Join</Button></td>
              </tr>
              ) 
            )}
          </tbody>
        </Table>
      
        <h3>messages:</h3>
        <dl className='dl-horizontal' >
            { room.msgs.map((msg,i)=> 
              ([
                <dt key={i+'u'}>{msg.user || '...'}</dt>, 
                <dd key={i+'m'}>{msg.message}</dd>
              ])
            )}
        </dl>
 
        <FormControl 
            inputRef={(input) => { this.messageText = input; }} 
            onKeyPress={(target) => (target.charCode === 13 && sendMsg())}
            componentClass="textarea" placeholder="textarea" />
        <Button bsStyle='info' onClick={ sendMsg } >submit</Button>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import { browserHistory } from 'react-router';
import { startSingleGame } from 'actions/game';


@connect(state => state)
export default class HomePage extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  };

  startSingleGame() {
    const dispatch = this.props.dispatch;
    dispatch(startSingleGame());
    browserHistory.push('/board');
  }

  render() {

    const startSingleGame = this.startSingleGame.bind(this);

    return (
       <div>
          <h1>Hello</h1>
          <ButtonGroup vertical>
             <Button onClick={startSingleGame}> play (single mode) </Button>
             <LinkContainer to='/about'><Button> about </Button></LinkContainer>
          </ButtonGroup>
       </div>
    );
  }
};

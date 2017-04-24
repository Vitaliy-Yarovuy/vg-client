import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import api from 'api';


@connect(state => ({
  auth: state.auth
}))
export default class AuthPage extends Component {
  static propTypes = {
    auth: PropTypes.object,
    dispatch: PropTypes.func,
  };

  render() {
    const {
      auth = {},
      dispatch
    } = this.props;

    const login = ()=>api.anonymLogin();

    return (
      <div className='BoardPage'>
        <h2>AUTH</h2>

        <dl className='dl-horizontal'>
          <dt>user</dt>
          <dd>{auth.user || '...'}</dd>
          <dt>token</dt>
          <dd>{auth.token || '...'}</dd>
        </dl>

        <Button bsStyle='primary' onClick={login}>Login as Noname</Button>

        <hr />
      </div>
    );
  }
}

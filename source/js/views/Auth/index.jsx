import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { anonymLogin, logout } from 'actions/auth';


@connect(state => ({
  auth: state.auth,
}))
export default class AuthPage extends Component {
  static propTypes = {
    auth: PropTypes.object,
    dispatch: PropTypes.func,
  };

  render() {
    const {
      auth,
      dispatch,
    } = this.props;

    const login = () => {
      return dispatch(anonymLogin());
    };

    const logoutAction = () => {
      return dispatch(logout());
    };

    return (
      <div className='BoardPage' style={{ position: 'relative' }}>
        <h2>AUTH</h2>
        <dl className='dl-horizontal' >
          <dt>user</dt>
          <dd>{auth.user || '...'}</dd>
          <dt>token</dt>
          <dd style={{ wordBreak: 'break-word' }}>{auth.token || '...'}</dd>
        </dl>


        <div className='btn-group' role='group'>
          <Button bsStyle='primary' onClick={ login } disabled={ !!auth.user }>Login as Noname</Button>
          <Button bsStyle='primary' onClick={ logoutAction } disabled={ !auth.user }>Log out</Button>
        </div>

        {
          auth.asyncLoading
            ? <div className='internal-overlay'>
                <div className='loader'></div>
              </div>
            : null
        }
        <hr />
      </div>
    );
  }
}

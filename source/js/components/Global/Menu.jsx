import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import { routeCodes } from '../../routes';
import PropTypes from 'prop-types';

@connect(state => ({
  user: state.app.user,
}))
export default class Menu extends Component {

  static propTypes = {
    user: PropTypes.object,
  };

  render() {
    let { user } = this.props;

    return (
      <div className='Menu'>
        <IndexLink to={ routeCodes.DASHBOARD }>
          Dashboard
        </IndexLink>
        <Link to={ routeCodes.ABOUT }>
          About
        </Link>
        <Link to={ routeCodes.BOARD }>
          Board
        </Link>
        <Link to={ routeCodes.AUTH }>
          Auth
        </Link>
        {
          user?
          <Link to={ routeCodes.ROOM }>
            Room
          </Link>
          :null
        }
        <Link to='404'>
          404
        </Link>
      </div>
    );
  }
}

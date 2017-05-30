import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from 'components/Global/Menu';


@connect(state => ({
  waitingLoader: state.app.waitingLoader,
}))
export default class App extends React.Component {
  static propTypes = {
    waitingLoader: PropTypes.bool,  
    children: PropTypes.object,
  }

  render() {
    const { children, waitingLoader } = this.props;

    return (
      <div className='App'>
        <Menu />
        <div className='Page'>
          { children }

        </div>
          { waitingLoader ?
            <div className='internal-overlay'>
              <div className='loader'></div>
            </div> 
            :null
          }
      </div>
    );
  }
}

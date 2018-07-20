import { createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import RootContainer from './containers/RootContainer';
import Login from './containers/Login';
import React, { Component } from 'react';

// Stack navigator for the logged out state
export const Stack0Nav = createStackNavigator({
  Login: {
    screen: Login,
  },
});

// Stack navigator for the logged in state
export const Stack1Nav = createStackNavigator({
  Home: {
    screen: RootContainer,
  },
});

/**
 * Export the main component for the navigator
 */
class Navigator extends Component {
  render() {
    if (!this.props.login.login) {
      // not logged in
      return <Stack0Nav />;
    } else {
      return <Stack1Nav />;
    }
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(
  mapStateToProps,
  null
)(Navigator);

import { createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import RootContainer from './containers/RootContainer';
import Login from './containers/Login';
import Login2 from './containers/Login2';
import LoginLoading from './containers/LoginLoading';
import React, { Component } from 'react';
import NavigationService from './NavigationService';

/**
 * -- Stacks --
 * Pages for logged in and logged out states are separated
 * in different stack navigators.
 * Stack 0 is for logged out users
 * Stack 1 is for logged in users
 * In theory, we can have as many stacks as we need, and
 * render only the appropriate one.
 * My naming scheme has higher numbers correspond to more
 * privileges, but that's just me.
 */

const navOptions = {
  headerStyle: {
    backgroundColor: '#a02020',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

// Stack navigator for the logged out state
export const Stack0Nav = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Login2: {
      screen: Login2,
    },
    LoginLoading: {
      screen: LoginLoading,
    },
  },
  {
    initialRouteName: 'Login',
    navigationOptions: navOptions,
  }
);

// Stack navigator for the logged in state
export const Stack1Nav = createStackNavigator(
  {
    Home: {
      screen: RootContainer,
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: navOptions,
  }
);

/**
 * Export the main component for the navigator
 */
class Navigator extends Component {
  /**
   * Function that receives the state of the application
   * and uses it to choose which is the appropriate stack
   * to use. For example, stack 0 will be returned when
   * the user is not logged is.
   * If the application is showing the wrong stack, the
   * problem may be here.
   */
  chooseStack(state) {
    // Just to clarify, I made this whole application to
    // try out some stuff in react-native. This is mostly
    // a proof-of-concept.
    if (!state.login.user) {
      return (
        <Stack0Nav
          ref={navRef => {
            NavigationService.setNavigator(navRef);
          }}
        />
      );
    } else {
      return (
        <Stack1Nav
          ref={navRef => {
            NavigationService.setNavigator(navRef);
          }}
        />
      );
    }
  }

  render() {
    return this.chooseStack(this.props.globalState);
  }
}

function mapStateToProps(state) {
  return { globalState: state };
}

export default connect(
  mapStateToProps,
  null
)(Navigator);

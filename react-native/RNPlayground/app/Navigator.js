import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import RootContainer from './containers/RootContainer';
import Reports from './containers/Reports';
import Login from './containers/Login';
import Login2 from './containers/Login2';
import Logout from './containers/Logout';
import Info from './containers/info';
import Management from './containers/Management';
import LoginLoading from './containers/LoginLoading';
import React, { Component } from 'react';
import NavigationService from './NavigationService';
import AnimatedPage from './containers/AnimatedPage';

/**
 * -- Stacks --
 * Pages for logged in and logged out states are separated
 * in different stack navigators. In this project:
 * Stack 0 is for logged out users
 * Stack 1 is for logged in users
 * Stack 2 is for privileged users.
 * In theory, we can have as many stacks as we need, and
 * render only the appropriate one.
 * My naming scheme has higher numbers correspond to more
 * privileges, but that's just me.
 */

/**
 * Common navigation options for all stacks
 */
const navOptions = {
  headerStyle: {
    backgroundColor: '#a02020',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    flex: 1,
  },
};

/**
 * Navigation options with an additional
 * hanburger menu.
 */
const navOptionsWithMenu = ({ navigation }) => ({
  ...navOptions,
  headerRight: (
    <Text
      style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginRight: 10,
      }}
      onPress={() => {
        navigation.toggleDrawer();
      }}
    >
      Menu
    </Text>
  ),
});

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
export const HomeNav = createStackNavigator(
  {
    Home: { screen: RootContainer },
    Reports: { screen: Reports },
    About: { screen: Info },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: navOptionsWithMenu,
  }
);

export const LogoutNav = createStackNavigator(
  {
    Logout: { screen: Logout },
  },
  {
    navigationOptions: navOptionsWithMenu,
  }
);

export const Stack1Drawer = createDrawerNavigator(
  {
    Main: { screen: HomeNav },
    Logout: { screen: LogoutNav },
    Animated: { screen: AnimatedPage },
  },
  {
    initialRouteName: 'Main',
    gesturesEnabled: false,
    drawerPosition: 'right',
  }
);

export const Stack2Nav = createStackNavigator(
  {
    Management: {
      screen: Management,
    },
  },
  {
    initialRouteName: 'Management',
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
    } else if (!state.privileges.userHasPrivileges) {
      return (
        <Stack1Drawer
          ref={navRef => {
            NavigationService.setNavigator(navRef);
          }}
        />
      );
    } else {
      return (
        <Stack2Nav
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

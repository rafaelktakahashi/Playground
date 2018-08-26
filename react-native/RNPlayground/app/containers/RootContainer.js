import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Text, Button } from 'native-base';
import { logoutRequest } from '../redux/actions/loginAction';
import { gainPrivileges } from '../redux/actions/privilegesAction';

class RootContainer extends Component {
  onLogout() {
    this.props.dispatchLogout();
  }

  gainPrivileges() {
    this.props.gainPrivileges();
  }

  static navigationOptions = {
    title: 'Home page',
    // fill up space in pages that don't have the back link
    headerLeft: <View />,
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <Text>Main page of stack 1.</Text>
        <Text>&nbsp;</Text>
        <Text>
          You can't use the back button to go back to stack 0; you'll have to
          logout to go there. The back button (or swipe-right gesture in iOS)
          sends you back to the previous page, or to the home page (here) if
          there's no previous page. Pressing the back button while in the home
          page exits the app. Other stacks have their own home pages, too.
        </Text>
        <Text>&nbsp;</Text>
        <Text>The reports page is also part of this stack.</Text>
        <Text>You can go there and use the back button to return here.</Text>
        <Button
          style={{ margin: 5 }}
          warning
          onPressOut={() => this.props.navigation.navigate('Reports')}
        >
          <Text>Reports page</Text>
        </Button>
        <Button
          style={{ margin: 5 }}
          info
          onPressOut={() => this.props.navigation.navigate('Victory')}
        >
          <Text>Victory Graph</Text>
        </Button>
        <Text>There can be as many separate stacks as necessary.</Text>
        <Text>Their pages and history will be completely separated.</Text>
        <Text>
          This means you can't access the wrong stack through your history.
        </Text>
        <Button
          style={{ margin: 5 }}
          danger
          onPressOut={this.gainPrivileges.bind(this)}
        >
          <Text>Go to stack 2!</Text>
        </Button>
        <Button
          style={{ margin: 5 }}
          success
          onPress={() => {
            this.props.navigation.navigate('About');
          }}
        >
          <Text>About</Text>
        </Button>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return state.login;
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchLogout: () => dispatch(logoutRequest()),
    gainPrivileges: () => dispatch(gainPrivileges()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootContainer);

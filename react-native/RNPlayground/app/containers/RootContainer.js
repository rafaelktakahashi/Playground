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
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <Text>Main page of stack 1.</Text>
        <Text>
          You can't use the back button to go back to stack 0. You'll have to
          use these buttons to change your current stack.
        </Text>
        <Text>When you log out, you will be sent to stack 0.</Text>
        <Text>The back button only works between pages of the same stack.</Text>
        <Button onPressOut={this.onLogout.bind(this)}>
          <Text>Logout automatically</Text>
        </Button>
        <Text>The reports page is also part of this stack.</Text>
        <Text>You can go there and use the back button to return here.</Text>
        <Button
          warning
          onPressOut={() => this.props.navigation.navigate('Reports')}
        >
          <Text>Reports page</Text>
        </Button>
        <Text>There can be as many separate stacks as necessary.</Text>
        <Text>Their pages and history will be completely separated.</Text>
        <Text>
          This means you can't access the wrong stack through your history.
        </Text>
        <Button danger onPressOut={this.gainPrivileges.bind(this)}>
          <Text>Go to stack 2!</Text>
        </Button>
        <Button
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

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Text, Button } from 'native-base';
import { mainListRequest } from '../redux/actions/mainListAction';
import { logoutRequest } from '../redux/actions/loginAction';

class RootContainer extends Component {
  onLogout() {
    this.props.dispatchLogout();
  }

  static navigationOptions = {
    title: 'Home page',
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <Text>Main page of stack 1.</Text>
        <Text>This stack is for users that are logged in.</Text>
        <Text>When you log out, you will be sent to stack 0.</Text>
        <Button onPressOut={this.onLogout.bind(this)}>
          <Text>Logout automatically</Text>
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootContainer);

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Text, Button } from 'native-base';
import { logoutRequest } from '../redux/actions/loginAction';

class Logout extends Component {
  static navigationOptions = {
    title: 'Logout',
  };

  logout() {
    this.props.logout();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <Text>When you logout, you will be sent to stack 0.</Text>
        <Button danger onPressOut={this.logout.bind(this)}>
          <Text>Confirm logout.</Text>
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
    logout: () => dispatch(logoutRequest()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);

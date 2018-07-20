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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <Text>Main page of stack 1.</Text>
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

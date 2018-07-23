import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Text, Button } from 'native-base';
import { losePrivileges } from '../redux/actions/privilegesAction';

class Management extends Component {
  static navigationOptions = {
    title: 'Management',
  };

  losePrivileges() {
    this.props.losePrivileges();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <Text>This is a page for privileged users. It lives in stack 2.</Text>
        <Text>
          This is mostly to demonstrate that these pages are isolated from each
          other, and you can have as many as you'd like. The main navigator is
          responsible for deciding which stack to use, depending on the
          application state. For example, when you pressed a button to come
          here, a flag was set in the global state. That signals the navigator
          to use stack 2.
        </Text>
        <Text>
          You can't go back to the previous stack unless you press the button
          below.
        </Text>
        <Button danger onPressOut={this.losePrivileges.bind(this)}>
          <Text>Back to stack 1.</Text>
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
    losePrivileges: () => dispatch(losePrivileges()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Management);

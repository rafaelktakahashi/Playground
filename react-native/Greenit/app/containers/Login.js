import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Button, Text } from 'native-base';
import { loginRequest } from '../redux/actions/loginAction';

/**
 * Main container for the login page.
 */
class Login extends Component {
  constructor(props) {
    super(props);
  }

  onPressOut() {
    this.props.dispatchLogin();
  }

  render() {
    return (
      <View>
        <Text>This is the login page. It is the main page of stack 0.</Text>
        <Button primary onPressOut={this.onPressOut.bind(this)}>
          <Text>Login automatically</Text>
        </Button>
        {this.props.hasError && (
          <Text>There was an error:{this.props.error}</Text>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login,
});

const mapDispatchToProps = dispatch => ({
  // mock function
  dispatchLogin: () => {
    console.log('dispatching the login action');
    dispatch(
      loginRequest({
        // userdata
        username: 'default',
        password: 'password123',
      })
    );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

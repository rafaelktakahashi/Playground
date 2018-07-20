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

  static navigationOptions = {
    title: 'Login',
  };

  onPressOut() {
    this.props.dispatchLogin();
  }

  render() {
    return (
      <View>
        <Text>
          This is another login page. It also belongs to stack 0, but it's not
          its main page.
        </Text>
        <Button block success onPressOut={this.onPressOut.bind(this)}>
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

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View } from 'react-native';
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
        <Text>The pages of this app are separated in stacks.</Text>
        <Text>
          You can use the history (back button) to go back to pages from the
          same stack, but not from another stack.
        </Text>
        <Text>This is the login page. It is the main page of stack 0.</Text>
        <Text>When you login, you will be sent to stack 1.</Text>
        <Button primary onPressOut={this.onPressOut.bind(this)}>
          <Text>Login automatically</Text>
        </Button>
        {this.props.hasError && (
          <Text>There was an error:{this.props.error}</Text>
        )}
        <Button
          success
          onPressOut={() => this.props.navigation.navigate('Login2')}
        >
          <Text>Go to another login page.</Text>
        </Button>
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

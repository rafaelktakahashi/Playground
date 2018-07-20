import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Button, Text } from 'native-base';

/**
 * Main container for the login page.
 */
export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Loading...',
  };

  render() {
    return (
      <View>
        <Text>Please, pretend I am a loading icon.</Text>
      </View>
    );
  }
}

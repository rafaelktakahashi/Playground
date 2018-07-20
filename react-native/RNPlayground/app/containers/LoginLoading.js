import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Button, Text } from 'native-base';

/**
 * This loading page exists because there's no animated
 * transition between pages. The login page transitions
 * here (with the default animation) before jumping to
 * another stack, giving the impression that there was
 * an animation while switching stacks.
 */
export default class LoginLoading extends Component {
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

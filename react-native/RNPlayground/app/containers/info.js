import React, { Component } from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { Text, Button } from 'native-base';
import VersionNumber from 'react-native-version-number';

export default class Info extends Component {
  static navigationOptions = {
    title: 'About',
  };

  render() {
    let isAndroid = Platform.OS === 'android';
    let bundleIdentifier = isAndroid ? 'Application Id' : 'Bundle identifier';
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <Text>This is an 'about' page. But this one is about itself.</Text>
        <Text>
          This page is using react-native-version-number to retrieve information
          about the app.
        </Text>
        <Text>App version: {VersionNumber.appVersion}</Text>
        <Text>Build version: {VersionNumber.buildVersion}</Text>
        <Text>
          {bundleIdentifier}: {VersionNumber.bundleIdentifier}
        </Text>
        <Text>A real app would probably format this better than I did.</Text>
      </View>
    );
  }
}

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Text, Button } from 'native-base';
import { RNCamera } from 'react-native-camera';

/**
 * This is a template file for creating new containers.
 * Replace the following terms:
 * TEMPLATE - Name of this template
 * TEMPLATE_TITLE - Readable title for this component
 */

export default class CameraPage extends Component {
  static navigationOptions = {
    title: 'Camera Page',
  };

  example() {
    // example method.
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <Text>This is a page that uses the camera.</Text>
        <Text>We should tell the user to point this somewhere.</Text>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.auto}
          permissionDialogTitle="Permission to use camera"
          permissionDialogMessage="We need permission to use the camera if you want to use the camera."
          onBarCodeRead={() => {
            console.log("I've read a qr code");
          }}
        />
      </View>
    );
  }
}

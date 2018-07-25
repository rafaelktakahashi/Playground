import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Text, Button } from 'native-base';

/**
 * This is a template file for creating new containers.
 * Replace the following terms:
 * TEMPLATE - Name of this template
 * TEMPLATE_TITLE - Readable title for this component
 */

class TEMPLATE extends Component {
  static navigationOptions = {
    title: 'TEMPLATE_TITLE',
  };

  example() {
    // example method.
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <Text>This is a template for a container.</Text>
        <Button onPressOut={this.example.bind(this)}>
          <Text>Button</Text>
        </Button>
      </View>
    );
  }
}

function mapStateToProps(state) {
  // return state.something
}

function mapDispatchToProps(dispatch) {
  return {
    // example: () => dispatch(exampleActionCreator())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TEMPLATE);

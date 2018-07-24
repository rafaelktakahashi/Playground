import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from 'native-base';
import WrappedPies from '../components/WrappedPies';

export default class Reports extends Component {
  static navigationOptions = {
    title: 'Reports',
  };

  // gets an array full of data
  makeData() {
    return [
      {
        key: 1,
        label: 'Red slice',
        value: 10,
        fillColor: '#ff0000',
      },
      {
        key: 2,
        label: 'Green slice',
        value: 20,
        fillColor: '#00aa00',
      },
      {
        key: 3,
        label: 'Blue slice',
        value: 35,
        fillColor: '#0030df',
      },
      {
        key: 4,
        label: 'Yellow slice',
        value: 2,
        fillColor: '#c0c000',
      },
      {
        key: 5,
        label: 'Purple slice',
        value: 4,
        fillColor: '#a000a0',
      },
      {
        key: 6,
        label: 'Cyan slice',
        value: 29,
        fillColor: '#00a0a0',
      },
    ];
  }

  render() {
    return (
      <ScrollView>
        <Text>
          This is a chart from react-native-charts-wrapper. This specific
          component is a bit customized, with events and colors. There are
          similar libraries, but I found this one to be the best.
        </Text>
        <View style={{ flex: 0, height: 450 }}>
          <WrappedPies
            data={this.makeData()}
            style={{ flex: 0, height: 450 }}
          />
        </View>
      </ScrollView>
    );
  }
}

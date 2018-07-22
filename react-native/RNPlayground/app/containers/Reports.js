import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Text, Button } from 'native-base';
import { mainListRequest } from '../redux/actions/mainListAction';
import { logoutRequest } from '../redux/actions/loginAction';
import { PieChart } from 'react-native-svg-charts';
import PieChartie from '../components/PieChart';

export default class Reports extends Component {
  static navigationOptions = {
    title: 'Reports',
  };

  // gets an array full of data
  makeData() {
    return [
      {
        key: 1,
        value: 10,
        unit: '%',
        fillColor: '#ff0000',
      },
      {
        key: 2,
        value: 20,
        unit: '%',
        fillColor: '#00aa00',
      },
      {
        key: 3,
        value: 35,
        unit: '%',
        fillColor: '#0000ff',
      },
      {
        key: 4,
        value: 2,
        unit: '%',
        fillColor: '#a0a000',
      },
      {
        key: 5,
        value: 4,
        unit: '%',
        fillColor: '#a000a0',
      }
    ]
  }

  render() {
    return (
      <View>
        <Text>This is supposed to be the title, maybe.</Text>
        <PieChartie data={this.makeData()} />
      </View>
    );
  }
}

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
    return 4;
  }

  render() {
    return (
      <View>
        <Text>This is a pretend reports page.</Text>
        <Text>I made it to play with graphs.</Text>
        <PieChartie />
      </View>
    );
  }
}

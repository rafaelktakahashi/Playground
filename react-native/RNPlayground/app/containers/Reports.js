import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StatusBar, ScrollView } from 'react-native';
import { Text, Button } from 'native-base';
import { mainListRequest } from '../redux/actions/mainListAction';
import { logoutRequest } from '../redux/actions/loginAction';
import { PieChart } from 'react-native-svg-charts';
import PieChartie from '../components/PieChart';
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
        unit: '%',
        fillColor: '#ff0000',
      },
      {
        key: 2,
        label: 'Green slice',
        value: 20,
        unit: '%',
        fillColor: '#00aa00',
      },
      {
        key: 3,
        label: 'Blue slice',
        value: 35,
        unit: '%',
        fillColor: '#0030df',
      },
      {
        key: 4,
        label: 'Yellow slice',
        value: 2,
        unit: '%',
        fillColor: '#c0c000',
      },
      {
        key: 5,
        label: 'Purple slice',
        value: 4,
        unit: '%',
        fillColor: '#a000a0',
      },
      {
        key: 6,
        label: 'Cyan slice',
        value: 29,
        unit: '%',
        fillColor: '#00a0a0',
      },
    ];
  }

  render() {
    return (
      <ScrollView>
        <Text>
          This is a chart from react-native-svg-charts. The library is not very
          powerful, but it's easy to setup. It only needs react-native-svg to be
          linked. This chart is a custom component that renders a pie chart with
          numbers in it, so if the values are strange, that's my own fault.
        </Text>
        <PieChartie data={this.makeData()} style={{ flex: 1 }} />
        <Text>
          This is a chart from react-native-charts-wrapper. It wraps native
          libraries, and is quite a lot more powerful and flexible. However,
          there's more work involved in configuring it, in particular when
          compiling for iOS. It's good that both are cross-platform, too.
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

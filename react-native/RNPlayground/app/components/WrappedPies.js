import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
} from 'react-native';

import { SafeAreaView } from 'react-navigation';

import { PieChart } from 'react-native-charts-wrapper';

class PieChartScreen extends React.Component {
  constructor(props) {
    super(props);

    if (!this.props.data) {
      return;
    }

    let processedValues = this.props.data.map(it => {
      return {
        value: it.value,
        label: '' + it.label,
      };
    });

    let processedColors = this.props.data.map(it => {
      return processColor(it.fillColor);
    });

    this.state = {
      legend: {
        enabled: true,
        textSize: 8,
        form: 'CIRCLE',
        position: 'RIGHT_OF_CHART',
        wordWrapEnabled: true,
      },
      data: {
        dataSets: [
          {
            values: processedValues,
            label: 'Pie dataset',
            config: {
              colors: processedColors,
              valueTextSize: 20,
              valueTextColor: processColor('white'),
              sliceSpace: 5,
              selectionShift: 13,
            },
          },
        ],
      },
      highlights: [{ x: 2 }],
      description: {
        text: 'This is Pie chart description',
        textSize: 15,
        textColor: processColor('darkgray'),
      },
    };
  }

  handleSelect(event) {
    let entry = event.nativeEvent;
    if (entry == null) {
      this.setState({ ...this.state, selectedEntry: null });
    } else {
      this.setState({
        ...this.state,
        selectedEntry: '' + entry.label + ' - ' + entry.value,
      });
    }

    console.log(event.nativeEvent);
  }

  render() {
    if (!this.props.data) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View>
            <Text>This chart has no data!</Text>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View>
          <Text>selected:</Text>
          <Text> {this.state.selectedEntry}</Text>
        </View>

        <View style={styles.container}>
          <PieChart
            style={styles.chart}
            logEnabled={true}
            chartBackgroundColor={processColor('pink')}
            chartDescription={this.state.description}
            data={this.state.data}
            legend={this.state.legend}
            highlights={this.state.highlights}
            entryLabelColor={processColor('black')}
            entryLabelTextSize={20}
            drawEntryLabels={true}
            rotationEnabled={true}
            rotationAngle={45}
            usePercentValues={false}
            styledCenterText={{
              text: 'Pie center text!',
              color: processColor('pink'),
              size: 20,
            }}
            centerTextRadiusPercent={100}
            holeRadius={40}
            holeColor={processColor('#f0f0f0')}
            transparentCircleRadius={45}
            transparentCircleColor={processColor('#f0f0f088')}
            maxAngle={360}
            onSelect={this.handleSelect.bind(this)}
            onChange={event => console.log(event.nativeEvent)}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chart: {
    flex: 1,
  },
});

export default PieChartScreen;

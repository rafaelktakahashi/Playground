import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Text, Button } from 'native-base';
import {
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryTheme,
} from 'victory-native';

class Victory extends Component {
  static navigationOptions = {
    title: 'Victory Charts',
  };

  constructor(props) {
    super(props);
    this.state = {
      double: false,
    };
  }

  toggleDouble() {
    this.setState({
      double: !this.state.double,
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <Text>This is a page for victory charts.</Text>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 25 }}
          animate={{ duration: 500 }}
        >
          <VictoryGroup offset={25}>
            <VictoryBar
              data={[
                { x: 'uno\none', y: 1 },
                { x: 'dos\ntwo', y: 2 },
                { x: 'tres\nthree', y: 3 },
              ]}
            />
            {this.state.double && (
              <VictoryBar
                animate={{ onExit: { duration: 500 } }}
                data={[
                  { x: 'uno\none', y: 4 },
                  { x: 'dos\ntwo', y: 5 },
                  { x: 'tres\nthree', y: 6 },
                ]}
              />
            )}
          </VictoryGroup>
        </VictoryChart>
        <Button style={{ margin: 5 }} onPressOut={this.toggleDouble.bind(this)}>
          <Text>Toggle!</Text>
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
  null,
  null
)(Victory);

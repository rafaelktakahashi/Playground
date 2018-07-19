import { connect } from 'react-redux';
import React, { Component, Text, View, StatusBar } from 'react';

class RootContainer extends Component {
  dispatchLoadData(data) {
    this.props.dispatchLoadData(data);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <Text>Test text</Text>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchLoadData: data => dispatch(loadData(data)),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(RootContainer);

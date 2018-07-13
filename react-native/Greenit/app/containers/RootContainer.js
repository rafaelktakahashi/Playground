import { connect } from 'http2';

class RootContainer extends Component {
  dispatchLoadData(data) {
    this.props.dispatchLoadData(data);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
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

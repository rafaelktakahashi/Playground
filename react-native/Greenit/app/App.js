import { createStore } from 'redux';
import { Root } from 'native-base';
import { RootContainer } from './containers/RootContainer';

const store = createStore();

export default class App extends Component {
  render() {
    return (
      <Root>
        <Provider store={store}>
          <RootContainer />
        </Provider>
      </Root>
    );
  }
}

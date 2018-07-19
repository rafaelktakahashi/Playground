import { createStore } from 'redux';
import { Root } from 'native-base';
import { RootContainer } from './containers/RootContainer';
import rootReducer from './redux/reducers/rootReducer';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Navigator from './Navigator';

const store = createStore(rootReducer, {});

export default class App extends Component {
  render() {
    return (
      <Root>
        <Provider store={store}>
          <Navigator />
        </Provider>
      </Root>
    );
  }
}

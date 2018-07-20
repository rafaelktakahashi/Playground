import { createStore, applyMiddleware, compose } from 'redux';
import { Root } from 'native-base';
import { RootContainer } from './containers/RootContainer';
import rootReducer from './redux/reducers/rootReducer';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Navigator from './Navigator';

// sagas
import rootSaga from './redux/sagas/RootSaga';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware) /*, other middlewares */)
);

// run the saga
sagaMiddleware.run(rootSaga);

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

import { createStore, applyMiddleware, compose } from 'redux';
import { Root } from 'native-base';
import { RootContainer } from './containers/RootContainer';
import rootReducer from './redux/reducers/rootReducer';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Navigator from './Navigator';

// redux-persist
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { PersistGate } from 'redux-persist/integration/react';

// sagas
import rootSaga from './redux/sagas/RootSaga';
import createSagaMiddleware from 'redux-saga';
import SplashScreen from 'react-native-splash-screen';

const sagaMiddleware = createSagaMiddleware();

// we use a persist reducer instead of the root reducer
const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
};
const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  pReducer, // using the persist reducer that wraps the root reducer
  compose(applyMiddleware(sagaMiddleware) /*, other middlewares */)
);

const persistor = persistStore(store);

// run the saga
sagaMiddleware.run(rootSaga);

export default class App extends Component {
  componentDidMount() {
    // hide the splash screen when this is done
    SplashScreen.hide();
  }

  render() {
    // Root from native-base is a single component that wraps the entire application
    // Provider from react-redux makes it possible to access the store
    // PersistGate from redux-persist will write changes to the store
    //    into the device's storage.
    // Navigator from here is a component that renders a different
    //    navigator from react-navigation depending on the application state.
    return (
      <Root>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Navigator />
          </PersistGate>
        </Provider>
      </Root>
    );
  }
}

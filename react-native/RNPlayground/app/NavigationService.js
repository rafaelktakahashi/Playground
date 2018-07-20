import { NavigationActions } from 'react-navigation';

let _navigator;

function setNavigator(stackNavigator) {
  _navigator = stackNavigator;
  console.log('Stack navigator has been set.');
  console.log('It is currently: ' + (stackNavigator || 'nothing').toString());
}

function navigate(routeName, params) {
  console.log(
    'Navigation service was called to navigate to ' + routeName + '.'
  );
  _navigator.dispatch(NavigationActions.navigate({ routeName, params }));
}

export default {
  navigate,
  setNavigator,
};

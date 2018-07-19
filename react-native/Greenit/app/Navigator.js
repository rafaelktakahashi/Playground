import { createStackNavigator } from 'react-navigation';
import RootContainer from './containers/RootContainer';

export default createStackNavigator({
  Home: {
    screen: RootContainer,
  },
});

import React from 'react';
import Home from './components/Home';
import CarDetails from './components/CarDetails';
import {StackNavigator} from 'react-navigation';
import {LayoutAnimation} from 'react-native';

const Stack = StackNavigator(
  {
    Home: {
      screen: Home,
    },
    CarDetails: {
      screen: CarDetails,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  componentWillMount() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  render() {
    return (
      <Stack/>
    );
  }
}


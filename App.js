/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  YellowBox,
} from 'react-native';
import { Provider } from 'react-redux';
import { colors } from './res/colors';
import Routes from './src/components/Routes';
import Loader from './src/components/custom/Loader';
import configureStore from './src/util/configureStore';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const store = configureStore();

class App extends Component {

  render() {
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor={colors.primary_color}
            barStyle="light-content" />
          <Routes />
          <Loader />
        </View>
      </Provider >
    );
  }

}

export default App;

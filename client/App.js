import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { createStackNavigator } from 'react-navigation'

import Auth from './components/Auth'

const RootStack = createStackNavigator({
  Auth: {
    screen: Auth
  }
})

export default class App extends Component {
  render() {
    return (
      <View>
        <RootStack/>
      </View>
    )
  }
}

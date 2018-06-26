import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation'
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo"

import Auth from './components/Auth'
import Home from './components/Home'

const client = new ApolloClient({
  uri: "https://localhost:3000/graphql"
})

const RootStack = createStackNavigator({
  Auth: {
    screen: Auth
  },
  Home: {
    screen: Home
  }
})

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={ client }>
        <RootStack/>
      </ApolloProvider>
    )
  }
}

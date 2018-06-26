import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button
} from 'react-native'
import { observer } from 'mobx-react/native'
import Store from '../store'

@observer
export default class Auth extends Component {
  constructor(){
    super()
    this.state = {
      isRegister: true,
      email: '',
      password: ''
    }
  }

  register () {
    Store.register({
      email: this.state.email,
      password: this.state.password
    })
    .then(() => {
      this.props.navigation.navigate('Home')
    })
    .catch((err) => {
      console.log(err)
    })
  }

  login () {
    Store.login({
      email: this.state.email,
      password: this.state.password
    })
    .then(() => {
      this.props.navigation.navigate('Home')
    })
    .catch((err) => {
      console.log(err)      
    })
  }

  renderForm () {
    if (this.state.isRegister) {
      return (
        <View>
        <Text>Register</Text>
        <TextInput
          style={{width: '100%'}}
          placeholder="Email"
          onChangeText={(email) => this.setState({email})}
        />
        <TextInput
          style={{width: '100%'}}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}
        />
        <Button
          onPress={() => this.register()}
          title="Submit"
          color="#841584"
        />
        <Text
          onPress={() => this.setState({isRegister: !this.state.isRegister})}
          style={{color: '#2268d8'}}
        >Already Have an account ?</Text>
      </View>
      )
    } else {
      <View>
        <Text>Register</Text>
        <TextInput
          style={{width: '100%'}}
          placeholder="Email"
          onChangeText={(email) => this.setState({email})}
        />
        <TextInput
          style={{width: '100%'}}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}
        />
        <Button
          onPress={() => this.login()}
          title="Submit"
          color="#841584"
        />
        <Text
          onPress={() => this.setState({isRegister: !this.state.isRegister})}
          style={{color: '#2268d8'}}
        >Doesnt Have an account ?</Text>
      </View>
      )
    }
  

  render() {
    return (
      this.renderForm()
    )
  }
}
import axios from 'axios'
import { observable } from 'mobx'

class Store {
  @observable ourcube = {
    videos: []
  }

  async register (payload) {
    return new Promise((resolve, reject) => {
      try {
        let res = await axios.post('http://localhost:3000/users/signup', payload)
        await AsyncStorage.setItem('token', res.headers.token)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  async login (payload) {
    return new Promise((resolve, reject) => {
      try {
        let res = await axios.post('http://localhost:3000/users/signup', payload)
        await AsyncStorage.setItem('token', res.headers.token)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

}

export default new Store()
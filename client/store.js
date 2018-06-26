import axios from 'axios'
import { observable } from 'mobx'

class Store {
  @observable ourcube {
    videos: []
  }


}

export default new Store()
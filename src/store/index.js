import Vue from 'vue'
import Vuex from 'vuex'

import pledge from './modules/pledge'
import borrow from './modules/borrow'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    pledge,
    borrow,
    user
  },
})

export default store

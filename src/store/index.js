import Vue from 'vue'
import Vuex from 'vuex'

import pledge from './modules/pledge'
import borrow from './modules/borrow'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    pledge,
    borrow
  },
})

export default store

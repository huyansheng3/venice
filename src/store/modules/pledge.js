import {
  queryAllLoanCurrList,
  queryAllLoanLimit,
  queryAllPledgeCurrList,
  queryAvailablePledgeNum,
} from '@/service/getData'

const state = {
  loanCurrList: [],
  loanLimit: [],
  pledgeCurrList: [],
  availablePledgeNum: '',
}

const mutations = {
  setAllLoanCurrList(state, payload) {
    state.loanCurrList = payload
  },
  setAllLoanLimit(state, payload) {
    state.loanLimit = payload
  },
  setAllPledgeCurrList(state, payload) {
    state.pledgeCurrList = payload
  },
  setAvailablePledgeNum(state, payload) {
    state.availablePledgeNum = payload
  },
}

const actions = {
  async queryAllLoanCurrList({ state, commit }, payload) {
    if(!state.loanCurrList.length) {
      const result = await queryAllLoanCurrList()
      commit('setAllLoanCurrList', result)
    }
  },
  async queryAllLoanLimit({ state, commit }, payload) {
    if(!state.loanLimit.length) {
      const result = await queryAllLoanLimit()
      commit('setAllLoanLimit', result)
    }
  },
  async queryAllPledgeCurrList({ state, commit }, payload) {
    if(!state.pledgeCurrList.length) {
      const result = await queryAllPledgeCurrList()
      commit('setAllPledgeCurrList', result)
    }
  },
  async queryAvailablePledgeNum({ state, commit }, payload) {
    const result = await queryAvailablePledgeNum(payload)
    commit('setAvailablePledgeNum', result)
  },
}

export default {
  state,
  mutations,
  actions,
}

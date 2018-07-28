import {
  queryAllLoanCurrList,
  queryAllLoanLimit,
  queryAllPledgeCurrList,
  queryAvailablePledgeNum,
  queryEntrustRate,
  queryInterestRate,
} from '@/service/getData'

const state = {
  loanCurrList: [],
  loanLimit: [],
  pledgeCurrList: [],
  availablePledgeNum: '',
  entrustRate: 0, //委托利率
  interestRate: 0, //利息利率
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
  setEntrustRate(state, payload){
    state.entrustRate = payload
  },
  setInterestRate(state, payload){
    state.interestRate = payload
  }
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
  async queryEntrustRate({ state, commit }, payload){
    const result = await queryEntrustRate()
    commit('setEntrustRate', result)
  },
  async queryInterestRate({ state, commit }, payload){
    const result = await queryInterestRate()
    commit('setInterestRate', result)
  },
}

export default {
  state,
  mutations,
  actions,
}

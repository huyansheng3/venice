import {
  queryAllLoanLimit,
  queryCurrList,
  queryAvailablePledgeNum,
  queryEntrustRate,
  queryInterestRate,
} from '@/service/getData'

const state = {
  loanLimit: [],
  currList: [],
  availablePledgeNum: '',
  entrustRate: 0, //委托利率
  interestRate: 0, //利息利率
}

const mutations = {
  setAllLoanLimit(state, payload) {
    state.loanLimit = payload
  },
  setCurrList(state, payload) {
    state.currList = payload
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
  async queryAllLoanLimit({ state, commit }, payload) {
    if(!state.loanLimit.length) {
      const result = await queryAllLoanLimit()
      commit('setAllLoanLimit', result)
    }
  },
  async queryCurrList({ state, commit }, payload) {
    if(!state.currList.length) {
      const result = await queryCurrList()
      commit('setCurrList', result)
    }
  },
  async queryAvailablePledgeNum({ state, commit }, payload) {
    const result = await queryAvailablePledgeNum(payload)
    commit('setAvailablePledgeNum', result.amount)
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

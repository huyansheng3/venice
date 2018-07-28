import {
  applyLoan,
  changeStatus,
  confirmLoan,
  queryListByUser,
  queryOrder,
} from '@/service/getData'

const state = {
  pageNum: 1,
  pageSize: 20,
  orders: [],
  order: {},
}

const mutations = {
  addOrders(state, payload) {
    state.orders = state.orders.concat(payload)
  },
  setOrder(state, payload) {
    state.order = payload
  },
  incrementPageNum(state, payload) {
    state.pageNum += 1
  },
}

const actions = {
  async queryListByUser({ state, commit }, payload) {
    const { pageNum, pageSize } = state
    const result = (await queryListByUser({ pageNum, pageSize, ...payload })) || {}
    const { dataList = [] } = result
    commit('addOrders', dataList)
  },
  async queryOrder({ state, commit }, payload) {
    const result = await queryOrder(payload)
  },
}

export default {
  state,
  mutations,
  actions,
}

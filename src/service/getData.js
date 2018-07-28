import Http from '@/utils/axios';

const http = new Http({domain: 'http://47.92.26.19:9999'})

//member
export const login = (data) => http.require({api: '/api/member/Login',data}); //登录
export const getUserInfo = (data) => http.require({api: '/api/member/GetUserInfo',data}); //获取个人信息


// GET /swftConfig/queryAllLoanCurrList
// GET /swftConfig/queryAllLoanLimit
// GET /swftConfig/queryAllPledgeCurrList
// GET /swftConfig/queryAvailablePledgeNum
// GET /swftConfig/queryEntrustRate
// GET /swftConfig/queryInterestRate

// pledge
const swiftConfigPrefix = '/venice-swift/swftConfig'
export const queryAllLoanCurrList = () => http.require({api: `${swiftConfigPrefix}/queryAllLoanCurrList`, method: 'GET'}); 
export const queryAllLoanLimit = () => http.require({api: `${swiftConfigPrefix}/queryAllLoanLimit`, method: 'GET'}); 
export const queryAllPledgeCurrList = () => http.require({api: `${swiftConfigPrefix}/queryAllPledgeCurrList`, method: 'GET'}); 
export const queryAvailablePledgeNum = (params) => http.require({api: `${swiftConfigPrefix}/queryAvailablePledgeNum`, method: 'GET', params}); 
export const queryEntrustRate = () => http.require({api: `${swiftConfigPrefix}/queryEntrustRate`, method: 'GET'}); 
export const queryInterestRate = () => http.require({api: `${swiftConfigPrefix}/queryInterestRate`, method: 'GET'}); 

// POST /tradeOrder/applyLoan
// POST /tradeOrder/changeStatus
// POST /tradeOrder/confirmLoan
// POST /tradeOrder/queryListByUser
// GET /tradeOrder/queryOrder
const tradeOrderPrefix = '/venice-swift/tradeOrder'
// borrow
export const applyLoan = (data) => http.require({api: `${tradeOrderPrefix}/applyLoan`,data}); 
export const changeStatus = (data) => http.require({api: `${tradeOrderPrefix}/changeStatus`,data}); 
export const confirmLoan = (data) => http.require({api: `${tradeOrderPrefix}/confirmLoan`,data}); 
export const queryListByUser = (data) => http.require({api: `${tradeOrderPrefix}/queryListByUser`,data}); 
export const queryOrder = (params) => http.require({api: `${tradeOrderPrefix}/queryOrder`, method:'GET', params}); 


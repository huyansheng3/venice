import Http from '@/utils/axios';

const http = new Http({
  domain: 'http://47.92.26.19:9999'
})

//member
export const login = (data) => http.require({
  api: '/api/member/Login',
  data
}); //登录
export const getUserInfo = (data) => http.require({
  api: '/api/member/GetUserInfo',
  data
}); //获取个人信息


// GET /swftConfig/queryAllLoanLimit
// GET /swftConfig/queryAvailablePledgeNum
// GET /swftConfig/queryEntrustRate
// GET /swftConfig/queryInterestRate

// pledge
const swiftConfigPrefix = '/venice-swift/swftConfig'
export const queryCurrList = () => http.require({
  api: `${swiftConfigPrefix}/queryCurrList`,
  method: 'GET'
});
export const queryAllLoanLimit = () => http.require({
  api: `${swiftConfigPrefix}/queryAllLoanLimit`,
  method: 'GET'
});
export const queryAvailablePledgeNum = (params) => http.require({
  api: `${swiftConfigPrefix}/queryAvailablePledgeNum`,
  method: 'GET',
  params
});
export const queryEntrustRate = () => http.require({
  api: `${swiftConfigPrefix}/queryEntrustRate`,
  method: 'GET'
});
export const queryInterestRate = () => http.require({
  api: `${swiftConfigPrefix}/queryInterestRate`,
  method: 'GET'
});

// POST /tradeOrder/applyLoan
// POST /tradeOrder/changeStatus
// POST /tradeOrder/confirmLoan
// POST /tradeOrder/queryListByUser
// GET /tradeOrder/queryOrder
// POST /tradeOrder/queryPledgeNum
const tradeOrderPrefix = '/venice-swift/tradeOrder'
// borrow
export const applyLoan = (data) => http.require({
  api: `${tradeOrderPrefix}/applyLoan`,
  data
});
export const changeStatus = (data) => http.require({
  api: `${tradeOrderPrefix}/changeStatus`,
  data
});
export const confirmLoan = (data) => http.require({
  api: `${tradeOrderPrefix}/confirmLoan`,
  data
});
export const queryListByUser = (data) => http.require({
  api: `${tradeOrderPrefix}/queryListByCondition`,
  data
});
export const queryPledgeNum = (data) => http.require({
  api: `${tradeOrderPrefix}/queryPledgeNum`,
  data
});
export const queryOrder = (params) => http.require({
  api: `${tradeOrderPrefix}/queryOrder`,
  method: 'GET',
  params
});



// GET /swftApi/queryTransUnitUSDT
const swiftApi = '/venice-swift/swftApi'
export const queryTransUnitUSDT = (params) => http.require({
  api: `${swiftApi}/queryTransUnitUSDT`,
  method: 'GET',
  params
});


export const loginApp = (data) => http.require({
  api: `${swiftApi}/loginApp`,
  method: 'POST',
  data
});
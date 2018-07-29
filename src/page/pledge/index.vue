<template>
  <section class="container">
    <mt-header v-if="!hideHeader" title="SWFT"></mt-header>
    <section class="main">
      <img class="banner" src="./banner.jpg" alt="banner">

      <section class="content">
        <section class="form">
          <div class="form-item">
            <label for="pledgeCurr">
              <span>质押币种</span></label>
              <div class="pledge-select" >
                <cube-select @change="handlePledgeCurrChange" v-model="pledgeCurr" :options="pledgeCurrList"></cube-select>
                <p>
                  1{{pledgeCurr}}={{usdtUnit}}USDT
                </p>
              </div>
            
          </div>
          <div class="form-item">
            <label for="applyBorrowValue">
              <span>借款金额</span>
              </label>

            <div class="borrow">
                <div class="borrow-container">
                  <div class="borrow-input">
                    <cube-input v-model="borrowNum" type="number">
                      <cube-select class="borrow-curr-select" placeholder="" slot="append" v-model="borrowCurr" :options="loanCurrList"></cube-select>
                    </cube-input> 
                  </div>
                  
                  <img  src="./exchange.png" alt="exchange">

                  <div class="borrow-input" >
                    <cube-input :placeholder="`质押${pledgeNum}${pledgeCurr}`" type="number"  :disabled="true"></cube-input>          
                  </div>
                </div>
                
                <div class="borrow-tip-conatiner">
                  <div class="borrow-tip">
                      <p>
                        委托费：{{entrustNum}}{{borrowCurr}}
                      </p>
                      <p>
                        实际到账：{{loanNum}}{{borrowCurr}}
                      </p>
                    </div>

                    <p class="available-pledge-num">
                      可用数量：{{availablePledgeNum}} {{pledgeCurr}}
                    </p>
                </div>
            </div>

          </div>
          <div class="form-item">
            <label for="borrowDays">
              <span>借款期限</span>
              </label>

             
              <div class="pledge-select">
                <cube-select v-model="borrowDays" :options="loanLimit"></cube-select>
                <p>到期本息合计:4531.012 USDT(或等价ETH)</p>
              </div>
            
          </div>
        </section>

        <mt-button @click="confirm" class="button" type="primary">确认</mt-button>

        <div class="agreement">
          <cube-checkbox  v-model="agreement">
          <div class="agreement-text">
            我已阅读并同意
          </div>
        </cube-checkbox>
        <router-link class="link" to="/pledge/agreement">《质押借款协议》</router-link>
        </div>
        
      </section>
    </section>
  </section>
</template>

<script>
import { Header, Button, Radio } from 'mint-ui'
import { mapState, mapMutations, mapActions } from 'vuex'
import {
  applyLoan,
  queryTransUnitUSDT,
  queryPledgeNum,
} from '@/service/getData'
import pageMixin from '../page-mixin'
import { debounce } from 'lodash'

const item = {
  userNo: '11111',
  pledgeCurr: 'BTC',
  pledgeNum: 10.5,
  borrowCurr: 'ETH',
  borrowNum: 15,
  applyPledgeValue: 80000,
  applyBorrowValue: 45000,
  borrowDays: 30,
  entrustNum: 0.15,
  loanNum: 14.85,
}

export default {
  name: 'Pledge',
  mixins: [pageMixin],
  components: {
    Header,
    Button,
    Radio,
  },
  data() {
    return {
      userNo: '11111',
      pledgeCurr: 'BTC',
      pledgeNum: 10.5,
      borrowCurr: 'ETH',
      borrowNum: '',
      applyPledgeValue: 80000,
      applyBorrowValue: 45000,
      borrowDays: '',
      agreement: false,
      usdtUnit: null,
    }
  },
  watch: {
    pledgeCurr(newValue, oldValue) {
      this.queryTransUnitUSDT()
      this.debounceQueryPledgeNum()
    },
    borrowCurr(newValue, oldValue) {
      this.debounceQueryPledgeNum()
    },
    borrowNum(newValue, oldValue) {
      this.debounceQueryPledgeNum()
    },
  },
  computed: {
    ...mapState({
      entrustRate: state => state.pledge.entrustRate,
      interestRate: state => state.pledge.interestRate,
      availablePledgeNum: state => state.pledge.availablePledgeNum,
      pledgeCurrList: state =>
        state.pledge.pledgeCurrList.map(item => ({
          text: `${item.remark} (${item.curr})`,
          value: item.curr,
        })),
      loanCurrList: state =>
        state.pledge.loanCurrList.map(item => ({
          text: item.curr,
          value: item.curr,
        })),
      loanLimit: state =>
        state.pledge.loanLimit.map(item => ({
          text: `${item.day}天`,
          value: item.day,
        })),
    }),
    entrustNum() {
      return (this.borrowNum * this.entrustRate).toFixed(1)
    },
    loanNum() {
      return this.borrowNum - this.entrustNum
    },
    shouldReturnValue() {
      return (this.pledgeNum * this.usdtUnit * (1 + interestRate)).toFixed(2)
    }
    
  },
  methods: {
    ...mapActions([
      'queryAllLoanCurrList',
      'queryAllLoanLimit',
      'queryAllPledgeCurrList',
      'queryAvailablePledgeNum',
      'queryEntrustRate',
      'queryInterestRate',
    ]),
    validate() {
      const { borrowNum, borrowDays, agreement } = this
      let text
      if (!borrowNum) {
        text = '借款金额不能为空'
      } else if (!borrowDays) {
        text = '借款期限不能为空'
      } else if (!agreement) {
        text = '请同意《质押借款协议》'
      }
      if (text) {
        const toast = this.$createToast({
          txt: text,
          type: 'error',
          mask: true,
          maskClosable: true,
        })
        toast.show()
        return false
      }

      return true
    },
    async confirm() {
      if (this.validate()) {
        const { entrustNum, loanNum } = this
        await applyLoan({ ...this.$data, entrustNum, loanNum })
        this.$router.push({ name: 'pledgeSuccess' })
      }
    },
    handlePledgeCurrChange(value) {
      this.queryAvailablePledgeNum({ curr: value })
    },
    async queryTransUnitUSDT() {
      const result = await queryTransUnitUSDT({ curr: this.pledgeCurr })
      this.usdtUnit = result
    },
    queryPledgeNum() {
      const { borrowCurr, borrowNum, pledgeCurr } = this
      return queryPledgeNum({ borrowCurr, borrowNum, pledgeCurr }).then(
        data => {
          this.pledgeNum = data
        }
      )
    },
  },
  created() {
    this.debounceQueryPledgeNum = debounce(this.queryPledgeNum, 50)
  },
  mounted() {
    this.queryAllLoanCurrList()
    this.queryAllLoanLimit()
    this.queryAllPledgeCurrList()
    this.queryEntrustRate()
    this.queryInterestRate()
    this.queryAvailablePledgeNum({ curr: this.pledgeCurr })
    this.queryTransUnitUSDT()
  },
}
</script>

<style lang="less" scoped>
@import '~assets/common/css/theme.less';
.container {
  .main {
    .banner {
      width: 100%;
    }
    .content {
      padding: 20px 15px 0;
      .form {
        font-size: 15px;
        color: @text-gray;
        .form-item {
          margin-bottom: 24px;
          display: flex;
          justify-content: space-between;
          align-items: top;
          label {
            flex: 1;
            line-height: 37px;
          }
          .pledge-select,
          .borrow {
            flex: 3;
            font-size: 12px;
          }
          .pledge-select {
            p {
              margin-top: 10px;
            }
          }

          .borrow-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .borrow-input {
              flex: 4;
            }
            .borrow-curr-select {
              width: 60px;
            }
            img {
              height: 15px;
              margin: 0 5px;
            }
          }
          .borrow-tip-conatiner {
            display: flex;
            justify-content: space-around;
            align-items: center;

            .borrow-tip,
            .available-pledge-num {
              margin-top: 10px;
              text-align: center;
            }

            .borrow-tip {
              white-space: nowrap;
              p {
                text-align: left;
              }
            }
          }
        }
      }

      .agreement {
        margin-top: 22px;
        font-size: 14px;
        position: relative;
        .cube-checkbox-wrap {
          margin: 0 auto;
          width: 80%;
        }
        .link {
          position: absolute;
          right: 60px;
          top: 15px;
          z-index: 1;
        }
      }

      .button {
        margin-top: 50px;
      }
    }
  }

  a {
    color: @primary;
  }
}
</style>
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
                <cube-select @change="handlePledgeCurrChange" v-model="pledgeCurr" :options="currList"></cube-select>
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
                      <cube-select class="borrow-curr-select" placeholder="" slot="append" v-model="borrowCurr" :options="currList"></cube-select>
                    </cube-input> 
                  </div>
                  
                  <img  src="./exchange.png" alt="exchange">

                  <div class="borrow-input" >
                    <cube-input :placeholder="`质押${pledgeNum}`" type="number"  :disabled="true"></cube-input>          
                  </div>
                </div>
                
                <div class="borrow-tip-conatiner">
                  <div class="borrow-tip">
                      <p>
                        委托费:{{entrustNum}}{{borrowCurr}}
                      </p>
                      <p>
                        实际到账:{{loanNum}}{{borrowCurr}}
                      </p>
                    </div>

                    <p class="available-pledge-num">
                      可用数量:{{availablePledgeNum}} {{pledgeCurr}}
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
                <p>到期本息合计: {{shouldReturnValue}} USDT</p>
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

const defaultData = {
  userNo: '11111',
  pledgeCurr: 'BTC',
  pledgeNum: 0,
  borrowCurr: 'ETH',
  borrowNum: '',
  applyPledgeValue: 0,
  applyBorrowValue: 0,
  borrowDays: '',
  agreement: false,
  usdtUnit: null,
}

export default {
  name: 'Pledge',
  mixins: [pageMixin],
  components: {
    Header,
    Button,
    Radio,
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    if (from.name === 'pledgeSuccess') {
      next(vm => {
        Object.assign(vm.$data, vm.$options.data())
      })
    } else {
      next()
    }
  },
  data() {
    return {
      userNo: '11111',
      pledgeCurr: 'BTC',
      pledgeNum: 0,
      borrowCurr: 'ETH',
      borrowNum: '',
      applyPledgeValue: 0,
      applyBorrowValue: 0,
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
      currList: state => state.pledge.currList,
      loanLimit: state =>
        state.pledge.loanLimit.map(item => ({
          text: `${item.day}天`,
          value: item.day,
        })),
    }),
    entrustNum() {
      return (this.borrowNum * this.entrustRate).toFixed(8)
    },
    loanNum() {
      return (this.borrowNum - this.entrustNum).toFixed(8)
    },
    shouldReturnValue() {
      return (this.borrowNum * this.usdtUnit * (1 + this.interestRate)).toFixed(
        3
      )
    },
  },
  methods: {
    ...mapActions([
      'queryAllLoanLimit',
      'queryCurrList',
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
      this.queryAvailablePledgeNum({ currencyType: value })
    },
    async queryTransUnitUSDT() {
      const result = await queryTransUnitUSDT({ curr: this.borrowCurr })
      this.usdtUnit = result
    },
    queryPledgeNum() {
      const { borrowCurr, borrowNum, pledgeCurr } = this
      if (borrowCurr && borrowNum && pledgeCurr) {
        return queryPledgeNum({ borrowCurr, borrowNum, pledgeCurr }).then(
          data => {
            this.pledgeNum = data
          }
        )
      }
    },
  },
  created() {
    this.debounceQueryPledgeNum = debounce(this.queryPledgeNum, 2000)
  },
  mounted() {
    this.queryAllLoanLimit()
    this.queryCurrList()
    this.queryEntrustRate()
    this.queryInterestRate()
    this.queryAvailablePledgeNum({ currencyType: this.pledgeCurr })
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
            white-space: nowrap;
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
            align-items: top;
            flex-wrap: nowrap;
            white-space: nowrap;

            .borrow-tip {
              flex: 3;
            }
            .available-pledge-num {
              flex: 3;
            }
            .borrow-tip,
            .available-pledge-num {
              margin-top: 10px;
              text-align: left;
            }

            .available-pledge-num {
              font-size: 0.8em;
            }

            .borrow-tip {
              white-space: nowrap;
              p {
                text-align: left;
                font-size: 0.8em;
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
<template>
  <section class="container">
    <mt-header title="SWFT"></mt-header>
    <section class="main">
      <img class="banner" src="./banner.jpg" alt="banner">

      <section class="content">
        <section class="form">
          <div class="form-item">
            <label for="pledgeCurr">
              <span>质押币种</span></label>
            <cube-select class="pledge-select" @change="handlePledgeCurrChange" v-model="pledgeCurr" :options="pledgeCurrList"></cube-select>
          </div>
          <div class="form-item">
            <label for="applyBorrowValue">
              <span>借款金额</span>
              </label>

            <div class="borrow">
                <div class="borrow-container">
                  <div class="borrow-input">
                    <cube-input type="number">
                      <cube-select class="borrow-curr-select" slot="append" v-model="borrowCurr" :options="loanCurrList"></cube-select>
                    </cube-input> 
                  </div>
                  
                  <img  src="./exchange.png" alt="exchange">

                  <div class="borrow-input" >
                    <cube-input type="number" placeholder="" :disabled="true"></cube-input>          
                    
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
            <cube-select class="pledge-select" v-model="borrowDays" :options="loanLimit"></cube-select>
          </div>
        </section>

        <mt-button @click="confirm" class="button" type="primary">确认</mt-button>

        <p class="agreement">
          我已阅读并同意
          <router-link to="/pledge/agreement">《质押借款协议》</router-link>
        </p>
      </section>
    </section>
  </section>
</template>

<script>
import { Header, Button, Radio } from 'mint-ui'
import { mapState, mapMutations, mapActions } from 'vuex'

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
      borrowNum: 15,
      applyPledgeValue: 80000,
      applyBorrowValue: 45000,
      borrowDays: 30,
      entrustNum: 0.15,
      loanNum: 14.85,
    }
  },
  computed: {
    ...mapState({
      availablePledgeNum: state=>state.pledge.availablePledgeNum,
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
  },
  methods: {
    ...mapActions([
      'queryAllLoanCurrList',
      'queryAllLoanLimit',
      'queryAllPledgeCurrList',
      'queryAvailablePledgeNum',
    ]),
    confirm() {
      this.$router.push({ name: 'pledgeSuccess' })
    },
    handlePledgeCurrChange(value) {
      this.queryAvailablePledgeNum({ curr: value })
    },
  },
  mounted() {
    this.queryAllLoanCurrList()
    this.queryAllLoanLimit()
    this.queryAllPledgeCurrList()
    this.queryAvailablePledgeNum({ curr: this.pledgeCurr })
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

      padding: 20px 15px 0;
      .agreement {
        margin-top: 22px;
        font-size: 14px;
        text-align: center;
      }
    }
  }

  a {
    color: @primary;
  }
}
</style>
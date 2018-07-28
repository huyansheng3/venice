<template>
  <section class="container">
    <mt-header title="SWFT"></mt-header>
    <section class="main">
      <img class="banner" src="./banner.jpg" alt="banner">

      <section class="content">
        <section class="form">
          <div class="form-item">
            <cube-select v-model="pledgeCurr" :options="pledgeCurrList"></cube-select>
          </div>
          <div class="form-item">


          </div>
          <div class="form-item">

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
    ...mapState(['availablePledgeNum']),
    ...mapState({
      pledgeCurrList: state =>
        state.pledge.loanCurrList.map(item => ({
          text: `${item.remark} (${item.curr})`,
          value: item.curr,
        })),
      loanCurrList: state =>
        state.pledge.loanLimit.map(item => ({
          text: item.curr,
          value: item.curr,
        })),
      loanLimit: state =>
        state.pledge.pledgeCurrList.map(item => ({
          text: `${item.days}天`,
          value: item.days,
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
  },
  mounted() {
    this.queryAllLoanCurrList()
    this.queryAllLoanLimit()
    this.queryAllPledgeCurrList()
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
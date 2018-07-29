<template>
  <section class="container">
    <mt-header  v-if="!hideHeader" title="我的借款">
      <mt-button @click="goBack" slot="left" icon="back"></mt-button>
    </mt-header>
    <section class="main">
      <section class="borrow">
        <ul class="list">
          <li class="item" v-for="item in borrowList" v-if="item" :key="item.label">
            <span>
              {{item.label}}
            </span>
            <span :class="{status: item.status, [item.status]: true}">
              {{item.value}}
            </span>
          </li>
        </ul>

        <img class="status-img" :src="statusImg" alt="status">
      </section>

      <section v-if="isRepaying" class="repaying">
        <div class="money">
          还款金额: 6002 {{repayCurrency}}
        </div>

        <cube-select class="currency" v-model="repayCurrency" :options="loanCurrList"></cube-select>
      </section>


      <mt-button v-if="isRepaying" class="repay_btn" type="primary">立即还款</mt-button>
    </section>
  </section>
</template>

<script>
import { Header, Button, Cell } from 'mint-ui'
import pageMixin from '../page-mixin'
import { getStatusText, statusMap } from './index'
import Vue from 'vue'
import REPAYING from './REPAYING.svg'
import COMPLETED from './COMPLETED.svg'
import LIQUIDATED from './LIQUIDATED.svg'
import OVERDUED from './OVERDUED.svg'
import APPLYING from './APPLYING.svg'
import { mapActions, mapState, mapMutations } from 'vuex'
import { dateFormat } from '@/utils/filters'

const imgMap = {
  APPLYING,
  REPAYING,
  COMPLETED,
  LIQUIDATED,
  OVERDUED,
}
// createUser: "",
// updateUser: "",
// id: 3,
// orderNo: "11111_2018072712034718867409",
// userNo: "11111",
// pledgeCurr: "BTC",
// pledgeNum: 10.5,
// borrowCurr: "ETH",
// borrowNum: 15,
// applyPledgeValue: 80000,
// applyBorrowValue: 45000,
// loanPledgeValue: 85000.12,
// loanBorrowValue: 48000,
// borrowDays: 30,
// applyDate: "2018-07-26T16:00:00.000+0000",
// loanDate: "2018-07-26T16:00:00.000+0000",
// entrustNum: 1.485,
// entrustRate: 0.1,
// loanNum: 14.85,
// status: "LIQUIDATED",
// interestRate: 0.001,
// deadlineDate: "2018-08-25T16:00:00.000+0000",
// mortgageRate: 0.5

const list = borrow => [
  {
    label: '申请日期：',
    value: dateFormat(borrow.applyDate, 'yyyy/MM/dd'),
  },
  {
    label: '质押币种：',
    value: borrow.pledgeCurr,
  },
  {
    label: '质押数量：',
    value: borrow.pledgeNum,
  },
  {
    label: '借贷币种：',
    value: borrow.borrowCurr,
  },
  {
    label: '借贷数量：',
    value: `${borrow.borrowNum} （到账 ${borrow.loanNum}）`,
  },
  {
    label: '托管费用：',
    value: borrow.entrustNum,
  },
  {
    label: '等价USDT：',
    value: borrow.applyBorrowValue + 'USDT',
  },
  {
    label: '借款期限：',
    value: `${borrow.borrowDays}天`,
  },
  {
    label: '利息：',
    value: borrow.applyBorrowValue * borrow.interestRate + 'USDT',
  },
  {
    label: '到期应还：',
    value: borrow.loanBorrowValue + 'USDT（或等价 ETH）',
  },
  {
    label: '应还时间：',
    value: dateFormat(borrow.deadlineDate, 'yyyy/MM/dd'),
  },
  borrow.status === statusMap.OVERDUED
    ? {
        label: '逾期费用：',
        value: borrow.deadlineDate,
      }
    : null,
  borrow.status === statusMap.LIQUIDATED
    ? {
        label: '平仓价格：',
        value: borrow.deadlineDate,
      }
    : null,
  {
    label: '订单状态：',
    status: borrow.status,
    value: getStatusText(borrow.status),
  },
]

function getStatusImg(status = 'REPAYING') {
  return imgMap[status]
}

export default {
  mixins: [pageMixin],
  components: {
    Header,
    Button,
    Cell,
  },
  data() {
    return {
      repayCurrency: '',
    }
  },
  computed: {
    ...mapState({
      order: state => state.borrow.order,
      loanCurrList: state =>
        state.pledge.loanCurrList.map(item => ({
          text: item.curr,
          value: item.curr,
        })),
    }),
    borrowList() {
      return list(this.order)
    },
    statusImg() {
      return getStatusImg(this.order.status)
    },
    isRepaying() {
      return this.order.status === 'REPAYING'
    },
  },
  methods: {
    ...mapMutations(['setOrder']),
    ...mapActions(['queryOrder', 'queryAllLoanCurrList']),
  },
  created() {
    const { borrow } = this.$route.query
    try {
      const initBorrow = JSON.parse(decodeURIComponent(borrow))
      this.setOrder(initBorrow)
    } catch (e) {
      console.error(e)
    }
  },
  mounted() {
    const { id } = this.$route.params
    this.queryOrder({ id })
    this.queryAllLoanCurrList()
  },
}
</script>

<style lang="less" scoped>
@import '~assets/common/css/theme.less';

@applying: #4a90e2;
@wait-pay: #4fe3c2;
@finish: #756bff;
@close-out: #f5a622;
@overdue: #ec5b6c;

.container {
  min-height: 100%;
  background-color: #f5f5f5;
  .main {
    padding: 15px 15px 0;
    font-size: 15px;
    color: @text-gray;
    .borrow {
      background: #ffffff;
      box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.1);
      border-radius: 2px;
      position: relative;
      .list {
        padding: 15px 20px;
        .item {
          padding: 5px 0;

          .status.APPLYING {
            color: @applying;
          }
          .status.REPAYING {
            color: @wait-pay;
          }
          .status.COMPLETED {
            color: @finish;
          }
          .status.LIQUIDATED {
            color: @close-out;
          }
          .status.OVERDUED {
            color: @overdue;
          }
        }
      }

      .status-img {
        position: absolute;
        width: 90px;
        top: 0;
        right: 0;
      }
    }

    .repaying {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;

      .money,
      .currency {
        background: #ffffff;
        box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.1);
        border-radius: 2px;
      }
      .money {
        flex: 2;
        margin-right: 10px;
        line-height: 40px;
        text-align: center;
      }
      .currency {
        flex: 1;
      }
    }

    .repay_btn {
      width: 80%;
      margin: 0 auto;
      display: block;
      margin-top: 35px;
    }
  }
}
</style>

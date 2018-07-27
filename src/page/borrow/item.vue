<template>
  <section class="container">
    <mt-header title="我的借款">
      <mt-button @click="goBack" slot="left" icon="back"></mt-button>
    </mt-header>
    <section class="main">
      <section class="borrow">
        <ul class="list">
          <li class="item" v-for="item in borrowList" :key="item.label">
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
    </section>
  </section>
</template>

<script>
import { Header, Button, Cell } from "mint-ui";
import pageMixin from "../page-mixin";
import { getStatusText } from "./index";
import Vue from "vue";
import REPAYING from "./REPAYING.svg";
import COMPLETED from "./COMPLETED.svg";
import LIQUIDATED from "./LIQUIDATED.svg";
import OVERDUED from "./OVERDUED.svg";

const imgMap = {
  REPAYING,
  COMPLETED,
  LIQUIDATED,
  OVERDUED
};
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
    label: "申请日期：",
    value: borrow.applyDate
  },
  {
    label: "质押币种：",
    value: borrow.pledgeCurr
  },
  {
    label: "质押数量：",
    value: borrow.pledgeNum
  },
  {
    label: "借贷币种：",
    value: borrow.borrowCurr
  },
  {
    label: "借贷数量：",
    value: borrow.borrowNum
  },
  {
    label: "托管费用：",
    value: borrow.entrustNum
  },

  {
    label: "等价USDT：",
    value: ""
  },
  {
    label: "借款期限：",
    value: borrow.borrowDays
  },
  {
    label: "利息：",
    value: ""
  },
  {
    label: "到期应还：",
    value: ""
  },
  {
    label: "应还时间：",
    value: borrow.deadlineDate
  },
  {
    label: "逾期费用：",
    value: borrow.deadlineDate
  },
  {
    label: "订单状态：",
    status: borrow.status,
    value: getStatusText(borrow.status)
  }
];

function getStatusImg(status = "REPAYING") {
  return imgMap[status];
}

export default {
  mixins: [pageMixin],
  components: {
    Header,
    Button,
    Cell
  },
  data() {
    return {
      borrow: {}
    };
  },
  computed: {
    borrowList() {
      return list(this.borrow);
    },
    statusImg() {
      return getStatusImg(this.borrow.status);
    }
  },
  methods: {},
  created() {
    const { borrow } = this.$route.query;
    try {
      this.borrow = JSON.parse(decodeURIComponent(borrow));
    } catch (e) {
      console.error(e);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~assets/common/css/theme.less";

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
  }
}
</style>

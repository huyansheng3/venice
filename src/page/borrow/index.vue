<template>
  <section class="container">
    <mt-header title="我的借款">
      <mt-button @click="goBack" slot="left" icon="back"></mt-button>
    </mt-header>
    <section class="main">
      <no-borrow v-if="!borrows.length"></no-borrow>
      <section class="list" v-else v-for="borrow in borrows" :key="borrow.id">
        <div class="item" :class="borrow.status" @click="handleClick(borrow)">
          <div class="amount row">
            <div class="amount-number col">
              ￥ {{borrow.applyBorrowValue}}
            </div>
            <div class="col status">
              {{getStatusText(borrow.status)}}
            </div>
          </div>
          <div class="time row">
            <div class="col date">
              <div>
                申请日期：{{borrow.applyDate | DateFormat('yyyy/MM/dd') }}
              </div>
              <div>
                借款期限：{{borrow.borrowDays}}天
              </div>
            </div>
            <div class="col">
              <img class="arrow" src="./arrow-right.png" alt="arrow">
            </div>
          </div>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import { Header, Button, Cell } from "mint-ui";
import pageMixin from "../page-mixin";
import NoBorrow from "./no-borrow";

const items = [
  {
    createUser: "",
    updateUser: "",
    id: 1,
    orderNo: "11111_2018072712034718867409",
    userNo: "11111",
    pledgeCurr: "BTC",
    pledgeNum: 10.5,
    borrowCurr: "ETH",
    borrowNum: 15,
    applyPledgeValue: 80000,
    applyBorrowValue: 45000,
    loanPledgeValue: 85000.12,
    loanBorrowValue: 48000,
    borrowDays: 30,
    applyDate: "2018-07-26T16:00:00.000+0000",
    loanDate: "2018-07-26T16:00:00.000+0000",
    entrustNum: 1.485,
    entrustRate: 0.1,
    loanNum: 14.85,
    status: "REPAYING",
    interestRate: 0.001,
    deadlineDate: "2018-08-25T16:00:00.000+0000",
    mortgageRate: 0.5
  },
  {
    createUser: "",
    updateUser: "",
    id: 2,
    orderNo: "11111_2018072712034718867409",
    userNo: "11111",
    pledgeCurr: "BTC",
    pledgeNum: 10.5,
    borrowCurr: "ETH",
    borrowNum: 15,
    applyPledgeValue: 80000,
    applyBorrowValue: 45000,
    loanPledgeValue: 85000.12,
    loanBorrowValue: 48000,
    borrowDays: 30,
    applyDate: "2018-07-26T16:00:00.000+0000",
    loanDate: "2018-07-26T16:00:00.000+0000",
    entrustNum: 1.485,
    entrustRate: 0.1,
    loanNum: 14.85,
    status: "COMPLETED",
    interestRate: 0.001,
    deadlineDate: "2018-08-25T16:00:00.000+0000",
    mortgageRate: 0.5
  },
  {
    createUser: "",
    updateUser: "",
    id: 3,
    orderNo: "11111_2018072712034718867409",
    userNo: "11111",
    pledgeCurr: "BTC",
    pledgeNum: 10.5,
    borrowCurr: "ETH",
    borrowNum: 15,
    applyPledgeValue: 80000,
    applyBorrowValue: 45000,
    loanPledgeValue: 85000.12,
    loanBorrowValue: 48000,
    borrowDays: 30,
    applyDate: "2018-07-26T16:00:00.000+0000",
    loanDate: "2018-07-26T16:00:00.000+0000",
    entrustNum: 1.485,
    entrustRate: 0.1,
    loanNum: 14.85,
    status: "LIQUIDATED",
    interestRate: 0.001,
    deadlineDate: "2018-08-25T16:00:00.000+0000",
    mortgageRate: 0.5
  },
  {
    createUser: "",
    updateUser: "",
    id: 4,
    orderNo: "11111_2018072712034718867409",
    userNo: "11111",
    pledgeCurr: "BTC",
    pledgeNum: 10.5,
    borrowCurr: "ETH",
    borrowNum: 15,
    applyPledgeValue: 80000,
    applyBorrowValue: 45000,
    loanPledgeValue: 85000.12,
    loanBorrowValue: 48000,
    borrowDays: 30,
    applyDate: "2018-07-26T16:00:00.000+0000",
    loanDate: "2018-07-26T16:00:00.000+0000",
    entrustNum: 1.485,
    entrustRate: 0.1,
    loanNum: 14.85,
    status: "OVERDUED",
    interestRate: 0.001,
    deadlineDate: "2018-08-25T16:00:00.000+0000",
    mortgageRate: 0.5
  }
];

export const statusMap = {
  REPAYING: "待还款",
  COMPLETED: "已完成",
  LIQUIDATED: "已平仓",
  OVERDUED: "已逾期"
};

export function getStatusText(status) {
  return statusMap[status] || "待还款";
}

export default {
  mixins: [pageMixin],
  components: {
    Header,
    Button,
    NoBorrow,
    Cell
  },
  data() {
    return {
      borrows: items
    };
  },
  methods: {
    getStatusText(status) {
      return getStatusText(status)
    },
    handleClick(borrow) {
      const query = {
        borrow: encodeURIComponent(JSON.stringify(borrow))
      };
      this.$router.push({
        name: "borrow-item",
        params: { id: borrow.id },
        query: query
      });
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

.REPAYING {
  .status {
    background-color: @wait-pay;
  }
}

.COMPLETED {
  .status {
    background-color: @finish;
  }
}

.LIQUIDATED {
  .status {
    background-color: @close-out;
  }
}

.OVERDUED {
  .status {
    background-color: @overdue;
  }
}

.container {
  height: 100%;
  background-color: #f5f5f5;
  .main {
    padding: 15px 15px 0;
    .list {
      .item {
        background: white;
        box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        padding: 8px;
        margin-bottom: 12px;
        font-size: 15px;
        color: @text-gray;

        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: nowrap;
          padding: 5px 10px;
          .col {
            .arrow {
              height: 18px;
            }
          }
          .date > div {
            padding: 5px 0;
          }
          .status {
            color: white;
            padding: 6px 15px;
            border-radius: 100px 100px 100px 0;
          }
          .amount-number {
            font-size: 18px;
            color: @primary;
          }
        }
      }
    }
  }
}
</style>

<template>
  <section class="container">
    <mt-header v-if="!hideHeader" title="我的借款">
      <mt-button @click="goBack" slot="left" icon="back"></mt-button>
    </mt-header>
    <section class="main">
      <no-borrow v-if="!orders.length"></no-borrow>
      <section 
        v-infinite-scroll="loadMore"
        :infinite-scroll-disabled="loading"
        class="list" v-else >
        <div class="item" v-for="borrow in orders" :key="borrow.id" :class="borrow.status" @click="handleClick(borrow)">
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
                <!-- 申请日期：{{borrow.applyDate | DateFormat('yyyy/MM/dd') }} -->
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
import { Header, Button, Cell } from 'mint-ui'
import pageMixin from '../page-mixin'
import NoBorrow from './no-borrow'
import { mapState, mapMutations, mapActions } from 'vuex'

export const statusMap = {
  APPLYING: '审核中',
  REPAYING: '待还款',
  COMPLETED: '已完成',
  LIQUIDATED: '已平仓',
  OVERDUED: '已逾期',
}

export function getStatusText(status) {
  return statusMap[status] || '待还款'
}

export default {
  mixins: [pageMixin],
  components: {
    Button,
    NoBorrow,
    Cell,
  },
  data() {
    return {
      userNo: '11111',
      loading: false,
    }
  },
  computed: {
    ...mapState({
      pageNum: state => state.borrow.pageNum,
      pageSize: state => state.borrow.pageSize,
      orders: state => state.borrow.orders,
      order: state => state.borrow.order,
    }),
  },
  methods: {
    ...mapActions(['queryListByUser', 'queryOrder']),
    ...mapMutations(['incrementPageNum']),
    getStatusText(status) {
      return getStatusText(status)
    },
    handleClick(borrow) {
      const query = {
        borrow: encodeURIComponent(JSON.stringify(borrow)),
      }
      this.$router.push({
        name: 'borrow-item',
        params: { id: borrow.id },
        query: query,
      })
    },
    loadMore() {
      this.loading = true
      this.incrementPageNum()
      this.queryListByUser({ userNo: this.userNo })
        .then(() => {
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
  mounted() {
    this.queryListByUser({ userNo: this.userNo })
  },
}
</script>

<style lang="less" scoped>
@import '~assets/common/css/theme.less';

@applying: #4A90E2;
@wait-pay: #4fe3c2;
@finish: #756bff;
@close-out: #f5a622;
@overdue: #ec5b6c;

.APPLYING {
  .status {
    background-color: @applying;
  }
}
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

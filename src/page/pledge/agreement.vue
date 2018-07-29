<template>
  <section class="container">
    <mt-header v-if="!hideHeader" title="借款及担保协议">
      <mt-button @click="goBack" slot="left" icon="back"></mt-button>
    </mt-header>
    <section class="main">
      <div class="title">
        借款及担保协议
      </div>
      <ul class="list">
        <li>
          甲方（出借人）：张珊
        </li>
        <li>电话：15802684410</li>
        <li>住址：</li>
        <li>乙方（出借人）：张珊</li>
        <li>身份证号码：310903199212213321</li>
        <li>电话：15802684410</li>
        <li>住址：</li>
        <li>住址：</li>

      </ul>

      <div class="detail">
        <p>
          1.乙方拥有比特币、以太坊等虚拟货币，并愿意以该虚拟 货币为质押物，向甲方借款。
        </p>

        <p>
          2.甲方充足资金，愿意为乙方提供借款服务。
        </p>
        <p class="hint">
          甲乙双方经协商一致，签订如下协议，共同遵守并履行：
        </p>

        <p>
          第一条 借款金额与利息 1.借款金额：乙方向甲方借款人民币 元（大写： ）；借款 用途：
        </p>

        <p>
          2.借款期限：本协议约定的借款期限为天，自本协议签订 之时起计算；若签约时点与收款时点不一致，以乙方收 到借款之时点起计算。
        </p>

        <p>
          3.借款利息：借款期间的利息计算公式为借款利息=借款本 金×日千分之一（1‰）×借款天数。 第二条 收款及还款 1.甲方或甲方指令的任何人按本协议第一条约定的金额向乙 方指定的银行账户汇款，即视为甲方出借义务履行完毕。
        </p>

      </div>
    </section>

  </section>
</template>

<script>
import { Header, Button } from "mint-ui";
import pageMixin from "../page-mixin";
export default {
  mixins: [pageMixin],
  components: {
    Header,
    Button
  }
};
</script>

<style lang="less" scoped>
@import "~assets/common/css/theme.less";

.container {
  font-size: 15px;
  line-height: 1.2;
  color: @text-gray;
  p {
    margin-bottom: 16px;
  }

  .main {
    .title {
      border-bottom: 1px solid @smoke;
      padding: 15px 25px;
      color: @primary;
    }

    .list {
      border-bottom: 1px solid @smoke;
      padding: 8px 25px;
      li {
        padding: 8px 0;
      }
    }

    .detail {
      padding: 15px 25px;

      .hint {
        color: @primary;
      }
    }
  }
}
</style>

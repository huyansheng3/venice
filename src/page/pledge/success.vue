<template>
  <section class="container">
    <mt-header v-if="!hideHeader" title="提交成功">
      <mt-button @click="goBack" slot="left" icon="back"></mt-button>
    </mt-header>
    <section class="main">
      <img class="success" src="./success.svg" alt="success">

      <p class="tip">
        您的借款申请提交，预计24小时内放款到您的银行卡，请注意查收！
      </p>
  
      <mt-button @click="confirm" class="button" type="primary">确定</mt-button>
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
  },
  methods: {
    confirm() {
      this.$router.push({ name: 'pledge' })
    }
  }
};
</script>

<style lang="less" scoped>
@import "~assets/common/css/theme.less";

.container {
  .success {
    display: block;
    margin: 50px auto;
    height: 100px;
  }

  .main {
    padding: 40px 30px 0;
    .tip {
      margin-top: 50px;
      font-size: 16px;
      text-align: center;
      color: @text-gray;
      line-height: 2;
    }
    .button {
      margin-top: 50px;
    }
  }
}
</style>

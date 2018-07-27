<template>
  <section class="container">
    <mt-header title="SWFT"></mt-header>
    <section class="main">
      <img class="banner" src="./banner.jpg" alt="banner">

      <section class="content">

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
import { Header, Button, Radio } from "mint-ui";

export default {
  components: {
    Header,
    Button,
    Radio
  },
  data() {
    return {};
  },
  methods: {
    confirm() {
      this.$router.push({name: 'pledgeSuccess'})
    }
  }
};
</script>

<style lang="less" scoped>
@import '~assets/common/css/theme.less';
.container {
  .main {
    .banner {
      width: 100%;
    }
    .content {
      padding: 40px 30px 0;
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
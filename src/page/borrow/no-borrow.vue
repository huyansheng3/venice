<template>
  <section class="no-borrow">
    <img  src="./no-borrow.jpg" alt="no-borrow.jpg">
    <p>
      暂无借款记录
    </p>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  @import "~assets/common/css/theme.less";

  .no-borrow {
    img {
      height: 140px;
      display: block;
      margin: 40px auto 0;
    }
    p{
      font-size: 15px;
      color: @text-gray;
      margin-top: 25px;
      text-align: center;
    }
  }
</style>

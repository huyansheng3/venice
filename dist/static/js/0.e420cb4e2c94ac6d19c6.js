webpackJsonp([0],{gcei:function(t,e,o){"use strict";e.a={methods:{goBack:function(){window.history.length>1?this.$router.go(-1):this.$router.push("/")}},computed:{hideHeader:function(){var t=this.$route.query.hideHeader;return Boolean(Number(t))}},mounted:function(){var t=this.$route.query;this.$store.getters.isAuth||this.$store.dispatch("login",t)}}}});
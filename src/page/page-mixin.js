export default {
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
  },
  computed: {
    hideHeader() {
      const { hideHeader } = this.$route.query
      return Boolean(Number(hideHeader))
    },
  },
}

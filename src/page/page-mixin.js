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
  mounted () {
    const { query } = this.$route
    if (!this.$store.getters.isAuth) {
      this.$store.dispatch('login', query)
    }
  }
}

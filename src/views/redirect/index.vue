<script>
/**
 * /redirect/foo/index/123456?name=tom
 * params: {path: 'foo/index/123456'}
 * query: {name: 'tom'}
 */
export default {
  beforeCreate() {
    const { params, query } = this.$route
    const { path = '' } = params
    this.$nextTick(() => {
      this.$router.replace({
        path: `/${path}`,
        query
      })
    })
  },
  render(h) {
    return h() // must, if not, will throw error message
  }
}
</script>

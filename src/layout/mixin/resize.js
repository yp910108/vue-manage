const { body } = document
const WIDTH = process.env.NODE_ENV === 'production' ? 1360 : 500

export default {
  methods: {
    isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width < WIDTH
    },
    resizeHandler() {
      if (this.isMobile()) {
        this.$store.dispatch('app/setDevice', 'mobile')
        this.$store.dispatch('app/setSidebar', 0)
      } else {
        this.$store.dispatch('app/setDevice', 'desktop')
        this.$store.dispatch('app/setSidebar', 1)
      }
    }
  },
  watch: {
    $route() {
      if (this.isMobile() && this.$store.state.app.sidebarOpened) {
        this.$store.dispatch('app/setDevice', 'mobile')
        this.$store.dispatch('app/setSidebar', 0)
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {
    if (this.isMobile()) {
      this.$store.dispatch('app/setDevice', 'mobile')
      this.$store.dispatch('app/setSidebar', 0)
    }
  }
}

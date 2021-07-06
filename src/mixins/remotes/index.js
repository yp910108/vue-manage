import remotes from './remotes'

const computed = {}
Object.keys(remotes).forEach((key) => {
  computed[key] = {
    get() {
      return !this.remotes[key] || typeof this.remotes[key] === 'function' ? [] : this.remotes[key]
    },
    set(newVal) {
      this.remotes[key] = newVal
    }
  }
})

export { resetRemotes } from './remotes'

export default {
  data() {
    return {
      remotes
    }
  },
  computed
}

import Icon from './index.vue'

function importAll(r) {
  r.keys().forEach(r)
}

importAll(require.context('./svg', false, /\.svg$/))

export default Icon

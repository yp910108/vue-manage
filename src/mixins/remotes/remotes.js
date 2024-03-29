import { toRawType } from '@/utils'
import { fetchDict } from '@/api'

const caches = {
  dict: fetchDict
}

const originCaches = { ...caches }

const inits = {}

const loading = {}

const remotes = new Proxy(caches, {
  get(target, key) {
    if (!inits[key]) {
      inits[key] = true
      return target[key]
    }
    const val = target[key]
    if (val && toRawType(val) === 'Function' && !loading[key]) {
      loading[key] = true
      val()
        .then((res) => {
          loading[key] = false
          target[key] = res
        })
        .catch(() => {
          loading[key] = false
        })
    } else {
      return target[key]
    }
  },
  set(target, key, value) {
    target[key] = value
    return true
  }
})

export function resetRemotes(key) {
  if (key) {
    remotes[key] = originCaches[key]
  } else {
    for (const k in originCaches) {
      remotes[k] = originCaches[k]
    }
  }
}

export default remotes

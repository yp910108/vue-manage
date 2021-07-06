import { toRawType } from '@/utils'
import { fetchDict } from '@/api/common'

const caches = {
  dict: fetchDict
}

const _originCaches = { ...caches }

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
    return (target[key] = value)
  }
})

export function resetRemotes(key) {
  if (key) {
    remotes[key] = _originCaches[key]
  } else {
    for (const key in _originCaches) {
      remotes[key] = _originCaches[key]
    }
  }
}

export default remotes

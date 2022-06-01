export function fetchDict() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('调用接口，获取字典...')
      resolve([
        { name: '字典1', code: 10001 },
        { name: '字典2', code: 10002 },
        { name: '字典3', code: 10003 },
        { name: '字典4', code: 10004 },
        { name: '字典5', code: 10005 }
      ])
    }, 1000)
  })
}

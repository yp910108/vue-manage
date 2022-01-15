export const hasClassName = (dom, className, deep) => {
  if (dom) {
    let classNames = dom.classList
    if (classNames.contains(className)) {
      return true
    }
    if (deep) {
      dom = dom.parentElement
      while (dom) {
        classNames = dom.classList
        if (classNames.contains(className)) {
          return true
        }
        dom = dom.parentElement
      }
    }
  }
  return false
}

export const getParentDom = (dom, className, deep) => {
  if (dom) {
    let classNames = dom.classList
    if (classNames.contains(className)) {
      return dom
    }
    if (deep) {
      dom = dom.parentElement
      while (dom) {
        classNames = dom.classList
        if (classNames.contains(className)) {
          return dom
        }
        dom = dom.parentElement
      }
    }
  }
}

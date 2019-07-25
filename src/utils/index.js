/**
 * @Author : HuiWen
 * @Date : 2019-07-22
 * @Description :
 **/


export const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target)

export const isArray = isType('Array')


export const microCount = orgValue => dyValue => {
  return (orgValue * 0.425) * (dyValue * 0.1)
}

export const selfMap = function (fn, context) {
  let arr = Array.prototype.slice.call(this)

  let mappedArr = Array(arr.length - 1)
  for (let i = 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) continue

    mappedArr[i] = fn.call(context, arr[i], i, this)
  }
  return mappedArr
}

export const reNumToString = (value) => {
  if (value.length === 0) return ''

  value = Array.isArray(value) ? value : value.toString().split('')

  return value.pop() + reNumToString(value)
}

export const deepClone = function (obj) {
  let str = JSON.stringify(obj);
  return JSON.parse(str);
}

export const findParentNode = (value) => {
  let _p = Symbol('parent')
  let result

  function _fn(arr, p) {
    for (let i = 0; i < arr.length; i++) {
      arr[i][_p] = p
      if (arr[i].id === value) {
        result = arr[i]
        return
      }
      !result && arr[i].children && _fn(arr[i].children, arr[i])
    }
    if (result) return;
  }
}

export const keyWordHeightLight = (item, value) => {
  const mIdx = item.indexOf(value)
  const first = mIdx >= 0 ? mIdx : item.length
  const second = value.length

  let _head = item.substr(0, first)
  let _heightLight = item.substr(first, second)
  let _foot = item.substr(second + mIdx, item.length)

  return _head + `<b>${_heightLight}</b>` + _foot
}

Promise._race = promises => new Promise((resolve, reject) => {
  promises.forEach(promise => {
    promise.then(resolve, reject)
  })
})

export const maxDenom = (a, b) => {
  return b ? maxDenom(b, a % b) : a
}

export const minMulti = (a, b) => {
  return a * b / maxDenom(a, b)
}

function strToArrRvs(str) {
  return str.split('').map(x => +x).reverse()
}

export const addStr = (a, b) => {
  const [h, l] = (a.length > b.length ? [a, b] : [b, a]).map(strToArrRvs)

  return h.reduce(([digit, tail], cur, idx, arr) => {
    const sum = cur + digit + (l[idx] || 0)

    return idx === arr.length - 1 ? sum + tail : [+(sum >= 10), sum % 10 + tail]
  }, [0, ""])
}

export const addSeparator = (num) => {
  let arr = [...String(num)]
  const length = arr.length
  return arr.reduceRight((tail, curr, i) => i === 0 || (length - i) % 3 !== 0 ? `${curr + tail}` : `,${curr + tail}`, "")
}
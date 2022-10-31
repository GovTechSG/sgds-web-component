import {assign, keys} from './object'
function _isObject(item: any) {
  return item && typeof item === 'object' && item.constructor === Object
}

 const mergeDeep = (target:any, source:any) => {
  if (_isObject(target) && _isObject(source)) {
    keys(source).forEach(key => {
      if (_isObject(source[key])) {
        if (!target[key] || !_isObject(target[key])) {
          target[key] = source[key]
        }
        mergeDeep(target[key], source[key])
      } else {
        assign(target, { [key]: source[key] })
      }
    })
  }
  return target
}

export default mergeDeep

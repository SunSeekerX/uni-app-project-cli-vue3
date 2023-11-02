import { isNil, isPlainObject, isObjectLike, transform } from 'lodash'

// Toast 提示
export function toast(title, val) {
  try {
    if (typeof val === 'object') {
      val = JSON.stringify(val)
    } else {
      val = String(val)
    }
  } catch (e) {
    val = e.message
  } finally {
    uni.showToast({
      icon: 'none',
      title: `${title}: ${val}`,
      duration: 3000,
    })
  }
}

// 安全运行
export function safeRunning(name, fun) {
  try {
    fun()
  } catch (e) {
    toast(name, e.message)
  }
}

/**
 * 去除对象中有key为undefined或者null的情况
 * @param { Object } obj
 * @returns { Object } 处理完成之后的对象
 */
export function removeEmptyKey(obj = {}, remove = true) {
  for (const [key, value] of Object.entries(obj)) {
    if (isNil(value) || value === '') {
      remove ? delete obj[key] : (obj[key] = undefined)
    }
    if (isPlainObject(value)) {
      removeEmptyKey(value)
    }
  }
  return obj
}

/**
 * 去除对象中有key为undefined或者null的情况，不改变原来的对象
 * @param { Object } obj
 * @returns { Object } 处理完成之后的对象
 */
export const removeObjNilVal = (obj) => {
  return transform(obj, (result, value, key) => {
    if (isNil(value)) {
      return
    } else if (isObjectLike(value)) {
      value = removeObjNilVal(value)
    }
    result[key] = value
  })
}

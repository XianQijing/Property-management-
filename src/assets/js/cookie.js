// 用export把方法暴露出来
// 设置cookie
export function setCookie (data, value, expire) {
  var date = new Date()
  date.setSeconds(date.getSeconds() + expire)
  document.cookie = data + '=' + escape(value) + ';expires=' + date.toGMTString()
}
// 获取cookie
export function getCookie (data) {
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(data + '=')
    if (start !== -1) {
      start = start + data.length + 1
      let end = document.cookie.indexOf(';', start)
      if (end === -1) end = document.cookie.length
      return unescape(document.cookie.substring(start, end))
    }
  }
  return ''
}

// 删除cookie
export function delCookie (data) {
  setCookie(data, '', -1)
}

export function removeCookie (sName, path) {
  document.cookie = sName + '=;expires=-1;path=' + path
}

// 将 yyyy-MM-dd hh:mm 替换为日期数据， 连接符不变
export function formatDate (date, fmt) {
  // 匹配年
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  // 匹配月、日、小时、分、秒
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  // 遍历
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

// 数字前面补零， 使之成为两位数
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

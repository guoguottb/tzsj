// 说明：全局过滤器存放在此
// 过滤器是什么：过滤器本质上是一个函数，可将模板字符串中的变量格式化成需要的形式。在实际应用中，一般用此来格式化字典
export function urgencyLevelFormatter(value) {
  return ['紧急', '急', '一般'][value]
}
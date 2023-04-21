/*
   深拷贝函数：
      支持数组、对象等变量的深拷贝
   官方网站：
      https://github.com/vuejs/vuex/blob/dev/src/util.js#L22
   使用说明：
      参数：要复制的变量
      返回：复制后的变量
*/
// 需求：深拷贝函数
export function deepCopy(obj) {
   var cache = []
   if (obj === null || typeof obj !== 'object') {
      return obj
   }
   const hit = find(cache, c => c.original === obj)
   if (hit) {
      return hit.copy
   }
   const copy = Array.isArray(obj) ? [] : {}
   cache.push({
      original: obj,
      copy
   })
   Object.keys(obj).forEach(key => {
      copy[key] = deepCopy(obj[key], cache)
   })
   return copy
}

/*
   根据叶子节点，找出路径，用于级联菜单回显
   使用说明：
      参数：
         leafId：子节点值
         nodes：数据，数组类型
         prop：{
            value: 节点的值
            children：下级节点名称
         }，默认为 { children: 'children', value: 'value' }
         path：递归用，无需传入
      返回：
         遍历路径

*/
export function getCascaderObj(leafId, nodes, prop = { children: 'children', value: 'value' }, path = [] ) {
   for(let i = 0; i < nodes.length; i++) {
      let tmpPath = path.concat()
      tmpPath.push(nodes[i][prop.value])
      if(leafId == nodes[i][prop.value]) {
         return tmpPath
      }
      if(nodes[i][prop.children]) {
         var findResult = getCascaderObj(leafId, nodes[i][prop.children], prop, tmpPath )
         if(findResult) {
            return findResult
         }
      }
   }
}
// 设置异步延迟间隔
export function delay(interval = 0) {
  return new Promise(resolve => {
    let timer = setTimeout(_ => {
      clearTimeout(timer)
      resolve()
    }, interval)
  })
}

// 按照二进制读取文件
export function readFile(file) {
  return new Promise(resolve => {
    let reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onload = e => {
      resolve(e.target.result)
    }
    // console.log(readFile(file),'------e');
  })
}

// 字段对应表--将Excel表中的字段转换成后台需要的字段（text要与Excel表的一致）
export let character = {
  abd_id: {
    text: 'ID',
    type: 'number'
  },
  abd_ex1: {
    text: '乡镇',
    type: 'string'
  },
  abd_ex2: {
    text: '姓名',
    type: 'string'
  },
  abd_ex3: {
    text: '身份证号',
    type: 'string'
  },
  abd_ex4: {
    text: '档案编号',
    type: 'string'
  },
  abd_ex5: {
    text: '残疾证号',
    type: 'string'
  },
  abd_ex6: {
    text: '户口性质',
    type: 'string'
  },
  abd_ex7: {
    text: '身份证号码',
    type: 'string'
  },
  abd_ex8: {
    text: '开户人',
    type: 'string'
  },
  abd_ex9: {
    text: '行政区划',
    type: 'string'
  },
  abd_ex10: {
    text: '身份证照片',
    type: 'string'
  },
  abd_ex11: {
    text: '家庭住址',
    type: 'string'
  },
  abd_ex12: {
    text: '单人保',
    type: 'string'
  },
  abd_ex13: {
    text: '救助内容',
    type: 'string'
  },
  abd_ex14: {
    text: '突发事件',
    type: 'string'
  },
  abd_ex15: {
    text: '状态',
    type: 'string'
  },
  abd_ex16: {
    text: '其他证明材料',
    type: 'string'
  },
  abd_ex17: {
    text: '身份证照所属单位',
    type: 'string'
  },
  abd_ex18: {
    text: '核对人',
    type: 'string'
  },
  abd_ex19: {
    text: '初审',
    type: 'string'
  },
  abd_ex20: {
    text: '初审人',
    type: 'string'
  },
  abd_ex21: {
    text: '审核结果',
    type: 'string'
  },
  abd_ex22: {
    text: '退回原因',
    type: 'string'
  },
  abd_ex23: {
    text: '系统核对',
    type: 'string'
  },
  abd_ex24: {
    text: '核对意见',
    type: 'string'
  },
  abd_ex25: {
    text: '初审意见',
    type: 'string'
  },
  abd_ex26: {
    text: '审批意见',
    type: 'string'
  },
  abd_ex27: {
    text: '初审结果',
    type: 'string'
  },
  abd_ex28: {
    text: '联系电话',
    type: 'string'
  },
  abd_ex29: {
    text: '工资性收入',
    type: 'string'
  },
  abd_ex30: {
    text: '经营净收入',
    type: 'string'
  },
  abd_ex31: {
    text: '财产净收入',
    type: 'string'
  },
  abd_ex32: {
    text: '转移净收入',
    type: 'string'
  },
  abd_ex33: {
    text: '其他收入',
    type: 'string'
  },
  abd_ex34: {
    text: '公示结果',
    type: 'string'
  },
  abd_ex34: {
    text: '公示意见',
    type: 'string'
  },
  abd_ex42: {
    text: '开户银行',
    type: 'string'
  },
  abd_ex43: {
    text: '银行卡号',
    type: 'string'
  },
  abd_ex46: {
    text: '求助原因',
    type: 'string'
  },
  abd_ex92: {
    text: '是否属于近亲属',
    type: 'string'
  },
 
}

// 时间字符串格式化
export function formatTime(str, tpl) {
  let arr = str.match(/\d+/g).map(item => {
    return item.length < 2 ? '0' + item : item
  })
  tpl = tpl || '{0}年{1}月{2}日 {3}时{4}分{5}秒'
  return tpl.replace(/\{(\d+)\}/g, (_, group) => {
    return arr[group] || '00'
  })
}

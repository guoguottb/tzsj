//  手机号
export function checkPhone(key, id) {
  const reg5 = /^[1][3,4,5,7,8,9][0-9]{9}$/
  // if (value == '' || value == undefined || value == null || (value.length > 0 && value.trim().length == 0)) {
  //   return callback(new Error('不能为空'))
  // } else if (!reg.test(value)) {
  //   return callback(new Error('目前只支持中国大陆的手机号码'))
  // } else {
  //   callback()
  // }
  if (id == 'ab_ex28') {
    if (!reg5.test(key)) {
      // this.$message.warning("请检查是否输入了正确的手机号长度或格式");
      return '请检查是否输入了正确的手机号长度或格式'
    }
  }
  return true
}
export function isWorkUnit(name, id, rowIndex) {
  let reg = /^(?!\s*$)[A-Za-z0-9._\-\(\)\u4e00-\u9fa5\（）\s-]+$/
  // if (!reg.test(name) && id == 'f4.abm_ex15') {
  //   return (
  //     '第' + (Number(rowIndex) + 1) + '行：近亲属职位不能有除汉字以外的字符'
  //   )
  // }
}

//汉字验证
export function isName(name, id, rowIndex) {
  var reg2 = /^[\u4E00-\u9FFF]{0,}$/
  if (!reg2.test(name) && id == 'ab_ex3') {
    // this.$message.warning();
    return '申请人' + name + '姓名不能有除汉字以外的字符'
  }

  if (!reg2.test(name) && id == 'f4.abm_ex3') {
    return (
      '第' +
      (Number(rowIndex) + 1) +
      '行：近亲属' +
      name +
      '姓名不能有除汉字以外的字符'
    )
  } else if (name == '') {
    // return "第"+(rowIndex+1)+"行:近亲属数据不全";
  }
  if (!reg2.test(name) && id == 'f4.abm_ex1') {
    return (
      '第' + (Number(rowIndex) + 1) + '行：近亲属关系不能有除汉字以外的字符'
    )
  }
  if (!reg2.test(name) && id == 'f4.abm_ex15') {
    return (
      '第' + (Number(rowIndex) + 1) + '行：近亲属职位不能有除汉字以外的字符'
    )
  }
  if (!reg2.test(name) && id == 'ab_ex42') {
    return '一卡通开户银行名称不能有除汉字以外的字符'
  }
  if (!reg2.test(name) && id == 'ab_ex8') {
    return '开户人' + name + '姓名中不能有除汉字以外的字符'
  }
  if (!reg2.test(name) && id == 'f1.abm_ex3') {
    return (
      '第' +
      (Number(rowIndex) + 1) +
      '行：共同生活成员' +
      name +
      '姓名中不能有除汉字以外的字符'
    )
  }
  if (!reg2.test(name) && id == 'f2.abm_ex3') {
    return (
      '第' +
      (Number(rowIndex) + 1) +
      '行：非共同生活赡抚扶养人信息' +
      name +
      '姓名中不能有除汉字以外的字符'
    )
  }
  if (!reg2.test(name) && id == 'f3.abm_ex3') {
    return (
      '第' +
      (Number(rowIndex) + 1) +
      '行：非共同生活赡抚扶养人家庭成员信息' +
      name +
      '姓名中不能有除汉字以外的字符'
    )
  }
  if (!reg2.test(name) && id == 'e1.abe_ex1') {
    return (
      '第' +
      (Number(rowIndex) + 1) +
      '行：车（船）主' +
      name +
      '姓名中不能有除汉字以外的字符'
    )
  }

  if (!reg2.test(name) && id == 'e2.abe_ex1') {
    return (
      '第' +
      (Number(rowIndex) + 1) +
      '行：房屋产权人/共有人' +
      name +
      '姓名中不能有除汉字以外的字符'
    )
  }
  if (!reg2.test(name) && id == 'ab_ex195') {
    return '供养机构名称不能有除汉字以外的字符'
  }
  if (!reg2.test(name) && id == 'aba_ex1') {
    return '代理人' + name + '姓名中不能含有数字、特殊字符或空格'
  }

  if (!reg2.test(name) && id == 'land.abl_ex1') {
    // this.$message.warning();
    return (
      (Number(rowIndex) + 1 ? '第' + (Number(rowIndex) + 1) + '行' : '') +
      '承包人' +
      name +
      '姓名中不能含有数字、特殊字符或空格'
    )
  }

  var reg3 = /^[\u4E00-\u9FA5A-Z0-9-]+$/
  let regular = /^(?!\s*$)[A-Za-z0-9._\-\(\)\u4e00-\u9fa5\（）\s-]+$/
  if (!regular.test(name) && id == 'f1.abm_ex15') {
    // this.$message.warning("共同生活成员,工作单位名称中不能为空，只能有汉字大写字母数字，英文横线");
    // 中文字符、英文字母、数字、中划线、下划线、点、空格和中英文圆括号组成,且不能仅输入空格
    return (
      '第' +
      (Number(rowIndex) + 1) +
      '行：共同生活成员，工作单位名称只允许中文字符、英文字母、数字、中划线、下划线、点、空格和中英文圆括号组成,且不能仅输入空格'
    )
  }
  if (!regular.test(name) && id == 'f2.abm_ex15') {
    // this.$message.warning("非共同生活赡抚养人,工作单位名称中不能为空，只能有汉字大写字母数字，英文横线");
    return (
      '第' +
      (Number(rowIndex) + 1) +
      '行：非共同生活赡抚养人，工作单位名称只允许中文字符、英文字母、数字、中划线、下划线、点、空格和中英文圆括号组成,且不能仅输入空格'
    )
  }
  return true
}

// 预警内容验证
export function warningContent(key, id, rowIndex) {
  var reg1 = /^[\u4E00-\u9FA5A-Za-z0-9]+$/,
    str = key
  console.log(reg1.test(str), id)
  console.log(!reg1.test(key) && id == 'warning.aw_ex1')
  if (!reg1.test(key) && id == 'warning.aw_ex1') {
    return '第' + (Number(rowIndex) + 1) + '行预警内容只能填报汉字、数字、英文'
  }
  return true
}

//  人口验证 0~99
export function isFamilyNum(key, id, rowIndex) {
  var reg4 = /^[0-9]{1,2}$/
  if (!reg4.test(key) && id == 'ab_ex5') {
    // this.$message.warning("家庭人口的区间为0~99，且只能填报数字");

    if (key > 99) {
      return '家庭人口数不能大于99'
    } else if (key < 0) {
      return '家庭人口不能小于0'
    } else if (isNaN(Number(key))) {
      return '家庭人口只能填报数字'
    } else {
      return '家庭人口不能为空'
    }
  }
  if (!reg4.test(key) && id == 'f2.abm_ex20') {
    // this.$message.warning("非共同生活赡抚养人，家庭人口的区间为0~99，且只能填报数字");
    // return "非共同生活赡抚养人，家庭人口的区间为0~99，且只能填报数字";
    if (key > 99) {
      return (
        '第' +
        (Number(rowIndex) + 1) +
        '行：非共同生活赡抚养人，家庭人口数不能大于99'
      )
    } else {
      return (
        '第' +
        (Number(rowIndex) + 1) +
        '行：非共同生活赡抚养人，家庭人口不能为空，只能有数字'
      )
    }
  }
  return true
}

// 文本验证
export function isText(key, id, rowIndex) {
  // 汉字大写字母数字，英文横线
  var reg3 = /^[\u4E00-\u9FA5A-Z0-9-]+$/
  // 检测纯数字
  var reg9 = /^\d{1,}$/

  var content = ''
  content = id == 'ab_ex4' ? '户籍地址' : content
  content = id == 'ab_ex11' ? '家庭住址' : content
  content = id == 'e1.abe_ex2' ? '车（船）购买时间' : content
  content = id == 'e1.abe_ex3' ? '车（船）购买时间' : content
  content =
    id == 'e2.abe_ex2'
      ? '第' + (Number(rowIndex) + 1) + '行：购房/建房时间'
      : content
  content =
    id == 'e2.abe_ex5'
      ? '第' + (Number(rowIndex) + 1) + '行：房屋地址'
      : content

  if (!reg3.test(key) && id == 'ab_ex4') {
    // this.$message.warning("户籍地址中不能含有特殊字符或空格");
    return '户籍地址中不能为空，只能有汉字大写字母数字，英文横线'
  }
  if (reg9.test(key)) {
    return content + '不能填报纯数字'
  }

  if (!reg3.test(key) && id == 'ab_ex11') {
    // this.$message.warning("家庭住址中不能含有特殊字符或空格");
    return '家庭住址中不能为空，只能有汉字大写字母数字，英文横线'
  }

  // if(!reg3.test(key)&&id=="f2.abm_ex21"){
  //   // this.$message.warning("家庭财产状况简述中不能为空，只能有汉字大写字母数字，英文横线");
  //   return "家庭财产状况简述中不能为空，只能有汉字大写字母数字，英文横线";
  // }

  if (!reg3.test(key) && id == 'e1.abe_ex2') {
    // this.$message.warning("车（船）购买时间不能为空，只能有汉字大写字母数字，英文横线");
    return '车（船）购买时间不能为空，只能有汉字大写字母数字，英文横线'
  }
  if (!reg3.test(key) && id == 'e1.abe_ex3') {
    // this.$message.warning("车（船）用途描述中不能为空，只能有汉字大写字母数字，英文横线");
    return (
      '第' +
      (Number(rowIndex) + 1) +
      '行：车（船）用途描述中不能为空，只能有汉字大写字母数字，英文横线'
    )
  }
  if (!reg3.test(key) && id == 'e2.abe_ex2') {
    // this.$message.warning("购房/建房时间不能为空，只能有汉字大写字母数字，英文横线");
    return (
      '第' +
      (Number(rowIndex) + 1) +
      '行：购房/建房时间不能为空，只能有汉字大写字母数字，英文横线'
    )
  }
  if (!reg3.test(key) && id == 'e2.abe_ex5') {
    // this.$message.warning("房屋地址中不能为空，只能有汉字大写字母数字，英文横线");
    return (
      '第' +
      (Number(rowIndex) + 1) +
      '行：房屋地址中不能为空，只能有汉字大写字母数字，英文横线'
    )
  }
  return true
}

// 数字验证
export function isNum(key, id, rowIndex) {
  var reg7 = /^([0-9][0-9]*)+(\.[0-9]{1,2})?$/
  if (key != '') {
    if (!reg7.test(key) && id == 'f1.abm_ex17') {
      // this.$message.warning("共同生活家庭成员，月收入只能填报数字（非0开头，最多保留两位小数）");
      return (
        '第' +
        (Number(rowIndex) + 1) +
        '行：共同生活家庭成员，月收入只能填报数字（最多保留两位小数）'
      )
      // isSave=false;
    }
    if (!reg7.test(key) && id == 'f2.abm_ex17') {
      // this.$message.warning("非共同生活赡抚养人，月人均收入只能填报数字（非0开头，最多保留两位小数）");
      return (
        '第' +
        (Number(rowIndex) + 1) +
        '行：非共同生活赡抚养人，月人均收入只能填报数字（最多保留两位小数）'
      )
    }
    if (!reg7.test(key) && id == 'f2.abm_ex18') {
      // this.$message.warning("非共同生活赡抚养人，月赡(扶、抚)养费只能填报数字（非0开头，最多保留两位小数）");
      return (
        '第' +
        (Number(rowIndex) + 1) +
        '行：非共同生活赡抚养人，月赡(扶、抚)养费只能填报数字（最多保留两位小数）'
      )
    }
    if (!reg7.test(key) && id == 'ico1.abi_ex2') {
      // this.$message.warning("工资性收入只能填报数字（非0开头，最多保留两位小数）");
      return (
        '第' +
        (Number(rowIndex) + 1) +
        '行：工资性收入只能填报数字（最多保留两位小数）'
      )
    }
    if (!reg7.test(key) && id == 'ico2.abi_ex2') {
      // this.$message.warning("经营性收入只能填报数字（非0开头，最多保留两位小数）");
      return (
        '第' +
        (Number(rowIndex) + 1) +
        '行：经营性收入只能填报数字（最多保留两位小数）'
      )
    }
    if (!reg7.test(key) && id == 'ico3.abi_ex2') {
      // this.$message.warning("财产性收入只能填报数字（非0开头，最多保留两位小数）");
      return (
        '第' +
        (Number(rowIndex) + 1) +
        '行：财产性收入只能填报数字（最多保留两位小数）'
      )
    }
    if (!reg7.test(key) && id == 'ico4.abi_ex2') {
      // this.$message.warning("转移性收入只能填报数字（非0开头，最多保留两位小数）");
      return (
        '第' +
        (Number(rowIndex) + 1) +
        '行：转移性收入只能填报数字（最多保留两位小数）'
      )
    }
    if (!reg7.test(key) && id == 'ico5.abi_ex2') {
      // this.$message.warning("其他收入只能填报数字（非0开头，最多保留两位小数）");
      return '其他收入只能填报数字（最多保留两位小数）'
    }
    if (!reg7.test(key) && id == 'ico6.abi_ex2') {
      // this.$message.warning("必要就业成本只能填报数字（非0开头，最多保留两位小数）");
      return '必要就业成本只能填报数字（最多保留两位小数）'
    }
    if (!reg7.test(key) && id == 'ico7.abi_ex2') {
      // this.$message.warning("总收入只能填报数字（非0开头，最多保留两位小数）");
      return '总收入只能填报数字（最多保留两位小数）'
    }
    // 支出
    if (!reg7.test(key) && id == 'pay.abp_ex4') {
      // this.$message.warning("医疗支出只能填报数字（非0开头，最多保留两位小数）");
      return '医疗支出只能填报数字（最多保留两位小数）'
    }
    if (!reg7.test(key) && id == 'pay.abp_ex5') {
      // this.$message.warning("教育支出只能填报数字（非0开头，最多保留两位小数）");
      return '教育支出只能填报数字（最多保留两位小数）'
    }
    if (!reg7.test(key) && id == 'pay.abp_ex6') {
      // this.$message.warning("残疾康复费用支出只能填报数字（非0开头，最多保留两位小数）");
      return '残疾康复费用支出只能填报数字（最多保留两位小数）'
    }
    if (!reg7.test(key) && id == 'pay.abp_ex11') {
      // this.$message.warning("因灾、因意外事故费用支出只能填报数字（非0开头，最多保留两位小数）");
      return '因灾、因意外事故费用支出只能填报数字（最多保留两位小数）'
    }
    if (!reg7.test(key) && id == 'pay.abp_ex7') {
      // this.$message.warning("其他支出只能填报数字（非0开头，最多保留两位小数）");
      return '其他支出只能填报数字（最多保留两位小数）'
    }
    if (!reg7.test(key) && id == 'pay.abp_ex8') {
      // this.$message.warning("家庭总支出只能填报数字（非0开头，最多保留两位小数）");
      return '家庭总支出只能填报数字（最多保留两位小数）'
    }
    // 金融资产
    if (!reg7.test(key) && id == 'ab_ex36') {
      // this.$message.warning("银行总存款只能填报数字（非0开头，最多保留两位小数）");
      return '银行总存款只能填报数字（最多保留两位小数）'
    }
    if (!reg7.test(key) && id == 'ab_ex60') {
      // this.$message.warning("有价证券只能填报数字（非0开头，最多保留两位小数）");
      return '有价证券只能填报数字（最多保留两位小数）'
    }
    if (!reg7.test(key) && id == 'ab_ex179') {
      // this.$message.warning("基金只能填报数字（非0开头，最多保留两位小数）");
      return '基金只能填报数字（最多保留两位小数）'
    }
    if (!reg7.test(key) && id == 'ab_ex180') {
      // this.$message.warning("商业保险只能填报数字（非0开头，最多保留两位小数）");
      return '商业保险只能填报数字（最多保留两位小数）'
    }
    if (!reg7.test(key) && id == 'ab_ex61') {
      // this.$message.warning("债权只能填报数字（非0开头，最多保留两位小数）");
      return '债权只能填报数字（最多保留两位小数）'
    }
    if (!reg7.test(key) && id == 'ab_ex37') {
      // this.$message.warning("其他金融产品只能填报数字（非0开头，最多保留两位小数）");
      return '其他金融产品只能填报数字（最多保留两位小数）'
    }
    // 车船，房屋
    if (!reg7.test(key) && id == 'e1.abe_ex4') {
      // this.$message.warning("车（船）价值只能填报数字（非0开头，最多保留两位小数）");
      return (
        '第' +
        (Number(rowIndex) + 1) +
        '行:车（船）价值只能填报数字（最多保留两位小数）'
      )
    }
    if (!reg7.test(key) && id == 'e2.abe_ex6') {
      // this.$message.warning("房屋面积只能填报数字（最多保留两位小数）");
      return (
        '第' +
        (Number(rowIndex) + 1) +
        '行:房屋面积只能填报数字（最多保留两位小数）'
      )
    }
    if (!reg7.test(key) && id == 'e2.abe_ex4') {
      // this.$message.warning("房屋价值只能填报数字（最多保留两位小数）");
      return (
        '第' +
        (Number(rowIndex) + 1) +
        '行:房屋价值只能填报数字（最多保留两位小数）'
      )
    }

    if (!reg7.test(key) && id == 'land.abl_ex2') {
      // this.$message.warning((rowIndex != null ? "第" + rowIndex + "行": "") + "承包面积只能填报数字（最多保留两位小数）");
      return (
        (Number(rowIndex) + 1 != null
          ? '第' + (Number(rowIndex) + 1) + '行'
          : '') + '承包面积只能填报数字（最多保留两位小数）'
      )
    }
    if (!reg7.test(key) && id == 'land.abl_ex4') {
      // this.$message.warning(((Number(rowIndex)+1) != null ? "第" + (Number(rowIndex)+1) + "行": "") + "土地估值只能填报数字（最多保留两位小数）");
      return (
        (Number(rowIndex) + 1 != null
          ? '第' + (Number(rowIndex) + 1) + '行'
          : '') + '土地估值只能填报数字（最多保留两位小数）'
      )
    }
    if (!reg7.test(key) && id == 'ab_ex199') {
      // this.$message.warning("房屋价值只能填报数字（最多保留两位小数）");
      return '护理费只能填报数字（最多保留两位小数）'
    }
    if (!reg7.test(key) && id == 'ab_ex200') {
      // this.$message.warning("房屋价值只能填报数字（最多保留两位小数）");
      return '生活费只能填报数字（最多保留两位小数）'
    }
  }
  // else{
  //   return true;
  // }
  return true
}

// 银行账号
export function isBankID(key, id) {
  if (id == 'ab_ex43') {
    var reg6 = /[A-Z0-9]$/g //大写字母和数字
    var reg8 = /^(.)\1*$/ //所有字符不能相同

    if (!reg6.test(key)) {
      return '一卡通银行卡账号中只能有数字和大写字母'
    }
    if (key.length < 5 && key.length > 0) {
      return '一卡通银行卡账号长度非法'
    }
    if (key.length == 0) {
      return '一卡通银行卡账号不能为空'
    }
    if (reg8.test(key)) {
      return '一卡通银行卡账号全字符不能相同'
    }
  }
  return true
}

// 身份证
export function isCardID(sId) {
  //js去掉所有空格 \s表示查找空格带上加好表示连续的空格
  sId = sId.replace(/\s+/g, '')

  var aCity = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外',
  }
  var iSum = 0
  var info = ''
  if (!/^\d{17}(\d|X)$/i.test(sId)) return '身份证长度或格式错误'
  sId = sId.replace(/x$/i, 'a')
  if (aCity[parseInt(sId.substr(0, 2))] == null) return '身份证地区非法'
  let sBirthday =
    sId.substr(6, 4) +
    '-' +
    Number(sId.substr(10, 2)) +
    '-' +
    Number(sId.substr(12, 2))
  var d = new Date(sBirthday.replace(/-/g, '/'))
  if (
    sBirthday !=
    d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
  )
    return '身份证上的出生日期非法'
  for (var i = 17; i >= 0; i--) {
    let t = sId.charAt(17 - i)
    if (t == 'x' || t == 'X') {
      t = '10'
    }
    iSum += (Math.pow(2, i) % 11) * parseInt(t, 11)
  }
  if (iSum % 11 != 1) return '身份证号非法'
  // console.log( sBirthday,"=====",d)
  aCity[parseInt(sId.substr(0, 2))] +
    ',' +
    sBirthday +
    ',' +
    (sId.substr(16, 1) % 2 ? '男' : '女') //此次还可以判断出输入的身份证号的人性别
  return true
}

/**
 * 新加通用rules验证
 * by smallcol 2021-12-15 用例参考 yljg/addEditYljg.vue
 * @param {*} type 验证类型 BankCardNo=银行卡号 PersonName=姓名 Phone=手机号
 *                          Zero=是否为0 Number2=2位小数的数字 true/false=其他传值验证
 * @param {*} rule 页面验证RULE，注意不是RULES
 * @param {*} value 值
 * @param {*} cb 回调函数，基本为NULL
 * @returns
 */
export function commonValidator(type, rule, value, cb) {
  if (!value) {
    if (cb) cb()
    return false
  }
  let reg = null
  //银行卡号验证
  if (type == 'BankCardNo') {
    reg = /^([1-9]{1})(\d{15}|\d{18})$/
    //姓名验证
  } else if (type == 'PersonName') {
    reg = /^[\u4E00-\u9FFF]{0,}$/
    //手机号验证
  } else if (type == 'Phone') {
    reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
    //为0验证
  } else if (type == 'Zero') {
    reg = /^[+]{0,1}(\d+)$/
    //数字带2位小数验证
  } else if (type == 'Number2') {
    reg = /^([0-9][0-9]*)+(\.[0-9]{1,2})?$/
  }
  //需要REG验证的
  if (reg) {
    if (!reg.test(value)) {
      if (cb) cb(new Error(rule.message))
      return false
    } else {
      if (cb) cb()
      return true
    }
    //复杂的REG，身份证
  } else if (type == 'IDCard') {
    //其他外面传入值的
  } else {
    if (type == false) {
      if (cb) cb(new Error(rule.message))
      return false
    } else if (type == true) {
      if (cb) cb()
      return true
    }
    return false
  }
}
/**
 * 保存前表单验证，不能验证需计算项目
 * by smallcol 2021-12-15 用例参考 yljg/addEditYljg.vue
 * @param {*} rules 页面验证RULES
 * @param {*} data 数据，可以为行数据
 * @param {*} $message 页面消息组件
 * @returns
 */
export function formsVerify(rules, data, $message) {
  try {
    let bCheck = true
    for (let key in rules) {
      try {
        let rule = rules[key]
        //普通数据校验
        if (data.length == undefined) {
          let val = data[key]
          for (let i = 0; i < rule.length; i++) {
            if (rule[i].required) {
              if (!val) {
                $message.warning(rule[i].message)
                bCheck = false
                break
              }
            } else if (rule[i].validator) {
              if (!rule[i].validator(rule[i], val, null)) {
                $message.warning(rule[i].message)
                bCheck = false
                break
              }
            }
          }
          //行数据校验
        } else {
          for (let c = 0; c < data.length; c++) {
            let val = data[c][key]
            for (let i = 0; i < rule.length; i++) {
              if (rule[i].required) {
                if (!val) {
                  $message.warning(
                    '第' + (c + 1) + '行数据：' + rule[i].message
                  )
                  bCheck = false
                  break
                }
              } else if (rule[i].validator) {
                if (!rule[i].validator(rule[i], val, null)) {
                  $message.warning(
                    '第' + (c + 1) + '行数据：' + rule[i].message
                  )
                  bCheck = false
                  break
                }
              }
            }
            if (!bCheck) break
          }
        }
        if (!bCheck) break
      } catch (e) {}
    }
    return bCheck
  } catch (e) {
    return false
  }
}

/**
 * 格式化日期
 * by smallcol 2021-12-15
 * @param {*} fmt 格式，如：yyyy-MM-dd、yyyyMM、yyyy年MM月dd日等
 * @returns
 */
Date.prototype.Format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'H+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  return fmt
}

/*
 * 登录账号检测--检测是否为泰州市的账号
 */
export function isCityAccount(key) {
  // console.log(key,'key');
  // console.log( Boolean(key),'key bool');

  var specialAccount1 = sessionStorage.getItem('charId').split('_')

  if (specialAccount1.length > 1) {
    var specialAccount2 = sessionStorage
      .getItem('charId')
      .split('_')[1]
      .slice(0, 9)
  }

  // // 特殊账号验证（大市、（市）区的直辖福利机构）
  // if(['321284998','321283999','321299999'].includes(specialAccount2) && !key){
  //   return true ;
  // }else
  if (key && ['321200000'].includes(specialAccount2)) {
    // 大市级账号验证--查看资金发放汇总信息按钮
    return true
  } else {
    return false
  }
}

/**
 * 新加通用rules验证
 * by smallcol 2021-12-15 用例参考 yljg/addEditYljg.vue
 * @param {*} type 验证类型 BankCardNo=银行卡号 PersonName=姓名 Phone=手机号
 *                          Zero=是否为0 Number2=2位小数的数字 true/false=其他传值验证
 * @param {*} rule 页面验证RULE，注意不是RULES
 * @param {*} value 值
 * @param {*} cb 回调函数，基本为NULL
 * @returns
 */

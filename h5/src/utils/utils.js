export const nation = [
  '汉族',
  '壮族',
  '满族',
  '回族',
  '苗族',
  '维吾尔族',
  '彝族',
  '土家族',
  '蒙古族',
  '藏族',
  '布依族',
  '侗族',
  '瑶族',
  '朝鲜族',
  '白族',
  '哈尼族',
  '哈萨克族',
  '黎族',
  '傣族',
  '畲族',
  '傈僳族',
  '仡佬族',
  '拉祜族',
  '高山族',
  '东乡族',
  '佤族',
  '水族',
  '纳西族',
  '羌族',
  '土族',
  '锡伯族',
  '仫佬族',
  '柯尔克孜族',
  '达斡尔族',
  '景颇族',
  '撒拉族',
  '布朗族',
  '毛难族',
  '塔吉克族',
  '普米族',
  '阿昌族',
  '怒族',
  '鄂温克族',
  '京族',
  '基诺族',
  '德昂族',
  '乌孜别克族',
  '俄罗斯族',
  '保安族',
  '裕固族',
  '门巴族',
  '鄂伦春族',
  '独龙族',
  '塔塔尔族',
  '赫哲族',
  '珞巴族',
  '其他',
  '外国血统中国籍人士',
]

// 压缩图片
export class compressImg {
  //定义了一个名字为compressImg的类
  constructor(file, num, fun, index) {
    //constructor是一个构造方法，用来接收参数
    this.file = file
    this.num = num
    this.fun = fun
    this.index = index
    this.imgPreview(this.file, this.num)
  }
  // 处理图片
  imgPreview(file, num) {
    let self = this
    // 看支持不支持FileReader
    if (!file.file || !window.FileReader) return
    if (/^image/.test(file.file.type)) {
      // 创建一个reader
      let reader = new FileReader()
      // 将图片2将转成 base64 格式
      reader.readAsDataURL(file.file)
      // 读取成功后的回调
      reader.onloadend = function () {
        let result = this.result
        let img = new Image()
        img.src = result
        //判断图片是否大于5M,是就直接上传，反之压缩图片
        if (this.result.length <= 1.5 * 1024 * 1024) {
          console.log('图片小于1.5M')
          // 上传图片
          self.postImg(this.result, file, num)
        } else {
          console.log('图片大于1.5M，需要压缩')
          img.onload = function () {
            let data = self.compress(img)
            // 上传图片
            self.postImg(data, file, num)
          }
        }
      }
    }
  }
  // 压缩图片
  compress(img) {
    let canvas = document.createElement('canvas')
    let ctx = canvas.getContext('2d')
    //瓦片canvas
    let tCanvas = document.createElement('canvas')
    let tctx = tCanvas.getContext('2d')
    // let initSize = img.src.length;
    let width = img.width
    let height = img.height
    //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    let ratio
    if ((ratio = (width * height) / 4000000) > 1) {
      // console.log("大于400万像素");
      ratio = Math.sqrt(ratio)
      width /= ratio
      height /= ratio
    } else {
      ratio = 1
    }
    canvas.width = width
    canvas.height = height
    //    铺底色
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    //如果图片像素大于100万则使用瓦片绘制
    let count
    if ((count = (width * height) / 1000000) > 1) {
      // console.log("超过100W像素");
      count = ~~(Math.sqrt(count) + 1) //计算要分成多少块瓦片
      //      计算每块瓦片的宽和高
      let nw = ~~(width / count)
      let nh = ~~(height / count)
      tCanvas.width = nw
      tCanvas.height = nh
      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          tctx.drawImage(
            img,
            i * nw * ratio,
            j * nh * ratio,
            nw * ratio,
            nh * ratio,
            0,
            0,
            nw,
            nh
          )
          ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
        }
      }
    } else {
      ctx.drawImage(img, 0, 0, width, height)
    }
    //进行压缩
    let ndata = canvas.toDataURL('image/jpeg', 0.8)
    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
    console.log(ndata,"ndata")
    return ndata
  }

  //将base64转换为文件
  dataURLtoFile(dataurl, file) {
    var arr = dataurl.split(','),
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], file.file.name, {
      type: file.file.type,
    })
  }

  // 提交图片到后端
  postImg(base64, file, num) {
    let filedata = this.dataURLtoFile(base64, file)
    let formData = new window.FormData()
    formData.append('file', filedata)
    // 调用传的方法
    this.fun(formData, file, num, this.index)
  }
}

// 获取年龄
export function getAge(identityCard) {
  var len = (identityCard + '').length
  if (len == 0) {
    return ''
  } else {
    if (len != 15 && len != 18) {
      //身份证号码只能为15位或18位其它不合法
      return ''
    }
  }
  var strBirthday = ''
  if (len == 18) {
    //处理18位的身份证号码从号码中得到生日和性别代码
    strBirthday =
      identityCard.substr(6, 4) +
      '/' +
      identityCard.substr(10, 2) +
      '/' +
      identityCard.substr(12, 2)
  }
  if (len == 15) {
    strBirthday =
      '19' +
      identityCard.substr(6, 2) +
      '/' +
      identityCard.substr(8, 2) +
      '/' +
      identityCard.substr(10, 2)
  }
  //时间字符串里，必须是“/”
  var birthDate = new Date(strBirthday)
  var nowDateTime = new Date()
  var age = nowDateTime.getFullYear() - birthDate.getFullYear()
  //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
  if (
    nowDateTime.getMonth() < birthDate.getMonth() ||
    (nowDateTime.getMonth() == birthDate.getMonth() &&
      nowDateTime.getDate() < birthDate.getDate())
  ) {
    age--
  }
  return age
}

// 获取出生年与
export function getBirthday(idCard) {
  var birthday = ''
  if (idCard != null && idCard != '') {
    if (idCard.length == 15) {
      birthday = '19' + idCard.substr(6, 6)
    } else if (idCard.length == 18) {
      birthday = idCard.substr(6, 8)
    }

    birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-')
  }

  return birthday
}

// 获取性别
export function getSex(idCard) {
  //alert(idCard);
  var sexStr = ''
  if (parseInt(idCard.slice(-2, -1)) % 2 == 1) {
    sexStr = '男'
  } else {
    sexStr = '女'
  }
  return sexStr
}

// 检测身份证是否非法
export function isCardID(sId) {
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
  console.log(sId)
  if (!/^\d{17}(\d|x)$/i.test(sId)) return '身份证长度或格式错误'
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
  for (var i = 17; i >= 0; i--)
    iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11)
  if (iSum % 11 != 1) return '身份证号非法'
  //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
  return ''
}
// 验证是否包含特殊字符
export function tszfValidate(value) {
  let pattern = /[0-9`~!@#$%^&*()_+<>?:"{},.\/;'[\]￥…]/im
  if (value === '' || value === null) return true
  if (pattern.test(value)) {
    return true
  }
  return false
}
// 特殊字符过滤
export function tszfFilter(value) {
  return value.replace(/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]￥…（）]/gi, '')
}
// 特殊字符过滤(有些符号让他不过滤了"," "." 两个)
export function tszfFilter2(value) {
  return value.replace(/[`~!@#$%^&*()_+<>?:"{}\/;'[\]￥…（）]/gi, '')
}
// 行政区划
export const xzqh = [
  {
    text: '泰兴市',
    value: '#321283000000',
    children: [
      {
        text: '济川街道',
        value: '#321283001000',
        children: [
          {
            text: '南殷村',
            value: '#321283001040',
          },
          {
            text: '燕头村',
            value: '#321283001005',
          },
          {
            text: '房元村',
            value: '#321283001003',
          },
          {
            text: '耿戴村',
            value: '#321283001002',
          },
          {
            text: '渡河村',
            value: '#321283001020',
          },
          {
            text: '王坔村',
            value: '#321283001001',
          },
          {
            text: '众贤村',
            value: '#321283001017',
          },
          {
            text: '新联村',
            value: '#321283001015',
          },
          {
            text: '苏城村',
            value: '#321283001021',
          },
          {
            text: '三六村',
            value: '#321283001009',
          },
          {
            text: '向阳村',
            value: '#321283001011',
          },
          {
            text: '张庄村',
            value: '#321283001022',
          },
          {
            text: '郭庄村',
            value: '#321283001018',
          },
          {
            text: '兴燕居委会',
            value: '#321283001031',
          },
          {
            text: '北站居委会',
            value: '#321283001007',
          },
          {
            text: '商井居委会',
            value: '#321283001008',
          },
          {
            text: '跃进居委会',
            value: '#321283001035',
          },
          {
            text: '文垈居委会',
            value: '#321283001044',
          },
          {
            text: '张陈居委会',
            value: '#321283001004',
          },
          {
            text: '钱庄居委会',
            value: '#321283001010',
          },
        ],
      },
      {
        text: '延令街道',
        value: '#321283002000',
        children: [
          {
            text: '南郊村',
            value: '#321283002001',
          },
          {
            text: '延陵村',
            value: '#321283002002',
          },
          {
            text: '大生村',
            value: '#321283002003',
          },
          {
            text: '双进村',
            value: '#321283002004',
          },
          {
            text: '陆桥村',
            value: '#321283002005',
          },
          {
            text: '三阳村',
            value: '#321283002006',
          },
          {
            text: '蔡巷村',
            value: '#321283002007',
          },
          {
            text: '东联居委会',
            value: '#321283002009',
          },
          {
            text: '府前居委会',
            value: '#321283002010',
          },
          {
            text: '越街居委会',
            value: '#321283002011',
          },
          {
            text: '南街居委会',
            value: '#321283002012',
          },
          {
            text: '国庆二村居委会',
            value: '#321283002013',
          },
          {
            text: '复兴居委会',
            value: '#321283002014　',
          },
          {
            text: '西郊居委会',
            value: '#321283002015',
          },
          {
            text: '国庆新村居委会',
            value: '#321283002016',
          },
          {
            text: '鼓楼居委会',
            value: '#321283002017',
          },
          {
            text: '华泰居委会',
            value: '#321283002018　',
          },
          {
            text: '东城居委会',
            value: '#321283002019',
          },
          {
            text: '五里墩居委会',
            value: '#321283002020',
          },
          {
            text: '周曾居委会',
            value: '#321283002021　',
          },
          {
            text: '三营居委会',
            value: '#321283002022',
          },
          {
            text: '祥泰居委会',
            value: '#321283002023',
          },
          {
            text: '润泰居委会',
            value: '#321283002024',
          },
        ],
      },
      {
        text: '黄桥镇',
        // value: '#321283101000',
        value: '#321283100000', //本来是上面这样的，后端说查不到改成统一这样
        children: [
          {
            text: '胜利村',
            value: '#321283101200',
          },
          {
            text: '东场村',
            value: '#321283101201',
          },
          {
            text: '西寺桥村',
            value: '#321283101202',
          },
          {
            text: '直来桥村',
            value: '#321283101203',
          },
          {
            text: '站东村',
            value: '#321283101204',
          },
          {
            text: '勤丰村',
            value: '#321283101205',
          },
          {
            text: '合心村',
            value: '#321283101206',
          },
          {
            text: '浩堡村',
            value: '#321283101207',
          },
          {
            text: '野屋村',
            value: '#321283101208',
          },
          {
            text: '朱何村',
            value: '#321283101209',
          },
          {
            text: '封家庄村',
            value: '#321283101210',
          },
          {
            text: '前进村',
            value: '#321283101211',
          },
          {
            text: '三里村',
            value: '#321283101212',
          },
          {
            text: '东闾村',
            value: '#321283101213',
          },
          {
            text: '革新村',
            value: '#321283101214',
          },
          {
            text: '樊家集村',
            value: '#321283101215',
          },
          {
            text: '双桥村',
            value: '#321283101216',
          },
          {
            text: '横巷村',
            value: '#321283101217',
          },
          {
            text: '太平村',
            value: '#321283101218',
          },
          {
            text: '祁巷村',
            value: '#321283101219',
          },
          {
            text: '余家庄村',
            value: '#321283101220',
          },
          {
            text: '韩庄村',
            value: '#321283101221',
          },
          {
            text: '西洋庄村',
            value: '#321283101222',
          },
          {
            text: '陈桥村',
            value: '#321283101260',
          },
          {
            text: '翁庄村',
            value: '#321283101263',
          },
          {
            text: '钱葛村',
            value: '#321283101265',
          },
          {
            text: '朱徐村',
            value: '#321283101261',
          },
          {
            text: '野向村',
            value: '#321283101256',
          },
          {
            text: '吴韩村',
            value: '#321283101257',
          },
          {
            text: '江堡村',
            value: '#321283101266',
          },
          {
            text: '南殷村',
            value: '#321283101262',
          },
          {
            text: '诸马村',
            value: '#321283101267',
          },
          {
            text: '金堡村',
            value: '#321283101264',
          },
          {
            text: '华庄村',
            value: '#321283101255',
          },
          {
            text: '南沙村',
            value: '#321283101271',
          },
          {
            text: '新洋村',
            value: '#321283101270',
          },
          {
            text: '中盐村',
            value: '#321283101269',
          },
          {
            text: '路庄村',
            value: '#321283101268',
          },
          {
            text: '唐港村',
            value: '#321283101258',
          },
          {
            text: '秦庄村',
            value: '#321283101259',
          },
          {
            text: '南垈村',
            value: '#321283101272',
          },
          {
            text: '印院村',
            value: '#321283101245',
          },
          {
            text: '王庄村',
            value: '#321283101273',
          },
          {
            text: '刘陈村',
            value: '#321283101243',
          },
          {
            text: '黄坍村',
            // 应该是这个321283101240，后端不好改先跟后端同步
            value: '#321283101244',
          },
          {
            text: '印家院村',
            value: '#321283101276',
          },
          {
            text: '大张村',
            value: '#321283101246',
          },
          {
            text: '海顾村',
            value: '#321283101247',
          },
          {
            text: '东顾村',
            value: '#321283101248',
          },
          {
            text: '鞠垛村',
            value: '#321283101249',
          },
          {
            text: '严徐村',
            value: '#321283101274',
          },
          {
            text: '吴庄村',
            value: '#321283101251',
          },
          {
            text: '扬春村',
            value: '#321283101252',
          },
          {
            text: '果园村',
            value: '#321283101253',
          },
          {
            text: '双联村',
            value: '#321283101275',
          },
          {
            text: '南街居委会',
            value: '#321283101006',
          },
          {
            text: '北街居委会',
            value: '#321283101008',
          },
          {
            text: '米巷居委会',
            value: '#321283101001',
          },
          {
            text: '永丰居委会',
            value: '#321283101004',
          },
          {
            text: '东进居委会',
            value: '#321283101282',
          },
          {
            text: '滨河居委会',
            value: '#321283101279',
          },
          {
            text: '金溪居委会',
            value: '#321283101281',
          },
          {
            text: '琴韵居委会',
            value: '#321283101278',
          },
          {
            text: '银杏居委会',
            value: '#321283101280',
          },
          {
            text: '华溪居委会',
            value: '#321283101277',
          },
          {
            text: '白庄居委会',
            value: '#321283101012',
          },
        ],
      },
      {
        text: '珊瑚镇',
        value: '#321283102000',
        children: [
          {
            text: '洋港村',
            value: '#321283102200',
          },
          {
            text: '曹埠村',
            value: '#321283102201',
          },
          {
            text: '祯祥村',
            value: '#321283102202',
          },
          {
            text: '顾堡村',
            value: '#321283102203',
          },
          {
            text: '左庄村',
            value: '#321283102204',
          },
          {
            text: '新桥村',
            value: '#321283102205',
          },
          {
            text: '八户村',
            value: '#321283102206',
          },
          {
            text: '徐家庄村',
            value: '#321283102207',
          },
          {
            text: '八达村',
            value: '#321283102208',
          },
          {
            text: '周岱村',
            value: '#321283102209',
          },
          {
            text: '二河新村居委会',
            value: '#321283102001',
          },
          {
            text: '珊瑚新村居委会',
            value: '#321283102002',
          },
          {
            text: '镇前新村居委会',
            value: '#321283102003',
          },
        ],
      },
      {
        text: '广陵镇',
        value: '#321283103000',
        children: [
          {
            text: '新圩村',
            value: '#321283103200',
          },
          {
            text: '张拾村',
            value: '#321283103201',
          },
          {
            text: '通靖村',
            value: '#321283103202',
          },
          {
            text: '季圩村',
            value: '#321283103203',
          },
          {
            text: '曹市村',
            value: '#321283103204 ',
          },
          {
            text: '大有村',
            value: '#321283103205',
          },
          {
            text: '顾周村',
            value: '#321283103206',
          },
          {
            text: '木行村',
            value: '#321283103207',
          },
          {
            text: '宁界村',
            value: '#321283103208',
          },
          {
            text: '禅师村',
            value: '#321283103209',
          },
          {
            text: '龙王村',
            value: '#321283103210',
          },
          {
            text: '北肖村',
            value: '#321283103211',
          },
          {
            text: '马庄村',
            value: '#321283103212',
          },
          {
            text: '联吴村',
            value: '#321283103214',
          },
          {
            text: '联匡村',
            value: '#321283103215',
          },
          {
            text: '广陵居委会',
            value: '#321283103001',
          },
          {
            text: '兴宁居委会',
            value: '#321283103002',
          },
        ],
      },
      {
        text: '古溪镇',
        value: '#321283106000',
        children: [
          {
            text: '皂桥村',
            value: '#321283106202',
          },
          {
            text: '东雁岭村',
            value: '#321283106209',
          },
          {
            text: '西雁岭村',
            value: '#321283106210',
          },
          {
            text: '刁网村',
            value: '#321283106211',
          },
          {
            text: '野芹村',
            value: '#321283106212',
          },
          {
            text: '钱荡村',
            value: '#321283106213',
          },
          {
            text: '谢荡村',
            value: '#321283106214',
          },
          {
            text: '塘湾村',
            value: '#321283106215',
          },
          {
            text: '周庄村',
            value: '#321283106201',
          },
          {
            text: '尹垛村',
            value: '#321283106204',
          },
          {
            text: '顾庄村',
            value: '#321283106205',
          },
          {
            text: '常桥村',
            value: '#321283106206',
          },
          {
            text: '古溪居委会',
            value: '#321283106003',
          },
          {
            text: '横垛居委会',
            value: '#321283106002',
          },
        ],
      },
      {
        text: '元竹镇',
        value: '#321283107000',
        children: [
          {
            text: '丁庄村',
            value: '#321283107200',
          },
          {
            text: '兴杨村',
            value: '#321283107201',
          },
          {
            text: '蒋堡村',
            value: '#321283107202',
          },
          {
            text: '申庄村',
            value: '#321283107203',
          },
          {
            text: '潘元村',
            value: '#321283107204',
          },
          {
            text: '成庄村',
            value: '#321283107205',
          },
          {
            text: '野叶村',
            value: '#321283107206',
          },
          {
            text: '芮徐村',
            value: '#321283107207',
          },
          {
            text: '沿泰村',
            value: '#321283107208',
          },
          {
            text: '镇北村',
            value: '#321283107209',
          },
          {
            text: '大元居委会',
            value: '#321283107001',
          },
          {
            text: '双赵居委会',
            value: '#321283107002',
          },
        ],
      },
      {
        text: '张桥镇',
        value: '#321283108000',
        children: [
          {
            text: '汤庄村',
            value: '#321283108201',
          },
          {
            text: '匡庄村',
            value: '#321283108202',
          },
          {
            text: '常巷村',
            value: '#321283108203',
          },
          {
            text: '陈庄村',
            value: '#321283108204',
          },
          {
            text: '镇西村',
            value: '#321283108205',
          },
          {
            text: '吴榨村',
            value: '#321283108206',
          },
          {
            text: '西桥村',
            value: '#321283108207',
          },
          {
            text: '东联村',
            value: '#321283108208',
          },
          {
            text: '杨庄村',
            value: '#321283108210',
          },
          {
            text: '薛庄村',
            value: '#321283108211',
          },
          {
            text: '郭桥村',
            value: '#321283108212',
          },
          {
            text: '克仁村',
            value: '#321283108213',
          },
          {
            text: '刘井村',
            value: '#321283108214',
          },
          {
            text: '圩港村',
            value: '#321283108216',
          },
          {
            text: '褚陈村',
            value: '#321283108217',
          },
          {
            text: '焦堡居委会',
            value: '#321283108001',
          },
          {
            text: '焦荡居委会',
            value: '#321283108002',
          },
          {
            text: '张桥居委会',
            value: '#321283108003',
          },
        ],
      },
      {
        text: '曲霞镇',
        value: '#321283109000',
        children: [
          {
            text: '印达村',
            value: '#321283109201',
          },
          {
            text: '戴窑村',
            value: '#321283109202',
          },
          {
            text: '安乐村',
            value: '#321283109203',
          },
          {
            text: '肖榨村',
            value: '#321283109205',
          },
          {
            text: '李圩村',
            value: '#321283109206',
          },
          {
            text: '朱圩村',
            value: '#321283109207',
          },
          {
            text: '镇西村',
            value: '#321283109204',
          },
          {
            text: '丁桥村',
            value: '#321283109209',
          },
          {
            text: '曲霞居委会',
            value: '#321283109001',
          },
        ],
      },
      {
        text: '河失镇',
        value: '#321283110000',
        children: [
          {
            text: '同心村',
            value: '#321283110200',
          },
          {
            text: '元仙村',
            value: '#321283110201',
          },
          {
            text: '司马村',
            value: '#321283110203',
          },
          {
            text: '洋碾村',
            value: '#321283110204',
          },
          {
            text: '沈丁村',
            value: '#321283110205',
          },
          {
            text: '三军村',
            value: '#321283110206',
          },
          {
            text: '西黄村',
            value: '#321283110207',
          },
          {
            text: '夏港村',
            value: '#321283110208',
          },
          {
            text: '刘官村',
            value: '#321283110209',
          },
          {
            text: '刘桥村',
            value: '#321283110210',
          },
          {
            text: '赵杜村',
            value: '#321283110211',
          },
          {
            text: '李湾村',
            value: '#321283110212',
          },
          {
            text: '西荡村',
            value: '#321283110213',
          },
          {
            text: '印荡村',
            value: '#321283110214',
          },
          {
            text: '刘庄村',
            value: '#321283110215',
          },
          {
            text: '印庄村',
            value: '#321283110216',
          },
          {
            text: '常周居委会',
            value: '#321283110001',
          },
          {
            text: '河头居委会',
            value: '#321283110217',
          },
          {
            text: '失迷巷居委会',
            value: '#321283110003',
          },
        ],
      },
      {
        text: '新街镇',
        value: '#321283113000',
        children: [
          {
            text: '南新街村',
            value: '#321283113200',
          },
          {
            text: '杏陆村',
            value: '#321283113201',
          },
          {
            text: '车马庄村',
            value: '#321283113202',
          },
          {
            text: '张吉村',
            value: '#321283113203',
          },
          {
            text: '严家堡村',
            value: '#321283113204',
          },
          {
            text: '野肖村',
            value: '#321283113205',
          },
          {
            text: '管凤村',
            value: '#321283113206',
          },
          {
            text: '顾庄寺村',
            value: '#321283113207',
          },
          {
            text: '梅家庄村',
            value: '#321283113208',
          },
          {
            text: '鞠山村',
            value: '#321283113209',
          },
          {
            text: '白马村',
            value: '#321283113210',
          },
          {
            text: '金干村',
            value: '#321283113211',
          },
          {
            text: '孔叶村',
            value: '#321283113212',
          },
          {
            text: '东河村',
            value: '#321283113213',
          },
          {
            text: '河西村',
            value: '#321283113214',
          },
          {
            text: '东申村',
            value: '#321283113215',
          },
          {
            text: '夏徐村',
            value: '#321283113216',
          },
          {
            text: '杨芮村',
            value: '#321283113217',
          },
          {
            text: '霍庄村',
            value: '#321283113218',
          },
          {
            text: '倪浒村',
            value: '#321283113219',
          },
          {
            text: '钱南村',
            value: '#321283113220',
          },
          {
            text: '新街村',
            value: '#321283113221',
          },
          {
            text: '吴岱村',
            value: '#321283113222',
          },
          {
            text: '梧桐村',
            value: '#321283113223',
          },
          {
            text: '宋福村',
            value: '#321283113224',
          },
          {
            text: '叶利村',
            value: '#321283113225',
          },
          {
            text: '谢荡村',
            value: '#321283113226',
          },
          {
            text: '李荡村',
            value: '#321283113227',
          },
        ],
      },
      {
        text: '姚王街道',
        value: '#321283114000',
        children: [
          {
            text: '十里甸村',
            value: '#321283114200',
          },
          {
            text: '姚垈村',
            value: '#321283114201',
          },
          {
            text: '官沟村',
            value: '#321283114203',
          },
          {
            text: '新星村',
            value: '#321283114204',
          },
          {
            text: '桑木村',
            value: '#321283114206',
          },
          {
            text: '朝阳村',
            value: '#321283114208',
          },
          {
            text: '阡垈村',
            value: '#321283114209',
          },
          {
            text: '夏家垈村',
            value: '#321283114210',
          },
          {
            text: '北殷村',
            value: '#321283114211',
          },
          {
            text: '王庄村',
            value: '#321283114212',
          },
          {
            text: '石桥村',
            value: '#321283114213',
          },
          {
            text: '东林村',
            value: '#321283114214',
          },
          {
            text: '王家堡村',
            value: '#321283114215',
          },
          {
            text: '鲁堡村',
            value: '#321283114216',
          },
          {
            text: '封垈村',
            value: '#321283114217',
          },
          {
            text: '毛庄村',
            value: '#321283114218',
          },
          {
            text: '新镇居委会',
            value: '#321283114001',
          },
          {
            text: '东阳居委会',
            value: '#321283114002',
          },
        ],
      },
      {
        text: '宣堡镇',
        value: '#321283115000',
        children: [
          {
            text: '西宣村',
            value: '#321283115201',
          },
          {
            text: '梅埝村',
            value: '#321283115202',
          },
          {
            text: '崇头庄村',
            value: '#321283115203',
          },
          {
            text: '三堡村',
            value: '#321283115204',
          },
          {
            text: '北森庄村',
            value: '#321283115205',
          },
          {
            text: '郭寨村',
            value: '#321283115206',
          },
          {
            text: '纪沟村',
            value: '#321283115207',
          },
          {
            text: '毛群村',
            value: '#321283115208',
          },
          {
            text: '联新村',
            value: '#321283115210',
          },
          {
            text: '张河村',
            value: '#321283115213',
          },
          {
            text: '银杏村',
            value: '#321283115216',
          },
          {
            text: '宣堡居委会',
            value: '#321283115001',
          },
        ],
      },
      {
        text: '分界镇',
        value: '#321283122000',
        children: [
          {
            text: '张竹村',
            value: '#321283122200',
          },
          {
            text: '分界村',
            value: '#321283122201',
          },
          {
            text: '开绿村',
            value: '#321283122204',
          },
          {
            text: '官庄村',
            value: '#321283122206',
          },
          {
            text: '滕兴村',
            value: '#321283122207',
          },
          {
            text: '南周村',
            value: '#321283122209',
          },
          {
            text: '七贤村',
            value: '#321283122210',
          },
          {
            text: '王厂村',
            value: '#321283122213',
          },
          {
            text: '耿厂村',
            value: '#321283122214',
          },
          {
            text: '湖头村',
            value: '#321283122216',
          },
          {
            text: '沿界村',
            value: '#321283122202',
          },
          {
            text: '赵庄村',
            value: '#321283122211',
          },
          {
            text: '野庙村',
            value: '#321283122212',
          },
          {
            text: '长生居委会',
            value: '#321283122002',
          },
        ],
      },
      {
        text: '滨江镇',
        value: '#321283123000',
        children: [
          {
            text: '褚港村',
            value: '#321283123211',
          },
          {
            text: '龙港村',
            value: '#321283123212',
          },
          {
            text: '蒋港村',
            value: '#321283123213',
          },
          {
            text: '仁寿村',
            value: '#321283123214',
          },
          {
            text: '过船村',
            value: '#321283123215',
          },
          {
            text: '长沟村',
            value: '#321283123216',
          },
          {
            text: '石桥村',
            value: '#321283123217',
          },
          {
            text: '殷石村',
            value: '#321283123218',
          },
          {
            text: '中港村',
            value: '#321283123219',
          },
          {
            text: '卢碾村',
            value: '#321283123207',
          },
          {
            text: '翻身村',
            value: '#321283123208',
          },
          {
            text: '天星村',
            value: '#321283123209',
          },
          {
            text: '新星村',
            value: '#321283123206',
          },
          {
            text: '红旗村',
            value: '#321283123205',
          },
          {
            text: '蒋榨村',
            value: '#321283123210',
          },
          {
            text: '洋思村',
            value: '#321283123220',
          },
          {
            text: '五杨村',
            value: '#321283123221',
          },
          {
            text: '三联村',
            value: '#321283123225',
          },
          {
            text: '马甸村',
            value: '#321283123226',
          },
          {
            text: '中兴村',
            value: '#321283123227',
          },
          {
            text: '大马庄村',
            value: '#321283123228',
          },
          {
            text: '小马庄村',
            value: '#321283123229',
          },
          {
            text: '苏坔村',
            value: '#321283123230',
          },
          {
            text: '苏余村',
            value: '#321283123231',
          },
          {
            text: '大何庄村',
            value: '#321283123232',
          },
          {
            text: '西江村',
            value: '#321283123233',
          },
          {
            text: '双彭村',
            value: '#321283123234',
          },
          {
            text: '顾阚村',
            value: '#321283123235',
          },
          {
            text: '联杨村',
            value: '#321283123236',
          },
          {
            text: '永新村',
            value: '#321283123237',
          },
          {
            text: '蔡桥村',
            value: '#321283123238',
          },
          {
            text: '印桥居委会',
            value: '#321283123002',
          },
        ],
      },
      {
        text: '虹桥镇',
        value: '#321283124000',
        children: [
          {
            text: '蒋华村',
            value: '#321283124200',
          },
          {
            text: '同德村',
            value: '#321283124201',
          },
          {
            text: '广福村',
            value: '#321283124202',
          },
          {
            text: '三桥村',
            value: '#321283124203',
          },
          {
            text: '六圩村',
            value: '#321283124204',
          },
          {
            text: '宋桥村',
            value: '#321283124205',
          },
          {
            text: '清水村',
            value: '#321283124206',
          },
          {
            text: '上元村',
            value: '#321283124207',
          },
          {
            text: '新市村',
            value: '#321283124208',
          },
          {
            text: '毗芦村',
            value: '#321283124209',
          },
          {
            text: '张公村',
            value: '#321283124210',
          },
          {
            text: '季桥村',
            value: '#321283124211',
          },
          {
            text: '通石村',
            value: '#321283124212',
          },
          {
            text: '封祝村',
            value: '#321283124213',
          },
          {
            text: '唐港村',
            value: '#321283124214',
          },
          {
            text: '崇福村',
            value: '#321283124215',
          },
          {
            text: '七圩村',
            value: '#321283124216',
          },
          {
            text: '八圩村',
            value: '#321283124217',
          },
          {
            text: '九圩村',
            value: '#321283124218',
          },
          {
            text: '高圩村',
            value: '#321283124219',
          },
          {
            text: '四仙村',
            value: '#321283124220',
          },
          {
            text: '公殿村',
            value: '#321283124221',
          },
          {
            text: '桃园村',
            value: '#321283124222',
          },
          {
            text: '涌兴村',
            value: '#321283124223',
          },
          {
            text: '祥福居委会',
            value: '#321283124003',
          },
        ],
      },
      {
        text: '根思乡',
        value: '#321283201000',
        children: [
          {
            text: '根思村',
            value: '#321283201200',
          },
          {
            text: '李秀河村',
            value: '#321283201201',
          },
          {
            text: '南湖村',
            value: '#321283201203',
          },
          {
            text: '井坔村',
            value: '#321283201215',
          },
          {
            text: '老叶村',
            value: '#321283201211',
          },
          {
            text: '鞠顾村',
            value: '#321283201213',
          },
          {
            text: '新港村',
            value: '#321283201205',
          },
          {
            text: '兴许村',
            value: '#321283201207',
          },
          {
            text: '双联村',
            value: '#321283201214',
          },
          {
            text: '双港村',
            value: '#321283201209',
          },
        ],
      },
    ],
  },
  {
    text: '海陵区',
    value: '#321202000000',
    children: [
      {
        text: '城东街道',
        value: '#321202001000',
        children: [
          {
            text: '安居社区居委会',
            value: '#321202002001',
          },
          // ,{
          // 	text:
          // 	value:
          // }
        ],
      },
    ],
  },
  {
    text: '高港区',
    value: '#321203000000',
  },
  {
    text: '姜堰区',
    value: '#321204000000',
  },
  {
    text: '医药高新区',
    value: '#321290000000',
  },
  {
    text: '靖江市',
    value: '#321282000000',
  },
  {
    text: '兴化市',
    value: '#321281000000',
  },
]
// export function square(x) {
//     return x * x;
// }

let qh = [
  {
    c: [
      {
        a: [
          '碧桂园社区居委会#321202001002',
          '东安社区居委会#321202001004',
          '东康社区居委会#321202001005',
          '老东河社区居委会#321202001014',
          '东风社区居委会#321202001016',
          '迎春社区居委会#321202001017',
          '春兰社区居委会#321202001018',
          '宫涵社区居委会#321202001019',
          '春晖社区居委会#321202001020',
          '东城社区居委会#321202001021',
          '鲍坝社区居委会#321202001022',
          '斜桥社区居委会#321202001023',
          '智堡社区居委会#321202001024',
          '育才社区居委会#321202001025',
          '梧桐社区居委会#321202001026',
          '花园村委会#321202001204',
          '丁冯村委会#321202001205',
          '唐甸村委会#321202001207',
          '孙金村委会#321202001208',
          '魏徐村委会#321202001209',
          '窑头村委会#321202001210',
          '朱东村委会#321202001211',
          '城东街道本级#321202001999',
        ],
        n: '城东街道#321202001000',
      },
      {
        a: [
          '安居社区居委会#321202002001',
          '江洲社区居委会#321202002002',
          '海光社区居委会#321202002003',
          '西仓社区居委会#321202002004',
          '景光社区居委会#321202002005',
          '海阳社区居委会#321202002006',
          '林机社区居委会#321202002008',
          '闸南社区居委会#321202002009',
          '森南社区居委会#321202002011',
          '招贤社区居委会#321202002012',
          '运河社区居委会#321202002013',
          '兴业社区居委会#321202002014',
          '麒麟社区居委会#321202002015',
          '森北社区居委会#321202002016',
          '森森社区居委会#321202002017',
          '唐楼社区居委会#321202002018',
          '任景社区居委会#321202002019',
          '九里社区居委会#321202002020',
          '头营社区居委会#321202002021',
          '渔行水村社区居委会#321202002022',
          '九龙社区居委会#321202002023',
          '引东社区居委会#321202002024',
          '韵梅社区居委会#321202002025',
          '朱庄村委会#321202002201',
          '城西街道本级#321202002999',
        ],
        n: '城西街道#321202002000',
      },
      {
        a: [
          '宝带社区居委会#321202003001',
          '沁莲社区居委会#321202003002',
          '济川社区居委会#321202003003',
          '凤凰社区居委会#321202003004',
          '滨江社区居委会#321202003005',
          '莲花社区居委会#321202003006',
          '锦绣社区居委会#321202003007',
          '梅兰社区居委会#321202003008',
          '鑫龙社区居委会#321202003009',
          '新高桥社区居委会#321202003010',
          '新胜社区居委会#321202003011',
          '新莲花社区居委会#321202003012',
          '忠南社区居委会#321202003013',
          '美好社区居委会#321202003014',
          '学院社区居委会#321202003015',
          '城南街道本级#321202003999',
        ],
        n: '城南街道#321202003000',
      },
      {
        a: [
          '税务社区居委会#321202004002',
          '高桥社区居委会#321202004003',
          '中山社区居委会#321202004005',
          '钟楼社区居委会#321202004006',
          '周桥社区居委会#321202004007',
          '南山社区居委会#321202004008',
          '八字社区居委会#321202004009',
          '文昌社区居委会#321202004010',
          '泰山社区居委会#321202004011',
          '书院社区居委会#321202004012',
          '方洲社区居委会#321202004013',
          '南浦社区居委会#321202004014',
          '洧水社区居委会#321202004015',
          '城中街道本级#321202004999',
        ],
        n: '城中街道#321202004000',
      },
      {
        a: [
          '通姜社区居委会#321202005001',
          '演化社区居委会#321202005002',
          '北山社区居委会#321202005003',
          '东街社区居委会#321202005004',
          '花园社区居委会#321202005005',
          '赵公社区居委会#321202005006',
          '稻河社区居委会#321202005007',
          '彩衣社区居委会#321202005009',
          '西浦社区居委会#321202005011',
          '工人社区居委会#321202005012',
          '大浦社区居委会#321202005013',
          '渔行社区居委会#321202005014',
          '城北街道本级#321202005999',
        ],
        n: '城北街道#321202005000',
      },
      {
        a: [
          '东唐社区居委会#321202007001',
          '北马社区居委会#321202007002',
          '十里铺社区居委会#321202007003',
          '响林社区居委会#321202007004',
          '泰和社区居委会#321202007005',
          '许郑社区居委会#321202007006',
          '林南社区居委会#321202007007',
          '孙唐社区居委会#321202007008',
          '凌窦社区居委会#321202007009',
          '双墩社区居委会#321202007010',
          '新周桥社区居委会#321202007011',
          '朱塘社区居委会#321202007012',
          '金东社区居委会#321202007013',
          '润泰社区居委会#321202007014',
          '泰顺社区居委会#321202007015',
          '春景社区居委会#321202007016',
          '泰安社区居委会#321202007017',
          '泰康社区居委会#321202007018',
          '京泰路街道本级#321202007999',
        ],
        n: '京泰路街道#321202007000',
      },
      {
        a: [
          '府前社区居委会#321202100001',
          '振东社区居委会#321202100002',
          '张坝社区居委会#321202100003',
          '姚家社区居委会#321202100004',
          '龙江社区居委会#321202100005',
          '雨声村委会#321202100202',
          '界沟村委会#321202100207',
          '五厦村委会#321202100208',
          '九龙镇本级#321202100999',
        ],
        n: '九龙镇#321202100000',
      },
      {
        a: [
          '杨庄社区居委会#321202102001',
          '冯官社区居委会#321202102002',
          '夏庄村委会#321202102200',
          '西冯村委会#321202102201',
          '东楼村委会#321202102202',
          '罡门村委会#321202102204',
          '纯垛村委会#321202102205',
          '罡杨镇本级#321202102999',
        ],
        n: '罡杨镇#321202102000',
      },
      {
        a: [
          '苏陈社区居委会#321202103001',
          '镇东社区居委会#321202103002',
          '夏郑社区居委会#321202103003',
          '张家院社区居委会#321202103004',
          '百里社区居委会#321202103005',
          '夏棋社区居委会#321202103006',
          '双岸社区居委会#321202103007',
          '东石羊社区居委会#321202103008',
          '西石羊社区居委会#321202103009',
          '茶庵社区居委会#321202103010',
          '大冯甸村委会#321202103212',
          '双虹村委会#321202103217',
          '徐家庄村委会#321202103220',
          '北庄村委会#321202103221',
          '院庄村委会#321202103224',
          '前窦村委会#321202103225',
          '周埭村委会#321202103226',
          '苏陈镇本级#321202103999',
        ],
        n: '苏陈镇#321202103000',
      },
      {
        a: [
          '华港社区居委会#321202104002',
          '桑湾村委会#321202104202',
          '溪西村委会#321202104203',
          '下溪村委会#321202104204',
          '徐家垛村委会#321202104206',
          '野马村委会#321202104207',
          '许家庄村委会#321202104208',
          '双烈村委会#321202104209',
          '野营村委会#321202104213',
          '刘庄村委会#321202104214',
          '溪东村委会#321202104215',
          '里华村委会#321202104218',
          '港口村委会#321202104219',
          '李家庄村委会#321202104220',
          '华港镇本级#321202104999',
        ],
        n: '华港镇#321202104000',
      },
      {
        a: [],
        n: '海陵区本级#321202999000',
      },
      {
        a: [
          '红旗社区居委会#321290004001',
          '中菱社区居委会#321290004002',
          '南舍社区居委会#321290004003',
          '红旗街道本级#321290004999',
        ],
        n: '红旗街道#321290004000',
      },
    ],
    n: '海陵区#321202000000',
  },
  {
    c: [
      {
        a: [
          '引江社区居委会#321203001001',
          '新明社区居委会#321203001002',
          '东南社区居委会#321203001003',
          '育才社区居委会#321203001004',
          '田河社区居委会#321203001005',
          '集成社区居委会#321203001006',
          '戴集社区居委会#321203001007',
          '城东社区居委会#321203001008',
          '城南社区居委会#321203001009',
          '王营社区居委会#321203001010',
          '口岸社区居委会#321203001011',
          '蔡滩社区居委会#321203001012',
          '柴墟社区居委会#321203001013',
          '新城社区居委会#321203001014',
          '龙窝口社区居委会#321203001015',
          '张马社区居委会#321203001016',
          '朱营社区居委会#321203001017',
          '大石村委会#321203001207',
          '徐桥村委会#321203001208',
          '郎庄村委会#321203001209',
          '雅儒村委会#321203001210',
          '吴楼村委会#321203001211',
          '徐庄村委会#321203001214',
          '口岸街道本级#321203001999',
        ],
        n: '口岸街道#321203001000',
      },
      {
        a: [
          '通泰社区居委会#321203002001',
          '关桥社区居委会#321203002002',
          '环溪社区居委会#321203002003',
          '万庄社区居委会#321203002004',
          '大丰社区居委会#321203002005',
          '界牌社区居委会#321203002006',
          '圩岸社区居委会#321203002007',
          '明发社区居委会#321203002008',
          '刁铺街道本级#321203002999',
        ],
        n: '刁铺街道#321203002000',
      },
      {
        a: [
          '马厂社区居委会#321203003001',
          '三星社区居委会#321203003002',
          '许庄社区居委会#321203003003',
          '官沟社区居委会#321203003004',
          '曹官营社区居委会#321203003005',
          '三旗营社区居委会#321203003006',
          '周梓社区居委会#321203003007',
          '乔杨社区居委会#321203003008',
          '孔桥社区居委会#321203003009',
          '赵王社区居委会#321203003010',
          '明河村委会#321203003209',
          '钱赵村委会#321203003210',
          '管营村委会#321203003211',
          '蔡庄村委会#321203003213',
          '许庄街道本级#321203003999',
        ],
        n: '许庄街道#321203003000',
      },
      {
        a: [
          '兴洲社区居委会#321203102001',
          '福沙社区居委会#321203102002',
          '新街社区居委会#321203102003',
          '永兴社区居委会#321203102004',
          '兴隆社区居委会#321203102005',
          '建安社区居委会#321203102006',
          '永胜社区居委会#321203102007',
          '上桥社区居委会#321203102008',
          '中心社区居委会#321203102009',
          '东江社区居委会#321203102010',
          '润洲社区居委会#321203102011',
          '永安洲镇本级#321203102999',
        ],
        n: '永安洲镇#321203102000',
      },
      {
        a: [
          '金马社区居委会#321203103001',
          '白马社区居委会#321203103002',
          '陈家村委会#321203103200',
          '陆家村委会#321203103201',
          '岱白村委会#321203103202',
          '黄河村委会#321203103203',
          '前进村委会#321203103204',
          '白马镇本级#321203103999',
        ],
        n: '白马镇#321203103000',
      },
      {
        a: [
          '大泗社区居委会#321203105001',
          '时庄村委会#321203105201',
          '康乐村委会#321203105202',
          '马龙村委会#321203105203',
          '霍堡村委会#321203105204',
          '大马村委会#321203105205',
          '北港村委会#321203105206',
          '二陈村委会#321203105207',
          '曹于村委会#321203105208',
          '前进村委会#321203105209',
          '佴陈村委会#321203105210',
          '佴庄村委会#321203105211',
          '杨营村委会#321203105212',
          '大泗镇本级#321203105999',
        ],
        n: '大泗镇#321203105000',
      },
      {
        a: [
          '胡庄社区居委会#321203106001',
          '汪群社区居委会#321203106002',
          '赵市村委会#321203106200',
          '薛垛村委会#321203106201',
          '戴陈村委会#321203106202',
          '刘荡村委会#321203106203',
          '单王村委会#321203106204',
          '刘元村委会#321203106205',
          '史庄村委会#321203106207',
          '庵桥村委会#321203106208',
          '周马村委会#321203106210',
          '宗林村委会#321203106211',
          '田野村委会#321203106212',
          '丁庄村委会#321203106213',
          '陈隆村委会#321203106215',
          '胡庄镇本级#321203106999',
        ],
        n: '胡庄镇#321203106000',
      },
      {
        a: [],
        n: '高港区本级#321203999000',
      },
    ],
    n: '高港区#321203000000',
  },
  {
    c: [
      {
        a: [
          '桃园社区居委会#321204001001',
          '古田社区居委会#321204001002',
          '太平社区居委会#321204001003',
          '南苑社区居委会#321204001004',
          '荷叶社区居委会#321204001005',
          '河南社区居委会#321204001006',
          '新城社区居委会#321204001007',
          '叶舍社区居委会#321204001010',
          '罗塘社区居委会#321204001011',
          '老庄社区居委会#321204001012',
          '东街社区居委会#321204001017',
          '西街社区居委会#321204001018',
          '南街社区居委会#321204001019',
          '北街社区居委会#321204001020',
          '高陈社区居委会#321204001021',
          '彭垛社区居委会#321204001022',
          '中天社区居委会#321204001023',
          '振宇社区居委会#321204001024',
          '怡园社区居委会#321204001025',
          '汤河社区居委会#321204001026',
          '福田社区居委会#321204001027',
          '紫石社区居委会#321204001028',
          '西岭社区居委会#321204001033',
          '金河社区居委会#321204001034',
          '西桥社区居委会#321204001035',
          '曹家社区居委会#321204001036',
          '时园社区居委会#321204001037',
          '东桥社区居委会#321204001038',
          '三园社区居委会#321204001039',
          '太宇社区居委会#321204001040',
          '唐园社区居委会#321204001041',
          '幸福社区居委会#321204001042',
          '沿河社区居委会#321204001043',
          '殷家社区居委会#321204001044',
          '银穆社区#321204001210',
          '院子社区#321204001211',
          '新九社区#321204001224',
          '王石社区#321204001225',
          '前舍社区#321204001226',
          '林野社区#321204001227',
          '罗塘街道本级#321204001999',
        ],
        n: '罗塘街道#321204001000',
      },
      {
        a: [
          '葛联社区#321204003200',
          '桥黄社区#321204003201',
          '张埭社区#321204003202',
          '双墩社区#321204003203',
          '梁徐社区#321204003205',
          '周埭社区#321204003206',
          '江村社区#321204003207',
          '坡岭社区#321204003208',
          '刑家社区#321204003209',
          '岭家社区#321204003210',
          '三林社区#321204003211',
          '东官社区#321204003212',
          '二塘社区#321204003213',
          '官野社区#321204003218',
          '前时社区#321204003219',
          '钱港社区#321204003220',
          '梁徐街道本级#321204003999',
        ],
        n: '梁徐街道#321204003000',
      },
      {
        a: [
          '河西社区居委会#321204004001',
          '光明社区居委会#321204004002',
          '康华社区居委会#321204004003',
          '振兴社区居委会#321204004004',
          '河东社区居委会#321204004005',
          '锦都社区居委会#321204004006',
          '锦园社区居委会#321204004007',
          '天目社区居委会#321204004008',
          '通前社区居委会#321204004009',
          '前堡社区#321204004200',
          '城中社区#321204004201',
          '朱云社区#321204004202',
          '城东社区#321204004203',
          '通扬社区#321204004204',
          '山水社区#321204004205',
          '公园社区#321204004206',
          '工联社区#321204004207',
          '官庄社区#321204004208',
          '后堡社区#321204004209',
          '万众社区#321204004210',
          '单塘社区#321204004211',
          '天民社区#321204004212',
          '天目山街道本级#321204004999',
        ],
        n: '天目山街道#321204004000',
      },
      {
        a: [
          '陈庄社区居委会#321204005001',
          '姜陈社区居委会#321204005002',
          '金马社区居委会#321204005003',
          '马厂社区居委会#321204005004',
          '锦联社区居委会#321204005005',
          '新陈社区居委会#321204005006',
          '新河社区居委会#321204005007',
          '石黄社区居委会#321204005008',
          '前马社区居委会#321204005009',
          '双寿社区居委会#321204005010',
          '城西社区居委会#321204005011',
          '陆庄社区居委会#321204005012',
          '西陆社区居委会#321204005013',
          '南石社区居委会#321204005014',
          '西查社区#321204005210',
          '东查社区#321204005211',
          '唐宁社区#321204005212',
          '军铺社区#321204005213',
          '小冯甸社区#321204005215',
          '杏林社区#321204005216',
          '新南社区#321204005217',
          '小杨社区#321204005218',
          '大杨社区#321204005219',
          '桥头社区#321204005220',
          '李堡社区#321204005221',
          '杨院社区#321204005222',
          '三沙社区#321204005223',
          '状元社区#321204005224',
          '三水街道本级#321204005999',
        ],
        n: '三水街道#321204005000',
      },
      {
        a: [
          '镇北社区居委会#321204100002',
          '邱刘村委会#321204100200',
          '六港村委会#321204100201',
          '蒋北村委会#321204100202',
          '高曹新村委会#321204100203',
          '孟莲村委会#321204100204',
          '许桥村委会#321204100205',
          '朱高村委会#321204100206',
          '薛港村委会#321204100207',
          '许庄村委会#321204100208',
          '仲院村委会#321204100209',
          '蒋垛村委会#321204100210',
          '溪河村委会#321204100211',
          '南港村委会#321204100212',
          '盐大村委会#321204100213',
          '界河村委会#321204100214',
          '兴港村委会#321204100215',
          '新桥村委会#321204100216',
          '蒋垛镇本级#321204100999',
        ],
        n: '蒋垛镇#321204100000',
      },
      {
        a: [
          '娄东村委会#321204101200',
          '马赛村委会#321204101202',
          '朱翟村委会#321204101203',
          '先进村委会#321204101204',
          '团结村委会#321204101205',
          '新龙村委会#321204101206',
          '东阳村委会#321204101207',
          '兴胜村委会#321204101208',
          '袁联村委会#321204101209',
          '三联村委会#321204101210',
          '红庙村委会#321204101211',
          '连心村委会#321204101212',
          '放牛村委会#321204101213',
          '洪林村委会#321204101214',
          '杨李村委会#321204101215',
          '娄庄村委会#321204101217',
          '娄庄镇本级#321204101999',
        ],
        n: '娄庄镇#321204101000',
      },
      {
        a: [
          '昌桥村委会#321204102201',
          '甸河村委会#321204102202',
          '白米村委会#321204102203',
          '纪林村委会#321204102204',
          '吴堡村委会#321204102205',
          '曹新村委会#321204102206',
          '马沟村委会#321204102207',
          '杭家铺村委会#321204102208',
          '新华村委会#321204102209',
          '孔庄村委会#321204102210',
          '蛙庄村委会#321204102211',
          '野沐村委会#321204102212',
          '孙舍村委会#321204102213',
          '和平村委会#321204102214',
          '大安村委会#321204102215',
          '碱场村委会#321204102216',
          '拜官村委会#321204102217',
          '白米镇本级#321204102999',
        ],
        n: '白米镇#321204102000',
      },
      {
        a: [
          '忘私村委会#321204103202',
          '房庄村委会#321204103203',
          '官伦村委会#321204103204',
          '角墩村委会#321204103205',
          '姜茅村委会#321204103206',
          '柳官村委会#321204103207',
          '叶甸村委会#321204103208',
          '南野村委会#321204103209',
          '薛陈村委会#321204103212',
          '花庄村委会#321204103213',
          '春草村委会#321204103215',
          '许庄村委会#321204103216',
          '横庄村委会#321204103217',
          '俞耿村委会#321204103218',
          '仓场村委会#321204103219',
          '何祝野村委会#321204103220',
          '俞垛镇本级#321204103999',
        ],
        n: '俞垛镇#321204103000',
      },
      {
        a: [
          '大伦村委会#321204105200',
          '麻墩村委会#321204105201',
          '响堂村委会#321204105202',
          '茆戚村委会#321204105203',
          '申扬村委会#321204105204',
          '塔子村委会#321204105205',
          '缪埭村委会#321204105206',
          '桥东村委会#321204105207',
          '朱宣村委会#321204105208',
          '太平村委会#321204105209',
          '顾野村委会#321204105210',
          '东徐村委会#321204105212',
          '兴驰村委会#321204105213',
          '土山村委会#321204105215',
          '运粮村委会#321204105216',
          '大伦镇本级#321204105999',
        ],
        n: '大伦镇#321204105000',
      },
      {
        a: [
          '顾高村委会#321204107200',
          '夏庄村委会#321204107201',
          '芦庄村委会#321204107202',
          '塘桥村委会#321204107203',
          '翟庄村委会#321204107204',
          '野庄村委会#321204107205',
          '千佛村委会#321204107206',
          '张庄村委会#321204107209',
          '西芦村委会#321204107210',
          '申俞村委会#321204107211',
          '顾高镇本级#321204107999',
        ],
        n: '顾高镇#321204107000',
      },
      {
        a: [
          '兴甸社区居委会#321204109001',
          '杨港村委会#321204109201',
          '魏家村委会#321204109203',
          '张前村委会#321204109205',
          '三彭村委会#321204109207',
          '花彭村委会#321204109208',
          '三野村委会#321204109210',
          '尹庄村委会#321204109217',
          '三陈村委会#321204109218',
          '宫王村委会#321204109220',
          '蔡官村委会#321204109221',
          '梅网村委会#321204109222',
          '沙梓村委会#321204109225',
          '朱顾村委会#321204109226',
          '大李村委会#321204109231',
          '三兴村委会#321204109232',
          '三盟村委会#321204109233',
          '张甸村委会#321204109235',
          '梅垛村委会#321204109236',
          '高单庄村委会#321204109237',
          '周窑村委会#321204109238',
          '葛徐村委会#321204109239',
          '华杨村委会#321204109240',
          '甸桥村委会#321204109241',
          '丁高村委会#321204109242',
          '严唐村委会#321204109243',
          '河垛村委会#321204109244',
          '张甸镇本级#321204109999',
        ],
        n: '张甸镇#321204109000',
      },
      {
        a: [
          '武庄村委会#321204113200',
          '卞庄村委会#321204113201',
          '杨庄村委会#321204113203',
          '靳潭村委会#321204113204',
          '三垛村委会#321204113208',
          '周庄村委会#321204113212',
          '马庄村委会#321204113215',
          '淤溪村委会#321204113216',
          '孙吉村委会#321204113217',
          '潘甸村委会#321204113218',
          '新桥村委会#321204113219',
          '淤溪镇本级#321204113999',
        ],
        n: '淤溪镇#321204113000',
      },
      {
        a: [
          '城南社区居委会#321204114001',
          '城北社区居委会#321204114002',
          '湖西社区居委会#321204114003',
          '渔花池社区居委会#321204114004',
          '薛何村委会#321204114200',
          '孙楼村委会#321204114201',
          '甸址村委会#321204114202',
          '三里泽村委会#321204114203',
          '沙垛村委会#321204114204',
          '尤庄村委会#321204114205',
          '西陈村委会#321204114206',
          '苏庄村委会#321204114207',
          '洲城村委会#321204114208',
          '洲南村委会#321204114209',
          '湖南村委会#321204114210',
          '读书址村委会#321204114211',
          '龙港村委会#321204114212',
          '溱东村委会#321204114213',
          '湖北村委会#321204114214',
          '溱潼镇本级#321204114999',
          '夹河村委会#321204110201',
          '夏北社区#321204110202',
          '沈高村委会#321204110203',
          '双星村委会#321204110205',
          '华杨村委会#321204110206',
          '冯庄村委会#321204110211',
          '联盟村委会#321204110212',
          '河横村委会#321204110215',
          '夏朱村委会#321204110216',
          '沈高镇本级#321204110999',
        ],
        n: '溱潼镇#321204115000',
      },
      {
        a: [],
        n: '姜堰区本级#321204999000',
      },
      {
        a: [
          '社会福利院#321284998001',
          '救助站#321284998002',
          '溱湖医院#321284998003',
        ],
        n: '民政局直属单位#321284998000',
      },
    ],
    n: '姜堰区#321204000000',
  },
  {
    c: [
      {
        a: [
          '水关社区居委会#321281001001',
          '迎丰社区居委会#321281001002',
          '长安社区居委会#321281001003',
          '文峰社区居委会#321281001004',
          '景范社区居委会#321281001005',
          '儒学社区居委会#321281001006',
          '沧浪社区居委会#321281001007',
          '文林社区居委会#321281001008',
          '英武社区居委会#321281001009',
          '新阳社区居委会#321281001013',
          '新义社区居委会#321281001014',
          '五岳社区居委会#321281001015',
          '牌楼社区居委会#321281001017',
          '南沧社区居委会#321281001019',
          '西霞社区居委会#321281001020',
          '海池社区居委会#321281001022',
          '五岳村委会#321281001200',
          '沙甸村委会#321281001201',
          '严家村委会#321281001209',
          '城北村委会#321281001210',
          '新城村委会#321281001211',
          '昭阳街道本级#321281001999',
        ],
        n: '昭阳街道#321281001000',
      },
      {
        a: [
          '十里亭社区居委会#321281002001',
          '施耐庵社区居委会#321281002002',
          '紫荆河社区居委会#321281002003',
          '五里亭社区居委会#321281002004',
          '兴南社区居委会#321281002005',
          '阳山社区居委会#321281002006',
          '南山社区居委会#321281002007',
          '刘陆村委会#321281002200',
          '朱中村委会#321281002202',
          '西浒垛村委会#321281002203',
          '三王村委会#321281002205',
          '新姜村委会#321281002207',
          '陆横村委会#321281002210',
          '任家村委会#321281002211',
          '临东村委会#321281002212',
          '老阁村委会#321281002213',
          '南官村委会#321281002218',
          '龙河村委会#321281002220',
          '花沈村委会#321281002222',
          '曹瓦村委会#321281002224',
          '古砖场村委会#321281002226',
          '安洲村委会#321281002229',
          '双潭村委会#321281002230',
          '赵何村委会#321281002232',
          '董家村委会#321281002233',
          '红星村委会#321281002234',
          '南塘村委会#321281002235',
          '民富村委会#321281002236',
          '北郊村委会#321281002241',
          '西郊村委会#321281002244',
          '临城街道本级#321281002999',
        ],
        n: '临城街道#321281002000',
      },
      {
        a: [
          '金岛社区居委会#321281003001',
          '高家荡村委会#321281003202',
          '平安垛村委会#321281003203',
          '莲溪湖村委会#321281003204',
          '新联合村委会#321281003206',
          '凤凰垛村委会#321281003209',
          '王横村委会#321281003210',
          '得胜村委会#321281003211',
          '新徐庄村委会#321281003213',
          '孔长村委会#321281003214',
          '张皮垛村委会#321281003215',
          '杨荡村委会#321281003216',
          '花园垛村委会#321281003218',
          '申家佃村委会#321281003219',
          '湖西口村委会#321281003220',
          '芦州村委会#321281003221',
          '新钱村委会#321281003222',
          '湖东村委会#321281003224',
          '戴家村委会#321281003225',
          '垛田街道本级#321281003999',
        ],
        n: '垛田街道#321281003000',
      },
      {
        a: [
          '乐吾社区居委会#321281100005',
          '韩窑村委会#321281100200',
          '恒和村委会#321281100202',
          '窑东村委会#321281100203',
          '窑南村委会#321281100204',
          '联葛村委会#321281100205',
          '新花园村委会#321281100206',
          '青凤村委会#321281100207',
          '古牛村委会#321281100208',
          '三合村委会#321281100209',
          '三元西村委会#321281100210',
          '三元东村委会#321281100211',
          '叶堡村委会#321281100212',
          '唐林村委会#321281100213',
          '白港村委会#321281100215',
          '焦勇村委会#321281100217',
          '洪亮村委会#321281100219',
          '东三村委会#321281100220',
          '刘丰村委会#321281100221',
          '舍阳村委会#321281100222',
          '灯塔村委会#321281100224',
          '永杰村委会#321281100227',
          '元友村委会#321281100228',
          '锯家村委会#321281100229',
          '双里村委会#321281100230',
          '果园村委会#321281100231',
          '戴窑镇本级#321281100999',
        ],
        n: '戴窑镇#321281100000',
      },
      {
        a: [
          '民建社区居委会#321281101001',
          '胜利村委会#321281101200',
          '东联合村委会#321281101201',
          '九里港村委会#321281101202',
          '凤存村委会#321281101203',
          '锦贤村委会#321281101204',
          '界牌村委会#321281101205',
          '卜寨村委会#321281101206',
          '娄子村委会#321281101207',
          '朱陈村委会#321281101209',
          '陆谦村委会#321281101210',
          '李秀村委会#321281101212',
          '高桂村委会#321281101214',
          '许港村委会#321281101215',
          '万沈村委会#321281101216',
          '桂山村委会#321281101218',
          '恒进村委会#321281101219',
          '塔港村委会#321281101221',
          '邓桥村委会#321281101222',
          '舍陈村委会#321281101224',
          '幸福村委会#321281101226',
          '合陈镇本级#321281101999',
        ],
        n: '合陈镇#321281101000',
      },
      {
        a: [
          '朱严社区居委会#321281102001',
          '永兴村委会#321281102200',
          '兴港村委会#321281102203',
          '如意村委会#321281102204',
          '苏杨村委会#321281102205',
          '四塔村委会#321281102206',
          '迎新村委会#321281102207',
          '明兴村委会#321281102209',
          '桑富村委会#321281102212',
          '三联村委会#321281102213',
          '永联村委会#321281102214',
          '三星村委会#321281102215',
          '东倪村委会#321281102216',
          '东棒徐村委会#321281102217',
          '四合村委会#321281102218',
          '捷行村委会#321281102220',
          '新熹村委会#321281102221',
          '兴盛村委会#321281102223',
          '徐扬村委会#321281102225',
          '永丰镇本级#321281102999',
        ],
        n: '永丰镇#321281102000',
      },
      {
        a: [
          '新港社区居委会#321281103001',
          '丰乐村委会#321281103200',
          '新城庄村委会#321281103201',
          '港西村委会#321281103203',
          '庙徐村委会#321281103204',
          '曹吉村委会#321281103205',
          '新东村委会#321281103206',
          '施家桥村委会#321281103207',
          '朱彭三庄村委会#321281103209',
          '徐高村委会#321281103210',
          '李施村委会#321281103211',
          '张高村委会#321281103212',
          '新垛镇本级#321281103999',
        ],
        n: '新垛镇#321281103000',
      },
      {
        a: [
          '程关东社区居委会#321281104001',
          '振安社区居委会#321281104006',
          '程关西社区居委会#321281104007',
          '玉带社区居委会#321281104008',
          '振兴社区居委会#321281104009',
          '万耿村委会#321281104200',
          '万刘村委会#321281104201',
          '西南村委会#321281104202',
          '寺万村委会#321281104203',
          '三庄村委会#321281104204',
          '五庄村委会#321281104205',
          '东新合村委会#321281104206',
          '塘港村委会#321281104207',
          '九丰村委会#321281104208',
          '东郊村委会#321281104209',
          '陆宴村委会#321281104210',
          '新北郊村委会#321281104211',
          '富强村委会#321281104213',
          '中圩村委会#321281104215',
          '大杨庄村委会#321281104216',
          '四和村委会#321281104218',
          '沈曹村委会#321281104219',
          '张阳村委会#321281104220',
          '李东村委会#321281104222',
          '朝阳村委会#321281104223',
          '双建村委会#321281104224',
          '同盟村委会#321281104225',
          '下圩村委会#321281104226',
          '洋港村委会#321281104227',
          '刘文村委会#321281104228',
          '联富村委会#321281104229',
          '清洋村委会#321281104231',
          '双联村委会#321281104232',
          '肖家村委会#321281104233',
          '民乐村委会#321281104234',
          '联合村委会#321281104235',
          '韩周村委会#321281104236',
          '双凤村委会#321281104238',
          '钟南村委会#321281104239',
          '安东村委会#321281104240',
          '孙联村委会#321281104241',
          '黎明村委会#321281104242',
          '新元村委会#321281104244',
          '文好村委会#321281104245',
          '钟祁村委会#321281104248',
          '祁戚村委会#321281104249',
          '黄庄村委会#321281104250',
          '安丰镇本级#321281104999',
        ],
        n: '安丰镇#321281104000',
      },
      {
        a: [
          '蔡高社区居委会#321281105001',
          '胡老村委会#321281105202',
          '北蒋村委会#321281105204',
          '新伍村委会#321281105205',
          '莫顾村委会#321281105206',
          '中兴村委会#321281105207',
          '蔡高村委会#321281105208',
          '许唐村委会#321281105209',
          '南蒋村委会#321281105212',
          '东荡村委会#321281105213',
          '西荡村委会#321281105214',
          '金储村委会#321281105215',
          '刘泽村委会#321281105216',
          '苏海村委会#321281105217',
          '海南镇本级#321281105999',
        ],
        n: '海南镇#321281105000',
      },
      {
        a: [
          '钓鱼社区居委会#321281106002',
          '钓鱼村委会#321281106201',
          '胜利村委会#321281106203',
          '北赵村委会#321281106204',
          '吉城村委会#321281106209',
          '南赵村委会#321281106210',
          '南芙蓉村委会#321281106212',
          '中朝村委会#321281106213',
          '八尺沟村委会#321281106215',
          '洋汊村委会#321281106217',
          '北芙蓉村委会#321281106220',
          '檀孙村委会#321281106221',
          '春景村委会#321281106222',
          '园区村委会#321281106223',
          '钓鱼镇本级#321281106999',
        ],
        n: '钓鱼镇#321281106000',
      },
      {
        a: [
          '虹桥社区居委会#321281107001',
          '双溪村委会#321281107200',
          '渭水村委会#321281107201',
          '友谊村委会#321281107203',
          '芦家坝村委会#321281107204',
          '复兴村委会#321281107205',
          '沈五村委会#321281107206',
          '万家村委会#321281107207',
          '新庄村委会#321281107208',
          '吉耿村委会#321281107209',
          '吴家庄村委会#321281107210',
          '兴盐村委会#321281107211',
          '大邹镇本级#321281107999',
        ],
        n: '大邹镇#321281107000',
      },
      {
        a: [
          '沙溪社区居委会#321281108005',
          '兴龙村委会#321281108200',
          '联溪村委会#321281108202',
          '水金村委会#321281108203',
          '董庄村委会#321281108204',
          '光耀村委会#321281108205',
          '高桂村委会#321281108206',
          '石梁村委会#321281108207',
          '沙北村委会#321281108208',
          '官河村委会#321281108209',
          '时堡村委会#321281108210',
          '仲寨南村委会#321281108211',
          '仲寨北村委会#321281108212',
          '三界村委会#321281108213',
          '崔垛新村委会#321281108216',
          '崔垛东村委会#321281108217',
          '斜沟村委会#321281108218',
          '傅堡村委会#321281108219',
          '沙沟镇本级#321281108999',
        ],
        n: '沙沟镇#321281108000',
      },
      {
        a: [
          '中堡社区居委会#321281109001',
          '陆家甸村委会#321281109201',
          '长安庄村委会#321281109203',
          '东荡庄村委会#321281109205',
          '大纵湖村委会#321281109206',
          '中堡村委会#321281109207',
          '龙江村委会#321281109208',
          '戚家村委会#321281109209',
          '东皋村委会#321281109210',
          '朱野村委会#321281109211',
          '沙湾村委会#321281109212',
          '中堡镇本级#321281109999',
        ],
        n: '中堡镇#321281109000',
      },
      {
        a: [
          '永宁社区居委会#321281114001',
          '竹二村委会#321281114200',
          '冯家村委会#321281114201',
          '新泓村委会#321281114202',
          '九港村委会#321281114204',
          '志方村委会#321281114205',
          '舒余村委会#321281114206',
          '解徐王村委会#321281114208',
          '东高魏村委会#321281114209',
          '振南村委会#321281114210',
          '竹一村委会#321281114211',
          '新港村委会#321281114213',
          '北张舍村委会#321281114215',
          '尖沟村委会#321281114216',
          '竹泓镇本级#321281114999',
        ],
        n: '竹泓镇#321281114000',
      },
      {
        a: [
          '沈伦社区居委会#321281115001',
          '沈伦北村委会#321281115200',
          '沈伦南村委会#321281115201',
          '关华夏村委会#321281115202',
          '李默村委会#321281115203',
          '金唐纪村委会#321281115204',
          '繁盛村委会#321281115205',
          '柏九村委会#321281115206',
          '崇禄村委会#321281115208',
          '薛鹏村委会#321281115209',
          '安冒村委会#321281115211',
          '沈伦镇本级#321281115999',
        ],
        n: '沈伦镇#321281115000',
      },
      {
        a: [
          '板桥社区居委会#321281116002',
          '大何村委会#321281116200',
          '娄庄村委会#321281116202',
          '跃进村委会#321281116203',
          '兴联村委会#321281116204',
          '安民村委会#321281116205',
          '从六村委会#321281116206',
          '双石村委会#321281116207',
          '塘港新村委会#321281116208',
          '陈卞村委会#321281116209',
          '盛吴村委会#321281116210',
          '天河村委会#321281116211',
          '管阮村委会#321281116212',
          '阮钟村委会#321281116213',
          '吴杨村委会#321281116215',
          '园区新村委会#321281116216',
          '东刘村委会#321281116217',
          '保宽村委会#321281116221',
          '大陶村委会#321281116222',
          '大垛镇本级#321281116999',
        ],
        n: '大垛镇#321281116000',
      },
      {
        a: [
          '荻垛社区居委会#321281117001',
          '塾墩村委会#321281117200',
          '蒋家村委会#321281117201',
          '富家村委会#321281117202',
          '荻垛村委会#321281117204',
          '润王村委会#321281117205',
          '四联村委会#321281117206',
          '唐港村委会#321281117207',
          '兴陈村委会#321281117209',
          '梓里村委会#321281117210',
          '金石村委会#321281117212',
          '西毛村委会#321281117213',
          '新丰村委会#321281117214',
          '郏周村委会#321281117215',
          '向阳村委会#321281117216',
          '梓幸村委会#321281117219',
          '荻垛镇本级#321281117999',
        ],
        n: '荻垛镇#321281117000',
      },
      {
        a: [
          '陶园社区居委会#321281118001',
          '夏北村委会#321281118200',
          '仲冯舍村委会#321281118201',
          '金戈村委会#321281118202',
          '梓辛村委会#321281118204',
          '陶南村委会#321281118205',
          '大顾村委会#321281118206',
          '幸福新村委会#321281118207',
          '季平村委会#321281118209',
          '三和庄村委会#321281118210',
          '陶庄村委会#321281118211',
          '南柯堡村委会#321281118212',
          '焦庄村委会#321281118213',
          '王寺村委会#321281118215',
          '铁堡村委会#321281118218',
          '陶庄镇本级#321281118999',
        ],
        n: '陶庄镇#321281118000',
      },
      {
        a: [
          '昌荣社区居委会#321281119001',
          '宝宏村委会#321281119202',
          '欣荣村委会#321281119203',
          '唐子村委会#321281119204',
          '陈唐村委会#321281119205',
          '富民村委会#321281119206',
          '双星村委会#321281119207',
          '盐北村委会#321281119208',
          '朝阳新村委会#321281119209',
          '存德村委会#321281119210',
          '安仁村委会#321281119211',
          '昌荣镇本级#321281119999',
        ],
        n: '昌荣镇#321281119000',
      },
      {
        a: [
          '茅山社区居委会#321281120001',
          '姜太村委会#321281120200',
          '茅山村委会#321281120202',
          '纪荀村委会#321281120203',
          '茅山北村委会#321281120204',
          '朝阳庄村委会#321281120205',
          '薛杨村委会#321281120206',
          '孙王村委会#321281120207',
          '顾冯村委会#321281120208',
          '南朱庄村委会#321281120209',
          '茅山镇本级#321281120999',
        ],
        n: '茅山镇#321281120000',
      },
      {
        a: [
          '边城社区居委会#321281121001',
          '周庄社区居委会#321281121002',
          '薛庄村委会#321281121200',
          '邬牛村委会#321281121202',
          '颜吕村委会#321281121203',
          '殷庄村委会#321281121204',
          '周泽村委会#321281121205',
          '东坂伦村委会#321281121206',
          '黄界村委会#321281121207',
          '官庄村委会#321281121209',
          '东浒村委会#321281121211',
          '伍张村委会#321281121212',
          '周北村委会#321281121213',
          '夏泊村委会#321281121214',
          '西浒村委会#321281121217',
          '西坂伦村委会#321281121218',
          '四美村委会#321281121220',
          '周郊村委会#321281121221',
          '边城村委会#321281121222',
          '西边城村委会#321281121223',
          '周庄镇本级#321281121999',
        ],
        n: '周庄镇#321281121000',
      },
      {
        a: [
          '新陈社区居委会#321281122001',
          '陈家堡村委会#321281122201',
          '向沟村委会#321281122202',
          '校果村委会#321281122203',
          '宁乡村委会#321281122204',
          '唐庄村委会#321281122205',
          '蒋庄村委会#321281122206',
          '曹黄村委会#321281122207',
          '武泽村委会#321281122208',
          '四林村委会#321281122209',
          '蔡堡村委会#321281122210',
          '伍康村委会#321281122212',
          '东彭村委会#321281122213',
          '袁家庄村委会#321281122214',
          '里堡村委会#321281122215',
          '高里庄村委会#321281122216',
          '陈堡镇本级#321281122999',
        ],
        n: '陈堡镇#321281122000',
      },
      {
        a: [
          '顾中社区居委会#321281123002',
          '护国社区居委会#321281123004',
          '人民社区居委会#321281123005',
          '中迎村委会#321281123200',
          '戴泽村委会#321281123201',
          '永丰村委会#321281123202',
          '南朱村委会#321281123203',
          '东陈村委会#321281123204',
          '罗顾村委会#321281123205',
          '裴马村委会#321281123206',
          '双沐村委会#321281123207',
          '史堡村委会#321281123208',
          '雁伦村委会#321281123209',
          '北姜村委会#321281123210',
          '陈祁村委会#321281123211',
          '孙堡村委会#321281123212',
          '石万村委会#321281123213',
          '北孙村委会#321281123214',
          '丁吉村委会#321281123215',
          '顾庄村委会#321281123216',
          '光孝村委会#321281123217',
          '帅垛村委会#321281123218',
          '姜何村委会#321281123219',
          '顾北村委会#321281123221',
          '花杨村委会#321281123222',
          '季家村委会#321281123223',
          '冯田村委会#321281123225',
          '管家村委会#321281123226',
          '徐唐村委会#321281123227',
          '徐顾村委会#321281123228',
          '刁良村委会#321281123229',
          '张万村委会#321281123230',
          '赵家村委会#321281123231',
          '董北村委会#321281123232',
          '戴南镇本级#321281123999',
          '茅山社区居委会#321281120001',
          '姜太村委会#321281120200',
          '茅山村委会#321281120202',
          '纪荀村委会#321281120203',
          '茅山北村委会#321281120204',
          '朝阳庄村委会#321281120205',
          '薛杨村委会#321281120206',
          '孙王村委会#321281120207',
          '顾冯村委会#321281120208',
          '南朱庄村委会#321281120209',
          '茅山镇本级#321281120999',
          '裕民社区居委会#321281124001',
          '赵万社区居委会#321281124003',
          '罗磨村委会#321281124200',
          '赵万村委会#321281124201',
          '同济村委会#321281124202',
          '葛尤村委会#321281124203',
          '刘纪村委会#321281124204',
          '五星村委会#321281124205',
          '周家村委会#321281124206',
          '南桥村委会#321281124207',
          '联进村委会#321281124208',
          '振兴村委会#321281124209',
          '华庄村委会#321281124211',
          '港南村委会#321281124212',
          '藕杭村委会#321281124213',
          '唐刘村委会#321281124214',
          '双周村委会#321281124216',
          '蒋庄村委会#321281124217',
          '欧家村委会#321281124218',
          '福园村委会#321281124221',
          '张郭镇本级#321281124999',
        ],
        n: '戴南镇#321281123000',
      },
      {
        a: [
          '裕民社区居委会#321281124001',
          '赵万社区居委会#321281124003',
          '罗磨村委会#321281124200',
          '赵万村委会#321281124201',
          '同济村委会#321281124202',
          '葛尤村委会#321281124203',
          '刘纪村委会#321281124204',
          '五星村委会#321281124205',
          '周家村委会#321281124206',
          '南桥村委会#321281124207',
          '联进村委会#321281124208',
          '振兴村委会#321281124209',
          '华庄村委会#321281124211',
          '港南村委会#321281124212',
          '藕杭村委会#321281124213',
          '唐刘村委会#321281124214',
          '双周村委会#321281124216',
          '蒋庄村委会#321281124217',
          '欧家村委会#321281124218',
          '福园村委会#321281124221',
          '张郭镇本级#321281124999',
        ],
        n: '张郭镇#321281124000',
      },
      {
        a: [
          '兴营社区居委会#321281126001',
          '大营村委会#321281126201',
          '屯南村委会#321281126202',
          '营丰村委会#321281126203',
          '屯军村委会#321281126204',
          '联镇村委会#321281126205',
          '洋子村委会#321281126206',
          '高港村委会#321281126207',
          '阵营村委会#321281126208',
          '屯北村委会#321281126209',
          '营中村委会#321281126210',
          '大营镇本级#321281126999',
        ],
        n: '大营镇#321281126000',
      },
      {
        a: [
          '千垛社区居委会#321281128002',
          '草王村委会#321281128200',
          '天鹅村委会#321281128202',
          '李南村委会#321281128205',
          '顾赵村委会#321281128206',
          '苏宋村委会#321281128208',
          '刘家沟村委会#321281128209',
          '红星社村委会#321281128210',
          '联谊村委会#321281128212',
          '黑高村委会#321281128213',
          '黄邳村委会#321281128214',
          '华南村委会#321281128215',
          '水兴村委会#321281128218',
          '白涂河村委会#321281128219',
          '夏许村委会#321281128220',
          '姜戴村委会#321281128221',
          '马港村委会#321281128222',
          '丁沙村委会#321281128223',
          '陈杨村委会#321281128224',
          '荡朱村委会#321281128225',
          '徐圩村委会#321281128226',
          '北沙村委会#321281128227',
          '缸顾村委会#321281128228',
          '房石水村委会#321281128229',
          '瞿冯村委会#321281128230',
          '万旺村委会#321281128232',
          '东旺村委会#321281128233',
          '夏广村委会#321281128234',
          '东罗村委会#321281128235',
          '千垛镇本级#321281128999',
        ],
        n: '千垛镇#321281128000',
      },
      {
        a: [
          '官河社区居委会#321281129001',
          '东鲍社区居委会#321281129002',
          '牛陆庄村委会#321281129200',
          '兴北村委会#321281129201',
          '西鲍村委会#321281129203',
          '张沙村委会#321281129204',
          '荡北村委会#321281129205',
          '平旺村委会#321281129206',
          '周韩村委会#321281129208',
          '朱庄村委会#321281129209',
          '巾荡村委会#321281129210',
          '高新村委会#321281129212',
          '新中村委会#321281129213',
          '东鲍村委会#321281129219',
          '海河村委会#321281129220',
          '赵献村委会#321281129224',
          '联发村委会#321281129225',
          '孙唐村委会#321281129226',
          '塔头村委会#321281129229',
          '湖北庄村委会#321281129230',
          '沈沟村委会#321281129231',
          '兴东镇本级#321281129999',
        ],
        n: '兴东镇#321281129000',
      },
      {
        a: [
          '魏庄社区居委会#321281207001',
          '魏庄村委会#321281207201',
          '铁陆村委会#321281207202',
          '西丁村委会#321281207203',
          '强胜村委会#321281207204',
          '朱陈庄村委会#321281207205',
          '马家村委会#321281207206',
          '湾朱村委会#321281207208',
          '姚富村委会#321281207210',
          '朱胖村委会#321281207211',
          '林湖乡本级#321281207999',
        ],
        n: '林湖乡#321281207000',
      },
      {
        a: ['苗圃社区居委会#321281401001', '果园场本级#321281401999'],
        n: '果园场#321281401000',
      },
      {
        a: ['良种场社区居委会#321281403001', '良种场本级#321281403999'],
        n: '良种场#321281403000',
      },
      {
        a: [],
        n: '兴化市本级#321281999000',
      },
    ],
    n: '兴化市#321281000000',
  },
  {
    c: [
      {
        a: [
          '团结路社区居委会#321282001001',
          '江山路社区居委会#321282001002',
          '虹桥社区居委会#321282001003',
          '虹茂社区居委会#321282001004',
          '公园弄社区居委会#321282001007',
          '江华社区居委会#321282001008',
          '东兴街社区居委会#321282001009',
          '双港路社区居委会#321282001011',
          '羊巷社区居委会#321282001012',
          '小关庙社区居委会#321282001013',
          '前进社区居委会#321282001016',
          '方家场社区居委会#321282001017',
          '玉皇殿社区居委会#321282001018',
          '虹兴社区居委会#321282001020',
          '正南社区居委会#321282001022',
          '布市里社区居委会#321282001023',
          '北大街社区居委会#321282001024',
          '新建北路社区居委会#321282001025',
          '城西社区居委会#321282001026',
          '渔婆社区居委会#321282001028',
          '玉带社区居委会#321282001029',
          '新西社区居委会#321282001032',
          '靖西社区居委会#321282001045',
          '汤家村委会#321282001200',
          '柏木村委会#321282001203',
          '光明村委会#321282001204',
          '东郊村委会#321282001207',
          '东南村委会#321282001208',
          '西郊村委会#321282001213',
          '龙王村委会#321282001238',
          '进步村委会#321282001239',
          '友仁村委会#321282001240',
          '靖西村委会#321282001241',
          '正西村委会#321282001242',
          '靖城街道办本级#321282001999',
        ],
        n: '靖城街道#321282001000',
      },
      {
        a: [
          '振兴社区居委会#321282101001',
          '礼士社区居委会#321282101002',
          '四墩子社区居委会#321282101003',
          '富江新苑社区居委会#321282101005',
          '五星村委会#321282101200',
          '益民村委会#321282101201',
          '太东村委会#321282101202',
          '礼圣村委会#321282101203',
          '太和村委会#321282101204',
          '滨江村委会#321282101205',
          '礼士村委会#321282101206',
          '文东村委会#321282101207',
          '务本村委会#321282101208',
          '新桥村委会#321282101209',
          '孝化村委会#321282101210',
          '新合村委会#321282101211',
          '水三村委会#321282101212',
          '新柏村委会#321282101213',
          '三兴村委会#321282101214',
          '双龙村委会#321282101215',
          '德胜村委会#321282101216',
          '三太村委会#321282101217',
          '新桥镇本级#321282101999',
        ],
        n: '新桥镇#321282101000',
      },
      {
        a: [
          '文昌新村社区居委会#321282102001',
          '惠龙村委会#321282102200',
          '克成村委会#321282102201',
          '惠丰村委会#321282102204',
          '惠圣村委会#321282102205',
          '东兴村委会#321282102207',
          '成德村委会#321282102209',
          '合兴村委会#321282102210',
          '万盛村委会#321282102211',
          '上六村委会#321282102212',
          '海镇村委会#321282102213',
          '旺稼村委会#321282102214',
          '何德村委会#321282102215',
          '东兴镇本级#321282102999',
        ],
        n: '东兴镇#321282102000',
      },
      {
        a: [
          '井兴村委会#321282104223',
          '旺桥村委会#321282104215',
          '罗家村委会#321282104216',
          '柏一村委会#321282104217',
          '新港社区居委会#321282104002',
          '新纪元社区居委会#321282104004',
          '东阜社区居委会#321282104005',
          '兴阜社区居委会#321282104006',
          '阜康社区居委会#321282104007',
          '港阜社区居委会#321282104008',
          '新华村委会#321282104200',
          '安宁村委会#321282104201',
          '斜桥村委会#321282104202',
          '丰宁村委会#321282104203',
          '六助村委会#321282104205',
          '黄普村委会#321282104206',
          '民政村委会#321282104207',
          '红旗村委会#321282104208',
          '江平村委会#321282104209',
          '广福村委会#321282104210',
          '筱山村委会#321282104211',
          '大觉村委会#321282104212',
          '富民村委会#321282104213',
          '海圩村委会#321282104214',
          '斜桥镇本级#321282104999',
          '五圩村委会#321282104219',
          '创新村委会#321282104218',
          '丹华村委会#321282104220',
          '荷花村委会#321282104221',
          '新木村委会#321282104222',
        ],
        n: '斜桥镇#321282104000',
      },
      {
        a: [
          '西来社区居委会#321282105001',
          '泥桥社区居委会#321282105002',
          '见南社区居委会#321282105003',
          '丰产村委会#321282105200',
          '义兴村委会#321282105201',
          '普福村委会#321282105202',
          '东来村委会#321282105205',
          '赵家村委会#321282105206',
          '西来村委会#321282105208',
          '见龙村委会#321282105209',
          '敦义村委会#321282105210',
          '东升村委会#321282105211',
          '桐村村委会#321282105213',
          '泥桥村委会#321282105214',
          '永胜村委会#321282105217',
          '封家村委会#321282105218',
          '郁家村委会#321282105219',
          '龙华村委会#321282105221',
          '龙飞村委会#321282105222',
          '西来镇本级#321282105999',
        ],
        n: '西来镇#321282105000',
      },
      {
        a: [
          '东街社区居委会#321282106001',
          '西街社区居委会#321282106003',
          '文嘉村委会#321282106200',
          '安武村委会#321282106201',
          '长安村委会#321282106202',
          '庄帜村委会#321282106203',
          '廉尚村委会#321282106204',
          '横河村委会#321282106205',
          '石榴村委会#321282106206',
          '利民村委会#321282106207',
          '新安村委会#321282106208',
          '祁安村委会#321282106209',
          '关桥村委会#321282106210',
          '曙光村委会#321282106211',
          '大庆村委会#321282106212',
          '星光村委会#321282106213',
          '季东村委会#321282106214',
          '季市村委会#321282106215',
          '季新村委会#321282106216',
          '陈塘村委会#321282106217',
          '季西村委会#321282106218',
          '井圩村委会#321282106219',
          '勤盛村委会#321282106220',
          '裕福村委会#321282106221',
          '花家村委会#321282106222',
          '宁界村委会#321282106223',
          '季市镇本级#321282106999',
        ],
        n: '季市镇#321282106000',
      },
      {
        a: [
          '园山社区居委会#321282107001',
          '乐庄社区居委会#321282107002',
          '望江社区居委会#321282107004',
          '蹑云社区居委会#321282107006',
          '通太村委会#321282107200',
          '新庄村委会#321282107201',
          '联东村委会#321282107202',
          '土桥村委会#321282107203',
          '山东村委会#321282107204',
          '联华村委会#321282107205',
          '勇进村委会#321282107206',
          '孤山村委会#321282107207',
          '新联村委会#321282107211',
          '石桥村委会#321282107212',
          '勤丰村委会#321282107214',
          '广陵村委会#321282107216',
          '乐稼村委会#321282107217',
          '李王村委会#321282107218',
          '孤山镇本级#321282107999',
        ],
        n: '孤山镇#321282107000',
      },
      {
        a: [
          '生祠社区居委会#321282108001',
          '萃竹苑社区居委会#321282109005',
          '金星村委会#321282109200',
          '生祠村委会#321282109201',
          '新生村委会#321282109202',
          '七一村委会#321282109203',
          '大进村委会#321282109204',
          '东进村委会#321282109206',
          '七里村委会#321282109207',
          '三河村委会#321282109208',
          '三圩村委会#321282109209',
          '新丰村委会#321282109210',
          '地藏村委会#321282109211',
          '新跃村委会#321282109212',
          '老港村委会#321282109213',
          '利珠村委会#321282109214',
          '涨公村委会#321282109215',
          '红英村委会#321282109216',
          '新义村委会#321282109217',
          '法喜村委会#321282109218',
          '生祠镇本级#321282109999',
        ],
        n: '生祠镇#321282109000',
      },
      {
        a: [
          '城西新苑社区居委会#321282109003',
          '福兴村委会#321282110200',
          '集福村委会#321282110201',
          '经伦村委会#321282110205',
          '铭坤村委会#321282110206',
          '正北村委会#321282110207',
          '幸福村委会#321282110209',
          '三爱村委会#321282110210',
          '新市村委会#321282110211',
          '白衣村委会#321282110212',
          '徐周村委会#321282110213',
          '马桥村委会#321282110214',
          '横港村委会#321282110215',
          '迎祥村委会#321282110216',
          '祖师村委会#321282110217',
          '栗树村委会#321282110218',
          '朝西村委会#321282110219',
          '九一村委会#321282110220',
          '侯河村委会#321282110222',
          '马桥镇本级#321282110999',
        ],
        n: '马桥镇#321282110000',
      },
      {
        a: [],
        n: '靖江市本级#321282999000',
      },
      {
        a: [
          '新一居委会#321282600001',
          '城北居委会#321282600002',
          '王庄村委会#321282600200',
          '杨太村委会#321282600201',
          '常胜村委会#321282600202',
          '镇南村委会#321282600203',
          '齐心社区居委会#321282600204',
          '新州社区居委会#321282600205',
        ],
        n: '城北园区#321282600000',
      },
      {
        a: [
          '三江居委会#321282606001',
          '科技居委会#321282606002',
          '建新居委会#321282606003',
          '同兴居委会#321282606004',
          '新江海居委会#321282606005',
          '合兴居委会#321282606006',
          '华侨居委会#321282606007',
          '春江花城居委会#321282606008',
          '康兴新村居委会#321282606009',
          '鼎和花苑居委会#321282606010',
          '大桥居委会#321282606014',
          '前进村委会#321282606201',
          '火炬村委会#321282606202',
          '鼎新村委会#321282606203',
          '北六村委会#321282606204',
          '昆圣村委会#321282606205',
          '中桥村委会#321282606206',
          '十圩村委会#321282606207',
        ],
        n: '城南园区#321282606000',
      },
      {
        a: [
          '八圩居委会#321282608001',
          '莲沁苑居委会#321282608002',
          '溢馨苑居委会#321282608003',
          '五星村#321282608201',
          '迎江村#321282608202',
          '恒义村#321282608203',
          '万丰村#321282608204',
          '江峰村#321282608205',
          '江防村#321282608206',
          '八圩村#321282608207',
          '六圩村#321282608208',
          '五圩村#321282608209',
          '四圩村#321282608210',
        ],
        n: '澄靖园区#321282608000',
      },
      {
        a: [
          '晨阳居委会#321282620001',
          '华阳居委会#321282620002',
          '江阳居委会#321282620003',
          '文兴社区居委会#321282406008',
          '富阳居委会#321282620004',
          '同康村委会#321282620202',
          '木金村委会#321282620203',
          '越江村委会#321282620204',
          '宜和村委会#321282620205',
          '宜稼村委会#321282620206',
          '雅桥村委会#321282620209',
          '朝阳社区#321282620210',
          '兴阳社区#321282620211',
          '康阳社区#321282620212',
        ],
        n: '滨江新区#321282620000',
      },
      {
        a: [
          '一分公司#321282068401',
          '二分公司#321282068402',
          '三分公司#321282068403',
          '四分公司#321282068404',
          '五分公司#321282068405',
          '六分公司#321282068406',
          '七分公司#321282068407',
        ],
        n: '渔业公司#321282068000',
      },
    ],
    n: '靖江市#321282000000',
  },
  {
    c: [
      {
        a: [
          '南殷村#321283001040',
          '燕头村#321283001005',
          '房元村#321283001003',
          '耿戴村#321283001002',
          '渡河村#321283001020',
          '王坔村#321283001001',
          '众贤村#321283001017',
          '新联村#321283001015',
          '苏城村#321283001021',
          '三六村#321283001009',
          '向阳村#321283001011',
          '张庄村#321283001022',
          '郭庄村#321283001018',
          '兴燕居委会#321283001031',
          '北站居委会#321283001007',
          '商井居委会#321283001008',
          '跃进居委会#321283001035',
          '文垈居委会#321283001044',
          '张陈居委会#321283001004',
          '钱庄居委会#321283001010',
        ],
        n: '济川街道#321283001000',
      },
      {
        a: [
          '南郊村#321283002001',
          '延陵村#321283002002',
          '大生村#321283002003',
          '双进村#321283002004',
          '陆桥村#321283002005',
          '三阳村#321283002006',
          '蔡巷村#321283002007',
          '东联居委会#321283002009',
          '府前居委会#321283002010',
          '越街居委会#321283002011',
          '南街居委会#321283002012',
          '国庆二村居委会#321283002013',
          '复兴居委会#321283002014',
          '西郊居委会#321283002015',
          '国庆新村居委会#321283002016',
          '鼓楼居委会#321283002017',
          '华泰居委会#321283002018',
          '东城居委会#321283002019',
          '五里墩居委会#321283002020',
          '周曾居委会#321283002021',
          '三营居委会#321283002022',
          '祥泰居委会#321283002023',
          '润泰居委会#321283002024',
        ],
        n: '延令街道#321283002000',
      },
      {
        a: [
          '胜利村#321283101200',
          '东场村#321283101201',
          '西寺桥村#321283101202',
          '直来桥村#321283101203',
          '站东村#321283101204',
          '勤丰村#321283101205',
          '合心村#321283101206',
          '浩堡村#321283101207',
          '野屋村#321283101208',
          '朱何村#321283101209',
          '封家庄村#321283101210',
          '前进村#321283101211',
          '三里村#321283101212',
          '东闾村#321283101213',
          '革新村#321283101214',
          '樊家集村#321283101215',
          '双桥村#321283101216',
          '横巷村#321283101217',
          '太平村#321283101218',
          '祁巷村#321283101219',
          '余家庄村#321283101220',
          '韩庄村#321283101221',
          '西洋庄村#321283101222',
          '陈桥村#321283101260',
          '翁庄村#321283101263',
          '钱葛村#321283101265',
          '朱徐村#321283101261',
          '野向村#321283101256',
          '吴韩村#321283101257',
          '江堡村#321283101266',
          '南殷村#321283101262',
          '诸马村#321283101267',
          '金堡村#321283101264',
          '华庄村#321283101255',
          '南沙村#321283101271',
          '新洋村#321283101270',
          '中盐村#321283101269',
          '路庄村#321283101268',
          '唐港村#321283101258',
          '秦庄村#321283101259',
          '南垈村#321283101272',
          '印院村#321283101245',
          '王庄村#321283101273',
          '刘陈村#321283101243',
          '黄坍村#321283101244',
          '印家院村#321283101276',
          '大张村#321283101246',
          '海顾村#321283101247',
          '东顾村#321283101248',
          '鞠垛村#321283101249',
          '严徐村#321283101274',
          '吴庄村#321283101251',
          '扬春村#321283101252',
          '果园村#321283101253',
          '双联村#321283101275',
          '南街居委会#321283101006',
          '北街居委会#321283101008',
          '米巷居委会#321283101001',
          '永丰居委会#321283101004',
          '东进居委会#321283101282',
          '滨河居委会#321283101279',
          '金溪居委会#321283101281',
          '琴韵居委会#321283101278',
          '银杏居委会#321283101280',
          '华溪居委会#321283101277',
          '白庄居委会#321283101012',
        ],
        n: '黄桥镇#321283100000',
      },
      {
        a: [
          '洋港村#321283102200',
          '曹埠村#321283102201',
          '祯祥村#321283102202',
          '顾堡村#321283102203',
          '左庄村#321283102204',
          '新桥村#321283102205',
          '八户村#321283102206',
          '徐家庄村#321283102207',
          '八达村#321283102208',
          '周岱村#321283102209',
          '二河新村居委会#321283102001',
          '珊瑚新村居委会#321283102002',
          '镇前新村居委会#321283102003',
        ],
        n: '珊瑚镇#321283102000',
      },
      {
        a: [
          '新圩村#321283103200',
          '张拾村#321283103201',
          '通靖村#321283103202',
          '季圩村#321283103203',
          '曹市村#321283103204',
          '大有村#321283103205',
          '顾周村#321283103206',
          '木行村#321283103207',
          '宁界村#321283103208',
          '禅师村#321283103209',
          '龙王村#321283103210',
          '北肖村#321283103211',
          '马庄村#321283103212',
          '联吴村#321283103214',
          '联匡村#321283103215',
          '广陵居委会#321283103001',
          '兴宁居委会#321283103002',
        ],
        n: '广陵镇#321283103000',
      },
      {
        a: [
          '皂桥村#321283106202',
          '东雁岭村#321283106209',
          '西雁岭村#321283106210',
          '刁网村#321283106211',
          '野芹村#321283106212',
          '钱荡村#321283106213',
          '谢荡村#321283106214',
          '塘湾村#321283106215',
          '周庄村#321283106201',
          '尹垛村#321283106204',
          '顾庄村#321283106205',
          '常桥村#321283106206',
          '古溪居委会#321283106003',
          '横垛居委会#321283106002',
        ],
        n: '古溪镇#321283106000',
      },
      {
        a: [
          '丁庄村#321283107200',
          '兴杨村#321283107201',
          '蒋堡村#321283107202',
          '申庄村#321283107203',
          '潘元村#321283107204',
          '成庄村#321283107205',
          '野叶村#321283107206',
          '芮徐村#321283107207',
          '沿泰村#321283107208',
          '镇北村#321283107209',
          '大元居委会#321283107001',
          '双赵居委会#321283107002',
        ],
        n: '元竹镇#321283107000',
      },
      {
        a: [
          '汤庄村#321283108201',
          '匡庄村#321283108202',
          '常巷村#321283108203',
          '陈庄村#321283108204',
          '镇西村#321283108205',
          '吴榨村#321283108206',
          '西桥村#321283108207',
          '东联村#321283108208',
          '杨庄村#321283108210',
          '薛庄村#321283108211',
          '郭桥村#321283108212',
          '克仁村#321283108213',
          '刘井村#321283108214',
          '圩港村#321283108216',
          '褚陈村#321283108217',
          '焦堡居委会#321283108001',
          '焦荡居委会#321283108002',
          '张桥居委会#321283108003',
        ],
        n: '张桥镇#321283108000',
      },
      {
        a: [
          '印达村#321283109201',
          '戴窑村#321283109202',
          '安乐村#321283109203',
          '肖榨村#321283109205',
          '李圩村#321283109206',
          '朱圩村#321283109207',
          '镇西村#321283109204',
          '丁桥村#321283109209',
          '曲霞居委会#321283109001',
        ],
        n: '曲霞镇#321283109000',
      },
      {
        a: [
          '同心村#321283110200',
          '元仙村#321283110201',
          '司马村#321283110203',
          '洋碾村#321283110204',
          '沈丁村#321283110205',
          '三军村#321283110206',
          '西黄村#321283110207',
          '夏港村#321283110208',
          '刘官村#321283110209',
          '刘桥村#321283110210',
          '赵杜村#321283110211',
          '李湾村#321283110212',
          '西荡村#321283110213',
          '印荡村#321283110214',
          '刘庄村#321283110215',
          '印庄村#321283110216',
          '常周居委会#321283110001',
          '河头居委会#321283110217',
          '失迷巷居委会#321283110003',
        ],
        n: '河失镇#321283110000',
      },
      {
        a: [
          '南新街村#321283113200',
          '杏陆村#321283113201',
          '车马庄村#321283113202',
          '张吉村#321283113203',
          '严家堡村#321283113204',
          '野肖村#321283113205',
          '管凤村#321283113206',
          '顾庄寺村#321283113207',
          '梅家庄村#321283113208',
          '鞠山村#321283113209',
          '白马村#321283113210',
          '金干村#321283113211',
          '孔叶村#321283113212',
          '东河村#321283113213',
          '河西村#321283113214',
          '东申村#321283113215',
          '夏徐村#321283113216',
          '杨芮村#321283113217',
          '霍庄村#321283113218',
          '倪浒村#321283113219',
          '钱南村#321283113220',
          '新街村#321283113221',
          '吴岱村#321283113222',
          '梧桐村#321283113223',
          '宋福村#321283113224',
          '叶利村#321283113225',
          '谢荡村#321283113226',
          '李荡村#321283113227',
        ],
        n: '新街镇#321283113000',
      },
      {
        a: [
          '十里甸村#321283114200',
          '姚垈村#321283114201',
          '官沟村#321283114203',
          '新星村#321283114204',
          '桑木村#321283114206',
          '朝阳村#321283114208',
          '阡垈村#321283114209',
          '夏家垈村#321283114210',
          '北殷村#321283114211',
          '王庄村#321283114212',
          '石桥村#321283114213',
          '东林村#321283114214',
          '王家堡村#321283114215',
          '鲁堡村#321283114216',
          '封垈村#321283114217',
          '毛庄村#321283114218',
          '新镇居委会#321283114001',
          '东阳居委会#321283114002',
        ],
        n: '姚王街道#321283114000',
      },
      {
        a: [
          '西宣村#321283115201',
          '梅埝村#321283115202',
          '崇头庄村#321283115203',
          '三堡村#321283115204',
          '北森庄村#321283115205',
          '郭寨村#321283115206',
          '纪沟村#321283115207',
          '毛群村#321283115208',
          '联新村#321283115210',
          '张河村#321283115213',
          '银杏村#321283115216',
          '宣堡居委会#321283115001',
        ],
        n: '宣堡镇#321283115000',
      },
      {
        a: [
          '张竹村#321283122200',
          '分界村#321283122201',
          '开绿村#321283122204',
          '官庄村#321283122206',
          '滕兴村#321283122207',
          '南周村#321283122209',
          '七贤村#321283122210',
          '王厂村#321283122213',
          '耿厂村#321283122214',
          '湖头村#321283122216',
          '沿界村#321283122202',
          '赵庄村#321283122211',
          '野庙村#321283122212',
          '长生居委会#321283122002',
        ],
        n: '分界镇#321283122000',
      },
      {
        a: [
          '蔡桥村#321283123238',
          '褚港村#321283123211',
          '龙港村#321283123212',
          '蒋港村#321283123213',
          '仁寿村#321283123214',
          '过船村#321283123215',
          '长沟村#321283123216',
          '石桥村#321283123217',
          '殷石村#321283123218',
          '中港村#321283123219',
          '芦碾村#321283123207',
          '翻身村#321283123208',
          '天星村#321283123209',
          '新星村#321283123206',
          '红旗村#321283123205',
          '蒋榨村#321283123210',
          '洋泗村#321283123220',
          '五杨村#321283123221',
          '三联村#321283123225',
          '马甸村#321283123226',
          '中兴村#321283123227',
          '大马庄村#321283123228',
          '小马庄村#321283123229',
          '苏尘村#321283123230',
          '苏余村#321283123231',
          '大何庄村#321283123232',
          '西江村#321283123233',
          '双彭村#321283123234',
          '顾阚村#321283123235',
          '联杨村#321283123236',
          '永新村#321283123237',
          '印桥居委会#321283123002',
          '郭庄村#321283123224',
          '向阳村#321283123222',
          '张庄村#321283123223',
          '尤湾社区#321283123239',
          '福泰社区#321283123240',
          '丰产社区#321283123241',
        ],
        n: '滨江镇#321283123000',
      },
      {
        a: [
          '蒋华村#321283124200',
          '同德村#321283124201',
          '广福村#321283124202',
          '三桥村#321283124203',
          '六圩村#321283124204',
          '宋桥村#321283124205',
          '清水村#321283124206',
          '上元村#321283124207',
          '新市村#321283124208',
          '毗芦村#321283124209',
          '张公村#321283124210',
          '季桥村#321283124211',
          '通石村#321283124212',
          '封祝村#321283124213',
          '唐港村#321283124214',
          '崇福村#321283124215',
          '七圩村#321283124216',
          '八圩村#321283124217',
          '九圩村#321283124218',
          '高圩村#321283124219',
          '四仙村#321283124220',
          '公殿村#321283124221',
          '桃园村#321283124222',
          '涌兴村#321283124223',
          '祥福居委会#321283124003',
        ],
        n: '虹桥镇#321283124000',
      },
      {
        a: [
          '根思村#321283201200',
          '李秀河村#321283201201',
          '南湖村#321283201203',
          '井坔村#321283201215',
          '老叶村#321283201211',
          '鞠顾村#321283201213',
          '新港村#321283201205',
          '兴许村#321283201207',
          '双联村#321283201214',
          '双港村#321283201209',
        ],
        n: '根思乡#321283201000',
      },
      {
        a: ['社会福利院#321283999001', '救助站#321283999002'],
        n: '民政局直属单位#321283999000',
      },
    ],
    n: '泰兴市#321283000000',
  },
  {
    c: [
      {
        a: [
          '梅兴社区居委会#321290001001',
          '秦蒋社区居委会#321290001002',
          '塘湾社区居委会#321290001003',
          '朱穆社区居委会#321290001004',
          '殷蒋社区居委会#321290001005',
          '双河社区居委会#321290001006',
          '振兴社区居委会#321290001007',
          '陈庄社区居委会#321290001008',
          '杨庄社区居委会#321290001009',
          '西谢社区居委会#321290001010',
          '向阳社区居委会#321290001011',
          '盛和花园社区居委会#321290001012',
          '塘湾集镇社区居委会#321290001013',
          '东谢社区居委会#321290001014',
          '刘庄社区居委会#321290001015',
          '凤凰园社区居委会#321290001016',
          '华润社区居委会#321290001017',
          '钟山社区居委会#321290001018',
          '永定社区居委会#321290001019',
          '凤凰街道本级#321290001999',
        ],
        n: '凤凰街道#321290001000',
      },
      {
        a: [
          '医药城社区居委会#321290002001',
          '祥和社区居委会#321290002002',
          '康和社区居委会#321290002003',
          '寺巷社区居委会#321290002004',
          '军甫社区居委会#321290002005',
          '新华社区居委会#321290002006',
          '小王社区居委会#321290002007',
          '大王社区居委会#321290002008',
          '石桥社区居委会#321290002009',
          '三野社区居委会#321290002010',
          '龙凤社区居委会#321290002011',
          '屠桥社区居委会#321290002013',
          '二桥社区居委会#321290002014',
          '新港社区居委会#321290002015',
          '寺巷街道本级#321290002999',
        ],
        n: '寺巷街道#321290002000',
      },
      {
        a: [
          '东明社区居委会#321290003001',
          '春风社区居委会#321290003002',
          '名都社区居委会#321290003003',
          '北徐社区居委会#321290003004',
          '靳新社区居委会#321290003005',
          '祥龙社区居委会#321290003006',
          '城南社区居委会#321290003007',
          '明珠社区居委会#321290003008',
          '丹凤社区居委会#321290003009',
          '西湖翠苑社区居委会#321290003010',
          '鲍庄社区居委会#321290003012',
          '明珠街道本级#321290003999',
        ],
        n: '明珠街道#321290003000',
      },
      {
        a: ['滨江社区居委会#321290005002', '沿江街道本级#321290005999'],
        n: '沿江街道#321290005000',
      },
      {
        a: [
          '褚雅社区居委会#321290101001',
          '野徐社区居委会#321290101002',
          '仲联社区居委会#321290101003',
          '永新社区居委会#321290101006',
          '老庄社区居委会#321290101007',
          '唐家社区居委会#321290101008',
          '康居社区居委会#321290101009',
          '野徐镇本级#321290101999',
        ],
        n: '野徐镇#321290101000',
      },
      {
        a: [],
        n: '医药高新区本级#321290999000',
      },
    ],
    n: '医药高新区#321290000000',
  },
  {
    c: [
      {
        a: ['社会福利院#321299999999'],
        n: '泰州市福利总院#321299999000',
      },
    ],
    n: '民政局直属单位#321299000000',
  },
]

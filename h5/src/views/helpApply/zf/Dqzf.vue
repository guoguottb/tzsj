<template>
  <div class="helpApply">
    <header>
      <div class="headerHead">
        <div>
          <div :class="{headerF:isShow}">走访信息</div>
        </div>
        <div class="headerRectangle"></div>
        <div>
          <div :class="{headerF:isShow2}">走访照片</div>
        </div>
      </div>
    </header>
    <main>
      <div id="page1"
           v-show="page1"
           style="height: 600px; display: block;text-align: left;">
        <div style="font-size:12px;padding-left:20px;padding-right:20px;text-align: left;">
          <div style="border-bottom:#aaa solid 1px;font-size: 16px;">
            <span style="background-color: #00AAFF;display: inline-block;width: 5px;height: 10px;"></span>
            <span style="color: #00AAFF;">走访信息</span>
          </div>
          <van-form ref='apply'
                    @submit="next1"
                    style="margin-top: 20px;">
            <van-field readonly
                       clickable
                       name="arv_ex8"
                       :value="form.arv_ex8"
                       label="走访类型"
                       required
                       placeholder="点击选择走访类型"
                       :rules="rules.rules9"
                       @click="showPicker2 = true" />
            <van-popup v-model="showPicker2"
                       position="bottom">
              <van-picker show-toolbar
                          :columns="columns2"
                          @confirm="onConfirm1($event,'arv_ex8','showPicker2')"
                          @cancel="showPicker2 = false" />
            </van-popup>
            <van-field v-if="form.arv_ex8 === '走访慰问'"
                       name="checkboxGroup"
                       label="慰问物资">
              <template #input>
                <van-checkbox-group v-model="checkboxGroup"
                                    direction="horizontal">
                  <van-checkbox v-for="item in goodsList"
                                :key="item.id"
                                :name="item.id"
                                shape="square">{{item.name}}</van-checkbox>
                </van-checkbox-group>
              </template>
            </van-field>
            <van-field v-model="form.arv_ex1"
                       name="arv_ex1"
                       maxlength="10"
                       label="走访对象"
                       placeholder="走访对象"
                       required
                       :rules="[{ required: true, message: '请填写走访对象' }]" />

            <van-field v-model="form.arv_ex2"
                       name="arv_ex2"
                       label="身份证号"
                       placeholder="身份证号"
                       required
                       :rules="[{ required: true, message: '请填写身份证号' }]" />

            <van-field readonly
                       clickable
                       name="arv_ex4"
                       v-model="form.arv_ex4"
                       label="保障类别"
                       required
                       placeholder="点击选择保障类别"
                       :rules="rules.rules3"
                       @click="showPicker1 = true" />
            <van-popup v-model="showPicker1"
                       position="bottom">
              <van-picker show-toolbar
                          :columns="columns"
                          @confirm="onConfirm1($event,'arv_ex4','showPicker1')"
                          @cancel="showPicker1 = false" />
            </van-popup>

            <van-field v-model="ab_ex162_2"
                       name="ab_ex162_2"
                       center
                       readonly
                       label="行政区划"
                       placeholder="请选择所在行政区划"
                       required
                       @click="show = true"
                       :rules="rules.rules4">
            </van-field>
            <van-popup v-model="show"
                       round
                       position="bottom">
              <van-cascader title="请选择所在行政区划"
                            :options="options"
                            @close="show = false"
                            @finish="onFinish" />
            </van-popup>

            <van-field v-model="form.arv_ex3"
                       name="arv_ex3"
                       maxlength="50"
                       label="家庭住址"
                       placeholder="家庭住址"
                       required
                       :rules="rules.rules5" />
            <van-field v-model="form.arv_ex5"
                       center
                       name="arv_ex5"
                       maxlength="11"
                       type="digit"
                       label="联系电话"
                       placeholder="联系电话"
                       required
                       :rules="rules.rules6">
            </van-field>
            <!-- 四方协议 -->
            <template v-if="form.arv_ex8 === '四方协议'">
              <!-- 四方协议 照片 -->
              <van-field name="uploader"
                         required
                         :rules="[{ required: true, message: '请上传四方协议照片' }]"
                         label="协议照片">
                <template #input>
                  <van-uploader v-model="fourPactPicture"
                                :after-read="afterFourPactPicture"
                                :before-delete="beforeFourPactPicture"
                                :max-count="1" />
                </template>
              </van-field>
              <!-- 四方协议 是否落实 -->
              <van-field name="radio"
                         required
                         :rules="[{ required: true, message: '请选择是否落实' }]"
                         label="是否落实">
                <template #input>
                  <van-radio-group v-model="form.four_pact_implementation"
                                   direction="horizontal">
                    <van-radio name="已落实">已落实</van-radio>
                    <van-radio name="未落实">未落实</van-radio>
                    <van-radio name="部分落实">部分落实</van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <!-- 四方协议 落实时间 -->
              <van-field readonly
                         clickable
                         name="datetimePicker"
                         :value="form.four_pact_time"
                         label="落实时间"
                         placeholder="点击选择时间"
                         @click="fourAgreementTimeShowPicker = true" />
              <van-popup v-model="fourAgreementTimeShowPicker"
                         position="bottom">
                <van-datetime-picker type="date"
                                     @confirm="fourAgreementOnConfirm"
                                     @cancel="fourAgreementTimeShowPicker = false" />
              </van-popup>
              <!-- 四方协议描述 -->
              <van-field v-model="form.four_pact_desc"
                         label="四方协议描述"
                         placeholder="请输入四方协议描述" />
            </template>
            <!-- 急难需求 板块 -->
            <template v-if="form.arv_ex8 === '急难需求'">
              <!-- 急难需求 -->
              <van-field name="radio"
                         required
                         :rules="[{ required: true, message: '请选择急难需求' }]"
                         label="急难需求">
                <template #input>
                  <van-radio-group v-model="form.whether_need"
                                   direction="horizontal">
                    <van-radio name="有">有</van-radio>
                    <van-radio name="无">无</van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <!-- 需求描述 -->
              <van-field v-model="form.need_desc"
                         label="需求描述"
                         placeholder="请输入急难需求描述" />
            </template>
            <!-- 隐患排查 板块 -->
            <template v-if="form.arv_ex8 === '隐患排查'">
              <!-- 有无安全隐患 -->
              <van-field name="radio"
                         required
                         :rules="[{ required: true, message: '请选择有无安全隐患' }]"
                         label="有无安全隐患">
                <template #input>
                  <van-radio-group v-model="form.whether_hidden_danger"
                                   direction="horizontal">
                    <van-radio name="有">有</van-radio>
                    <van-radio name="无">无</van-radio>
                  </van-radio-group>
                </template>
              </van-field>
              <!-- 安全隐患描述 -->
              <van-field v-model="form.hidden_danger_desc"
                         label="安全隐患描述"
                         placeholder="请输入安全隐患描述" />
            </template>
            <van-field v-model="form.userName"
                       name="arv_ex6"
                       maxlength="10"
                       disabled
                       label="走访人"
                       placeholder="走访人" />
            <van-field v-model="form.arv_ex7"
                       name="arv_ex7"
                       maxlength="100"
                       label="走访内容"
                       placeholder="走访内容"
                       required
                       :rules="rules.rules8" />

            <van-field v-model="form.arv_ex9"
                       maxlength="300"
                       label="发现问题"
                       placeholder="发现问题"/>
            <van-field name="radio"
                       v-if="form.arv_ex8 === '大数据预警'"
                       label="是否有申请意愿">
              <template #input>
                <van-radio-group v-model="form.arv_ex20"
                                 direction="horizontal">
                  <van-radio name="是">是</van-radio>
                  <van-radio name="否">否</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <div style="margin: 16px 0 0 0;display: flex;justify-content: space-around;">
              <van-button block
                          type="info"
                          native-type="button"
                          @click="next1">下一步</van-button>
            </div>
          </van-form>
        </div>
      </div>

      <div id="page2"
           v-show="page2"
           style="height: auto;margin-top: 100px;">
        <div class="page2Div">
          <div style="height:40px;line-height:40px;font-size: 17px;">走访照片:</div>
          <div style="margin-top:10px;">
            <div style="position:relative;width:91%;float: left;">
              <van-uploader v-model="fileList"
                            :after-read="uploadImg()"
                            :before-delete="beforeDelete('arv_ex10')" />
            </div>
          </div>
        </div>
        <div style="margin-top: 20px;display: flex;justify-content: space-around;">
          <van-button block
                      native-type="button"
                      @click="back2">上一步</van-button>
          <!-- primary -->
          <van-button block
                      :type="form.arv_ex6 ? 'primary':'info'"
                      @click="save">{{form.arv_ex6 ? "修改" : "保存"}}</van-button>
        </div>
      </div>
    </main>
    <footer>
    </footer>
  </div>
</template>

<script>
import request from '@/utils/request.js'
import {
  fileUploadApi, // 图片上传接口
  viewImgApi, // 图片回显
} from "@/api"
import dayjs from "dayjs"
let getGoodsApi = (data) => {
  return request({
    method: "POST",
    url: "/social/assistanceWeixin/queryGoods",
    data
  })
}
import { tszfValidate, tszfFilter, isCardID, xzqh, compressImg } from '@/utils/utils.js'
export default {
  name: "dqzfVue",
  data () {
    return {
      isShow: true,
      isShow2: false,
      checked: false,
      page1: true,
      page2: false,
      rules: {
        rules1: [
          {
            required: true,
            message: '请填写走访对象',
            trigger: 'onBlur'
          }
        ],
        rules2: [
          {
            required: true,
            message: '请填写身份证号',
            trigger: 'onBlur'
          }
        ],
        rules3: [
          {
            required: true,
            message: '请选择保障类别',
            trigger: 'onBlur'
          }
        ],
        rules4: [
          {
            required: true,
            message: '请选择行政区划',
            trigger: 'onBlur'
          }
        ],
        rules5: [
          {
            required: true,
            message: '请填写家庭住址',
            trigger: 'onBlur'
          }
        ],
        rules6: [
          {
            required: true,
            message: '请填写联系电话',
            trigger: 'onBlur'
          }
        ],
        rules7: [
          {
            required: true,
            message: '请填写走访人',
            trigger: 'onBlur'
          }
        ],
        rules8: [
          {
            required: true,
            message: '请填写走访内容',
            trigger: 'onBlur'
          }
        ],
        rules9: [
          {
            required: true,
            message: '请选择走访类型',
            trigger: 'onBlur'
          }
        ],
        rules10: [
          {
            required: true,
            message: '请填写发现问题',
            trigger: 'onBlur'
          }
        ],
      },
      //
      columns: ['低保', '支出贫困', '特困供养', '低保边缘', '临时救助', "无"],
      columns2: ["走访慰问", '疾病康复走访', '日常走访', '定期回访', '特殊走访', '电话走访', '四方协议', '急难需求', '隐患排查', '大数据预警', '水电气走访', '交通出行走访', '疾病康复走访'],
      showPicker1: false,
      showPicker2: false,
      form: {
      },
      fileList: [],
      ab_ex162_2: '',
      show: false,
      // 选项列表，children 代表子选项，支持多级嵌套
      options: [],
      checkboxGroup: [],
      pc: "",
      goodsList: [],
      fourAgreementTimeShowPicker: false,  // 四方协议 时间选择器
      fourPactPicture: [],  // 四方协议 时间选择器
    }
  },
  async created () {
    await this.loadData(),
      // 区划选项数据
      request({
        method: 'post',
        url: '/social/assistanceWeixin/getCitys',
        data: {}
      }).then(res => {
        console.log(res, '接口区划')
        // 区
        for (let i in res) {
          this.options.push({ text: '', value: '', children: [] });
          this.options[i].text = res[i].n.split('#')[0];
          this.options[i].value = '#' + res[i].n.split('#')[1];
          // 镇
          for (let j in res[i].c) {
            // this.options[i].children=[]
            this.options[i].children[j] = { text: '', value: '', children: [] };
            this.options[i].children[j].text = res[i].c[j].n.split('#')[0];
            this.options[i].children[j].value = '#' + res[i].c[j].n.split('#')[1];

            // 村
            for (let k in res[i].c[j].a) {
              this.options[i].children[j].children[k] = { text: '', value: '' };
              this.options[i].children[j].children[k].text = res[i].c[j].a[k].split('#')[0];
              this.options[i].children[j].children[k].value = '#' + res[i].c[j].a[k].split('#')[1];
            }

          }

        }
        console.log(this.options, '区划');

      }).catch(res => {
        console.log(res, 'xzqh');
        this.$toast.fail('数据请求失败1')
      })
    this.getGoods()
  },
  methods: {

    // 数据回显
    async loadData () {
      try {
        const res = await request({
          method: 'post',
          headers: {
            token: localStorage.getItem("token")
          },
          url: '/social/assistanceWeixin/getRegularVisits',
          data: {
            sId: this.$route.query.sId
          },
        })
        console.log(res, '数据',);
        this.pc = res[0].data[0].arv_ex15
        if (res[0].data.length > 0) {
          // for (let i in res[0].data[0]) {
          //   res[0].data[0][i] = unescape(res[0].data[0][i])
          // }
          // let json = res[0].data[0]
          this.form = res[0].data[0]
          if (this.form.arv_ex6) this.form.userName = this.form.arv_ex6
          if (this.form.arv_ex18.length) {
            console.log(this.form.arv_ex18.length, "this.form.arv_ex18.length")
            this.checkboxGroup = []
            this.form.arv_ex18.forEach(item => this.checkboxGroup.push(+item.id))
          }
          // 行政区划显示
          if (this.form.arv_ex14) {
            this.ab_ex162_2 = this.form.arv_ex13 + '/' + this.form.arv_ex11 + '/' + this.form.arv_ex12
          }
          // 四方协议 图片回显
          if (this.form.four_pact_picture) {
            viewImgApi(this.form.four_pact_picture).then(res => {
              // 这个从正确的进来
              this.fourPactPicture.push({
                url: res,
                isImage: true
              })
            }).catch(res => {
              this.$toast('四方协议照片回显错误')
            })
          }
          // 走访图片  回显
          if (this.form.arv_ex10) {
            let imgs = this.form.arv_ex10.split(",");
            imgs.forEach((value, index) => {
              this.imageView(value).then(res => {
                // 这个从正确的进来
                this.fileList.push({
                  url: res,
                  isImage: true
                })
                console.log(this.fileList)
              }).catch(res => {
                console.log(res)
              })
            })
          }
        }
      } catch (error) {

      }
    },
    async getGoods () {
      try {
        const { data } = await getGoodsApi({
          pc: this.pc
        })
        this.goodsList = data
      } catch (error) {

      }
    },
    // 四方协议 落实时间选择器 确认
    fourAgreementOnConfirm (val) {
      this.form.four_pact_time = dayjs(val).format("YYYY-MM-DD")
      this.fourAgreementTimeShowPicker = false
    },
    // 四方协议图片    上传前
    async afterFourPactPicture (file) {
      let formData = new FormData();
      formData.append('file', file.file)
      try {
        const res = await fileUploadApi(formData)
        this.form.four_pact_picture = "/social/weixinMinios/show?filename=" + res[0].filename
      } catch (error) {
        this.fourPactPicture = []
        this.$toast("图片上传失败")
        throw new Error("图片上传失败")
      }
    },
    // 四方协议图片    删除前
    beforeFourPactPicture () {
      this.fourPactPicture = []
      this.form.four_pact_picture = ''
    },
    next1 () {
      // 去除姓名的空白符号并且判断姓名是否合法
      this.form.arv_ex1 = this.form.arv_ex1.replace(/\s*/g, "")
      let tszf = tszfValidate(this.form.arv_ex1)
      if (tszf) {
        this.$toast.fail("请输入正确的走访对象")
        return false
      }

      // 验证联系电话
      let myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (!myreg.test(this.form.arv_ex5)) {
        this.$toast.fail('请填写正确的联系电话')
        return false
      }

      // 过滤家庭住址特殊字符和空格
      this.form.arv_ex3 = this.form.arv_ex3.replace(/\s*/g, "")
      this.form.arv_ex3 = tszfFilter(this.form.arv_ex3)
      // 判断身份证是否合法
      let msg = isCardID(this.form.arv_ex2)
      if (msg) {
        this.$toast.fail(msg)
        return false
      } else {
        this.$refs.apply.validate().then(res => {
          this.page1 = false
          this.page2 = true
          this.isShow = false
          this.isShow2 = true
        }).catch(err => {
          console.log(err[0].message)
          this.$toast.fail(err[0].message)
        })
      }
    },
    back2 () {
      this.page1 = true
      this.page2 = false
      this.isShow = true
      this.isShow2 = false
    },
    onConfirm1 (value, itemval1, itemval2) {
      this.form[itemval1] = value
      this[itemval2] = false
    },
    imageView (url) {
      return request({
        method: 'post',
        url: url,
        headers: {
          'token': sessionStorage.getItem('token')
        },
        data: {

        },
      })
    },
    save () {
      // return console.log(this.form)
      if (!this.form.arv_ex10) return this.$toast("走访照片不可为空")
      // 遮罩
      let toast = this.$toast({
        type: 'loading',
        message: '提交中...',
        overlay: true,
        duration: 0
      })

      var date = new Date();
      var year = date.getFullYear(); //获取当前年份
      var mon = date.getMonth() + 1; //获取当前月份
      var da = date.getDate(); //获取当前日
      var day = date.getDay(); //获取当前星期几
      var h = date.getHours(); //获取小时
      var m = date.getMinutes(); //获取分钟
      var s = date.getSeconds(); //获取秒
      var d = document.getElementById('Date');
      h < 10 ? h = '0' + h : h
      m < 10 ? m = '0' + m : m
      s < 10 ? s = '0' + s : s
      var mytime = year + '-' + mon + '-' + da + ' ' + h + ':' + m + ':' + s;
      this.form.arv_dat1 = mytime
      this.form.arv_ex18 = this.checkboxGroup.join(",")
      this.form.arv_ex6 = this.form.userName
      this.form.arv_ex19 = "已走访"
      if (this.form.arv_ex8 !== '大数据预警') this.form.arv_ex20 = ""
      // 提交
      request({
        method: 'post',
        headers: {
          token: localStorage.getItem("token")
        },
        url: '/social/assistanceWeixin/saveRegularVisits',
        data: {
          data: '[' + JSON.stringify(this.form) + ']',
        },
      }).then(res => {
        toast.clear()
        // 提示提交成功
        this.$dialog.alert({
          message: '提交成功',
        }).then(() => {
          this.$router.push('/zfhc?stype=定期走访')
        })
      }).catch(error => {
        toast.clear()
        // 提示提交失败
        this.$toast.fail('提交失败')
      })
    },
    back3 () {
      this.page3 = false,
        this.page2 = true
      this.isShow3 = false,
        this.isShow2 = true
    },
    // 全部选项选择完毕后，会触发 finish 事件
    onFinish ({
      selectedOptions
    }) {
      this.show = false;
      console.log(selectedOptions.map((option) => option.text))
      let area = selectedOptions.map((option) => option.text)
      let area2 = selectedOptions.map((option) => option.text + option.value)
      this.form.arv_ex12 = area[2]  //村
      this.form.arv_ex11 = area[1]  //街道
      this.form.arv_ex13 = area[0]  //区
      this.ab_ex162_2 = area.join('/');
      this.form.arv_ex14 = area2.join(','); //xzqh
      // 更改家庭住址
      if (this.form.arv_ex3 == '') {
        this.form.arv_ex3 = area[0] + area[1] + area[2];
      }
    },
    imgRequest (param, file, num) {
      request({
        method: 'post',
        url: '/social/weixinMinios/fileUpload',
        data: param,
      }).then(res => {
        file.status = 'done';
        file.message = '上传完成';
        console.log(res)
        console.log(this.form, res[0].filename)
        if (this.form.arv_ex10) {
          this.form.arv_ex10 = this.form.arv_ex10.concat(',', res[0].filename)
        } else {
          this.form.arv_ex10 = res[0].filename
        }
      }).catch(erro => {
        file.status = 'failed';
        file.message = '上传失败';
        console.log(erro)
        this.fileList.pop()
        this.$toast.fail('上传失败')
      })
    },
    uploadImg () {
      return file => {
        console.log(file)
        file.status = 'uploading';
        file.message = '上传中...';

        let obj = new compressImg(file, 0, this.imgRequest)

      }
    },
    beforeDelete (data) {
      return (file, detail) => {
        let arr = this.form[data].split(',')
        arr.splice(detail.index, 1)
        this.form[data] = arr.join(',')

        console.log(this.form[data])
        console.log(data)
        console.log(file)
        console.log(detail)
        return true
      }
    },
  }
}
</script>

<style scoped>
.headerF {
  /* color: #409EFF; */
  color: #333333;
}
.marginstyle {
  margin: 10px;
}
.helpApply {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  background-size: 100% 100%;
  position: fixed;
  overflow: auto;
}

header {
  width: 100%;
  height: 88px;
  background-color: #3e80cc;
  box-shadow: 0px 0px 30px #a1a1a1;
  position: fixed;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #ffffff;
}

.headerHead {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}

/* 	.headerCircle{
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background-color: #008B8B;
	} */
.headerRectangle {
  width: 100px;
  height: 8px;
  background-color: #e2e2e2;
  border-radius: 10px;
  margin: 0 20px 0 20px;
}

main {
  margin-top: 100px;
}
.page2Div {
  overflow: auto;
  margin-left: 4%;
  width: 80%;
  height: 500px;
  font-size: 28px;
  color: #545454;
  padding-left: 40px;
  padding-right: 40px;
  border-radius: 30px;
  border: #aaa solid 1px;
}
</style>

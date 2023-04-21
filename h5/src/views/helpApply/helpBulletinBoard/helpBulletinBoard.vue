<template>
  <div class="dbhc">
    <header>
      救助信息查询
    </header>
    <!-- 条件查询框 -->
    <template>
      <van-form>
        <!-- 救助时间 -->
        <van-field v-model="thisMonthTime"
                   disabled
                   center
                   readonly
                   label="救助时间">
        </van-field>
        <van-field v-model="areaName"
                   required
                   center
                   readonly
                   label="行政区划"
                   placeholder="请选择所在行政区划"
                   @click="areaShow = true">
        </van-field>
        <!-- 救助类型 -->
        <van-field readonly
                   required
                   clickable
                   :value="helpClass"
                   label="救助类型"
                   is-link
                   placeholder="点击选择救助类型"
                   @click="showSelect('救助类型')" />
        <div class="selectButton">
          <span @click="affirmSearch">确认查询</span>
        </div>
      </van-form>
      <van-popup v-model="areaShow"
                 round
                 position="bottom">
        <van-cascader title="请选择所在行政区划"
                      :options="options"
                      @close="areaShow = false"
                      @finish="onFinish" />
      </van-popup>
      <van-popup v-model="showPicker"
                 position="bottom">
        <van-picker show-toolbar
                    :columns='kosekiTyle'
                    @confirm="confirmType($event)"
                    @cancel="showPicker = false" />
      </van-popup>
    </template>
  </div>
</template>

<script>
import request from "@/utils/request"
import { city } from "@/mappingFile"
import dayjs from "dayjs"
let thisMonthTime = dayjs(new Date()).format("YYYY年MM月")
export default {
  data () {
    return {
      areaName: "",
      options: city,
      showPicker: false,
      kosekiTyle: [],
      helpClass: "",
      kosekiTyleName: "",
      city: "", // 城市
      street: "", // 街道/镇
      areaShow: false,
      thisMonthTime,
    }
  },
  created () {
    // 区划选项数据
    // /social/assistanceWeixin/getCitys2
    // request({
    //   method: 'post',
    //   url: '/social/assistanceWeixin/getCitys',
    //   data: {}
    // }).then(res => {
    //   // 区
    //   for (let i in res) {
    //     this.options.push({ text: '', value: '', children: [] });
    //     this.options[i].text = res[i].n.split('#')[0];
    //     this.options[i].value = '#' + res[i].n.split('#')[1];
    //     // 镇
    //     for (let j in res[i].c) {
    //       // this.options[i].children=[]
    //       this.options[i].children[j] = { text: '', value: '', children: [] };
    //       this.options[i].children[j].text = res[i].c[j].n.split('#')[0];
    //       this.options[i].children[j].value = '#' + res[i].c[j].n.split('#')[1];

    //       // 村
    //       for (let k in res[i].c[j].a) {
    //         this.options[i].children[j].children[k] = { text: '', value: '' };
    //         this.options[i].children[j].children[k].text = res[i].c[j].a[k].split('#')[0];
    //         this.options[i].children[j].children[k].value = '#' + res[i].c[j].a[k].split('#')[1];
    //       }

    //     }

    //   }
    //   console.log(this.options, '区划');

    // }).catch(res => {
    //   console.log(res, 'xzqh');
    //   this.$toast.fail('区划信息获取失败')
    // })
  },
  methods: {
    onFinish ({
      selectedOptions
    }) {
      this.areaShow = false;
      let area = selectedOptions.map((option) => option.text)
      let area2 = selectedOptions.map((option) => option.text + option.value)
      this.city = area[0]
      this.street = area[1]
      this.areaName = area.join("/")
      console.log(area, area2)
    },
    showSelect (type, index) {
      if (type === "救助类型") this.kosekiTyle = ["特困人员供养", "农村最低生活保障", "城市最低生活保障"]
      this.kosekiTyleName = type
      this.showPicker = true
    },
    confirmType (value) {
      console.log(value)
      if (this.kosekiTyleName === '救助类型') this.helpClass = value
      this.showPicker = false;
    },
    // 确认查询按钮
    affirmSearch () {
      if (!this.areaName) return this.$toast("请选择行政区划")
      if (!this.helpClass) return this.$toast("请选择救助类型")
      console.log("is ok")
      this.$router.push("/InformationSuccour?city=" + this.city + "&street=" + this.street + "&type=" + this.helpClass)
    }
  },
}
</script>

<style scoped lang='less'>
.dbhc {
  display: flex;
  flex-direction: column;
  align-childrenlist: center;
  background-color: #efefef;
  min-height: 100vh;

  header {
    height: 88px;
    line-height: 100px;
    width: 100%;
    font-size: 36px;
    color: #ffffff;
    background: #3e80cc;
  }
  .selectButton {
    width: 100%;
    height: 1.125rem;
    line-height: 1.125rem;
    text-align: center;
    background-color: #fff;
    span {
      color: #1989fa;
      font-size: 0.375rem;
    }
  }
}
</style>

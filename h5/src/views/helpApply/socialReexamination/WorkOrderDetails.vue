<template>
  <div class="maxBox">
    <header>
      工单详情
    </header>
    <van-field v-model.trim="formData.content"
               autosize
               rows="1"
               type="textarea"
               name="工单内容"
               label="工单内容"
               placeholder="工单内容" />
    <van-field readonly
               clickable
               name="服务开始时间"
               :value="formData.startTime"
               label="服务开始时间"
               placeholder="点击选择服务开始时间"
               @click="showTime('服务开始时间')" />
    <van-field readonly
               clickable
               name="服务结束时间"
               v-model="formData.endTime"
               label="服务结束时间"
               placeholder="点击选择服务结束时间"
               @click="showTime('服务结束时间')"
               :rules="[{ required: true, message: '请填写服务结束时间' }]" />
    <!-- YYYY-MM-DD HH:mm:ss -->
    <van-popup v-model="showPicker"
               position="bottom">
      <van-datetime-picker type="datetime"
                           :min-date="new Date(2020, 0, 1)"
                           :max-date="new Date(2025, 10, 1)"
                           @confirm="onConfirm"
                           @cancel="showPicker = false" />
    </van-popup>
    <div class="typeface"><a href="#"
         @click="addGuardian">新增走访任务</a></div>
    <div v-for="(Item,Index) in formData.details"
         :key="Item.NO">
      <van-divider>走访任务{{ Index +1 }}</van-divider>
      <!-- 上门服务时间 -->
      <van-field v-model="Item.serviceTime"
                 readonly
                 clickable
                 name="上门服务时间"
                 label="上门服务时间"
                 placeholder="上门服务时间"
                 @click="showTime('上门服务时间',Index)" />
      <!-- 服务时长 -->
      <van-field v-model="Item.serviceDuration"
                 type="number"
                 label="服务时长"
                 placeholder="请输入服务时长（单位/分钟）" />
      <van-field v-model.trim="Item.detail"
                 autosize
                 rows="1"
                 type="textarea"
                 name="服务描述"
                 label="服务描述"
                 placeholder="请填写服务描述" />
      <div class="typeface"
           v-if='Index +1  === formData.details.length'>
        <a href="#"
           style="color:#FF976A"
           @click="deleteGuardian(Item)">删除服务记录</a>
      </div>
    </div>
    <div class="footBtn">
      <van-button block
                  style="backgroundColor:#3E80CC"
                  type="info"
                  @click="onSave">保存</van-button>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs"
import { createOrderApi } from "@/api/socialWorkStation"
export default {
  name: 'WorkOrderDetails',
  data () {
    return {
      formData: {
        personId: this.$route.query.personId,
        familyId: this.$route.query.familyId,
        content: '',
        startTime: '',
        endTime: '',
        details: [],
      },
      showPicker: false
    };
  },
  methods: {
    onSubmit (values) {
      console.log('submit', values);
    },
    // 新增走访任务
    addGuardian () {
      if (this.formData.details.length >= 20) return this.$toast('新增走访任务数量最多为20条')
      let visitNo = this.formData.details.length ? this.formData.details[this.formData.details.length - 1].visitNo + 1 : 1
      this.formData.details.push({
        serviceDuration: '',
        serviceTime: "",
        detail: "",
        visitNo,
      })
    },
    // 删除走访任务
    deleteGuardian (val) {
      // this.$toast, fail()
      this.formData.details = this.formData.details.filter(item => item.visitNo !== val.visitNo)
    },
    showTime (val, index) {
      this.arrIndex = index // 索引赋值
      this.option = val
      this.showPicker = true
    },
    onConfirm (val) {
      if (this.option === '服务开始时间') this.formData.startTime = dayjs(val).format("YYYY-MM-DD HH:mm:ss")
      if (this.option === '服务结束时间') this.formData.endTime = dayjs(val).format("YYYY-MM-DD HH:mm:ss")
      if (this.option === '上门服务时间') this.$set(this.formData.details[this.arrIndex], 'serviceTime', dayjs(val).format("YYYY-MM-DD HH:mm:ss"))
      this.showPicker = false // 关闭时间选择器
    },
    async onSave () {
      try {
        const result = await createOrderApi(this.formData)
        if (result.code !== 200) return this.$toast.fail(result.msg)
        this.$toast.success(result.msg)
        // this.$router.push('/reexaminationList')
        this.$router.go(-1)
      } catch (error) {
        console.log(error, "创建工单报错信息")
      }
    },

  },

}
</script>

<style scoped lang="less">
.maxBox {
  background-color: #f5f5f5;
  position: relative;
  margin-bottom: 1.875rem;
  .footBtn {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .typeface {
    background-color: #fff;
    font-size: 0.38rem;
    line-height: 1.2rem;
    a {
      color: #07c160;
    }
  }
  .addObj {
    width: 100px;
    height: 1rem;
    background-color: pink;
  }
  .deleteBtn {
    text-align: center;
  }
}
header {
  height: 88px;
  line-height: 100px;
  width: 100%;
  font-size: 36px;
  color: #ffffff;
  background: #3e80cc;
}
</style>

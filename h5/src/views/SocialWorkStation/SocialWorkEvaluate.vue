<template>
  <div class="maxBox">
    <van-nav-bar title="社工站工作人员评分" />
    <van-notice-bar left-icon="volume-o"
                    text="请给其社工站考核人员打分，黄色星号越多代表着社工站服务越好，星号越少代表社工站服务较差。" />
    <van-form ref='form'
              v-model="form">
      <van-field name="rate"
                 label="专业程度">
        <template #input>
          <van-rate v-model="form.professionalism"
                    color="#ffd21e"
                    void-icon="star"
                    :size="25"
                    void-color="#eee" />
        </template>
      </van-field>
      <van-field name="rate"
                 label="服务态度">
        <template #input>
          <van-rate v-model="form.service"
                    color="#ffd21e"
                    void-icon="star"
                    :size="25"
                    void-color="#eee" />
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round
                    block
                    type="info"
                    @click="onSave">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { visitPersonRateServiceApi } from "@/api/socialWorkStation"
export default {
  name: "SocialWorkEvaluate",
  data () {
    return {
      form: {
        professionalism: 4, // 专业程度
        service: 4, // 服务态度
        recordId: this.$route.query.recordId, // 服务态度
      },
      flag: false,
    }
  },
  created () {

  },
  methods: {
    async onSave () {
      try {
        if (this.flag) return this.$toast("请勿重复提交！")
        this.flag = true
        const result = await visitPersonRateServiceApi(this.form)
        if (result.code !== 200) return this.$toast.fail(result.msg)
        this.$toast.success(result.msg)
      } catch (error) {

      } finally {
        setTimeout(() =>
          this.flag = false, 3000)
      }
    }
  },
}
</script>

<style scoped lang='less'>
.maxBox {
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;
}
</style>

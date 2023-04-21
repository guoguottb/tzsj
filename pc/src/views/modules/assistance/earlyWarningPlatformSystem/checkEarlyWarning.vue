<template>
  <!-- 核对报告复核预警 -->
  <common-list :sKey="598"
               :type="'核对报告复核预警'"
               ref="commonList"
               @generateAReport="generateAReport"
               @submitAReport="submitAReport"
               :tableName="'核对报告复核预警'"></common-list>
</template>
<script>

import commonList from '@/views/modules/assistance/commonList'
import {
  buildThreeMonthNotHdReportFamilyApi,  // 生成三个月无核对报告家庭
  buildNotHdReportFamilyApi,  // 提交三个月无核对报告家庭
} from "@/api/unifiedProcessingCenter"
export default {
  data () {
    return {

    }
  },
  beforeRouteLeave (to, from, next) {
    sessionStorage.setItem('activeName', this.$children[0].activeName)
    next();
  },
  components: {
    commonList
  },
  methods: {
    // 生成三个月无核对报告家庭
    async generateAReport () {
      try {
        await buildThreeMonthNotHdReportFamilyApi({})
      } catch (error) {
        if (error.response.data.code !== 200) return this.$message.error(error.response.data.msg)
        this.$refs.commonList.getData();
        this.$message.success(error.response.data.msg)
      }
    },
    // 提交三个月无核对报告家庭
    async submitAReport () {
      try {
        await buildNotHdReportFamilyApi({})
      } catch (error) {
        if (error.response.data.code !== 200) return this.$message.error(error.response.data.msg)
        this.$message.success(error.response.data.msg)
      }
    }
  }
}
</script>
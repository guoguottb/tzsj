<template>
  <common-list :sKey="136"
               :type="'临时救助'"
               @operateButton="operateButton"
               :tableName="'申请'"></common-list>
</template>
<script>

import commonList from '../commonList'
export default {
  components: { commonList },
  data () {
    return {
      rowInfo: {}
    }
  },
  methods: {
    operateButton (rowInfo) {
      this.rowInfo = rowInfo
      if (process.env.NODE_ENV == "development") return this.$router.push(`supplementaryMaterials?id=${rowInfo.ab_id}`)
      this.$pushRouter({ path: generalConfig.defaultUrl + `/supplementaryMaterials?id=${rowInfo.ab_id}` })
    },
  }


}
</script>
<template>
  <common-list :sKey="424"
               :type="'残疾人名单'"
               :tableName="'残疾人名单'"></common-list>
</template>
<script>

import commonList from '../commonList'
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
  }
}
</script>
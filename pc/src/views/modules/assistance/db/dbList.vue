<template>
  <common-list :sKey="84"
               :type="'按户保'"
               :tableName="'申请'"></common-list>
</template>
<script>

import commonList from '../commonList'
export default {
  data () {
    return {

    }
  },
  beforeRouteLeave (to, from, next) {
    // console.log(this.$children[0].activeName);
    // console.log(this.$children[0].searchData);
    sessionStorage.setItem('activeName', this.$children[0].activeName)
    // sessionStorage.setItem('searchData',JSON.stringify(this.$children[0].searchData))
    next();
  },
  components: {
    commonList
  }
}
</script>
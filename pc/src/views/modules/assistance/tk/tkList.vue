<template>
  <common-list :sKey="127"
               :type="'特困供养'"
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
    sessionStorage.setItem('activeName', this.$children[0].activeName);
    // sessionStorage.setItem('searchData',JSON.stringify(this.$children[0].searchData));
    next();
  },
  components: {
    commonList
  }
}
</script>
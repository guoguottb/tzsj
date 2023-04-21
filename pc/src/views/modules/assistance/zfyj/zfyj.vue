<template>
  <div>
    <common-list :sKey="787"
                 :type="'住房补助'"
                 :tableName="'住房补助'"></common-list>
  </div>

</template>
<script>

import commonList from '../commonList'
export default {
  name: "zfyj",
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
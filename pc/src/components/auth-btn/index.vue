<template>
  <el-button :type="type"
             :size="size"
             @click="handleClick"
             :icon="icon"
             :style="domCss"
             v-if="getStoreAuthFlag"
             for="authUri">
    <slot></slot>
  </el-button>
</template>
<script>
/**
 * @version 0.0.1
 * 该组件适用 单个非重复的按钮
 * 但是如果需要鉴权的按钮在循环里(列表上) 回多发N次请求
 * @version 0.0.2
 * 处理循环多发请求的问题 搁置--2019-07-12 09:43:17
 */
export default {
  name: 'auth-btn',
  props: {
    authUri: {
      type: String
    },
    prop: {
      type: String
    },
    domCss: {
      type: String
    },
    type: {
      type: String
    },
    size: {
      type: String
    },
    icon: {
      type: String
    }

  },
  data () {
    return {
      authFlag: false
    }
  },
  components: {},
  computed: {
    getStoreAuthFlag () {
      return this.$store.state.auth.grantBtns.get(this.authUri)
    }
  },
  mounted () {
    // 待测试
    this.getBtnAuthPro()
    this.authFlag = this.getStoreAuthFlag
  },
  created () {
  },
  watch: {
    getStoreAuthFlag (val) {
      if (val !== undefined) {
        this.authFlag = this.$store.state.auth.grantBtns.get(this.authUri)
      }
    }
  },
  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    },
    getBtnAuthPro () {
      let authCheck = this.getStoreAuthFlag
      if (authCheck === undefined) {
        this.$store.commit('auth/pushGrantBtnItem', { authUri: this.authUri, flag: false })
        this.getBtnForAjax()
      } else {
        this.authFlag = authCheck
      }
    },
    /* getBtnAuth () {
      let authCheck = this.$store.state.auth.grantBtns.get(this.authUri)
      if (authCheck === undefined) {
        this.getBtnForAjax()
      } else {
        this.authFlag = authCheck
      }
    }, */
    getBtnForAjax () {
      this.$http({
        url: this.$http.adornUrl(`permit/check?uri=${this.authUri}`),
        method: 'get',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
        .then(({ data }) => {
          if (data.status === 0) {
            this.$store.commit('auth/pushGrantBtnItem', { authUri: this.authUri, flag: data.data })
            this.authFlag = data.data
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
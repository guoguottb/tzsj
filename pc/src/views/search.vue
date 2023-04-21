<template>
  <div class="new-rule-form">
    <CreateRule :object="object"></CreateRule>
  </div>
</template>

<script>
import CreateRule from './template'
export default {
  name: 'NewRuleForm',
  components: {
    CreateRule
  },
  data () {
    return {
      object: {
        rules: 'and',
        list: [{ types: '', site: '', symbol: '', rules: '', type: 'condition', isTop: true }]
      }
    }
  }
}
</script>
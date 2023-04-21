import { getCityOptionApi } from '@/api'
export default {
  data() {
    return {
      props: {
        checkStrictly: true,
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node // 获取当前node对象中的level属性
          let pId = '0'
          if (level > 0) {
            let value = node.value
            if (value) {
              let values = value.split('#')
              pId = values.length > 1 ? values[1] : '0'
            }
          }
          getCityOptionApi(pId)
            .then((res) => {})
            .catch((res) => {
              const nodes = res.response.data
              nodes.forEach((item) => {
                item.value = item.cs_ex2 + '#' + item.cs_ex1
                item.label = item.cs_ex2
                item.leaf = level >= 2 //判断是否为末尾节点，这个地方是0,1,2三级
              })
              resolve(nodes)
            })
        },
      },
    }
  },
  methods: {
    // 返回按钮
    returnPreviousPage() {
      this.$router.go(-1)
      if (process.env.NODE_ENV != 'development') this.$router.go(-1)
    },
  },
}

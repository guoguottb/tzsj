// 使用方法请参照“左树右表格页面”
<template>
  <ul id="menu" class="menu" v-show="menuShow">
    <!-- 放<li>标签 -->
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'right-menu',
  props: ['menuVisible'],
  data() {
    return {
      menuShow: this.menuVisible
    }
  },
  methods: {
    handleShow(event) {
      this.menuShow = false
      this.menuShow = true
      let menu = document.querySelector('#menu')
      menu.style.left = event.clientX + 'px'
      menu.style.top = event.clientY + 'px'
      document.addEventListener('click', this.foo)
    },
    foo() {
      this.menuShow = false
      document.removeEventListener('click', this.foo)
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  height: auto;
  width: 127px;
  position: fixed;
  border: 1px solid #ccc;
  background-color: #fff;
  z-index: 15;
  box-shadow: 0px 0px 7px #aaa;
  user-select: none;
  .menu-item {
    display: block;
    line-height: 26px;
    font-size: 12px;
    padding-left: 5px;
    i {
      margin-right: 10px;
      &[type=primary] {
        color: #409eff;
      }
      &[type=success] {
        color: #67C23A;
      }
      &[type=danger] {
        color: #e93c43;
      }
    }
    &:hover {
      background-color: #409eff;
      color: white;
      cursor: pointer;
      transition: all 0.1s ease;
      i {
        color: white;
      }
    }
  }
  .line {
    display: block;
    border-bottom: 1px solid #dddddd;
    height: 1px;
  }
}
</style>
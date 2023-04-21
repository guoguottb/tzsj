<template>
  <ul id="menu" class="menu" v-show="menuShow">
    <!-- 放<li>标签 -->111
    <slot></slot>
  </ul>
</template>
<script>
export default {
  props: ['menuVisible'],
  data() {
    return {
      menuShow: this.menuVisible
    }
  },
  methods: {
    handleShow(MouseEvent) {
      this.menuShow = false
      this.menuShow = true
      var menu = document.querySelector('#menu')
      menu.style.left = MouseEvent.clientX + 'px'
      menu.style.top = MouseEvent.clientY + 'px'
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
}
.menu-item {
  display: block;
  line-height: 26px;
  font-size: 12px;
  padding-left: 5px;
}
li:hover {
  background-color: #409eff;
  color: white;
  cursor: default;
  transition: all 0.1s ease
}
</style>
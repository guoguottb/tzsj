<template>
  <div class="sidebar g-menu-texture">
    <el-menu class="sidebar-el-menu"
             :collapse="collapse"
             menu-trigger="click">
      <template v-for="item in items">
        <!-- 左侧菜单 -->
        <template v-if="item.children">
          <el-submenu :index="item.menuId"
                      :key="item.menuId">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.menuName }}</span>
              <!-- <span slot="title" @click="ceshi(item.menuName)">{{ item.menuName }}1</span> -->
              <!-- <span slot="title"  @click="$router.push({ name: item.requestAction.replace(/^\//, '')})">{{ item.menuName }}1</span> -->
            </template>
            <siderbarItem :item="item"></siderbarItem>
            <!-- <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.to" :key="subItem.to" class="g-submenu">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.to" class="g-submenu">
                  {{ threeItem.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.to" :key="subItem.to" class="g-submenu">
                {{ subItem.title }}
              </el-menu-item>
            </template> -->

          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.menuId"
                        :key="item.menuId"
                        @click="$router.push({ name: item.requestAction.replace(/^\//, '')})">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.menuName }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>

import bus from '../common/bus';
import siderbarItem from './SidebarItem'
export default {
  props: {
    items: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      collapse: false,
      headBanner: false,
      horizontal: ''
    }
  },
  components: {
    siderbarItem
  },
  methods: {
    ceshi (menu) {
      console.log('父级菜单', menu);
    },
    handleShow () {
      generalConfig.hasTopLayout === undefined ? this.headBanner = true : this.headBanner = generalConfig.hasTopLayout;
      if (this.headBanner) {
        this.horizontal = 'horizontal'
      }
    },
    // 通过menuId与动态(菜单)路由进行匹配跳转至指定路由
    gotoRouteHandle (menu) {
      var route = this.dynamicMenuRoutes.filter(item => item.meta.menuId === menu.menuId)
      if (route.length >= 1) {
        this.$router.push({ name: route[0].name })
      }
    }
  },
  computed: {
    onRoutes () {
      // 已改写成只需匹配到一级路由即可匹配菜单
      return this.$route.matched[1].path
    },

  },
  created () {
    this.handleShow()
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg;
    })
  }
}
</script>
<style lang="scss" scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 50px;
  bottom: 0;
  overflow-y: auto;
  overflow-x: scroll;
  z-index: 6;
  border-right: 1px solid #d0d0d0;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
// TODO：菜单项有影响
/deep/ .el-menu-item,
.el-submenu__title {
  height: 50px;
  line-height: 50px;
}
/deep/ .el-menu {
  border-right: none;
}
@media (max-width: 1400px) {
  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>

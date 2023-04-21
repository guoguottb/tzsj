<template>
  <div>
      <template v-for="subItem in item.children">
        <el-submenu v-if="subItem.children" :index="subItem.menuId" :key="subItem.menuId" class="g-submenu" >
          <template slot="title">{{ subItem.menuName }}</template>
          <div v-for="(threeItem,i) in subItem.children" :key="threeItem.menuId" :index="threeItem.menuId" class="g-submenu">
            <el-submenu v-if="threeItem.children" :index="threeItem.requestAction" :key="threeItem.menuId" class="g-submenu" @click="$router.push({ name: threeItem.requestAction.replace(/^\//, '')})">
              <template slot="title">{{ threeItem.menuName}}</template>
              <sidebarItem :item="threeItem"></sidebarItem>
            </el-submenu>
            <template v-else>
              <el-menu-item :index="threeItem.menuId" :key="threeItem.menuId" class="g-submenu" @click="$router.push({ name: threeItem.requestAction.replace(/^\//, '')})">{{ threeItem.menuName }}</el-menu-item>
            </template>
          </div>
        </el-submenu>
        <el-menu-item
          v-else
          :index="subItem.menuId"
          :key="subItem.menuId"
          class="g-submenu"
          @click="$router.push({ name: subItem.requestAction.replace(/^\//, '')})"
        >{{ subItem.menuName }}</el-menu-item>
      </template>
  </div>
</template>

<script>
export default {
  props:['item'],
  name: "sidebarItem",
  data() {return{}}
};
</script>

<style lang="css" scoped>
</style>

<template>
  <!-- 旧版侧边栏组件 -->
  <div class="sidebar-container" :class="{collapse: collapse}">
    <div id="bar-level-1">
      <div class="search" v-if="!collapse">
        <el-input type="text" placeholder="搜索" v-model="search" @input="handleSearch" clearable></el-input>
      </div>
      <div class="hr" v-if="!collapse"></div>
      <div id="bar-level-1-dropright">
        <div class="bar-item" v-for="(item, index) in barList" :key="item.title"
          :class="{'bar-item-active': item.active, 'strong': item.show}" @mouseenter="handleBarLevel2(index)"
          @click="handleBarLevel2(index);addActive1(item)">
          <router-link tag="div" v-if="!item.subs" :to="item.to" class="bar-item-inner">
            <i :class="item.icon"></i>
            <span v-if="!collapse">{{item.title}}</span>
            <i class="el-icon-arrow-right icon-pull-right" v-if="item.subs&&!collapse"></i>
          </router-link>
          <div v-else class="bar-item-inner">
            <i :class="item.icon"></i>
            <span v-if="!collapse">{{item.title}}</span>
            <i class="el-icon-arrow-right icon-pull-right" v-if="item.subs&&!collapse"></i>
          </div>
        </div>
      </div>
    </div>
    <div id="bar-level-2">
      <div id="bar-level-2-dropright">
        <div class="bar-item" v-for="(item, index) in barLevel2" :key="item.title"
          :class="{'bar-item-active': item.active, 'strong': item.show}" @mouseenter="handleBarLevel3(index)"
          @click="handleBarLevel3(index);addActive2(item)">
          <router-link tag="div" v-if="!item.subs" :to="item.to">
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
            <i class="el-icon-arrow-right icon-pull-right" v-if="item.subs"></i>
          </router-link>
          <div v-else>
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
            <i class="el-icon-arrow-right icon-pull-right" v-if="item.subs"></i>
          </div>
        </div>
      </div>
    </div>
    <div id="bar-level-3">
      <div id="bar-level-3-dropright">
        <div class="bar-item" v-for="(item, index) in barLevel3" :key="item.title"
          :class="{'bar-item-active': item.active, 'strong': item.show}" @click="addActive3(item, index)">
          <router-link tag="div" v-if="!item.subs" :to="item.to">
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import bus from '../common/bus'

//随着组件的增多和双侧边栏的使用，侧边栏配置也越来越复杂，特将其抽离为js文件
export default {
  data() {
    return {
      search: '',
      collapse: false,
      barLevel2Show: false,
      barLevel3Show: false,
      barLevel2: [],
      barLevel3: [],
      barList: siderbarItem,
      tempBarList: [],
      theme: this.$store.state.theme
    }
  },
  created() {
    bus.$on('collapse', msg => {
      this.collapse = msg;
    })
    this.matchRoute()
  },
  mounted() {
    this.handleSiderBar()
    this.handleSearch()
  },
  computed: {
    thatTheme() {
      return this.$store.state.theme
    }
  },
  watch: {
    // 路由发生变化时，侧边栏重新匹配高亮
    '$route.path'() {
      this.matchRoute()
    }
  },
  methods: {
    handleSearch() {
      if (this.search == '') {
        for (let i = 0; i < this.barList.length; i++) {
          this.barList[i].show = false
          if (this.barList[i].subs != undefined) {
            for (let j = 0; j < this.barList[i].subs.length; j++) {
              this.barList[i].subs[j].show = false
              if (this.barList[i].subs[j].subs != undefined) {
                for (let k = 0; k < this.barList[i].subs[j].subs.length; k++) {
                  this.barList[i].subs[j].subs[k].show = false
                }
              }
            }
          }
        }
        return
      }
      let flag = true
      for (let i = 0; i < this.barList.length; i++) {
        if (this.barList[i].title.indexOf(this.search) != -1) {
          flag = false
          this.barList[i].show = true
        } else {
          this.barList[i].show = false
        }
        if (this.barList[i].subs != undefined) {
          for (let j = 0; j < this.barList[i].subs.length; j++) {
            if (this.barList[i].subs[j].title.indexOf(this.search) != -1) {
              flag = false
              this.barList[i].subs[j].show = true
              this.barList[this.barList[i].subs[j].sup].show = true
            } else {
              this.barList[i].subs[j].show = false
            }
            if (this.barList[i].subs[j].subs != undefined) {
              for (let k = 0; k < this.barList[i].subs[j].subs.length; k++) {
                if (this.barList[i].subs[j].subs[k].title.indexOf(this.search) != -1) {
                  flag = false
                  this.barList[i].subs[j].subs[k].show = true
                  this.barList[this.barList[i].subs[j].sup].show = true
                  this.barList[i].subs[this.barList[i].subs[j].subs[k].sup].show = true
                } else {
                  this.barList[i].subs[j].subs[k].show = false
                }
              }
            }
          }
        }
      }
      if (flag == true) {
        // 查无结果
      }
    },
    handleSiderBar() {
      $(() => {
        // 侧边栏
        // 鼠标移入一级目录显示二级目录，鼠标离开隐藏二级目录
        $("#bar-level-1-dropright").mouseenter(() => {
          $("#bar-level-2").show()
        }).mouseleave(() => {
          $("#bar-level-2").hide()
        })
        $("#bar-level-2").mouseenter(() => {
          $("#bar-level-2").show()
        }).mouseleave(() => {
          $("#bar-level-2").hide()
        })
        $("#bar-level-2-dropright").mouseenter(() => {
          $("#bar-level-3").show()
        }).mouseleave(() => {
          $("#bar-level-3").hide()
        })
        $("#bar-level-3").mouseenter(() => {
          $("#bar-level-2").show()
          $("#bar-level-3").show()
        }).mouseleave(() => {
          $("#bar-level-2").hide()
          $("#bar-level-3").hide()
        })
      })
    },
    handleBarLevel2(index) {
      if (this.barList[index].subs == undefined) {
        $("#bar-level-2").hide()
      } else {
        $("#bar-level-2").show()
      }
      this.barLevel2 = this.barList[index].subs
      try {
        this.barLevel2.sup = index
      } catch (e) {}
    },
    handleBarLevel3(index) {
      if (this.barLevel2[index].subs == undefined) {
        $("#bar-level-3").hide()
      } else {
        $("#bar-level-3").show()
      }
      this.barLevel3 = this.barLevel2[index].subs
      try {
        this.barLevel3.sup = index
      } catch (e) {}
    },
    // 将active属性置为false
    clearAllActive() {
      for (let i = 0; i < this.barList.length; i++) {
        this.barList[i].active = false
        if (this.barList[i].subs != undefined) {
          for (let j = 0; j < this.barList[i].subs.length; j++) {
            this.barList[i].subs[j].active = false
            if (this.barList[i].subs[j].subs != undefined) {
              for (let k = 0; k < this.barList[i].subs[j].subs.length; k++) {
                this.barList[i].subs[j].subs[k].active = false
              }
            }
          }
        }
      }
    },
    addActive1(item) {
      this.clearAllActive()
      item.active = true
    },
    addActive2(item) {
      this.clearAllActive()
      for (let i = 0; i < this.barLevel2.length; i++) {
        this.barLevel2[i].active = false
        if (this.barLevel2[i].subs != undefined) {
          for (let j = 0; j < this.barLevel2[i].subs.length; j++) {
            this.barLevel2[i].subs[j].active = false
          }
        }
      }
      for (let i = 0; i < this.barList.length; i++) {
        this.barList[i].active = false
      }
      this.barList[this.barLevel2.sup].active = true
      item.active = true
    },
    addActive3(item, index) {
      this.clearAllActive()
      for (let i = 0; i < this.barLevel3.length; i++) {
        this.barLevel3[i].active = false
      }
      for (let i = 0; i < this.barLevel2.length; i++) {
        this.barLevel2[i].active = false
      }
      this.barLevel2[this.barLevel3.sup].active = true
      for (let i = 0; i < this.barList.length; i++) {
        this.barList[i].active = false
      }
      this.barList[this.barLevel2.sup].active = true
      item.active = true
    },
    handleVisited(index) {
      this.barItemActive[index] = false
    },
    // 侧边栏根据路由匹配高亮
    matchRoute() {
      this.clearAllActive()
      let path = this.$route.path.substr(1, this.$route.path.length)
      for (let i = 0; i < this.barList.length; i++) {
        // 匹配一级目录
        if (this.barList[i].to == path) {
          this.barList[i].active = true
        }
        if (this.barList[i].subs != undefined) {
          for (let j = 0; j < this.barList[i].subs.length; j++) {
            // 匹配二级目录
            if (this.barList[i].subs[j].to == path) {
              this.barList[i].subs[j].active = true
              this.barList[i].active = true
            }
            if (this.barList[i].subs[j].subs != undefined) {
              for (let k = 0; k < this.barList[i].subs[j].subs.length; k++) {
                // 匹配三级目录
                if (this.barList[i].subs[j].subs[k].to == path) {
                  this.barList[i].subs[j].subs[k].active = true
                  this.barList[i].subs[j].active = true
                  this.barList[i].active = true
                }
              }
            }
          }
        }
      }
    }
  }
}
</script>
<style lang="css" scoped>
.sidebar-outer {
  background-color: #31333d;
  height: 100vh;
}
.hr {
  border-bottom: 1px solid rgba(152, 152, 152, 0.30);
  margin: 0 5px;
  margin-bottom: 30px;
}
.sidebar-container {
  width: 600px;
  height: 100vh;
}
#bar-level-1, #bar-level-2, #bar-level-3 {
  transition: 0.3s ease;
  width: 200px;
  height: 100vh;
  position: absolute;
  z-index: 7;
  background-color: rgba(39, 41, 51, 0.9);
  overflow: hidden;
}
#bar-level-2, #bar-level-3 {
  display: none;
}
#bar-level-1 {
  background-color: #31333d;
  left: 0;
  box-shadow: 1px 0 4px rgba(0, 0, 0, 0.2);
}
#bar-level-2 {
  left: 200px;
}
#bar-level-3 {
  left: 400px;
}
.collapse #bar-level-1 {
  transition: 0.3s ease;
  width: 65px;
}
.collapse #bar-level-2 {
  transition: 0.3s ease;
  left: 65px;
}
.collapse #bar-level-3 {
  transition: 0.3s ease;
  left: 265px;
}
.bar-item {
  font-size: 14px;
  color: white;
  padding: 5px 10px;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  overflow: hidden;
  transition: 0.3s ease;
}
.bar-item i {
  margin: 0 5px;
}
.bar-item:hover {
  background-color: rgba(0, 0, 0, 0.3);
  transition: 0.3s ease;
}
.bar-item-active {
  background-color: rgba(0, 0, 0, 0.3);
  color: #43aaf8;
}
.icon-pull-right {
  float: right;
  line-height: inherit;
}
.sidebar-container {
  user-select: none;
}
.search>>>.el-input input {
  height: 30px;
  width: 170px;
  border-radius: 5px;
  border: none;
  color: white;
  margin: 20px 10px;
  padding-left: 10px;
  background-color: #22242b;
  transition: width 0.3s ease;
}
.search>>>.el-input__suffix {
  right: 25px;
}
.strong {
  font-weight: bold;
  background-color: rgb(235, 129, 0);
  transition: 0.3s ease;
  color: white;
}
.strong:hover {
  background-color: rgb(235, 129, 0);
}
</style>

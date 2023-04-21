<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <el-tooltip effect="dark"
                content="侧边栏折叠">
      <div class="collapse-btn"
           @click="collapseChage">
        <i v-if="!collapse"
           class="el-icon-s-fold"></i>
        <i v-else
           class="el-icon-s-unfold"></i>
      </div>
    </el-tooltip>
    <!-- <div class="logo">UOC统一鉴权中心</div> -->
    <div class="logo">
      <span @click='goBack("/Home2")'
            style="cursor: pointer;">泰州市智慧民政综合服务平台</span> <span> / </span>
      <span @click="goBack('/home')"
            style="cursor: pointer;">业务办理</span>
    </div>

    <div class="header-tabs-con">
      <v-sidebar :items="listitmes"
                 :class="{'head-banner':headBanner}"
                 v-if="listitmes"></v-sidebar>
      <!-- <div v-if="!listitmes">
        <a class="header-tab" href="http://10.10.4.129/source-ui/#/dashboard">UI组件库</a>
        <a class="header-tab is-active" href="http://10.10.4.129/ue_template/#/dashboard">UE模板库</a>
        <a class="header-tab" style="cursor: default">UX体验库</a>
        <a class="header-tab" href="http://10.10.4.88:4999/web/#/9?page_id=391" target="_blank">开发技巧</a>
      </div> -->

    </div>
    <div class="header-right">
      <div class="header-user-con">
        <transition name="slide">
          <div class="search-container"
               v-show="searchShow">
            <el-input v-model="searchInput"
                      placeholder="请输入关键字">
              <el-button slot="append"
                         icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </transition>
        <i class="el-icon-search search-icon"
           @click="searchShow = !searchShow"></i>
        <i class="el-icon-warning-outline search-icon"></i>
        <i class="el-icon-full-screen search-icon"
           @click="handleFullScreen"></i>
        <el-popover placement="bottom"
                    trigger="click"
                    width="300">
          <el-tabs v-model="activeName">
            <el-tab-pane label="通知"
                         name="notice">
              <div class="message-con">
                <div class="message"
                     v-for="item in messageData"
                     :key="item.id">
                  <img src="@/assets/img/avator.jpg">
                  <div class="text">
                    <h3>{{item.message}}</h3>
                    <p>{{item.time}}</p>
                  </div>
                  <div style="clear: both"></div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="消息"
                         name="message">
              <div class="message-con">
                <div class="message"
                     v-for="item in messageData2"
                     :key="item.id">
                  <img src="@/assets/img/avator.jpg">
                  <div class="text">
                    <h3>{{item.message}}</h3>
                    <p>{{item.time}}</p>
                  </div>
                  <div style="clear: both"></div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
          <i class="el-icon-message-solid search-icon"
             slot="reference"></i>
        </el-popover>
        <!-- <el-dropdown trigger="click">
          <i class="el-icon-brush search-icon"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleThemeChange('ele')">默认主题</el-dropdown-item>
            <el-dropdown-item @click.native="handleThemeChange('kus')">淡雅绿色</el-dropdown-item>
            <el-dropdown-item @click.native="handleThemeChange('orange')">炫酷橙色</el-dropdown-item>
            <el-dropdown-item @click.native="handleThemeChange('red')">热情红色</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
        <!-- 用户头像 -->
        <el-dropdown trigger="click">
          <div class="avator-con">
            <div class="avator">
              <img src="@/assets/img/avator.jpg">
            </div>
            <p class="user-name">{{userName}}</p>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span @click="logout">注销</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import bus from '../common/bus';
import vSidebar from './Sidebar.vue';
import Vue from 'vue'
import axios from 'axios'
export default {
  components: {
    vSidebar,
  },
  data () {
    return {
      headBanner: false,
      collapse: false,
      fullscreen: false,
      name: '',
      userName: '',
      message: 0,
      sideStyle: false,
      tagTheme: this.$store.state.tagTheme,
      searchInput: '',
      searchShow: false,
      animate: true,
      globalTheme: this.$store.state.globalTheme,
      activeName: 'notice',
      messageData: [{
        id: 0,
        name: '张三',
        message: '张三邀请您参加会议',
        time: '05-08 14:33'
      },
      {
        id: 1,
        name: '李四',
        message: '李四邀请您参加会议',
        time: '05-03 14:03'
      },
      {
        id: 2,
        name: '王五',
        message: '王五邀请您参加会议',
        time: '05-12 18:33'
      },
      {
        id: 3,
        name: '刘备',
        message: '刘备邀请您参加会议',
        time: '05-08 04:33'
      },
      ],
      messageData2: [{
        id: 1,
        name: '李四',
        message: '李四邀请您参加会议',
        time: '05-03 14:03'
      },
      {
        id: 2,
        name: '王五',
        message: '王五邀请您参加会议',
        time: '05-12 18:33'
      },
      {
        id: 3,
        name: '刘备',
        message: '刘备邀请您参加会议',
        time: '05-08 04:33'
      },
      ],
      items: "",
      listitmes: ''
    }
  },
  computed: {
    username () {
      let username = localStorage.getItem('ms_username');
      console.log(username);
      return username ? username : this.name;
    }
  },
  methods: {
    // 首页跳转事件
    goBack (url) {
      this.$router.push({
        path: url
      })
    },

    handleShow () {
      generalConfig.hasTopLayout === undefined ? this.headBanner = true : this.headBanner = generalConfig.hasTopLayout;
    },
    // 用户名下拉菜单选择事件
    handleCommand (command) {
      if (command == 'loginout') {
        localStorage.removeItem('ms_username');
        this.$router.push('/login');
      }
    },

    // 侧边栏折叠
    collapseChage () {
      this.collapse = !this.collapse;
      bus.$emit('collapse', this.collapse);
    },

    handleSideStyle () {
      bus.$emit('sideStyle', this.sideStyle)
    },

    handleThemeChange (value) {
      this.$store.commit('SET_GLOBAL_THEME', value)
    },

    handleTagThemeChange () {
      this.$store.commit('SET_TAG_THEME', this.tagTheme)
    },

    // 全屏事件
    handleFullScreen () {
      let element = document.documentElement;
      if (this.fullscreen == true) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen
    },

    handleAnimate () {
      if (this.animate == true) {
        this.$store.commit('SET_ANIMATE', 'move')
      } else {
        this.$store.commit('SET_ANIMATE', '')
      }
    },

    // 注销登录
    logout () {
      sessionStorage.removeItem("charName")
      sessionStorage.removeItem("GREEN-CHANNEL-AUTH")
      sessionStorage.removeItem("charId")
      sessionStorage.removeItem("token")
      this.$message.info('注销成功')
      this.$router.push({ name: 'login' })
    }
  },

  created () {
    this.userName = sessionStorage.getItem("charName");
    // console.log(this.userName,'用户名');
    this.handleShow()
    // this.items =JSON.parse(JSON.stringify(items)) ;
    // this.listitmes = items;
    // this.listitmes = this.items;
    let menuList = JSON.parse(sessionStorage.getItem(generalConfig.menuListName))
    this.items = menuList
    this.listitmes = menuList
    bus.$on('collapse', msg => {
      this.collapse = msg;
    })
  },

  mounted () {
    bus.$emit('collapse', false);
  }

};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  font-size: 22px;
  color: #fff;
  z-index: 8;
  user-select: none;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 50px;
}
.collapse-btn:hover {
  background-color: inherit;
}
.header .logo {
  float: left;
  line-height: 50px;
  font-size: 16px;
  font-weight: bolder;
}
.header-tabs-con {
  float: left;
  line-height: 50px;
  font-size: 14px;
  margin-left: 20px;
}
.header-tab {
  display: inline-block;
  padding: 0 10px;
  color: white;
  text-decoration: none;
}
.header-tab.is-active {
  background-color: #337ecc;
}
.header-tab:hover {
  background-color: #337ecc;
}
.header-right {
  float: right;
  padding-right: 20px;
}
.header-user-con {
  display: flex;
  height: 50px;
  align-items: center;
}
.search-container {
  margin-right: 20px;
}
.search-icon {
  margin: 0 10px;
  cursor: pointer;
  font-size: 22px;
  color: white;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.slide-enter-active,
.slide-leave-active {
  transition: 0.3s ease;
}
.slide-enter-to,
.slide-leave {
  opacity: 1;
  transform: translateX(0);
}
</style>
<style lang="scss" scoped>
.el-dropdown-menu.el-popper.el-dropdown-menu--small {
  li span {
    display: inline-block;
    width: 100px;
  }
}
.header {
  background-color: #3687e1;
}
.header {
  /deep/ .el-input__inner:focus {
    border: 1px solid #dcdfe6;
  }
}
.option {
  cursor: pointer;
  color: white;
}
.avator-con {
  cursor: pointer;
  margin-left: 5px;
}
.avator {
  border-radius: 50%;
  overflow: hidden;
  width: 30px;
  height: 30px;
  display: inline-block;
  img {
    width: 100%;
  }
}
.user-name {
  display: inline-block;
  position: relative;
  bottom: 9px;
  color: white;
  margin-left: 10px;
}
.message-con {
  overflow-y: scroll;
  height: 500px;
  .message {
    height: 60px;
    img {
      width: 45px;
      height: 45px;
      float: left;
      border-radius: 50%;
    }
    .text {
      float: left;
      width: 230px;
      height: 55px;
      margin-left: 15px;
      margin-top: 5px;
      h3 {
        font-weight: normal;
        font-size: 14px;
      }
    }
  }
}
</style>

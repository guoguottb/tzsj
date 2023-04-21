<template>
  <!-- 旧版标签栏，由于使用频率较低，且占用空间较大，已弃用 (本地还在用)-->
  <div :class="tagTheme" v-if="showTags">
    <ul>
      <template v-for="(item, index) in tagsList">
        <router-link :to="item.path" class="tags-li" :class="{'active': isActive(item.path)}" :key="index" tag="li"
          v-if="item.path.substr(0, 5) != '/http'">
          {{item.title}}
          <span class="tags-li-icon" @click.stop="closeTags(index)"><i class="el-icon-close"></i></span>
        </router-link>
      </template>
    </ul>
    <div class="tags-close-box" v-if="tagTheme == 'tags'">
      <el-dropdown @command="handleTags">
        <el-button size="mini" type="primary">
          标签选项<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu size="small" slot="dropdown">
          <el-dropdown-item command="other">关闭其他</el-dropdown-item>
          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import bus from './bus';
export default {
  data() {
    return {
      tagsList: []
    }
  },
  methods: {
    isActive(path) {
      return path === this.$route.fullPath;
    },
    // 关闭单个标签
    closeTags(index) {
      if (this.tagsList.length == 1) {
        return
      }
      const delItem = this.tagsList.splice(index, 1)[0];
      const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
      if (item) {
        delItem.path === this.$route.fullPath && this.$router.push(item.path);
      } else {
        this.$router.push('/');
      }
    },
    // 关闭全部标签
    closeAll() {
      this.tagsList = [];
      this.$router.push({name:'home'});
    },
    // 关闭其他标签
    closeOther() {
      const curItem = this.tagsList.filter(item => {
        return item.path === this.$route.fullPath;
      })
      this.tagsList = curItem;
    },
    // 设置标签
    setTags(route) {
      const isExist = this.tagsList.some(item => {
        return item.path === route.fullPath;
      })
      if (!isExist) {
        if (this.tagsList.length >= 8) {
          this.tagsList.shift();
        }
        let name =  route.matched[1].components.default && route.matched[1].components.default.name
        this.tagsList.push({
          title: route.meta.title,
          path: route.fullPath,
          name: name ? name : ''
        })
      }
      bus.$emit('tags', this.tagsList);
    },
    handleTags(command) {
      command === 'other' ? this.closeOther() : this.closeAll();
    }
  },
  computed: {
    showTags() {
      return this.tagsList.length > 0;
    },
    tagTheme() {
      if (this.$store.state.tagTheme == true) {
        return 'tags-plus'
      } else {
        return 'tags'
      }
    }
  },
  watch: {
    $route(newValue, oldValue) {
      this.setTags(newValue);
    }
  },
  created() {
    this.setTags(this.$route);
    // 监听关闭当前页面的标签页
    bus.$on('close_current_tags', () => {
      for (let i = 0, len = this.tagsList.length; i < len; i++) {
        const item = this.tagsList[i];
        if (item.path === this.$route.fullPath) {
          if (i < len - 1) {
            this.$router.push(this.tagsList[i + 1].path);
          } else if (i > 0) {
            this.$router.push(this.tagsList[i - 1].path);
          } else {
            this.$router.push('/');
          }
          this.tagsList.splice(i, 1);
          break;
        }
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.tags {
  position: relative;
  height: 30px;
  overflow: hidden;
  background: #fff;
  padding-right: 120px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  z-index: 4;
  ul {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin-left: 10px;
  }
  .tags-li {
    float: left;
    margin: 3px 5px 2px 3px;
    border-radius: 3px;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 23px;
    line-height: 23px;
    border: 1px solid #e9eaec;
    background: #fff;
    padding: 0 5px 0 12px;
    vertical-align: middle;
    color: #666;
  }
  .tags-li:not(.active):hover {
    background: #f8f8f8;
  }
  .tags-li.active {
    color: #fff;
    border: 1px solid #409EFF;
    background-color: #409EFF;
  }
  .tags-li-title {
    float: left;
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #666;
  }
  .tags-li.active .tags-li-title {
    color: #fff;
  }
  .tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 110px;
    height: 30px;
    background: #fff;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
    z-index: 10;
  }
}
.tags-plus {
  height: 46px;
  width: 100%;
  background: #fff;
  white-space: nowrap;
  border: {
    bottom: 2px solid white
  }
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12),
  0 0 3px 0 rgba(0, 0, 0, .04);
  overflow-x: auto;
  overflow-y: hidden;
  user-select: none;
  li.tags-li {
    display: inline-block;
    cursor: pointer;
    height: 44px;
    line-height: 44px;
    color: #909399;
    font-size: 14px;
    padding: 0 20px;
    border: {
      bottom: 2px solid white
    }
    &:first-of-type {
      margin-left: 20px;
    }
    &.active {
      border-bottom: 2px #999999 solid;
      border: {
        bottom: 2px solid #409eff
      }
      color: black
    }
    li {
      list-style: none;
      display: inline-block
    }
    .tags-li-icon {
      &:hover {
        background-color: #e9eaec;
        border-radius: 50%;
      }
    }
  }
  a:active {
    color: inherit;
  }
  /deep/ .el-scrollbar__wrap {
    overflow-y: hidden;
  }
}
</style>

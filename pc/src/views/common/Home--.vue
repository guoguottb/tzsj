<template>
  <div class="wrapper" id="wrapper" v-if="shows">
    <div v-if="show">
      <!-- 头部组件 -->
      <v-head ref="header"></v-head>
      <!-- 侧边栏组件 -->
      <v-sidebar :items="listitmes" v-if="!headBanner"></v-sidebar>
      <div  class="content-box"
        :class="{ 'content-collapse': collapse, headBanner: headBanner }">
      <!-- 标签组件 -->
        <v-tags></v-tags>

        <div class="content-outer">
          <!-- 内容区 -->
          <div class="content" id="content">
            <!-- 面包屑导航 -->
            <el-breadcrumb separator="/" v-if="!headBanner">

              <el-breadcrumb-item v-for="item in _route" :key="item.path"
                >{{ item.meta.title }}
              </el-breadcrumb-item>
            </el-breadcrumb>

            <transition :name="transitionName" mode="out-in">
              <keep-alive :include="keepAliveList">
                <router-view></router-view>
              </keep-alive>
            </transition>
            
            <el-backtop target=".content"></el-backtop>
            
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-layout">
      <router-view></router-view>
    </div>
  </div>
  <div class="no-layout" v-else>
      <router-view></router-view>
  </div> 
</template>

<script>
import vHead from "./Header.vue";
import vHeadRouter from "./HeaderRouter.vue";
import vSidebar from "./Sidebar.vue";
import vTags from "./Tags.vue";
import bus from "./bus";
import $ from "jquery";
// import items from '@/config/siderbarItem.js'
import "@/assets/scss/ele.scss";
import "@/assets/scss/kus.scss";
import "@/assets/scss/orange.scss";
import "@/assets/scss/red.scss";
import "@/assets/scss/theme-other.scss";
import "@/assets/scss/element-extends.scss";
import "@/assets/scss/typical.scss";

export default {
  name: "Layout",
  data() {
    return {
      show: true,
      headBanner: false,
      tagsList: [],
      collapse: false,
      generalBreadCrumb: true,
      transitionName: "move",
      // 此处配置要缓存的页面的name
      keepAliveList: ["keep-alive-page"],
      change: false,
      items: "",
      listitmes: "",
      showceshi:"",
      shows:false
    };
  },
  components: {
    vHead,
    vTags,
    vSidebar,
    vHeadRouter,
  },
  computed: {
    _route() {
      return this.$route.matched;
    },
  },
  created() {
    if(process.env.NODE_ENV=='development'){
      this.shows=true;
    }
   
    // this.items =JSON.parse(JSON.stringify(items)) ;
    let menuList = JSON.parse(
      sessionStorage.getItem(generalConfig.menuListName)
    );
    // 从本地缓存获取charId 截取账号3212或者3212** 赋给ceshiBtn--作为左侧"测试"菜单显示的判断条件
    let ceshiStr = sessionStorage.getItem("charId")
    let ceshiBtn = ceshiStr.substring(ceshiStr.indexOf("3"),ceshiStr.indexOf("00"));
      
    
    // console.log("=========================");
    console.log(menuList,'menuList');
    // 账号
    // console.log(ceshiBtn);

    menuList.push(
     
      {
      	appId: "01",
        children: [ 
          {
            appId: "010106",
            children: null,
            icon: "el-icon-setting",
            menuId: "b9cedfedx24196a542766592860567zcsjk",
            menuName: "政策数据库",
            parentMenuId: "96db7e7e42be4a04952854239463173shjztyslzx",
            requestAction: "zcsjk",
            seq: 100
          },
          // {
          //   appId: "010107",
          //   children: null,
          //   icon: "el-icon-setting",
          //   menuId: "b9cedfedx24196a542766592860567zcsjcx",
          //   menuName: "政策数查询",
          //   parentMenuId: "96db7e7e42be4a04952854239463173shjztyslzx",
          //   requestAction: "",
          //   // requestAction: "zccx",
          //   seq: 100
          // },
          {
            appId: "010108",
            children: null,
            icon: "el-icon-setting",
            menuId: "b9cedfedx24196a542766592860567zzsqdk",
            menuName: "自助申请端口",
            parentMenuId: "96db7e7e42be4a04952854239463173shjztyslzx",
            requestAction: "",
            requestAction: "qzsq",
            seq: 100
          },
          {
            appId: "010109",
            children: null,
            icon: "el-icon-setting",
            menuId: "b9cedfedx24196a542766592860567zcjsq",
            menuName: "政策计算器",
            parentMenuId: "96db7e7e42be4a04952854239463173shjztyslzx",
            requestAction: "",
            requestAction: "zcjsq",
            seq: 100
          },
          // {
          //   appId: "010110",
          //   children: null,
          //   icon: "el-icon-setting",
          //   menuId: "b9cedfedx24196a542766592860567jzdxzwpg",
          //   menuName: "救助对象自我评估",
          //   parentMenuId: "96db7e7e42be4a04952854239463173shjztyslzx",
          //   requestAction: "",
          //   // requestAction: "zccx",
          //   seq: 100
          // },
          
          {
            appId: "00",
            children: [
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedhcyj24196a5427665928605620",
                menuName: "核对报告预警",
                parentMenuId: "b9cedcyyj24196a5427665928605620",
                requestAction: "hdbg",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9swzyj24196a5427665928605620",
                menuName: "数据完整性预警",
                parentMenuId: "b9cedcyyj24196a5427665928605620",
                requestAction: "wzyj",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9swyj24196a5427665928605620",
                menuName: "死亡预警",
                parentMenuId: "b9cedcyyj24196a5427665928605620",
                requestAction: "swyj",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9caryj24196a5427665928605620",
                menuName: "车辆预警",
                parentMenuId: "b9cedcyyj24196a5427665928605620",
                requestAction: "caryj",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9houseyj24196a5427665928605620",
                menuName: "房产预警",
                parentMenuId: "b9cedcyyj24196a5427665928605620",
                requestAction: "houseyj",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9qyggyj24196a5427665928605620",
                menuName: "企业高管预警",
                parentMenuId: "b9cedcyyj24196a5427665928605620",
                requestAction: "qyggyj",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9jrzcyj24196a5427665928605620",
                menuName: "金融资产预警",
                parentMenuId: "b9cedcyyj24196a5427665928605620",
                requestAction: "jrzcyj",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9fxryyj24196a5427665928605620",
                menuName: "服刑人员预警",
                parentMenuId: "b9cedcyyj24196a5427665928605620",
                requestAction: "fxryyj",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9gjjyj24196a5427665928605620",
                menuName: "公积金预警",
                parentMenuId: "b9cedcyyj24196a5427665928605620",
                requestAction: "gjjyj",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9taxesyj24196a5427665928605620",
                menuName: "税务预警",
                parentMenuId: "b9cedcyyj24196a5427665928605620",
                requestAction: "taxesyj",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9czgyryyj24196a5427665928605620",
                menuName: "财政供养人员预警",
                parentMenuId: "b9cedcyyj24196a5427665928605620",
                requestAction: "czgyryyj",
                seq: 100,
              },
              
            ],
            icon: "el-icon-setting",
            menuId: "b9cedcyyj24196a5427665928605620",
            menuName: "存疑数据预警",
            parentMenuId: "96db7e7e42be4a04952854239463173ff",
            requestAction: "cyyj",
            seq: 100,
          },
          
         
          
          
        ],
        icon: "el-icon-setting",
        menuId: "96db7e7e42be4a04952854239463173shjztyslzx",
        menuName: "社会救助统一受理中心",
        parentMenuId: "",
        requestAction: "",
        seq: 500
      },
      {
        appId: "02",
        children: [ 
          {
            appId: "0201",
            children: [ 
                {
                  appId: "020101",
                  children: null,
                  icon: "el-icon-setting",
                  menuId: "96db7e7e42be4a04952854239463174szyjtj",
                  menuName: "设置预警条件",
                  parentMenuId: "96db7e7e42be4a04952854239463174dsjyj",
                  requestAction: "yjtjsz",
                  'seq': 500
                },

                 {
                  appId: "020102",
                  children: [
                    {
                      appId: "02010201",
                      children: null,
                      icon: "el-icon-setting",
                      menuId: "b9cedccffce24196a5427665928605611",
                      menuName: "群众申办",   //原群众申请
                      parentMenuId: "b9cedccffce24196a5427665928605611wbyj",
                      requestAction: "qzsq",
                      seq: 100,
                    },
                    {
                      appId: "02010202",
                      children: null,
                      icon: "el-icon-setting",
                      menuId: "b9cedccffce24196a5427665928605620",
                      menuName: "主动排查",
                      parentMenuId: "b9cedccffce24196a5427665928605611wbyj",
                      requestAction: "zdpc",
                      seq: 100,
                    },
                    {
                      appId: "02010203",
                      children: null,
                      icon: "el-icon-setting",
                      menuId: "b9cedccffce24196a5427665928605612",
                      menuName: "建档立卡预警", // 原建档立卡推送/预警推送
                      parentMenuId: "b9cedccffce24196a5427665928605611wbyj",
                      requestAction: "yj",
                      seq: 100,
                    },
                    {
                      appId: "02010204",
                      children: null,
                      icon: "el-icon-setting",
                      menuId: "b9cedccffce24196a5427665928605713",
                      menuName: "医保预警",   //原医疗推送
                      parentMenuId: "b9cedccffce24196a5427665928605611wbyj",
                      requestAction: "ylts",
                      seq: 100,
                    },
                    {
                      appId: "02010205",
                      children: null,
                      icon: "el-icon-setting",
                      menuId: "b9cedccffce24196a5427665928605714",
                      menuName: "团市委预警",   
                      parentMenuId: "b9cedccffce24196a5427665928605611wbyj",
                      requestAction: "tsw",
                      seq: 100,
                    },
                    {
                      appId: "02010206",
                      children: null,
                      icon: "el-icon-setting",
                      menuId: "b9cedccffce24196a5427665928605715",
                      menuName: "12345涉救预警",   
                      parentMenuId: "b9cedccffce24196a5427665928605611wbyj",
                      requestAction: "sjyj",
                      seq: 100,
                    },
                    {
                      appId: "02010207",
                      children: null,
                      icon: "el-icon-setting",
                      menuId: "b9cedccffce24196a5427665928605716",
                      menuName: "水电预警",   //水电费减免
                      parentMenuId: "b9cedccffce24196a5427665928605611wbyj",
                      requestAction: "sdyj",
                      seq: 100,
                    },
                    {
                      appId: "02010208",
                      children: null,
                      icon: "el-icon-setting",
                      menuId: "b9cedccffce24196a5427665928605717",
                      menuName: "住房预警",   //住房救助
                      parentMenuId: "b9cedccffce24196a5427665928605611wbyj",
                      requestAction: "zfyj",
                      seq: 100,
                    },
                    {
                      appId: "02010209",
                      children: null,
                      icon: "el-icon-setting",
                      menuId: "b9cedccffce24196a5427665928605718",
                      menuName: "消防预警",   //
                      parentMenuId: "b9cedccffce24196a5427665928605611wbyj",
                      requestAction: "xfyj",
                      seq: 100,
                    },
                    {
                      appId: "02010210",
                      children: null,
                      icon: "el-icon-setting",
                      menuId: "b9cedccffce24196a5427665928605719wjyj",
                      menuName: "物价预警",   //物价补贴
                      parentMenuId: "b9cedccffce24196a5427665928605611wbyj",
                      requestAction: "wjyj",
                      seq: 100,
                    },
                    {
                      appId: "02010211",
                      children: null,
                      icon: "el-icon-setting",
                      menuId: "b9cedccffce24196a5427665928605719jyyj",
                      menuName: "教育预警",   
                      parentMenuId: "b9cedccffce24196a5427665928605611wbyj",
                      requestAction: "jyyj",
                      seq: 100,
                    },
                    {
                      appId: "020102112",
                      children: null,
                      icon: "el-icon-setting",
                      menuId: "b9cedccffce24196a5427665928605719flyj",
                      menuName: "妇联预警",   
                      parentMenuId: "b9cedccffce24196a5427665928605611wbyj",
                      requestAction: "flyj",
                      seq: 100,
                    },
                    {
                      appId: "020102113",
                      children: null,
                      icon: "el-icon-setting",
                      menuId: "b9cedccffce24196a5427665928605719snyj",
                      menuName: "涉农预警",   
                      parentMenuId: "b9cedccffce24196a5427665928605611wbyj",
                      requestAction: "snyj",
                      seq: 100,
                    },
                    {
                      appId: "020102114",
                      children: null,
                      icon: "el-icon-setting",
                      menuId: "b9cedccffce24196a5427665928605719dtwyj",
                      menuName: "党团委预警",   
                      parentMenuId: "b9cedccffce24196a5427665928605611wbyj",
                      requestAction: "dtwyj",
                      seq: 100,
                    },
                    {
                      appId: "020102115",
                      children: null,
                      icon: "el-icon-setting",
                      menuId: "b9cedccffce24196a5427665928605719clyj",
                      menuName: "残联预警",   
                      parentMenuId: "b9cedccffce24196a5427665928605611wbyj",
                      requestAction: "clyj",
                      seq: 100,
                    },
                    {
                      appId: "020102116",
                      children: null,
                      icon: "el-icon-setting",
                      menuId: "b9cedccffce24196a5427665928605719csyj",
                      menuName: "慈善预警",   
                      parentMenuId: "b9cedccffce24196a5427665928605611wbyj",
                      requestAction: "csyj",
                      seq: 100,
                    },
                    {
                      appId: "020102117",
                      children: null,
                      icon: "el-icon-setting",
                      menuId: "b9cedccffce24196a5427665928605719wjwyj",
                      menuName: "卫建委预警",   
                      parentMenuId: "b9cedccffce24196a5427665928605611wbyj",
                      requestAction: "wjwyj",
                      seq: 100,
                    },
                    {
                      appId: "020102118",
                      children: null,
                      icon: "el-icon-setting",
                      menuId: "b9cedccffce24196a5427665928605719yjzhyj",
                      menuName: "应急灾害预警",   
                      parentMenuId: "b9cedccffce24196a5427665928605611wbyj",
                      requestAction: "yjzhyj",
                      seq: 100,
                    },
                    {
                      appId: "020102119",
                      children: null,
                      icon: "el-icon-setting",
                      menuId: "b9cedccffce24196a5427665928605719jyyjxx",
                      menuName: "就业预警",   
                      parentMenuId: "b9cedccffce24196a5427665928605611wbyj",
                      requestAction: "jyyjxx",
                      seq: 100,
                    },
                    {
                      appId: "020102120",
                      children: null,
                      icon: "el-icon-setting",
                      menuId: "b9cedccffce24196a5427665928605719xfzgyj",
                      menuName: "下方职工预警",   
                      parentMenuId: "b9cedccffce24196a5427665928605611wbyj",
                      requestAction: "xfzgyj",
                      seq: 100,
                    },
                    {
                      appId: "020102121",
                      children: null,
                      icon: "el-icon-setting",
                      menuId: "b9cedccffce24196a5427665928605719qtyj",
                      menuName: "其他预警",   
                      parentMenuId: "b9cedccffce24196a5427665928605611wbyj",
                      requestAction: "qtyj",
                      seq: 100,
                    },

                  ],
                  icon: "el-icon-setting",
                  menuId: "b9cedccffce24196a5427665928605611wbyj",
                  menuName: "大数据主动检测预警库",  //原外部预警
                  parentMenuId: "96db7e7e42be4a04952854239463173ff",
                  requestAction: " ",
                  seq: 100,
                },
                // {
                //   appId: "020102",
                //   children: null,
                //   icon: "el-icon-setting",
                //   menuId: "96db7e7e42be4a04952854239463174dsjzdjcyjk",
                //   menuName: "大数据主动检测预警库",
                //   parentMenuId: "96db7e7e42be4a04952854239463174dsjyj",
                //   requestAction: "",
                //   'seq': 500
                // },
                {
                  appId: "020103",
                  children: null,
                  icon: "el-icon-setting",
                  menuId: "96db7e7e42be4a04952854239463174jzyp",
                  menuName: "救助预判",
                  parentMenuId: "96db7e7e42be4a04952854239463174dsjyj",
                  requestAction: "yclpt",
                  'seq': 500
                },
                // {
                //   appId: "020103",
                //   children: null,
                //   icon: "el-icon-setting",
                //   menuId: "96db7e7e42be4a04952854239463174jzyp",
                //   menuName: "救助预判",
                //   parentMenuId: "96db7e7e42be4a04952854239463174dsjyj",
                //   requestAction: "",
                //   'seq': 500
                // },
            ],
            icon: "el-icon-setting",
            menuId: "96db7e7e42be4a04952854239463174dsjyj",
            menuName: "大数据预警",
            parentMenuId: "96db7e7e42be4a04952854239463174yjptxt",
            requestAction: "",
            'seq': 500
          },
          {
            appId: "0202",
            children: [ 
                {
                  appId: "020201",
                  children: null,
                  icon: "el-icon-setting",
                  menuId: "96db7e7e42be4a04952854239463174gxhyjList",
                  menuName: "个性化预警库",
                  parentMenuId: "96db7e7e42be4a04952854239463174yjhcsjk",
                  requestAction: "gxhyjList",
                  'seq': 500
                },
                {
                  appId: "020202",
                  children: null,
                  icon: "el-icon-setting",
                  menuId: "96db7e7e42be4a04952854239463174dcyj",
                  menuName: "督促预警",
                  parentMenuId: "96db7e7e42be4a04952854239463174yjhcsjk",
                  requestAction: "tsyj",
                  'seq': 500
                },
                {
                  appId: "020203",
                  children: [
                    {
                      appId: "02020301",
                      children: null,
                      icon: "el-icon-setting",
                      menuId: "96db7e7e42be4a04952854239463174jjjbyj",
                      menuName: "即将进保人员预警",
                      parentMenuId: "96db7e7e42be4a04952854239463174dxyj",
                      requestAction: "jjjbyj",
                      'seq': 500
                    },
                    {
                      appId: "02020302",
                      children: null,
                      icon: "el-icon-setting",
                      menuId: "96db7e7e42be4a04952854239463174jjtbyj",
                      menuName: "即将脱保人员预警",
                      parentMenuId: "96db7e7e42be4a04952854239463174dxyj",
                      requestAction: "jjtbyj",
                      'seq': 500
                    },
                    {
                      appId: "02020303",
                      children: null,
                      icon: "el-icon-setting",
                      menuId: "96db7e7e42be4a04952854239463174jzbyyj",
                      menuName: "救助边缘人员预警",
                      parentMenuId: "96db7e7e42be4a04952854239463174dxyj",
                      requestAction: "jzbyyj",
                      'seq': 500
                    },
                    {
                      appId: "02020304",
                      children: null,
                      icon: "el-icon-setting",
                      menuId: "96db7e7e42be4a04952854239463174hcbgwtyj",
                      menuName: "核查报告问题预警",
                      parentMenuId: "96db7e7e42be4a04952854239463174dxyj",
                      requestAction: "hcbgwtyj",
                      'seq': 500
                    },
                  ],
                  icon: "el-icon-setting",
                  menuId: "96db7e7e42be4a04952854239463174dxyj",
                  menuName: "对象预警",
                  parentMenuId: "96db7e7e42be4a04952854239463174yjhcsjk",
                  requestAction: "",
                  'seq': 500
                },
                {
                  appId: "020204",
                  children:null,
                  icon: "el-icon-setting",
                  menuId: "96db7e7e42be4a04952854239463174tsyj",
                  menuName: "投诉预警",
                  parentMenuId: "96db7e7e42be4a04952854239463174yjhcsjk",
                  requestAction: "tsyj",
                  'seq': 500
                },
                {
                  appId: "020205",
                  children:null,
                  icon: "el-icon-setting",
                  menuId: "96db7e7e42be4a04952854239463174hcyj",
                  menuName: "核查预警",
                  parentMenuId: "96db7e7e42be4a04952854239463174yjhcsjk",
                  requestAction: "hcyj",
                  'seq': 500
                },
            ],
            icon: "el-icon-setting",
            menuId: "96db7e7e42be4a04952854239463174yjhcsjk",
            menuName: "预警核查对象数据库",
            parentMenuId: "96db7e7e42be4a04952854239463174yjptxt",
            requestAction: "",
            'seq': 500
          },
        ],
        icon: "el-icon-setting",
        menuId: "96db7e7e42be4a04952854239463174yjptxt",
        menuName: "预警平台系统",
        parentMenuId: "",
        requestAction: "",
        'seq': 500
      },
      
      {
        appId: "03",
        children: [
          {
            appId: "0301",
            children: null,
            icon: "el-icon-setting",
            menuId: "96db7e7e42be4a04952854239463174jtjjzkdb",
            menuName: "家庭经济状况对比",
            parentMenuId: "96db7e7e42be4a04952854239463174jtjjhcxt",
            requestAction: "jtjjzkdb",
            'seq': 500
          },
          {
            appId: "0302",
            children: null,
            icon: "el-icon-setting",
            menuId: "96db7e7e42be4a04952854239463174zcjs",
            menuName: "政策计算",
            parentMenuId: "96db7e7e42be4a04952854239463174jtjjhcxt",
            requestAction: "zcjs",
            'seq': 500
          },
          {
            appId: "0303",
            children: null,
            icon: "el-icon-setting",
            menuId: "96db7e7e42be4a04952854239463174shjzdxyclxxk",
            menuName: "社会救助对象预受理信息库",
            parentMenuId: "96db7e7e42be4a04952854239463174jtjjhcxt",
            requestAction: "",
            'seq': 500
          },
          // {
          //   appId: "0304",
          //   children: null,
          //   icon: "el-icon-setting",
          //   menuId: "96db7e7e42be4a04952854239463174dbxx",
          //   menuName: "对比信息",
          //   parentMenuId: "96db7e7e42be4a04952854239463174jtjjhcxt",
          //   requestAction: "jthdList",
          //   'seq': 500
          // },
         ],
        icon: "el-icon-setting",
        menuId: "96db7e7e42be4a04952854239463174jtjjhcxt",
        menuName: "家庭经济核查系统",
        parentMenuId: "",
        requestAction: "",
        'seq': 500
      },
      
    //   {
    //     appId: "01",
    //     children: [{
    //       	appId: "00",
    //       	children: null,
    //       	icon: "el-icon-setting",
    //       	menuId: "b9cedtkfh24196a54276659286056501",
    //       	menuName: "特困供养复核",
    //       	parentMenuId: "96db7e7e42be4a04952854239463175fh",
    //       	requestAction: "tkFhList",
    //       	seq: 100

    //     },{
    //       	appId: "00",
    //       	children: null,
    //       	icon: "el-icon-setting",
    //       	menuId: "b9ceddbfh24196a54276659286056502",
    //       	menuName: "低保复核",
    //       	parentMenuId: "96db7e7e42be4a04952854239463175fh",
    //       	requestAction: "dbFhList",
    //       	seq: 100

    //     },{
    //       	appId: "00",
    //       	children: null,
    //       	icon: "el-icon-setting",
    //       	menuId: "b9ceddbfh24196a54276659286056503",
    //       	menuName: "单人保复核",
    //       	parentMenuId: "96db7e7e42be4a04952854239463175fh",
    //       	requestAction: "dsrFhList",
    //       	seq: 100

    //     },{
    //       	appId: "00",
    //       	children: null,
    //       	icon: "el-icon-setting",
    //       	menuId: "b9ceddbfh24196a54276659286056504",
    //       	menuName: "支出困难复核",
    //       	parentMenuId: "96db7e7e42be4a04952854239463175fh",
    //       	requestAction: "zcFhList",
    //       	seq: 100

    //     }],
    //     icon: "el-icon-setting",
    //     menuId: "96db7e7e42be4a04952854239463175fh",
    //     menuName: "数据复核",
    //     parentMenuId: "01",
    //     requestAction: "",
    //     'seq': 500
    // },
        {
          appId: "04",
          children: [
            {
              appId: "0401",
              children: null,
              icon: "el-icon-setting",
              menuId: "b9cedccffce24196a5427665928605621cxdbdxsjk",
              menuName: "城乡低保救助数据库",
              parentMenuId: "b9cedccffce24196a5427665928605621dsrrkrdxt",
              requestAction: "dbListPersons", //城乡低保在册人员页面
              seq: 100,
            },
            {
              appId: "0402",
              children: null,
              icon: "el-icon-setting",
              menuId: "b9cedccffce24196a5427665928605621tkgydxsjk",
              menuName: "特困供养救助数据库",
              parentMenuId: "b9cedccffce24196a5427665928605621dsrrkrdxt",
              requestAction: "tkListPersons", //特困供养在册人员页面
              seq: 100,
            },
            
            {
              appId: "0404",
              children: null,
              icon: "el-icon-setting",
              menuId: "b9cedccffce24196a5427665928605621dbbydxsjk",
              menuName: "低保边缘对象数据库",
              parentMenuId: "b9cedccffce24196a5427665928605621dsrrkrdxt",
              requestAction: "dbbyListPersons", 
              seq: 100,
            },
            {
              appId: "0405",
              children: null,
              icon: "el-icon-setting",
              menuId: "b9cedccffce24196a5427665928605621zcxkndxsjk",
              menuName: "支出型困难对象数据库",
              parentMenuId: "b9cedccffce24196a5427665928605621dsrrkrdxt",
              requestAction: "zhchListPersons", //支出型困难在册人员页面
              seq: 100,
            },
            {
              appId: "0403",
              children: null,
              icon: "el-icon-setting",
              menuId: "b9cedccffce24196a5427665928605621drbjtdxsjk",
              menuName: "单人保对象数据库",
              parentMenuId: "b9cedccffce24196a5427665928605621dsrrkrdxt",
              requestAction: "dsrListPersons", //单人保家庭在册人员页面
              seq: 100,
            },
            
          ],
          icon: "el-icon-setting",
          menuId: "b9cedccffce24196a5427665928605621dsrrkrdxt",
          menuName: "低收入人口认定系统",
          parentMenuId: "",
          requestAction: "",
          seq: 100,
        },
      {
        appId: "05",
        children: [
          {
            appId: "0501",
            children: [
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a5427665928605621",
                menuName: "城乡低保按户保审批",
                parentMenuId: "96db7e7e42be4a04952854239463171fa",
                requestAction: "dbList",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a5427665928605622",
                menuName: "城乡低保按人保审批",
                parentMenuId: "96db7e7e42be4a04952854239463171fa",
                requestAction: "dbList2",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a5427665928605623",
                menuName: "城乡低保变更",
                parentMenuId: "96db7e7e42be4a04952854239463171fa",
                requestAction: "dbListChange",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a5427665928605624",
                menuName: "城乡低保注销",
                parentMenuId: "96db7e7e42be4a04952854239463171fa",
                requestAction: "dbListCancel",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a54276659286056525",
                menuName: "城乡低保发放",
                parentMenuId: "96db7e7e42be4a04952854239463171fa",
                requestAction: "dbListGrant",
                seq: 100,
              },
              {
              appId: "00",
              children: null,
              icon: "el-icon-setting",
              menuId: "b9cedccffce24196a54276659286056526",
              menuName: "低保标准设置",
              parentMenuId: "96db7e7e42be4a04952854239463171fa",
              requestAction: "dbSetList",
              seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a54276659286056527",
                menuName: "城乡低保发放记录",
                parentMenuId: "96db7e7e42be4a04952854239463171fa",
                requestAction: "dbListRecord",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a5427665928605628",
                menuName: "城乡低保在册人员",
                parentMenuId: "96db7e7e42be4a04952854239463171fa",
                requestAction: "dbListPersons",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a5427665928605629",
                menuName: "城乡低保在册户数",
                parentMenuId: "96db7e7e42be4a04952854239463171fa",
                requestAction: "dbListHouseholds",
                seq: 100,
              }
            ],
            icon: "el-icon-setting",
            menuId: "96db7e7e42be4a04952854239463171cxdbjzxt",
            menuName: "城乡低保救助系统",
            parentMenuId: "96db7e7e42be4a04952854239463175ff",
            requestAction: "zd",
            seq: 100,
          },
          {
            appId: "0502",
            children: [
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a54276659286056531",
                menuName: "特困供养审批",
                parentMenuId: "96tk7e7e42be4a04952854239463171ff",
                requestAction: "tkList",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a54276659286056532",
                menuName: "特困供养变更",
                parentMenuId: "96tk7e7e42be4a04952854239463171ff",
                requestAction: "tkChange",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a54276659286056533",
                menuName: "特困供养注销",
                parentMenuId: "96tk7e7e42be4a04952854239463171ff",
                requestAction: "tkCancel",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a54276659286056534",
                menuName: "特困供养发放",
                parentMenuId: "96tk7e7e42be4a04952854239463171ff",
                requestAction: "tkListGrant",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a54276659286056535",
                menuName: "特困供养标准设置",
                parentMenuId: "96tk7e7e42be4a04952854239463171ff",
                requestAction: "tkSetList",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a54276659286056536",
                menuName: "特困供养发放记录",
                parentMenuId: "96tk7e7e42be4a04952854239463171ff",
                requestAction: "tkListRecord",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a54276659286056537",
                menuName: "特困供养在册人员",
                parentMenuId: "96tk7e7e42be4a04952854239463171ff",
                requestAction: "tkListPersons",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a54276659286056538",
                menuName: "特困供养在册户数",
                parentMenuId: "96tk7e7e42be4a04952854239463171ff",
                requestAction: "tkListHouseholds",
                seq: 100,
              }
            ],
            icon: "el-icon-setting",
            menuId: "96tk7e7e42be4a04952854239463171ff",
            menuName: "特困供养救助系统",
            parentMenuId: "96db7e7e42be4a04952854239463175ff",
            requestAction: "tk",
            seq: 100,
          },{
            appId: "0503",
            children: [
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a54276659286056512",
                menuName: "单人保家庭审批",
                parentMenuId: "96db7e7e42be4a0495285423946317112",
                requestAction: "dsrList",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a54276659286056513",
                menuName: "单人保家庭变更",
                parentMenuId: "96db7e7e42be4a0495285423946317113",
                requestAction: "dsrChange",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a54276659286056514",
                menuName: "单人保家庭注销",
                parentMenuId: "96db7e7e42be4a0495285423946317114",
                requestAction: "dsrCancel",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a54276659286056516",
                menuName: "单人保家庭在册人员",
                parentMenuId: "96db7e7e42be4a0495285423946317116",
                requestAction: "dsrListPersons",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a54276659286056515",
                menuName: "单人保家庭在册户数",
                parentMenuId: "96db7e7e42be4a0495285423946317115",
                requestAction: "dsrListHouseholds",
                seq: 100,
              }
            ],
            icon: "el-icon-setting",
            menuId: "dbbyList",
            menuName: "单人保家庭救助系统",  //原低收入家庭
            parentMenuId: "96db7e7e42be4a04952854239463175ff",
            requestAction: "",
            seq: 100,
          },{
            appId: "0504",
              // children:[],
              icon: "el-icon-setting",
              menuId: "96dbby7e7e42be4a04952854239463171ff",
              menuName: "低保边缘家庭救助系统",
              parentMenuId: "96db7e7e42be4a04952854239463175ff",
              requestAction: "dbbyList",
              seq: 100,
          }, {
            appId: "0505",
            children: [
              {
                  appId: "050501",
                  children: null,
                  icon: "el-icon-setting",
                  menuId: "b9cedccffce24196a54276659286056561",
                  menuName: "支出型困难家庭审批",
                  parentMenuId: "96zhch7e7e42be4a04952854239463171ff",
                  requestAction: "zhchList",
                  seq: 100,
                },{
                  appId: "00",
                  children: null,
                  icon: "el-icon-setting",
                  menuId: "b9cedccffce24196a54276659286056562",
                  menuName: "支出型困难家庭变更",
                  parentMenuId: "96zhch7e7e42be4a04952854239463171ff",
                  requestAction: "zhchChange",
                  seq: 100,
                },{
                  appId: "00",
                  children: null,
                  icon: "el-icon-setting",
                  menuId: "b9cedccffce24196a54276659286056563",
                  menuName: "支出型困难家庭注销",
                  parentMenuId: "96zhch7e7e42be4a04952854239463171ff",
                  requestAction: "zhchCancel",
                  seq: 100,
                },{
                  appId: "00",
                  children: null,
                  icon: "el-icon-setting",
                  menuId: "b9cedccffce24196a54276659286056564",
                  menuName: "支出型困难家庭在册人员",
                  parentMenuId: "96zhch7e7e42be4a04952854239463171ff",
                  requestAction: "zhchListPersons",
                  seq: 100,
                },{
                  appId: "00",
                  children: null,
                  icon: "el-icon-setting",
                  menuId: "b9cedccffce24196a54276659286056565",
                  menuName: "支出型困难家庭在册户数",
                  parentMenuId: "96zhch7e7e42be4a04952854239463171ff",
                  requestAction: "zhchListHouseholds",
                  seq: 100,
                }
            ],
            icon: "el-icon-setting",
            menuId: "96zhch7e7e42be4a04952854239463171ff",
            menuName: "支出型困难家庭",
            parentMenuId: "96db7e7e42be4a04952854239463175ff",
            requestAction: "zhchList",
            seq: 100,
          },
           {
            appId: "0506",
            children: [
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a5427665928605616",
                menuName: "困境儿童预警",
                parentMenuId: "b9cedccffce24196a5427665928605614",
                requestAction: "kjetList",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a5427665928605601",
                menuName: "孤儿",
                parentMenuId: "b9cedccffce24196a5427665928605614",
                requestAction: "kjetGe",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a5427665928605602",
                menuName: "事实无人抚养儿童",
                parentMenuId: "b9cedccffce24196a5427665928605614",
                requestAction: "kjetWrfy",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a5427665928605603",
                menuName: "贫困家庭儿童",
                parentMenuId: "b9cedccffce24196a5427665928605614",
                requestAction: "kjetPkjt",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a5427665928605604",
                menuName: "重病重残儿童",
                parentMenuId: "b9cedccffce24196a5427665928605614",
                requestAction: "kjetBC",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a5427665928605605",
                menuName: "其他需要帮助儿童",
                parentMenuId: "b9cedccffce24196a5427665928605614",
                requestAction: "kjetQt",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a5427665928605615",
                menuName: "困境儿童变更",
                parentMenuId: "b9cedccffce24196a5427665928605614",
                requestAction: "kjetChangeList",
                seq: 100,
              },  {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a5427665928605617",
                menuName: "困境儿童注销",
                parentMenuId: "b9cedccffce24196a5427665928605614",
                requestAction: "kjetCancelList",
                seq: 100,
              },{
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a5427665928605618",
                menuName: "困境儿童发放",
                parentMenuId: "b9cedccffce24196a5427665928605614",
                requestAction: "kjetListGrant",
                seq: 100,
              },  {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a5427665928605619",
                menuName: "困境儿童发放记录",
                parentMenuId: "b9cedccffce24196a5427665928605614",
                requestAction: "kjetListRecord",
                seq: 100,
              },{
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a5427665928605620",
                menuName: "困境儿童在册人员",
                parentMenuId: "b9cedccffce24196a5427665928605614",
                requestAction: "kjetListPersons",
                seq: 100,
              }, 
              // {
              //   appId: "00",
              //   children: null,
              //   icon: "",
              //   menuId: "b9cedccffce24196a5427665928605625",
              //   menuName: "困境儿童已添加服务儿童",
              //   parentMenuId: "b9cedccffce24196a5427665928605614",
              //   requestAction: "kjetListAdded",
              //   seq: 100,
              // },{
              //   appId: "00",
              //   children: null,
              //   icon: "",
              //   menuId: "b9cedccffce24196a5427665928605626",
              //   menuName: "困境儿童未添加服务儿童",
              //   parentMenuId: "b9cedccffce24196a5427665928605614",
              //   requestAction: "kjetListNotAdded",
              //   seq: 100,
              // }, 
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a5427665928605627",
                menuName: "儿童主任",
                parentMenuId: "b9cedccffce24196a5427665928605614",
                requestAction: "kjetListDirector",
                seq: 100,
              },{
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a5427665928605630",
                menuName: "儿童督导员",
                parentMenuId: "b9cedccffce24196a5427665928605614",
                requestAction: "kjetListSupervisor",
                seq: 100,
              }
            ],
            icon: "el-icon-setting",
            menuId: "b9cedccffce24196a5427665928605614",
            menuName: "困境儿童系统",
            parentMenuId: "96db7e7e42be4a04952854239463175ff",
            requestAction: "kjetList",
            seq: 100,
          },
          {
            appId: "0507",
            children: [
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a54276659286056523",
                menuName: "临时救助审批",
                parentMenuId: "96db7e7e42be4a0495285423946317123",
                requestAction: "lsList",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a54276659286056524",
                menuName: "临时救助变更",
                parentMenuId: "96db7e7e42be4a0495285423946317124",
                requestAction: "lsChange",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a54276659286056525",
                menuName: "临时救助注销",
                parentMenuId: "96db7e7e42be4a0495285423946317125",
                requestAction: "lsCancel",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a54276659286056526",
                menuName: "临时救助记录",
                parentMenuId: "96db7e7e42be4a0495285423946317126",
                requestAction: "lsRecord",
                seq: 100,
              },
              {
                appId: "00",
                children: null,
                icon: "el-icon-setting",
                menuId: "b9cedccffce24196a54276659286056527",
                menuName: "临时救助家庭成员",
                parentMenuId: "96db7e7e42be4a0495285423946317127",
                requestAction: "lsListPersons",
                seq: 100,
              },
            ],
            icon: "el-icon-setting",
            menuId: "lsList",
            menuName: "临时救助",
            parentMenuId: "96db7e7e42be4a04952854239463175ff",
            requestAction: "lsList",
            seq: 100,
          }, {
            appId: "0508",
            children: null,
            icon: "el-icon-setting",
            menuId: "b9cedcjr24196a54276659286056508",
            menuName: "残疾人补贴",
            parentMenuId: "96db7e7e42be4a04952854239463175ff",
            requestAction: "disableList",
            seq: 100
          },{
            appId: "0509",
            children: [
              {
                appId: "0001",
                // children: null,
                icon: "el-icon-setting",
                menuId: "b9cedcjr24196a54276659286056508zjl01",
                menuName: "尊老金审核",
                parentMenuId: "b9cedcjr24196a54276659286056508zlj",
                requestAction: "zljList",
                seq: 100
              },
              {
                appId: "0002",
                // children: null,
                icon: "el-icon-setting",
                menuId: "b9cedcjr24196a54276659286056508zlj02",
                menuName: "尊老金变更",
                parentMenuId: "b9cedcjr24196a54276659286056508zlj",
                requestAction: "zljChange",
                seq: 100
              },
              {
                appId: "0003",
                // children: null,
                icon: "el-icon-setting",
                menuId: "b9cedcjr24196a54276659286056508zlj03",
                menuName: "尊老金注销",
                parentMenuId: "b9cedcjr24196a54276659286056508zlj",
                requestAction: "zljCancel",
                seq: 100
              },
              {
                appId: "0004",
                // children: null,
                icon: "el-icon-setting",
                menuId: "b9cedcjr24196a54276659286056508zlj03zljFF",
                menuName: "尊老金资金发放",
                parentMenuId: "b9cedcjr24196a54276659286056508zlj",
                requestAction: "zljFF",
                seq: 100
              },
            ],
            icon: "el-icon-setting",
            menuId: "b9cedcjr24196a54276659286056508zlj",
            menuName: "尊老金",
            parentMenuId: "96db7e7e42be4a04952854239463175ff",
            requestAction: "",
            seq: 100
          },
         
          
        ],
        icon: "el-icon-setting",
        menuId: "96db7e7e42be4a04952854239463175shjzhshflspxt",
        menuName: "生活救助和社会福利审批系统",
        parentMenuId: "01",
        requestAction: "",
        'seq': 500
      },
      {
        appId: "06",
        children: [
          {
            appId: "0701",
            children: null,
            icon: "el-icon-setting",
            menuId: "96db7e7e42be4a04952854239463174zdbs",
            menuName: "自动标识系统",
            parentMenuId: "96db7e7e42be4a04952854239463174ldjzbzpt",
            requestAction: "",
            'seq': 500
          },
          {
            appId: "0702",
            children: [
              {
                appId: "070201",
                children: null,
                icon: "el-icon-setting",
                menuId: "96db7e7e42be4a04952854239463174sjtsyywxtblzx",
                menuName: "协助申请",
                parentMenuId: "96db7e7e42be4a04952854239463174lxzsq",
                requestAction: "xzApply",
                'seq': 500
              },
            ],
            icon: "el-icon-setting",
            menuId: "96db7e7e42be4a04952854239463174sjtsyywxtblzx",
            menuName: "数据推送与业务协同办理中心",
            parentMenuId: "96db7e7e42be4a04952854239463174ldjzbzpt",
            requestAction: "",
            'seq': 500
          },
          {
            appId: "0703",
            children: [
              {
                appId: "070301",
                children: null,
                icon: "el-icon-setting",
                menuId: "96db7e7e42be4a04952854239463174cjrzxx",
                menuName: "残疾人证信息",
                parentMenuId: "96db7e7e42be4a04952854239463174xtbmjzxxgjxt",
                requestAction: "cjrmd",
                'seq': 500
              },
              {
                appId: "070302",
                children: null,
                icon: "el-icon-setting",
                menuId: "96db7e7e42be4a04952854239463174chxkxsrymd",
                menuName: "长护险可享受人员名单",
                parentMenuId: "96db7e7e42be4a04952854239463174xtbmjzxxgjxt",
                requestAction: "chbxdymd",
                'seq': 500
              },
              {
                appId: "070303",
                children: null,
                icon: "el-icon-setting",
                menuId: "96db7e7e42be4a04952854239463174geylf",
                menuName: "高额医疗费",
                parentMenuId: "96db7e7e42be4a04952854239463174xtbmjzxxgjxt",
                requestAction: "geylf",
                'seq': 500
              },
              {
                appId: "070304",
                children: null,
                icon: "el-icon-setting",
                menuId: "96db7e7e42be4a04952854239463174tkzghknzg",
                menuName: "特困职工和困难职工",
                parentMenuId: "96db7e7e42be4a04952854239463174xtbmjzxxgjxt",
                requestAction: "tkzg",
                'seq': 500
              },
              {
                appId: "070305",
                children: null,
                icon: "el-icon-setting",
                menuId: "96db7e7e42be4a04952854239463174swxx",
                menuName: "死亡信息",
                parentMenuId: "96db7e7e42be4a04952854239463174xtbmjzxxgjxt",
                requestAction: "swxx",
                'seq': 500
              },
              {
                appId: "070306",
                children: null,
                icon: "el-icon-setting",
                menuId: "96db7e7e42be4a04952854239463174dzbyj",
                menuName: "大重病预警",
                parentMenuId: "96db7e7e42be4a04952854239463174xtbmjzxxgjxt",
                requestAction: "dzbyj",
                'seq': 500
              },
              {
                appId: "070307",
                children: null,
                icon: "el-icon-setting",
                menuId: "96db7e7e42be4a04952854239463174cxjz",
                menuName: "诚信救助",
                parentMenuId: "96db7e7e42be4a04952854239463174xtbmjzxxgjxt",
                requestAction: "cxjz",
                'seq': 500
              },
              {
                appId: "070308",
                children: null,
                icon: "el-icon-setting",
                menuId: "96db7e7e42be4a04952854239463174lycyzg",
                menuName: "陆运从业资格",
                parentMenuId: "96db7e7e42be4a04952854239463174xtbmjzxxgjxt",
                requestAction: "lycyzg",
                'seq': 500
              },
              // {
              //   appId: "070309",
              //   children: null,
              //   icon: "el-icon-setting",
              //   menuId: "96db7e7e42be4a04952854239463174wjwxx",
              //   menuName: "卫建委信息",
              //   parentMenuId: "96db7e7e42be4a04952854239463174xtbmjzxxgjxt",
              //   requestAction: "wjwxx",
              //   'seq': 500
              // },
              // {
              //   appId: "070310",
              //   children: null,
              //   icon: "el-icon-setting",
              //   menuId: "96db7e7e42be4a04952854239463174gjj",
              //   menuName: "公积金",
              //   parentMenuId: "96db7e7e42be4a04952854239463174xtbmjzxxgjxt",
              //   requestAction: "gjj",
              //   'seq': 500
              // },
              {
                appId: "070311",
                children: null,
                icon: "el-icon-setting",
                menuId: "96db7e7e42be4a04952854239463174jdlk",
                menuName: "建档立卡",
                parentMenuId: "96db7e7e42be4a04952854239463174xtbmjzxxgjxt",
                requestAction: "jdlk",
                'seq': 500
              },
            ],
            icon: "el-icon-setting",
            menuId: "96db7e7e42be4a04952854239463174xtbmjzxxgjxt",
            menuName: "协同部门救助信息归集系统",
            parentMenuId: "96db7e7e42be4a04952854239463174ldjzbzpt",
            requestAction: "",
            'seq': 500
          },
          {
            appId: "0704",
            children: null,
            icon: "el-icon-setting",
            menuId: "96db7e7e42be4a04952854239463174ysjjcptglgx",
            menuName: "与市级基础平台关联关系",
            parentMenuId: "96db7e7e42be4a04952854239463174ldjzbzpt",
            requestAction: "",
            'seq': 500
          },
          {
            appId: "0705",
            children: null,
            icon: "el-icon-setting",
            menuId: "96db7e7e42be4a04952854239463174sjjhgxkf",
            menuName: "数据交换共享开放",
            parentMenuId: "96db7e7e42be4a04952854239463174ldjzbzpt",
            requestAction: "gxpt",
            'seq': 500
          },
        ],
        icon: "el-icon-setting",
        menuId: "96db7e7e42be4a04952854239463174ldjzbzpt",
        menuName: "联动救助保障平台",
        parentMenuId: "",
        requestAction: "",
        'seq': 500
      },
      {
        appId: "07",
        children: [ 
          {
            appId: "0201",
            // children: [ ],
            icon: "el-icon-setting",
            menuId: "96jm7e7e42be4a04952854239463174spjg",
            menuName: "审批过程监管",
            parentMenuId: "96db7e7e42be4a04952854239463174jg",
            requestAction: "spgc",
            'seq': 500
          },
          {
            appId: "0202",
            // children: [ ],
            icon: "el-icon-setting",
            menuId: "96jm7e7e42be4a04952854239463174xxjg",
            menuName: "信息公开监管",
            parentMenuId: "96db7e7e42be4a04952854239463174jg",
            requestAction: "xxgk",
            'seq': 500
          },
          {
            appId: "0203",
            // children: [ ],
            icon: "el-icon-setting",
            menuId: "96jm7e7e42be4a04952854239463174zjffjg",
            menuName: "资金发放监管",
            parentMenuId: "96db7e7e42be4a04952854239463174jg",
            requestAction: "jzffList",
            'seq': 500
          },
        ],
        icon: "el-icon-setting",
        menuId: "96db7e7e42be4a04952854239463174jg",
        menuName: "救助业务监管平台系统",
        parentMenuId: "01",
        requestAction: "",
        'seq': 500
      },
      {
        appId: "08",
        children: [
          {
            appId: "0801",
            children: null,
            icon: "el-icon-setting",
            menuId: "b9cedfedx24196a542766592860567grda",
            menuName: "个人档案",
            parentMenuId: "b9cedfedx24196a542766592860567sjzx",
            requestAction: "",
            seq: 100
          },

          {
            appId: "0802",
            children: [
              
              {
                appId: "080201",
                children: [ 
                  {
                    appId: "00",
                    children: null,
                    icon: "el-icon-setting",
                    menuId: "b9ccfyj24196a5427665928605620",
                    menuName: "重复预警",
                    parentMenuId: "b9cedcyyj24196a5427665928605620",
                    requestAction: "cfyj",
                    seq: 100,
                  },
                  {
                  appId: "0201",
                    // children: [ ],
                    icon: "el-icon-setting",
                    menuId: "96jm7e7e42be4a04952854239463174cbtk",
                    menuName: "残补和特困重复预警",
                    parentMenuId: "b9cedzcyj24196a5427665928605620",
                    requestAction: "disabledTKReuse",
                    'seq': 500
                  },
                  {
                  appId: "0202",
                    icon: "el-icon-setting",
                    menuId: "96jm7e7e42be4a04952854239463174dbncb",
                    menuName: "低保内残补存疑预警",
                    parentMenuId: "b9cedzcyj24196a5427665928605620",
                    requestAction: "disabledDbnReuse",
                    'seq': 500
                  },
                  {
                  appId: "0203",
                    icon: "el-icon-setting",
                    menuId: "96jm7e7e42be4a04952854239463174dbnzlcb",
                    menuName: "低保内残补种类等级预警",
                    parentMenuId: "b9cedzcyj24196a5427665928605620",
                    requestAction: "disabledDbnzlReuse",
                    'seq': 500
                  },
                  {
                  appId: "0204",
                    icon: "el-icon-setting",
                    menuId: "96jm7e7e42be4a04952854239463174dsrcb",
                    menuName: "低收入家庭残补存疑预警",
                    parentMenuId: "b9cedzcyj24196a5427665928605620",
                    requestAction: "disabledDsrReuse",
                    'seq': 500
                  },
                  {
                  appId: "0205",
                    icon: "el-icon-setting",
                    menuId: "96jm7e7e42be4a04952854239463174dbwcb",
                    menuName: "低保外残补存疑预警",
                    parentMenuId: "b9cedzcyj24196a5427665928605620",
                    requestAction: "disabledDbwReuse",
                    'seq': 500
                  },
                ],
                icon: "el-icon-setting",
                menuId: "b9cedzcyj24196a5427665928605620",
                menuName: "政策落实情况监督", //原政策落实预警
                parentMenuId: "96db7e7e42be4a04952854239463173ff",
                requestAction: "zcyj",
                seq: 100,
              },
              {
                appId: "080202",
                children: [
                  {
                    appId: "08020201",
                    children: null,
                    icon: "el-icon-setting",
                    menuId: "b9cedfedx24196a542766592860567sdqjfqk",
                    menuName: "水电气缴费情况",
                    parentMenuId: "b9cedfedx24196a542766592860567shzkbdjc",
                    requestAction: "sdqjfqk",
                    seq: 100
                  },
                  {
                    appId: "08020202",
                    children: null,
                    icon: "el-icon-setting",
                    menuId: "b9cedfedx24196a542766592860567txcxqk",
                    menuName: "通讯出行情况",
                    parentMenuId: "b9cedfedx24196a542766592860567shzkbdjc",
                    requestAction: "txcxqk",
                    seq: 100
                  },
                  {
                    appId: "08020203",
                    children: null,
                    icon: "el-icon-setting",
                    menuId: "b9cedfedx24196a542766592860567jbkfqk",
                    menuName: "疾病康复情况",
                    parentMenuId: "b9cedfedx24196a542766592860567shzkbdjc",
                    requestAction: "jbkfqk",
                    seq: 100
                  },
                ],
                icon: "el-icon-setting",
                menuId: "b9cedfedx24196a542766592860567shzkbdjc",
                menuName: "生活状况变动检测",
                parentMenuId: "b9cedfedx24196a542766592860567dtgl",
                requestAction: "",
                seq: 100
              },
              {
                appId: "080203",
                children: [],
                icon: "el-icon-setting",
                menuId: "b9cedfedx24196a542766592860567qtzkbdjc",
                menuName: "其他状况变动检测",
                parentMenuId: "b9cedfedx24196a542766592860567dtgl",
                requestAction: "",
                seq: 100
              },
              {
                appId: "080203",
                children: null,
                icon: "el-icon-setting",
                menuId: "96jm7e7e42be4a04952854239463174tbjm",
                menuName: "同步金民",
                parentMenuId: "b9cedfedx24196a542766592860567dtgl",
                requestAction: "tbjmList",
                'seq': 500
              },
            ],
            icon: "el-icon-setting",
            menuId: "b9cedfedx24196a542766592860567dtgl",
            menuName: "动态管理",
            parentMenuId: "b9cedfedx24196a542766592860567sjzx",
            requestAction: "",
            seq: 100
          },
          {
            appId: "0803",
            children: null,
            icon: "el-icon-setting",
            menuId: "b9cedfedx24196a542766592860567ty",
            menuName: "统一查询",
            parentMenuId: "b9cedfedx24196a542766592860567sjzx",
            requestAction: "tycx",
            seq: 100
          },
          {
            appId: "0804",
            children: [
              {
                  appId: "080401",
                  icon: "el-icon-setting",
                  menuId: "96db7e7e42be4a04952854239463177tj00",
                  menuName: "数据图表",
                  parentMenuId: "96db7e7e42be4a04952854239463177tj",
                  requestAction: "echarts",
                  'seq': 100
              },
              {
                  appId: "080402",
                  icon: "el-icon-setting",
                  menuId: "96db7e7e42be4a04952854239463177tj01",
                  menuName: "社会救助任务进度表",
                  parentMenuId: "96db7e7e42be4a04952854239463177tj",
                  requestAction: "tjfx",
                  'seq': 100
                },
              
              {
                  appId: "080403",
                  icon: "el-icon-setting",
                  menuId: "96db7e7e42be4a04952854239463177tj02",
                  menuName: "特困供养季度表",
                  parentMenuId: "96db7e7e42be4a04952854239463177tj",
                  requestAction: "tkQuarterlyTable",
                  'seq': 100
                },
              {
                  appId: "080404",
                  icon: "el-icon-setting",
                  menuId: "96db7e7e42be4a04952854239463177tj03",
                  menuName: "低保季度表",
                  parentMenuId: "96db7e7e42be4a04952854239463177tj",
                  requestAction: "dibaoStatistical",
                  'seq': 100
                },
              {
                  appId: "080405",
                  icon: "el-icon-setting",
                  menuId: "96db7e7e42be4a04952854239463177tj04",
                  menuName: "临时救助季度表",
                  parentMenuId: "96db7e7e42be4a04952854239463177tj",
                  requestAction: "lsStatistical",
                  'seq': 100
                },
              {
                  appId: "080406",
                  icon: "el-icon-setting",
                  menuId: "96db7e7e42be4a04952854239463177tj05",
                  menuName: "低保特定对象统计表",
                  parentMenuId: "96db7e7e42be4a04952854239463177tj",
                  requestAction: "dibaoTDStatistical",
                  'seq': 100
                },
              {
                  appId: "080407",
                  icon: "el-icon-setting",
                  menuId: "96db7e7e42be4a04952854239463177tj06",
                  menuName: "低保特困进度表",
                  parentMenuId: "96db7e7e42be4a04952854239463177tj",
                  requestAction: "schedule",
                  'seq': 100
                },
              {
                  appId: "080408",
                  icon: "el-icon-setting",
                  menuId: "96db7e7e42be4a04952854239463177tj07",
                  menuName: "低收入人口统计表",
                  parentMenuId: "96db7e7e42be4a04952854239463177tj",
                  requestAction: "dsrListTable",
                  'seq': 100
                },
            ],
            icon: "el-icon-setting",
            menuId: "96db7e7e42be4a04952854239463177tj",
            menuName: "统计分析",
            parentMenuId: "b9cedfedx24196a542766592860567sjzx",
            requestAction: "",
            'seq': 500
          },
        ],
        icon: "el-icon-setting",
        menuId: "b9cedfedx24196a542766592860567sjzx",
        menuName: "数据中心",
        parentMenuId: "",
        requestAction: "",
        seq: 100
      },
      
      {
        appId: "01",
        icon: "el-icon-setting",
        menuId: "96db7e7e42be4a04952854239463177ff1",
        menuName: "供养机构",   //原养老机构
        parentMenuId: "01",
        requestAction: "yljgList",
        'seq': 500
      },
      {
        appId: "0101",
        children: [{
          	appId: "010101",
          	children: null,
          	icon: "el-icon-setting",
          	menuId: "b9cedfedx24196a542766592860567ff",
          	menuName: "生成救助资金发放名单",
          	parentMenuId: "96db7e7e42be4a04952854239463177ff",
          	requestAction: "jzffCreate",
          	seq: 100
          },
           {
          	appId: "010102",
          	children: null,
          	icon: "el-icon-setting",
          	menuId: "b9cedfedx24196a542766592860567fe",
          	menuName: "救助资金发放信息管理",
          	parentMenuId: "96db7e7e42be4a04952854239463177ff",
          	requestAction: "jzffList",
          	seq: 100
          },
           {
          	appId: "010103",
          	children: null,
          	icon: "el-icon-setting",
          	menuId: "b9cedfedx24196a542766592860567fd",
          	menuName: "个人享受待遇信息管理",
          	parentMenuId: "96db7e7e42be4a04952854239463177ff",
          	requestAction: "jzdyList",
          	seq: 100
          },
        ],
        icon: "el-icon-setting",
        menuId: "96db7e7e42be4a04952854239463177ff",
        menuName: "资金发放",
        parentMenuId: "01",
        requestAction: "",
        'seq': 500
      },

      {
            appId: "05010",
            children: null,
            icon: "el-icon-setting",
            menuId: "b9cedfedx24196a542766592860567dqzf",
            menuName: "定期走访",
            parentMenuId: "",
            requestAction: "dqzfList",
            seq: 100
          },
      // {
      //   appId: "010104",
      //   children: null,
      //   icon: "el-icon-setting",
      //   menuId: "b9cedfedx24196a542766592860567jdlkfp",
      //   menuName: "建档立卡扶贫",
      //   parentMenuId: "",
      //   requestAction: "jdlkList",
      //   seq: 100
      // },
      // {
      //   appId: "010104",
      //   children: null,
      //   icon: "el-icon-setting",
      //   menuId: "b9cedfedx24196a542766592860567cw",
      //   menuName: "错误数据补录",
      //   parentMenuId: "02",
      //   requestAction: "cwbl",
      //   seq: 100
      // },
      
     
       // {
    //     appId: "01",
    //     children: [{
    //       	appId: "00",
    //       	children: null,
    //       	icon: "el-icon-setting",
    //       	menuId: "b9cedfedx24196a54276659286056501",
    //       	menuName: "服务对象推送",
    //       	parentMenuId: "96db7e7e42be4a04952854239463176ff",
    //       	requestAction: "",
    //       	seq: 100
    //       },
    //        {
    //       	appId: "00",
    //       	children: null,
    //       	icon: "el-icon-setting",
    //       	menuId: "b9cedjzda24196a54276659286056502",
    //       	menuName: "救助档案",
    //       	parentMenuId: "96db7e7e42be4a04952854239463176ff",
    //       	requestAction: "",
    //       	seq: 100
    //       },
    //     ],
    //     icon: "el-icon-setting",
    //     menuId: "96db7e7e42be4a04952854239463176ff",
    //     menuName: "个人服务",
    //     parentMenuId: "01",
    //     requestAction: "",
    //     'seq': 500
    //   },
     
    );


 // 修改-----1102
// 打包注释-----------------------
    // console.log(menuList);
    // 字符串ceshiBtn的长度是否为4，是--添加"测试"菜单并显示，否不添加"测试菜单"
    if(ceshiBtn.length==4){
      // console.log(menuList[0].children,"----------------");
      menuList.push(
        {
          appId: "10",
          children: null,
          icon: "el-icon-setting",
          menuId: "ceshi",
          menuName: "测试",
          parentMenuId: "96db7e7e42be4a04952854239463171ff",
          requestAction: "ceshi",
          seq: 100,
        }
      )
    }else{
      console.log(ceshiBtn,"ceshiBtn不符合条件");
      // console.log(menuList[0].children,"----------------");
    }
// 打包注释-----------------------
    this.items = menuList;
    this.listitmes = menuList;
    bus.$on("collapse", (msg) => {
      this.collapse = msg;
    });
    bus.$on("tags", (msg) => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
    });
    this.handleShow();
    $("#body")[0].className = this.$store.state.globalTheme;
  },
  methods: {

    getMenuList() {
      let menuList = sessionStorage.getItem(generalConfig.menuListName);
      this.items = menuList;
      this.listitmes = menuList;
    },

    handleShow() {
      generalConfig.hasLayout === undefined ? (this.show = true): (this.show = generalConfig.hasLayout);
        
      generalConfig.hasTopLayout === undefined  ? (this.headBanner = true): (this.headBanner = generalConfig.hasTopLayout);
      
      generalConfig.hasToggleAnimation === undefined ? (this.transitionName = "move")  : generalConfig.hasToggleAnimation    ? (this.transitionName = "move") : (this.transitionName = "");
       
    },

    listItem(value) {
      this.listitmes = value;
    },
  },
};
</script>
<style scoped>
.content-outer {
  margin: 10px;
  background-color: transparent;
  overflow-y: auto;
}

.content {
  min-width: 600px;
  padding: 18px;
  overflow-y: auto;
}
</style>
// 全局样式，所有的滚动条都用此样式
<style>
::-webkit-scrollbar {
  width: 8px;
  /* 纵向滚动条宽度 */
  height: 16px;
  /*横向滚动条宽度*/
}

::-webkit-scrollbar-thumb {
  border-radius: 8px;
  /* 滚动条圆角 */
  background-color: rgb(194, 194, 194);
}
</style>
<style lang="scss">
/* 全局UI组件库样式 */
.UIL-container {
  padding: 50px 8%;
  background-color: #fff;

  h1 {
    font-size: 40px;
    font-weight: normal;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  h2 {
    font-weight: normal;
    margin-top: 40px;
    margin-bottom: 14px;
  }

  p {
    line-height: 24px;
  }
}

.margin-b {
  margin-bottom: 10px;
}

.wrapper {
  background-color: #f2f2f2;
}

.no-layout {
  padding: 20px;
}
</style>
<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
  font-size: 15px;
  color: #666666;
}

.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
}

@media (max-width: 1400px) {
  .el-breadcrumb {
    margin-bottom: 15px;
  }
}
</style>

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
          <div class="content" id="content">
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
                menuId: "b9ccfyj24196a5427665928605620",
                menuName: "重复预警",
                parentMenuId: "b9cedcyyj24196a5427665928605620",
                requestAction: "cfyj",
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
          
          {
            appId: "00",
            children: null,
            icon: "el-icon-setting",
            menuId: "b9cedccffce24196a5427665928605611",
            menuName: "群众申办",   //原群众申请
            parentMenuId: "96db7e7e42be4a04952854239463173ff",
            requestAction: "qzsq",
            seq: 100,
          },
         
          {
            appId: "00",
            children: null,
            icon: "el-icon-setting",
            menuId: "b9cedccffce24196a5427665928605620",
            menuName: "主动排查",
            parentMenuId: "96db7e7e42be4a04952854239463173ff",
            requestAction: "zdpc",
            seq: 100,
          },
          {
            appId: "00",
            children: null,
            icon: "el-icon-setting",
            menuId: "b9cedccffce24196a5427665928605612",
            menuName: "建档立卡预警", // 原建档立卡推送/预警推送
            parentMenuId: "96db7e7e42be4a04952854239463173ff",
            requestAction: "yj",
            seq: 100,
          },
          {
            appId: "00",
            children: null,
            icon: "el-icon-setting",
            menuId: "b9cedccffce24196a5427665928605713",
            menuName: "医保预警",   //原医疗推送
            parentMenuId: "96db7e7e42be4a04952854239463173ff",
            requestAction: "ylts",
            seq: 100,
          },
            {
            appId: "00",
            children: null,
            icon: "el-icon-setting",
            menuId: "b9cedccffce24196a5427665928605714",
            menuName: "团市委预警",   
            parentMenuId: "96db7e7e42be4a04952854239463173ff",
            requestAction: "tsw",
            seq: 100,
          },
            {
            appId: "00",
            children: null,
            icon: "el-icon-setting",
            menuId: "b9cedccffce24196a5427665928605715",
            menuName: "12345涉救预警",   
            parentMenuId: "96db7e7e42be4a04952854239463173ff",
            requestAction: "sjyj",
            seq: 100,
          },
            {
            appId: "00",
            children: null,
            icon: "el-icon-setting",
            menuId: "b9cedccffce24196a5427665928605716",
            menuName: "水电预警",   //水电费减免
            parentMenuId: "96db7e7e42be4a04952854239463173ff",
            requestAction: "sdyj",
            seq: 100,
          },
            {
            appId: "00",
            children: null,
            icon: "el-icon-setting",
            menuId: "b9cedccffce24196a5427665928605717",
            menuName: "住房预警",   //住房救助
            parentMenuId: "96db7e7e42be4a04952854239463173ff",
            requestAction: "zfyj",
            seq: 100,
          },
          {
            appId: "00",
            children: null,
            icon: "el-icon-setting",
            menuId: "b9cedccffce24196a5427665928605718",
            menuName: "消防预警",   //
            parentMenuId: "96db7e7e42be4a04952854239463173ff",
            requestAction: "xfyj",
            seq: 100,
          },
          {
            appId: "00",
            children: null,
            icon: "el-icon-setting",
            menuId: "b9cedccffce24196a5427665928605719",
            menuName: "物价预警",   //物价补贴
            parentMenuId: "96db7e7e42be4a04952854239463173ff",
            requestAction: "wjyj",
            seq: 100,
          },
        ],
        icon: "el-icon-setting",
        menuId: "96db7e7e42be4a04952854239463173ff",
        menuName: "预警信息",
        parentMenuId: "",
        requestAction: "",
        seq: 500
      },{
        appId: "01",
        // children: [ ],
        icon: "el-icon-setting",
        menuId: "96db7e7e42be4a04952854239463174ff",
        menuName: "对比信息",
        parentMenuId: "01",
        requestAction: "jthdList",
        'seq': 500
      },{
        appId: "01",
        // children: [ ],
        icon: "el-icon-setting",
        menuId: "96jm7e7e42be4a04952854239463174ff",
        menuName: "同步金民",
        parentMenuId: "01",
        requestAction: "tbjmList",
        'seq': 500
      },{
        appId: "01",
        children: [{
          	appId: "00",
          	children: null,
          	icon: "el-icon-setting",
          	menuId: "b9cedtkfh24196a54276659286056501",
          	menuName: "特困供养复核",
          	parentMenuId: "96db7e7e42be4a04952854239463175fh",
          	requestAction: "tkFhList",
          	seq: 100

        },{
          	appId: "00",
          	children: null,
          	icon: "el-icon-setting",
          	menuId: "b9ceddbfh24196a54276659286056502",
          	menuName: "低保复核",
          	parentMenuId: "96db7e7e42be4a04952854239463175fh",
          	requestAction: "dbFhList",
          	seq: 100

        },{
          	appId: "00",
          	children: null,
          	icon: "el-icon-setting",
          	menuId: "b9ceddbfh24196a54276659286056503",
          	menuName: "单人保复核",
          	parentMenuId: "96db7e7e42be4a04952854239463175fh",
          	requestAction: "dsrFhList",
          	seq: 100

        },{
          	appId: "00",
          	children: null,
          	icon: "el-icon-setting",
          	menuId: "b9ceddbfh24196a54276659286056504",
          	menuName: "支出困难复核",
          	parentMenuId: "96db7e7e42be4a04952854239463175fh",
          	requestAction: "zcFhList",
          	seq: 100

        }],
        icon: "el-icon-setting",
        menuId: "96db7e7e42be4a04952854239463175fh",
        menuName: "数据复核",
        parentMenuId: "01",
        requestAction: "",
        'seq': 500
    },{
        appId: "01",
        children: [
          {
            appId: "00",
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
            menuName: "特困人员供养",
            parentMenuId: "96db7e7e42be4a04952854239463175ff",
            requestAction: "tk",
            seq: 100,
          },{
            appId: "00",
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
            menuId: "96db7e7e42be4a04952854239463171fa",
            menuName: "最低生活保障",
            parentMenuId: "96db7e7e42be4a04952854239463175ff",
            requestAction: "zd",
            seq: 100,
          },{
            appId: "00",
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
            menuName: "单人保家庭",  //原低收入家庭
            parentMenuId: "96db7e7e42be4a04952854239463175ff",
            requestAction: "",
            seq: 100,
          },{
             appId: "00",
              // children:[],
              icon: "el-icon-setting",
              menuId: "96dbby7e7e42be4a04952854239463171ff",
              menuName: "低保边缘家庭",
              parentMenuId: "96db7e7e42be4a04952854239463175ff",
              requestAction: "dbbyList",
              seq: 100,
          }, {
            appId: "00",
            children: [
              {
                  appId: "00",
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
            appId: "00",
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
          	appId: "00",
          	children: null,
          	icon: "el-icon-setting",
          	menuId: "b9cedcjr24196a54276659286056508",
          	menuName: "残疾人补贴",
          	parentMenuId: "96db7e7e42be4a04952854239463175ff",
          	requestAction: "disableList",
          	seq: 100
          },
        ],
      icon: "el-icon-setting",
      menuId: "96db7e7e42be4a04952854239463175ff",
      menuName: "审批确定",
      parentMenuId: "01",
      requestAction: "",
      'seq': 500
    },
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
      {
        appId: "01",
        children: [
           {
              appId: "0104",
              icon: "el-icon-setting",
              menuId: "96db7e7e42be4a04952854239463177tj01",
              menuName: "社会救助任务进度表",
              parentMenuId: "96db7e7e42be4a04952854239463177tj",
              requestAction: "tjfx",
              'seq': 100
            },
           {
              appId: "0105",
              icon: "el-icon-setting",
              menuId: "96db7e7e42be4a04952854239463177tj02",
              menuName: "特困供养季度表",
              parentMenuId: "96db7e7e42be4a04952854239463177tj",
              requestAction: "tkQuarterlyTable",
              'seq': 100
            },
           {
              appId: "0106",
              icon: "el-icon-setting",
              menuId: "96db7e7e42be4a04952854239463177tj03",
              menuName: "低保季度表",
              parentMenuId: "96db7e7e42be4a04952854239463177tj",
              requestAction: "dibaoStatistical",
              'seq': 100
            },
           {
              appId: "0107",
              icon: "el-icon-setting",
              menuId: "96db7e7e42be4a04952854239463177tj04",
              menuName: "临时救助季度表",
              parentMenuId: "96db7e7e42be4a04952854239463177tj",
              requestAction: "lsStatistical",
              'seq': 100
            },
           {
              appId: "0108",
              icon: "el-icon-setting",
              menuId: "96db7e7e42be4a04952854239463177tj05",
              menuName: "低保特定对象统计表",
              parentMenuId: "96db7e7e42be4a04952854239463177tj",
              requestAction: "dibaoTDStatistical",
              'seq': 100
            },
           {
              appId: "0108",
              icon: "el-icon-setting",
              menuId: "96db7e7e42be4a04952854239463177tj06",
              menuName: "低保特困进度表",
              parentMenuId: "96db7e7e42be4a04952854239463177tj",
              requestAction: "schedule",
              'seq': 100
            },
           {
              appId: "0109",
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
        parentMenuId: "01",
        requestAction: "",
        'seq': 500
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
      },{
        appId: "00",
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
            requestAction: "kjetListChange",
            seq: 100,
          },  {
            appId: "00",
            children: null,
            icon: "el-icon-setting",
            menuId: "b9cedccffce24196a5427665928605617",
            menuName: "困境儿童注销",
            parentMenuId: "b9cedccffce24196a5427665928605614",
            requestAction: "kjetListCancel",
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
        appId: "010104",
        children: null,
        icon: "el-icon-setting",
        menuId: "b9cedfedx24196a542766592860567cw",
        menuName: "错误数据补录",
        parentMenuId: "02",
        requestAction: "cwbl",
        seq: 100
      }
    );


 // 修改-----1102
// 打包注释-----------------------
    // console.log(menuList);
    // 字符串ceshiBtn的长度是否为4，是--添加"测试"菜单并显示，否不添加"测试菜单"
    if(ceshiBtn.length==4){
      // console.log(menuList[0].children,"----------------");
      menuList[0].children.push(
        {
          appId: "00",
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
  padding: 15px;
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

<template>
  <div class="dbhc">
    <header>
      风险等级评估儿童列表
    </header>

    <div class="searchBox">
      <van-sticky>
        <van-dropdown-menu active-color="#1989fa">
          <van-dropdown-item v-model="value2"
                             :options="option2"
                             @change="changeEvent" />
          <van-dropdown-item title="搜索">

            <van-cell>
              <van-search v-model="searchValue"
                          show-action
                          placeholder="请输入姓名/身份证号码"
                          @search="onSearch">
                <template #action>
                  <div @click="onSearch">搜索</div>
                </template>
              </van-search>
            </van-cell>
            <van-cell>
              <div style="padding: 5px 16px;">

                <van-uploader :before-read="beforeRead"
                              :after-read="uploadImg('idCard')"
                              style="width:100%;display: block;">
                  <!-- <template #button> -->
                  <van-button size="small"
                              block
                              type="info"
                              native-type="button"
                              style="width:100%;display: block;">拍照识别
                  </van-button>
                  <!-- </template> -->
                </van-uploader>
              </div>
            </van-cell>
          </van-dropdown-item>
        </van-dropdown-menu>

      </van-sticky>
    </div>

    <main>

      <van-pull-refresh v-model="refreshing"
                        @refresh="onRefresh">
        <van-list v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad">
          <div class="pg"
               v-for="(item,index) in childrenList"
               :key='index'
               @click="routerPush(item.id,index)">
            <van-cell-group>
              <van-cell>

                <van-row>
                  <van-col span="24">
                    <span style="color: #333333;margin-left:0px">任务ID：{{item.taskSubId}}</span>
                  </van-col>
                </van-row>

                <van-row>
                  <van-col span="17">
                    <span style="color: #333333;">
                      姓名：{{item.name}}
                    </span>
                  </van-col>
                  <van-col span="7">
                    <span style="margin-left:10px">
                      <van-tag size="medium"
                               v-if="item.level && item.level.indexOf('一级')!=-1"
                               type="danger">{{item.level}}</van-tag>
                      <van-tag size="medium"
                               v-else-if="item.level && item.level.indexOf('二级')!=-1"
                               type="warning">{{item.level}}</van-tag>
                      <van-tag size="medium"
                               v-else-if="item.level && item.level.indexOf('三级')!=-1"
                               type="primary">{{item.level}}</van-tag>
                      <van-tag size="medium"
                               v-else-if="item.level && item.level.indexOf('四级')!=-1"
                               type="success">{{item.level}}</van-tag>
                      <van-tag size="medium"
                               v-else
                               color="#aaa">未完成</van-tag>
                    </span>
                  </van-col>
                </van-row>

                <van-row>
                  <van-col span="24">
                    <span style="color: #333333;margin-left:0px">身份证号：{{(item.idCard).replace(/(\w{4})\w*(\w{4})/, '$1****$2')}}</span>
                  </van-col>
                </van-row>

              </van-cell>
            </van-cell-group>

          </div>
        </van-list>
      </van-pull-refresh>
    </main>
  </div>
</template>

<script>
import request from '@/utils/request.js'
import { isCardID, compressImg } from '@/utils/utils.js'
export default {
  name: 'hc',
  props: ['headername', 'jz'],
  data () {
    return {
      childrenList: [],   // 儿童评估列表
      pageNo: 0,          // 第几页,后端默认0就是第一页
      pageSize: '5',       // 每页几条

      loading: false,
      finished: false,
      refreshing: false,
      searchValue: '',
      searchName: '',
      searchidCard: '',

      // 下拉菜单
      value1: '',
      value2: '评估状态',
      searchData: '',

      option2: [
        { text: '评估状态', value: '评估状态' },
        { text: '全部', value: '全部' },
        { text: '完成', value: '完成' },
        { text: '未完成', value: '未完成' },
      ],

      fileList2: [],//照片列表
      options: []
    }
  },

  created () {

    // this.loadData()
    request({
      method: 'post',
      url: '/social/assistanceWeixin/getCitys',
      data: {}
    }).then(res => {
      console.log(res, '接口区划');
      // 市区
      for (let i in res) {
        this.options.push({ text: '', value: '', children: [] });
        this.options[i].text = res[i].n.split('#')[0];
        this.options[i].value = '#' + res[i].n.split('#')[1];
        // 街道
        for (let j in res[i].c) {
          // this.options[i].children=[]
          this.options[i].children[j] = { text: '', value: '', children: [] };
          this.options[i].children[j].text = res[i].c[j].n.split('#')[0];
          this.options[i].children[j].value = '#' + res[i].c[j].n.split('#')[1];
          // 村居
          for (let k in res[i].c[j].a) {
            this.options[i].children[j].children[k] = { text: '', value: '' };
            this.options[i].children[j].children[k].text = res[i].c[j].a[k].split('#')[0];
            this.options[i].children[j].children[k].value = '#' + res[i].c[j].a[k].split('#')[1];
          }

        }

      }
      console.log(this.options, '区划');

    }).catch(res => {
      console.log(res, 'xzqh');
      this.$toast.fail('数据请求失败1')
    })

  },
  watch: {
    // '$route':{
    // 	handler(newVal,oldVal){
    // 		console.log(sessionStorage.getItem('token'))
    // 		this.loadData({
    // 			'page':this.page.toString(),
    // 			'sqlwhere':"",
    // 		}).then(res => {
    // 		console.log(res)
    // 		for(let i = 0;i<res.length;i++){
    // 			this.$set(this.childrenList,i,{
    // 				ab_ex15:unescape(res[i].ab_ex15),
    // 				ab_ex3: unescape(res[i].ab_ex3),
    // 				ab_ex13:unescape(res[i].ab_ex13),
    // 				ab_ex28:unescape(res[i].ab_ex28),
    // 				ab_ex5:unescape(res[i].ab_ex5),
    // 				ab_ex11:unescape(res[i].ab_ex11),
    // 				ab_dat14:unescape(res[i].ab_dat14),
    // 				bgcolor:unescape(res[i].ab_ex15)!="申请" ? '#bcbcbc' : '#48b4fd',
    // 			} )
    // 			console.log(this.childrenList)
    // 		}
    // 	}).catch(error => {
    // 		console.log(error)
    // 	})
    // 		// console.log(newVal)
    // 		// console.log(oldVal)
    // 	},
    // 	deep:true,
    // 	immediate:true
    // }
  },
  methods: {

    // 状态筛选
    changeEvent () {
      // console.log(this.value1);
      console.log(this.value2);
      this.pageNo = 0;
      if (this.value2 == '评估状态' || this.value2 == '全部') {
        this.value1 = '';

      } else if (this.value2 == '未完成') {
        this.value1 = '未完成';
      } else if (this.value2 == '完成') {
        this.value1 = '完成';
      }
      this.onRefresh();
    },

    // 请求数据
    loadData (data) {
      return request({
        method: 'post',
        url: '/social/childEvaluate/getChildList',
        data,
        headers: {
          token: sessionStorage.getItem('token'),
          // token: sessionStorage.getItem('token'),
        }
      })
    },

    // 刷新
    onLoad () {
      // 是否刷新
      if (this.refreshing) {
        this.childrenList = [];
        this.pageNo = 0
      }

      this.loading = false;

      this.loadData({
        'pageNo': this.pageNo.toString(),
        'pageSize': this.pageSize.toString(),


      }).then(res => {

        // 关闭刷新
        this.refreshing = false;
        console.log(res, 'res')
        console.log(res, 'res')

        if (res.status == "+OK") {



          this.childrenList = res.data.content;

        } else {
          this.$toast.fail('数据加载失败')
          // this.childrenList = [];
          console.log('loadData数据加载失败');
        }

        // 是否处于加载状态
        this.loading = false;
        this.pageNo++;

        console.log(this.childrenList, '儿童列表')
        console.log(this.pageNo)

        if (this.childrenList.length == 0) {
          this.finished = true;
        }

      }).catch(error => {
        console.log(error)
      })
    },

    // 刷新-重置
    onRefresh () {
      // 清空列表数据
      this.finished = false;
      this.childrenList = [];

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },

    // 查询
    onSearch () {
      this.refreshing = true
      // 判断是身份证还是姓名
      this.searchidCard = ""
      this.searchName = ""
      isCardID(this.searchValue) == '' ? this.searchidCard = this.searchValue : this.searchName = this.searchValue;
      this.onRefresh();

    },

    // 跳转
    routerPush (id, index) {

      this.$router.push({
        path: '/kjetfxpg',
        query: {
          taskSubId: this.childrenList[index].taskSubId,
          recordId: this.childrenList[index].recordId,

        }
      })
    },

    // 照片上传前
    beforeRead (file) {
      if (file.type == 'image/heic' || file.type == '') {
        this.$toast.fail('照片格式不正确')
        return false
      } else {
        return true
      }
    },

    imgRequest (formData, file, num, index) {
      // console.log('index',index);
      request({
        method: 'post',
        url: '/social/weixinMinios/fileUpload',
        data: formData,
      }).then(res => {
        file.status = 'done';
        file.message = '上传完成';
        console.log(res);

        // console.log('1111', num,'imgRequest-num');
        // 身份证照片识别 自动填报姓名、身份证等
        if (num.indexOf('idCard') != -1) {

          // 需要发送身份证照片到后台获取身份证号和姓名是否和前面输入的身份证号，姓名相同
          request({
            method: 'post',
            url: '/social/assistanceWeixin/idOrc',
            data: {
              img: file.content
            }

          }).then(res => {
            // if(num==20){
            console.log(res, 'res');
            // console.log(res[0].data.words_result,'res');

            if (res[0].status == 'ok') {

              // if(res[0].data[0].status=="ok"){
              try {


                let data = res[0].data.words_result;
                console.log(data);

                if (num == 'idCard') {

                  // this.form.ab_ex3 = data["姓名"].words;
                  data["公民身份号码"].words = data["公民身份号码"].words.replace(/\s+/g, "");
                  this.searchValue = data["公民身份号码"].words;
                  this.onSearch();
                  // this.form.ab_ex4 = data["住址"].words;

                } else {
                  this.$toast.fail('身份证对比信息不符,请上传正确的身份证1')
                }

              } catch (e) {
                console.log(e);
                this.fileList2.pop()
                this.$toast.fail('身份证对比信息不符,请上传正确的身份证2')
              }

            } else {
              this.fileList2.pop()
              this.$toast.fail('身份证对比信息不符,请上传正确的身份证3')
            }


          }).catch(err => {
            console.log(err)
          })

        }


      }).catch(erro => {
        file.status = 'failed';
        file.message = '上传失败';

        this.$toast.fail('上传失败')
        console.log(erro)
      })
    },
    // 组件方法 获取 流
    uploadImg (num, index) {
      return file => {
        file.status = 'uploading';
        file.message = '上传中...';

        console.log(file.file)

        // 执行压缩图片并上传
        let obj = new compressImg(file, num, this.imgRequest, index)

      }
    },
  },

}
</script>

<style scoped>
.dbhc {
  display: flex;
  flex-direction: column;
  align-childrenlist: center;
  background-color: #efefef;
  min-height: 100vh;
}

header {
  height: 88px;
  line-height: 100px;
  width: 100%;
  font-size: 36px;
  color: #ffffff;
  background: #3e80cc;
}
.searchBox {
  width: 100%;
}
main {
  text-align: center;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 200px;
}

.hcHeader {
  margin-top: 20px;
  width: 90%;
  display: flex;
  line-height: 20px;
  font-size: 32px;
  justify-content: space-between;
}

/* .hcHeader1 {
		display: flex;
	}

	.hcHeader2 {
		width: 90%;
		display: flex;
		margin-top: 20px;
		color: #666666;
	}

	.hcHeader3 {
		width: 90%;
		display: flex;
		margin-top: 10px;
		color: #666666;
	} */
/* 
	.hcHeader4 {
		width: 90%;
		text-align: right;
		margin-top: 10px;
		color: #666666;
	} */

/* .circle::before {
        content: ;
		width: 20px;
		height: 20px;
		border-radius: 50px;
		line-height: 20px;
        background-color: #999;
	} */
</style>

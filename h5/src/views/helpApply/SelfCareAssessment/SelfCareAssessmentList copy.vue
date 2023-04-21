<template>
  <div class="dbhc">
    <header>
      <!-- {{headername}} -->
      特困自理能力评估
    </header>
    <div class="searchBox">
      <van-sticky>
        <van-dropdown-menu active-color="#1989fa">
          <!-- <van-dropdown-item v-model="value1" :options="options"  title="行政区划" /> -->
          <van-dropdown-item v-model="value2"
                             :options="option2"
                             @change="changeEvent" />
          <!-- <van-dropdown-item v-model="value2" :options="option3" title="筛选" > -->

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
                              :after-read="uploadImg('IDCard')"
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
          <!-- <van-dropdown-item>

						<template #button>
							<van-uploader :before-read="beforeRead" :after-read="uploadImg(2)" :before-delete="beforeDelete('photo')" >
								<van-button size="small" type="info" native-type="button" >拍照识别
								</van-button>
							</van-uploader>
						</template>
					</van-dropdown-item> -->
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
          <div class="hc"
               v-for="(item,index) in items"
               :key='index'
               @click="routerPush(item.ab_id,index)">
            <div class="hcHeader">
              <div class="hcHeader1">
                <div class="circle"
                     :style="{backgroundColor:item.bgcolor}"></div>
                <div style="color: #333333;margin-left:5px">{{item.ab_ex3}}</div>
              </div>
              <!-- <div style="color: #666666;">{{item.ab_ex15}}</div> -->
              <div style="color: #666666;">评估状态：{{item.aer_ex10}}</div>
            </div>
            <div class="hcHeader2">
              <div>身份证号：{{item.abm_ex2}}</div>
            </div>
            <div class="hcHeader3">
              <div>联系电话：{{item.ab_ex28}}</div>
              <!-- <div style="margin-left: 10px;">家庭人口：{{item.ab_ex5}}</div> -->
            </div>
            <div class="hcHeader3">
              <div>供养机构：{{item.ab_ex195 ? item.ab_ex195 : "无"}}</div>
            </div>
            <!-- <div class="hcHeader3">现住地：{{item.ab_ex11}}</div> -->
            <!-- <div class="hcHeader3">所属区划：{{item.ab_ex162}}</div> -->
            <div class="hcHeader4">申请日期：{{item.ab_dat14}}</div>
          </div>
        </van-list>
      </van-pull-refresh>
    </main>
    <!-- 尊老金不需要主动救助 -->
    <!-- <van-button v-if="$route.query.stype!='尊老金'" style="width: 90%;position: fixed;bottom: 20px;" type="info" block :to="this.jz+'?sId=&type='+this.$route.query.stype+'&ab_ex100=Y'">主动救助</van-button> -->
  </div>
</template>

<script>
equest from '@/utils/request.js'
import { isCardID, compressImg } from '@/utils/utils.js'
// import {tszfValidate,tszfFilter,tszfFilter2,getSex,getAge,nation,isCardID,xzqh,compressImg} from '@/utils/utils.js'
export default {
  name: 'hc',
  props: ['headername', 'jz'],
  data () {
    return {
      items: [],

      page: "1",
      ab_ex15: '',
      ab_ex96: '',
      ab_ex3: '',
      ab_ex13: '',
      bgcolor: '#bcbcbc', //圆点颜色
      loading: false,
      finished: false,
      refreshing: false,
      searchValue: '',
      searchName: '',
      searchIdCard: '',

      // 下拉菜单
      value1: '',
      value2: '评估状态',
      searchData: '',
      option1: [
        { text: '行政区划', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
      ],
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
    this.onLoad();
    request({
      method: 'post',
      url: '/social/assistanceWeixin/getCitys',
      data: {}
    }).then(res => {
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
    }).catch(res => {
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
    // 			this.$set(this.items,i,{
    // 				ab_ex15:unescape(res[i].ab_ex15),
    // 				ab_ex3: unescape(res[i].ab_ex3),
    // 				ab_ex13:unescape(res[i].ab_ex13),
    // 				ab_ex28:unescape(res[i].ab_ex28),
    // 				ab_ex5:unescape(res[i].ab_ex5),
    // 				ab_ex11:unescape(res[i].ab_ex11),
    // 				ab_dat14:unescape(res[i].ab_dat14),
    // 				bgcolor:unescape(res[i].ab_ex15)!="申请" ? '#bcbcbc' : '#48b4fd',
    // 			} )
    // 			console.log(this.items)
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
      this.page = 1;
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
        // url: '/social/assistanceWeixin/WXListByPage?stype=' + escape(escape(this.$route.query.stype)),
        url: '/social/assistanceWeixin/TkEvaluationReportList',
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
        this.items = [];
        this.page = "1"
      }

      this.loadData({
        'page': this.page.toString(),
        // 'sqlwhere': "and ab_ex3 like "+"'%"+this.searchName+"%'"+" and ab_ex7 like " +"'%"+this.searchIdCard+"%'",
        'sqlwhere': "",
        ab_ex3: this.searchName,
        ab_ex7: this.searchIdCard,
        aer_ex10: this.value1,

      }).then(res => {
        // 关闭刷新
        this.refreshing = false;
        console.log(res, 'res')
        console.log(res[0], 'res')
        if (res.length > 0) {
          // this.items = [];
          for (let i = 0; i < res.length; i++) {
            // this.items.push({bgcolor:''})
            let num = parseInt(res[i].rownumber) - 1
            console.log(num)

            this.$set(this.items, num, {
              ab_ex15: unescape(res[i].ab_ex15),
              // abm_ex2: unescape(res[i].abm_ex2).replace(/[0-9]{4,5}/,"*"),
              abm_ex2: unescape(res[i].abm_ex2).replace(/(\w{6})\w*(\w{2})/, '$1****$2'),
              ab_ex96: unescape(res[i].ab_ex96),
              ab_ex3: unescape(res[i].ab_ex3),
              ab_ex13: unescape(res[i].ab_ex13),
              ab_ex28: unescape(res[i].ab_ex28),
              ab_ex195: unescape(res[i].ab_ex195),
              ab_ex11: unescape(res[i].ab_ex11),
              aer_ex10: unescape(res[i].aer_ex10),
              // ab_ex162: unescape(res[i].ab_ex162).split(',')[0].split('#')[0]+unescape(res[i].ab_ex162).split(',')[1].split('#')[0]+unescape(res[i].ab_ex162).split(',')[2].split('#')[0],
              ab_dat14: unescape(res[i].ab_dat14),
              ab_id: res[i].ab_id,
              aer_id: res[i].aer_id,
              bgcolor: unescape(res[i].ab_ex15) != "申请" ? "#bcbcbc" : "#48b4fd"
            })
          }
        }

        console.log(this.items, '列表数据');
        // else{
        // 	this.items = [];
        // }

        // 是否处于加载状态
        this.loading = false;
        console.log(this.items)
        this.page++;
        // this.page;
        console.log(this.page)

        if (res.length == 0) {
          this.finished = true;
        }

      }).catch(error => {
        console.log(error)
      })
    },

    // 刷新-重置
    onRefresh () {
      // 清空列表数据
      this.resetInfo()
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },

    // 查询
    onSearch () {
      this.refreshing = true
      // 判断是身份证还是姓名
      this.searchIdCard = ""
      this.searchName = ""
      isCardID(this.searchValue) == '' ? this.searchIdCard = this.searchValue : this.searchName = this.searchValue;
      this.onRefresh();
    },

    // 跳转
    routerPush (id, index) {
      console.log(id, index, "id")
      console.log(this.items[index], "this.items[index].aer_id")
      // console.log(this.$route.query.stype)
      this.$router.push({
        path: '/SelfCareAssessmentTable?sId=' + this.items[index].aer_id + 'stype=' + this.items[index].aer_ex10,
        // path:'/'+this.jz,
        query: {
          // sId:index*1+1,
          sId: this.items[index].aer_id,
          stype: this.items[index].aer_ex10,
          // type:this.$route.query.stype
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
        if (num.indexOf('IDCard') != -1) {

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

                if (num == 'IDCard') {

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
  align-items: center;
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
  width: 95%;
  margin-top: 10px;
  margin-bottom: 200px;
}

.hc {
  border: 1px solid #a1a1a1;
  border-radius: 10px;
  width: 99%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 30px;
}

.hcHeader {
  margin-top: 20px;
  width: 90%;
  display: flex;
  /* align-items: center;
		justify-content: center; */
  line-height: 20px;
  font-size: 32px;
  justify-content: space-between;
}

.hcHeader1 {
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
}

.hcHeader4 {
  width: 90%;
  text-align: right;
  margin-top: 10px;
  color: #666666;
}

.circle {
  /* background-color: #bcbcbc; */
  width: 20px;
  height: 20px;
  border-radius: 50px;
  line-height: 20px;
}
</style>

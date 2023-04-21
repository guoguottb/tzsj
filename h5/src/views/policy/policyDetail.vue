<template>
  <div class="policyDetail">
    <!-- <header>
            {{title}}
        </header>
        <main >
            <div v-for="(item ,index) in data" :key="index">  

                 <div style="margin:10px 10px ;color:#3e80cc;text-align:left">被救家庭细分{{index+1}}：{{item.familyDetail}}</div>  

                <van-cell-group class="box">
                    <van-cell>
                        <div class="a_title a_title1">补发细分：<span>{{item.reissuePayDetail}}</span></div >
                    </van-cell>

                    <van-cell>
                        <div class="a_title">分类公式：<span>{{item.classifyFormula}}</span></div>
                        <div class="a_title a_title1">分类公式说明：<span>{{item.classifyFormulaExplain}}</span></div>
                    </van-cell>

                    <van-cell>
                        <div class="a_title">单人补助公式：<span>{{item.singleSubsidyFormula}}</span></div>
                        <div class="a_title a_title1">单人补助公式说明：<span>{{item.singleSubsidyFormula}}</span></div>
                    </van-cell>

                    <van-cell>
                        <div class="a_title">家庭补助公式：<span>{{item.familySubsidyFormula}}</span></div>
                        <div class="a_title a_title1">家庭补助公式说明：<span>{{item.singleAssistanceExplain}}</span></div>
                    </van-cell>

                    
                        
                      
                      
                        
                        
                  
                    
                </van-cell-group>
            </div>
            <div class="kong" v-if='this.data.length==0'>
                <span>暂无相关内容</span>
            </div>
        </main> -->
    <!-- <iframe :src="src" style="width: 100%; height: 100vh"  id="iframe1"  padding="0"
        frameborder="no"  border="0" marginwidth="0"  marginheight="0"></iframe> -->

    <!-- 
        <van-image
        width="100"
        height="100"
        lazy-load
        src="ysjylogo.png"/> -->

    <div style="position:relative;width:100%;float: left;"
         v-for="(img,index) in fileList1"
         :key="index">
      <!-- <img v-for="(img,index) in fileList1" :key="index"  /> -->
      <!-- <van-uploader v-model="fileList1" /> -->
      <van-image v-if="img.isImage"
                 :src="img.url"
                 style="width:auto;height:auto" />

    </div>
  </div>

</template>

<script>
import request from '@/utils/request.js'
import pdf from 'vue-pdf'
// import { Lazyload } from 'vant';

export default {
  name: 'policyDetail',  // 政策详情
  components: { pdf },
  data () {
    return {

      fileList1: [],
      data: [],
      title: '题目',
      pdfPage: '1',
      pdfPage: 1,
      pdfPageCount: 1,
      imgURl: '',
      i: 0,
      values: [],
      lsimgarr: ['ls1.jpg', 'ls2.jpg', 'ls3.jpg', 'ls4.jpg'],
      kjetimgarr: ['kjet1.jpg', 'kjet2.jpg', 'kjet3.jpg', 'kjet4.jpg'],
      tkimgarr: ['tk1.jpg', 'tk2.jpg', 'tk3.jpg', 'tk4.jpg', 'tk5.jpg', 'tk6.jpg', 'tk7.jpg', 'tk8.jpg', 'tk9.jpg', 'tk10.jpg', 'tk11.jpg', 'tk12.jpg'],
      dbimgarr: ['db1.jpg', 'db2.jpg', 'db3.jpg', 'db4.jpg', 'db5.jpg', 'db6.jpg', 'db7.jpg', 'db8.jpg', 'db9.jpg', 'db10.jpg', 'db11.jpg', 'db12.jpg', 'db13.jpg', 'db14.jpg', 'db15.jpg',
        'db16.jpg', 'db17.jpg', 'db18.jpg', 'db19.jpg', 'db20.jpg', 'db21.jpg', 'db22.jpg', 'db23.jpg', 'db24.jpg', 'db25.jpg', 'db26.jpg', 'db27.jpg', 'db28.jpg'],
      dsrimgarr: ['dsr1.jpg', 'dsr2.jpg', 'dsr3.jpg', 'dsr4.jpg', 'dsr5.jpg', 'dsr6.jpg', 'dsr7.jpg', 'dsr8.jpg', 'dsr9.jpg', 'dsr10.jpg', 'dsr11.jpg', 'dsr12.jpg', 'dsr13.jpg',
        'dsr14.jpg', 'dsr15.jpg', 'dsr16.jpg', 'dsr17.jpg', 'dsr18.jpg', 'dsr19.jpg', 'dsr20.jpg', 'dsr21.jpg', 'dsr22.jpg'],
      cjr1: ['cjr1_1.jpg', 'cjr1_2.jpg', 'cjr1_3.jpg', 'cjr1_4.jpg'],
      cjr2: ['cjr2_1.jpg', 'cjr2_2.jpg', 'cjr2_3.jpg', 'cjr2_4.jpg'],
      cjr3: ['cjr3_1.jpg', 'cjr3_2.jpg', 'cjr3_3.jpg', 'cjr3_4.jpg', 'cjr3_5.jpg', 'cjr3_6.jpg', 'cjr3_7.jpg', 'cjr3_8.jpg', 'cjr3_9.jpg', 'cjr3_10.jpg', 'cjr3_11.jpg', 'cjr3_12.jpg', 'cjr3_13.jpg', 'cjr3_14.jpg', 'cjr3_15.jpg', 'cjr3_16.jpg', 'cjr3_17.jpg', 'cjr3_18.jpg', 'cjr3_19.jpg', 'cjr3_20.jpg'],
      cjr4: ['rtyj1.png','rtyj2.png','rtyj3.png','rtyj4.png','rtyj5.png','rtyj6.png','rtyj7.png','rtyj8.png','rtyj9.png','rtyj10.png','rtyj11.png','rtyj12.png','rtyj13.png','rtyj14.png','rtyj15.png','rtyj16.png','rtyj17.png','rtyj18.png','rtyj19.png','rtyj20.png','rtyj21.png','rtyj22.png','rtyj23.png','rtyj24.png','rtyj25.png','rtyj26.png','rtyj27.png','rtyj28.png','rtyj29.png','rtyj30.png','rtyj31.png','rtyj32.png',]
    }

  },
  mounted () {
    // console.log(this.src);
    // this.src.promise.then(pdf=>{
    //     this.numPages = pdf.numPages;
    // }).catch(err=>{
    //     console.log('err',err);
    // })
  },

  created () {
    this.title = this.$route.query.type
    this.getPDF();

  },

  methods: {

    getPDF () {

      console.log(this.title);
      if (this.title == '江苏省最低生活保障工作规程') {

        this.values = this.dbimgarr;
      } else if (this.title == '市政府办公室关于印发泰州市临时救助实施办法的通知') {

        this.values = this.lsimgarr;

      } else if (this.title == '江苏省特困人员认定办法') {

        this.values = this.tkimgarr;

      } else if (this.title == '市政府办公室关于城乡居民最低生活保障特困人员供养困境儿童分类保障和重度残疾人护理补贴标准的通知') {

        this.values = this.kjetimgarr;

      } else if (this.title == '市政府关于印发泰州市低收入人口认定管理办法的通知') {

        this.values = this.dsrimgarr;
      }

      if (this.title == "关于明确困难残疾人生活补贴和重度残疾人护理补贴工作相关事项的通知") this.values = this.cjr1;
      if (this.title == "关于对市区三、四级智力、精神残疾人发放生活补贴的通知") this.values = this.cjr2;
      if (this.title == "关于做好困难残疾人生活补贴和重度残疾人护理补贴发放管理工作的通知") this.values = this.cjr3;
      if (this.title == "江苏省民政厅 江苏省财政厅 江苏省残联关于完善困难残疾人生活补贴和重度残疾人护理补贴制度的实施意见（苏民规〔2022〕4号）") this.values = this.cjr4;
      // this.values = this.dsrimgarr;

      console.log(this.values)
      this.putImg();

    },

    putImg () {

      this.values[this.i] = '/social/weixinMinios/show?filename=' + this.values[this.i];
      this.imageView(this.values[this.i]).then((res) => {
        if (this.i < this.values.length - 1) {
          this.i++;
          this.putImg()
        }
        this.fileList1.push({
          url: res,
          isImage: true
        })
      }).catch(res => {
        console.log(res)
      })

    },




    // 图片查看
    imageView (url) {

      return request({
        method: 'post',
        async: true,
        url: url,
        headers: {
          'token': sessionStorage.getItem('token')
        },
        data: {

        },
      })
    },



    // ----------------------------------------------  
    getData (data) {

      request({
        method: 'post',
        url: '/social/assistanceWeixin/getPolicy',
        data: { type: data },

      }).then(res => {

        console.log(res);

        this.data = res;

      }).catch(error => {

        // 提示提交失败
        this.$toast.fail('数据加载失败')
        console.log(error)
      })
    }



  }
}
</script>

<style scoped>
.policyDetail {
  background-color: #f3f3f3;
  width: 100%;
  min-height: 100vh;
}
header {
  height: 88px;
  line-height: 100px;
  width: 100%;
  font-size: 34px;
  color: #ffffff;
  background: #3e80cc;
}
/* .box{
        margin-bottom:20px ;
    } */
.a_title {
  color: #999;
}
.a_title1 {
  margin-top: 20px;
}
.a_title > span {
  color: #111;
}
.kong {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
}
</style>
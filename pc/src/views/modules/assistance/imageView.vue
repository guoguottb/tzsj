<template>
  <div class="img-body">
    <el-carousel :height="heights"
                 :autoplay="false"
                 trigger='click'
                 @change="prev">
      <el-carousel-item v-for="(item,index) in imageList"
                        :key="index">
        <!-- <div>上一张</div> -->
        <el-image :src="item"
                  :preview-src-list="imageList">
          <div slot="error">
            <!-- 图片加载失败不显示
						<i class="el-icon-picture-outline"></i> -->
          </div>
        </el-image>
        <div>

        </div>
      </el-carousel-item>
    </el-carousel>
    <el-dialog :visible.sync="dialogVisible"
               append-to-body
               style='max-height:80VH;overflow:hidden;color:red'>
      <el-image :src="dialogImageUrl"
                :preview-src-list="imageList"
                fit="contain"
                z-index=2015></el-image>
    </el-dialog>
  </div>

</template>
<script>
import request from '@/utils/request'
export default {
  name: "imageView",
  props: ["imgList", "height", 'data', 'id', 'index'],
  data () {
    return {
      imageList: [],
      heights: "200px",
      dialogVisible: false,
      dialogImageUrl: '',
      dialogImageArray: [],
      imgIndex: 0,
      len: 0,
      requestUrl: "",
      isOk: true,
      oldImg: "",
      first: 0
    }
  },
  created () {
    this.setData();
    // if (this.height) {
    // 	this.heights =  this.height;
    // }
    // console.log("imgList===")
    // console.log( 'height',this.height)
  },

  methods: {
    prev (i) {
      // console.log(this.id,this.index,this.data);
      //  this.imageList
      console.log('触发prev', i);
      //  console.log(this.dialogImageArray);

      this.imgIndex = i;
      let data = {};
      data.index = i;
      data.id = this.id;
      this.$emit('Imgindex', JSON.stringify(data));
      // console.log('图片列表', this.imageList);
      // this.imgList;
    },

    // 获取图片数据
    async setData () {

      if (this.imgList != undefined) {

        this.len = this.imgList.length;
        this.imageList = [];
        this.requestUrl = "";
        this.isOk = this.len == 0 ? true : false;


        for (let i = 0; i < this.imgList.length; i++) {

          let urlData = this.imgList[i];
          // console.log('urlData的数据类型 =》',typeof(urlData));

          //this.requestUrl=this.requestUrl=="" ? url:this.requestUrl+","+url;
          if (typeof (urlData) == 'object') {
            console.log(this.imgList[i].abm_ex73.length);
            console.log('成员索引 =》', this.index);
            for (let j in this.imgList[i].abm_ex73) {
              // console.log('abm_ex73 =>',this.imgList[i].abm_ex73[j]);
              let url = this.imgList[this.index].abm_ex73[j];
              if (url) {
                if (url) {
                  url = url.replace("social/weixinMinios", "social/weixinMinios");
                  await request({
                    method: 'post',
                    url: url,
                    data: {}
                  }).then(res => {
                    this.imageList.push(res)
                    if (this.imageList.length >= this.len) {
                      this.isOk = true;
                    }
                  }).catch(res => {
                    // console.log(res.response.data,'照片数据');
                    this.imageList.push(res.response.data)
                    if (this.imageList.length >= this.len) {
                      this.isOk = true;
                    }
                  })
                }
              }
            }
            // 	let url = this.imgList[i].abm_ex73[j];
            // 	console.log(url);
            // 	console.log("imgList=========",this.imgList);
            // 	console.log('url的数据类型 =》',typeof(url));
            // 	console.log('url的数据类型 =》',typeof(url)=='object');

            // 	console.log(this.imgList);
            // 	// if(url){
            // 	// 	url= url.replace("social/weixinMinios","social/minios");
            // 	// 	await request({
            // 	// 		method: 'post',
            // 	// 		url: url,
            // 	// 		data: {}
            // 	// 	}).then(res => {
            // 	// 		this.imageList.push(res)
            // 	// 		if(this.imageList.length>=this.len){
            // 	// 			this.isOk=true;
            // 	// 		}
            // 	// 	}). catch ( res =>  {
            // 	// 		// console.log(res.response.data,'照片数据');
            // 	// 		this.imageList.push(res.response.data)
            // 	// 		if(this.imageList.length >= this.len){
            // 	// 			this.isOk = true;
            // 	// 		}

            // 	// 		if(this.imageList.length > this.imgList.length){
            // 	// 			// console.log('重复执行');
            // 	// 			this.first = 100;
            // 	// 			this.setData();
            // 	// 		}
            // 	// 		// console.log(res.response,'照片')
            // 	// 	})

            // 	// }
            // }

          } else {
            let url = this.imgList[i];

            // console.log("进入循环========="+i+"="+url+"=="+this.imgList.length);

            // console.log(url);
            // console.log('url的数据类型 =》',typeof(url));
            // console.log('url的数据类型 =》',typeof(url)=='object');
            // console.log(this.imgList);

            if (url) {
              url = url.replace("social/weixinMinios", "social/weixinMinios");
              // console.log(url,'图片数据');
              await request({
                method: 'post',
                url: url,
                data: {}
              }).then(res => {
                this.imageList.push(res)
                if (this.imageList.length >= this.len) {
                  this.isOk = true;
                }
              }).catch(res => {
                // console.log(res.response.data,'照片数据');
                this.imageList.push(res.response.data)
                if (this.imageList.length >= this.len) {
                  this.isOk = true;
                }

                if (this.imageList.length > this.imgList.length) {
                  // console.log('重复执行');
                  this.first = 100;
                  this.setData();
                }
                // console.log(res.response,'照片')
              })

            }
          }
        }
      }

      // console.log(this.dialogImageUrl);
      // console.log(this.imgList);

    },

    // 监听图片列表
    watchImgList () {
      if (JSON.stringify(this.imgList) != this.oldImg) {
        this.first++
        console.log(JSON.stringify(this.imgList), 'this.first0')
        this.setData()
        this.oldImg = JSON.stringify(this.imgList)
      }
    },

    // 图片预览
    handlePictureCardPreview (item) {
      this.dialogVisible = true;
      this.dialogImageUrl = item;
      // console.log(123);
    },
  },

  watch: {
    imgList: {

      handler: function (newVal, oldVal) {

        //this.deleteIm(this.imgIndex)
        // if(newVal.toString()!=oldVal.toString()){
        // console.log("change===============================")
        // console.log(this.imgList,'============================');

        if (JSON.stringify(this.imgList) != this.oldImg) {
          // console.log(JSON.stringify(this.imgList),this.first,'this.first')
          // console.log(newVal,'this.first')
          // console.log(oldVal,'this.first')
          this.setData()
          this.oldImg = JSON.stringify(this.imgList);

        }

        /*let sef=this;
        if(this.isOk){
          console.log("222")
          this.isOk=false;
            sef.setData()
        }else{
          //while(!this.isOk){
          //	console.log("2222")
        //	}
          let inter=window.setInterval(function(){
            console.log("111111222")
            if(sef.isOk){

              clearInterval(inter)
              sef.setData();
            }
          },1000)
        	
        }*/


        // }
      },
      deep: true, //深度监听
      // sync: true,
    },

  }
}
</script>
<style>
.bigImg {
  color: brown;
}
</style>

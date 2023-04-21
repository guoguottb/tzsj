<template>
  <div class="g-box">
	  <el-button type="primary" plain @click="closeView">返回</el-button>
	  <br>
    <!-- 定期走访查看 -->
	<el-form  ref="form"  label-width="160px">
	 <el-form-item label="走访对象姓名">
	    <el-input  class="input-intext"  v-model="formData.name"  style="width: 15%;" disabled></el-input>
	  </el-form-item>
	  <el-form-item label="走访对象身份证号码">
	    <el-input  class="input-intext"  v-model="formData.idCard" style="width: 15%;" disabled></el-input>
	  </el-form-item>
	  <el-form-item label="所属街道(镇)"  >
	  	<!-- <el-cascader :props="props" disabled v-model="formData.administrativeDivision" placeholder="请选择" style="width:20%;" ></el-cascader> -->
		 <el-input  class="input-intext"  v-model="formData.townStreet" style="width: 25%;" disabled></el-input>
	  </el-form-item>
	  <el-form-item label="所属村居(社区)"  >
	  	<!-- <el-cascader :props="props" disabled v-model="formData.administrativeDivision" placeholder="请选择" style="width:20%;" ></el-cascader> -->
	  		 <el-input  class="input-intext"  v-model="formData.village" style="width: 25%;" disabled></el-input>
	  </el-form-item>
	  <el-form-item label="走访对象家庭住址">
	    <el-input  class="input-intext"  v-model="formData.familyAddress" disabled style="width: 15%;"></el-input>
	  </el-form-item>
	  <el-form-item label="保障类别">
	    <el-select v-model="formData.protectionType" disabled placeholder="请选择保障类别">
			<el-option label="低保对象" value="低保对象"></el-option>
			<el-option label="特困供养对象" value="特困供养对象"></el-option>
			<el-option label="空巢独居老人" value="空巢独居老人"></el-option>
			<el-option label="困境儿童" value="困境儿童"></el-option>
			<el-option label="留守儿童" value="留守儿童"></el-option>
			<el-option label="残疾人两项补贴对象" value="残疾人两项补贴对象"></el-option>
			<el-option label="未纳入保障可能存在风险的对象" value="未纳入保障可能存在风险的对象"></el-option>
			<el-option label="机构住养对象" value="机构住养对象"></el-option>
			<el-option label="其他" value="其他"></el-option>
	    </el-select>
	  </el-form-item>
	  <el-form-item label="走访对象联系电话">
	    <el-input  class="input-intext"  v-model="formData.tel" disabled style="width: 15%;"></el-input>
	  </el-form-item>
	  <el-form-item label="走访人姓名">
	    <el-input  class="input-intext"  v-model="formData.visitorName" disabled style="width: 15%;"></el-input>
	  </el-form-item>
	   <el-form-item label="走访内容">
	     <el-input type="textarea" v-model="formData.visitContent" disabled style="width: 40%;"></el-input>
	   </el-form-item>
	  <el-form-item label="发现问题">
	    <el-input type="textarea" v-model="formData.problemFound" disabled style="width: 40%;" ></el-input>
	  </el-form-item>
	  <el-form-item label="走访类型">
	    <el-select v-model="formData.visitType" disabled placeholder="请选择走访类型">
	      <el-option label="定期回访" value="定期回访"></el-option>
	      <el-option label="日常走访" value="日常走访"></el-option>
		  <el-option label="特殊走访" value="特殊走访"></el-option>
		  <el-option label="电话走访" value="电话走访"></el-option>
	    </el-select>
	  </el-form-item>
	  <el-form-item label="走访时间">
		  <el-input  class="input-intext"  v-model="formData.visitTime" disabled style="width: 15%;"></el-input>
	    <!-- <el-col>
	     <el-date-picker type="date" placeholder="选择日期" v-model="date1" style="width: 15%;"></el-date-picker>
	      <el-time-picker placeholder="选择时间" v-model="date2" style="width: 15%;"></el-time-picker>
	    </el-col> -->
	  </el-form-item>
	  <el-form-item>
		  <el-card class="box-card">
			<div slot="header" class="clearfix">
				<!-- <span>走访图片(<span
				style='color:red'>{{fromData.imgUrls.split(',')[0]=="" ? 0 : fromData.imgUrls.split(',').length}}</span>)</span> -->
			</div>
			<image-view :imgList="this.formData.imgUrls.split(',')" height="150px" width="150px"></image-view>
		  </el-card>
	  </el-form-item>
	</el-form>
  </div>
</template>

<script>
	import request from '@/utils/request'
	import imageView from '@/views/modules/assistance/imageView'
	import upload from '@/views/modules/assistance/upload'
export default {
	components:{
		imageView,
		upload
	},
 data() {
      return {
			formData:{
				// id:"",	
				// name:"",
				// idCard:"",
				// familyAddress:"",		//家庭住址
				// protectionType:"",		//保障类别
				// tel:"",					//联系电话
				// visitorName:"",			//走访人姓名
				// visitContent:"",		//走访内容
				// visitType:"",			//走访类型
				// problemFound:"",		//发现问题
				// imgUrls:"",				//图片地址
				// townStreet:"",			//镇街
				// village:"",			//村居
				// districtBelongTo:"",	//所属地区
				// administrativeDivision:"",	//行政区划
				// visitTime:""				//走访时间
			},
			data1:"",
			data2:"",
			test:{
				xzqhArray:[]
			},
			
			xzqhArray:[], 
			props: {
				lazy: true,
				lazyLoad(node, resolve) {
					const { level } = node; // 获取当前node对象中的level属性
					let pId="0";
					if(level>0){
						let value=node.value;
						if(value){
							let values=value.split("#")
							pId=values.length>1 ? values[1]:"0";
						}
					}
					request({
						url:"/social/assistance/getCityOption",
						method:"post",
						data:{ pId:pId },
					}).then(res => {
			
					}).catch(res=>{
						const nodes = res.response.data;
						nodes.forEach(item => {
							item.value = item.cs_ex2+"#"+item.cs_ex1;
							item.label = item.cs_ex2;
							item.leaf = level >= 2; //判断是否为末尾节点，这个地方是0,1,2三级
						})
						resolve(nodes);
					})
				}
			},
      }
    },
	 methods: {
		  getData(data) {
		  	return request({
		  		headers: {
		  			'Accept': 'application/json',
		  		},
		  		url: '/social/regularVisits/selectById',
		  		method: 'post',
		  		data:data
		  	})
		  },
		  
		  //
		  closeView() {
		                  this.$emit("closes", false)
		                  this.$router.go(-1)
		                  if(process.env.NODE_ENV!="development"){
		                      this.$router.go(-1)
		                  }
		              },
	},
	watch:{
		xzqhArray(newA,oldA){
			// console.log(newA);
			if(newA.length>0){
				let qu = newA[0].split("#")[0]
				let zhen = newA[1].split("#")[0]
				let cun = newA[2].split("#")[0]
				// let i =qu+"#"+cun+"#"+zhen
				this.formData.administrativeDivision = newA[0]+","+newA[1]+","+newA[2]
				this.formData.districtBelongTo = qu
				this.formData.townStreet = zhen
				this.formData.village = cun
			}
			// console.log(i)
		}
	},
	created() {
		this.getData({
			'id':this.$route.query.sId,
		}).then(res => {
		}).catch(res => {
			//console.log("---------------2"+res.response.data.data)
			this.formData=res.response.data.data
			//console.log("111"+this.formData.id)
			let xzqhArray = this.formData.administrativeDivision.split(",");
			if(xzqhArray.length==3){
				this.$set(this.xzqhArray,0,xzqhArray[0]);
				this.$set(this.xzqhArray,1,xzqhArray[1]);
				this.$set(this.xzqhArray,2,xzqhArray[2]);
				this.$set(this.test,"xzqhArray",xzqhArray);
				var cun= this.xzqhArray[2].split("#")[0]
				// console.log(cun);
			}else{
				this.xzqhArray=[]
			}
		})
		//console.log("-----"+this.$route.query.sId)
	}
}
</script>

<style>
	.input-intext{
		width: 20%;
	}

</style>
<template>
  <div >
      <p v-html="html"></p>
      <!-- <el-button @click='getUrl(newUrl)'>跳转</el-button> -->
  </div>
</template>
<script>
import request from '@/utils/request'
export default {

    data(){
			return{
				html:'',
			}
		},
       created() {
			this.getUrl();
		},
        methods:{
            getUrl(id){
				request({
					url:"/social/assistance/salvation2?泰州市姜堰区社会救助综合平台&modelId=432",
					method:"post",
					// data:b
				}).then(res => {
				}).catch(res=>{
					// console.log(res.response.data)
                    this.html=res.response.data
							
				})
			},
        }
    }


</script>

<style>

</style>
<template>

	<div>
        <!-- <el-backtop target=".page-component__scroll .el-scrollbar__wrap" :bottom="100"> -->
		<header>
			<div >我要救助查看</div>	
		</header>
		<div class="body" :model="lookData">
            <table class="top_2">
                <tr class="list_row">
                    <td style="">所在街镇</td>
                    <td style="">{{lookData.abc_ex1}}</td>
                </tr>
                <tr class="list_row">
                    <td style="">所在村居</td>
                    <td style="">{{lookData.abc_ex2}}</td>
                </tr>
                <tr class="list_row">
                    <td>主申请人</td>
                    <td>{{lookData.abc_ex3}}</td>
                </tr>
                <tr class="list_row">
                    <td>身份证号码</td>
                    <td >{{lookData.abc_ex4}}</td>
                </tr>
                <tr class="list_row">
                    <td>需求类型</td>
                    <td >{{lookData.abc_ex5}}</td>
                </tr>
                <tr class="list_row">
                    <td>需求简述</td>
                    <td class="need_say">{{lookData.abc_ex6}}</td>
                </tr>
                <tr class="list_row">
                    <td>发布者</td>
                    <td >{{lookData.abc_ex7}}</td>
                </tr>
                <tr class="list_row">
                    <td>联系电话</td>
                    <td >{{lookData.abc_ex8}}</td>
                </tr>
                <tr class="list_row" >
                    <td>有效期</td>
                    <td >{{lookData.abc_dat1}}--{{lookData.abc_dat2}}</td>
                </tr>
            </table>
            <div class="list_row" style="border-bottom: 0px ;">
                <span class="row_title">图片资料</span>
                <div class="image_box">
                    <el-row style="margin-top:10px" v-if="img_url.length>=0">
                        <el-col :span="7" :offset="1" v v-for="(item,index) in img_url" :key="index">
                            <el-card shadow="always" :body-style="{ padding: '0px' }" style="width: 90px; height: 100px ; ">
                                <el-image v-if="img_url[index]!== undefined"
                                    style="width: 90px; height: 100px ;"
                                    :src="img_url[index]" 
                                    :preview-src-list="img_url">
                                </el-image>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>

        <footer>
            <el-button style="width:90%;position: fixed;bottom: 10px;left: 5%;right: 5%;font-size:16px" size="small" round type="primary" @click="goBack">返回</el-button>
        </footer>
        
            <!-- <div
            style="{
                height: 100%;
                width: 100%;
                background-color: #f2f5f6;
                box-shadow: 0 0 6px rgba(0,0,0, .12);
                text-align: center;
                line-height: 40px;
                color: #1989fa;
            }"
            >
            UP
            </div> -->
        <!-- </el-backtop> -->
	</div>
</template>

<script>
    import request from '@/utils/request.js'
	export default{
		data(){
			return{
				lookData:[],
                img_url:[],
                srcList: [],
			}
		},
		
        created() {
			this.loadData();
		},
		methods:{
            // 返回按钮
            goBack(){
				setTimeout(()=>{
					this.$router.back(-1)
				},200)
			},

			// 需求信息
			loadData(){
				this.needLook({
                    
				}).then(res => {
                    // console.log(this);
					// console.log(res,"res");
                    res[0].abc_dat1=res[0].abc_dat1.substring(0,10);
                    res[0].abc_dat2=res[0].abc_dat2.substring(0,10);
                    var img=res[0].abc_ex9.split(",")
                    
                    this.srcList=img.filter(i=>i && i.trim())

                    for(let i in this.srcList){
                        let url=this.srcList[i]
                        // 图片请求
                        if(url){
                            request({
                                method: 'post',
                                url: url,
                                data: {}
                            }).then(res => {
                                this.img_url.push(res)
                                console.log(res);
                                
                            }). catch ( res =>  {
                                
                            })
                        }
                    }
                    // this.srcList=img.filter(i=>i && i.trim())

                    console.log(this.img_url);
					this.lookData=res[0];
                    console.log(this.lookData);

                    
				}).catch(res => {
					// if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
					// 	console.log('请求失败了-----------------------3')
					// 	this.$message.error('数据获取失败或请求超时3333')
					// 	this.$emit("closes", false)
					// 	this.$router.go(-1)
					// 	return false
					// }
					console.log("catch",res)
				})
			},


			// 查看接口
			needLook(data) {
				console.log(data,"data");
				return request({
					method: 'post',
					url : "/social/assistanceWeixin/viewBasicCharity?sId="+this.$route.query.id,//路径
					data: 1
					
				})
			},
        }
	}
</script>

<style scoped>
	header{
        
		width: 100%;
		height: 80px;
		line-height: 80px;
		background-color: rgb(60, 159, 240);
		color: #fff;
		font-size: 40px;
		font-weight: 600;
        z-index: 100;
        position: fixed;
        top: 0px;
        left: 0%;
        right: 0;
	}
	header>div{
		
	}
    table{
        margin-top: 80px;
        width: 100%;
        /* height: 2000px; */
    }
    .list_row{
        display: block;
        width: 96vw;
        margin: 0 auto;
        padding: 20px 0;
        font-size: 36px;
        text-align: left;
        color: #333;
        border-bottom: 1px solid #ccc;
    }
    /* .list_row:last-of-type{
        
    } */
	.list_row>td:nth-child(1){
        padding-left: 10px;
        width: 200px;
    }
    .row_title{
        padding-left: 10px;
        font-size: 36px;
        text-align: left;
    }
    .image_box{
        margin: 20px auto  80px;
        width: 96%;
        height: 600px;
        padding: 10px;
        border:solid 1px #ccc;
        border-radius: 10px;
        overflow-y: auto;
    }
    .need_say{
        display: block;
        background-color: rgb(238, 238, 238);
        width: 90%;
        overflow-wrap: break-word;
        margin: 10px auto;
        border-radius: 10px;
        padding: 15px;
        color: #333;
        font-size: 32px;
    }
</style>

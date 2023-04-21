<template>
    <div class="workNode">
       <header>
		<p class="title">低收入人口办理进度查询</p>
		<div class="searchBox">
			<input type="text"  v-model="IDCardNum" placeholder="请输入申请人身份证号码" class="ipt">
			<input type="button" value="查询" class="btn"  @click = "Search">
			<!-- <van-button type="info" native-type="button" @click = "Search" class="btn">查询</van-button> -->
			<!-- <input type="button" value="重置"> -->
		</div>
	</header>
        <!-- <hr> -->
        <main>
            <div v-if="data.length>0" >
                <ul>
                    <li v-for="(item,index) in data" :key="index" class="card">
                         <div class="info">
                            <span> 申请人姓名：{{item.name}}</span>
                            <span class="helpType" >{{item.type}}</span>
                        </div>
                        <div class="nodesBox">
                            <div class="nodes2" v-for="(item2 ,index2) in item.node " :key="index2+'a'">
                                <p class="row">
                                    <span :class="{workNodes: item2.status=='0',workNodes1: item2.status=='1',workNodes2: item2.status=='2'} " ></span><span class="workFont">{{item2.name}}</span>
                                </p>
                                <p class='line' v-if="(index2<item.node.length-1)"></p>
                            </div>
                            <!-- <span v-for="(item2 ,index) in item.node " :key="item2">
                                <span :class="{workNodes: item2.status=='0',workNodes1: item2.status=='1',workNodes2: item2.status=='2'} " >{{item2.name}}</span>
                                <span v-if="(index<item.node.length-1)" :class="{line: (item2.status=='0' || item2.status=='2'),line1: item2.status=='1'} "></span>
                            </span> -->
                        </div>
                    </li>
                </ul>
                
            </div>
            <div class="explain">
                <p>查询说明：</p>
                <p>颜色被着色：代表当前已完成;</p>
                <p>颜色为灰色：代表即将进入此流程;</p>
                <!-- <p>颜色为灰色：</p> -->
            </div>
        <div class="lenge">
			<div>
				<span class='workNodes '></span><span style="margin-left:10px;line-height: 30px;">审核中</span>
			</div>
			<div>
				<span class='workNodes1'></span><span style="margin-left:10px;line-height: 30px;">通过</span>
			</div>
			<div>
				<span class='workNodes2'></span><span style="margin-left:10px;line-height: 30px;">退回</span>
			</div>
		</div>

        </main>
    </div>
</template>

<script>
import request from '@/utils/request.js'
export default {
    data() {
        return {
            IDCardNum:'',
            data:[],

        }
    },

    created() {
        // if(this.$route.query.userId){
        // 	localStorage.setItem("cs_userId",this.$route.query.userId)
        // }
        // this.loadData();
        
    },

    methods: {
        loadData(){
            //  this.data=[];

            this.data=[{"name":"荣付明","node":[{"name":"申请","status":1},{"name":"派单","status":1},{"name":"核对","status":1},{"name":"审核","status":2},{"name":"公示","status":0},{"name":"审批","status":0},{"name":"办结","status":0}]}]
        },

        Search(){

            console.log(this.IDCardNum);
            // $.ajax({
            //     url:"/assistanceWeixin/getProgressList",
            //     data:{"idCard":this.this.IDCardNum},

            //     success:function(data){
            //         console.log(data);
            //         this.data = data;
            //     },
            //     error:function(){

            //     }
            // });

			request({
				method: 'post',
				url: '/social/assistanceWeixin/getProgressList',
				data: {
					'idCard': this.IDCardNum,
				},
				headers: {
					'token': sessionStorage.getItem('token')
				}
			}).then(res => {
					if(res.length!=0){

						this.data = res;
					}else{
						this.$toast.fail('查无此人')
					}
					console.log(res.length);
			}).catch(error => {

				console.log(error)
				this.$dialog.alert({
						message: error,
					}).then(()=>{
					})


			})

        }

    }
}
</script>

<style scoped>
    
    *{
		margin: 0;
		padding: 0;
	}
    .workNode{
        width: 100vw;
        min-height: 100vh;
        background-color: rgb(230, 230, 230);
    }
	/* body{
		background-color: rgb(230, 230, 230);
	} */
	p{
		font-size: 12px;
	}
	header{
		/* padding-top: 10%; */
		text-align: center;
		/* background-color: #fff; */
		padding: 10% 20px 20px;
		box-sizing: border-box;
	}
	.title{
		font-size: 32px;
	}

	.ipt{
		width: 70%;
		padding: 10px 5px ;
		margin-right:5px ;
		border: 1px solid #005d59;
		border-radius: 6px;
		background-color: rgba(255, 255, 255, 0);
		box-sizing: border-box;
	}

	.btn{
		padding: 9px 30px;
		outline: none;
		border-radius: 6px;
		border: 1px solid silver;
		color:#fff;
		font-size: 12px;
		background-color: #005d59;
        box-sizing: border-box;
	}
	.searchBox{
		/* background-color: #fff; */
		padding: 30px 0;
		box-sizing: border-box;
	}
	main{
		margin:10px auto 0px;
		width: 90%;
        padding-bottom:20px ;
        box-sizing: border-box;
	}
	.card{
		width: 70%;
		margin: auto;
		/* margin-top:80px ; */
		height: auto;
		padding: 10px 5px;
		/* border-bottom: 1px solid #999; */
		box-sizing: border-box;
		/* background-color: #fff; */
		list-style: none;
		font-size: 12px;
	}
	.nodes2{
		position: relative;
	}
	.row{
		display: flex;
		margin-bottom: 40px;

	}
	.workNodes{
		display: inline-block;
		border:2px solid #333;
		width: 45px;
		height: 45px;
		line-height: 45px;
		border-radius:50% ;
		background-color: #999;
		color:#fff
	}
	
	.workNodes1{
		display: inline-block;
		border:2px solid #333;
		width: 45px;
		height: 45px;
		line-height: 45px;
		border-radius:50% ;
		background-color: #005d59;
		color:#fff
	}
	.workNodes2{
		display: inline-block;
		border:2px solid #333;
		width: 45px;
		height: 45px;
		line-height: 45px;
		border-radius:50% ;
		background-color: #bf3125;
		color:#fff
	}
    .workFont{
		display: inline-block;
		height: 40px;
		line-height: 48px;
		margin-left: 20px;
		text-align: left;

	}
	.line{
		/* display: inline-block; */
		position: absolute;
		top: 50px;
        left: 23px;
		width: 6px;
		height: 43px;
		margin-bottom: 2px;
		background-color: #333;
	}
	/* .line1{
		position: absolute;
		top: 22px;
		left: 12px;
		width: 2px;
		height: 29px;
		margin-bottom: 2px;
		background-color: #333;
	} */
	/* .line2{
        display: inline-block;
        width: 12px;
        height: 3px;
        margin-bottom: 2px;
        background-color: #bf3125;
    } */

	.nodesBox{
		width: 340px;
		margin:  30px auto 10px;
		text-align: center;
	}
	.info{
		/* width: 50%; */
		display: flex;
		font-weight: 600;
		/* justify-content: space-between; */
	}
	.helpType{
		margin-left: 20px;
		color: #666;
	}
	.lenge{
		margin: 20px 0%;
		width: 60%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 12px;
	}
	.lenge>div{
		display: flex;
		flex-direction: row;
	}
    .explain{
        margin-top: 20px;
    }
	.explain>p{
        text-align: left;
        font-size: 20px;
		margin: 5px 0;
	}
</style>
<template>
    <div class="policyDetail">
        <header>
            {{title}}
        </header>
        <main >
            <div v-for="(item ,index) in data" :key="index">  

                 <div style="margin:10px 10px ;color:#3e80cc;text-align:left">被救家庭细分{{index+1}}：{{item.familyDetail}}</div>  

                <van-cell-group class="box">
                    <!-- <van-cell>
                        <div>被救家庭分类：{{item.family_type}}</div>
                    </van-cell> -->

                    <van-cell>
                        <!-- <div class="a_title">被救家庭细分：<span>{{item.familyDetail}}</span></div> -->
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
        </main>
    </div>
</template>

<script>
import request from '@/utils/request.js'
export default {
    name:'policyDetail',  // 政策详情
    data(){
        return{


            data:[ ],
            title:'题目'
           
        }

    },
    created(){
        this.title = this.$route.query.type
        // console.log(this.$route.query.type);
        this.getData(this.title);
    },

   methods:{

      
        getData(data){

           request({
					method:'post',
					url: '/social/assistanceWeixin/getPolicy',
					data:{type:data},

				}).then(res=>{

                    console.log(res);

                    this.data = res;

				}).catch(error=>{

					// 提示提交失败
					this.$toast.fail('数据加载失败')
					console.log(error)
				})
        }

        

    }
}
</script>

<style scoped>
    .policyDetail{
        background-color: #f3f3f3;
        width: 100%;
        min-height:100vh;

    }
    header {
		height: 88px;
		line-height: 100px;
		width: 100%;
		font-size: 34px;
		color: #FFFFFF;
		background: #3e80cc;
	}
    /* .box{
        margin-bottom:20px ;
    } */
    .a_title{
        color:#999;
    }
    .a_title1{
       margin-top: 20px;
    }
    .a_title>span{
        color:#111;
    }
    .kong{
        width: 100vw;
        height: 100vh;
        background-color: #fff;
    }
</style>
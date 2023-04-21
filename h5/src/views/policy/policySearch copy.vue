<template>
    <div>
        <header>
            政策查询
        </header>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
            <main>
                <van-cell-group>
                    <van-cell v-for="(item ,index) in data" :key="index" is-link @click="toRoutr(item)" >
                        <span>标题：<span class="content">{{item.title}}</span></span>
                        <!-- <span>添加时间：{{item.time}}</span> -->
                    </van-cell>
                </van-cell-group>
            </main>

            <!-- <footer>

                <van-pagination
                    v-model="currentPage"
                    :total-items="125"
                    :show-page-size="3"
                    force-ellipses
                    />
            </footer> -->
        </van-pull-refresh>
        

    <!-- </div> -->

</template>

<script>
import request from '@/utils/request.js'
// import { PullRefresh } from 'vant';
export default {
    name:'policySearch',  // 政策查询
    data(){
        return{

            data:[],
            isLoading: false,
            // path:''
        }

    },


    created(){
        this.getData();
    },

    methods:{
        
        onRefresh() {
            setTimeout(() => {
                // Toast('刷新成功');
                this.isLoading = true;
                this.getData();
            }, 1000);
            },

        // 页面跳转
        toRoutr(data){
            console.log(data);

            this.$router.push({
					path:'/policyDetail',
				
					query:{
						type:data.title,
						
					}
				})
        },


        getData(data){

           request({
					method:'post',
					url: '/social/assistanceWeixin/getPolicy',
					data:{type:''},

				}).then(res=>{

                    console.log(res);
                     this.data = [];

                    for(let i in res){

                        let obj = {title:''};

                        this.data.push(obj)

                        this.data[i].title = res[i].familyType;

                    }

					this.isLoading = false;
                   
				}).catch(error=>{

					// 提示提交失败
					this.$toast.fail('数据加载失败')
					console.log(error);
                    this.isLoading = false;
				})
        }

        

    }
}
</script>

<style scoped>
    header {
		height: 88px;
		line-height: 100px;
		width: 100%;
		font-size: 36px;
		color: #FFFFFF;
		background: #3e80cc;
	}
    .content{
        color: rgb(33, 150, 243);
        display: inline-block;
        /* width: 75%; */
        /* text-align: center; */
    }
</style>
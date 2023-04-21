<template>
   <div class="HDYJBox">
        <el-dialog title="自定义预警历史记录" center :visible.sync="isShow1" width="80%" z-index=1999>
           
                <!-- 自定义预警历史记录窗口 -->
              <el-table :data="tableData" border style="width: 100%" height="60vh" >
                <!-- <el-table-column prop="date" label="No" width="180">
                </el-table-column> -->
                <el-table-column prop="acw_ex2" label="乡镇（街道）" width="120">
                </el-table-column>
                <el-table-column prop="acw_ex1" label="村居" width="120">
                </el-table-column>
                <el-table-column prop="acw_ex4" label="姓名" width="130">
                </el-table-column>
                <el-table-column prop="acw_ex5" label="身份证" width="150">
                </el-table-column>
                <el-table-column prop="acw_ex6" label="保障类型" width="150">
                </el-table-column>
                <el-table-column prop="acw_ex7" label="预警内容" width="180">
                </el-table-column>
                <el-table-column prop="acw_dat1" label="预警时间" width="160">
                </el-table-column>
                <el-table-column prop="acw_dat2" label="取消时间" width="160">
                </el-table-column>
            </el-table>


        </el-dialog>

    </div>
</template>

<script>
import request from '@/utils/request'
export default {
    name: "ZdyyjHistory",
    props: ["data","isShow",'props'],
    data() {
        return {
            isShow1:this.isShow,
            dialogVisible:false,
            close:false,   //关闭弹窗后重新请求数据
            
            tableData:[], //列表数据

            // 区划 
            props1: {
                multiple: true,//多选
                // checkStrictly:true,
                lazy: true,
                lazyLoad(node, resolve) {
                const { level } = node; // 获取当前node对象中的level属性
                let pId = "0";
                if (level > 0) {
                    let value = node.value;
                    if (value) {
                        let values = value.split("#");
                        pId = values.length > 1 ? values[1] : "0";
                    }
                }
                request({
                    url: "/social/assistance/getCityOption",
                    method: "post",
                    data: {
                        pId: pId,
                    },
                })
                    .then((res) => {
                        console.log(res,"city");
                    })  
                    .catch((res) => {
                        // console.log(res);
                        console.log(res,"city");
                        const nodes = res.response.data;
                        nodes.forEach((item) => {
                            item.value = item.cs_ex2 + "#" + item.cs_ex1;
                            item.label = item.cs_ex2;
                            item.leaf = level >= 1; //判断是否为末尾节点，这个地方是0,1,2三级
                        });

                    resolve(nodes);
                    });
                },
            },

          
            loading:true,

        }
    },

    watch:{
        isShow1(newS,oldS){
            this.isShow1 = newS;
            this.getEmit(newS);
        },
        $route: "fetchData",
    },

    created(){
        this.loadData();
    },
    methods:{

        // 取消
        closeView(){
            this.isShow1 = false; //关闭核对授权书上传弹窗
            this.close = true;    //关闭弹窗后不再重新请求数据
           
        },


        // 子向父传值
        getEmit(){
            
            this.$emit('function',this.isShow1,this.close);
        },

        async loadData(index){


            // 评估人
            this.customizeWarningHistory({

            }).then(res=>{

            }).catch(res=>{ 
                
                let data = res.response.data;
                for(let i in data){
                    for(let j in data[i]){
                        data[i][j] = unescape(data[i][j]);
                    }

                }
                this.tableData = data
                console.log(this.tableData,'历史记录');

                // 根据后端传递的列表进行插入选项
               

                // console.log(this.option);
            })

        },


        // 获取自定义预警历史记录数据
       customizeWarningHistory(data) {
            return request({
                headers: {
                    'Accept': 'application/json',
                },
                url: ' /social/assistance/customizeWarningHistory ',
                method: 'post',
                data: data
            })
        },

    }

}
</script>

<style scoped>

.HDYJBox .el-dialog{
    width: 100%;
}
.HDYJBox .el-dialog__header{
    text-align: center;
    border-bottom: 1px solid #ddd;
}
.HDYJBox .el-dialog__body{
    padding: 20px 20px 0px;
}

</style>
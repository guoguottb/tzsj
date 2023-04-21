<template>
    <el-dialog title="处理结果" :visible.sync="isShow1" z-index=1999 width="400px">
        <div style="height:auto;padding:0 0 30px 0">
            <p><i style="color:red">*</i> 处理结果：</p>
           <el-input type="textarea"  :autosize="{ minRows: 2}" v-model="result"  style="margin:10px  0 20px 0"></el-input>
          
            
            <el-button size="small" type="primary" @click="save"  style="float:right">确定</el-button>
          
        </div>
    </el-dialog>
</template>
 
<script>
import pdf from "vue-pdf";
import request from "@/utils/request";   //后端接口调用封装
export default {
  components: { pdf },
  props: ["data","isShow"],

  data() {
    return {
            isShow1:this.isShow,
            result:'',  //处理结果
            // headers: {},
            // filename:'',
          
        }
    },
    created () {
        
    },

    watch: {
        isShow1(newS, oldS) {

        this.isShow1 = newS;
        this.getEmit(newS);
        },
        
    },
    methods: {

        save(){
            if(this.result!=''){
                request({
                    url: " /social/assistance/disposeComplaint",
                    method: "post",
                    data: {
                        sId :this.data.id,
                        result:this.result
                    },
                })
                .then((res) => {})  
                .catch((res) => {

                    if(res.response.data.status=='+OK'){
                        this.$message.success(res.response.data.msg)
                        this.isShow1 = false;
                    }else{
                        this.$message.error('保存失败！')
                        this.isShow1 = false;
                    }
                
                    console.log(res.response.data);
                });
            }else{
                this.$message.warning('请填报处理结果！')

            }

            
        },

        // 子向父传值
        getEmit() {
        // console.log(this.isShow1,'this.isShow1==');
        // console.log(this.close,'this.close==');
        this.$emit("function", this.isShow1);
        },


       

    }
}
</script>
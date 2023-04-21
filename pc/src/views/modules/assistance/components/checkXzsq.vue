<template>
  <el-dialog title="协助申请修改" center :visible.sync="dialogVisible"  width="40%" :before-close="handleClose"  top="15vh">
    <div class="ComplaintsView">
      <!-- 返回主页 -->

      <!-- 解析出来的数据 style="width:800px" -->
        <el-form ref="form" :rules="rules"  :model="form" label-width="100px" :disabled="false" style="height:auto;overflow:auto;margin-bottom:10px">
            <el-form-item label="申请类型" prop="aa_ex1">
                <el-input   v-model="form.aa_ex1" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="aa_ex6">
                <el-input v-model="form.aa_ex6"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="aa_ex5">
                <el-input v-model="form.aa_ex5"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="aa_ex7">
                <el-input v-model="form.aa_ex7"></el-input>
            </el-form-item>
            <el-form-item label="行政区划" prop="aa_ex2">
                <!-- <el-input v-model="form.name"></el-input> -->
                <el-cascader  width="100%"
                placeholder="选择区划"
                v-model="qhAdress"
                :props="props1" style="width:90%" >
                </el-cascader>
            </el-form-item>
            <el-form-item label="家庭住址" prop="aa_ex8">
                <el-input v-model="form.aa_ex8"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="aa_ex9">
                <el-input  v-model="form.aa_ex9"></el-input>
            </el-form-item>
            <el-form-item label="申请时间" prop="aa_dat1">
                <el-input  v-model="form.aa_dat1" disabled></el-input>
            </el-form-item>
            <el-form-item style="float:right">
              <el-button type="primary" @click="save('form')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
  </el-dialog>
</template>

<script>
import imageView from '../imageView'
import request from "@/utils/request";
export default {
  name: "Upload",
  components: {
        imageView,
    },
  props: ["data", "isShow"],
  data() {
    return {
        form: this.data,
        show: false,
        dialogVisible: this.isShow,
        isShow1: this.isShow, // 向父组件传值
        tableData: [],
        imgNum:{},//图片数量
        imgArr:{},//图片数组
        qhAdress:[],//行政区划
        props1: {
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
                            item.leaf = level >= 2; //判断是否为末尾节点，这个地方是0,1,2三级
                        });

                    resolve(nodes);
                    });
                },
            },

        rules: {
          aa_ex1: [
            { required: true, message: '请选择申请类型', trigger: 'change' },
          ],
          aa_ex6: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            ],
          aa_ex5: [
              { required: true, message: '请输入身份证号码', trigger: 'blur' },
          ],
          aa_ex7: [
              { required: true, message: '请输入性别', trigger: 'blur' },
          ],
          aa_ex2: [
              { required: true, message: '请选择行政区划', trigger: 'blur' },
          ],
          aa_ex8: [
              { required: true, message: '请输入家庭住址', trigger: 'blur' },
          ],
          aa_ex9: [
              { required: true, message: '请输入联系电话', trigger: 'blur' },
          ],
           aa_dat1: [
              { required: true, message: '请选择申请时间', trigger: 'change' },
          ],
        },
    };
  },
  created() {
    this.loadData();
  },
  watch: {
    isShow1(newS, oldS) {

      this.isShow1 = newS;
      this.getEmit(newS);
      // this.loadData(newS);
    },

    qhAdress(newQ,oldQ){
        console.log(newQ,'区划监听');
        if(newQ.length>0){

            // this.form.acw_ex3 = newQ[0].split('#')[0];
            this.form.aa_ex4 = newQ[1].split('#')[0];
            this.form.aa_ex3 = newQ[2].split('#')[0];
            this.form.aa_ex2 = newQ.join(',');

        }
    },
    
  },
  methods: {



    loadData() {
      console.log(this.data, "协助申请数据");
      console.log(this.isShow1, "协助申请数据");
      this.qhAdress = this.data.aa_ex2.split(',')

     
    },

    // 子向父传值
    getEmit() {
      this.$emit("function", this.isShow1, this.close);
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.dialogVisible = false;
          this.isShow1 = false;
          done();
        })
        .catch((_) => {});
    },


    // 修改保存按钮
    save(){
      // console.log('保存');

       let data = {};

      for(let i in this.form){
        if(i.indexOf("aa_")!=-1){
          // console.log(i);
          data[i]=this.form[i]
        }
      }
      // console.log(data,'保存数据'); 
      // return false

      this.saveZjsq({
          data:JSON.stringify(data)
        }).then(res=>{
          console.log(res,'then');

        }).catch(res=>{
          console.log(res.response.data,'catch');
          if(res.response.data.status=='+OK'){
            this.$message.success(res.response.data.msg)
            this.isShow1 = false;
          }else{
            this.$message.error('保存失败！')
          }

        })
      
    },

    saveZjsq(data){
      return request({
          // headers: {
          //     'Accept': 'application/json',
          // },
          url: '/social/assistance/saveZjsq',
          method: 'post',
          data:data
        })
    }
  },

  
};
</script>


<style lang="less" scoped>
.g-box {
  height: 80vh !important;
}
.g-box2 {
  width: 100%;
  height: 100%;
  overflow: auto !important;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
}
.homeBox {
  z-index: 9999;
  font-size: 16px;
}

.buttonBox {
  padding: 15px;
  display: flex;
  width: 35%;
  overflow: auto;
  box-sizing: border-box;
  justify-content: flex-start;
  & .el-button {
    margin-right: 20px !important;
  }
}

.tableBox {
  padding: 0 15px;
  h3 {
    font-size: 18px;
    color: #f56c6c;
    padding-bottom: 15px;
  }
  .el-table {
    // height: 390px;
  }
}
</style>

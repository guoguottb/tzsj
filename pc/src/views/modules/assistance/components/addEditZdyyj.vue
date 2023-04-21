<template>
   <div class="HDYJBox">
        <el-dialog title="自定义预警窗口" :visible.sync="isShow1" z-index=1999 :before-close="handleClose">
           
            <el-form ref="form" :rules="rules" :model="form" label-width="120px">
                <el-form-item label="行政区划" prop="acw_ex3">
                    <!-- <el-input v-model="form.name"></el-input> -->
                    <el-cascader  width="100%"
                    placeholder="选择区划"
                    v-model="qhAdress"
                    :props="props1" style="width:90%" >
                    </el-cascader>
                </el-form-item>
                <el-form-item label="姓名" prop="acw_ex4">
                    <el-input v-model="form.acw_ex4"></el-input>
                </el-form-item>
                
                <el-form-item label="身份证号码" prop="acw_ex5">
                   <el-input v-model="form.acw_ex5"></el-input>
                </el-form-item>
                <el-form-item label="保障类型" prop="acw_ex6">
                     <el-select v-model="form.acw_ex6" placeholder="选择保障类型">
                        <el-option v-for="(item,indexpg) in option" :key="indexpg"  :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="预警时间" prop="acw_dat1">
                    <div class="block">
                        <el-date-picker v-model="form.acw_dat1" type="date" placeholder="选择日期"> </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="预警内容" prop="acw_ex7">
                    <el-input type="textarea" v-model="form.acw_ex7"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="save('form')">保存</el-button>
                </el-form-item>
            </el-form>


        </el-dialog>

    </div>
</template>

<script>
import request from '@/utils/request'
import {isName,isText,isNum,isCardID,} from '@/utils/until'
export default {
    name: "Tkpgpf",
    props: ["data","isShow",'props'],
    components: {
        // imageView,
        // upload
    },
    data() {
        return {
            isShow1:this.isShow,
            formLabelWidth: '100px',
            dialogVisible:false,
            close:false,   //关闭弹窗后重新请求数据
            qhAdress:[],

            form: {
                ab_ex2: '',         //街道
                ab_ex161: '',       //市区
                ab_ex162: '',

                acw_dat1: '',       //预警时间
                acw_ex1: '',        //村居
                acw_ex2: '',        //街道
                acw_ex3: '',        //市区
                acw_ex4: '',        //姓名
                acw_ex5: '',        //身份证号
                acw_ex6: '',        //保障类型
                acw_ex7: '',        //预警内容

                acw_id: '',        //预警id
            },
            option:[
                {
                    value:'城乡低保',
                    label:'城乡低保',
                },
                {
                    value:'特困供养',
                    label:'特困供养',
                },
                {
                    value:'低收入家庭',
                    label:'低收入家庭',
                },
                // {
                //     value:'低保边缘家庭家庭',
                //     label:'低保边缘家庭家庭',
                // },
                {
                    value:'支出困难家庭',
                    label:'支出困难家庭',
                },
                {
                    value:'困境儿童',
                    label:'困境儿童',
                },
                {
                    value:'残疾人两项补贴',
                    label:'残疾人两项补贴',
                },
                {
                    value:'临时救助',
                    label:'临时救助',
                },
                {
                    value:'尊老金',
                    label:'尊老金',
                },
            ],
             rules: {
                acw_ex3: [
                    { required: true, message: '请选择行政区划', trigger: 'blur' },
                ],
                acw_ex4: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                acw_ex5: [
                    { required: true, message: '请输入身份证号码', trigger: 'blur' },
                ],
                acw_ex6: [
                    { required: true, message: '请选择保障类型', trigger: 'change' },
                ],
                acw_dat1: [
                    { required: true, message: '请选择预警时间', trigger: 'change' },
                ],
                acw_ex7: [
                    { required: true, message: '请输入预警内容', trigger: 'blur' },
                ],
             },
            // 区划 
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

            loading:true,

        }
    },

    watch:{
        isShow1(newS,oldS){

            // console.log(newS,oldS,'123');
            this.isShow1 = newS;
            
            this.getEmit(newS);

        },
        qhAdress(newQ,oldQ){
            console.log(newQ,'数据监听');
            if(newQ.length>0){

                this.form.acw_ex3 = newQ[0].split('#')[0];
                this.form.acw_ex2 = newQ[1].split('#')[0];
                this.form.acw_ex1 = newQ[2].split('#')[0];
                this.form.ab_ex162 = newQ.join(',');

            }
            console.log(this.form.acw_ex3,'市区');
        },


        $route: "fetchData",
    },

    created(){
        this.loadData();
    },
    methods:{



        //关闭确定 
        handleClose(done) {
            if(this.data.btnName!='查看未死亡证明'){
                this.$confirm('确认放弃操作？')
                .then(_ => {
                    done();
                    this.close = true; //关闭弹窗后不再重新请求数据
                })
                .catch(_ => {});

            }else{
                done();
                this.close = true;
            }
        },

        // 取消
        closeView(){
            this.isShow1 = false; //关闭弹窗
            this.close = true;    //关闭弹窗后不再重新请求数据
        },


        // 子向父传值
        getEmit(){
            
            this.$emit('function',this.isShow1,this.close);
        },

        loadData(){
            console.log(this.data,'传递数据');
            this.form = this.data;
            console.log(this.form,'接受的数据');
            // this.form
            this.qhAdress = this.form.ab_ex162.split(',')
           


        },

        // 自定义预警数据
        save(formName){

            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // alert('submit!');
                    // this.$message.success('校验成功！')
                    console.log('校验成功！')
                } else {
                    console.log('error submit!!');
                    // this.$message.error('校验错误！')
                    return false;
                }
            });

            if(this.qhAdress.length>0){

                this.form.acw_ex3 = this.qhAdress[0].split('#')[0];
                this.form.acw_ex2 = this.qhAdress[1].split('#')[0];
                this.form.acw_ex1 = this.qhAdress[2].split('#')[0];
            }
            console.log(this.form,'form');
            console.log(this.qhAdress,'qhAdress');

            


            // return false

            
            // 保存接口
            this.addCustomizeWarning(
                this.form
            ).then((res)=>{

            }).catch((res)=>{
                console.log(res,'pf');
                if (res.response.data.status=="+OK") {
                    this.$message.success(res.response.data.msg)
                    this.isShow1 = false;
                    this.loading = false;

                    // this.closeView();
                    // this.getEmit();
                    console.log("保存成功");
                } else {
                    console.log("保存失败");
                    this.$message.error(res.response.data.msg)
                }
            })
        },

        // 保存指定派发的接口 分配自理评估能力记录接口
       addCustomizeWarning(data) {
            return request({
                headers: {
                    'Accept': 'application/json',
                },
                url: '/social/assistance/addCustomizeWarning ',
                method: 'post',
                data: data
            })
        },

    }

}
</script>

<style scoped>

.HDYJBox .el-dialog{
    width: 60%;
}
.HDYJBox .el-dialog__header{
    text-align: center;
    border-bottom: 1px solid #ddd;
}
.HDYJBox .el-dialog__body{
    padding: 20px 20px 0px;
}
.block{
    width: 100%;
    /* margin: 0 auto; */
}
.clearfix{
    text-align: center;
}
.hdTitle >>>.el-form-item__label::before{
    content: ' * ';
    color: red;
}
</style>
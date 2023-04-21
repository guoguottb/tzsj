<template>
   <div class="HDYJBox2">
        <el-dialog title="核对信息批量完善" :visible.sync="isShow1" z-index=1999 :before-close="handleClose" width='80%' top='2vh'>
            <span v-if="btnType=='p_s'" style="font-size:16px;color:red;">请确保核对类型与授权书中核对项目保持一致</span>
           <div>
                <el-row :gutter="20">

                    <el-col :span="8" v-for="(item,index) in form2" :key="index"
                    style="padding:10px;border:1px solid #ccc;height:450px;overflow:auto;">
                    <!-- style="padding:10px;border:1px solid #ccc;overflow:auto;"> -->
                        <div style="display:inline-block;">
                            <span style="display:inline-block;padding:0px 20px 0px 5px"> NO：{{item.No}}</span>
                            <span> 申请人：{{item.ab_ex3}}</span>
                        </div>
                        <div>
                            <el-form  :model="form2[index]" style="padding:10px 0;">
                                <el-form-item v-if="btnType=='p_s'" label="核对类别" :label-width="formLabelWidth" class="hdTitle"  prop="ab_ex192">
                                    <el-select v-model="form2[index].ab_ex192" style="width:100%" placeholder="请选核对类别" @change="getType(form2[index].ab_ex192,index,'ab_ex192')">
                                        <el-option label="最低生活保障" value="最低生活保障"></el-option>
                                        <el-option label="特困人员供养" value="特困人员供养"></el-option>
                                        <el-option label="受灾人员救助" value="受灾人员救助"></el-option>
                                        <el-option label="医疗救助" value="医疗救助"></el-option>
                                        <el-option label="临时救助" value="临时救助"></el-option>
                                        <el-option label="低保外重残" value="低保外重残"></el-option>
                                        <el-option label="低保外一户多残依老养残" value="低保外一户多残依老养残"></el-option>
                                        <el-option label="编号己停止使用" value="编号己停止使用"></el-option>
                                        <el-option label="慈善救助" value="慈善救助"></el-option>
                                        <el-option label="编号己停止使用" value="编号己停止使用"></el-option>
                                        <el-option label="低保边缘" value="低保边缘"></el-option>
                                        <el-option label="教育救助" value="教育救助"></el-option>
                                        <el-option label="住房救助" value="住房救助"></el-option>
                                        <el-option label="就业救助" value="就业救助"></el-option>
                                        <el-option label="易返贫易致贫对象" value="易返贫易致贫对象"></el-option>
                                        <el-option label="司法援助" value="司法援助"></el-option>
                                        <el-option label="困难职工" value="困难职工"></el-option>
                                        <el-option label="支出型困难" value="支出型困难"></el-option>
                                        <el-option label="其他" value="其他"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item v-if="btnType!='p_s'" label="核对授权书抽查标记" label-width="90px"   prop="ab_ex221">
                                    <el-select v-model="HDflag[index]" multiple clearable style="width:100%;overflow:hidden;" placeholder="请选核对授权书抽查标记" @change="getType(HDflag,index)">
                                        <el-option label=" 授权书编号不规范" value=" 授权书编号不规范"></el-option>
                                        <el-option label=" 授权书救助类型不规范" value=" 授权书救助类型不规范"></el-option>
                                        <el-option label=" 授权书未指定区（市）行政区划名称" value=" 授权书未指定区（市）行政区划名称"></el-option>
                                        <el-option label=" 授权书未指定授权人" value=" 授权书未指定授权人"></el-option>
                                        <el-option label=" 授权书拍摄不清晰或书写不清晰" value=" 授权书拍摄不清晰或书写不清晰"></el-option>
                                        <el-option label=" 授权书拍摄角度不合规范或授权书不平整" value=" 授权书拍摄角度不合规范或授权书不平整"></el-option>
                                        <el-option label=" 授权书成员列表未指明家庭类型" value=" 授权书成员列表未指明家庭类型"></el-option>
                                        <el-option label=" 授权书成员列表未指明成员姓名或身份证号" value=" 授权书成员列表未指明成员姓名或身份证号"></el-option>
                                        <el-option label=" 授权书成员未签字或签字雷同" value=" 授权书成员未签字或签字雷同"></el-option>
                                        <el-option label=" 授权书成员与格构化数据中成员不符" value=" 授权书成员与格构化数据中成员不符"></el-option>
                                        <el-option label=" 授权书指模印未盖印或指模印雷同" value=" 授权书指模印未盖印或指模印雷同"></el-option>
                                        <el-option label=" 授权书经办人未签字或签字不足两人" value=" 授权书经办人未签字或签字不足两人"></el-option>
                                        <el-option label=" 授权书未签署日期" value=" 授权书未签署日期"></el-option>
                                        <el-option label=" 授权书未盖印公章" value=" 授权书未盖印公章"></el-option>
                                        <el-option label=" 未上传授权书" value=" 未上传授权书"></el-option>
                                        <el-option label=" 所上传文档不是合规授权书" value=" 所上传文档不是合规授权书"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                            <div>
                                <el-card class="box-card">
                                        <div slot="header" class="clearfix">
                                            <!-- <el-divider></el-divider> -->
                                            <el-button  v-if="btnType!='p_b'" style="float: left; padding: 3px 0" type="text" @click="handleRemove(uploadImg,'ab_ex177',index)">删除</el-button>
                                            <span><span style="color:red;"> * </span> 纸质授权书(<span style='color:red'>{{item.sum}}</span>)</span>
                                            <el-button  v-if="btnType!='p_b'" style="float: right; padding: 3px 0" type="text" @click="uploads('ab_ex177', 'form2',index)">上传</el-button>
                                        </div>
                                    <div class="block">
                                        <image-view :imgList="uploadImg[index].ab_ex177_img" @Imgindex='getImgIndex' id="ab_ex177"></image-view>
                                    </div>
                                </el-card>
                            </div>
                        </div>
                    </el-col>
                </el-row>
           </div>
            
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeView">取消操作</el-button>
                <el-button v-if="btnType=='p_s'" type="primary" @click="saveHDType">确定上传</el-button>
                <el-button v-if="btnType=='p_b'"  type="success" @click="setFlag">上传标记</el-button>
            </div>
        </el-dialog>

        <el-dialog title="上传" :visible.sync="dialogVisible3" width="500px" append-to-body  @close='uploadEvent2'>
            <upload @upload="uploadEvent" ref="myUpload"></upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">取 消</el-button>
                
                <el-button type="primary" @click="dialogVisible3 = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import request from '@/utils/request'
import imageView from '@/views/modules/assistance/imageView'
import upload from '@/views/modules/assistance/upload'
export default {
    name: "HDYJupLoad",
    props: ["data","isShow","btnType"],
    components: {
        imageView,
        upload
    },
    data() {
        return {
            isShow1:this.isShow,            //传参-控制弹框开关
            formLabelWidth: '100px',        //label的长度
            form2:[
                // {                         //核对预警
                // ab_ex3:this.data.ab_ex3,    //姓名
                // ab_ex177:this.data.ab_ex177,                //纸质授权书
                // ab_ex192:this.data.ab_ex192,                //核对类别
                // sid:this.data.ab_id,       //sid-查找对应的户主
                // }
            ],
            HDflag:[],
            uploadImg:[],
            imgNum:[],
            sum:'',//图片数量
            dialogVisible3:false, //图片上传弹框
            HDTypeList:['最低生活保障','特困人员供养','受灾人员救助','医疗救助','临时救助','低保外重残','低保外一户多残依老养残','慈善救助'
            ,'低保边缘','教育救助','住房救助','就业救助','易返贫致贫对象','司法援助','困难职工','支出型困难','其他'],

            imgIndex: {
                ab_ex177:0,
            },
            close:false,   //是否需要关闭弹窗后重新请求数据-- false-需要，true-不需要
        }
    },

    watch:{
        isShow1(newS,oldS){
            this.isShow1 = newS;
            this.getEmit(newS);

            // console.log(newS,oldS,'123');
            // this.loadData(newS);
        },

        isShow(newS,oldS){
            // console.log(newS,oldS,'123456');
            this.loadData();
        },
    },

     created(){
         console.log(this.btnType,'父向子-按钮类型b');
        this.loadData();
    },
    methods:{

        //关闭确定 
        handleClose(done) {
            this.$confirm('确认关闭窗口？')
            .then(_ => {
                done();
                this.close = true; //关闭弹窗后不再重新请求数据
            })
            .catch(_ => {});
        },

        // 取消
        closeView(){
            this.isShow1 = false; //关闭核对授权书上传弹窗
            this.close = true;    //关闭弹窗后不再重新请求数据
            // getEmit()
        },

        // 核对类别-- 开始是用来赋值的后来发现没什么用
        getType(val,index,key){

            console.log(val,index);
            console.log(this.form2[index].ab_ex192)

            // console.log(JSON.stringify(this.form2[index].ab_ex221) );
        },

        // 子向父传值
        getEmit(){
            // console.log(this.isShow1,'this.isShow1==');
            // console.log(this.close,'this.close==');
            this.$emit('function2',this.isShow1,this.close);
        },

        loadData(index){
            console.log(this.data,'父向子');
            console.log(this.btnType,'父向子-按钮类型');

            // 数据对象
            var obj = {
                No:'',
                sum:'',
                ab_ex3:'',
                ab_ex177:'',
                ab_ex192:'',
                ab_ex221:"",
                ab_id:'',
            }
            // 照片对象
            var obj2 = {ab_ex177_img:[]}
           
           this.form2=[];
        
           for(let i in this.data){
               obj.No = this.data[i].No;
               obj.sum = this.data[i].ab_ex177=='' ? 0: (this.data[i].ab_ex177).split(',').length;
               obj.ab_ex3 = this.data[i].ab_ex3;
               obj.ab_ex177 = this.data[i].ab_ex177;
               obj.ab_ex192 = this.data[i].ab_ex192;
               obj.ab_ex221 = this.data[i].ab_ex221;
               obj.ab_id = this.data[i].ab_id;
            //    this.HDflag[i]=this.data[i].ab_ex221.split(",")
               this.form2.push(obj);
               obj={};

               obj2.ab_ex177_img=this.data[i].ab_ex177.split(','),
               this.uploadImg.push(obj2);
               obj2={};
           }
            var a=","
           for(let i in this.form2){
               if(this.form2[i].ab_ex221!=''){
                // if(a.indexOf(this.form2[i].ab_ex221)==-1){

                    this.HDflag[i] = this.form2[i].ab_ex221.split(',');
                // }
                // else{
                //     this.HDflag[i]=[];
                //     this.HDflag[i].push(this.form2[i].ab_ex221)
                // }
               }
           }

            
            console.log(this.HDflag,'this.isShow1++');
            console.log(this.form2 , '--form2核对表');
            console.log(this.data , '--data核对表');
        },
        
        // 上传图片
        uploads(id, dataName,index) {
            console.log(id, dataName,index);

            if(!dataName) dataName = "form2";

            //r是处理好的数组
            if(this[dataName][index][id] == null) this[dataName][index][id] = "";
            var r = this[dataName][index][id].split(",").filter(function (s) {
                return s && s.trim();
            });

            this[dataName][index][id] = r.toString();
            this.dialogVisible3 = true;
            this.uploadId = id;
            this.uploadDataName = dataName; //数据名
            this.uploadIndex = index; //下标

            try {
                this.$refs.myUpload.clears();
            } catch (e) {}

        },

        uploadEvent(data) {
            let val = this[this.uploadDataName][this.uploadIndex][this.uploadId];
            val = val == "" ? data : val + "," + data;
            this[this.uploadDataName][this.uploadIndex][this.uploadId] = val;
        },
        
        uploadEvent2(){
            this.uploadImg[this.uploadIndex][this.uploadId + "_img"] = this[this.uploadDataName][this.uploadIndex][this.uploadId].split(",");
            this.uploadDataName = null;
            this.getImgNum(this.uploadIndex)   // 获取图片数量
            console.log(this.imgNum,'imgNum：各类图片的数量-上传后');
           
        },  

        // 获取图片数量
        getImgNum(index){
            console.log('图片数量',index,this.imgNum);
            console.log('图片',this.uploadImg);

            for(let key in this.uploadImg[index]){
                if(this.uploadImg[index][key][0]==''){
                    this.uploadImg[index][key].length = 0;
                    this.imgNum[key] = this.uploadImg[index][key].length;
                }else{
                    this.imgNum[key] = this.uploadImg[index][key].length;
                }
            }

            console.log(this.imgNum);
            console.log(this.imgNum[this.uploadId + "_img"],index);

            this.form2[index].sum = this.imgNum.ab_ex177_img;
        },

        //获取图片索引
        getImgIndex(item){
            let data = JSON.parse(item);
            this.imgIndex[data.id] = data.index;
            
            console.log(item,'图片索引');
            console.log(data);
        },

        // 图片移除
        handleRemove(file, str,index) {

            this.$confirm('是否删除该图片？',"提示" , {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
            }).then(() => {
                console.log(12346,str,index);

                this.$delete(this.uploadImg[index][str+"_img"],this.imgIndex[str]);
                this.form2[index][str] = this.uploadImg[index][str+"_img"].join(",");

                this.getImgNum(index)        //获取图片数量
            })
            .catch(action => {
                
                console.log("留在本页");        // 取消留在本页
            });
        },

        // 标记
        setFlag(){
            // 关闭窗口
             this.isShow1 = false;
            console.log(this.form2,'授权书标记before');

            for(let i in this.form2){
               if(this.HDflag[i]!=''){
                   this.form2[i].ab_ex221 = this.HDflag[i].join(",");
               }
            }
             console.log(this.form2,'授权书标记after');

            this.saveHDType("flag")
        },


        // 提交
        saveHDType(key){
            console.log(this.form2,key,'保存数据');
            
            if( key!='flag'){
                for(let i in this.form2 ){
                    // 核对类型验证
                    if(this.form2[i].ab_ex192==''){
                        this.$message.warning('NO：' + this.form2[i].No + this.form2[i].ab_ex3 + ' ,请选择一种核对类别！')
                        return false;
                    }else if(!this.HDTypeList.includes(this.form2[i].ab_ex192)){
                        this.$message.warning('NO：' +this.form2[i].No +this.form2[i].ab_ex3 +'当前选择的核对类别有误，请重新选择！')
                        return false;
                    }
    
                    // 图片数量验证
                    if(this.form2[i].sum>1){
                        this.$message.warning('NO：' +this.form2[i].No +this.form2[i].ab_ex3 +'纸质授权书照片只能上传一张！')
                        return false;
                    }else if(this.form2[i].sum==0){
                        this.$message.warning('NO：' +this.form2[i].No +this.form2[i].ab_ex3 +'请上传纸质授权书照片！')
                        return false;
                    }
    
                    this.form2[i].sum = this.form2[i].sum + '';
    
                }
            }

            console.log('上传保存',this.form2);

            if(key!='flag'){
                this.batchChangeCheckReport({
                    "data": JSON.stringify(this.form2) ,
                    // "sId": this.form2.sid,
                }).then((res)=>{
    
                }).catch((res)=>{
                    console.log(res);
                    if (res.response.data[0].status=="+OK") {
                        this.$message.success(res.response.data[0].msg)
                        this.isShow1 = false;
                        console.log("保存成功");
                    } else {
                        console.log("保存失败");
                        this.$message.error(res.response.data[0].msg)
                    }
                })
            }else{
                this.batchMarkCheckReport({
                    "data": JSON.stringify(this.form2) ,
                }).then((res)=>{
    
                }).catch((res)=>{
                    console.log(res);
                    if (res.response.data[0].status=="+OK") {
                        this.$message.success(res.response.data[0].msg)
                        this.isShow1 = false;
                        console.log("标记成功");
                    } else {
                        console.log("标记失败");
                        this.$message.error(res.response.data[0].msg)
                    }
                })
            }
        },

        // 核对授权书保存标记
        batchMarkCheckReport(data) {
            return request({
                headers: {
                    'Accept': 'application/json',
                },
                url: '/social/assistance/batchMarkCheckReport',
                method: 'post',
                data: data
            })
        },
        
        // 核对授权书保存提交
        batchChangeCheckReport(data) {
            return request({
                headers: {
                    'Accept': 'application/json',
                },
                url: '/social/assistance/batchChangeCheckReport',
                method: 'post',
                data: data
            })
        },
    }

}
</script>

<style scoped>

.HDYJBox2 .el-dialog{
    width: 100%;
    height: 100vh;
}

.HDYJBox2 .el-dialog__header{
    text-align: center;
    border-bottom: 1px solid #ddd;
}
.HDYJBox2 .el-dialog__body{
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
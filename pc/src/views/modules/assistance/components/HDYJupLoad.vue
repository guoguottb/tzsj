<template>
   <div class="HDYJBox">
        <el-dialog title="核对信息完善" :visible.sync="isShow1" z-index=1999 :before-close="handleClose">
            <span style="font-size:17px;">请确保核对类型与授权书中核对项目保持一致</span>
            <el-form :model="form2">
                <el-form-item v-if="form2.ab_ex221" label="核对授权书抽查标记" prop="ab_ex221"><span style="color:red">{{form2.ab_ex221}}</span> 
                </el-form-item>

                <el-form-item label="核对类别" :label-width="formLabelWidth" class="hdTitle"  prop="ab_ex192">
                <el-select v-model="form2.ab_ex192" placeholder="请选核对类别" @change="getType(form2.ab_ex192)">
                    <!-- <el-option label="" value=""></el-option> -->
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

                
            </el-form>

            <div>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <el-button style="float: left; padding: 3px 0" type="text" @click="handleRemove(uploadImg,'ab_ex177')">删除</el-button>
                        <span><span style="color:red;"> * </span> 纸质授权书(<span style='color:red'>{{sum}}</span>)</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="uploads('ab_ex177', 'form2')">上传</el-button>
                            
                    </div>
                    <div class="block">
                        <image-view :imgList="uploadImg.ab_ex177_img" @Imgindex='getImgIndex' id="ab_ex177"></image-view>
                    </div>
                </el-card>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="closeView">取 消</el-button>
                <el-button type="primary" @click="saveHDType">确 定</el-button>
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
    props: ["data","isShow"],
    components: {
        imageView,
        upload
    },
    data() {
        return {
            isShow1:this.isShow,
            formLabelWidth: '100px',
            form2:{                         //核对预警
                ab_ex3:this.data.ab_ex3,    //姓名
                ab_ex177:this.data.ab_ex177,                //纸质授权书
                ab_ex192:this.data.ab_ex192,                //核对类别
                ab_ex221:this.data.ab_ex221,                //核对类别
                sid:this.data.ab_id,       //sid-查找对应的户主
            },
            uploadImg:{
                ab_ex177_img:(this.data.ab_ex177).split(','),
            },
            imgNum:[],
            sum:this.data.ab_ex177=='' ? 0: (this.data.ab_ex177).split(',').length, //图片数量
            dialogVisible:false,
            dialogVisible3:false,
            imgIndex: {
                ab_ex177:0,
            },
            close:false,   //关闭弹窗后重新请求数据
        }
    },

    watch:{
        isShow1(newS,oldS){
            // console.log(newS,oldS,'123');
            this.isShow1 = newS;
            
            this.getEmit(newS);
            // this.loadData(newS);
        },

        isShow(newS,oldS){
            // console.log(newS,oldS,'123456');
            this.loadData();
        },
    },

     created(){
        this.loadData();
    },
    methods:{

        //关闭确定 
        handleClose(done) {
            this.$confirm('确认放弃操作？')
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

        // 核对类别
        getType(key){
            console.log(key);
            console.log(this.data);
            console.log(this.form2);
        },

        // 子向父传值
        getEmit(){
            // console.log(this.isShow1,'this.isShow1==');
            // console.log(this.close,'this.close==');
            this.$emit('function',this.isShow1,this.close);
        },

        loadData(index){
           
            this.form2.ab_ex3 = this.data.ab_ex3;
            this.data.ab_ex177 = this.form2.ab_ex177;
            this.data.ab_ex192 = this.form2.ab_ex192;
            this.data.ab_ex221 = this.form2.ab_ex221;
            this.data.ab_id = this.form2.sid;

            // console.log(this.isShow1,'this.isShow1++');
            console.log(this.form2 , '--子表');
            console.log(this.data , '--父表');
        },

        
        // 上传图片
        uploads(id, dataName) {
            // console.log(id, dataName);
            if(!dataName) dataName = "form2";

            //r是处理好的数组
            if(this[dataName][id] == null) this[dataName][id] = "";
            var r = this[dataName][id].split(",").filter(function (s) {
                return s && s.trim();
            });

            this[dataName][id] = r.toString();
            this.dialogVisible3 = true;
            this.uploadId = id;
            this.uploadDataName = dataName;

            try {
                this.$refs.myUpload.clears();
            } catch (e) {}

        },

        uploadEvent(data) {
            let val = this[this.uploadDataName][this.uploadId];
            val = val == "" ? data : val + "," + data;
            this[this.uploadDataName][this.uploadId] = val;
        },
        
        uploadEvent2(){
            this.uploadImg[this.uploadId + "_img"] = this[this.uploadDataName][this.uploadId].split(",");
            this.uploadDataName = null;
            this.getImgNum()   // 获取图片数量
            console.log(this.imgNum,'imgNum：各类图片的数量-上传后');
           
        },  

        // 获取图片数量
        getImgNum(){
            console.log('图片数量',this.uploadImg);
            for(let key in this.uploadImg){
                if(this.uploadImg[key][0]==''){
                    this.uploadImg[key].length = 0;
                    this.imgNum[key] = this.uploadImg[key].length;
                }else{
                    this.imgNum[key] = this.uploadImg[key].length;
                }
            }
             this.sum = this.imgNum.ab_ex177_img;
        },

        //获取图片索引
        getImgIndex(item){
            let data = JSON.parse(item);
            this.imgIndex[data.id] = data.index;
            
            console.log(item,'图片索引');
            console.log(data);
        },

        // 图片移除
        handleRemove(file, str) {

            this.$confirm('是否删除该图片？',"提示" , {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
            }).then(() => {
                console.log(12346,str);

                this.$delete(this.uploadImg[str+"_img"],this.imgIndex[str]);
                this.form2[str] = this.uploadImg[str+"_img"].join(",");

                this.getImgNum()        //获取图片数量
            })
            .catch(action => {
                
                console.log("留在本页");   // 取消留在本页
            });
        },

        saveHDType(){

            if(this.form2.ab_ex192==''){
                this.$message.warning('请选择一种核对类别！')
                return false;
            }else if(!['最低生活保障','特困人员供养','受灾人员救助','医疗救助','临时救助','低保外重残','低保外一户多残依老养残','慈善救助'
            ,'低保边缘','教育救助','住房救助','就业救助','易返贫致贫对象','司法援助','困难职工','支出型困难','其他'].includes(this.form2.ab_ex192)){
                this.$message.warning('当前选择的核对类别有误，请重新选择！')
                return false;
            }

            if(this.sum>1){
                this.$message.warning('纸质授权书照片只能上传一张！')
                return false;
            }else
             if(this.sum==0){
                this.$message.warning('请上传纸质授权书照片！')
                return false;
            }


            console.log('上传保存',this.form2);
            


            // this.$emit('function',this.isShow1);
            this.changeCheckReport({
                "data": '[' + JSON.stringify(this.form2) + ']',
                "sId": this.form2.sid,
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
        },

        // 核对授权书保存
        changeCheckReport(data) {
            return request({
                headers: {
                    'Accept': 'application/json',
                },
                url: '/social/assistance/changeCheckReport',
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
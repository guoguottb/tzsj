<template>
    <div>
        <h3 class="line_blue">&emsp;代理人信息</h3>
        <div class="lineSt"></div>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item label="姓名" prop="aba_ex1">
                    <el-input v-model="agents.aba_ex1" placeholder="请输入代理人姓名"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="身份证号码" prop="aba_ex3">
                    <el-input v-model="agents.aba_ex3" placeholder="请输入身份证号码"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20" style='margin-top:10px'>
            <el-col :span="12" class="my-col">
                <el-card class="box-card">
                    <div slot="header" class="clearfix c">
                        <el-button style="float: left; padding: 3px 0" type="text" @click="handleRemove(uploadImg, 'aba_ex4')">
                            删除</el-button>
                        <span>身份证拍照(正反面)(<span style='color:red'>{{agents.aba_ex4.split(",")[0]=="" ? 0 :agents.aba_ex4.split(",").length}}</span>)</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="uploads('aba_ex4', 'agents')">上传</el-button>
                    </div>
                    <div class="block c">
                        <image-view :imgList="uploadImg.aba_ex4_img" id="aba_ex14"  @Imgindex='getImgIndex' ></image-view>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12" class="my-col">
                <el-card class="box-card">
                    <div slot="header" class="clearfix c">
                        <el-button style="float: left; padding: 3px 0" type="text" @click="handleRemove(uploadImg,'aba_ex5')">
                            删除</el-button>
                        <span>委托书(<span style='color:red'>{{agents.aba_ex5.split(",")[0]=="" ? 0 :agents.aba_ex5.split(",").length}}</span>)</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="uploads('aba_ex5', 'agents')">上传</el-button>
                    </div>
                    <div class="block c">
                        <image-view :imgList="uploadImg.aba_ex5_img" id="aba_ex5"  @Imgindex='getImgIndex' ></image-view>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        
        <el-dialog title="上传" :visible.sync="dialogVisible" width="500px" append-to-body  @close='uploadEvent2'>
            <upload @upload="uploadEvent" ref="myUpload"></upload>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
	import request from '@/utils/request'
	import upload from '../../upload'
	import imageView from '../../imageView'
	import {isName, isNum} from '@/utils/until'
    
	export default {
		name: "AgentEdit",
        props: [],
		components: {
			upload,
			imageView
		},
        data() {
            return {
				dialogVisible: false,
                agents: {
                    aba_ex1: "",
                    aba_ex2: "",
                    aba_ex3: "",
                    aba_ex4: "",
                    aba_ex5: ""
                },
                uploadImg: {
                    aba_ex4_img: [],
                    aba_ex5_img: []
                },
                imgIndex: {
					aba_ex4: 0,
					aba_ex5: 0
                }
            }
        },
        created() {
            this.loadData();
        },
        methods: {
            loadData() {
				this.loadAgent({
					"sId": this.$route.query.sId,
				}).then(res => {
					this.agents = res[0].data;
					this.uploadImg.aba_ex4_img = this.agents.aba_ex4.split(",");
					this.uploadImg.aba_ex5_img = this.agents.aba_ex5.split(",");
				}).catch(res => {
					if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
						console.log('请求失败了-----------------------6')
						this.$message.error('数据获取失败或请求超时666')
						this.$emit("closes", false)
						this.$router.go(-1)
						return false
					}
					try{
						this.agents = res.response.data[0].data;
						this.uploadImg.aba_ex4_img = this.agents.aba_ex4.split(",");
						this.uploadImg.aba_ex5_img = this.agents.aba_ex5.split(",");
					}catch(e){}
				})
            },
			loadAgent(data){
				return request({
					method: 'post',
					url: '/social/assistance/getBasicAgent',
					data: data
				});
			},
			//删除图片
			handleRemove(file, str) {
				this.$delete(this.uploadImg[str+"_img"],this.imgIndex[str]);
				this.agents[str]=this.uploadImg[str+"_img"].join(",");
			},
			// 上传图片
			uploads(id, dataName) {
				if(!dataName) dataName = "dibaoForm";
				
				if(this[dataName][id] == null) this[dataName][id] = "";
				var r = this[dataName][id].split(",").filter(function (s) {
					return s && s.trim();
				});

				this[dataName][id]=r.toString();
				this.dialogVisible = true;
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
			},
			getImgIndex(item){
				let data=JSON.parse(item);
				this.imgIndex[data.id]=data.index;
			},
			getData(){
				return this.agents;
			},
            //数据校验
            verify(){
				if(this.agents.aba_ex1 || this.agents.aba_ex3 || this.agents.aba_ex4 || this.agents.aba_ex5){
					if(!this.agents.aba_ex1){
						this.$message.warning("请填写代理人姓名");
						return false;
					}
					if(!this.agents.aba_ex3){
						this.$message.warning("请填写代理人身份证号");
						return false;
					}
					if(this.agents.aba_ex3){
						var msg = isCardID(this.agents.aba_ex3)
						if(msg != true){
							this.$message.warning("代理人" + msg);
							return false;
						}
					}
					if(!this.agents.aba_ex4){
						this.$message.warning("请拍照并上传代理人身份证正反面");
						return false;
					}
					if(this.uploadImg.aba_ex4_img.length != 2){
						this.$message.warning("代理人身份证照片至少上传两张且只能上传两张");
						return false;
					}
					if(!this.agents.aba_ex5){
						this.$message.warning("请拍照并上传委托书");
						return false;
					}
					if(this.uploadImg.aba_ex5_img.length<1){
						this.$message.warning("代理人身份证照片至少上传一张");
						return false;
					}
                    return true;
				}
            }
        }
    }
</script>
<style scoped>
.c{
    text-align: center;
}
</style>

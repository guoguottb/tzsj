<template>
  <div class="app">
    <header>投诉建议</header>
    <main>
        <van-form  @submit="onSubmit">
            <van-field v-model="data.name" required name="name" label="投诉人" placeholder="请填写投诉人" />
            <van-field v-model="data.tel" required name="tel" label="手机号码" placeholder="请填写手机号码" :rules="[{ required: true, message: '请填写手机号码' }]" />
           
            <!-- <van-field v-model="data.complaint_department"  name="complaint_department" label="投诉部门" placeholder="点击选择投诉部门" 
            is-link required readonly  clickable  @click="showPicker193 = true" :rules="[{ required: true, message: '点击选择投诉部门' }]"/>
            
              <van-popup v-model="showPicker193" position="bottom">
                <van-picker show-toolbar :columns='complaintDepartmentList' @confirm="ComplaintDepartment($event)" @cancel="showPicker193 = false" />
            </van-popup> -->

            <van-field v-model="data.complaint_type"  name="complaint_type" label="投诉类型" placeholder="点击选择投诉类别" 
            is-link required readonly  clickable  @click="showPicker192 = true" :rules="[{ required: true, message: '点击选择投诉类别' }]"/>
           
           <van-popup v-model="showPicker192" position="bottom">
                <van-picker show-toolbar :columns='complaintTypeList' @confirm="ComplaintType($event)" @cancel="showPicker192 = false" />
            </van-popup>
         
           
            <van-field v-model="data.complaint_content" required type="textarea" name="complaint_content" rows="3"  autosize 
            label="投诉内容" placeholder="请填写投诉内容" :rules="[{ required: true, message: '请填写投诉内容' }]"/>

            <van-field name="uploader" label="相关材料">
                <template #input>
                    <van-uploader v-model="uploader"  :before-read="beforeRead" :after-read="uploadImg(3)" :before-delete="beforeDelete('complaint_picture')"/>
                </template>
            </van-field>

            <div style="margin: 16px;">
                <van-button block  type="info" native-type="submit" @click="save">提交</van-button>
            </div>
            </van-form>
    </main>
  </div>
</template>

<script>
import request from '@/utils/request.js'
import {compressImg,tszfValidate,tszfFilter,tszfFilter2,getAge,getBirthday,getSex,xzqh,isCardID} from '@/utils/utils.js'
export default {
    name:'complaints',  // 投诉建议
    data(){
        return{
            // username: '',
            // password: '',
            uploader:[], //图片
            showPicker192:false,
            showPicker193:false,
            complaintTypeList: ['服务', '效率','其他'],
            // complaintDepartmentList: ['低保', '特困供养','单人保救助','低保边缘家庭','支出困难家庭',
            // '临时救助','困境儿童','残疾人两项补贴','尊老金','下方职工','水电减免','建档立卡','医疗救助','教育救助','住房救助','灾害救助','就业救助',
            // '司法援助','工会救助','红会救助','社会组织救助','慈善救助','其他救助'],
            data:{
                name:'',
                tel:'',
                complaint_type:'',
                complaint_department:'',
                complaint_content:'',
                complaint_picture: '',
            }
        }

    },
    methods: {
        onConfirm(value) {
            this.value = value;
            this.showPicker = false;
        },
        onSubmit(values) {
            console.log('submit', values);
        },

        //	投诉类型选择192
        ComplaintType(value) {
            // console.log(value);
            this.data.complaint_type = value;
            this.showPicker192 = false;
            console.log(this.data.complaint_type,'192');
            
        },
        //	投诉部门选择193
        ComplaintDepartment(value) {
            // console.log(value);
            this.data.complaint_department = value;
            this.showPicker193 = false;
            console.log(this.data.complaint_department,'193');
            
        },

        // 保存提交
        save(){

            // 去除姓名的空白符号并且判断姓名是否合法
            this.data.name = this.data.name.replace(/\s*/g,"")
            let tszf = tszfValidate(this.data.name)
            if(tszf){
                this.$toast.fail("请输入正确的姓名")
                return false
            }
            
            var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
            if (!myreg.test(this.data.tel)) {
                this.$toast.fail('请填写正确的手机号')
                return false
            }

            console.log(this.data);

            // 遮罩
            let toast = this.$toast({
                type:'loading',
                message:'提交中...',
                overlay:true,
                duration:0
            })

            request({
					method:'post',
					url: '/social/assistanceWeixin/saveComplaint',
					data:{
						data:'['+JSON.stringify(this.data)+']',
					},
				}).then(res=>{

					toast.clear()
					// 提示提交成功
					this.$toast.success('提交成功')
					// this.$router.push('/')

                    // if(){

                        this.$dialog.alert({
                            message: '提交成功',
                        }).then(()=>{
                            this.$router.push('/Home2?module=社会群众入口')
                        })
                    // }
					console.log(res)
				}).catch(error=>{
					toast.clear()
					// 提示提交失败
					this.$toast.fail('提交失败')
					console.log(error)
				})
        },


        // 照片格式验证
        beforeRead(file){
            console.log(file,'file');
            if(file.type == 'image/heic' || file.type==''){
                this.$toast.fail('照片格式不正确')
                return false
            }else{
                return true
            }
        },

        // 图片请求
        imgRequest(param,file,num){
            console.log(222);
            console.log(param,file,num);

            request({
                method:'post',
                url: '/social/weixinMinios/fileUpload',
                // url: '/social/minios/fileUpload',
                data:param,
            }).then(res=>{
                file.status = 'done';
                file.message = '上传完成';
                console.log(res)

               if(num == 3){
                    console.log(1111)
                    if(this.data.complaint_picture){
                        this.data.complaint_picture = this.data.complaint_picture.concat(',',res[0].filename)
                    }else{
                        this.data.complaint_picture = this.data.complaint_picture.concat(res[0].filename)
                    }
                    console.log(this.data.complaint_picture)
                }
            }).catch(erro=>{
                file.status = 'failed';
                file.message = '上传失败';
                if(num == 3){
                    this.uploader.pop()
                }
                this.$toast.fail('上传失败')
                console.log(erro)
            })
        },

        uploadImg(num) {
            return file=>{
                console.log(file)
                console.log(num)
                file.status = 'uploading';
                file.message = '上传中...';
                
                let obj = new compressImg(file,num,this.imgRequest)
                
            }
        },

        beforeDelete(data){
            return (file,detail)=>{
                let arr = this.data[data].split(',')
                arr.splice(detail.index,1)
                this.data[data] = arr.join(',')
                
                console.log(this.data[data])
                console.log(data)
                console.log(file)
                console.log(detail)
                return true
            }
        },
    },
}
</script>

<style>
    header {
		height: 88px;
		line-height: 100px;
		width: 100%;
		font-size: 36px;
		color: #FFFFFF;
		background: #3e80cc;
	}

</style>
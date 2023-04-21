// 政策计算器
<template>
	<div class="policiesCalculator">
        <header>
            <div class="headerHead">政策计算器</div>
        </header>
        
		<van-form ref="policiesCalculator" class="mainform" @submit="submit">
            <div style="text-align:left;margin:0 5px ;line-height:35px;font-size:16px">请输入您的家庭情况</div>
            <van-field label="1.您的家庭人口数是?" label-width="200"></van-field>
            <van-field v-model="data1" type="number" name="data1" placeholder="请输入您的家庭人口数"></van-field>

            <van-field label="2.您的个人月收入范围？" label-width="200" class="mtclass"></van-field>
            <van-field name="data2">
                <template #input>
                    <van-radio-group v-model="data2">
                    <van-radio name="A" shape="square">低于740元/月</van-radio>
                    <van-radio name="B" shape="square" class="mtclass">高于或等于740元/月</van-radio>
                    </van-radio-group>
                </template>
            </van-field>

            <van-field label="3.您的家庭年总收入是?" label-width="200"></van-field>
            <van-field v-model="data3" type="number" name="data3" placeholder="请输入您的家庭年总收入"></van-field>

            <van-field label="4.您的家庭一年内医疗，教育，残疾康复，因灾意外产生的刚性支出是?" label-width="340"></van-field>
            <van-field v-model="data4" type="number" name="data4" placeholder="请输入您的家庭一年内医疗，教育，残疾康复，因灾意外产生的刚性支出"></van-field>

            <van-field label="5.健康情况？" label-width="200" class="mtclass"></van-field>
            <van-field name="data5">
                <template #input>
                    <van-radio-group v-model="data5">
                    <van-radio name="A" shape="square">健康或一般</van-radio>
                    <!-- <van-divider  :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 1px' }" /> -->
                    <van-radio name="B" shape="square" class="mtclass">患有以下17种重病之一:白血病、终末期肾病、恶性肿瘤、器官移植后抗排异药物治疗、再生障碍性贫血、系统性红斑狼疮(活动期或伴有脏器损害)、血友病、肝硬化失代偿期、重症类风湿关节炎、强直性脊柱炎、糖尿病合并严重并发症〔限晚期糖尿病肾病、糖尿病足〈有坏疽、深部溃疡、脓肿、骨髓炎〉患者)、艾滋病机会感染、慢性阻塞性肺疾病、尘肺、地中海贫血、克罗恩病、渐冻人病。</van-radio>
                    <!-- <van-divider  :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 1px' }" /> -->
                    <van-radio name="C" shape="square" class="mtclass">(儿童)患有先天性心脏病、颅内良性肿瘤</van-radio>
                    <!-- <van-divider  :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 1px' }" /> -->
                    <van-radio name="D" shape="square" class="mtclass">(儿童)治疗费用1年中自付超过2万元</van-radio>
                    
                    </van-radio-group>
                </template>
            </van-field>

            <van-field label="6.您的年龄？" label-width="200" class="mtclass"></van-field>
            <van-field name="data6">
                <template #input>
                    <van-radio-group v-model="data6" @change="data6change">
                        <van-radio name="A" shape="square">18周岁以下</van-radio>
                        <van-radio name="B" shape="square"  class="mtclass">18-59周岁</van-radio>
                        <van-radio name="C" shape="square" class="mtclass">60-80周岁</van-radio>
                        <van-radio name="D" shape="square" class="mtclass">80周岁以上</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <!-- 18岁以下7,7选完跳9,18后跳8 -->
            <div v-if="isshowdata7">
                <van-field label="7.您是否有下述情况？" label-width="200" class="mtclass"></van-field>
                <van-field name="data7">
                    <template #input>
                        <van-radio-group v-model="data7">
                        <van-radio name="A" shape="square">失去父母或查找不到生父母</van-radio>
                        <van-radio name="B" shape="square"  class="mtclass">父母双方不能完全履行抚养或监护责任</van-radio>
                        <van-radio name="C" shape="square" class="mtclass">遭受侵害、虐待、伤害或其他困难</van-radio>
                        <van-radio name="D" shape="square" class="mtclass">无赡抚扶养人或赡抚扶养人无履行义务能力</van-radio>
                        <van-radio name="E" shape="square" class="mtclass">无上述情况</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
            </div>

            <div v-if="isshowdata8">
                <van-field label="8.您是否有赡抚养人？" label-width="200" class="mtclass"></van-field>
                <van-field name="data8">
                    <template #input>
                        <van-radio-group v-model="data8">
                        <van-radio name="A" shape="square">无赡抚扶养人或赡抚扶养人无履行义务能力</van-radio>
                        <van-radio name="B" shape="square"  class="mtclass">有赡抚扶养人</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
            </div>
            

            <van-field label="9.是否残疾？" label-width="200" class="mtclass"></van-field>
            <van-field name="data9">
                <template #input>
                    <van-radio-group v-model="data9" @change="data9change">
                    <van-radio name="A" shape="square">是</van-radio>
                    <van-radio name="B" shape="square"  class="mtclass">否</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <!-- 9选是有10,11,12 选否跳13-->
            <div v-if="isshowdata10">
                <van-field label="10.残疾类别是？" label-width="200" class="mtclass"></van-field>
                <van-field name="data10">
                    <template #input>
                        <van-radio-group v-model="data10">
                        <van-radio name="A" shape="square">肢体</van-radio>
                        <van-radio name="B" shape="square"  class="mtclass">智力</van-radio>
                        <van-radio name="C" shape="square"  class="mtclass">精神</van-radio>
                        <van-radio name="D" shape="square"  class="mtclass">视力</van-radio>
                        <van-radio name="E" shape="square"  class="mtclass">听力</van-radio>
                        <van-radio name="F" shape="square"  class="mtclass">言语</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
            </div>
            

            <div v-if="isshowdata11">
                <van-field label="11.残疾等级是？" label-width="200" class="mtclass"></van-field>
            <van-field name="data11">
                <template #input>
                    <van-radio-group v-model="data11">
                    <van-radio name="A" shape="square">一级</van-radio>
                    <van-radio name="B" shape="square"  class="mtclass">二级</van-radio>
                    <van-radio name="C" shape="square"  class="mtclass">三级</van-radio>
                    <van-radio name="D" shape="square"  class="mtclass">四级</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            </div>
            

            <div v-if="isshowdata12">
                <van-field label="12.是否有下列情形之一：1.家中还有其他残疾人2.残疾人本人由老人供养？" label-width="340" class="mtclass"></van-field>
                <van-field name="data12">
                    <template #input>
                        <van-radio-group v-model="data12">
                        <van-radio name="A" shape="square">是</van-radio>
                        <van-radio name="B" shape="square"  class="mtclass">否</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
            </div>
           
            
            <van-field label="13.是否遭遇突发困难？" label-width="200" class="mtclass"></van-field>
            <van-field name="data13">
                <template #input>
                    <van-radio-group v-model="data13">
                        <!--shape 选择器形状 可选值为 square 方形、round 圆形 ，默认 round  -->
                    <van-radio name="A" shape="square">因病造成基本生活困难</van-radio>
                    <van-radio name="B" shape="square"  class="mtclass">因灾造成基本生活困难</van-radio>
                    <van-radio name="C" shape="square"  class="mtclass">因意外伤害造成基本生活困难</van-radio>
                    <van-radio name="D" shape="square"  class="mtclass">因学业导致基本生活困难</van-radio>
                    <van-radio name="E" shape="square"  class="mtclass">否</van-radio>
                    </van-radio-group>
                </template>
            </van-field>

            <van-button type="info" class="mtclass" style="width:100%" native-type="submit">提交</van-button>
            <van-popup v-model="popshow" style="width:90%;height:140px;padding:10px">
                <div class="poptitle">匹配结果</div>
                
                <div style="margin:10px" v-if="resultMessage">根据您所填信息，您有可能符合<span style="color:red">{{resultMessage}}</span>等政策。</div>
                <div style="margin:10px" v-else><span style="color:red">'暂未匹配到相应的民政政策'</span></div>

                <van-button type="info" style="margin:10px" native-type="button" @click="reset">重置</van-button>
                <van-button to="apply" type="info" style="margin:10px">去申请</van-button>
            </van-popup>

        </van-form>
	</div>
</template>

<script>
	// import request from '@/utils/request.js'

//   import {compressImg,tszfValidate,tszfFilter,tszfFilter2,getAge,getBirthday,getSex,xzqh,isCardID} from '@/utils/utils.js'
	export default {
        data(){
            return{
                data1:'',
                data2:'',
                data3:'',
                data4:'',
                data5:'',
                data6:'',
                data7:'',
                data8:'',
                data9:'',
                data10:'',
                data11:'',
                data12:'',
                data13:'',
                isshowdata7:false,
                isshowdata8:false,
                isshowdata10:false,
                isshowdata11:false,
                isshowdata12:false,
                popshow:false,
                resultMessage:'',
            }
        },
        methods:{
            data6change(val){
                console.log(val)
                if(val == 'A'){
                    this.data8 = ''
                    this.isshowdata7 = true
                    this.isshowdata8 = false
                }else{
                    this.data7 = ''
                    this.isshowdata7 = false
                    this.isshowdata8 = true

                }
            },
            data9change(val){
                if(val == 'A'){
                    this.isshowdata10 = true
                    this.isshowdata11 = true
                    this.isshowdata12 = true
                }else{
                    this.data10 = ''
                    this.data11 = ''
                    this.data12 = ''
                    this.isshowdata10 = false
                    this.isshowdata11 = false
                    this.isshowdata12 = false

                }
            },
            submit(val){
                // console.log(val)
                // console.log(Object.values(val))
                this.resultMessage = ''
                // van-field提示行都没有name，所以会有val会有一个undefined
                let undf = 0

                console.log( Object.values(val))
                console.log( Object.values(val).length)
                
                Object.values(val).forEach((item,index) => {
                    if(item == ''){
                        undf+=1
                        if(undf>1){
                            this.$toast.fail('请填写，选择完全')
                        }
                    }else if(index == Object.values(val).length-1){
                        console.log('ok')
                        if(this.data3 / 12 / this.data1 >=740 && this.data3 / 12 / this.data1 <1480 && this.data5 == 'B'){
                            this.resultMessage = '重病单人保'
                        }

                        if(this.data3 / 12 / this.data1 >=740 && this.data3 / 12 / this.data1 <1480 && ((this.data11 == 'A' || this.data11 == 'B') || (this.data11 == 'C' && (this.data10 == 'B' || this.data10 == 'C')))){
                            this.resultMessage ? this.resultMessage = this.resultMessage + '、重残单人保' : this.resultMessage = '重残单人保'
                        }

                        if(this.data3 / 12 / this.data1 < 1110){
                            if(this.data3 / 12 / this.data1 < 740){
                                this.resultMessage ? this.resultMessage = this.resultMessage + '、低保' : this.resultMessage = '低保'
                            }else{
                                this.resultMessage ? this.resultMessage = this.resultMessage + '、低保边缘' : this.resultMessage = '低保边缘'
                            }
                        }

                        if(((this.data6 != 'B' && this.data6 != '') || ((this.data10 == 'B' || this.data10 == 'C') && (this.data11 == 'A' || this.data11 == 'B')) || (this.data10 == 'A' && this.data11 == 'A')) && this.data2 == 'A' && (this.data8 == 'A' || this.data7 == 'D')){
                            this.resultMessage ? this.resultMessage = this.resultMessage + '、特困供养' : this.resultMessage = '特困供养'
                        }

                        if (this.data6 == 'A' && ((this.data11 == 'A' || this.data11 == 'B') || ((this.data11 == 'C' || this.data11 == 'D') && (this.data10 == 'B' || this.data10 == 'C')) || (this.data5 != 'A' && this.data5 == '') || (this.data7 != 'E' && this.data7 != '') || Number(this.data3) / 12 / Number(this.data1) < 1480)) {
                            this.resultMessage ? this.resultMessage = this.resultMessage + '、困境儿童' : this.resultMessage = '困境儿童'
                        }

                        if (this.data2 == 'A' && (this.data11 == 'A' || this.data11 == 'B') && (this.data10 != '' && this.data10 != 'E' && this.data10 != 'F')) {
                            this.resultMessage ? this.resultMessage = this.resultMessage + '、低保外重残' : this.resultMessage = '低保外重残'
                        }

                        if (this.data2 == 'A' && (this.data11 == 'C' || this.data11 == 'D') && (this.data10 == 'B' || this.data10 == 'C')) {
                            this.resultMessage ? this.resultMessage = this.resultMessage + '、三四级智力精神' : this.resultMessage = '三四级智力精神'
                        }

                        if (Number(this.data3) / 12 / Number(this.data1) >= 740 && Number(this.data3) / 12 / Number(this.data1) < 1480 && this.data12 == 'A') {
                            this.resultMessage ? this.resultMessage = this.resultMessage + '、一户多残依老养残' : this.resultMessage = '一户多残依老养残'
                        }

                        if (Number(this.data3) / 12 / Number(this.data1) < 740 && (this.data11 == 'A' || this.data11 == 'B')) {
                            this.resultMessage ? this.resultMessage = this.resultMessage + '、低保内重残' : this.resultMessage = '低保内重残'
                        }

                        if (Number(this.data3) / 12 / Number(this.data1) < 740 && (this.data11 == 'C' || this.data11 == 'D')) {
                            this.resultMessage ? this.resultMessage = this.resultMessage + '、低保内非重残' : this.resultMessage = '低保内非重残'
                        }

                        if (this.data11 == 'A' || this.data11 == 'B') {
                            this.resultMessage ? this.resultMessage = this.resultMessage + '、重残护理补贴' : this.resultMessage = '重残护理补贴'
                        }

                        if (this.data13 != '' && this.data13 != 'E') {
                            this.resultMessage ? this.resultMessage = this.resultMessage + '、临时救助' : this.resultMessage = '临时救助'
                        }

                        if (this.data6 == 'D') {
                            this.resultMessage ? this.resultMessage = this.resultMessage + '、尊老金' : this.resultMessage = '尊老金'
                        }

                        if ((Number(this.data3) - Number(this.data4)) / 12 / Number(this.data1) < 740) {
                            this.resultMessage ? this.resultMessage = this.resultMessage + '、支出困难型家庭' : this.resultMessage = '支出困难型家庭'
                        }
                        console.log(this.data1)
                        console.log(this.data2)
                        console.log(this.data3)
                        console.log(this.data4)
                        console.log(this.data5)
                        console.log(this.data6)
                        console.log(this.data7)
                        console.log(this.data8)
                        console.log(this.data9)
                        console.log(this.data10)
                        console.log(this.data11)
                        console.log(this.data12)
                        console.log(this.data13)
                        console.log(this.resultMessage)
                        this.popshow = true
                    }
                });
                // for(let i in val){
                //     // console.log(i)
                //     // console.log(i=='undefined')
                //     if(i!='undefined' && !this[i]){
                //         console.log(i)
                //         this.$toast.fail('请填写，选择完全')
                //         break
                //     }
                // }

            },
            // 重置
            reset(){
                this.data1 = ''
                this.data2 = ''
                this.data3 = ''
                this.data4 = ''
                this.data5 = ''
                this.data6 = ''
                this.data7 = ''
                this.data8 = ''
                this.data9 = ''
                this.data10 = ''
                this.data11 = ''
                this.data12 = ''
                this.data13 = ''
                this.isshowdata7 = false
                this.isshowdata8 = false
                this.isshowdata10 = false
                this.isshowdata11 = false
                this.isshowdata12 = false
                this.popshow = false
            }
        }
    }
</script>

<style scoped>
	.policiesCalculator {
		width: 100%;
		height: 100%;
		background-color: #f5f5f5;
		background-size: 100% 100%;
		position: fixed;
		overflow: auto;
	}
    header {
		width: 100%;
		height: 100px;
		background-color: #3e80cc;
		box-shadow: 0px 0px 30px #a1a1a1;
		position: fixed;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28px;
		color:#ffffff;
	}
    .headerHead {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size:36px;
	}
    .mainform{
        margin-top: 100px;
    }
    .mtclass{
        margin-top: 10px;
    }
    .poptitle{
        font-size: 36px;
        font-weight: bold;
    }
</style>

<template>
  <div class="g-box">
    <div class="g-box2">
      <div class="info2">
        <el-form :model="data"
                 :inline-message="true"
                 :show-message="false"
                 ref="data"
                 label-width="auto"
                 style='padding-right: 10px;'>

          <el-row :gutter="20"
                  v-if="isShow"
                  style="margin:0px 0 10px 8%;color:red;">
            <!-- <i style="color:#e6e43ce8;font-size:25px" class="el-icon-message-solid"></i> -->
            <el-col :span="24">注：生成发放名单列表的操作时间应为当月的20号结束前</el-col>
          </el-row>

          <el-row :gutter="20"
                  style="margin-top: 20px;height: 80px">
            <el-col :span="2">
              <el-form-item></el-form-item>
            </el-col>
            <el-col :span="20">
              <div class="textTips">待发放事项：{{getNamesLable().join("、")}}</div>
            </el-col>
            <el-col :span="2">
              <el-form-item></el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20"
                  style="height: 50px">
            <el-col :span="6">
              <el-form-item></el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="业务名称"
                            prop="childType">
                <el-select v-model="data.childType"
                           placeholder="请选择业务名称"
                           style="width:100%;">
                  <el-option v-for="item in names"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-col :span="6">
              <el-form-item></el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20"
                  style="height: 50px">
            <el-col :span="6">
              <el-form-item></el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发放时间"
                            prop="date">
                <el-input readonly
                          v-model="et_date"
                          disabled></el-input>
                <!-- <el-select v-model="data.date" :rules="this.data.name != '临时救助' ?{ date: [{required: true,message: '请选择发放年月',trigger: 'blur'}]} : {date:[]}" placeholder="请选择发放年月" style="width:100%;">
                                <el-option  v-for="item in dates"  :key="item.value"  :label="item.label"  :value="item.value">
                                </el-option>
                            </el-select> -->
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item></el-form-item>
            </el-col>
          </el-row>

          <!-- <el-row :gutter="20" style="height: 50px">
					<el-col :span="6"><el-form-item></el-form-item></el-col>
					<el-col :span="12">
						<el-form-item label="发放类型" prop="type">
                            <el-select v-model="data.type" placeholder="请选择发放类型" style="width:100%;">
                                <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6"><el-form-item></el-form-item></el-col>
				</el-row> -->

          <!-- <el-row :gutter="20" style="height: 50px">
					<el-col :span="6"><el-form-item></el-form-item></el-col>
					<el-col :span="12">
						<el-form-item label="物资类型" prop="type">
                            <el-select v-model="data.type" placeholder="请选择物资类型" style="width:100%;">
                                <el-option v-for="item in wztypes" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6"><el-form-item></el-form-item></el-col>
				</el-row> -->

          <!-- <el-row :gutter="20"  style="height: 50px">
					<el-col :span="6"><el-form-item></el-form-item></el-col>
					<el-col :span="12">
						<el-form-item label="是否增发补助">
                            <el-radio-group v-model="data.subsidy">
                                <el-radio :label="1" :disabled="true">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="6"><el-form-item></el-form-item></el-col>
				</el-row> -->

          <el-row :gutter="20"
                  style="height: 50px">
            <el-col :span="6">
              <el-form-item></el-form-item>
            </el-col>
            <el-col :span="12"
                    style="text-align: right">
              <el-button type="primary"
                         size="small"
                         @click="save">生成名单</el-button>
            </el-col>
            <el-col :span="6">
              <el-form-item></el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
import { commonValidator, formsVerify } from '@/utils/until'

export default {
  name: "jzffCreate",
  components: {
  },
  data () {
    return {
      names: [
        // 最低生活保障边缘 在泰州的标准名称应该是 低保边缘家庭
        { label: "孤儿", value: "孤儿" },
        { label: "事实无人抚养", value: "事实无人抚养" },
        { label: "贫困家庭儿童", value: "贫困家庭" },
        { label: "重病重残儿童", value: "重病重残" },
        { label: "其他需要帮助的儿童", value: "其他" },
      ],
      // types: [
      //     {label: "正常发放", value: "1"},
      //     {label: "补发", value: "2"},
      //     {label: "一次性发放", value: "3"}
      // ],

      et_date: '',
      // dates: [],
      data: {
        childType: "",    //	困境儿童类型
        frequency: "月",    //  发放频次: 次、月、季、年，默认月
        goodsType: "资金",    //  物资类型,资金、物质、服务，有的都发
        issuingType: "正常发放"     //  发放类型 正常发放、补发、一次性发放，默认正常发放
      },
      isFinish: false,
      // 必填项未填警告弹框
      // rules: {
      //   childType: [{
      //     required: true,
      //     message: '请选择业务名称',
      //     trigger: 'blur'
      //   }],
      //   // type: [{
      //   // 	required: true,
      //   // 	message: '请选择发放类型',
      //   // 	trigger: 'blur'
      //   // }],

      // },

      isTime: true, //是否不超过本月20号
      isShow: false,
    }
  },
  created () {
    this.loadData();
  },
  methods: {
    loadData () {
      let today = new Date().Format('dd');
      this.et_date = new Date().Format('yyyy-MM-dd');

      // 时间判断 -当月20号以内可以生成资金发放名单，否则保存时进行提示，且无法生成发放名单
      this.isTime = (Number(today) <= 31);
      // this.isTime = (Number(today) <= 20);
      // this.isShow = today>20 ? true : false;
      this.isShow = !this.isTime;

    },

    showYearMonth (mindate) {
      //年月根据类型走，根据类型读取后台最早的一批记录或是读取未发放的最早一批记录
      this.dates = [];
      this.data.date = "";  //发放年月
      if (mindate) {
        let date = new Date();
        let lastDate = date;
        let ym = date.Format("yyyyMM");
        let dd = date.Format("dd");
        this.dates.push({ label: ym, value: ym });

        while (ym > mindate) {
          lastDate = new Date(date.setMonth(date.getMonth() - 1));
          ym = lastDate.Format("yyyy-MM-dd");
          // this.dates.push({label: ym, value: ym});
        }

        // console.log(dd,'dd');
        // console.log(dd>10,'dd>10');
        console.log(this.dates.length);
        console.log(this.dates);

        if (this.dates.length > 0) {
          let dateArr = this.dates
          this.dates = [];
          // this.dates.push(dateArr[1])	//发放上一月
          this.dates.push(dateArr[0])		//发放本月
        }

        // 如果当月日期大于10号，生成下一月的日期选项，否则是本月
        // if(dd>10){
        // 	this.dates[0].label = this.dates[0].label*1+1;
        // 	this.dates[0].value = this.dates[0].value*1+1;
        // }
      }
    },

    // 选择业务名称触发
    getNameMinDate () {

      this.loadNameMinDate({
        "sName": this.data.name
      }).then(res => {
        alert(res[0].data)
      }).catch(res => {
        if (typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200) {
          console.log('请求失败了-----------------------6')
          this.$message.error('数据获取失败或请求超时666')
          this.$emit("closes", false)
          this.$router.go(-1)
          return false
        }
        console.log(res.response.data[0].mindate, '日期列表传参');
        this.showYearMonth(res.response.data[0].mindate)
      })

    },

    getNamesLable () {
      let re = [];
      this.names.forEach((item) => {
        re.push(item.label);
      });
      return re;
    },

    save () {
      try {
        this.isSaves = true;

        // // 信息提示的判断条件
        // if (!formsVerify(this.rules, this.data, this.$message)) {
        //   this.isSaves = false;
        // }

        if (!this.isSaves) {
          return false;
        }

        // 设置定时器，30秒请求失败刷新页面
        let time = setTimeout(() => {
          loading.close()
          this.$emit("closes", false)
          this.$message.error("网络异常");
          this.$router.go(-1)
        }, 30000)

        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        this.saveData(
          this.data,
        ).then((res) => {

          if (res[0].status == "+OK") {
            loading.close()
            this.$message.success(res[0].msg)
            // this.$emit("closes", false)
            // this.$router.push({path: '/assistance/kjet/kjetListGrant'});
          } else {
            loading.close()
            this.$message.error(res[0].msg)
          }

        }).catch((res) => {

          clearTimeout(time);
          console.log(res.response.data)

          // if(this.data.name=='临时救助'){
          if (["+OK", '+Ok', '+ok'].includes(res.response.data.status)) {
            loading.close()
            this.$message.success(res.response.data.msg)
            this.$emit("closes", false)
            // this.$router.go(-1)
          } else {
            loading.close()
            this.$message.error(res.response.data.msg)
          }
        });
      } catch (e) {
        console.log(e);
        alert(e.message)
      }
    },

    // 保存接口
    saveData (data) {
      let url = '';
      // if(this.data.name=='临时救助'){

      // 	url = '/social/assistance/fundDistribution';
      // }else{
      // 	url = '/social/assistance/createReliefDistList';
      // }

      return request({
        method: 'post',
        url: '/social/child/createFundRelease',
        data: data
      })
    },

    // loadNameMinDate(data){
    // 	return request({
    // 		method: 'post',
    // 		url: '/social/assistance/getReliefDistMinDate',
    // 		data: data
    // 	});
    // }
  }
}
</script>



<style scoped>
.g-box {
  height: 80vh !important;
}
.g-box2 {
  height: 100%;
  width: 100%;
  overflow: auto !important;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
}
.info2 {
  flex: 1;
  padding-right: 10px;
  box-sizing: border-box;
  border-right: 1px solid #ddd;
  overflow: auto;
}
.textTips {
  padding: 0px 20px 0px 20px;
  height: 40px;
  line-height: 40px;
  border: 1px solid #409eff;
  width: 100%;
  background: #d6eaff;
  border-radius: 4px;
}
.my-divider {
  margin: 15px auto 10px;
}

.my-table {
  width: 100%;
  margin-bottom: 5px;
}

.my-col {
  text-align: center;
  color: #909399;
}

.button-group {
  margin-bottom: 5px;
  margin-left: 10px;
}

.el-table__body-wrapper .el-table__empty-block {
  background-image: none;
  min-height: auto;
  height: auto !important;
}

.el-table__empty-block .el-table__empty-text {
  display: block;
  line-height: 40px;
}

.el-table--border {
  border-bottom: 1px solid #ebeef5 !important;
}

.ainfo2 {
  width: 240px;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  padding-left: 10px;
  box-sizing: border-box;
}

.line_blue {
  border-left: 2px solid #3385ff;
  margin-top: 25px;
}

.lineSt {
  background-color: #dcdfe6;
  height: 1px;
  width: 100%;
  margin-bottom: 10px;
}

.ainfoFont {
  display: block;
  margin-bottom: -15px;
  font-weight: bold;
  color: #606266;
}

.listStyle {
  list-style: none;
}

.listStyleA {
  color: #3385ff !important;
}
/* 	.my-table .el-input .el-input__inner{
		border: none !important;
	} */
.my-table >>> .el-input__inner {
  border: 0;
}
</style>

<template>
  <div class="g-box">
    <div class="mengBan"
         v-if="jisuanShow">
      <!-- 灰色蒙版 -->
      <header>
        <h2>政策计算（<span>注：在本页面上填报修改的数据不会影响真实数据</span>）</h2>
      </header>
      <main>
        <el-form :label-position="labelPosition"
                 :model="jisuan"
                 class="info_box">

          <el-row :gutter="20">
            <el-col :span="12"
                    class="my-col">
              <el-form-item label="家庭人员总数"
                            label-width="170px">
                <el-input v-model="jisuan.familyNum"
                          max="100"
                          min="1"
                          placeholder="请输入家庭人员总数"
                          type="number"></el-input>
              </el-form-item>

              <el-form-item label="家庭中未成年人数"
                            label-width="170px">
                <el-input :max="jisuan.familyNum"
                          min="0"
                          style="display:inline-block;"
                          v-model="jisuan.familyChildrens"
                          type="number"
                          @change="changePerson(val,jisuan.familyChildrens)"
                          placeholder="请输入家庭中未成年的人数"></el-input>
              </el-form-item>

              <el-form-item label="法定赡抚养人数（非共同）"
                            label-width="200px">
                <el-input style="display:inline-block;"
                          :max="100"
                          min="0"
                          v-model="jisuan.familyFD"
                          type="number"
                          @change="changePerson()"
                          placeholder="请输入家庭中法定赡抚养人的人数"></el-input>
              </el-form-item>

              <el-form-item label="家庭年总支出"
                            label-width="170px">
                <el-input max="999999"
                          min="0"
                          style="display:inline-block;"
                          v-model="jisuan.familyZzc"
                          type="number"
                          placeholder="请输入家庭年支出"></el-input>
              </el-form-item>

              <el-form-item v-if="jisuan.familyNum=='1' && jisuan.familyFD=='0'"
                            label="护理费"
                            label-width="170px">
                <el-select v-model="jisuan.careCost"
                           style="width:100%">
                  <el-option label="0"
                             value="0"></el-option>
                  <el-option label="100"
                             value="100"></el-option>
                  <el-option label="250"
                             value="250"></el-option>
                  <el-option label="500"
                             value="500"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12"
                    class="my-col">
              <el-form-item label="家庭中老年人数"
                            label-width="170px">
                <el-input :max="jisuan.familyNum"
                          min="0"
                          style="display:inline-block;"
                          v-model="jisuan.familyOlds"
                          type="number"
                          @change="changePerson"
                          placeholder="请输入家庭中老年人的人数"></el-input>
              </el-form-item>

              <el-form-item label="家庭中重残人数"
                            label-width="170px">
                <el-input :max="jisuan.familyNum"
                          min="0"
                          style="display:inline-block;"
                          v-model="jisuan.familyZC"
                          type="number"
                          @change="changePerson"
                          placeholder="请输入家庭中重残人数"></el-input>
              </el-form-item>

              <el-form-item label="家庭中重病人数"
                            label-width="170px">
                <el-input :max="jisuan.familyNum"
                          min="0"
                          style="display:inline-block;"
                          v-model="jisuan.familyZB"
                          type="number"
                          @change="changePerson"
                          placeholder="请输入家庭中重病人数"></el-input>
              </el-form-item>

              <el-form-item label="家庭总年收入"
                            label-width="170px">
                <el-input max="999999"
                          min="0"
                          style="display:inline-block;"
                          v-model="jisuan.familyAmt"
                          type="number"
                          placeholder="请输入家庭总年收入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <hr>

        <!-- 操作 -->
        <div style="text-align: center; margin:10px auto">
          <el-button type="success"
                     size="small"
                     @click="changeJS(jisuan)">政策计算</el-button>
          <el-button type="info"
                     size="small"
                     @click="clearJS">重置条件</el-button>
        </div>

        <!--jsjg 计算结果 -->
        <div style="width:99%;margin:10px auto 0px;padding:10px;background-color:#f1f1f1;">
          <span v-show="showButton && salvationClass.length"
                style="font-size:18px;color:red;margin:10px 0;">您可能符合如下救助<span style="font-size:14px;color:#111;margin: 0 5px;">（点击按钮查看救助金明细）</span></span>
          <span v-show="showButton && !salvationClass.length"
                style="font-size:18px;color:red;margin:10px 0;">您不符合救助条件</span>
          <div class="buttons">
            <el-button type="primary"
                       @click="showPolicyType(item)"
                       v-for="(item,index) in salvationClass"
                       :key="index">
              {{ item.class }}
            </el-button>
          </div>
          <!-- table 救助政策表单 -->
          <template v-if="showTable">
            <el-table class="policyType"
                      :data="tableData"
                      border
                      style="width: 100%">
              <el-table-column prop="familyNum"
                               label="成员"
                               width="180">
              </el-table-column>
              <el-table-column prop="selectClass"
                               label="选择的类型"
                               width="180">
              </el-table-column>
              <el-table-column prop="health"
                               label="健康状况">
              </el-table-column>
              <el-table-column v-if="Array.isArray(Buttonbject.detailClass)"
                               prop="0"
                               label="增发对象类型">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.value"
                             @change="changeOption(scope)"
                             placeholder="请选择">
                    <el-option v-for="item in scope.row.additionalObj"
                               :key="item"
                               :label="item"
                               :value="item">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="money"
                               label="成员保障金">
              </el-table-column>
            </el-table>
          </template>
          <div v-if="showTable && !['低保-重病单列户','低保-重残单列户'].includes(moneyData[0].type)">
            <p style="text-align: center;margin-top:10px"> <span style="color:green;width:200px;"></span> 家庭月保障金合计为 <span style="color:red">{{sumMoney}}</span> </p>
          </div>
          <div v-else-if="showTable && ['低保-重病单列户','低保-重残单列户'].includes(moneyData[0].type)">
            <el-row>
              <el-col :span="8"
                      class="my-col"
                      v-for="(item,index ) in form3"
                      :key="index">

                <p style="text-align: center;margin-top:10px"> <span style="color:green;width:200px;"></span> 保障金合计为 <span style="color:red">{{sumMoney}}</span> </p>
              </el-col>
            </el-row>
          </div>

        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "zcjs",

  data () {
    return {
      labelPosition: 'left',
      // 救助类型计算的的重要条件
      jisuan: {
        familyNum: '', 	//家庭人口
        familyZC: '',	//重残残人数
        familyZB: '',	//重病人数
        familyFD: '',	//法定赡养人数
        familyAmt: '',	//家庭总收入
        familyZzc: '',	//家庭总支出
        familyOlds: '',		//老年年人数
        familyChildrens: '',	//未成年人数
        lifeCost: '',		//生活费
        careCost: '',		//护理费
      },
      jisuanShow: true,
      kxsjz: ["儿童救助", "临时救助家庭", "特困人员供养", "支出型困难家庭", "单人保家庭", "低保边缘家庭", "最低生活保障-按人保", "最低生活保障-按户保", "最低生活保障-按人保-重病单人保", "最低生活保障-按人保-重残单人保"],
      jsjg: [],
      jsjgString: "",
      jsjgshow1: false,
      jsjgshow2: true,
      showTable: false, //显示
      moneyData: [{
        name: '',
        type: '',
        money: '',
        health: '',
        addObj: ''
      },],
      ab_ex40: 0,
      form3: [{      //按人保成员保障金计算结果
        name: '',
        helpMoney: ''
      }],
      dbStandard: 740,
      throttle: true,//人数不可以大于家庭人数的提示    节流
      salvationClass: [],
      governCount: 39701, // G 人均可支配收入常数
      showButton: false, // 点击查询 出现button按钮
      showTable: false,  // 点击政策button 出现对于table
      tableData: [],
      Buttonbject: {},
      currentData: {},  // 点击政策计算的时候保存 上面from表单内的数据
    }
  },

  watch: {
    $route: "fetchData",
  },

  created () {
  },

  methods: {
    changePerson (neeval, val) {
      console.log(neeval, val)
    },
    // 政策计算按钮
    changeJS (key) {
      if (!key.familyNum) return this.$message.warning("请输入数据")
      this.salvationClass = []
      this.tableData = []
      this.currentData = this.jisuan
      this.showTable = false
      // 月低保标准
      let subsistenceAllowance = this.dbStandard
      // 家庭人均月收入
      let monthIncome = key.familyAmt / (key.familyNum * 1) / 12
      // 家庭人均月收入 < 月低低保标准常数（740）
      let subsistenceAllowanceClass = monthIncome < subsistenceAllowance ? true : false
      // 1.5倍低保
      let lowAllowance15 = subsistenceAllowance <= monthIncome && 1.5 * subsistenceAllowance >= monthIncome ? true : false
      // 2.0倍低保
      let lowAllowance20 = 740 * 1.5 < monthIncome && 2 * 740 >= monthIncome ? true : false
      // 年均可支配收入 / 12月
      let monthGovernCount = this.governCount / 12
      // 特困人员供养评判标准
      if (key.familyNum == 1 && key.familyFD == 0 && subsistenceAllowanceClass) {
        this.salvationClass.push({
          class: "特困人员供养",
          selectClass: "特困供养",// 救助家庭细分
        })
      }
      // 是否属于特困人员供养
      let searchSome = this.searchCategory("特困人员供养")
      // 低保-按户保
      if (!searchSome && subsistenceAllowanceClass) {
        this.salvationClass.push({
          class: "最低生活保障",
          familyNum: key.familyNum,
          selectClass: "低保-按户保",
          detailClass: ["普通对象", "10%增发对象", "重残对象（所有一二级残）", "重病对象"]
        })
      }
      // 低保-按人保-重病单人保
      if (lowAllowance15 && key.familyZB >= 1) {
        this.salvationClass.push({
          class: "最低生活保障",
          familyZBCount: key.familyZB,
          selectClass: "低保-按人保",
          detailClass: "重病单人保"
        })
      }
      // 低保-按人保-重残单人保
      if (lowAllowance15 && key.familyZC >= 1) {
        this.salvationClass.push({
          class: "最低生活保障",
          familyZCCount: key.familyZC,
          selectClass: "低保-按人保",
          detailClass: ["重残单人保（所有一二级重残）", "10%重残单人保（三级智力、三级重残）"]
        })
      }
      // 低收入家庭(市标) 2倍标准
      if (lowAllowance20) {
        this.salvationClass.push({
          class: "低收入家庭",
          selectClass: "低收入家庭",
        })
      }
      // 低保边缘家庭(省标)
      if (lowAllowance15) {
        this.salvationClass.push({
          class: "低保边缘家庭",
          selectClass: "低保边缘家庭",
        })
      }
      let ZC1 = (2 * subsistenceAllowance <= monthIncome && monthIncome <= monthGovernCount) && (monthIncome - (key.familyZzc / 12 / key.familyNum)) <= subsistenceAllowance
      console.log(ZC1, "zc1")
      let ZC2 = (1.5 * subsistenceAllowance <= monthIncome && monthIncome <= monthGovernCount) && (monthIncome - (key.familyZzc / 12 / key.familyNum)) <= subsistenceAllowance
      // 支出性贫困家庭
      if (ZC1) {
        this.salvationClass.push({
          class: "支出性贫困家庭",
          selectClass: "支出性Ⅰ型贫困家庭",
        })
      }
      else if (ZC2) {
        this.salvationClass.push({
          class: "支出性贫困家庭",
          selectClass: "支出性Ⅱ型贫困家庭",
        })
      }
      if (this.salvationClass.length) {
        this.salvationClass.push({
          class: "临时救助",
          selectClass: "临时救助",
        })
      }
      console.log(this.salvationClass)
      this.showButton = true
      // if(key=='1'){
      // 	this.changeAmt();
      // 	if(this.jisuan.familyNum=='1' && this.jisuan.familyFD<1){
      // 		this.jisuan.lifeCost = this.tkStandard;
      // 		this.jisuan.careCost = '0';
      // 	}

      // 	this.isTrueData = true;
      // }else{
      // 	this.isTrueData = false;
      // }

      // this.showTable = false;
      // var jsjg=[];
      // // this.jsjg=[];
      // console.log("计算救助数据",this.jisuan);
      // this.incomeConstant = this.zcStandard / 12;

      // // 困境儿童需要家庭成员年龄<18岁，在每本函数中无法进行困境儿童操作--暂时取消
      // // if(this.jisuan.familyChildrens>0){
      // // 	jsjg.push(this.kxsjz[0]) ; //家庭人口=1，没有赡抚养人(不管有没有重残重病)---特困
      // // 	console.log(jsjg,"儿童救助");
      // // }

      // console.log('获取低保救助金额标准',this.dbStandard);

      // // 如果总收入>低保标准 this.jisuan.familyAmt>0 
      // if( (this.jisuan.familyAmt)/this.jisuan.familyNum/12 < this.dbStandard){  //人均月 < 低保标准
      // 	console.log("小于低保标准",this.jisuan.familyNum>=1,Number(this.jisuan.familyFD)>=1);
      // 	if(this.jisuan.familyNum==1 && this.jisuan.familyFD<1) {
      // 		jsjg.push(this.kxsjz[2]) ; //家庭人口=1，没有赡抚养人(不管有没有重残重病)---特困
      // 		console.log(jsjg,"特困");
      // 	}else if( this.jisuan.familyNum > 1|| this.jisuan.familyFD>=1) {
      // 		jsjg.push(this.kxsjz[7]); //有赡抚养人(非共同生活>=1)或共同生活>1(有或没有重残重病)---按户保
      // 		console.log(jsjg,this.jisuan,"按户保");

      // 	}else if(Number(this.jisuan.familyNum)>=1 && (Number(this.jisuan.familyFD)>=1)){
      // 		jsjg.push(this.kxsjz[7]); //有赡抚养人(非共同生活>=1)且共同生活=1(有或没有重残重病)---按户保
      // 		console.log(jsjg,this.jisuan,"按户保");
      // 	}
      // }
      // console.log(this.jisuan);
      // //  if 家庭人口>0 && 总收入>0
      // if(this.jisuan.familyNum>0 && this.jisuan.familyAmt > 0 ){

      // 	//支出判别公式 ZC = (1.5i ≤ h < G/12) & ((h - (X/12/H)) < i)

      // 	var h1=0;    // h1 = 人均月收入
      // 	h1 = this.jisuan.familyAmt / 12 / this.jisuan.familyNum;

      // 	var h2 = 0;    // h2 = 可支配人均月收入
      // 	if(this.jisuan.familyAmt - this.jisuan.familyZzc != 0){
      // 		h2 = (this.jisuan.familyAmt - this.jisuan.familyZzc) / 12 / this.jisuan.familyNum;
      // 	}else{
      // 		h2 = 0;
      // 	}
      // 	// 条件1是否成立
      // 	var condition1 = ((this.dbStandard * 1.5) < h1 && h1 < this.incomeConstant) ? true : false;
      // 	// 条件2是否成立
      // 	var condition2 = (h2 < this.dbStandard ) ? true : false;


      // 	// 如果 低保标准 <= 月人均 <= 低保标准*2
      // 	if( h1 >= this.dbStandard && h1 <= (this.dbStandard * 2) ){

      // 		if(h1<(this.dbStandard * 1.5)){	//如果 低保标准 < 月人均 < 低保标准 * 1.5

      // 			if(this.jisuan.familyZB > 0 || this.jisuan.familyZC > 0){ 		//如果重病或重残

      // 				jsjg.push(this.kxsjz[4]);
      // 				jsjg.push(this.kxsjz[5]);

      // 				if(this.jisuan.familyZB > 0){                               //如果重病-按人保+低收入
      // 					jsjg.push(this.kxsjz[8]); 
      // 				}
      // 				if(this.jisuan.familyZC > 0){                               //如果重残-按人保+低收入
      // 					jsjg.push(this.kxsjz[9]);
      // 				}

      // 				console.log(jsjg,"重病/重残-按人保+低保边缘+低收入");
      // 			}
      // 			else{															//否则//低保边缘+低收入-----低收入包含低保边缘
      // 				jsjg.push(this.kxsjz[4]);
      // 				jsjg.push(this.kxsjz[5]);
      // 				console.log(jsjg,"低保边缘+低收入");
      // 			}	
      // 		}
      // 		if( h1 >= (this.dbStandard * 1.5) ){       							//如果 低保标准 * 1.5 <= 月人均 < 低保标准 * 2
      // 			if(this.jisuan.familyZB > 0 || this.jisuan.familyZC > 0){ 		//如果重病或重残-按人保+低收入

      // 				jsjg.push(this.kxsjz[4]); //低收入--单人保

      // 				if(this.jisuan.familyZB > 0){                               //如果重病-按人保+低收入
      // 					jsjg.push(this.kxsjz[8]); 
      // 				}
      // 				if(this.jisuan.familyZC > 0){                               //如果重残-按人保+低收入
      // 					jsjg.push(this.kxsjz[9]);
      // 				}
      // 				if(condition2){
      // 					jsjg.push(this.kxsjz[3]); //支出
      // 					console.log(jsjg,"支出");
      // 				}

      // 				console.log(jsjg,"重病/重残-按人保+低收入");
      // 			}
      // 			else{
      // 				jsjg.push(this.kxsjz[4]);
      // 				console.log(jsjg,"低收入");

      // 				if(condition2){
      // 					jsjg.push(this.kxsjz[3]); //支出
      // 					console.log(jsjg,"支出");
      // 				}
      // 			}
      // 		}
      // 	}

      // 	else if( (this.dbStandard * 2) < h1 && h1 < this.incomeConstant && h2 < this.dbStandard){

      //                 jsjg.push(this.kxsjz[3]); //支出

      // 		console.log("均月>2*低保标准 && < 人均可支配常数 && 可支配月人均<标准");
      // 	}
      // 	// 如果人 --支出
      // }

      // if(jsjg.length>0){
      // 	jsjg.splice(1,0,this.kxsjz[1]) //临时救助--暂时取消
      // 	this.jsjgshow1 = true;
      // 	this.jsjgshow2 = false;
      // }else{
      // 	this.jsjgshow1 = false;
      // 	this.jsjgshow2 = true ;
      // }

      // this.jsjgString = jsjg.join(" ，")

      // console.log(this.jsjgString);
      // console.log(jsjg);

      // if(this.jsjg.length>0){
      // 	// this.jsjg.push('临时救助') //临时救助
      // 	console.log(222);
      // 	this.jsjgshow1=true;
      // 	this.jsjgshow2= false;
      // }else{

      // 	this.jsjgshow1=false;
      // 	this.jsjgshow2=true ;
      // }
      // console.log(this.jsjg,'救助计算');
      // this.jsjg = jsjg;

      // return jsjg;

    },
    // 计算器数据清零--重置按钮
    clearJS () {
      this.jisuan = {
        familyNum: '', 	//家庭人口
        familyZC: '',	//重残残人数
        familyZB: '',	//重病人数
        familyFD: '',	//法定赡养人数
        familyAmt: '',	//家庭总收入
        familyZzc: '',	//家庭总支出
        familyOlds: '',		//老年年人数
        familyChildrens: '',	//未成年人数
        lifeCost: '',		//生活费
        careCost: '',		//护理费
      }

      this.showTable = false;
      this.showButton = false
      this.salvationClass = [];
      this.tableData = []
      // this.changeJS();

    },
    // 贫困分类查找
    searchCategory (val) {
      return this.salvationClass.some(item => item.class === val)
    },
    // 政策计算数据table结果显示按钮
    showPolicyType (obj) {
      this.tableData = []
      this.Buttonbject = obj;
      let currentData = this.currentData
      // 取非健康 病/残的最大值
      let health = +this.jisuan.familyZB < +this.jisuan.familyZC ? +this.jisuan.familyZC : +this.jisuan.familyZB
      // 判断最大值是重病/重残
      let healthInfo = +this.jisuan.familyZB < +this.jisuan.familyZC ? "重残" : "重病"
      if (obj.selectClass === "特困供养") {
        let healthInfo = null
        if (currentData.familyZB > 0) {
          healthInfo = "重病"
        } else if (currentData.familyZC > 0) {
          healthInfo = "重残"
        } else {
          healthInfo = "健康"
        }
        this.tableData = [{
          familyNum: "成员1",
          selectClass: obj.selectClass,
          health: healthInfo,
          money: +(this.dbStandard * 1.3).toFixed(2)
        }]
      }
      if (obj.selectClass === "低保-按户保") {
        for (let i = 0; i < currentData.familyNum; i++) {
          this.tableData.push({
            familyNum: "成员" + (i + 1),
            selectClass: obj.selectClass,
            health: i < health ? healthInfo : "健康",
            money: (this.dbStandard - (currentData.familyAmt / currentData.familyNum / 12)).toFixed(2),
            additionalObj: obj.detailClass,
            value: obj.detailClass[0]
          })
        }
      }
      // 低保 按人保 重病单人保
      if (obj.selectClass === "低保-按人保" && !Array.isArray(obj.detailClass)) {
        for (let i = 0; i < currentData.familyNum; i++) {
          this.tableData.push({
            familyNum: "成员" + (i + 1),
            selectClass: obj.selectClass,
            health: i < currentData.familyZB ? "重病" : "健康",
            money: (this.dbStandard * 1).toFixed(2)
          })
        }
      } else if (obj.selectClass === "低保-按人保" && Array.isArray(obj.detailClass)) {
        for (let i = 0; i < currentData.familyNum; i++) {
          this.tableData.push({
            familyNum: "成员" + (i + 1),
            selectClass: obj.selectClass,
            health: i < currentData.familyZC ? "重残" : "健康",
            money: (this.dbStandard * 0.65).toFixed(2),
            additionalObj: obj.detailClass,
            value: obj.detailClass[0]
          })
        }
      }
      // 低收入家庭
      if (obj.selectClass === "低收入家庭") {
        for (let i = 0; i < currentData.familyNum; i++) {
          this.tableData.push({
            familyNum: "成员" + (i + 1),
            selectClass: obj.selectClass,
            health: i < health ? healthInfo : "健康",
            money: "暂无政策"
          })
        }
      }
      // 低保边缘家庭（1.5倍家庭（省标））
      if (obj.selectClass === "低保边缘家庭") {
        for (let i = 0; i < currentData.familyNum; i++) {
          this.tableData.push({
            familyNum: "成员" + (i + 1),
            selectClass: obj.selectClass,
            health: i < health ? healthInfo : "健康",
            money: "暂无政策"
          })
        }
      }
      // 支出性贫困家庭 
      if (obj.class === "支出性贫困家庭") {
        for (let i = 0; i < currentData.familyNum; i++) {
          this.tableData.push({
            familyNum: "成员" + (i + 1),
            selectClass: obj.selectClass,
            health: i < health ? healthInfo : "健康",
            money: "暂无政策"
          })
        }
      }
      // 临时救助
      if (obj.class === "临时救助") {
        for (let i = 0; i < currentData.familyNum; i++) {
          this.tableData.push({
            familyNum: "成员" + (i + 1),
            selectClass: obj.selectClass,
            health: i < health ? healthInfo : "健康",
            money: "暂无政策"
          })
        }
      }
      this.showTable = true // 显示table表格
      console.log(health, "health")
      console.log(this.tableData, "currentTable")
    },
    changeOption (scope) {
      let h = this.currentData.familyAmt / this.currentData.familyNum / 12
      switch (scope.row.value) {
        case "普通对象":
          this.tableData[scope.$index].money = (this.dbStandard - h).toFixed(2)
          break;
        case "10%增发对象":
          this.tableData[scope.$index].money = ((this.dbStandard - h) + this.dbStandard * 0.1).toFixed(2)
          break;
        case "重残对象（所有一二级残）":
          this.tableData[scope.$index].money = (this.dbStandard).toFixed(2)
          break;
        case "重病对象":
          this.tableData[scope.$index].money = (this.dbStandard * 1.2).toFixed(2)
          break;
        case "重残单人保（所有一二级重残）":
          this.tableData[scope.$index].money = (this.dbStandard * 0.65).toFixed(2);
          break;
        case "10%重残单人保（三级智力、三级重残）":
          this.tableData[scope.$index].money = (this.dbStandard * 0.75).toFixed(2);
          break;
      }
    }
  },
  computed: {
    // 家庭月保障金额
    sumMoney () {
      let sum = 0
      this.tableData.filter(item => {
        if (item.money === '暂无政策') return
        sum += +item.money
      })
      console.log(this.tableData)
      return sum.toFixed(2) + "元"
    }
  }
}
</script>
<style scoped>
header {
  text-align: center;
  margin: 10px;
}
main {
  margin: 20px 0 0 0;
}
.info_box {
  margin: 20px 10px;
}
.buttons {
  display: flex;
  justify-content: center;
}
.policyType {
  margin-top: 10px;
}
</style>
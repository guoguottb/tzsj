// 统计分析
<template>
  <div class="g-box">
    <div class="g-box2">
     
         <!-- :summary-method="getSummaries" show-summary-->

      <el-header>泰州市民政局社会救助任务进度表</el-header>
      <div style="display:flex;justify-content: space-between;">
        <div style="display: inline-block;width:200px;">
          <span  width="10%">报表时间:</span>
          <span  width="15%" prop="data">2021-11-22 12:00:00</span>
          <span></span>
        </div>
        <div style="display:flex;justify-content: space-between;width:120px;">
          <el-button  icon="el-icon-folder-opened" type="text" size="mini" @click="exportExcel" >导出</el-button>
          <el-button  icon="el-icon-printer" type="text" size="mini" @click="printTable" style="width:50px;"  >打印</el-button>
        </div>
      </div>




      <el-table class="oneTh" :data="tableData" :span-method="cellMerge" border height="87%" id="mytable"  style="width: auto" @filter-change="filterChange">
        <el-table-column prop="ab_ex161" label="泰州市民政局社会救助任务进度表" style="display:none" width="120">
          <el-table-column prop="ab_ex161" label="区县" width="120">
          </el-table-column>
          <el-table-column prop="ab_ex2" label="街道" width="120">
          </el-table-column>
          <!-- 预警信息 -->
          <el-table-column label="预警信息">
            <el-table-column label="总户数" 
            column-key="date"
            :filters="[
              { text: '群众申办', value: '群众申办' },
              { text: '建档立卡预警', value: '建档立卡预警' },
              { text: '医保预警', value: '医保预警' },
              { text: '主动排查', value: '主动排查' },
              { text: '市团委预警', value: '市团委预警' },
              { text: '12345涉救预警', value: '12345涉救预警' },
              { text: '水电预警', value: '水电预警' },
              { text: '住房预警', value: '住房预警' },
              { text: '物价预警', value: '物价预警' },
              { text: '消防预警', value: '消防预警' },
             ]"
             >
              
              <el-table-column  label="群众申办" width="120" v-if="show[0].qz_show">
                <el-table-column  label="户数" prop="qzsqHs" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop="qzsqRs" width="120">
                </el-table-column>
              </el-table-column>

              <el-table-column label="建档立卡预警" v-if="show[0].jd_show">
                <el-table-column  label="省标">
                  <el-table-column  label="户数" prop="jdlkshengBiaoHs" width="120">
                  </el-table-column>
                  <el-table-column  label="人数" prop="jdlkshengBiaoRs" width="120">
                  </el-table-column>
                </el-table-column>

                <el-table-column prop="ts_city" label="市标">
                  <el-table-column  label="户数" prop="jdlkshiBiaoHs" width="120">
                  </el-table-column>
                  <el-table-column  label="人数" prop="jdlkshiBiaoRs" width="120">
                  </el-table-column>
                </el-table-column>
              </el-table-column>

              <el-table-column  label="医保预警" width="120" v-if="show[0].yb_show">
                <el-table-column  label="户数"  prop="ybyjHs" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop="ybyjRs" width="120">
                </el-table-column>
              </el-table-column>

              <el-table-column  label="主动排查" width="120" v-if="show[0].zd_show">
                <el-table-column  label="户数" prop="zdpcHs" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop="zdpcRs" width="120">
                </el-table-column>
              </el-table-column>

              <el-table-column  label="市团委预警" width="120" v-if="show[0].stw_show">
                <el-table-column  label="户数" prop="tswHs" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop="tswRs"  width="120">
                </el-table-column>
              </el-table-column>

              <el-table-column  label="12345涉救预警" width="120" v-if="show[0].sj_show">
                <el-table-column  label="户数" prop="sjyjHs" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop="sjyjRs"  width="120">
                </el-table-column>
              </el-table-column>

              <el-table-column  label="水电预警" width="120" v-if="show[0].sd_show">
                <el-table-column  label="户数" prop="sdyjHs" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop="sdyjRs"  width="120">
                </el-table-column>
              </el-table-column>

              <el-table-column  label="住房预警" width="120" v-if="show[0].zf_show">
                <el-table-column  label="户数" prop="zfyjHs" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop="zfyjRs"  width="120">
                </el-table-column>
              </el-table-column>

              <el-table-column  label="物价预警" width="120" v-if="show[0].wj_show">
                <el-table-column  label="户数" prop="wjyjHz" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop="wjyjRs"  width="120">
                </el-table-column>
              </el-table-column>

              <el-table-column  label="消防预警" width="120" v-if="show[0].xf_show">
                <el-table-column  label="户数" prop="xfyjHs" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop="xfyjRs"  width="120">
                </el-table-column>
              </el-table-column>

            </el-table-column>
          </el-table-column>

          <!-- 前置核查 -->
          <el-table-column  label="前置核查">

            <el-table-column  label="完成派单">
                <el-table-column  label="户数" prop="" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop=""  width="120">
                </el-table-column>
                <el-table-column  label="完成率" prop="" width="120">
                </el-table-column>
            </el-table-column>

            <el-table-column  label="完成入户核查">
                <el-table-column  label="户数" prop="" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop=""  width="120">
                </el-table-column>
                <el-table-column  label="完成率" prop="" width="120">
                </el-table-column>
            </el-table-column>

            <el-table-column  label="完成经济核对">
                <el-table-column  label="户数" prop="" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop=""  width="120">
                </el-table-column>
                <el-table-column  label="完成率" prop="" width="120">
                </el-table-column>
            </el-table-column>
          </el-table-column>

          <!-- 低收入认定 -->
          <el-table-column  label="低收入认定" width="180">
            <el-table-column  label="最低生活保障家庭" width="180">

              <el-table-column  label="审核" width="180">
                <el-table-column  label="户数" prop="" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop=""  width="120">
                </el-table-column>
                <el-table-column  label="完成率" prop="" width="120">
                </el-table-column>
              </el-table-column>

              <el-table-column  label="公示" width="180">
                <el-table-column  label="户数" prop="" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop=""  width="120">
                </el-table-column>
                <el-table-column  label="完成率" prop="" width="120">
                </el-table-column>
              </el-table-column>

              <el-table-column  label="审批" width="180">
                <el-table-column  label="户数" prop="" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop=""  width="120">
                </el-table-column>
                <el-table-column  label="完成率" prop="" width="120">
                </el-table-column>
              </el-table-column>

              <el-table-column  label="办结" width="180">
                <el-table-column  label="户数" prop="" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop=""  width="120">
                </el-table-column>
                <el-table-column  label="完成率" prop="" width="120">
                </el-table-column>
              </el-table-column>
            </el-table-column>

            <el-table-column  label="特困供养家庭" width="180">
              <el-table-column  label="审核" width="180">
                <el-table-column  label="户数" prop="" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop=""  width="120">
                </el-table-column>
                <el-table-column  label="完成率" prop="" width="120">
                </el-table-column>
              </el-table-column>

              <el-table-column  label="公示" width="180">
                <el-table-column  label="户数" prop="" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop=""  width="120">
                </el-table-column>
                <el-table-column  label="完成率" prop="" width="120">
                </el-table-column>
              </el-table-column>

              <el-table-column  label="审批" width="180">
                <el-table-column  label="户数" prop="" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop=""  width="120">
                </el-table-column>
                <el-table-column  label="完成率" prop="" width="120">
                </el-table-column>
              </el-table-column>

              <el-table-column  label="办结" width="180">
                <el-table-column  label="户数" prop="" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop=""  width="120">
                </el-table-column>
                <el-table-column  label="完成率" prop="" width="120">
                </el-table-column>
              </el-table-column>
            </el-table-column>

            <el-table-column  label="低收入家庭" width="180">
              <el-table-column  label="审核" width="180">
                <el-table-column  label="户数" prop="" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop=""  width="120">
                </el-table-column>
                <el-table-column  label="完成率" prop="" width="120">
                </el-table-column>
              </el-table-column>

              <el-table-column  label="公示" width="180">
                <el-table-column  label="户数" prop="" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop=""  width="120">
                </el-table-column>
                <el-table-column  label="完成率" prop="" width="120">
                </el-table-column>
              </el-table-column>

              <el-table-column  label="审批" width="180">
                <el-table-column  label="户数" prop="" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop=""  width="120">
                </el-table-column>
                <el-table-column  label="完成率" prop="" width="120">
                </el-table-column>
              </el-table-column>

              <el-table-column  label="办结" width="180">
                <el-table-column  label="户数" prop="" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop=""   width="120">
                </el-table-column>
                <el-table-column  label="完成率" prop="" width="120">
                </el-table-column>
              </el-table-column>
            </el-table-column>

            <el-table-column  label="低保边缘家庭" width="180">
              <el-table-column  label="审核" width="180">
                <el-table-column  label="户数" prop="" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop=""  width="120">
                </el-table-column>
                <el-table-column  label="完成率" prop="" width="120">
                </el-table-column>
              </el-table-column>

              <el-table-column  label="公示" width="180">
                <el-table-column  label="户数" prop="" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop=""  width="120">
                </el-table-column>
                <el-table-column  label="完成率" prop="" width="120">
                </el-table-column>
              </el-table-column>

              <el-table-column  label="审批" width="180">
                <el-table-column  label="户数" prop="" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop=""  width="120">
                </el-table-column>
                <el-table-column  label="完成率" prop="" width="120">
                </el-table-column>
              </el-table-column>

              <el-table-column  label="办结" width="180">
                <el-table-column  label="户数" prop="" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop=""  width="120">
                </el-table-column>
                <el-table-column  label="完成率" prop="" width="120">
                </el-table-column>
              </el-table-column>
            </el-table-column>

            <el-table-column  label="支出型贫困家庭" width="180">
              <el-table-column  label="审核" width="180">
                <el-table-column  label="户数" prop="" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop=""  width="120">
                </el-table-column>
                <el-table-column  label="完成率" prop="" width="120">
                </el-table-column>
              </el-table-column>

              <el-table-column  label="公示" width="180">
                <el-table-column  label="户数" prop="" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop=""  width="120">
                </el-table-column>
                <el-table-column  label="完成率" prop="" width="120">
                </el-table-column>
              </el-table-column>

              <el-table-column  label="审批" width="180">
                <el-table-column  label="户数" prop="" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop=""  width="120">
                </el-table-column>
                <el-table-column  label="完成率" prop="" width="120">
                </el-table-column>
              </el-table-column>

              <el-table-column  label="办结" width="180">
                <el-table-column  label="户数" prop="" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop=""  width="120">
                </el-table-column>
                <el-table-column  label="认定率"  width="120">
                </el-table-column>
              </el-table-column>
            </el-table-column>

            <!-- 合计纳入 -->
            <el-table-column  label="合计纳入">
                <el-table-column  label="户数" prop="" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop=""  width="120">
                </el-table-column>
                <el-table-column  label="纳入率"  width="120">
                </el-table-column>
            </el-table-column>

            <!--低收入人口认定不通过   -->
            <el-table-column  label="低收入人口认定不通过">
                <el-table-column  label="户数" prop="" width="120">
                </el-table-column>
                <el-table-column  label="人数" prop=""  width="120">
                </el-table-column>
                <el-table-column  label="退回率"  width="120">
                </el-table-column>
            </el-table-column>       
          </el-table-column>
          
          <!-- <el-table-column label="任务进度">
            <el-table-column prop="pd_proportion"  label="派单占比">
            </el-table-column>
            <el-table-column  prop="hc_proportion" width="140" label="核查完成总占比" >
            </el-table-column>
            <el-table-column  prop="pdhc_proportion"  width="150" label="核查完成占比派单">
            </el-table-column>
          </el-table-column> -->
        </el-table-column> 
      </el-table>
    </div>
  </div>
</template>

<script>
  import request from '@/utils/request'
  import FileSaver from "file-saver";
  import XLSX from "xlsx-style";
  import XLSX2 from "xlsx";
  export default {
    data() {
      return {
        // getSpanArr方法中需要用到的两个属性
        spanArr:[],
        pos:0,
        // 预警显示隐藏---筛选功能
        show:[{
          qz_show:true,
          jd_show:true,
          yb_show:true,
          zd_show:true,
          stw_show:true,
          sj_show:true,
          sd_show:true,
          zf_show:true,
          wj_show:true,
          xf_show:true,
        }],
        

        tableData:[ ],
        // 数据过滤
        filterData:[qzsqSQhs,qzsqSQrs,qzsqTHhs,qzsqSQrs,qzsqHDZhs,qzsqHDZrs,qzsqWTQRhs,qzsqWTQRrs,jdlkshengSQhs,jdlkshengSQrs,jdlkshengTHhs,
                  jdlkshengTHrs,jdlkshengHDZhs,jdlkshengHDZhs,jdlkshengWTQRhs,jdlkshengWTQRrs,jdlkshiSQhs,jdlkshiSQrs,jdlkshiTHhs,jdlkshiTHrs,
                  jdlkshiHDZhs,jdlkshiHDZrs,jdlkshiWTQRhs,jdlkshiWTQRrs],
        
        
     
      
        mergeColumns:[{index:1,name:'ab_ex161'}],
      };
    },
    created(){
        this.loadData();
        // this.groupBy(this.tableData,"ab_ex161");
        
    },
    methods: {

     loadData(){
       // 数据加载
        this.getSchedule({
          // sId: this.$route.query.sId,
        }).then(res => {

          console.log(res,"then");
          // if(res[0].data.length>0){
          //   // this.pay = res[0].data3
          //   console.log(this.pay,"---------pay111")
          // }
        }).catch(res => {
          // this.tableData= res.response.data
          console.log(res.response.data,"catch");
          var arrData=[];

          // var sdf=[
          //   {ab_ex2:"xxx街",
          //     ab_ex161:"ccz"},
          //   {ab_ex2:"zzz街",
          //     ab_ex161:"ccs"},
          //   {ab_ex2:"vvv街",
          //     ab_ex161:"ccs"}
          // ]

          // for(let i in sdf ){
          //   arrData.ab_ex2= sdf[i].ab_ex2
          //   arrData.ab_ex161= sdf[i].ab_ex161
          //   this.tableData.push(arrData)
          //   arrData={}
          // }

          for(var i = 0 ;i < res.response.data.length ;i++){
           
            arrData.ab_ex2= res.response.data[i].ab_ex2
            arrData.ab_ex161= res.response.data[i].ab_ex161
            if(res.response.data[i].qzsqSQhs==undefined){
              res.response.data[i].qzsqSQhs=0
            }
            if(res.response.data[i].qzsqWTQRhs==undefined){
              res.response.data[i].qzsqWTQRhs=0
            }

            if(res.response.data[i].qzsqTHhs==undefined){
              res.response.data[i].qzsqTHhs=0
            }
            if(res.response.data[i].qzsqHDZhs==undefined){
              res.response.data[i].qzsqHDZhs=0
            }
            if(res.response.data[i].qzsqSQhs || res.response.data[i].qzsqWTQRhs || res.response.data[i].qzsqTHhs || res.response.data[i].qzsqHDZhs){

              arrData.qzsqHs=Number(res.response.data[i].qzsqSQhs) + Number(res.response.data[i].qzsqWTQRhs) + Number(res.response.data[i].qzsqTHhs) + Number(res.response.data[i].qzsqHDZhs) 
              // arrData.qzsqHs=Number(res.response.data[i].qzsqSQhs) + Number() + Number() + Number() 
              // arrData.qzsqHs=Number(res.response.data[i].qzsqSQhs) + Number() + Number() + Number() 
            }else{
              arrData.qzsqHs=0
            }
            // console.log(res.response.data[0].qzsqSQhs);
            // console.log(res.response.data[0].qzsqWTQRhs);
            // console.log(res.response.data[0].qzsqTHhs);
            // console.log(res.response.data[0].qzsqHDZhs);
            
            this.tableData.push(arrData)
            arrData={}
          }
          // console.log(this.tableData);
          this.getSpanArr(this.tableData,"ab_ex161")
        })

        
     },



      filterChange(filterObj){
        console.log(filterObj);
        console.log(filterObj.date);
        console.log(filterObj.date.length);
        if(filterObj.date.length>0&&filterObj.date.length<10){
          for(let key in this.show[0]){
            this.show[0][key]=false
            
          }
          console.log(this.show,"全部关闭");
          for(let i in filterObj.date){
            if(filterObj.date[i]=="群众申办"){
              this.show[0].qz_show=true
            }else if(filterObj.date[i]=="建档立卡预警"){
              this.show[0].jd_show=true
            }else if(filterObj.date[i]=="医保预警"){
              this.show[0].yb_show=true
            }else if(filterObj.date[i]=="主动排查"){
              this.show[0].zd_show=true
            }else if(filterObj.date[i]=="市团委预警"){
              this.show[0].stw_show=true
            }else if(filterObj.date[i]=="12345涉救预警"){
              this.show[0].sj_show=true
            }else if(filterObj.date[i]=="水电预警"){
              this.show[0].sd_show=true
            }else if(filterObj.date[i]=="住房预警"){
              this.show[0].zf_show=true
            }else if(filterObj.date[i]=="物价预警"){
              this.show[0].wj_show=true
            }else if(filterObj.date[i]=="消防预警"){
              this.show[0].xf_show=true
            }
          }
          console.log(this.show,"显示选中");
        }else if(filterObj.date.length==0 || filterObj.date.length==10){
          for(let key in this.show[0]){
            this.show[0][key]=true
          }
          console.log(this.show,"全部显示");
        }
      },

      // 预警显示筛选
      // filter_num(value, row) {
      //   console.log("123");
      //   console.log("value"+value);
      //   console.log("row"+row);
      //   // return row.tag === value;
      // },


      //分组排序 
      groupBy(data,params){
        const groups={}
        data.forEach(v => {
      // 根据模拟数据 是通过a字段 来分组，获取data中的传入的params属性对应的属性值 ，放入数组中：["2222"]，再将属性值转换为json字符串：'["2222"]'
        const group = JSON.stringify(v[params])
      // 把group作为groups的key，初始化value，循环时找到相同的v[params]时不变
        groups[group] = groups[group] || []
      // 将对应找到的值作为value放入数组中
        groups[group].push(v)
      })
      // 返回处理好的二维数组 （如果想返回groupBy形式的数据只返回groups即可）
      console.log(Object.values(groups));
      console.log(groups);
      return Object.values(groups)
    },

    // 写一个getSpanArr(data,params)方法 ：构造一个SpanArr数组赋予rowspan，即控制行合并
    getSpanArr(data,params){
      let arr = [] ; //--接收重构数组
      let pos = 0  ;  //--设置索引
      this.spanArr = [] ; //--控制合并的数组
      this.groupBy(this.tableData, 'ab_ex161').map(v => (arr = arr.concat(v))); //将groupby()处理好的数据再次用arr进行处理：连接所有数组成员为一个新数组
      console.log("arr",arr);

       arr.map(res => {
     // 每次遍历都删除data && this.tableData 的第一个元素
        data.shift()
     // 每次遍历都将arr数组元素对应push进 data && this.tableData
        data.push(res)
      })
      //  定义一个redata存放arr要合并字段的value
      const redata = arr.map(v => v[params])

      redata.reduce((old, cur, i) => {
      // old 上一个元素  cur 当前元素  i 索引
        if (i === 0) {
        // 第一次判断先增加一个 1 占位 ，索引为0 
          this.spanArr.push(1)
          pos = 0
        } else {
          if (cur === old) {
            this.spanArr[pos] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            pos = i
          }
        }
        console.log(cur);
        return cur
      }, {})

    },

    cellMerge ({ row, column, rowIndex, columnIndex }) {
    // 第一列合并
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },

    
      





        // console.log(this.tableData);
        // for(let i in this.tableData ){
        //   var pd_end=Number(this.tableData[i].pd_end);
        //   var qzsq=Number(this.tableData[i].qzsq);
        //   var rh_end=Number(this.tableData[i].rh_end);
        //   var ts_province=Number(this.tableData[i].ts_province);
        //   var ts_city=Number(this.tableData[i].ts_city);
        //   var dsr_failed=Number(this.tableData[i].dsr_failed);

        //   if(isNaN(pd_end/(qzsq+ts_province+ts_city))||qzsq+ts_province+ts_city==0){
        //     this.tableData[i].pd_proportion="0.00%";
        //   }else{
        //     this.tableData[i].pd_proportion=((pd_end/(qzsq+ts_province+ts_city))*100).toFixed(2)+"%";
        //   }
          
        //   if(isNaN((rh_end+dsr_failed)/(qzsq+ts_province+ts_city))||qzsq+ts_province+ts_city==0){
        //     this.tableData[i].hc_proportion="0.00%";
        //   }else{
        //     this.tableData[i].hc_proportion=(((rh_end+dsr_failed)/(qzsq+ts_province+ts_city))*100).toFixed(2)+"%";
        //   }

        //   if(isNaN((rh_end+dsr_failed)/pd_end)){
        //     this.tableData[i].pdhc_proportion="0.00%";
        //   }else{
        //     this.tableData[i].pdhc_proportion=(((rh_end+dsr_failed)/pd_end)*100).toFixed(2)+"%";
        //   }
        // }
      //定义导出Excel表格事件
      exportExcel() {
        /* 从表生成工作簿对象 */
        let wb = XLSX2.utils.table_to_book(document.querySelector('#mytable'))
        // if(!wb['!merges']){
        //   this.$message.warning('无法导出：报表无数据');
        //   return
        // }
        /* 获取二进制字符串作为输出 */
        var wbout = XLSX2.write(wb, {
            bookType: 'xlsx',
            bookSST: true,
            type: 'array'
        })
        
        try {
          for(let key in wb ){
           wb[key].s ={
              alignment:{// 文字居中
                horizontal:'center',
                vertical:'center',
                wrap_text:true
              },
            }
          }
         
            FileSaver.saveAs(
            //Blob 对象表示一个不可变、原始数据的类文件对象。
            //Blob 表示的不一定是JavaScript原生格式的数据。
            //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
            //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
            new Blob([wbout], { type: 'application/octet-stream' }),
            //设置导出文件名称
            '泰州市民政局社会救助任务进度表.xlsx'
            )
        } catch (e) {
            if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      },

    

    //打印页面内容
	    printTable(){
	      let wpt = document.querySelector('#mytable');
	      let newContent = wpt.innerHTML;
	      let oldContent = document.body.innerHTML;
	      document.body.innerHTML = newContent;
	      window.print(); //打印方法
	      // window.localtion.reload();
	      history.go(0)
	      document.body.innerHTML = oldContent;
	    },
    
    
      getSchedule(data){
				return request({
						method: 'post',
						url: '/social/assistance/getSchedule',
						data: data,
					})
			},
      },

    
}   

</script>


<style>
.g-box {
  height: 80vh !important;
}
.g-box2 {
  width: 100%;
  height: 100%;
  overflow-y: auto !important;
}
.oneTh{
  border:1px solid #333;
}
.oneTh tbody > tr:nth-child(1) {
  background-color: rgb(223, 227, 240);
  font-size: 13px !important;
  font-weight: 600;
}
.el-header, .el-footer {
    /* background-color: #cfcfcf; */
    border-bottom: 1px solid #ddd;
    color: #333;
    text-align: center;
    line-height: 50px;
    font-size: 30px;
    /* font-weight: 500; */
  }
  /* @media print {
  div.content {
    page-break-after: always;
  }
} */
</style>
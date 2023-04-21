// 统计分析
<template>
  <div class="g-box">
    <div class="g-box2">
         <!-- :summary-method="getSummaries" show-summary-->
      <h2 style="text-align:center">泰州市民政局社会救助任务进度表</h2>
      <div style="width:100%;height:5px;background-color:#eee"></div>
      <div style="width:90% ;height:auto;margin:10px 0;"> 
        <div class="searchTj" style="display:flex;justify-content: space-between;">
          <div class="block">
            <span class="demonstration">选择时间：</span>
            <el-date-picker  v-model="value1" type="date" :clearable='false'></el-date-picker>
          </div>
          
           <div class="block">
            <span class="demonstration">数据来源：</span>
            <el-select  v-model="value2" >
              <el-option value="预警来源" label="预警来源"></el-option>
              <el-option value="其他来源" label="其他来源"></el-option>
            </el-select>
          </div>
          <div class="block">
            <span class="demonstration">预警数据：</span>
            <el-cascader
              :options="options"
              :props="{ multiple: true, checkStrictly: true }"
              clearable></el-cascader>
          </div>
          <div>
            <el-button type="primary"  @click="queryListByCriteria" 
            icon="el-icon-search" >
            查询</el-button>
            
            <el-button type="info" @click="resetQuery" icon="el-icon-refresh" >
            重置</el-button >
          </div>
        </div>
      </div>
     <div style="width:100%;height:5px;background-color:#eee"></div>
      
        <el-tabs v-model="activeName" class="table_nav" @tab-click="handleClick">
          <div style="display:flex;justify-content: space-between;">
            <!-- <div style="display: inline-block;width:300px;">
              <el-form >
                <el-form-item label="报表时间" prop="tableTime" style="margin-top:3px">
                  <el-date-picker type="date" :clearable="false" v-model="tableTime" value-format="yyyy-MM-dd"  class="table_time"   :picker-options="pickerOptions">
                  </el-date-picker>
                </el-form-item>
              </el-form>
            </div> -->
            
            <div style="display:flex;justify-content: space-between;width:80px;">
              <el-button  icon="el-icon-folder-opened" type="text" size="mini" @click="exportExcel" style="width:50px;" >导出</el-button>
              <!-- <el-button  icon="el-icon-printer" type="text" size="mini" @click="printTable" style="width:50px;"  >打印</el-button> -->
              <!-- <el-button  icon="el-icon-s-data"  size="mini" @click="printTable" style="width:100px;"  >其他数据来源</el-button> -->
            </div>
          </div>

          <el-tab-pane label="预警来源" name="first" >
            <el-table stripe class="oneTh1" :data="tableData" :span-method="cellMerge" border height="90%" id="mytable"  style="width: auto" @filter-change="filterChange">
              <el-table-column prop="ab_ex161" label="泰州市民政局社会救助任务进度表" style="display:none">
                <el-table-column prop="ab_ex161" label="区县" width="90">
                    <template slot-scope="scope" v-if="scope.row.ab_ex161!='总汇'">
                      <el-button @click="handleClick2(scope.row)" type="text" size="small">{{scope.row.ab_ex161}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="ab_ex2" label="街道" width="90">
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
                  ]">
                    <el-table-column  label="群众申办"  v-if="show[0].qz_show">
                      <el-table-column  label="户数" prop="qzsqHs" width="80">

                      </el-table-column>
                      <el-table-column  label="人数" prop="qzsqRs" width="80">
                      </el-table-column>
                    </el-table-column>

                    <el-table-column label="建档立卡预警" v-if="show[0].jd_show">
                      <el-table-column  label="省标">
                        <el-table-column  label="户数" prop="jdlkShengBiaoHs" width="80">
                        </el-table-column>
                        <el-table-column  label="人数" prop="jdlkShengBiaoRs" width="80">
                        </el-table-column>
                      </el-table-column>

                      <el-table-column prop="ts_city" label="市标">
                        <el-table-column  label="户数" prop="jdlkShiBiaoHs" width="80">
                        </el-table-column>
                        <el-table-column  label="人数" prop="jdlkShiBiaoRs" width="80">
                        </el-table-column>
                      </el-table-column>
                    </el-table-column>

                    <el-table-column  label="医保预警"  v-if="show[0].yb_show">
                      <el-table-column  label="户数"  prop="ybyjHs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="ybyjRs" width="80">
                      </el-table-column>
                    </el-table-column>

                    <el-table-column  label="主动排查"  v-if="show[0].zd_show">
                      <el-table-column  label="户数" prop="zdpcHs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="zdpcRs" width="80">
                      </el-table-column>
                    </el-table-column>

                    <!-- <el-table-column  label="团市委预警"  v-if="show[0].stw_show">
                      <el-table-column  label="户数" prop="tswHs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="tswRs"  width="80">
                      </el-table-column>
                    </el-table-column>

                    <el-table-column  label="12345涉救预警"  v-if="show[0].sj_show">
                      <el-table-column  label="户数" prop="sjyjHs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="sjyjRs"  width="80">
                      </el-table-column>
                    </el-table-column>

                    <el-table-column  label="水电预警" v-if="show[0].sd_show">
                      <el-table-column  label="户数" prop="sdyjHs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="sdyjRs"  width="80">
                      </el-table-column>
                    </el-table-column>

                    <el-table-column  label="住房预警" v-if="show[0].zf_show">
                      <el-table-column  label="户数" prop="zfyjHs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="zfyjRs"  width="80">
                      </el-table-column>
                    </el-table-column>

                    <el-table-column  label="物价预警" v-if="show[0].wj_show">
                      <el-table-column  label="户数" prop="wjyjHs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="wjyjRs"  width="80">
                      </el-table-column>
                    </el-table-column>

                    <el-table-column  label="消防预警" v-if="show[0].xf_show">
                      <el-table-column  label="户数" prop="xfyjHs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="xfyjRs"  width="80">
                      </el-table-column>
                    </el-table-column> -->

                  </el-table-column>
                </el-table-column>

                <!-- 前置核查 -->
                <el-table-column  label="前置核查">

                  <el-table-column  label="完成派单">
                      <el-table-column  label="户数" prop="wcpdHs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="wcpdRs"  width="80">
                      </el-table-column>
                      <!-- <el-table-column  label="完成率" prop="wcpdWcl" width="80">
                      </el-table-column> -->
                  </el-table-column>

                  <el-table-column  label="完成入户核查">
                      <el-table-column  label="户数" prop="rhhcHs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="rhhcRs"  width="80">
                      </el-table-column>
                      <!-- <el-table-column  label="完成率" prop="rhhcWcl" width="80">
                      </el-table-column> -->
                  </el-table-column>

                  <el-table-column  label="完成经济核对">
                      <el-table-column  label="户数" prop="jjhdHs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="jjhdRs"  width="80">
                      </el-table-column>
                      <!-- <el-table-column  label="完成率" prop="jjhdWcl" width="80">
                      </el-table-column> -->
                  </el-table-column>
                </el-table-column>

                <!-- 低收入认定 -->
                <el-table-column  label="低收入认定">
                   <el-table-column  label="最低生活保障家庭-按户保" >

                    <el-table-column  label="审核">
                      <el-table-column  label="户数" prop="dbCShsahb" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dbCSrsahb"  width="80">
                      </el-table-column>
                      <!-- <el-table-column  label="完成率" prop="dbCSwclahb" width="80">
                      </el-table-column> -->
                    </el-table-column>

                    <el-table-column  label="公示">
                      <el-table-column  label="户数" prop="dbGShsahb" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dbGSrsahb"  width="80">
                      </el-table-column>
                      <!-- <el-table-column  label="完成率" prop="dbGSwclahb" width="80">
                      </el-table-column> -->
                    </el-table-column>

                    <el-table-column  label="审批">
                      <el-table-column  label="户数" prop="dbSPhsahb" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dbSPrsahb"  width="80">
                      </el-table-column>
                      <!-- <el-table-column  label="完成率" prop="dbSPwclahb" width="80">
                      </el-table-column> -->
                    </el-table-column>

                    <el-table-column  label="办结">
                      <el-table-column  label="户数" prop="dbBJhsahb" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dbBJrsahb"  width="80">
                      </el-table-column>
                      <!-- <el-table-column  label="完成率" prop="dbBJwclahb" width="80">
                      </el-table-column> -->
                    </el-table-column>
                  </el-table-column>
                  <el-table-column  label="最低生活保障家庭-按人保">

                    <el-table-column  label="审核">
                      <el-table-column  label="户数" prop="dbCShsarb" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dbCSrsarb"  width="80">
                      </el-table-column>
                      <!-- <el-table-column  label="完成率" prop="dbCSwclarb" width="80">
                      </el-table-column> -->
                    </el-table-column>

                    <el-table-column  label="公示">
                      <el-table-column  label="户数" prop="dbGShsarb" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dbGSrsarb"  width="80">
                      </el-table-column>
                      <!-- <el-table-column  label="完成率" prop="dbGSwclarb" width="80">
                      </el-table-column> -->
                    </el-table-column>

                    <el-table-column  label="审批">
                      <el-table-column  label="户数" prop="dbSPhsarb" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dbSPrsarb"  width="80">
                      </el-table-column>
                      <!-- <el-table-column  label="完成率" prop="dbSPwclarb" width="80">
                      </el-table-column> -->
                    </el-table-column>

                    <el-table-column  label="办结">
                      <el-table-column  label="户数" prop="dbBJhsarb" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dbBJrsarb"  width="80">
                      </el-table-column>
                      <!-- <el-table-column  label="完成率" prop="dbBJwclarb" width="80">
                      </el-table-column> -->
                    </el-table-column>

                    <el-table-column  label="办结(提取)">
                      <el-table-column  label="户数" prop="dbBJhsDSRJTarb" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dbBJrsDSRJTarb"  width="80">
                      </el-table-column>
                      <!-- <el-table-column  label="完成率" prop="dbBJwclarb" width="80">
                      </el-table-column> -->
                    </el-table-column>

                  </el-table-column>

                  <el-table-column  label="特困供养家庭">
                    <el-table-column  label="审核">
                      <el-table-column  label="户数" prop="tkCShs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="tkCSrs"  width="80">
                      </el-table-column>
                      <!-- <el-table-column  label="完成率" prop="tkCSwcl" width="80">
                      </el-table-column> -->
                    </el-table-column>

                    <el-table-column  label="公示">
                      <el-table-column  label="户数" prop="tkGShs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="tkGSrs"  width="80">
                      </el-table-column>
                      <!-- <el-table-column  label="完成率" prop="tkGSwcl" width="80">
                      </el-table-column> -->
                    </el-table-column>

                    <el-table-column  label="审批">
                      <el-table-column  label="户数" prop="tkSPhs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="tkSPrs"  width="80">
                      </el-table-column>
                      <!-- <el-table-column  label="完成率" prop="tkSPwcl" width="80">
                      </el-table-column> -->
                    </el-table-column>

                    <el-table-column  label="办结">
                      <el-table-column  label="户数" prop="tkBJhs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="tkBJrs"  width="80">
                      </el-table-column>
                      <!-- <el-table-column  label="完成率" prop="tkBJwcl" width="80">
                      </el-table-column> -->
                    </el-table-column>
                  </el-table-column>

                  <el-table-column  label="单人保家庭" >
                    <el-table-column  label="审核" >
                      <el-table-column  label="户数" prop="dsrCShs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dsrCSrs"  width="80">
                      </el-table-column>
                      <!-- <el-table-column  label="完成率" prop="dsrCSwcl" width="80">
                      </el-table-column> -->
                    </el-table-column>

                    <el-table-column  label="公示">
                      <el-table-column  label="户数" prop="dsrGShs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dsrGSrs"  width="80">
                      </el-table-column>
                      <!-- <el-table-column  label="完成率" prop="dsrGSwcl" width="80">
                      </el-table-column> -->
                    </el-table-column>

                    <el-table-column  label="审批">
                      <el-table-column  label="户数" prop="dsrSPhs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dsrSPrs"  width="80">
                      </el-table-column>
                      <!-- <el-table-column  label="完成率" prop="dsrSPwcl" width="80">
                      </el-table-column> -->
                    </el-table-column>

                    <el-table-column  label="办结">
                      <el-table-column  label="户数" prop="dsrBJhs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dsrBJrs"   width="80">
                      </el-table-column>
                      <!-- <el-table-column  label="完成率" prop="dsrBJwcl" width="80">
                      </el-table-column> -->
                    </el-table-column>
                  </el-table-column>

                  <el-table-column  label="低保边缘家庭">
                    <!-- <el-table-column  label="审核">
                      <el-table-column  label="户数" prop="dbbySHhs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dbbySHrs"  width="80">
                      </el-table-column>
                      <el-table-column  label="完成率" prop="dbbySHwcl" width="80">
                      </el-table-column>
                    </el-table-column>

                    <el-table-column  label="公示">
                      <el-table-column  label="户数" prop="dbbyGShs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dbbyGShs"  width="80">
                      </el-table-column>
                      <el-table-column  label="完成率" prop="dbbyGShs" width="80">
                      </el-table-column>
                    </el-table-column>

                    <el-table-column  label="审批">
                      <el-table-column  label="户数" prop="" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop=""  width="80">
                      </el-table-column>
                      <el-table-column  label="完成率" prop="" width="80">
                      </el-table-column>
                    </el-table-column> -->

                    <el-table-column  label="办结(提取)">
                      <el-table-column  label="户数" prop="dbbyBJhs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dbbyBJrs"  width="80">
                      </el-table-column>
                      <!-- <el-table-column  label="完成率" prop="dbbyBJwcl" width="80">
                      </el-table-column> -->
                    </el-table-column>
                  </el-table-column>

                  <el-table-column  label="支出型困难家庭">
                    <el-table-column  label="审核">
                      <el-table-column  label="户数" prop="zcpkCShs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="zcpkCSrs"  width="80">
                      </el-table-column>
                      <!-- <el-table-column  label="完成率" prop="zcpkCSwcl" width="80">
                      </el-table-column> -->
                    </el-table-column>

                    <el-table-column  label="公示">
                      <el-table-column  label="户数" prop="zcpkGShs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="zcpkGSrs"  width="80">
                      </el-table-column>
                      <!-- <el-table-column  label="完成率" prop="zcpkGSwcl" width="80">
                      </el-table-column> -->
                    </el-table-column>

                    <el-table-column  label="审批">
                      <el-table-column  label="户数" prop="zcpkSPhs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="zcpkSPrs"  width="80">
                      </el-table-column>
                      <!-- <el-table-column  label="完成率" prop="zcpkSPwcl" width="80">
                      </el-table-column> -->
                    </el-table-column>

                    <el-table-column  label="办结">
                      <el-table-column  label="户数" prop="zcpkBJhs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="zcpkBJrs"  width="80">
                      </el-table-column>
                      <!-- <el-table-column  label="认定率" prop="zcpkBJwcl" width="80">
                      </el-table-column> -->
                    </el-table-column>
                  </el-table-column>

                  <!-- 合计纳入 -->
                  <el-table-column  label="合计纳入">
                      <el-table-column  label="户数" prop="hjnrHs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="hjnrRs"  width="80">
                      </el-table-column>
                      <!-- <el-table-column  label="纳入率" prop="hjnrNrl" width="80">
                      </el-table-column> -->
                  </el-table-column>

                  <!--低收入人口认定不通过   -->
                  <el-table-column  label="低收入人口认定不通过">
                      <el-table-column  label="户数" prop="btgHs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="btgRs"  width="80">
                      </el-table-column>
                      <!-- <el-table-column  label="退回率" prop="btgThl" width="80">
                      </el-table-column> -->
                  </el-table-column>       
                </el-table-column>
                
              </el-table-column> 
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="其他数据来源" name="second" style="height:66.8vh"> 
            <el-table class="oneTh1" :data="tableData" :span-method="cellMerge" border height="100%" id="mytable"  style="width: auto" @filter-change="filterChange">
              <el-table-column prop="ab_ex161" label="泰州市民政局社会救助任务进度表" style="display:none" width="100">
                <el-table-column prop="ab_ex161" label="区县" width="80">
                </el-table-column>
                <el-table-column prop="ab_ex2" label="街道" width="80">
                </el-table-column>
                
                <!-- 低收入认定 -->
                <el-table-column  label="低收入认定">
                  <el-table-column  label="最低生活保障家庭-按户保">

                    <el-table-column  label="审核">
                      <el-table-column  label="户数" prop="dbCShsahb" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dbCSrsahb"  width="80">
                      </el-table-column>
                      <el-table-column  label="完成率" prop="dbCSwclahb" width="80">
                      </el-table-column>
                    </el-table-column>

                    <el-table-column  label="公示">
                      <el-table-column  label="户数" prop="dbGShsahb" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dbGSrsahb"  width="80">
                      </el-table-column>
                      <el-table-column  label="完成率" prop="dbGSwclahb" width="80">
                      </el-table-column>
                    </el-table-column>

                    <el-table-column  label="审批">
                      <el-table-column  label="户数" prop="dbSPhsahb" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dbSPrsahb"  width="80">
                      </el-table-column>
                      <el-table-column  label="完成率" prop="dbSPwclahb" width="80">
                      </el-table-column>
                    </el-table-column>

                    <el-table-column  label="办结">
                      <el-table-column  label="户数" prop="dbBJhsahb" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dbBJrsahb"  width="80">
                      </el-table-column>
                      <el-table-column  label="完成率" prop="dbBJwclahb" width="80">
                      </el-table-column>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column  label="最低生活保障家庭-按人保">

                    <el-table-column  label="审核">
                      <el-table-column  label="户数" prop="dbCShsarb" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dbCSrsarb"  width="80">
                      </el-table-column>
                      <el-table-column  label="完成率" prop="dbCSwclarb" width="80">
                      </el-table-column>
                    </el-table-column>

                    <el-table-column  label="公示">
                      <el-table-column  label="户数" prop="dbGShsarb" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dbGSrsarb"  width="80">
                      </el-table-column>
                      <el-table-column  label="完成率" prop="dbGSwclarb" width="80">
                      </el-table-column>
                    </el-table-column>

                    <el-table-column  label="审批">
                      <el-table-column  label="户数" prop="dbSPhsarb" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dbSPrsarb"  width="80">
                      </el-table-column>
                      <el-table-column  label="完成率" prop="dbSPwclarb" width="80">
                      </el-table-column>
                    </el-table-column>

                    <el-table-column  label="办结">
                      <el-table-column  label="户数" prop="dbBJhsarb" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dbBJrsarb"  width="80">
                      </el-table-column>
                      <el-table-column  label="完成率" prop="dbBJwclarb" width="80">
                      </el-table-column>
                    </el-table-column>

                    <el-table-column  label="办结(提取)">
                      <el-table-column  label="户数" prop="dbBJhsarb" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dbBJrsarb"  width="80">
                      </el-table-column>
                      <el-table-column  label="完成率" prop="dbBJwclarb" width="80">
                      </el-table-column>
                    </el-table-column>

                  </el-table-column>

                  <el-table-column  label="特困供养家庭">
                    <el-table-column  label="审核">
                      <el-table-column  label="户数" prop="tkCShs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="tkCSrs"  width="80">
                      </el-table-column>
                      <el-table-column  label="完成率" prop="tkCSwcl" width="80">
                      </el-table-column>
                    </el-table-column>

                    <el-table-column  label="公示">
                      <el-table-column  label="户数" prop="tkGShs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="tkGSrs"  width="80">
                      </el-table-column>
                      <el-table-column  label="完成率" prop="tkGSwcl" width="80">
                      </el-table-column>
                    </el-table-column>

                    <el-table-column  label="审批">
                      <el-table-column  label="户数" prop="tkSPhs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="tkSPrs"  width="80">
                      </el-table-column>
                      <el-table-column  label="完成率" prop="tkSPwcl" width="80">
                      </el-table-column>
                    </el-table-column>

                    <el-table-column  label="办结">
                      <el-table-column  label="户数" prop="tkBJhs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="tkBJrs"  width="80">
                      </el-table-column>
                      <el-table-column  label="完成率" prop="tkBJwcl" width="80">
                      </el-table-column>
                    </el-table-column>
                    
                  </el-table-column>

                  <el-table-column  label="单人保家庭">
                    <el-table-column  label="审核">
                      <el-table-column  label="户数" prop="dsrCShs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dsrCSrs"  width="80">
                      </el-table-column>
                      <el-table-column  label="完成率" prop="dsrCSwcl" width="80">
                      </el-table-column>
                    </el-table-column>

                    <el-table-column  label="公示">
                      <el-table-column  label="户数" prop="dsrGShs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dsrGSrs"  width="80">
                      </el-table-column>
                      <el-table-column  label="完成率" prop="dsrGSwcl" width="80">
                      </el-table-column>
                    </el-table-column>

                    <el-table-column  label="审批">
                      <el-table-column  label="户数" prop="dsrSPhs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dsrSPrs"  width="80">
                      </el-table-column>
                      <el-table-column  label="完成率" prop="dsrSPwcl" width="80">
                      </el-table-column>
                    </el-table-column>

                    <el-table-column  label="办结">
                      <el-table-column  label="户数" prop="dsrBJhs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dsrBJrs"   width="80">
                      </el-table-column>
                      <el-table-column  label="完成率" prop="dsrBJwcl" width="80">
                      </el-table-column>
                    </el-table-column>
                  </el-table-column>

                  <el-table-column  label="低保边缘家庭">
                  

                    <el-table-column  label="办结(提取)">
                      <el-table-column  label="户数" prop="dbbyBJhs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="dbbyBJrs"  width="80">
                      </el-table-column>
                      <el-table-column  label="完成率" prop="dbbyBJwcl" width="80">
                      </el-table-column>
                    </el-table-column>
                  </el-table-column>

                  <el-table-column  label="支出型困难家庭">
                    <el-table-column  label="审核">
                      <el-table-column  label="户数" prop="zcpkCShs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="zcpkCSrs"  width="80">
                      </el-table-column>
                      <el-table-column  label="完成率" prop="zcpkCSwcl" width="80">
                      </el-table-column>
                    </el-table-column>

                    <el-table-column  label="公示">
                      <el-table-column  label="户数" prop="zcpkGShs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="zcpkGSrs"  width="80">
                      </el-table-column>
                      <el-table-column  label="完成率" prop="zcpkGSwcl" width="80">
                      </el-table-column>
                    </el-table-column>

                    <el-table-column  label="审批">
                      <el-table-column  label="户数" prop="zcpkSPhs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="zcpkSPrs"  width="80">
                      </el-table-column>
                      <el-table-column  label="完成率" prop="zcpkSPwcl" width="80">
                      </el-table-column>
                    </el-table-column>

                    <el-table-column  label="办结">
                      <el-table-column  label="户数" prop="zcpkBJhs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="zcpkBJrs"  width="80">
                      </el-table-column>
                      <el-table-column  label="认定率" prop="zcpkBJwcl" width="80">
                      </el-table-column>
                    </el-table-column>
                  </el-table-column>

                  <!-- 合计纳入 -->
                  <el-table-column  label="合计纳入">
                      <el-table-column  label="户数" prop="hjnrHs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="hjnrRs"  width="80">
                      </el-table-column>
                      <el-table-column  label="纳入率" prop="hjnrNrl" width="80">
                      </el-table-column>
                  </el-table-column>

                  <!--低收入人口认定不通过   -->
                  <el-table-column  label="低收入人口认定不通过">
                      <el-table-column  label="户数" prop="btgHs" width="80">
                      </el-table-column>
                      <el-table-column  label="人数" prop="btgRs"  width="80">
                      </el-table-column>
                      <el-table-column  label="退回率" prop="btgThl" width="80">
                      </el-table-column>
                  </el-table-column>       
                </el-table-column>
                
              </el-table-column> 
            </el-table>
          </el-tab-pane>
         
        </el-tabs>

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
        activeName: 'first',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
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
        tableTime:"",
        value1: new Date().Format('yyyy-MM-dd'), //时间 
        value2:'',
        options: [
          {
             label: '预警来源',
          value: '预警来源',
          },{
          
          label: '群众申办',
          value: '群众申办',
        },{
          label: '建档立卡预警',
          value: '建档立卡预警',
        },{
          label: '医保预警',
          value: '医保预警',
        },{
          label: '主动排查',
          value: '主动排查',
        },{ 
          label: '市团委预警',
          value: '市团委预警' 
        },{
          label: '12345涉救预警',
          value: '12345涉救预警',
        },{
          label: '水电预警',
          value: '水电预警',
        },{
          label: '住房预警',
          value: '住房预警',
        },{
          label: '物价预警',
          value: '物价预警' 
        },{
          label: '消防预警',
          value: '消防预警',
        }],
        
        // 总汇
        zonghui:{},
        // 合计
        sum:{},
        initialize:{
          // 预警
          "ab_ex161":"总汇",
          "ab_ex2":"[街道总汇]",
          "qzsqHs":0,
          "qzsqRs":0,
          "jdlkShengBiaoHs":0,
          "jdlkShengBiaoRs":0,
          "jdlkShiBiaoHs":0,
          "jdlkShiBiaoRs":0,
          "ybyjHs":0,
          "ybyjRs":0,
          "zdpcHs":0,
          "zdpcRs":0,
          "tswHs":0,
          "tswRs":0,
          "sjyjHs":0,
          "sjyjRs":0,
          "sdyjHs":0,
          "sdyjRs":0,
          "zfyjHs":0,
          "zfyjRs":0,
          "wjyjHs":0,
          "wjyjRs":0,
          "xfyjHs":0,
          "xfyjRs":0,
          // 前置核查
          "wcpdHs":0,
          "wcpdRs":0,
          "wcpdWcl":'',
          "rhhcHs":0,
          "rhhcRs":0,
          "rhhcWcl":'',
          "jjhdHs":0,
          "jjhdRs":0,
          "jjhdWcl":'',

          // 低收入认定
          "dbCShsahb":0,
          "dbCSrsahb":0,
          "dbCSwclahb":'',
          "dbGShsahb":0,
          "dbGSrsahb":0,
          "dbGSwcl":'',
          "dbSPhsahb":0,
          "dbSPrsahb":0,
          "dbSPwcl":'',
          "dbBJhsahb":0,
          "dbBJrsahb":0,
          "dbBJwclahb":'',

          "dbCShsarb":0,
          "dbCSrsarb":0,
          "dbCSwcl":'',
          "dbGShsarb":0,
          "dbGSrsarb":0,
          "dbGSwcl":'',
          "dbSPhsarb":0,
          "dbSPrsarb":0,
          "dbSPwclarb":'',
          "dbBJhsarb":0,
          "dbBJrsarb":0,
          "dbBJwcl":'',

          "tkCShs":0,
          "tkCSrs":0,
          "tkCSwcl":'',
          "tkGShs":0,
          "tkGSrs":0,
          "tkGSwcl":'',
          "tkSPhs":0,
          "tkSPrs":0,
          "tkSPwcl":'',
          "tkBJhs":0,
          "tkBJrs":0,
          "tkBJwcl":'',

          "dsrCShs":0,
          "dsrCSrs":0,
          "dsrCSwcl":'',
          "dsrGShs":0,
          "dsrGSrs":0,
          "dsrGSwcl":'',
          "dsrSPhs":0,
          "dsrSPrs":0,
          "dsrSPwcl":'',
          "dsrBJhs":0,
          "dsrBJrs":0,
          "dsrBJwcl":'',
          
          "zcpkCShs":0,
          "zcpkCSrs":0,
          "zcpkCSwcl":'',
          "zcpkGShs":0,
          "zcpkGSrs":0,
          "zcpkGSwcl":'',
          "zcpkSPhs":0,
          "zcpkSPrs":0,
          "zcpkSPwcl":'',
          "zcpkBJhs":0,
          "zcpkBJrs":0,
          "zcpkBJwcl":'',

         
          "dbbyBJhs":0,
          "dbbyBJrs":0,
          "dbbyBJwcl":'',
          

          // 合计纳入
          "hjnrHs":0,
          "hjnrRs":0,
          "hjnrNrl":"",
          // 低收入人口认定不通过
          "btgHs":0,
          "btgRs":0,
          "btgThl":"",

        },
        ZSQhs:0,   //总申请-户数
        ZSQrs:0,   //总申请-人数

        ZTHhs:0,   //总退回-户数
        ZTHrs:0,   //总退回-人数

        ZHDZhs:0,  //总核对中-户数
        ZHDZrs:0,  //总核对中-人数

        ZWTQRhs:0, //总委托确认-户数
        ZWTQRrs:0, //总委托确认-人数

        ZSJhs:0,    //总数据-户数
        ZSJrs:0,    //总数据-人数

        OtherSources:false, //其他数据来源
        mergeColumns:[{index:1,name:'ab_ex161'}],
      };
    },
    created(){
        this.loadData();
        // this.groupBy(this.tableData,"ab_ex161");
        
    },
    methods: {
      
      handleClick2(row, event){
        console.log(row);
      },


      // 导航标签
      handleClick(tab, event) {
        // console.log(tab, event);
        // console.log(tab.index);//  0或1
        if(tab.index=="1"){  //点击了其他数据来源
          this.OtherSources=true
        }else{
          this.OtherSources=false
        }
        console.log('this.OtherSources:',this.OtherSources);
        this.loadData(this.OtherSources)

      },

       // 查询
      queryListByCriteria(){
        this.loading = true;//加载中蒙版

        // this.isShow = this.value1=='集中' ? true : false;// true展示集中，false展示分散
        this.value1 = this.value1>100000 ? this.value1.Format('yyyy-MM-dd') : this.value1
        this.loadData();
        console.log(Number(this.value1));
        // 设置定时器，30秒请求失败刷新页面
        let time = setTimeout(()=>{
          this.loading = false
          },1000)
      
        console.log(this.value1);
        // console.log(this.value2);
        // console.log(this.value3);
        
        // console.log(this.value1[0]);
        // console.log(this.value1[1]);

      },
      // 重置
      resetQuery() {
        
      },

      // 报表时间获取
      getTimeFn() {
				let dates = new Date()
				let y = dates.getFullYear()
				let m = dates.getMonth() + 1
				// let d = dates.getDate()+10
				let d = dates.getDate();
        // let hour = dates.getHours(); 
        // let minute = dates.getMinutes(); 
        // let second = dates.getSeconds();
				let time = y + '-' + m +'-'+ d ;
				console.log(time)
				return time
			},



    // unshift()
    // 向数组的开头添加一个或多个元素，并返回新的数组长度


      loadData(){
       // 数据加载
        this.getSchedule({
          // sId: this.$route.query.sId,
        }).then(res => {

          console.log(res,"then");
          
        }).catch(res => {

          this.tableTime = this.getTimeFn()



          this.tableData=[]
          // this.tableData= res.response.data
          // console.log(res.response.data,"catch");
          var arrData=[];
          var arrData2=[];

          var data=res && res.response && res.response.data
          var data2=[];
          data2=data;
          


          // console.log(arr3,"arr3");
          console.log(data2,"data2");

          console.log(arrData2);
         
          for(let i in data2){
           
             
            arrData.ab_ex161= data2[i].ab_ex161   //区县 
            arrData.ab_ex2= data2[i].ab_ex2      //街道

            // 群众申请
            // 户数计算
            if(data2[i].qzsqSQhs==undefined){
              data2[i].qzsqSQhs=0
            }
            if(data2[i].qzsqWTQRhs==undefined){
              data2[i].qzsqWTQRhs=0
            }
            if(data2[i].qzsqTHhs==undefined){
              data2[i].qzsqTHhs=0
            }
            if(data2[i].qzsqHDZhs==undefined){
              data2[i].qzsqHDZhs=0
            }
           
            if(data2[i].qzsqSQhs || data2[i].qzsqWTQRhs || data2[i].qzsqTHhs || data2[i].qzsqHDZhs){

              arrData.qzsqHs=Number(data2[i].qzsqSQhs) + Number(data2[i].qzsqWTQRhs) + Number(data2[i].qzsqTHhs) + Number(data2[i].qzsqHDZhs) 
              
            }else{
              arrData.qzsqHs=0
            }

            // 人数计算
            if(data2[i].qzsqSQrs==undefined){
              data2[i].qzsqSQrs=0
            }
            if(data2[i].qzsqWTQRrs==undefined){
              data2[i].qzsqWTQRrs=0
            }
            if(data2[i].qzsqTHrs==undefined){
              data2[i].qzsqTHrs=0
            }
            if(data2[i].qzsqHDZrs==undefined){
              data2[i].qzsqHDZrs=0
            }

            if(data2[i].qzsqSQrs || data2[i].qzsqWTQRrs || data2[i].qzsqTHrs || data2[i].qzsqHDZrs){

              arrData.qzsqRs=Number(data2[i].qzsqSQrs) + Number(data2[i].qzsqWTQRrs) + Number(data2[i].qzsqTHrs) + Number(data2[i].qzsqHDZrs) 
              
            }else{
              arrData.qzsqRs=0
            }

            // 建档立卡
            // 省标
            if(data2[i].z==undefined){
              data2[i].jdlkshengSQhs=0
            }
            if(data2[i].jdlkshengWTQRhs==undefined){
              data2[i].jdlkshengWTQRhs=0
            }
            if(data2[i].jdlkshengTHhs==undefined){
              data2[i].jdlkshengTHhs=0
            }
            if(data2[i].jdlkshengHDZhs==undefined){
              data2[i].jdlkshengHDZhs=0
            }
           
        
            if(data2[i].jdlkshengSQhs || data2[i].jdlkshengWTQRhs || data2[i].jdlkshengTHhs || data2[i].jdlkshengHDZhs){

              arrData.jdlkShengBiaoHs=Number(data2[i].jdlkshengSQhs) + Number(data2[i].jdlkshengWTQRhs) + Number(data2[i].jdlkshengTHhs) + Number(data2[i].jdlkshengHDZhs) 
              
            }else{
              arrData.jdlkShengBiaoHs=0
            }

            if(data2[i].jdlkshengSQrs==undefined){
              data2[i].jdlkshengSQrs=0
            }
            if(data2[i].jdlkshengWTQRrs==undefined){
              data2[i].jdlkshengWTQRrs=0
            }
            if(data2[i].jdlkshengTHrs==undefined){
              data2[i].jdlkshengTHrs=0
            }
            if(data2[i].jdlkshengHDZrs==undefined){
              data2[i].jdlkshengHDZrs=0
            }

            if(data2[i].jdlkshengSQrs || data2[i].jdlkshengWTQRrs || data2[i].jdlkshengTHrs || data2[i].jdlkshengHDZrs){

              arrData.jdlkShengBiaoRs=Number(data2[i].jdlkshengSQrs) + Number(data2[i].jdlkshengWTQRrs) + Number(data2[i].jdlkshengTHrs) + Number(data2[i].jdlkshengHDZrs) 
              
            }else{
              arrData.jdlkShengBiaoRs=0
            }

            // 市标
            if(data2[i].jdlkshiSQhs==undefined){
              data2[i].jdlkshiSQhs=0
            }
            if(data2[i].jdlkshiWTQRhs==undefined){
              data2[i].jdlkshiWTQRhs=0
            }
            if(data2[i].jdlkshiTHhs==undefined){
              data2[i].jdlkshiTHhs=0
            }
            if(data2[i].jdlkshiHDZhs==undefined){
              data2[i].jdlkshiHDZhs=0
            }
           
        
            if(data2[i].jdlkshiSQhs || data2[i].jdlkshiWTQRhs || data2[i].jdlkshiTHhs || data2[i].jdlkshiHDZhs){

              arrData.jdlkShiBiaoHs=Number(data2[i].jdlkshiSQhs) + Number(data2[i].jdlkshiWTQRhs) + Number(data2[i].jdlkshiTHhs) + Number(data2[i].jdlkshiHDZhs) 
              
            }else{
              arrData.jdlkShiBiaoHs=0
            }

            if(data2[i].jdlkshiSQrs==undefined){
              data2[i].jdlkshiSQrs=0
            }
            if(data2[i].jdlkshiWTQRrs==undefined){
              data2[i].jdlkshiWTQRrs=0
            }
            if(data2[i].jdlkshiTHrs==undefined){
              data2[i].jdlkshiTHrs=0
            }
            if(data2[i].jdlkshiHDZrs==undefined){
              data2[i].jdlkshiHDZrs=0
            }

            if(data2[i].jdlkshiSQrs || data2[i].jdlkshiWTQRrs || data2[i].jdlkshiTHrs || data2[i].jdlkshiHDZrs){

              arrData.jdlkShiBiaoRs=Number(data2[i].jdlkshiSQrs) + Number(data2[i].jdlkshiWTQRrs) + Number(data2[i].jdlkshiTHrs) + Number(data2[i].jdlkshiHDZrs) 
              
            }else{
              arrData.jdlkShiBiaoRs=0
            }

            // 医保预警
            if(data2[i].yltsSQhs==undefined){
              data2[i].yltsSQhs=0
            }
            if(data2[i].yltsWTQRhsB==undefined){
              data2[i].yltsWTQRhsB=0
            }
            if(data2[i].yltsTHhs==undefined){
              data2[i].yltsTHhs=0
            }
            if(data2[i].yltsHDZhs==undefined){
              data2[i].yltsHDZhs=0
            }
           
        
            if(data2[i].yltsSQhs || data2[i].yltsWTQRhsB || data2[i].yltsTHhs || data2[i].yltsHDZhs){

              arrData.ybyjHs=Number(data2[i].yltsSQhs) + Number(data2[i].yltsWTQRhsB) + Number(data2[i].yltsTHhs) + Number(data2[i].yltsHDZhs) 
              
            }else{
              arrData.ybyjHs=0
            }

            if(data2[i].yltsSQrs==undefined){
              data2[i].yltsSQrs=0
            }
            if(data2[i].yltsWTQRrsB==undefined){
              data2[i].yltsWTQRrsB=0
            }
            if(data2[i].yltsTHrs==undefined){
              data2[i].yltsTHrs=0
            }
            if(data2[i].yltsHDZrs==undefined){
              data2[i].yltsHDZrs=0
            }

            if(data2[i].yltsSQrs || data2[i].yltsWTQRrsB || data2[i].yltsTHrs || data2[i].yltsHDZrs){

              arrData.ybyjRs=Number(data2[i].yltsSQrs) + Number(data2[i].yltsWTQRrsB) + Number(data2[i].yltsTHrs) + Number(data2[i].yltsHDZrs) 
              
            }else{
              arrData.ybyjRs=0
            }


            // 主动排查
           if(data2[i].zdpcSQhs==undefined){
              data2[i].zdpcSQhs=0
            }
            if(data2[i].zdpcWTQRhs==undefined){
              data2[i].zdpcWTQRhs=0
            }
            if(data2[i].zdpcTHhs==undefined){
              data2[i].zdpcTHhs=0
            }
            if(data2[i].zdpcHDZhs==undefined){
              data2[i].zdpcHDZhs=0
            }
           
        
            if(data2[i].zdpcSQhs || data2[i].zdpcWTQRhs || data2[i].zdpcTHhs || data2[i].zdpcHDZhs){

              arrData.zdpcHs=Number(data2[i].zdpcSQhs) + Number(data2[i].zdpcWTQRhs) + Number(data2[i].zdpcTHhs) + Number(data2[i].zdpcHDZhs) 
              
            }else{
              arrData.zdpcHs=0
            }

            if(data2[i].zdpcSQrs==undefined){
              data2[i].zdpcSQrs=0
            }
            if(data2[i].zdpcWTQRrs==undefined){
              data2[i].zdpcWTQRrs=0
            }
            if(data2[i].zdpcTHrs==undefined){
              data2[i].zdpcTHrs=0
            }
            if(data2[i].zdpcHDZrs==undefined){
              data2[i].zdpcHDZrs=0
            }

            if(data2[i].zdpcSQrs || data2[i].zdpcWTQRrs || data2[i].zdpcTHrs || data2[i].zdpcHDZrs){

              arrData.zdpcRs=Number(data2[i].zdpcSQrs) + Number(data2[i].zdpcWTQRrs) + Number(data2[i].zdpcTHrs) + Number(data2[i].zdpcHDZrs) 
              
            }else{
              arrData.zdpcRs=0
            }


            // 市团委预警
            if(data2[i].tswSQhs==undefined){
              data2[i].tswSQhs=0
            }
            if(data2[i].tswWTQRhs==undefined){
              data2[i].tswWTQRhs=0
            }
            if(data2[i].tswTHhs==undefined){
              data2[i].tswTHhs=0
            }
            if(data2[i].tswHDZhs==undefined){
              data2[i].tswHDZhs=0
            }
           
        
            if(data2[i].tswSQhs || data2[i].tswWTQRhs || data2[i].tswTHhs || data2[i].tswHDZhs){

              arrData.tswHs=Number(data2[i].tswSQhs) + Number(data2[i].tswWTQRhs) + Number(data2[i].tswTHhs) + Number(data2[i].tswHDZhs) 
              
            }else{
              arrData.tswHs=0
            }

            if(data2[i].tswSQrs==undefined){
              data2[i].tswSQrs=0
            }
            if(data2[i].tswWTQRrs==undefined){
              data2[i].tswWTQRrs=0
            }
            if(data2[i].tswTHrs==undefined){
              data2[i].tswTHrs=0
            }
            if(data2[i].tswHDZrs==undefined){
              data2[i].tswHDZrs=0
            }

            if(data2[i].tswSQrs || data2[i].tswWTQRrs || data2[i].tswTHrs || data2[i].tswHDZrs){

              arrData.tswRs=Number(data2[i].tswSQrs) + Number(data2[i].tswWTQRrs) + Number(data2[i].tswTHrs) + Number(data2[i].tswHDZrs) 
              
            }else{
              arrData.tswRs=0
            }

            // 涉救预警
             if(data2[i].sjyjSQhs==undefined){
              data2[i].sjyjSQhs=0
            }
            if(data2[i].sjyjWTQRhs==undefined){
              data2[i].sjyjWTQRhs=0
            }
            if(data2[i].sjyjTHhs==undefined){
              data2[i].sjyjTHhs=0
            }
            if(data2[i].sjyjHDZhs==undefined){
              data2[i].sjyjHDZhs=0
            }
           
        
            if(data2[i].sjyjSQhs || data2[i].sjyjWTQRhs || data2[i].sjyjTHhs || data2[i].sjyjHDZhs){

              arrData.sjyjHs=Number(data2[i].sjyjSQhs) + Number(data2[i].sjyjWTQRhs) + Number(data2[i].sjyjTHhs) + Number(data2[i].sjyjHDZhs) 
              
            }else{
              arrData.sjyjHs=0
            }

            if(data2[i].sjyjSQrs==undefined){
              data2[i].sjyjSQrs=0
            }
            if(data2[i].sjyjWTQRrs==undefined){
              data2[i].sjyjWTQRrs=0
            }
            if(data2[i].sjyjTHrs==undefined){
              data2[i].sjyjTHrs=0
            }
            if(data2[i].sjyjHDZrs==undefined){
              data2[i].sjyjHDZrs=0
            }

            if(data2[i].sjyjSQrs || data2[i].sjyjWTQRrs || data2[i].sjyjTHrs || data2[i].sjyjHDZrs){

              arrData.sjyjRs=Number(data2[i].sjyjSQrs) + Number(data2[i].sjyjWTQRrs) + Number(data2[i].sjyjTHrs) + Number(data2[i].sjyjHDZrs) 
              
            }else{
              arrData.sjyjRs=0
            }

            //  水电预警
          if(data2[i].sdyjSQhs==undefined){
              data2[i].sdyjSQhs=0
            }
            if(data2[i].sdyjWTQRhs==undefined){
              data2[i].sdyjWTQRhs=0
            }
            if(data2[i].sdyjTHhs==undefined){
              data2[i].sdyjTHhs=0
            }
            if(data2[i].sdyjHDZhs==undefined){
              data2[i].sdyjHDZhs=0
            }
           
        
            if(data2[i].sdyjSQhs || data2[i].sdyjWTQRhs || data2[i].sdyjTHhs || data2[i].sdyjHDZhs){

              arrData.sdyjHs=Number(data2[i].sdyjSQhs) + Number(data2[i].sdyjWTQRhs) + Number(data2[i].sdyjTHhs) + Number(data2[i].sdyjHDZhs) 
              
            }else{
              arrData.sdyjHs=0
            }

            if(data2[i].sdyjSQrs==undefined){
              data2[i].sdyjSQrs=0
            }
            if(data2[i].sdyjWTQRrs==undefined){
              data2[i].sdyjWTQRrs=0
            }
            if(data2[i].sdyjTHrs==undefined){
              data2[i].sdyjTHrs=0
            }
            if(data2[i].sdyjHDZrs==undefined){
              data2[i].sdyjHDZrs=0
            }

            if(data2[i].sdyjSQrs || data2[i].sdyjWTQRrs || data2[i].sdyjTHrs || data2[i].sdyjHDZrs){

              arrData.sdyjRs=Number(data2[i].sdyjSQrs) + Number(data2[i].sdyjWTQRrs) + Number(data2[i].sdyjTHrs) + Number(data2[i].sdyjHDZrs) 
              
            }else{
              arrData.sdyjRs=0
            }


            //  住房预警
            if(data2[i].zfyjSQhs==undefined){
              data2[i].zfyjSQhs=0
            }
            if(data2[i].zfyjWTQRhs==undefined){
              data2[i].zfyjWTQRhs=0
            }
            if(data2[i].zfyjTHhs==undefined){
              data2[i].zfyjTHhs=0
            }
            if(data2[i].zfyjHDZhs==undefined){
              data2[i].zfyjHDZhs=0
            }
           
        
            if(data2[i].zfyjSQhs || data2[i].zfyjWTQRhs || data2[i].zfyjTHhs || data2[i].zfyjHDZhs){

              arrData.zfyjHs=Number(data2[i].zfyjSQhs) + Number(data2[i].zfyjWTQRhs) + Number(data2[i].zfyjTHhs) + Number(data2[i].zfyjHDZhs) 
              
            }else{
              arrData.zfyjHs=0
            }

            if(data2[i].zfyjSQrs==undefined){
              data2[i].zfyjSQrs=0
            }
            if(data2[i].zfyjWTQRrs==undefined){
              data2[i].zfyjWTQRrs=0
            }
            if(data2[i].zfyjTHrs==undefined){
              data2[i].zfyjTHrs=0
            }
            if(data2[i].zfyjHDZrs==undefined){
              data2[i].zfyjHDZrs=0
            }

            if(data2[i].zfyjSQrs || data2[i].zfyjWTQRrs || data2[i].zfyjTHrs || data2[i].zfyjHDZrs){

              arrData.zfyjRs=Number(data2[i].zfyjSQrs) + Number(data2[i].zfyjWTQRrs) + Number(data2[i].zfyjTHrs) + Number(data2[i].zfyjHDZrs) 
              
            }else{
              arrData.zfyjRs=0
            }


            //  物价预警
          if(data2[i].wjyjSQhs==undefined){
              data2[i].wjyjSQhs=0
            }
            if(data2[i].wjyjWTQRhs==undefined){
              data2[i].wjyjWTQRhs=0
            }
            if(data2[i].wjyjTHhs==undefined){
              data2[i].wjyjTHhs=0
            }
            if(data2[i].wjyjHDZhs==undefined){
              data2[i].wjyjHDZhs=0
            }
           
        
            if(data2[i].wjyjSQhs || data2[i].wjyjWTQRhs || data2[i].wjyjTHhs || data2[i].wjyjHDZhs){

              arrData.wjyjHs=Number(data2[i].wjyjSQhs) + Number(data2[i].wjyjWTQRhs) + Number(data2[i].wjyjTHhs) + Number(data2[i].wjyjHDZhs) 
              
            }else{
              arrData.wjyjHs=0
            }

            if(data2[i].wjyjSQrs==undefined){
              data2[i].wjyjSQrs=0
            }
            if(data2[i].wjyjWTQRrs==undefined){
              data2[i].wjyjWTQRrs=0
            }
            if(data2[i].wjyjTHrs==undefined){
              data2[i].wjyjTHrs=0
            }
            if(data2[i].wjyjHDZrs==undefined){
              data2[i].wjyjHDZrs=0
            }

            if(data2[i].wjyjSQrs || data2[i].wjyjWTQRrs || data2[i].wjyjTHrs || data2[i].wjyjHDZrs){

              arrData.wjyjRs=Number(data2[i].wjyjSQrs) + Number(data2[i].wjyjWTQRrs) + Number(data2[i].wjyjTHrs) + Number(data2[i].wjyjHDZrs) 
              
            }else{
              arrData.wjyjRs=0
            }


            //  消防预警
            if(data2[i].xfyjSQhs==undefined){
              data2[i].xfyjSQhs=0
            }
            if(data2[i].xfyjWTQRhs==undefined){
              data2[i].xfyjWTQRhs=0
            }
            if(data2[i].xfyjTHhs==undefined){
              data2[i].xfyjTHhs=0
            }
            if(data2[i].xfyjHDZhs==undefined){
              data2[i].xfyjHDZhs=0
            }
           
        
            if(data2[i].xfyjSQhs || data2[i].xfyjWTQRhs || data2[i].xfyjTHhs || data2[i].xfyjHDZhs){

              arrData.xfyjHs=Number(data2[i].xfyjSQhs) + Number(data2[i].xfyjWTQRhs) + Number(data2[i].xfyjTHhs) + Number(data2[i].xfyjHDZhs) 
              
            }else{
              arrData.xfyjHs=0
            }

            if(data2[i].xfyjSQrs==undefined){
              data2[i].xfyjSQrs=0
            }
            if(data2[i].xfyjWTQRrs==undefined){
              data2[i].xfyjWTQRrs=0
            }
            if(data2[i].xfyjTHrs==undefined){
              data2[i].xfyjTHrs=0
            }
            if(data2[i].xfyjHDZrs==undefined){
              data2[i].xfyjHDZrs=0
            }

            if(data2[i].xfyjSQrs || data2[i].xfyjWTQRrs || data2[i].xfyjTHrs || data2[i].xfyjHDZrs){

              arrData.xfyjRs=Number(data2[i].xfyjSQrs) + Number(data2[i].xfyjWTQRrs) + Number(data2[i].xfyjTHrs) + Number(data2[i].xfyjHDZrs) 
              
            }else{
              arrData.xfyjRs=0
            }
            
            // 完成入户核查-----建档立卡的数据已完成线下核查的省市后端已经加一块了
            // 下面是过滤没值的，赋0
            if(data2[i].qzsqWTQRhsB==undefined){
              data2[i].qzsqWTQRhsB=0
            }
            if(data2[i].jdlkWTQRhsB==undefined){
              data2[i].jdlkWTQRhsB=0
            }
            if(data2[i].yltsWTQRhsB==undefined){
              data2[i].yltsWTQRhsB=0
            }
            if(data2[i].zdpcWTQRhsB==undefined){
              data2[i].zdpcWTQRhsB=0
            }

            if(data2[i].qzsqWTQRrsB==undefined){
              data2[i].qzsqWTQRrsB=0
            }
            if(data2[i].jdlkWTQRrsB==undefined){
              data2[i].jdlkWTQRrsB=0
            }
            if(data2[i].yltsWTQRrsB==undefined){
              data2[i].yltsWTQRrsB=0
            }
            if(data2[i].zdpcWTQRrsB==undefined){
              data2[i].zdpcWTQRrsB=0
            }


            // 完成经济核对-----建档立卡的数据已完成线下核查的省市后端已经加一块了
            if(data2[i].qzsqHDZhsE==undefined){
              data2[i].qzsqHDZhsE=0
            }
            if(data2[i].jdlkHDZhsE==undefined){
              data2[i].jdlkHDZhsE=0
            }
            if(data2[i].yltsHDZhsE==undefined){
              data2[i].yltsHDZhsE=0
            }
            if(data2[i].zdpcHDZhsE==undefined){
              data2[i].zdpcHDZhsE=0
            }
            // 人数
            if(data2[i].qzsqHDZrsE==undefined){
              data2[i].qzsqHDZrsE=0
            }
            if(data2[i].jdlkHDZrsE==undefined){
              data2[i].jdlkHDZrsE=0
            }
            if(data2[i].yltsHDZrsE==undefined){
              data2[i].yltsHDZrsE=0
            }
            if(data2[i].zdpcHDZrsE==undefined){
              data2[i].zdpcHDZrsE=0
            }

           
            // 入户核查
            // arrData.rhhcHs = Number(data2[i].qzsqWTQRhsB) + Number(data2[i].jdlkWTQRhsB) + Number(data2[i].yltsWTQRhsB) + Number(data2[i].zdpcWTQRhsB);
            // arrData.rhhcRs = Number(data2[i].qzsqWTQRrsB) + Number(data2[i].jdlkWTQRrsB) + Number(data2[i].yltsWTQRrsB) + Number(data2[i].zdpcWTQRrsB);
            // 涉救、住房、消防...没加

            // 完成经济核对
            // arrData.jjhdHs = Number(data2[i].qzsqHDZhsE) + Number(data2[i].jdlkHDZhsE) + Number(data2[i].yltsHDZhsE) + Number(data2[i].zdpcHDZhsE);
            // arrData.jjhdRs = Number(data2[i].qzsqHDZrsE) + Number(data2[i].jdlkHDZrsE) + Number(data2[i].yltsHDZrsE) + Number(data2[i].zdpcHDZrsE);
            // 涉救、住房、消防...没加

            // console.log(this.show,"show");

              // 预警信息--总申请 ZSQhs、ZSQrs
              
               // 总退回ZTHhs、ZTHrs
               
              // // 总核对中 ZHDZhs、ZHDZrs
              
              // // 总委托确认 ZWTQRhs、ZWTQRrs
              

            // 入户核查
            arrData.rhhcHs = 0;
            arrData.rhhcRs = 0;

            // 完成经济核对
            arrData.jjhdHs = 0;
            arrData.jjhdRs = 0;

            // 根据筛选内容进行总数计算
            for(let key in this.show[0]){

              if(this.show[0][key]==true && key=="qz_show" ){
                this.ZSQhs += Number(data2[i].qzsqSQhs)
                this.ZSQrs += Number(data2[i].qzsqSQrs)
                this.ZTHhs += Number(data2[i].qzsqTHhs)
                this.ZTHrs += Number(data2[i].qzsqTHrs)
                this.ZHDZhs += Number(data2[i].qzsqHDZhs)
                this.ZHDZrs += Number(data2[i].qzsqHDZrs)
                this.ZWTQRhs += Number(data2[i].qzsqWTQRhs)
                this.ZWTQRrs += Number(data2[i].qzsqWTQRrs)
                arrData.rhhcHs += Number(data2[i].qzsqWTQRhsB)
                arrData.rhhcRs += Number(data2[i].qzsqWTQRrsB)
                arrData.jjhdHs += Number(data2[i].qzsqHDZhsE)
                arrData.jjhdRs += Number(data2[i].qzsqHDZrsE)

              }else if(this.show[0][key]==true && key=="jd_show" ){
                this.ZSQhs += Number(data2[i].jdlkshengSQhs)+Number(data2[i].jdlkshiSQhs)
                this.ZSQrs += Number(data2[i].jdlkshengSQrs)+Number(data2[i].jdlkshiSQrs)
                this.ZTHhs += Number(data2[i].jdlkshengTHhs)+Number(data2[i].jdlkshiTHhs)
                this.ZTHrs += Number(data2[i].jdlkshengTHrs)+Number(data2[i].jdlkshiTHrs)
                this.ZHDZhs += Number(data2[i].jdlkshengHDZhs)+Number(data2[i].jdlkshiHDZhs)
                this.ZHDZrs += Number(data2[i].jdlkshengHDZrs)+Number(data2[i].jdlkshiHDZrs)
                this.ZWTQRhs += Number(data2[i].jdlkshengWTQRhs)+Number(data2[i].jdlkshiWTQRhs)
                this.ZWTQRrs += Number(data2[i].jdlkshengWTQRrs)+Number(data2[i].jdlkshiWTQRrs)
                arrData.rhhcHs += Number(data2[i].jdlkWTQRhsB)
                arrData.rhhcRs += Number(data2[i].jdlkWTQRrsB)
                arrData.jjhdHs += Number(data2[i].jdlkHDZhsE)
                arrData.jjhdRs += Number(data2[i].jdlkHDZrsE)

              }else if(this.show[0][key]==true && key=="yb_show" ){
                this.ZSQhs += Number(data2[i].yltsSQhs)
                this.ZSQrs += Number(data2[i].yltsSQrs)
                this.ZTHhs += Number(data2[i].yltsTHhs)
                this.ZTHrs += Number(data2[i].yltsTHrs)
                this.ZHDZhs += Number(data2[i].yltsHDZhs)
                this.ZHDZrs += Number(data2[i].yltsHDZrs)
                this.ZWTQRhs += Number(data2[i].yltsWTQRhsB)
                this.ZWTQRrs += Number(data2[i].yltsWTQRrsB)
                arrData.rhhcHs += Number(data2[i].yltsWTQRhsB)
                arrData.rhhcRs += Number(data2[i].yltsWTQRrsB)
                arrData.jjhdHs += Number(data2[i].yltsHDZhsE)
                arrData.jjhdRs += Number(data2[i].yltsHDZrsE)

              }else if(this.show[0][key]==true && key=="zd_show" ){
                this.ZSQhs += Number(data2[i].zdpcSQhs)
                this.ZSQrs += Number(data2[i].zdpcSQrs)
                this.ZTHhs += Number(data2[i].zdpcTHhs)
                this.ZTHrs += Number(data2[i].zdpcTHrs)
                this.ZHDZhs += Number(data2[i].zdpcHDZhs)
                this.ZHDZrs += Number(data2[i].zdpcHDZrs)
                this.ZWTQRhs += Number(data2[i].zdpcWTQRhs)
                this.ZWTQRrs += Number(data2[i].zdpcWTQRrs)
                arrData.rhhcHs += Number(data2[i].zdpcWTQRhsB)
                arrData.rhhcRs += Number(data2[i].zdpcWTQRrsB)
                arrData.jjhdHs += Number(data2[i].zdpcHDZhsE)
                arrData.jjhdRs += Number(data2[i].zdpcHDZrsE)

              }else if(this.show[0][key]==true && key=="stw_show" ){
                this.ZSQhs += Number(data2[i].tswSQhs)
                this.ZSQrs += Number(data2[i].tswSQrs)
                this.ZTHhs += Number(data2[i].tswTHhs)
                this.ZTHrs += Number(data2[i].tswTHrs)
                this.ZHDZhs += Number(data2[i].tswHDZhs)
                this.ZHDZrs += Number(data2[i].tswHDZrs)
                this.ZWTQRhs += Number(data2[i].tswWTQRhs)
                this.ZWTQRrs += Number(data2[i].tswWTQRrs)
                // arrData.rhhcHs += Number(data2[i].tswWTQRhsB)
                // arrData.rhhcRs += Number(data2[i].tswWTQRrsB)
                // arrData.jjhdHs += Number(data2[i].tswHDZhsE)
                // arrData.jjhdRs += Number(data2[i].tswHDZrsE)

              }else if(this.show[0][key]==true && key=="sj_show" ){
                this.ZSQhs += Number(data2[i].sjyjSQhs)
                this.ZSQrs += Number(data2[i].sjyjSQrs)
                this.ZTHhs += Number(data2[i].sjyjTHhs)
                this.ZTHrs += Number(data2[i].sjyjTHrs)
                this.ZHDZhs += Number(data2[i].sjyjHDZhs)
                this.ZHDZrs += Number(data2[i].sjyjHDZrs)
                this.ZWTQRhs += Number(data2[i].sjyjWTQRhs)
                this.ZWTQRrs += Number(data2[i].sjyjWTQRrs)
                // arrData.rhhcHs += Number(data2[i].sjyjWTQRhsB)
                // arrData.rhhcRs += Number(data2[i].sjyjWTQRrsB)
                // arrData.jjhdHs += Number(data2[i].sjyjHDZhsE)
                // arrData.jjhdRs += Number(data2[i].sjyjHDZrsE)

              }else if(this.show[0][key]==true && key=="sd_show" ){
                this.ZSQhs += Number(data2[i].sdyjSQhs)
                this.ZSQrs += Number(data2[i].sdyjSQrs)
                this.ZTHhs += Number(data2[i].sdyjTHhs)
                this.ZTHrs += Number(data2[i].sdyjTHrs)
                this.ZHDZhs += Number(data2[i].sdyjHDZhs)
                this.ZHDZrs += Number(data2[i].sdyjHDZrs)
                this.ZWTQRhs += Number(data2[i].sdyjWTQRhs)
                this.ZWTQRrs += Number(data2[i].sdyjWTQRrs)
                // arrData.rhhcHs += Number(data2[i].sdyjWTQRhsB)
                // arrData.rhhcRs += Number(data2[i].sdyjWTQRrsB)
                // arrData.jjhdHs += Number(data2[i].sdyjHDZhsE)
                // arrData.jjhdRs += Number(data2[i].sdyjHDZrsE)

              }else if(this.show[0][key]==true && key=="zf_show" ){
                this.ZSQhs += Number(data2[i].zfyjSQhs)
                this.ZSQrs += Number(data2[i].zfyjSQrs)
                this.ZTHhs += Number(data2[i].zfyjTHhs)
                this.ZTHrs += Number(data2[i].zfyjTHrs)
                this.ZHDZhs += Number(data2[i].zfyjHDZhs)
                this.ZHDZrs += Number(data2[i].zfyjHDZrs)
                this.ZWTQRhs += Number(data2[i].zfyjWTQRhs)
                this.ZWTQRrs += Number(data2[i].zfyjWTQRrs)
                // arrData.rhhcHs += Number(data2[i].zfyjWTQRhsB)
                // arrData.rhhcRs += Number(data2[i].zfyjWTQRrsB)
                // arrData.jjhdHs += Number(data2[i].zfyjHDZhsE)
                // arrData.jjhdRs += Number(data2[i].zfyjHDZrsE)

              }else if(this.show[0][key]==true && key=="wj_show" ){
                this.ZSQhs += Number(data2[i].wjyjSQhs)
                this.ZSQrs += Number(data2[i].wjyjSQrs)
                this.ZTHhs += Number(data2[i].wjyjTHhs)
                this.ZTHrs += Number(data2[i].wjyjTHrs)
                this.ZHDZhs += Number(data2[i].wjyjHDZhs)
                this.ZHDZrs += Number(data2[i].wjyjHDZrs)
                this.ZWTQRhs += Number(data2[i].wjyjWTQRhs)
                this.ZWTQRrs += Number(data2[i].wjyjWTQRrs)
                // arrData.rhhcHs += Number(data2[i].wjyjWTQRhsB)
                // arrData.rhhcRs += Number(data2[i].wjyjWTQRrsB)
                // arrData.jjhdHs += Number(data2[i].wjyjHDZhsE)
                // arrData.jjhdRs += Number(data2[i].wjyjHDZrsE)

              }else if(this.show[0][key]==true && key=="xf_show" ){
                this.ZSQhs += Number(data2[i].xfyjSQhs)
                this.ZSQrs += Number(data2[i].xfyjSQrs)
                this.ZTHhs += Number(data2[i].xfyjTHhs)
                this.ZTHrs += Number(data2[i].xfyjTHrs)
                this.ZHDZhs += Number(data2[i].xfyjHDZhs)
                this.ZHDZrs += Number(data2[i].xfyjHDZrs)
                this.ZWTQRhs += Number(data2[i].xfyjWTQRhs)
                this.ZWTQRrs += Number(data2[i].xfyjWTQRrs)
                // arrData.rhhcHs += Number(data2[i].xfyjWTQRhsB)
                // arrData.rhhcRs += Number(data2[i].xfyjWTQRrsB)
                // arrData.jjhdHs += Number(data2[i].xfyjHDZhsE)
                // arrData.jjhdRs += Number(data2[i].xfyjHDZrsE)

              }
            }
            // 总数据
            this.ZSJhs = this.ZSQhs + this.ZTHhs + this.ZHDZhs + this.ZWTQRhs;
            this.ZSJrs = this.ZSQrs + this.ZTHrs + this.ZHDZrs + this.ZWTQRrs;
           
            
            // 前置核查-完成派单
            arrData.wcpdHs=this.ZSJhs-this.ZSQhs;
            arrData.wcpdRs=this.ZSJrs-this.ZSQrs;

            // 完成派单 -- 完成率
            // if(arrData.wcpdHs==0){
            //   arrData.wcpdWcl='0%'
            // }else{
            //   arrData.wcpdWcl=(arrData.wcpdHs/this.ZSJhs*100).toFixed(3)+"%"
            // }
              arrData.wcpdWcl=""

            
             // 入户核查 -- 完成率
            // if(arrData.rhhcHs==0){
            //   arrData.rhhcWcl='0%'
            // }else{
            //   arrData.rhhcWcl=(arrData.rhhcHs/this.ZSJhs*100).toFixed(3)+"%"
            // }
              arrData.rhhcWcl=""
            
           
             // 完成经济核对-- 完成率
            // if(arrData.jjhdHs==0){
            //   arrData.jjhdWcl='0%'
            // }else{
            //   arrData.jjhdWcl=(arrData.jjhdHs/this.ZSJhs*100).toFixed(3)+"%"
            // }
              arrData.jjhdWcl=""


            // 低收入人口认定不通过
              arrData.btgHs = this.ZTHhs
              arrData.btgRs = this.ZTHrs
              // arrData.btgThl = ((this.ZTHhs / this.ZSJhs)*100).toFixed(3)+"%";
              arrData.btgThl = "";

            this.ZSQhs = 0
            this.ZSQrs = 0
            this.ZTHhs = 0
            this.ZTHrs = 0
            this.ZHDZhs = 0
            this.ZHDZrs = 0
            this.ZWTQRhs = 0
            this.ZWTQRrs = 0
            

            // 低收入认定-最低生活保障家庭--审核
          
            // 户数
            // 按户保
            if(data2[i].dbCShsQZSQahb==undefined){
              data2[i].dbCShsQZSQahb=0
            }
            if(data2[i].dbCShsJDLKahb==undefined){
              data2[i].dbCShsJDLKahb=0
            }
            if(data2[i].dbCShsYLTSahb==undefined){
              data2[i].dbCShsYLTSahb=0
            }
            if(data2[i].dbCShsZDPCahb==undefined){
              data2[i].dbCShsZDPCahb=0
            }
            if(data2[i].dbCShsQTahb==undefined){
              data2[i].dbCShsQTahb=0
            }
            console.log();

            // 按人保
            if(data2[i].dbCShsQZSQarb==undefined){
              data2[i].dbCShsQZSQarb=0
            }
            if(data2[i].dbCShsJDLKarb==undefined){
              data2[i].dbCShsJDLKarb=0
            }
            if(data2[i].dbCShsYLTSarb==undefined){
              data2[i].dbCShsYLTSarb=0
            }
            if(data2[i].dbCShsZDPCarb==undefined){
              data2[i].dbCShsZDPCarb=0
            }
            if(data2[i].dbCShsQTarb==undefined){
              data2[i].dbCShsQTarb=0
            }

            // 人数
            // 按户保
            if(data2[i].dbCSrsQZSQahb==undefined){
              data2[i].dbCSrsQZSQahb=0
            }
            if(data2[i].dbCSrsJDLKahb==undefined){
              data2[i].dbCSrsJDLKahb=0
            }
            if(data2[i].dbCSrsYLTSahb==undefined){
              data2[i].dbCSrsYLTSahb=0
            }
            if(data2[i].dbCSrsZDPCahb==undefined){
              data2[i].dbCSrsZDPCahb=0
            }
            if(data2[i].dbCSrsQTahb==undefined){
              data2[i].dbCSrsQTahb=0
            }


              // 按人保
            if(data2[i].dbCSrsQZSQarb==undefined){
              data2[i].dbCSrsQZSQarb=0
            }
            if(data2[i].dbCSrsJDLKarb==undefined){
              data2[i].dbCSrsJDLKarb=0
            }
            if(data2[i].dbCSrsYLTSarb==undefined){
              data2[i].dbCSrsYLTSarb=0
            }
            if(data2[i].dbCSrsZDPCarb==undefined){
              data2[i].dbCSrsZDPCarb=0
            }
            if(data2[i].dbCSrsQTarb==undefined){
              data2[i].dbCSrsQTarb=0
            }
           

             // 公示-按户保
            if(data2[i].dbGShsQZSQahb == undefined){
              data2[i].dbGShsQZSQahb = 0
            }
            if(data2[i].dbGShsJDLKahb == undefined){
              data2[i].dbGShsJDLKahb = 0
            }
            if(data2[i].dbGShsYLTSahb==undefined){
              data2[i].dbGShsYLTSahb=0
            }
            if(data2[i].dbGShsZDPCahb==undefined){
              data2[i].dbGShsZDPCahb=0
            }
            if(data2[i].dbGShsQTahb==undefined){
              data2[i].dbGShsQTahb=0
            }

             if(data2[i].dbGSrsQZSQahb==undefined){
              data2[i].dbGSrsQZSQahb=0
            }
            if(data2[i].dbGSrsJDLKahb==undefined){
              data2[i].dbGSrsJDLKahb=0
            }
            if(data2[i].dbGSrsYLTSahb==undefined){
              data2[i].dbGSrsYLTSahb=0
            }
            if(data2[i].dbGSrsZDPCahb==undefined){
              data2[i].dbGSrsZDPCahb=0
            }
            if(data2[i].dbGSrsQTahb==undefined){
              data2[i].dbGSrsQTahb=0
            }

            // 公示-按人保
            if(data2[i].dbGShsQZSQarb == undefined){
              data2[i].dbGShsQZSQarb = 0
            }
            if(data2[i].dbGShsJDLKarb == undefined){
              data2[i].dbGShsJDLKarb = 0
            }
            if(data2[i].dbGShsYLTSarb==undefined){
              data2[i].dbGShsYLTSarb=0
            }
            if(data2[i].dbGShsZDPCarb==undefined){
              data2[i].dbGShsZDPCarb=0
            }
            if(data2[i].dbGShsQTarb==undefined){
              data2[i].dbGShsQTarb=0
            }

             if(data2[i].dbGSrsQZSQarb==undefined){
              data2[i].dbGSrsQZSQarb=0
            }
            if(data2[i].dbGSrsJDLKarb==undefined){
              data2[i].dbGSrsJDLKarb=0
            }
            if(data2[i].dbGSrsYLTSarb==undefined){
              data2[i].dbGSrsYLTSarb=0
            }
            if(data2[i].dbGSrsZDPCarb==undefined){
              data2[i].dbGSrsZDPCarb=0
            }
            if(data2[i].dbGSrsQTarb==undefined){
              data2[i].dbGSrsQTarb=0
            }
           
            // 审批--按户保
            if(data2[i].dbSPhsQZSQahb==undefined){
              data2[i].dbSPhsQZSQahb=0
            }
            if(data2[i].dbSPhsJDLKahb==undefined){
              data2[i].dbSPhsJDLKahb=0
            }
            if(data2[i].dbSPhsYLTSahb==undefined){
              data2[i].dbSPhsYLTSahb=0
            }
            if(data2[i].dbSPhsZDPCahb==undefined){
              data2[i].dbSPhsZDPCahb=0
            }
            if(data2[i].dbSPhsQTahb==undefined){
              data2[i].dbSPhsQTahb=0
            }

            if(data2[i].dbSPrsQZSQahb==undefined){
              data2[i].dbSPrsQZSQahb=0
            }
            if(data2[i].dbSPrsJDLKahb==undefined){
              data2[i].dbSPrsJDLKahb=0
            }
            if(data2[i].dbSPrsYLTSahb==undefined){
              data2[i].dbSPrsYLTSahb=0
            }
            if(data2[i].dbSPrsZDPCahb==undefined){
              data2[i].dbSPrsZDPCahb=0
            }
            if(data2[i].dbSPrsQTahb==undefined){
              data2[i].dbSPrsQTahb=0
            }

               // 审批--按人保
            if(data2[i].dbSPhsQZSQarb==undefined){
              data2[i].dbSPhsQZSQarb=0
            }
            if(data2[i].dbSPhsJDLKarb==undefined){
              data2[i].dbSPhsJDLKarb=0
            }
            if(data2[i].dbSPhsYLTSarb==undefined){
              data2[i].dbSPhsYLTSarb=0
            }
            if(data2[i].dbSPhsZDPCarb==undefined){
              data2[i].dbSPhsZDPCarb=0
            }
            if(data2[i].dbSPhsQTarb==undefined){
              data2[i].dbSPhsQTarb=0
            }

            if(data2[i].dbSPrsQZSQarb==undefined){
              data2[i].dbSPrsQZSQarb=0
            }
            if(data2[i].dbSPrsJDLKarb==undefined){
              data2[i].dbSPrsJDLKarb=0
            }
            if(data2[i].dbSPrsYLTSarb==undefined){
              data2[i].dbSPrsYLTSarb=0
            }
            if(data2[i].dbSPrsZDPCarb==undefined){
              data2[i].dbSPrsZDPCarb=0
            }
            if(data2[i].dbSPrsQTarb==undefined){
              data2[i].dbSPrsQTarb=0
            }
           
           // 办结-按户保
            if(data2[i].dbBJhsQZSQahb==undefined){
              data2[i].dbBJhsQZSQahb=0
            }
            if(data2[i].dbBJhsJDLKahb==undefined){
              data2[i].dbBJhsJDLKahb=0
            }
            if(data2[i].dbBJhsYLTSahb==undefined){
              data2[i].dbBJhsYLTSahb=0
            }
            if(data2[i].dbBJhsZDPCahb==undefined){
              data2[i].dbBJhsZDPCahb=0
            }
            if(data2[i].dbBJhsQTahb==undefined){
              data2[i].dbBJhsQTahb=0
            }

            if(data2[i].dbBJrsQZSQahb==undefined){
              data2[i].dbBJrsQZSQahb=0
            }
            if(data2[i].dbBJrsJDLKahb==undefined){
              data2[i].dbBJrsJDLKahb=0
            }
            if(data2[i].dbBJrsYLTSahb==undefined){
              data2[i].dbBJrsYLTSahb=0
            }
            if(data2[i].dbBJrsZDPCahb==undefined){
              data2[i].dbBJrsZDPCahb=0
            }
            if(data2[i].dbBJrsQTahb==undefined){
              data2[i].dbBJrsQTahb=0
            }

            // 办结-按人保
            if(data2[i].dbBJhsQZSQarb==undefined){
              data2[i].dbBJhsQZSQarb=0
            }
            if(data2[i].dbBJhsJDLKarb==undefined){
              data2[i].dbBJhsJDLKarb=0
            }
            if(data2[i].dbBJhsYLTSarb==undefined){
              data2[i].dbBJhsYLTSarb=0
            }
            if(data2[i].dbBJhsZDPCarb==undefined){
              data2[i].dbBJhsZDPCarb=0
            }
            if(data2[i].dbBJhsQTarb==undefined){
              data2[i].dbBJhsQTarb=0
            }

            if(data2[i].dbBJrsQZSQarb==undefined){
              data2[i].dbBJrsQZSQarb=0
            }
            if(data2[i].dbBJrsJDLKarb==undefined){
              data2[i].dbBJrsJDLKarb=0
            }
            if(data2[i].dbBJrsYLTSarb==undefined){
              data2[i].dbBJrsYLTSarb=0
            }
            if(data2[i].dbBJrsZDPCarb==undefined){
              data2[i].dbBJrsZDPCarb=0
            }
            if(data2[i].dbBJrsQTarb==undefined){
              data2[i].dbBJrsQTarb=0
            }

           

            // 初审
            // console.log(data2[i].dbCShsQZSQahb , data2[i].dbCShsJDLKahb ,  data2[i].dbCShsYLTSahb , data2[i].dbCShsZDPCahb , data2[i].dbCShsQTahb);

            // if( data2[i].dbCShsQZSQahb || data2[i].dbCShsJDLKahb ||  data2[i].dbCShsYLTSahb || data2[i].dbCShsZDPCahb || data2[i].dbCShsQTahb){

              // arrData.dbCShsahb=Number(data2[i].dbCShsQZSQahb) + Number(data2[i].dbCShsJDLKahb) + Number(data2[i].dbCShsYLTSahb) + Number(data2[i].dbCShsZDPCahb)  
              // if(this.OtherSources==true){
              //   arrData.dbCShsahb=Number(data2[i].dbCShsQTahb)
              // }
            // }else{
            //   arrData.dbCShsahb=0
            // }

           // 按人保
            // if( data2[i].dbCShsQZSQarb || data2[i].dbCShsJDLKarb ||  data2[i].dbCShsYLTSarb || data2[i].dbCShsZDPCarb || data2[i].dbCShsQTarb){

            //   arrData.dbCShsarb=Number(data2[i].dbCShsQZSQarb) + Number(data2[i].dbCShsJDLKarb) + Number(data2[i].dbCShsYLTSarb) + Number(data2[i].dbCShsZDPCarb)  
            //   if(this.OtherSources==true){
            //     arrData.dbCShsarb=Number(data2[i].dbCShsQTarb)
            //   }
            // }else{
            //   arrData.dbCShsarb=0
            // }


            // 人数
            // 按户保
            // if( data2[i].dbCSrsQZSQahb || data2[i].dbCSrsJDLKahb ||  data2[i].dbCSrsYLTSahb || data2[i].dbCSrsZDPCahb || data2[i].dbCSrsQTahb){

            //   arrData.dbCSrsahb = Number(data2[i].dbCSrsQZSQahb) + Number(data2[i].dbCSrsJDLKahb) + Number(data2[i].dbCSrsYLTSahb) + Number(data2[i].dbCSrsZDPCahb) 
            //   if(this.OtherSources==true){
                 
            //   }
            // }else{
            //   arrData.dbCSrsahb=0
            // }
            
          
          //  // 按人保
          //   if( data2[i].dbCSrsQZSQarb || data2[i].dbCSrsJDLKarb ||  data2[i].dbCSrsYLTSarb || data2[i].dbCSrsZDPCarb || data2[i].dbCSrsQTarb){
          //     arrData.dbCSrsarb = Number(data2[i].dbCSrsQZSQarb) + Number(data2[i].dbCSrsJDLKarb) + Number(data2[i].dbCSrsYLTSarb) + Number(data2[i].dbCSrsZDPCarb) 
          //     if(this.OtherSources==true){
                 
          //     }
          //   }else{
          //     arrData.dbCSrsarb=0
          //   }

          //    // 公示-按户保
          //   if( data2[i].dbGShsQZSQahb || data2[i].dbGShsJDLKahb ||  data2[i].dbGShsYLTSahb || data2[i].dbGShsZDPCahb || data2[i].dbGShsQTahb){
          //     arrData.dbGShsahb = Number(data2[i].dbGShsQZSQahb) + Number(data2[i].dbGShsJDLKahb) + Number(data2[i].dbGShsYLTSahb) + Number(data2[i].dbGShsZDPCahb)
          //     if(this.OtherSources==true){
                
          //     }
          //   }else{
          //     arrData.dbGShsahb=0
          //   }

        
          //   if( data2[i].dbGSrsQZSQahb || data2[i].dbGSrsJDLKahb ||  data2[i].dbGSrsYLTSahb || data2[i].dbGSrsZDPCahb || data2[i].dbGSrsQTahb){

          //     arrData.dbGSrsahb = Number(data2[i].dbGSrsQZSQahb) + Number(data2[i].dbGSrsJDLKahb) + Number(data2[i].dbGSrsYLTSahb) + Number(data2[i].dbGSrsZDPCahb)
          //     if(this.OtherSources==true){
                 
          //     }
          //   }else{
          //     arrData.dbGSrsahb=0
          //   }
           
           
            // // 公示-按人保
            // if( data2[i].dbGShsQZSQarb || data2[i].dbGShsJDLKarb ||  data2[i].dbGShsYLTSarb || data2[i].dbGShsZDPCarb || data2[i].dbGShsQTarb){

            //   arrData.dbGShsarb = Number(data2[i].dbGShsQZSQarb) + Number(data2[i].dbGShsJDLKarb) + Number(data2[i].dbGShsYLTSarb) + Number(data2[i].dbGShsZDPCarb) 
            //   if(this.OtherSources==true){
                
            //   }
            // }else{
            //   arrData.dbGShsarb=0
            // }

            // if( data2[i].dbGSrsQZSQarb || data2[i].dbGSrsJDLKarb ||  data2[i].dbGSrsYLTSarb || data2[i].dbGSrsZDPCarb || data2[i].dbGSrsQTarb){
              
            //   arrData.dbGSrsarb = Number(data2[i].dbGSrsQZSQarb) + Number(data2[i].dbGSrsJDLKarb) + Number(data2[i].dbGSrsYLTSarb) + Number(data2[i].dbGSrsZDPCarb)
            //   if(this.OtherSources==true){
                 
            //   }
            // }else{
            //   arrData.dbGSrsarb=0
            // }

           
           // 审批--按户保
            // if( data2[i].dbSPhsQZSQahb || data2[i].dbSPhsJDLKahb ||  data2[i].dbSPhsYLTSahb || data2[i].dbSPhsZDPCahb || data2[i].dbSPhsQTahb){
              
            //   arrData.dbSPhsahb = Number(data2[i].dbSPhsQZSQahb) + Number(data2[i].dbSPhsJDLKahb) + Number(data2[i].dbSPhsYLTSahb) + Number(data2[i].dbSPhsZDPCahb)
            //   if(this.OtherSources==true){
                 
            //   }
            // }else{
            //   arrData.dbSPhsahb=0
            // }

           
           
        
            // if( data2[i].dbSPrsQZSQahb || data2[i].dbSPrsJDLKahb ||  data2[i].dbSPrsYLTSahb || data2[i].dbSPrsZDPCahb || data2[i].dbSPrsQTahb){
              
            //   arrData.dbSPrsahb = Number(data2[i].dbSPrsQZSQahb) + Number(data2[i].dbSPrsJDLKahb) + Number(data2[i].dbSPrsYLTSahb) + Number(data2[i].dbSPrsZDPCahb) 
            //   if(this.OtherSources==true){
                
            //   }
            // }else{
            //   arrData.dbSPrsahb=0
            // }

         
           
            // // 审批--按人保
            // if( data2[i].dbSPhsQZSQarb || data2[i].dbSPhsJDLKarb ||  data2[i].dbSPhsYLTSarb || data2[i].dbSPhsZDPCarb || data2[i].dbSPhsQTarb){
              
            //   arrData.dbSPhsarb = Number(data2[i].dbSPhsQZSQarb) + Number(data2[i].dbSPhsJDLKarb) + Number(data2[i].dbSPhsYLTSarb) + Number(data2[i].dbSPhsZDPCarb)
            //   if(this.OtherSources==true){
                
            //   }
            // }else{
            //   arrData.dbSPhsarb=0
            // }

            
        
            // if( data2[i].dbSPrsQZSQarb || data2[i].dbSPrsJDLKarb ||  data2[i].dbSPrsYLTSarb || data2[i].dbSPrsZDPCarb || data2[i].dbSPrsQTarb){
              
            //   arrData.dbSPrsarb = Number(data2[i].dbSPrsQZSQarb) + Number(data2[i].dbSPrsJDLKarb) + Number(data2[i].dbSPrsYLTSarb) + Number(data2[i].dbSPrsZDPCarb) 
            //   if(this.OtherSources==true){
            //     // arrData.dbSPrsarb = Number(data2[i].dbSPrsQTarb) 
            //   }
            // }else{
            //   arrData.dbSPrsarb=0
            // }

           
            // // 办结-按户保
            // if( data2[i].dbBJhsQZSQahb || data2[i].dbBJhsJDLKahb ||  data2[i].dbBJhsYLTSahb || data2[i].dbBJhsZDPCahb || data2[i].dbBJhsQTahb){
              
            //   arrData.dbBJhsahb = Number(data2[i].dbBJhsQZSQahb) + Number(data2[i].dbBJhsJDLKahb) + Number(data2[i].dbBJhsYLTSahb) + Number(data2[i].dbBJhsZDPCahb)
            //   if(this.OtherSources==true){
                
            //   }
            // }else{
            //   arrData.dbBJhsahb=0
            // }

            
           
        
          //   if( data2[i].dbBJrsQZSQahb || data2[i].dbBJrsJDLKahb ||  data2[i].dbBJrsYLTSahb || data2[i].dbBJrsZDPCahb || data2[i].dbBJrsQTahb){
             
          //     arrData.dbBJrsahb = Number(data2[i].dbBJrsQZSQahb) + Number(data2[i].dbBJrsJDLKahb) + Number(data2[i].dbBJrsYLTSahb) + Number(data2[i].dbBJrsZDPCahb)
          //     if(this.OtherSources==true){
               
          //     }
          //   }else{
          //     arrData.dbBJrsahb=0
          //   }
          
          
           
          // // 办结-按人保
          //   if( data2[i].dbBJhsQZSQarb || data2[i].dbBJhsJDLKarb ||  data2[i].dbBJhsYLTSarb || data2[i].dbBJhsZDPCarb || data2[i].dbBJhsQTarb){
              
          //     arrData.dbBJhsarb = Number(data2[i].dbBJhsQZSQarb) + Number(data2[i].dbBJhsJDLKarb) + Number(data2[i].dbBJhsYLTSarb) + Number(data2[i].dbBJhsZDPCarb)
          //     if(this.OtherSources==true){
                 
          //     }
          //   }else{
          //     arrData.dbBJhsarb=0
          //   }

            
           
        
          //   if( data2[i].dbBJrsQZSQarb || data2[i].dbBJrsJDLKarb ||  data2[i].dbBJrsYLTSarb || data2[i].dbBJrsZDPCarb || data2[i].dbBJrsQTarb){
              
          //     arrData.dbBJrsarb = Number(data2[i].dbBJrsQZSQarb) + Number(data2[i].dbBJrsJDLKarb) + Number(data2[i].dbBJrsYLTSarb) + Number(data2[i].dbBJrsZDPCarb)
          //     if(this.OtherSources==true){
                
          //     }
          //   }else{
          //     arrData.dbBJrsarb=0
          //   }

          // 根据筛选内容进行总数计算--低收入认定
          // console.log(this.show[0],'筛选');

           

            arrData.dbCShsahb = 0;
            arrData.dbCSrsahb = 0;
            arrData.dbCShsarb = 0;
            arrData.dbCSrsarb = 0;

            arrData.dbGShsahb = 0;
            arrData.dbGSrsahb = 0;
            arrData.dbGShsarb = 0;
            arrData.dbGSrsarb = 0;

            arrData.dbSPhsahb = 0;
            arrData.dbSPrsahb = 0;
            arrData.dbSPhsarb = 0;
            arrData.dbSPrsarb = 0;

            arrData.dbBJhsahb = 0;
            arrData.dbBJrsahb = 0;
            arrData.dbBJhsarb = 0;
            arrData.dbBJrsarb = 0;


            //低收入认定-低保-预警来源-筛选
            for(let key in this.show[0]){

              if(this.show[0][key] == true && key == "qz_show" ){

                arrData.dbCShsahb += Number(data2[i].dbCShsQZSQahb);
                arrData.dbCSrsahb += Number(data2[i].dbCSrsQZSQahb);
                arrData.dbCShsarb += Number(data2[i].dbCShsQZSQarb);
                arrData.dbCSrsarb += Number(data2[i].dbCSrsQZSQarb);

                arrData.dbGShsahb += Number(data2[i].dbGShsQZSQahb);
                arrData.dbGSrsahb += Number(data2[i].dbGSrsQZSQahb);
                arrData.dbGShsarb += Number(data2[i].dbGShsQZSQarb);
                arrData.dbGSrsarb += Number(data2[i].dbGSrsQZSQarb);

                arrData.dbSPhsahb += Number(data2[i].dbSPhsQZSQahb);
                arrData.dbSPrsahb += Number(data2[i].dbSPrsQZSQahb);
                arrData.dbSPhsarb += Number(data2[i].dbSPhsQZSQarb);
                arrData.dbSPrsarb += Number(data2[i].dbSPrsQZSQarb);

                arrData.dbBJhsahb += Number(data2[i].dbBJhsQZSQahb);
                arrData.dbBJrsahb += Number(data2[i].dbBJrsQZSQahb);
                arrData.dbBJhsarb += Number(data2[i].dbBJhsQZSQarb);
                arrData.dbBJrsarb += Number(data2[i].dbBJrsQZSQarb);

              }else if(this.show[0][key] == true && key == "jd_show" ){

                arrData.dbCShsahb += Number(data2[i].dbCShsJDLKahb);
                arrData.dbCSrsahb += Number(data2[i].dbCSrsJDLKahb);
                arrData.dbCShsarb += Number(data2[i].dbCShsJDLKarb);
                arrData.dbCSrsarb += Number(data2[i].dbCSrsJDLKarb);
                
                arrData.dbGShsahb += Number(data2[i].dbGShsJDLKahb);
                arrData.dbGSrsahb += Number(data2[i].dbGSrsJDLKahb);
                arrData.dbGShsarb += Number(data2[i].dbGShsJDLKarb);
                arrData.dbGSrsarb += Number(data2[i].dbGSrsJDLKarb);
                
                arrData.dbSPhsahb += Number(data2[i].dbSPhsJDLKahb);
                arrData.dbSPrsahb += Number(data2[i].dbSPrsJDLKahb);
                arrData.dbSPhsarb += Number(data2[i].dbSPhsJDLKarb);
                arrData.dbSPrsarb += Number(data2[i].dbSPrsJDLKarb);
                
                arrData.dbBJhsahb += Number(data2[i].dbBJhsJDLKahb);
                arrData.dbBJrsahb += Number(data2[i].dbBJrsJDLKahb);
                arrData.dbBJhsarb += Number(data2[i].dbBJhsJDLKarb);
                arrData.dbBJrsarb += Number(data2[i].dbBJrsJDLKarb);

              }else if(this.show[0][key] == true && key == "yb_show" ){

                arrData.dbCShsahb += Number(data2[i].dbCShsYLTSahb);
                arrData.dbCSrsahb += Number(data2[i].dbCSrsYLTSahb);
                arrData.dbCShsarb += Number(data2[i].dbCShsYLTSarb);
                arrData.dbCSrsarb += Number(data2[i].dbCSrsYLTSarb);

                arrData.dbGShsahb += Number(data2[i].dbGShsYLTSahb);
                arrData.dbGSrsahb += Number(data2[i].dbGSrsYLTSahb);
                arrData.dbGShsarb += Number(data2[i].dbGShsYLTSarb);
                arrData.dbGSrsarb += Number(data2[i].dbGSrsYLTSarb);

                arrData.dbSPhsahb += Number(data2[i].dbSPhsYLTSahb);
                arrData.dbSPrsahb += Number(data2[i].dbSPrsYLTSahb);
                arrData.dbSPhsarb += Number(data2[i].dbSPhsYLTSarb);
                arrData.dbSPrsarb += Number(data2[i].dbSPrsYLTSarb);

                arrData.dbBJhsahb += Number(data2[i].dbBJhsYLTSahb);
                arrData.dbBJrsahb += Number(data2[i].dbBJrsYLTSahb);
                arrData.dbBJhsarb += Number(data2[i].dbBJhsYLTSarb);
                arrData.dbBJrsarb += Number(data2[i].dbBJrsYLTSarb);

              }else if(this.show[0][key] == true && key == "zd_show" ){

                arrData.dbCShsahb += Number(data2[i].dbCShsZDPCahb);
                arrData.dbCSrsahb += Number(data2[i].dbCSrsZDPCahb);
                arrData.dbCShsarb += Number(data2[i].dbCShsZDPCarb);
                arrData.dbCSrsarb += Number(data2[i].dbCSrsZDPCarb);

                arrData.dbGShsahb += Number(data2[i].dbGShsZDPCahb);
                arrData.dbGSrsahb += Number(data2[i].dbGSrsZDPCahb);
                arrData.dbGShsarb += Number(data2[i].dbGShsZDPCarb);
                arrData.dbGSrsarb += Number(data2[i].dbGSrsZDPCarb);

                arrData.dbSPhsahb += Number(data2[i].dbSPhsZDPCahb);
                arrData.dbSPrsahb += Number(data2[i].dbSPrsZDPCahb);
                arrData.dbSPhsarb += Number(data2[i].dbSPhsZDPCarb);
                arrData.dbSPrsarb += Number(data2[i].dbSPrsZDPCarb);

                arrData.dbBJhsahb += Number(data2[i].dbBJhsZDPCahb);
                arrData.dbBJrsahb += Number(data2[i].dbBJrsZDPCahb);
                arrData.dbBJhsarb += Number(data2[i].dbBJhsZDPCarb);
                arrData.dbBJrsarb += Number(data2[i].dbBJrsZDPCarb);

              }else if(this.show[0][key] == true && key == "stw_show" ){

              // arrData.dbCShsahb +=
              // arrData.dbCShsarb +=
              // arrData.dbCSrsahb +=
              // arrData.dbCSrsarb +=
              // arrData.dbGShsahb +=
              // arrData.dbGSrsahb +=
              // arrData.dbGShsarb +=
              // arrData.dbGSrsarb +=
              // arrData.dbSPhsahb +=
              // arrData.dbSPrsahb +=
              // arrData.dbSPhsarb +=
              // arrData.dbSPrsarb +=
              // arrData.dbBJhsahb +=
              // arrData.dbBJrsahb +=
              // arrData.dbBJhsarb +=
              // arrData.dbBJrsarb +=

              }else if(this.show[0][key]==true && key=="sj_show" ){

                // arrData.dbCShsahb +=
                // arrData.dbCShsarb +=
                // arrData.dbCSrsahb +=
                // arrData.dbCSrsarb +=
                // arrData.dbGShsahb +=
                // arrData.dbGSrsahb +=
                // arrData.dbGShsarb +=
                // arrData.dbGSrsarb +=
                // arrData.dbSPhsahb +=
                // arrData.dbSPrsahb +=
                // arrData.dbSPhsarb +=
                // arrData.dbSPrsarb +=
                // arrData.dbBJhsahb +=
                // arrData.dbBJrsahb +=
                // arrData.dbBJhsarb +=
                // arrData.dbBJrsarb +=

              }else if(this.show[0][key]==true && key=="sd_show" ){

                // arrData.dbCShsahb +=
                // arrData.dbCShsarb +=
                // arrData.dbCSrsahb +=
                // arrData.dbCSrsarb +=
                // arrData.dbGShsahb +=
                // arrData.dbGSrsahb +=
                // arrData.dbGShsarb +=
                // arrData.dbGSrsarb +=
                // arrData.dbSPhsahb +=
                // arrData.dbSPrsahb +=
                // arrData.dbSPhsarb +=
                // arrData.dbSPrsarb +=
                // arrData.dbBJhsahb +=
                // arrData.dbBJrsahb +=
                // arrData.dbBJhsarb +=
                // arrData.dbBJrsarb +=

              }else if(this.show[0][key]==true && key=="zf_show" ){

                // arrData.dbCShsahb +=
                // arrData.dbCShsarb +=
                // arrData.dbCSrsahb +=
                // arrData.dbCSrsarb +=
                // arrData.dbGShsahb +=
                // arrData.dbGSrsahb +=
                // arrData.dbGShsarb +=
                // arrData.dbGSrsarb +=
                // arrData.dbSPhsahb +=
                // arrData.dbSPrsahb +=
                // arrData.dbSPhsarb +=
                // arrData.dbSPrsarb +=
                // arrData.dbBJhsahb +=
                // arrData.dbBJrsahb +=
                // arrData.dbBJhsarb +=
                // arrData.dbBJrsarb +=

              }else if(this.show[0][key]==true && key=="wj_show" ){

                // arrData.dbCShsahb +=
                // arrData.dbCShsarb +=
                // arrData.dbCSrsahb +=
                // arrData.dbCSrsarb +=
                // arrData.dbGShsahb +=
                // arrData.dbGSrsahb +=
                // arrData.dbGShsarb +=
                // arrData.dbGSrsarb +=
                // arrData.dbSPhsahb +=
                // arrData.dbSPrsahb +=
                // arrData.dbSPhsarb +=
                // arrData.dbSPrsarb +=
                // arrData.dbBJhsahb +=
                // arrData.dbBJrsahb +=
                // arrData.dbBJhsarb +=
                // arrData.dbBJrsarb +=

              }else if(this.show[0][key]==true && key=="xf_show" ){

                // arrData.dbCShsahb +=
                // arrData.dbCShsarb +=
                // arrData.dbCSrsahb +=
                // arrData.dbCSrsarb +=
                // arrData.dbGShsahb +=
                // arrData.dbGSrsahb +=
                // arrData.dbGShsarb +=
                // arrData.dbGSrsarb +=
                // arrData.dbSPhsahb +=
                // arrData.dbSPrsahb +=
                // arrData.dbSPhsarb +=
                // arrData.dbSPrsarb +=
                // arrData.dbBJhsahb +=
                // arrData.dbBJrsahb +=
                // arrData.dbBJhsarb +=
                // arrData.dbBJrsarb +=

              }
            }

            // 低收入认定-低保-其他数据来源
            if(this.OtherSources == true){

              arrData.dbCShsahb = Number(data2[i].dbCShsQTahb);
              arrData.dbCSrsahb = Number(data2[i].dbCSrsQTahb);
              arrData.dbCShsarb = Number(data2[i].dbCShsQTarb);
              arrData.dbCSrsarb = Number(data2[i].dbCSrsQTarb);

              arrData.dbGShsahb = Number(data2[i].dbGShsQTahb);
              arrData.dbGSrsahb = Number(data2[i].dbGSrsQTahb);
              arrData.dbGShsarb = Number(data2[i].dbGShsQTarb);
              arrData.dbGSrsarb = Number(data2[i].dbGSrsQTarb);

              arrData.dbSPhsahb = Number(data2[i].dbSPhsQTahb);
              arrData.dbSPrsahb = Number(data2[i].dbSPrsQTahb);
              arrData.dbSPhsarb = Number(data2[i].dbSPhsQTarb);
              arrData.dbSPrsarb = Number(data2[i].dbSPrsQTarb);

              arrData.dbBJhsahb = Number(data2[i].dbBJhsQTahb);
              arrData.dbBJrsahb = Number(data2[i].dbBJrsQTahb);
              arrData.dbBJhsarb = Number(data2[i].dbBJhsQTarb);
              arrData.dbBJrsarb = Number(data2[i].dbBJrsQTarb);

            }


            // 完成率
            // if(Number(arrData.dbCShsahb)==0){
            //   arrData.dbCSwclahb="0%"
            // }else{
            //   arrData.dbCSwclahb=((Number(arrData.dbCShsahb) / ( Number(this.ZSJhs) + Number(arrData.dbCShsahb)))*100).toFixed(3)+"%";
            // }
              arrData.dbCSwclahb="";

            // if(Number(arrData.dbGShsahb)==0){
            //   arrData.dbGSwclahb="0%"
            // }else{
            //   arrData.dbGSwclahb=((Number(arrData.dbGShsahb) / ( Number(this.ZSJhs) + Number(arrData.dbCShsahb)+Number(arrData.dbGShsahb)))*100).toFixed(3)+"%";
            // }
            arrData.dbGSwclahb=""

            // if(Number(arrData.dbSPhsahb)!=0){
            //   arrData.dbSPwclahb=((Number(arrData.dbSPhsahb) / ( Number(this.ZSJhs) + Number(arrData.dbCShsahb)+Number(arrData.dbGShsahb)+Number(arrData.dbSPhsahb)))*100).toFixed(3)+"%";
            // }else{
            //   arrData.dbSPwclahb="0%"
            // }
            arrData.dbSPwclahb=""

            // if(Number(arrData.dbBJhsahb)!=0){
            //   arrData.dbBJwclahb=((Number(arrData.dbBJhsahb) / ( Number(this.ZSJhs) + Number(arrData.dbCShsahb)+Number(arrData.dbGShsahb)+Number(arrData.dbBJhsahb)+Number(arrData.dbSPhsahb)))*100).toFixed(3)+"%";
            // }else{
            //   arrData.dbBJwclahb="0%"
            // }
           
             arrData.dbBJwclahb=""
            
            // 完成率-按人保
            // if(Number(arrData.dbCShsarb)==0){
            //   arrData.dbCSwclarb="0%"
            // }else{
            //   arrData.dbCSwclarb=((Number(arrData.dbCShsarb) / ( Number(this.ZSJhs) + Number(arrData.dbCShsarb)))*100).toFixed(3)+"%";
            // }
              arrData.dbCSwclarb="";

            // if(Number(arrData.dbGShsarb)==0){
            //   arrData.dbGSwclarb="0%"
            // }else{
            //   arrData.dbGSwclarb=((Number(arrData.dbGShsarb) / ( Number(this.ZSJhs) + Number(arrData.dbCShsarb)+Number(arrData.dbGShsarb)))*100).toFixed(3)+"%";
            // }
            arrData.dbGSwclarb=""

            // if(Number(arrData.dbSPhsarb)!=0){
            //   arrData.dbSPwclarb=((Number(arrData.dbSPhsarb) / ( Number(this.ZSJhs) + Number(arrData.dbCShsarb)+Number(arrData.dbGShsarb)+Number(arrData.dbSPhsarb)))*100).toFixed(3)+"%";
            // }else{
            //   arrData.dbSPwclarb="0%"
            // }
            arrData.dbSPwclarb=""

            // if(Number(arrData.dbBJhsarb)!=0){
            //   arrData.dbBJwclarb=((Number(arrData.dbBJhsarb) / ( Number(this.ZSJhs) + Number(arrData.dbCShsarb)+Number(arrData.dbGShsarb)+Number(arrData.dbBJhsarb)+Number(arrData.dbSPhsarb)))*100).toFixed(3)+"%";
            // }else{
            //   arrData.dbBJwclarb="0%"
            // }
           
             arrData.dbBJwclarb=""

            // 特困供养家庭--审核
            if(data2[i].tkCShsQZSQ==undefined){
              data2[i].tkCShsQZSQ=0
            }
            if(data2[i].tkCShsJDLK==undefined){
              data2[i].tkCShsJDLK=0
            }
            if(data2[i].tkCShsYLTS==undefined){
              data2[i].tkCShsYLTS=0
            }
            if(data2[i].tkCShsZDPC==undefined){
              data2[i].tkCShsZDPC=0
            }
            if(data2[i].tkCShsQT==undefined){
              data2[i].tkCShsQT=0
            }

            if(data2[i].tkCSrsQZSQ==undefined){
              data2[i].tkCSrsQZSQ=0
            }
            if(data2[i].tkCSrsJDLK==undefined){
              data2[i].tkCSrsJDLK=0
            }
            if(data2[i].tkCSrsYLTS==undefined){
              data2[i].tkCSrsYLTS=0
            }
            if(data2[i].tkCSrsZDPC==undefined){
              data2[i].tkCSrsZDPC=0
            }
            if(data2[i].tkCSrsQT==undefined){
              data2[i].tkCSrsQT=0
            }
           
            // 公示
            if(data2[i].tkGShsQZSQ==undefined){
              data2[i].tkGShsQZSQ=0
            }
            if(data2[i].tkGShsJDLK==undefined){
              data2[i].tkGShsJDLK=0
            }
            if(data2[i].tkGShsYLTS==undefined){
              data2[i].tkGShsYLTS=0
            }
            if(data2[i].tkGShsZDPC==undefined){
              data2[i].tkGShsZDPC=0
            }
            if(data2[i].tkGShsQT==undefined){
              data2[i].tkGShsQT=0
            }
           
            if(data2[i].tkGSrsQZSQ==undefined){
              data2[i].tkGSrsQZSQ=0
            }
            if(data2[i].tkGSrsJDLK==undefined){
              data2[i].tkGSrsJDLK=0
            }
            if(data2[i].tkGSrsYLTS==undefined){
              data2[i].tkGSrsYLTS=0
            }
            if(data2[i].tkGSrsZDPC==undefined){
              data2[i].tkGSrsZDPC=0
            }
            if(data2[i].tkGSrsQT==undefined){
              data2[i].tkGSrsQT=0
            }

            // 审批
            if(data2[i].tkSPhsQZSQ==undefined){
              data2[i].tkSPhsQZSQ=0
            }
            if(data2[i].tkSPhsJDLK==undefined){
              data2[i].tkSPhsJDLK=0
            }
            if(data2[i].tkSPhsYLTS==undefined){
              data2[i].tkSPhsYLTS=0
            }
            if(data2[i].tkSPhsZDPC==undefined){
              data2[i].tkSPhsZDPC=0
            }
            if(data2[i].tkSPhsQT==undefined){
              data2[i].tkSPhsQT=0
            }
           
            if(data2[i].tkSPrsQZSQ==undefined){
              data2[i].tkSPrsQZSQ=0
            }
            if(data2[i].tkSPrsJDLK==undefined){
              data2[i].tkSPrsJDLK=0
            }
            if(data2[i].tkSPrsYLTS==undefined){
              data2[i].tkSPrsYLTS=0
            }
            if(data2[i].tkSPrsZDPC==undefined){
              data2[i].tkSPrsZDPC=0
            }
            if(data2[i].tkSPrsQT==undefined){
              data2[i].tkSPrsQT=0
            }
           
          // 办结
          if(data2[i].tkBJhsQZSQ==undefined){
              data2[i].tkBJhsQZSQ=0
            }
            if(data2[i].tkBJhsJDLK==undefined){
              data2[i].tkBJhsJDLK=0
            }
            if(data2[i].tkBJhsYLTS==undefined){
              data2[i].tkBJhsYLTS=0
            }
            if(data2[i].tkBJhsZDPC==undefined){
              data2[i].tkBJhsZDPC=0
            }
            if(data2[i].tkBJhsQT==undefined){
              data2[i].tkBJhsQT=0
            }
          
            if(data2[i].tkBJrsQZSQ==undefined){
              data2[i].tkBJrsQZSQ=0
            }
            if(data2[i].tkBJrsJDLK==undefined){
              data2[i].tkBJrsJDLK=0
            }
            if(data2[i].tkBJrsYLTS==undefined){
              data2[i].tkBJrsYLTS=0
            }
            if(data2[i].tkBJrsZDPC==undefined){
              data2[i].tkBJrsZDPC=0
            }
            if(data2[i].tkBJrsQT==undefined){
              data2[i].tkBJrsQT=0
            }
           

            arrData.tkCShs = 0;
            arrData.tkCSrs = 0;
            
            arrData.tkGShs = 0;
            arrData.tkGSrs = 0;
            
            arrData.tkSPhs = 0;
            arrData.tkSPrs = 0;
            
            arrData.tkBJhs = 0;
            arrData.tkBJrs = 0;

             //低收入认定-特困-预警来源-筛选
            for(let key in this.show[0]){

              if(this.show[0][key] == true && key == "qz_show" ){

                arrData.tkCShs += Number(data2[i].tkCShsQZSQ);
                arrData.tkCSrs += Number(data2[i].tkCSrsQZSQ);
                
                arrData.tkGShs += Number(data2[i].tkGShsQZSQ);
                arrData.tkGSrs += Number(data2[i].tkGSrsQZSQ);
                
                arrData.tkSPhs += Number(data2[i].tkSPhsQZSQ);
                arrData.tkSPrs += Number(data2[i].tkSPrsQZSQ);
                
                arrData.tkBJhs += Number(data2[i].tkBJhsQZSQ);
                arrData.tkBJrs += Number(data2[i].tkBJrsQZSQ);
                
              }else if(this.show[0][key] == true && key == "jd_show" ){

                arrData.tkCShs += Number(data2[i].tkCShsJDLK);
                arrData.tkCSrs += Number(data2[i].tkCSrsJDLK);
                
                arrData.tkGShs += Number(data2[i].tkGShsJDLK);
                arrData.tkGSrs += Number(data2[i].tkGSrsJDLK);
                
                arrData.tkSPhs += Number(data2[i].tkSPhsJDLK);
                arrData.tkSPrs += Number(data2[i].tkSPrsJDLK);
                
                arrData.tkBJhs += Number(data2[i].tkBJhsJDLK);
                arrData.tkBJrs += Number(data2[i].tkBJrsJDLK);
                
              }else if(this.show[0][key] == true && key == "yb_show" ){

                arrData.tkCShs += Number(data2[i].tkCShsYLTS);
                arrData.tkCSrs += Number(data2[i].tkCSrsYLTS);
                
                arrData.tkGShs += Number(data2[i].tkGShsYLTS);
                arrData.tkGSrs += Number(data2[i].tkGSrsYLTS);
                
                arrData.tkSPhs += Number(data2[i].tkSPhsYLTS);
                arrData.tkSPrs += Number(data2[i].tkSPrsYLTS);
                
                arrData.tkBJhs += Number(data2[i].tkBJhsYLTS);
                arrData.tkBJrs += Number(data2[i].tkBJrsYLTS);
                
              }else if(this.show[0][key] == true && key == "zd_show" ){

                arrData.tkCShs += Number(data2[i].tkCShsZDPC);
                arrData.tkCSrs += Number(data2[i].tkCSrsZDPC);
                
                arrData.tkGShs += Number(data2[i].tkGShsZDPC);
                arrData.tkGSrs += Number(data2[i].tkGSrsZDPC);
                
                arrData.tkSPhs += Number(data2[i].tkSPhsZDPC);
                arrData.tkSPrs += Number(data2[i].tkSPrsZDPC);
                
                arrData.tkBJhs += Number(data2[i].tkBJhsZDPC);
                arrData.tkBJrs += Number(data2[i].tkBJrsZDPC);
                
              }else if(this.show[0][key] == true && key == "stw_show" ){


              }else if(this.show[0][key]==true && key=="sj_show" ){


              }else if(this.show[0][key]==true && key=="sd_show" ){


              }else if(this.show[0][key]==true && key=="zf_show" ){


              }else if(this.show[0][key]==true && key=="wj_show" ){


              }else if(this.show[0][key]==true && key=="xf_show" ){

              }
            }

            // 其他数据来源-特困
            if(this.OtherSources == true){
              arrData.tkCShs= Number(data2[i].tkCShsQT);
              arrData.tkCSrs= Number(data2[i].tkCSrsQT);

              arrData.tkGShs= Number(data2[i].tkGShsQT);
              arrData.tkGSrs= Number(data2[i].tkGSrsQT);

              arrData.tkSPhs= Number(data2[i].tkSPhsQT);
              arrData.tkSPrs= Number(data2[i].tkSPrsQT);

              arrData.tkBJhs= Number(data2[i].tkBJhsQT);
              arrData.tkBJrs= Number(data2[i].tkBJrsQT);
            }

            // 完成率
            // if(Number(arrData.tkCShs)==0){
            //    arrData.tkCSwcl="0%"
            //  }else{
            //    arrData.tkCSwcl=((Number(arrData.tkCShs) / ( Number(this.ZSJhs) + Number(arrData.tkCShs)))*100).toFixed(3)+"%";
            //  }
             arrData.tkCSwcl=""

            // if(Number(arrData.tkGShs)==0){
            //    arrData.tkGSwcl="0%"
            //  }else{
            //    arrData.tkGSwcl=((Number(arrData.tkGShs) / ( Number(this.ZSJhs) + Number(arrData.tkCShs)+Number(arrData.tkGShs)))*100).toFixed(3)+"%";
            //  }
            arrData.tkGSwcl=""

            // if(Number(arrData.tkSPhs)==0){
            //    arrData.tkSPwcl="0%"
            //  }else{
            //    arrData.tkSPwcl=((Number(arrData.tkSPhs) / ( Number(this.ZSJhs) + Number(arrData.tkCShs)+Number(arrData.tkGShs)+Number(arrData.tkSPhs)))*100).toFixed(3)+"%";
            //  }
            arrData.tkSPwcl=""

            // if(Number(arrData.tkBJhs)==0){
            //    arrData.tkBJwcl="0%"
            //  }else{
            //    arrData.tkBJwcl=((Number(arrData.tkBJhs) / ( Number(this.ZSJhs) + Number(arrData.tkCShs)+Number(arrData.tkGShs)+Number(arrData.tkBJhs)+Number(arrData.tkSPhs)))*100).toFixed(3)+"%";
            //  }
             arrData.tkBJwcl=""


          // 单人保家庭
            if(data2[i].dsrCShsQZSQ==undefined){
              data2[i].dsrCShsQZSQ=0
            }
            if(data2[i].dsrCShsJDLK==undefined){
              data2[i].dsrCShsJDLK=0
            }
            if(data2[i].dsrCShsYLTS==undefined){
              data2[i].dsrCShsYLTS=0
            }
            if(data2[i].dsrCShsZDPC==undefined){
              data2[i].dsrCShsZDPC=0
            }
            if(data2[i].dsrCShsQT==undefined){
              data2[i].dsrCShsQT=0
            }
           

            if(data2[i].dsrCSrsQZSQ==undefined){
              data2[i].dsrCSrsQZSQ=0
            }
            if(data2[i].dsrCSrsJDLK==undefined){
              data2[i].dsrCSrsJDLK=0
            }
            if(data2[i].dsrCSrsYLTS==undefined){
              data2[i].dsrCSrsYLTS=0
            }
            if(data2[i].dsrCSrsZDPC==undefined){
              data2[i].dsrCSrsZDPC=0
            }
            if(data2[i].dsrCSrsQT==undefined){
              data2[i].dsrCSrsQT=0
            }
           
           
          // 公示
            if(data2[i].dsrGShsQZSQ==undefined){
              data2[i].dsrGShsQZSQ=0
            }
            if(data2[i].dsrGShsJDLK==undefined){
              data2[i].dsrGShsJDLK=0
            }
            if(data2[i].dsrGShsYLTS==undefined){
              data2[i].dsrGShsYLTS=0
            }
            if(data2[i].dsrGShsZDPC==undefined){
              data2[i].dsrGShsZDPC=0
            }
            if(data2[i].dsrGShsQT==undefined){
              data2[i].dsrGShsQT=0
            }

            if(data2[i].dsrGSrsQZSQ==undefined){
              data2[i].dsrGSrsQZSQ=0
            }
            if(data2[i].dsrGSrsJDLK==undefined){
              data2[i].dsrGSrsJDLK=0
            }
            if(data2[i].dsrGSrsYLTS==undefined){
              data2[i].dsrGSrsYLTS=0
            }
            if(data2[i].dsrGSrsZDPC==undefined){
              data2[i].dsrGSrsZDPC=0
            }
            if(data2[i].dsrGSrsQT==undefined){
              data2[i].dsrGSrsQT=0
            }
           
          // 审批
            if(data2[i].dsrSPhsQZSQ==undefined){
              data2[i].dsrSPhsQZSQ=0
            }
            if(data2[i].dsrSPhsJDLK==undefined){
              data2[i].dsrSPhsJDLK=0
            }
            if(data2[i].dsrSPhsYLTS==undefined){
              data2[i].dsrSPhsYLTS=0
            }
            if(data2[i].dsrSPhsZDPC==undefined){
              data2[i].dsrSPhsZDPC=0
            }
            if(data2[i].dsrSPhsQT==undefined){
              data2[i].dsrSPhsQT=0
            }
           
            if(data2[i].dsrSPrsQZSQ==undefined){
              data2[i].dsrSPrsQZSQ=0
            }
            if(data2[i].dsrSPrsJDLK==undefined){
              data2[i].dsrSPrsJDLK=0
            }
            if(data2[i].dsrSPrsYLTS==undefined){
              data2[i].dsrSPrsYLTS=0
            }
            if(data2[i].dsrSPrsZDPC==undefined){
              data2[i].dsrSPrsZDPC=0
            }
            if(data2[i].dsrSPrsQT==undefined){
              data2[i].dsrSPrsQT=0
            }
           
          // 办结
          if(data2[i].dsrBJhsQZSQ==undefined){
              data2[i].dsrBJhsQZSQ=0
            }
            if(data2[i].dsrBJhsJDLK==undefined){
              data2[i].dsrBJhsJDLK=0
            }
            if(data2[i].dsrBJhsYLTS==undefined){
              data2[i].dsrBJhsYLTS=0
            }
            if(data2[i].dsrBJhsZDPC==undefined){
              data2[i].dsrBJhsZDPC=0
            }
            if(data2[i].dsrBJhsQT==undefined){
              data2[i].dsrBJhsQT=0
            }

            if(data2[i].dsrBJrsQZSQ==undefined){
              data2[i].dsrBJrsQZSQ=0
            }
            if(data2[i].dsrBJrsJDLK==undefined){
              data2[i].dsrBJrsJDLK=0
            }
            if(data2[i].dsrBJrsYLTS==undefined){
              data2[i].dsrBJrsYLTS=0
            }
            if(data2[i].dsrBJrsZDPC==undefined){
              data2[i].dsrBJrsZDPC=0
            }
            if(data2[i].dsrBJrsQT==undefined){
              data2[i].dsrBJrsQT=0
            }
           

              arrData.dsrCShs = 0;
              arrData.dsrCSrs = 0;
              
              arrData.dsrGShs = 0;
              arrData.dsrGSrs = 0;
              
              arrData.dsrSPhs = 0;
              arrData.dsrSPrs = 0;
              
              arrData.dsrBJhs = 0;
              arrData.dsrBJrs = 0;

            //低收入认定-低收入-预警来源-筛选
            for(let key in this.show[0]){

              if(this.show[0][key] == true && key == "qz_show" ){

                arrData.dsrCShs += Number(data2[i].dsrCShsQZSQ);
                arrData.dsrCSrs += Number(data2[i].dsrCSrsQZSQ);
                
                arrData.dsrGShs += Number(data2[i].dsrGShsQZSQ);
                arrData.dsrGSrs += Number(data2[i].dsrGSrsQZSQ);
                
                arrData.dsrSPhs += Number(data2[i].dsrSPhsQZSQ);
                arrData.dsrSPrs += Number(data2[i].dsrSPrsQZSQ);
                
                arrData.dsrBJhs += Number(data2[i].dsrBJhsQZSQ);
                arrData.dsrBJrs += Number(data2[i].dsrBJrsQZSQ);
                
              }else if(this.show[0][key] == true && key == "jd_show" ){

                arrData.dsrCShs += Number(data2[i].dsrCShsJDLK);
                arrData.dsrCSrs += Number(data2[i].dsrCSrsJDLK);
                
                arrData.dsrGShs += Number(data2[i].dsrGShsJDLK);
                arrData.dsrGSrs += Number(data2[i].dsrGSrsJDLK);
                
                arrData.dsrSPhs += Number(data2[i].dsrSPhsJDLK);
                arrData.dsrSPrs += Number(data2[i].dsrSPrsJDLK);
                
                arrData.dsrBJhs += Number(data2[i].dsrBJhsJDLK);
                arrData.dsrBJrs += Number(data2[i].dsrBJrsJDLK);
                
              }else if(this.show[0][key] == true && key == "yb_show" ){

                arrData.dsrCShs += Number(data2[i].dsrCShsYLTS);
                arrData.dsrCSrs += Number(data2[i].dsrCSrsYLTS);
                
                arrData.dsrGShs += Number(data2[i].dsrGShsYLTS);
                arrData.dsrGSrs += Number(data2[i].dsrGSrsYLTS);
                
                arrData.dsrSPhs += Number(data2[i].dsrSPhsYLTS);
                arrData.dsrSPrs += Number(data2[i].dsrSPrsYLTS);
                
                arrData.dsrBJhs += Number(data2[i].dsrBJhsYLTS);
                arrData.dsrBJrs += Number(data2[i].dsrBJrsYLTS);
                
              }else if(this.show[0][key] == true && key == "zd_show" ){

                arrData.dsrCShs += Number(data2[i].dsrCShsZDPC);
                arrData.dsrCSrs += Number(data2[i].dsrCSrsZDPC);
                
                arrData.dsrGShs += Number(data2[i].dsrGShsZDPC);
                arrData.dsrGSrs += Number(data2[i].dsrGSrsZDPC);
                
                arrData.dsrSPhs += Number(data2[i].dsrSPhsZDPC);
                arrData.dsrSPrs += Number(data2[i].dsrSPrsZDPC);
                
                arrData.dsrBJhs += Number(data2[i].dsrBJhsZDPC);
                arrData.dsrBJrs += Number(data2[i].dsrBJrsZDPC);
                
              }else if(this.show[0][key] == true && key == "stw_show" ){


              }else if(this.show[0][key]==true && key=="sj_show" ){


              }else if(this.show[0][key]==true && key=="sd_show" ){


              }else if(this.show[0][key]==true && key=="zf_show" ){


              }else if(this.show[0][key]==true && key=="wj_show" ){


              }else if(this.show[0][key]==true && key=="xf_show" ){

              }
            }

            // 其他数据来源-低收入
            if(this.OtherSources == true){
              arrData.dsrCShs= Number(data2[i].dsrCShsQT);
              arrData.dsrCSrs= Number(data2[i].dsrCSrsQT);

              arrData.dsrGShs= Number(data2[i].dsrGShsQT);
              arrData.dsrGSrs= Number(data2[i].dsrGSrsQT);

              arrData.dsrSPhs= Number(data2[i].dsrSPhsQT);
              arrData.dsrSPrs= Number(data2[i].dsrSPrsQT);

              arrData.dsrBJhs= Number(data2[i].dsrBJhsQT);
              arrData.dsrBJrs= Number(data2[i].dsrBJrsQT);
            }

             // 完成率
            //  if(Number(arrData.dsrCShs)==0){
            //    arrData.dsrCSwcl="0%"
            //  }else{
            //    arrData.dsrCSwcl=((Number(arrData.dsrCShs) / ( Number(this.ZSJhs) + Number(arrData.dsrCShs)))*100).toFixed(3)+"%";
            //  }
             arrData.dsrCSwcl=""

            //  if(Number(arrData.dsrGShs)==0){
            //    arrData.dsrGSwcl="0%"
            //  }else{
            //    arrData.dsrGSwcl=((Number(arrData.dsrGShs) / ( Number(this.ZSJhs) + Number(arrData.dsrCShs)+Number(arrData.dsrGShs)))*100).toFixed(3)+"%";
            //  }
            arrData.dsrGSwcl=""

            //  if(Number(arrData.dsrSPhs)==0){
            //    arrData.dsrSPwcl="0%"
            //  }else{
            //    arrData.dsrSPwcl=((Number(arrData.dsrSPhs) / ( Number(this.ZSJhs) + Number(arrData.dsrCShs)+Number(arrData.dsrGShs)+Number(arrData.dsrSPhs)))*100).toFixed(3)+"%";
            //  }
            arrData.dsrSPwcl=""

            //  if(Number(arrData.dsrBJhs)==0){
            //    arrData.dsrBJwcl="0%"
            //  }else{
            //    arrData.dsrBJwcl=((Number(arrData.dsrBJhs) / ( Number(this.ZSJhs) + Number(arrData.dsrCShs)+Number(arrData.dsrGShs)+Number(arrData.dsrBJhs)+Number(arrData.dsrSPhs)))*100).toFixed(3)+"%";
            //  }
            arrData.dsrBJwcl=""

          // 低保边缘家庭
          if(data2[i].dbbyBJhsQZSQ==undefined){
              data2[i].dbbyBJhsQZSQ=0
            }
            if(data2[i].dbbyBJhsJDLK==undefined){
              data2[i].dbbyBJhsJDLK=0
            }
            if(data2[i].dbbyBJhsYLTS==undefined){
              data2[i].dbbyBJhsYLTS=0
            }
            if(data2[i].dbbyBJhsZDPC==undefined){
              data2[i].dbbyBJhsZDPC=0
            }
            if(data2[i].dbbyBJhsQT==undefined){
              data2[i].dbbyBJhsQT=0
            }

            if(data2[i].dbbyBJrsQZSQ==undefined){
              data2[i].dbbyBJrsQZSQ=0
            }
            if(data2[i].dbbyBJrsJDLK==undefined){
              data2[i].dbbyBJrsJDLK=0
            }
            if(data2[i].dbbyBJrsYLTS==undefined){
              data2[i].dbbyBJrsYLTS=0
            }
            if(data2[i].dbbyBJrsZDPC==undefined){
              data2[i].dbbyBJrsZDPC=0
            }
            if(data2[i].dbbyBJrsQT==undefined){
              data2[i].dbbyBJrsQT=0
            }
           

            arrData.dbbyBJhs = 0;
            arrData.dbbyBJrs = 0;
            // 低收入认定-低保边缘家庭-预警来源-筛选
            // 低保边缘家庭是从单人保家庭里面复制过来的，所以数据来源应该和单人保家庭的一样
            for(let key in this.show[0]){

              if(this.show[0][key] == true && key == "qz_show" ){

                arrData.dbbyBJhs += Number(data2[i].dbbyBJhsQZSQ);
                arrData.dbbyBJrs += Number(data2[i].dbbyBJrsQZSQ);
                
              }else if(this.show[0][key] == true && key == "jd_show" ){

                arrData.dbbyBJhs += Number(data2[i].dbbyBJhsJDLK);
                arrData.dbbyBJrs += Number(data2[i].dbbyBJrsJDLK);
                
              }else if(this.show[0][key] == true && key == "yb_show" ){

                arrData.dbbyBJhs += Number(data2[i].dbbyBJhsYLTS);
                arrData.dbbyBJrs += Number(data2[i].dbbyBJrsYLTS);
                
              }else if(this.show[0][key] == true && key == "zd_show" ){

                arrData.dbbyBJhs += Number(data2[i].dbbyBJhsZDPC);
                arrData.dbbyBJrs += Number(data2[i].dbbyBJrsZDPC);
                
              }else if(this.show[0][key] == true && key == "stw_show" ){


              }else if(this.show[0][key]==true && key=="sj_show" ){


              }else if(this.show[0][key]==true && key=="sd_show" ){


              }else if(this.show[0][key]==true && key=="zf_show" ){


              }else if(this.show[0][key]==true && key=="wj_show" ){


              }else if(this.show[0][key]==true && key=="xf_show" ){

              }
            }

            // 其他数据来源-低保边缘家庭
            if(this.OtherSources == true){
             
              arrData.dbbyBJhs= Number(data2[i].dbbyBJhsQT);
              arrData.dbbyBJrs= Number(data2[i].dbbyBJrsQT);

            }

            // 完成率
            //  if(Number(arrData.dbbyBJhs)==0){
            //    arrData.dbbyBJwcl="0%"
            //  }else{
            //    arrData.dbbyBJwcl=((Number(arrData.dbbyBJhs) / ( Number(this.ZSJhs) + Number(arrData.dbbySPhs)))*100).toFixed(3)+"%";
            //  }
            arrData.dbbyBJwcl=""

          // 支出型困难
            if(data2[i].zcpkCShsQZSQ==undefined){
              data2[i].zcpkCShsQZSQ=0
            }
            if(data2[i].zcpkCShsJDLK==undefined){
              data2[i].zcpkCShsJDLK=0
            }
            if(data2[i].zcpkCShsYLTS==undefined){
              data2[i].zcpkCShsYLTS=0
            }
            if(data2[i].zcpkCShsZDPC==undefined){
              data2[i].zcpkCShsZDPC=0
            }
            if(data2[i].zcpkCShsQT==undefined){
              data2[i].zcpkCShsQT=0
            }
           
        
            // if( data2[i].zcpkCShsQZSQ || data2[i].zcpkCShsJDLK ||  data2[i].zcpkCShsYLTS || data2[i].zcpkCShsZDPC || data2[i].zcpkCShsQT){

            //   arrData.zcpkCShs=Number(data2[i].zcpkCShsQZSQ) + Number(data2[i].zcpkCShsJDLK) + Number(data2[i].zcpkCShsYLTS) + Number(data2[i].zcpkCShsZDPC) 
            //   if(this.OtherSources==true){
            //     arrData.zcpkCShs = Number(data2[i].zcpkCShsQT)  
            //   }
            // }else{
            //   arrData.zcpkCShs=0
            // }

            if(data2[i].zcpkCSrsQZSQ==undefined){
              data2[i].zcpkCSrsQZSQ=0
            }
            if(data2[i].zcpkCSrsJDLK==undefined){
              data2[i].zcpkCSrsJDLK=0
            }
            if(data2[i].zcpkCSrsYLTS==undefined){
              data2[i].zcpkCSrsYLTS=0
            }
            if(data2[i].zcpkCSrsZDPC==undefined){
              data2[i].zcpkCSrsZDPC=0
            }
            if(data2[i].zcpkCSrsQT==undefined){
              data2[i].zcpkCSrsQT=0
            }
           
        
            // if( data2[i].zcpkCSrsQZSQ || data2[i].zcpkCSrsJDLK ||  data2[i].zcpkCSrsYLTS || data2[i].zcpkCSrsZDPC || data2[i].zcpkCSrsQT){

            //   arrData.zcpkCSrs=Number(data2[i].zcpkCSrsQZSQ) + Number(data2[i].zcpkCSrsJDLK) + Number(data2[i].zcpkCSrsYLTS) + Number(data2[i].zcpkCSrsZDPC)
            //   if(this.OtherSources==true){
            //     arrData.zcpkCSrs = Number(data2[i].zcpkCSrsQT)
            //   }
            // }else{
            //   arrData.zcpkCSrs=0
            // }

           
          // 公示
            if(data2[i].zcpkGShsQZSQ==undefined){
              data2[i].zcpkGShsQZSQ=0
            }
            if(data2[i].zcpkGShsJDLK==undefined){
              data2[i].zcpkGShsJDLK=0
            }
            if(data2[i].zcpkGShsYLTS==undefined){
              data2[i].zcpkGShsYLTS=0
            }
            if(data2[i].zcpkGShsZDPC==undefined){
              data2[i].zcpkGShsZDPC=0
            }
            if(data2[i].zcpkGShsQT==undefined){
              data2[i].zcpkGShsQT=0
            }
           
        
            // if( data2[i].zcpkGShsQZSQ || data2[i].zcpkGShsJDLK ||  data2[i].zcpkGShsYLTS || data2[i].zcpkGShsZDPC || data2[i].zcpkGShsQT){

            //   arrData.zcpkGShs=Number(data2[i].zcpkGShsQZSQ) + Number(data2[i].zcpkGShsJDLK) + Number(data2[i].zcpkGShsYLTS) + Number(data2[i].zcpkGShsZDPC)  
            //   if(this.OtherSources==true){
            //     arrData.zcpkGShs = Number(data2[i].zcpkGShsQT)
            //   }
            // }else{
            //   arrData.zcpkGShs=0
            // }

            if(data2[i].zcpkGSrsQZSQ==undefined){
              data2[i].zcpkGSrsQZSQ=0
            }
            if(data2[i].zcpkGSrsJDLK==undefined){
              data2[i].zcpkGSrsJDLK=0
            }
            if(data2[i].zcpkGSrsYLTS==undefined){
              data2[i].zcpkGSrsYLTS=0
            }
            if(data2[i].zcpkGSrsZDPC==undefined){
              data2[i].zcpkGSrsZDPC=0
            }
            if(data2[i].zcpkGSrsQT==undefined){
              data2[i].zcpkGSrsQT=0
            }
           
        
            // if( data2[i].zcpkGSrsQZSQ || data2[i].zcpkGSrsJDLK ||  data2[i].zcpkGSrsYLTS || data2[i].zcpkGSrsZDPC || data2[i].zcpkGSrsQT){

            //   arrData.zcpkGSrs=Number(data2[i].zcpkGSrsQZSQ) + Number(data2[i].zcpkGSrsJDLK) + Number(data2[i].zcpkGSrsYLTS) + Number(data2[i].zcpkGSrsZDPC)  
            //   if(this.OtherSources==true){
            //     arrData.zcpkGSrs = Number(data2[i].zcpkGSrsQT)
            //   }
            // }else{
            //   arrData.zcpkGSrs=0
            // }
          // 审批
            if(data2[i].zcpkSPhsQZSQ==undefined){
              data2[i].zcpkSPhsQZSQ=0
            }
            if(data2[i].zcpkSPhsJDLK==undefined){
              data2[i].zcpkSPhsJDLK=0
            }
            if(data2[i].zcpkSPhsYLTS==undefined){
              data2[i].zcpkSPhsYLTS=0
            }
            if(data2[i].zcpkSPhsZDPC==undefined){
              data2[i].zcpkSPhsZDPC=0
            }
            if(data2[i].zcpkSPhsQT==undefined){
              data2[i].zcpkSPhsQT=0
            }
           
        
            // if( data2[i].zcpkSPhsQZSQ || data2[i].zcpkSPhsJDLK ||  data2[i].zcpkSPhsYLTS || data2[i].zcpkSPhsZDPC || data2[i].zcpkSPhsQT){

            //   arrData.zcpkSPhs=Number(data2[i].zcpkSPhsQZSQ) + Number(data2[i].zcpkSPhsJDLK) + Number(data2[i].zcpkSPhsYLTS) + Number(data2[i].zcpkSPhsZDPC) + Number(data2[i].zcpkSPhsQT)
            //   if(this.OtherSources==true){
            //     arrData.zcpkSPhs = Number(data2[i].zcpkSPhsQT)
            //   }
            // }else{
            //   arrData.zcpkSPhs=0
            // }

            if(data2[i].zcpkSPrsQZSQ==undefined){
              data2[i].zcpkSPrsQZSQ=0
            }
            if(data2[i].zcpkSPrsJDLK==undefined){
              data2[i].zcpkSPrsJDLK=0
            }
            if(data2[i].zcpkSPrsYLTS==undefined){
              data2[i].zcpkSPrsYLTS=0
            }
            if(data2[i].zcpkSPrsZDPC==undefined){
              data2[i].zcpkSPrsZDPC=0
            }
            if(data2[i].zcpkSPrsQT==undefined){
              data2[i].zcpkSPrsQT=0
            }
           
        
            // if( data2[i].zcpkSPrsQZSQ || data2[i].zcpkSPrsJDLK ||  data2[i].zcpkSPrsYLTS || data2[i].zcpkSPrsZDPC || data2[i].zcpkSPrsQT){

            //   arrData.zcpkSPrs=Number(data2[i].zcpkSPrsQZSQ) + Number(data2[i].zcpkSPrsJDLK) + Number(data2[i].zcpkSPrsYLTS) + Number(data2[i].zcpkSPrsZDPC) 
            //   if(this.OtherSources==true){
            //     arrData.zcpkSPrs = Number(data2[i].zcpkSPrsQT)
            //   }
            // }else{
            //   arrData.zcpkSPrs=0
            // }
            // 办结
            if(data2[i].zcpkBJhsQZSQ==undefined){
              data2[i].zcpkBJhsQZSQ=0
            }
            if(data2[i].zcpkBJhsJDLK==undefined){
              data2[i].zcpkBJhsJDLK=0
            }
            if(data2[i].zcpkBJhsYLTS==undefined){
              data2[i].zcpkBJhsYLTS=0
            }
            if(data2[i].zcpkBJhsZDPC==undefined){
              data2[i].zcpkBJhsZDPC=0
            }
            if(data2[i].zcpkBJhsQT==undefined){
              data2[i].zcpkBJhsQT=0
            }
           
        
            // if( data2[i].zcpkBJhsQZSQ || data2[i].zcpkBJhsJDLK ||  data2[i].zcpkBJhsYLTS || data2[i].zcpkBJhsZDPC || data2[i].zcpkBJhsQT){

            //   arrData.zcpkBJhs=Number(data2[i].zcpkBJhsQZSQ) + Number(data2[i].zcpkBJhsJDLK) + Number(data2[i].zcpkBJhsYLTS) + Number(data2[i].zcpkBJhsZDPC)
            //   if(this.OtherSources==true){
            //     arrData.zcpkBJhs = Number(data2[i].zcpkBJhsQT)
            //   }
            // }else{
            //   arrData.zcpkBJhs=0
            // }

            if(data2[i].zcpkBJrsQZSQ==undefined){
              data2[i].zcpkBJrsQZSQ=0
            }
            if(data2[i].zcpkBJrsJDLK==undefined){
              data2[i].zcpkBJrsJDLK=0
            }
            if(data2[i].zcpkBJrsYLTS==undefined){
              data2[i].zcpkBJrsYLTS=0
            }
            if(data2[i].zcpkBJrsZDPC==undefined){
              data2[i].zcpkBJrsZDPC=0
            }
            if(data2[i].zcpkBJrsQT==undefined){
              data2[i].zcpkBJrsQT=0
            }
           
        
            // if( data2[i].zcpkBJrsQZSQ || data2[i].zcpkBJrsJDLK ||  data2[i].zcpkBJrsYLTS || data2[i].zcpkBJrsZDPC || data2[i].zcpkBJrsQT){

            //   arrData.zcpkBJrs=Number(data2[i].zcpkBJrsQZSQ) + Number(data2[i].zcpkBJrsJDLK) + Number(data2[i].zcpkBJrsYLTS) + Number(data2[i].zcpkBJrsZDPC) 
            //   if(this.OtherSources==true){
            //     arrData.zcpkBJrs = Number(data2[i].zcpkBJrsQT)
            //   }
            // }else{
            //   arrData.zcpkBJrs=0
            // }

              arrData.zcpkCShs = 0;
              arrData.zcpkCSrs = 0;
              
              arrData.zcpkGShs = 0;
              arrData.zcpkGSrs = 0;
              
              arrData.zcpkSPhs = 0;
              arrData.zcpkSPrs = 0;
              
              arrData.zcpkBJhs = 0;
              arrData.zcpkBJrs = 0;

            //低收入认定-支出困难家庭-预警来源-筛选
            for(let key in this.show[0]){

              if(this.show[0][key] == true && key == "qz_show" ){

                arrData.zcpkCShs += Number(data2[i].zcpkCShsQZSQ);
                arrData.zcpkCSrs += Number(data2[i].zcpkCSrsQZSQ);
                
                arrData.zcpkGShs += Number(data2[i].zcpkGShsQZSQ);
                arrData.zcpkGSrs += Number(data2[i].zcpkGSrsQZSQ);
                
                arrData.zcpkSPhs += Number(data2[i].zcpkSPhsQZSQ);
                arrData.zcpkSPrs += Number(data2[i].zcpkSPrsQZSQ);
                
                arrData.zcpkBJhs += Number(data2[i].zcpkBJhsQZSQ);
                arrData.zcpkBJrs += Number(data2[i].zcpkBJrsQZSQ);
                
              }else if(this.show[0][key] == true && key == "jd_show" ){

                arrData.zcpkCShs += Number(data2[i].zcpkCShsJDLK);
                arrData.zcpkCSrs += Number(data2[i].zcpkCSrsJDLK);
                
                arrData.zcpkGShs += Number(data2[i].zcpkGShsJDLK);
                arrData.zcpkGSrs += Number(data2[i].zcpkGSrsJDLK);
                
                arrData.zcpkSPhs += Number(data2[i].zcpkSPhsJDLK);
                arrData.zcpkSPrs += Number(data2[i].zcpkSPrsJDLK);
                
                arrData.zcpkBJhs += Number(data2[i].zcpkBJhsJDLK);
                arrData.zcpkBJrs += Number(data2[i].zcpkBJrsJDLK);
                
              }else if(this.show[0][key] == true && key == "yb_show" ){

                arrData.zcpkCShs += Number(data2[i].zcpkCShsYLTS);
                arrData.zcpkCSrs += Number(data2[i].zcpkCSrsYLTS);
                
                arrData.zcpkGShs += Number(data2[i].zcpkGShsYLTS);
                arrData.zcpkGSrs += Number(data2[i].zcpkGSrsYLTS);
                
                arrData.zcpkSPhs += Number(data2[i].zcpkSPhsYLTS);
                arrData.zcpkSPrs += Number(data2[i].zcpkSPrsYLTS);
                
                arrData.zcpkBJhs += Number(data2[i].zcpkBJhsYLTS);
                arrData.zcpkBJrs += Number(data2[i].zcpkBJrsYLTS);
                
              }else if(this.show[0][key] == true && key == "zd_show" ){

                arrData.zcpkCShs += Number(data2[i].zcpkCShsZDPC);
                arrData.zcpkCSrs += Number(data2[i].zcpkCSrsZDPC);
                
                arrData.zcpkGShs += Number(data2[i].zcpkGShsZDPC);
                arrData.zcpkGSrs += Number(data2[i].zcpkGSrsZDPC);
                
                arrData.zcpkSPhs += Number(data2[i].zcpkSPhsZDPC);
                arrData.zcpkSPrs += Number(data2[i].zcpkSPrsZDPC);
                
                arrData.zcpkBJhs += Number(data2[i].zcpkBJhsZDPC);
                arrData.zcpkBJrs += Number(data2[i].zcpkBJrsZDPC);
                
              }else if(this.show[0][key] == true && key == "stw_show" ){


              }else if(this.show[0][key]==true && key=="sj_show" ){


              }else if(this.show[0][key]==true && key=="sd_show" ){


              }else if(this.show[0][key]==true && key=="zf_show" ){


              }else if(this.show[0][key]==true && key=="wj_show" ){


              }else if(this.show[0][key]==true && key=="xf_show" ){

              }
            }

            // 其他数据来源-支出困难家庭
            if(this.OtherSources == true){
              arrData.zcpkCShs= Number(data2[i].zcpkCShsQT);
              arrData.zcpkCSrs= Number(data2[i].zcpkCSrsQT);

              arrData.zcpkGShs= Number(data2[i].zcpkGShsQT);
              arrData.zcpkGSrs= Number(data2[i].zcpkGSrsQT);

              arrData.zcpkSPhs= Number(data2[i].zcpkSPhsQT);
              arrData.zcpkSPrs= Number(data2[i].zcpkSPrsQT);

              arrData.zcpkBJhs= Number(data2[i].zcpkBJhsQT);
              arrData.zcpkBJrs= Number(data2[i].zcpkBJrsQT);
            }


            
            // 完成率
            // if(Number(arrData.zcpkCShs)==0){
            //   arrData.zcpkCSwcl="0%"
            // }else{
            //   arrData.zcpkCSwcl=((Number(arrData.zcpkCShs) / ( Number(this.ZSJhs) + Number(arrData.zcpkCShs)))*100).toFixed(3)+"%";
            // }
            arrData.zcpkCSwcl=""

            // if(Number(arrData.zcpkGShs)==0){
            //   arrData.zcpkGSwcl="0%"
            // }else{
            //   arrData.zcpkGSwcl=((Number(arrData.zcpkGShs) / ( Number(this.ZSJhs) + Number(arrData.zcpkCShs)+Number(arrData.zcpkGShs)))*100).toFixed(3)+"%";
            // }
            arrData.zcpkGSwcl=""

            // if(Number(arrData.zcpkSPhs)==0){
            //   arrData.zcpkSPwcl="0%"
            // }else{
            //   arrData.zcpkSPwcl=((Number(arrData.zcpkSPhs) / ( Number(this.ZSJhs) + Number(arrData.zcpkCShs)+Number(arrData.zcpkGShs)+Number(arrData.zcpkSPhs)))*100).toFixed(3)+"%";
            // }
             arrData.zcpkSPwcl=""

            // if(Number(arrData.zcpkBJhs)==0){
            //   arrData.zcpkBJwcl="0%"
            // }else{
            //   arrData.zcpkBJwcl=((Number(arrData.zcpkBJhs) / ( Number(this.ZSJhs) + Number(arrData.zcpkCShs)+Number(arrData.zcpkGShs)+Number(arrData.zcpkBJhs)+Number(arrData.zcpkSPhs)))*100).toFixed(3)+"%";
            // }
            arrData.zcpkBJwcl=""

          
            // 总办结
            var ZBJhs= arrData.dbBJhsahb + arrData.dbBJhsarb + arrData.tkBJhs + arrData.dsrBJhs + arrData.dbbyBJhs + arrData.zcpkBJhs ;
            var ZBJrs= arrData.dbBJrsahb + arrData.dbBJrsarb + arrData.tkBJrs + arrData.dsrBJrs + arrData.dbbyBJrs + arrData.zcpkBJrs ;
            
            arrData.hjnrHs=ZBJhs
            arrData.hjnrRs=ZBJrs

          

            // 合计纳入
            this.tableData.push(arrData)
            arrData={}

          }
          

          data2= this.tableData
          for(let key in this.initialize){
            this.zonghui[key]=this.initialize[key]
          }
          this.zonghui.ab_ex161="总汇";
          this.zonghui.ab_ex2="[街道总汇]";

          //总汇 
          for(let i in data2 ){
            this.zonghui.qzsqHs+=data2[i].qzsqHs;
            this.zonghui.qzsqRs+=data2[i].qzsqRs;
            this.zonghui.btgHs+=data2[i].btgHs;
            this.zonghui.btgRs+=data2[i].btgRs;
            this.zonghui.jdlkShengBiaoHs+=data2[i].jdlkShengBiaoHs;
            this.zonghui.jdlkShengBiaoRs+=data2[i].jdlkShengBiaoRs;
            this.zonghui.jdlkShiBiaoHs+=data2[i].jdlkShiBiaoHs;
            this.zonghui.jdlkShiBiaoRs+=data2[i].jdlkShiBiaoRs;
            this.zonghui.ybyjHs+=data2[i].ybyjHs;
            this.zonghui.ybyjRs+=data2[i].ybyjRs;
            this.zonghui.zdpcHs+=data2[i].zdpcHs;
            this.zonghui.zdpcRs+=data2[i].zdpcRs;
            this.zonghui.tswHs+=data2[i].tswHs;
            this.zonghui.tswRs+=data2[i].tswRs;
            this.zonghui.sjyjHs+=data2[i].sjyjHs;
            this.zonghui.sjyjRs+=data2[i].sjyjRs;
            this.zonghui.sdyjHs+=data2[i].sdyjHs;
            this.zonghui.sdyjRs+=data2[i].sdyjRs;
            this.zonghui.zfyjHs+=data2[i].zfyjHs;
            this.zonghui.zfyjRs+=data2[i].zfyjRs;
            this.zonghui.wjyjHs+=data2[i].wjyjHs;
            this.zonghui.wjyjRs+=data2[i].wjyjRs;
            this.zonghui.xfyjHs+=data2[i].xfyjHs;
            this.zonghui.xfyjRs+=data2[i].xfyjRs;
            this.zonghui.wcpdHs+=data2[i].wcpdHs;


            // this.zonghui.wcpdWcl+=Number(data2[i].wcpdWcl).toFixed(3);

            this.zonghui.wcpdRs+=data2[i].wcpdRs;
            this.zonghui.rhhcHs+=data2[i].rhhcHs;

            this.zonghui.rhhcRs+=data2[i].rhhcRs;
            this.zonghui.jjhdHs+=data2[i].jjhdHs;
            this.zonghui.jjhdRs+=data2[i].jjhdRs;
            // this.zonghui.jjhdWcl=data2[i].jjhdWcl;

            // 总汇-低收入认定
            this.zonghui.dbCShsahb += data2[i].dbCShsahb;
            this.zonghui.dbCSrsahb += data2[i].dbCSrsahb;
            this.zonghui.dbGShsahb += data2[i].dbGShsahb;
            this.zonghui.dbGSrsahb += data2[i].dbGSrsahb;
            this.zonghui.dbSPhsahb += data2[i].dbSPhsahb;
            this.zonghui.dbSPrsahb += data2[i].dbSPrsahb;
            this.zonghui.dbBJhsahb += data2[i].dbBJhsahb;
            this.zonghui.dbBJrsahb += data2[i].dbBJrsahb;
           
            this.zonghui.dbCShsarb += data2[i].dbCShsarb;
            this.zonghui.dbCSrsarb += data2[i].dbCSrsarb;
            this.zonghui.dbGShsarb += data2[i].dbGShsarb;
            this.zonghui.dbGSrsarb += data2[i].dbGSrsarb;
            this.zonghui.dbSPhsarb += data2[i].dbSPhsarb;
            this.zonghui.dbSPrsarb += data2[i].dbSPrsarb;
            this.zonghui.dbBJhsarb += data2[i].dbBJhsarb;
            this.zonghui.dbBJrsarb += data2[i].dbBJrsarb;
            // this.zonghui.dbBJrsarb += data2[i].dbBJrsarb;

            this.zonghui.tkCShs += data2[i].tkCShs;
            this.zonghui.tkCSrs += data2[i].tkCSrs;
            this.zonghui.tkGShs += data2[i].tkGShs;
            this.zonghui.tkGSrs += data2[i].tkGSrs;
            this.zonghui.tkSPhs += data2[i].tkSPhs;
            this.zonghui.tkSPrs += data2[i].tkSPrs;
            this.zonghui.tkBJhs += data2[i].tkBJhs;
            this.zonghui.tkBJrs += data2[i].tkBJrs;

            this.zonghui.dsrCShs += data2[i].dsrCShs;
            this.zonghui.dsrCSrs += data2[i].dsrCSrs;
            this.zonghui.dsrGShs += data2[i].dsrGShs;
            this.zonghui.dsrGSrs += data2[i].dsrGSrs;
            this.zonghui.dsrSPhs += data2[i].dsrSPhs;
            this.zonghui.dsrSPrs += data2[i].dsrSPrs;
            this.zonghui.dsrBJhs += data2[i].dsrBJhs;
            this.zonghui.dsrBJrs += data2[i].dsrBJrs;
              
            this.zonghui.zcpkCShs += data2[i].zcpkCShs;
            this.zonghui.zcpkCSrs += data2[i].zcpkCSrs;
            this.zonghui.zcpkGShs += data2[i].zcpkGShs;
            this.zonghui.zcpkGSrs += data2[i].zcpkGSrs;
            this.zonghui.zcpkSPhs += data2[i].zcpkSPhs;
            this.zonghui.zcpkSPrs += data2[i].zcpkSPrs;
            this.zonghui.zcpkBJhs += data2[i].zcpkBJhs;
            this.zonghui.zcpkBJrs += data2[i].zcpkBJrs;
          
            this.zonghui.dbbyBJhs += data2[i].dbbyBJhs;
            this.zonghui.dbbyBJrs += data2[i].dbbyBJrs;
              
            // 总汇- 合计纳入


            // 总汇- 低收入认定退回
           }
           // 总办结
            var ZBJhs= this.zonghui.dbBJhsahb + this.zonghui.dbBJhsarb + this.zonghui.tkBJhs + this.zonghui.dsrBJhs + this.zonghui.dbbyBJhs + this.zonghui.zcpkBJhs ;
            var ZBJrs= this.zonghui.dbBJrsahb + this.zonghui.dbBJrsarb + this.zonghui.tkBJrs + this.zonghui.dsrBJrs + this.zonghui.dbbyBJrs + this.zonghui.zcpkBJrs ;
            
            this.zonghui.hjnrHs=ZBJhs
            this.zonghui.hjnrRs=ZBJrs
            
            
            var ZSQhs_=0 //总人数
            console.log(this.show,"总汇show");

            for(let key in this.show[0]){

              if(this.show[0][key]==true && key=="qz_show" ){

                ZSQhs_ += Number(this.zonghui.qzsqHs);
                console.log(Number(this.zonghui.qzsqHs));

              }else if(this.show[0][key]==true && key=="jd_show" ){

                ZSQhs_ += Number(this.zonghui.jdlkShengBiaoHs)+Number(this.zonghui.jdlkShiBiaoHs);
                console.log(Number(this.zonghui.jdlkShengBiaoHs),Number(this.zonghui.jdlkShiBiaoHs));

              }else if(this.show[0][key]==true && key=="yb_show" ){

                ZSQhs_ += Number(this.zonghui.ybyjHs);
               console.log( Number(this.zonghui.ybyjHs));

              }else if(this.show[0][key]==true && key=="zd_show" ){

                ZSQhs_ += Number(this.zonghui.zdpcHs);
                console.log(Number(this.zonghui.zdpcHs));

              }else if(this.show[0][key]==true && key=="stw_show" ){

                ZSQhs_ += Number(this.zonghui.tswHs);
                console.log(Number(this.zonghui.tswHs));

              }else if(this.show[0][key]==true && key=="sj_show" ){

                ZSQhs_ += Number(this.zonghui.sjyjHs);
                console.log(Number(this.zonghui.sjyjHs));

              }else if(this.show[0][key]==true && key=="sd_show" ){

                ZSQhs_ += Number(this.zonghui.sdyjHs)
                console.log(Number(this.zonghui.sdyjHs));
               

              }else if(this.show[0][key]==true && key=="zf_show" ){

                ZSQhs_ += Number(this.zonghui.zfyjHs)
                

              }else if(this.show[0][key]==true && key=="wj_show" ){

                ZSQhs_ += Number(this.zonghui.wjyjHs)
                

              }else if(this.show[0][key]==true && key=="xf_show" ){

                ZSQhs_ += Number(this.zonghui.xfyjHs)
               
              }
            }
            console.log(ZSQhs_);
           
          // if(Number(this.zonghui.wcpdHs)==0){
          //   this.zonghui.wcpdWcl = "0%"
          //  }else{
          //    this.zonghui.wcpdWcl = Number((this.zonghui.wcpdHs/ZSQhs_)*100).toFixed(3)+"%"
          //  }
          this.zonghui.wcpdWcl = ""

          //  if(Number(this.zonghui.rhhcHs)==0){
          //     this.zonghui.rhhcWcl = "0%"
          //  }else{
          //    this.zonghui.rhhcWcl= Number((this.zonghui.rhhcHs/ZSQhs_)*100).toFixed(3)+"%"
          //  }
          this.zonghui.rhhcWcl = ""

          // if(Number(this.zonghui.jjhdHs)==0){
          //     this.zonghui.jjhdWcl = "0%"
          //  }else{
          //    this.zonghui.jjhdWcl= Number((this.zonghui.jjhdHs/ZSQhs_)*100).toFixed(3)+"%"
          //  }
          this.zonghui.jjhdWcl = ""

          // console.log(data2.length,"data2.length");
          // console.log(wcpdWcl,"wcpdWcl");
          console.log(this.zonghui.wcpdWcl,"this.zonghui.wcpdWcl");
          this.tableData.unshift(this.zonghui)
          console.log("this.zonghui.jjhdHs:"+this.zonghui.jjhdHs);

          // console.log(this.tableData);
          this.getSpanArr(this.tableData,"ab_ex161")
         
         console.log(this.tableData,"数据");
        //  var tableData = this.tableData //没用-赋0的空数据也会被替换
          // 空格填充
          // for(let i in tableData){
          //   // console.log(tableData[i],'tableData['+i+']');
          //   for(let key in  tableData[i]){

          //     if(tableData[i][key]==""){
          //       // console.log("数据为空");
          //       tableData[i][key]='N/A'
          //     }

          //   }
          // }
          
        })
        
        
      },


      // 预警信息子标签显示
      filterChange(filterObj){
        console.log(filterObj);
        console.log(filterObj.date);
        console.log(filterObj.date.length);
        if(filterObj.date.length>0&&filterObj.date.length<10){
          // 每次筛选，先都关闭
          for(let key in this.show[0]){
            this.show[0][key]=false
            
          }
          console.log(this.show,"全部关闭");
          // 然后进行筛选内容进行展示
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

        this.loadData()
        console.log();
      },
    

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
        console.log(Object.values(groups));   //
        console.log(groups);
        console.log(Object.keys(groups)) // Object.keys(groups) 将对象的键值放到一个数组里

        let cityNameArr=Object.keys(groups)
        var data=[]
        var data2=[]
        for(let i in Object.values(groups)){
          data[i]=Object.values(groups)[i]
        }
        for(let i in Object.values(groups)){
          data2[i]=Object.values(groups)[i]
        }
       
        // this.sum.ab_ex161="区县"
        for(let i in data){

          if(cityNameArr[i]!='"'+ "总汇"+'"'){
             for( let key in  this.initialize){
              this.sum[key]=this.initialize[key]
            }
            this.sum.ab_ex2="合计"
            this.sum.ab_ex161=data[i][0].ab_ex161
            console.log(data[i][0]);
            console.log(this.sum);
            data2[i].unshift(this.sum)
            

            for(let j in data[i]){
              this.sum.qzsqHs += data[i][j].qzsqHs;
              this.sum.qzsqRs += data[i][j].qzsqRs;
              this.sum.jdlkShengBiaoHs += data[i][j].jdlkShengBiaoHs;
              this.sum.jdlkShengBiaoRs += data[i][j].jdlkShengBiaoRs;
              this.sum.jdlkShiBiaoHs += data[i][j].jdlkShiBiaoHs;
              this.sum.jdlkShiBiaoRs += data[i][j].jdlkShiBiaoRs;
              this.sum.ybyjHs += data[i][j].ybyjHs;
              this.sum.ybyjRs += data[i][j].ybyjRs;
              this.sum.zdpcHs += data[i][j].zdpcHs;
              this.sum.zdpcRs += data[i][j].zdpcRs;
              this.sum.tswHs += data[i][j].tswHs;
              this.sum.tswRs += data[i][j].tswRs;
              this.sum.sjyjHs += data[i][j].sjyjHs;
              this.sum.sjyjRs += data[i][j].sjyjRs;
              this.sum.sdyjHs += data[i][j].sdyjHs;
              this.sum.sdyjRs += data[i][j].sdyjRs;
              this.sum.zfyjHs += data[i][j].zfyjHs;
              this.sum.zfyjRs += data[i][j].zfyjRs;
              this.sum.wjyjHs += data[i][j].wjyjHs;
              this.sum.wjyjRs += data[i][j].wjyjRs;
              this.sum.xfyjHs += data[i][j].xfyjHs;
              this.sum.xfyjRs += data[i][j].xfyjRs;
              this.sum.wcpdHs += data[i][j].wcpdHs;


              // this.sum.wcpdWcl += Number(data[i][j].wcpdWcl).toFixed(3);

              this.sum.wcpdRs += data[i][j].wcpdRs;
              this.sum.rhhcHs += data[i][j].rhhcHs;
              this.sum.rhhcRs += data[i][j].rhhcRs;
              this.sum.jjhdHs += data[i][j].jjhdHs;
              this.sum.jjhdRs += data[i][j].jjhdRs;
              // this.sum.jjhdWcl += data[i][j].jjhdWcl;

              // 总汇
              this.sum.dbCShsahb += data[i][j].dbCShsahb;
              this.sum.dbCSrsahb += data[i][j].dbCSrsahb;
              this.sum.dbGShsahb += data[i][j].dbGShsahb;
              this.sum.dbGSrsahb += data[i][j].dbGSrsahb;
              this.sum.dbSPhsahb += data[i][j].dbSPhsahb;
              this.sum.dbSPrsahb += data[i][j].dbSPrsahb;
              this.sum.dbBJhsahb += data[i][j].dbBJhsahb;
              this.sum.dbBJrsahb += data[i][j].dbBJrsahb;
             
              this.sum.dbCShsarb += data[i][j].dbCShsarb;
              this.sum.dbCSrsarb += data[i][j].dbCSrsarb;
              this.sum.dbGShsarb += data[i][j].dbGShsarb;
              this.sum.dbGSrsarb += data[i][j].dbGSrsarb;
              this.sum.dbSPhsarb += data[i][j].dbSPhsarb;
              this.sum.dbSPrsarb += data[i][j].dbSPrsarb;
              this.sum.dbBJhsarb += data[i][j].dbBJhsarb;
              this.sum.dbBJrsarb += data[i][j].dbBJrsarb;

              this.sum.tkCShs += data[i][j].tkCShs;
              this.sum.tkCSrs += data[i][j].tkCSrs;
              this.sum.tkGShs += data[i][j].tkGShs;
              this.sum.tkGSrs += data[i][j].tkGSrs;
              this.sum.tkSPhs += data[i][j].tkSPhs;
              this.sum.tkSPrs += data[i][j].tkSPrs;
              this.sum.tkBJhs += data[i][j].tkBJhs;
              this.sum.tkBJrs += data[i][j].tkBJrs;

              this.sum.dsrCShs += data[i][j].dsrCShs;
              this.sum.dsrCSrs += data[i][j].dsrCSrs;
              this.sum.dsrGShs += data[i][j].dsrGShs;
              this.sum.dsrGSrs += data[i][j].dsrGSrs;
              this.sum.dsrSPhs += data[i][j].dsrSPhs;
              this.sum.dsrSPrs += data[i][j].dsrSPrs;
              this.sum.dsrBJhs += data[i][j].dsrBJhs;
              this.sum.dsrBJrs += data[i][j].dsrBJrs;
                
              this.sum.zcpkCShs += data[i][j].zcpkCShs;
              this.sum.zcpkCSrs += data[i][j].zcpkCSrs;
              this.sum.zcpkGShs += data[i][j].zcpkGShs;
              this.sum.zcpkGSrs += data[i][j].zcpkGSrs;
              this.sum.zcpkSPhs += data[i][j].zcpkSPhs;
              this.sum.zcpkSPrs += data[i][j].zcpkSPrs;
              this.sum.zcpkBJhs += data[i][j].zcpkBJhs;
              this.sum.zcpkBJrs += data[i][j].zcpkBJrs;

              this.sum.dbbyBJhs += data[i][j].dbbyBJhs;
              this.sum.dbbyBJrs += data[i][j].dbbyBJrs;

              // 不通过
              this.sum.btgHs += data2[i][j].btgHs;
              this.sum.btgRs += data2[i][j].btgRs;

            }
              // 合计纳入

              this.sum.hjnrHs = this.sum.dbbyBJhs + this.sum.zcpkBJhs + this.sum.dsrBJhs + this.sum.tkBJhs + this.sum.dbBJhsarb + this.sum.dbBJhsahb;
              this.sum.hjnrRs = this.sum.dbbyBJrs + this.sum.zcpkBJrs + this.sum.dsrBJrs + this.sum.tkBJrs + this.sum.dbBJrsarb + this.sum.dbBJrsahb;

            this.sum={}
          }
          console.log(data2[i]);
        }
      
        return data2
        // return Object.values(groups)
      },

      // 写一个getSpanArr(data,params)方法 ：构造一个SpanArr数组赋予rowspan，即控制行合并
      getSpanArr(data,params){
        let arr = [] ; //--接收重构数组
        let pos = 0  ;  //--设置索引
        this.spanArr = [] ; //--控制合并的数组


        this.groupBy(this.tableData, 'ab_ex161').map(v => (arr = arr.concat(v))); //将groupby()处理好的数据再次用arr进行处理：连接所有数组成员为一个新数组
       
        console.log("arr",arr);

        // 更新展示数据，防止之前的方法有拼接、插入等，导致数据重复
        this.tableData=[]

        // -------------*很重要*--------------------------------------
        this.tableData=arr   //将排序好的数据重新赋给tableData进行显示，没有这一步数据就会乱
        // -------------*很重要*--------------------------------------

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
            '泰州市民政局社会救助任务进度表-'+this.tableTime+'.xlsx'
            )
        } catch (e) {
            if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      },

    

      //打印页面内容
	    // printTable(){
	    //   let wpt = document.querySelector('#mytable');
	    //   let newContent = wpt.innerHTML;
	    //   let oldContent = document.body.innerHTML;
	    //   document.body.innerHTML = newContent;
	    //   window.print(); //打印方法
	    //   // window.localtion.reload();
	    //   history.go(0)
	    //   document.body.innerHTML = oldContent;
	    // },
    
      // 调用接口获取数据
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
.table_nav>.el-tabs__header{
  margin: 0;
}

.oneTh1 .el-table__header th
{
  font-size: 0.75rem;
}
.oneTh1 tbody > tr:nth-child(1) {
  background-color: rgb(223, 227, 240);
  font-size: 0.75rem !important;
  font-weight: 600;
}
.el-header, .el-footer {
    color: #333;
    text-align: center;
    line-height: 40px;
    font-size: 30px;
  }
.table_time{
  border:0 ;
}
.table_time>.el-input__inner{
  cursor: pointer!important;
  border:0px ;
}
</style>
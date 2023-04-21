<!--不知道有啥用的页面,没有被启用，强迫症可以删 -->
<template>
    <div class="g-box">
      
       <el-dialog
            title="城乡低保按人保查看"
            :visible.sync="centerDialogVisible"
            width="80%"
            center >
        <dbListView style="height:60vh;" />
        </el-dialog>

        <el-dialog
                title="城乡低保编辑"
                :visible.sync="centerDialogVisible2"
                width="80%"
                height="100px"
                center
                :close="Fun">
            <addEditDibao style="height:60vh;" @closeView="closedbListView"/>
        </el-dialog>

        <div class="search">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="申请人姓名" >
                    <el-input v-model="formInline.user" placeholder="申请人姓名" style="width:160px;"></el-input>
                </el-form-item>
                <el-form-item label="身份证号码" >
                    <el-input  placeholder="身份证号码" style="width:160px;"></el-input>
                </el-form-item>
                <el-form-item label="户口性质" >
                    <el-select  placeholder="户口性质" style="width:160px;">
                    <el-option label="农业户口" value="农业户口"></el-option>
                    <el-option label="非农业户口" value="非农业户口"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="建档立卡" >
                    <el-select  placeholder="建档立卡" style="width:160px;">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                    </el-select>
                </el-form-item>
                
                <el-form-item label="残疾人补贴" style="width:270px;">
                    <el-select  placeholder="残疾人补贴" style="width:160px;">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="行政区划" >
                    <el-select  placeholder="行政区划" style="width:160px;">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="海陵区" value="海陵区"></el-option>
                    <el-option label="高港区" value="高港区"></el-option>
                    <el-option label="姜堰区" value="姜堰区"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="queryListByCriteria" icon="el-icon-search">查询</el-button>
					<el-button type="info" @click="resetQuery" icon="el-icon-refresh">重置</el-button>
                </el-form-item>
                
            </el-form>
        </div>
        <br>
        <div class="type">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="申请" name="first" >
                    <div class="g-box">
                                
                                <div class="umc-filter clearfix">

                                    <el-table
                                        :data="tableData"
                                        border
                                        style="width: 100%">
                                        <el-table-column
                                        type="selection"
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        
                                        prop="ab_ex2"
                                        label="行政区划"
                                        width="150">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex3"
                                        label="申请人姓名"
                                        width="120">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex7"
                                        label="身份证号码"
                                        width="180">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex8"
                                        label="家庭人口"
                                        width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex6"
                                        label="户口性质"
                                        width="100">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex10"
                                        label="建档立卡"
                                        width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex13"
                                        label="已享受救助"
                                        width="120">
                                        </el-table-column>

                                        <el-table-column
                                        prop="ab_ex46"
                                        label="求助原因"
                                        width="220">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex15"
                                        label="核对状态"
                                        width="120">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_dat14"
                                        label="申请时间"
                                        width="120">
                                        </el-table-column>

                                        <el-table-column fixed="right" align="left" label="操作" width="350">
                                        <template  >
                                            <el-button-group>
                                                <el-button type="primary" size="small" @click="centerDialogVisible = true">查看</el-button>
                                                <el-button type="primary" size="small" @click="centerDialogVisible2 = true">编辑</el-button>
                                                <el-button type="danger" size="small">提交委托确认</el-button>
                                                <el-button type="danger" size="small">退回</el-button>
                                            </el-button-group>
                                        </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                    </div>
                </el-tab-pane>

                

                <el-tab-pane label="退回" name="second">
                    <div class="g-box">
                                
                                <div class="umc-filter clearfix">

                                    <el-table
                                        :data="tableData"
                                        border
                                        style="width: 100%">
                                        <el-table-column
                                        type="selection"
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        
                                        prop="ab_ex2"
                                        label="行政区划"
                                        width="150">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex3"
                                        label="申请人姓名"
                                        width="120">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex7"
                                        label="身份证号码"
                                        width="180">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex8"
                                        label="家庭人口"
                                        width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex6"
                                        label="户口性质"
                                        width="100">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex10"
                                        label="建档立卡"
                                        width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex13"
                                        label="已享受救助"
                                        width="120">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex47"
                                        label="低保类型"
                                        width="140">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex15"
                                        label="核对状态"
                                        width="120">
                                        </el-table-column>
                                         <el-table-column
                                        prop="ab_ex16"
                                        label="退回原因"
                                        width="220">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_dat14"
                                        label="退回时间"
                                        width="120">
                                        </el-table-column>

                                        <el-table-column fixed="right" align="left" label="操作" width="450">
                                        <template  >
                                            <el-button-group>
                                                <el-button type="primary" size="small" @click="centerDialogVisible = true">查看</el-button>
                                                <el-button type="primary" size="small">撤回</el-button>
                                                <el-button type="primary" size="small">核对反馈</el-button>
                                                <el-button type="primary" size="small">打印不予受理通知书</el-button>
                                                <el-button type="danger" size="small">删除</el-button>
                                            </el-button-group>
                                        </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="委托确认" name="third">
                    <div class="g-box">
                                
                               <div class="umc-filter clearfix">

                                    <el-table
                                        :data="tableData"
                                        border
                                        style="width: 100%">
                                        <el-table-column
                                        type="selection"
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        
                                        prop="ab_ex2"
                                        label="行政区划"
                                        width="150">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex3"
                                        label="申请人姓名"
                                        width="120">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex7"
                                        label="身份证号码"
                                        width="180">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex8"
                                        label="家庭人口"
                                        width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex6"
                                        label="户口性质"
                                        width="100">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex10"
                                        label="建档立卡"
                                        width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex13"
                                        label="已享受救助"
                                        width="120">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex47"
                                        label="低保类型"
                                        width="140">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex15"
                                        label="核对状态"
                                        width="120">
                                         </el-table-column>
                                        <el-table-column
                                        prop="ab_dat14"
                                        label="申请时间"
                                        width="120">
                                        </el-table-column>

                                        <el-table-column fixed="right" align="left" label="操作" width="350">
                                        <template  >
                                            <el-button-group>
                                                <el-button type="primary" size="small" @click="centerDialogVisible = true">查看</el-button>
                                                <el-button type="primary" size="small">上面核查</el-button>
                                                <el-button type="danger" size="small">提交核对反馈</el-button>
                                                <el-button type="danger" size="small">退回</el-button>
                                            </el-button-group>
                                        </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="信息核对" name="fourth">
                    <div class="g-box">
                                
                                 <div class="umc-filter clearfix">

                                    <el-table
                                        :data="tableData"
                                        border
                                        style="width: 100%">
                                        <el-table-column
                                        type="selection"
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        
                                        prop="ab_ex2"
                                        label="行政区划"
                                        width="150">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex3"
                                        label="申请人姓名"
                                        width="120">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex7"
                                        label="身份证号码"
                                        width="180">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex8"
                                        label="家庭人口"
                                        width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex6"
                                        label="户口性质"
                                        width="100">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex10"
                                        label="建档立卡"
                                        width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex13"
                                        label="已享受救助"
                                        width="120">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex47"
                                        label="低保类型"
                                        width="140">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex15"
                                        label="核对状态"
                                        width="120">
                                         </el-table-column>
                                        <el-table-column
                                        prop="ab_dat14"
                                        label="申请时间"
                                        width="120">
                                        </el-table-column>

                                        <el-table-column fixed="right" align="left" label="操作" width="340">
                                        <template  >
                                            <el-button-group>
                                                <el-button type="primary" size="small" @click="centerDialogVisible = true">查看</el-button>
                                                <el-button type="primary" size="small">核对反馈</el-button>
                                                <el-button type="danger" size="small">提交审核</el-button>
                                                <el-button type="danger" size="small">退回</el-button>
                                            </el-button-group>
                                        </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="审核" name="fifth">
                    <div class="g-box">
                                
                                <div class="umc-filter clearfix">

                                    <el-table
                                        :data="tableData"
                                        border
                                        style="width: 100%">
                                        <el-table-column
                                        type="selection"
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        
                                        prop="ab_ex2"
                                        label="行政区划"
                                        width="150">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex3"
                                        label="申请人姓名"
                                        width="120">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex7"
                                        label="身份证号码"
                                        width="180">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex8"
                                        label="家庭人口"
                                        width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex6"
                                        label="户口性质"
                                        width="100">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex10"
                                        label="建档立卡"
                                        width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex13"
                                        label="已享受救助"
                                        width="120">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex47"
                                        label="低保类型"
                                        width="140">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex15"
                                        label="核对状态"
                                        width="120">
                                         </el-table-column>
                                        <el-table-column
                                        prop="ab_dat14"
                                        label="申请时间"
                                        width="120">
                                        </el-table-column>

                                        <el-table-column fixed="right" align="left" label="操作" width="240">
                                        <template  >
                                            <el-button-group>
                                                <el-button type="primary" size="small" @click="centerDialogVisible = true">查看</el-button>
                                                <el-button type="primary" size="small">核对反馈</el-button>
                                                <el-button type="danger" size="small">审核</el-button>
                                            </el-button-group>
                                        </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="公示" name="sixth">
                    <div class="g-box">
                                
                                <div class="umc-filter clearfix">

                                    <el-table
                                        :data="tableData"
                                        border
                                        style="width: 100%">
                                        <el-table-column
                                        type="selection"
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        
                                        prop="ab_ex2"
                                        label="行政区划"
                                        width="150">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex3"
                                        label="申请人姓名"
                                        width="120">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex7"
                                        label="身份证号码"
                                        width="180">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex8"
                                        label="家庭人口"
                                        width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex6"
                                        label="户口性质"
                                        width="100">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex10"
                                        label="建档立卡"
                                        width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex13"
                                        label="已享受救助"
                                        width="120">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex47"
                                        label="低保类型"
                                        width="140">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex15"
                                        label="核对状态"
                                        width="120">
                                         </el-table-column>
                                        <el-table-column
                                        prop="ab_dat14"
                                        label="申请时间"
                                        width="120">
                                        </el-table-column>

                                        <el-table-column fixed="right" align="left" label="操作" width="260">
                                        <template  >
                                            <el-button-group>
                                                <el-button type="primary" size="small" @click="centerDialogVisible = true">查看</el-button>
                                                <el-button type="primary" size="small">核对反馈</el-button>
                                                <el-button type="danger" size="small">公示结束</el-button>
                                            </el-button-group>
                                        </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="审批" name="seventh">
                    <div class="g-box">
                                
                                <div class="umc-filter clearfix">

                                    <el-table
                                        :data="tableData"
                                        border
                                        style="width: 100%">
                                        <el-table-column
                                        type="selection"
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        
                                        prop="ab_ex2"
                                        label="行政区划"
                                        width="150">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex3"
                                        label="申请人姓名"
                                        width="120">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex7"
                                        label="身份证号码"
                                        width="180">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex8"
                                        label="家庭人口"
                                        width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex6"
                                        label="户口性质"
                                        width="100">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex10"
                                        label="建档立卡"
                                        width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex13"
                                        label="已享受救助"
                                        width="120">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex47"
                                        label="低保类型"
                                        width="140">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex15"
                                        label="核对状态"
                                        width="120">
                                         </el-table-column>
                                        <el-table-column
                                        prop="ab_dat14"
                                        label="申请时间"
                                        width="120">
                                        </el-table-column>

                                        <el-table-column fixed="right" align="left" label="操作" width="260">
                                        <template  >
                                            <el-button-group>
                                                <el-button type="primary" size="small" @click="centerDialogVisible = true">查看</el-button>
                                                <el-button type="primary" size="small">核对反馈</el-button>
                                                <el-button type="danger" size="small">审批</el-button>
                                            </el-button-group>
                                        </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="办结" name="eighth">
                    <div class="g-box">
                                
                                 <div class="umc-filter clearfix">

                                    <el-table
                                        :data="tableData"
                                        border
                                        style="width: 100%">
                                        <el-table-column
                                        type="selection"
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        
                                        prop="ab_ex2"
                                        label="行政区划"
                                        width="150">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex3"
                                        label="申请人姓名"
                                        width="120">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex7"
                                        label="身份证号码"
                                        width="180">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex8"
                                        label="家庭人口"
                                        width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex6"
                                        label="户口性质"
                                        width="100">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex10"
                                        label="建档立卡"
                                        width="80">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex13"
                                        label="已享受救助"
                                        width="120">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex47"
                                        label="低保类型"
                                        width="140">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_ex15"
                                        label="核对状态"
                                        width="120">
                                         </el-table-column>
                                        <el-table-column
                                        prop="ab_dat14"
                                        label="申请时间"
                                        width="120">
                                        </el-table-column>
                                        <el-table-column
                                        prop="ab_dat14"
                                        label="审批时间"
                                        width="120">
                                        </el-table-column>
                                        <el-table-column fixed="right" align="left" label="操作" width="540">
                                        <template  >
                                            <el-button-group>
                                                <el-button type="primary" size="small" @click="centerDialogVisible = true">查看</el-button>
                                                <el-button type="danger" size="small" @click="centerDialogVisible2 = true">变更</el-button>
                                                <el-button type="danger" size="small">注销</el-button>
                                                <el-button type="primary" size="small">pdf查看</el-button>
                                                <el-button type="primary" size="small">pdf下载</el-button>
                                                <el-button type="primary" size="small">打印通知书</el-button>
                                                <el-button type="primary" size="small">核对反馈</el-button>
                                            </el-button-group>
                                        </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                    </div>
                </el-tab-pane>



                <div class="block">
                    <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage2"
                    :page-sizes="[5, 10, 20, 50, 100]"
                    :page-size="10"
                    layout="total,sizes, prev, pager, next"
                    :total="1000">
                    </el-pagination>
                </div>


                
            </el-tabs>
        </div>
    </div>
</template>
<script>
import dbListView from './dbListView'
import addEditDibao from './addEditDibao'
export default {
    data() {
      return {
        centerDialogVisible: false,
        centerDialogVisible2: false,
        activeName: 'first',
        formInline:{user:"",region:""},
        tableData: [{
          ab_ex2: '海陵区',
          ab_ex3: '王小辉',
          ab_ex6:"农业户口",
          ab_ex7: '362362196405042242',
          ab_ex8: '6',
          ab_ex10:"是",
          ab_ex13: '慈善救助',
          ab_ex46: '身患癌症，丧失工作能力。',
          ab_ex15:"核对完成",
          ab_dat14:"2021-01-05",
          ab_ex16:"不符合条件",
          ab_ex47:"低收入型低保",
        },{
          ab_ex2: '海陵区',
          ab_ex3: '王小辉',
          ab_ex6:"农业户口",
          ab_ex7: '362362196405042242',
          ab_ex8: '6',
          ab_ex10:"是",
          ab_ex13: '慈善救助',
         ab_ex46: '身患癌症，丧失工作能力。',
          ab_ex15:"核对完成",
          ab_dat14:"2021-01-05",
          ab_ex16:"不符合条件",
          ab_ex47:"低收入型低保",
        },{
          ab_ex2: '海陵区',
          ab_ex3: '王小辉',
          ab_ex6:"农业户口",
          ab_ex7: '362362196405042242',
          ab_ex8: '6',
          ab_ex10:"是",
          ab_ex13: '慈善救助',
          ab_ex46: '身患癌症，丧失工作能力。',
          ab_ex15:"核对完成",
          ab_dat14:"2021-01-05",
          ab_ex16:"不符合条件",
          ab_ex47:"低收入型低保",
        },{
          ab_ex2: '海陵区',
          ab_ex3: '王小辉',
          ab_ex6:"农业户口",
          ab_ex7: '362362196405042242',
          ab_ex8: '6',
          ab_ex10:"是",
          ab_ex13: '慈善救助',
         ab_ex46: '身患癌症，丧失工作能力。',
          ab_ex15:"核对完成",
          ab_dat14:"2021-01-05",
          ab_ex16:"不符合条件",
          ab_ex47:"低收入型低保",
        },{
         ab_ex2: '海陵区',
          ab_ex3: '王小辉',
          ab_ex6:"农业户口",
          ab_ex7: '362362196405042242',
          ab_ex8: '6',
          ab_ex10:"是",
          ab_ex13: '慈善救助',
         ab_ex46: '身患癌症，丧失工作能力。',
          ab_ex15:"核对完成",
          ab_dat14:"2021-01-05",
          ab_ex16:"不符合条件",
          ab_ex47:"低收入型低保",
        },{
          ab_ex2: '海陵区',
          ab_ex3: '王小辉',
          ab_ex6:"农业户口",
          ab_ex7: '362362196405042242',
          ab_ex8: '6',
          ab_ex10:"是",
          ab_ex13: '慈善救助',
         ab_ex46: '身患癌症，丧失工作能力。',
          ab_ex15:"核对完成",
          ab_dat14:"2021-01-05",
          ab_ex16:"不符合条件",
          ab_ex47:"低收入型低保",
        },{
          ab_ex2: '海陵区',
          ab_ex3: '王小辉',
          ab_ex6:"农业户口",
          ab_ex7: '362362196405042242',
          ab_ex8: '6',
          ab_ex10:"是",
          ab_ex13: '慈善救助',
         ab_ex46: '身患癌症，丧失工作能力。',
          ab_ex15:"核对完成",
          ab_dat14:"2021-01-05",
          ab_ex16:"不符合条件",
          ab_ex47:"低收入型低保",
        }]
 
      };
    },
    components:{
        dbListView,
        addEditDibao
    },
   methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
     closedbListView(n){
          this.centerDialogVisible2=false

      }
    } 
}

 
  
</script>
<style scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.view{
    height:50px;
}

</style>
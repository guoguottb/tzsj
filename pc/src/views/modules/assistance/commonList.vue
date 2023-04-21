<template>
  <div class="g-box">
    <el-dialog :title="titles"
               @close="close"
               :visible.sync="centerDialogVisible2"
               width="80%"
               height="80VH"
               center>
      <router-view @closes="closes"
                   ref="routers"></router-view>
    </el-dialog>

    <el-dialog :title="titles2"
               :visible.sync="centerDialogVisible4"
               id="pdfbox"
               width="80%"
               height="85VH"
               center>

      <iframe :src="src"
              style="width: 100%; height: 74vh"
              id="iframe1"
              padding="0"
              frameborder="no"
              border="0"
              marginwidth="0"
              marginheight="0"></iframe>
    </el-dialog>

    <el-dialog :title="titles2"
               :visible.sync="centerDialogVisible5"
               width="80%"
               height="80VH"
               center>
      <div style="height: 80vh; overflow: auto">
        <img :src="item"
             v-for="(item, index) in pdfList"
             :key="index" />
      </div>
    </el-dialog>

    <div class="search">
      <el-form :inline="true"
               :model="searchInline"
               :label-width="formItemLabel || '110px'"
               class="demo-form-inline">
        <el-form-item v-for="(item, index) in searchInline.searchArr"
                      :label="item.text"
                      :key="index">
          <!--前俩查询输入框 -->
          <el-input v-if="item.searchType == 'text'"
                    v-model="searchData[item.searchId]"
                    :placeholder="item.text"
                    style="width: 180px"></el-input>
          <!-- 后俩查询选择框 -->
          <el-select v-else-if="
              item.searchType == 'select' ||
              (item.searchType == 'link' && item.searchId != 'stone')
            "
                     v-model="searchData[item.searchId]"
                     :placeholder="item.text"
                     style="width: 180px">
            <el-option v-for="(itemOp, index22) in item.vals.split('#')"
                       :value="itemOp"
                       :key="index22">
            </el-option>
          </el-select>
          <!-- 区划选择框 -->
          <el-cascader v-else-if="item.searchType == 'select' ||(item.searchType == 'link' && item.searchId == 'stone' )"
                       :props="props"
                       popper-class="my-popper"
                       v-model="xzqhArray"
                       :placeholder="item.text"
                       style="width:180px;">
          </el-cascader>

          <!-- 日期选择器 -->
          <el-date-picker v-else-if="item.searchType == 'date' || item.searchType == 'date2'"
                          v-model="searchData[item.searchId]"
                          :placeholder="item.text"
                          style="width: 180px"
                          type="date"
                          value-format="yyyy-MM-dd">
          </el-date-picker>
          <el-date-picker v-else-if="item.searchType == 'date5' || item.searchType == 'date4'"
                          v-model="searchData[item.searchId]"
                          :placeholder="item.text"
                          style="width: 180px"
                          type="month"
                          value-format="yyyy-MM">
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <!--el-button type="primary" @keyup.enter.native="queryListByCriteria"
            icon="el-icon-search">查询</el-button-->

          <el-button type="primary"
                     ref="formSearchButton"
                     @click="queryListByCriteria"
                     @keyup.enter.native="queryListByCriteria"
                     icon="el-icon-search"> 查询</el-button>
          <el-button type="info"
                     @click="resetQuery"
                     icon="el-icon-refresh"> 重置</el-button>

          <!-- 新增按钮 -->
          <template v-if="buttonJson.length > 0 ">
            <!-- 数据库按钮 从之前的按模块显示，改为全部 -->
            <!-- <template v-if="buttonJson.length > 0 && addYljgBtn == true "> -->
            <el-button type='primary'
                       v-for="(item,index) in buttonJson"
                       icon='el-icon-s-promotion'
                       @click='grant(item)'
                       :key="index">{{item.buttonName}}</el-button>
          </template>

          <el-popover style="margin:0 10px"
                      v-if="this.activeName.split('/')[1]=='核对报告预警'"
                      placement="bottom"
                      width="auto"
                      v-model="visiblebtn"
                      trigger="click">
            <el-button @click="openMore('p_s') ">批量上传</el-button>
            <el-button @click="openMore('p_b') ">批量标记</el-button>
            <el-button slot="reference"
                       v-if="this.activeName.split('/')[1]=='核对报告预警'"
                       type="danger"
                       icon="el-icon-menu"> 批量操作纸质授权书</el-button>
          </el-popover>

          <!-- <el-button v-if="this.activeName.split('/')[1]=='核对报告预警'"
                     type="primary"
                     @click="batchSubmit('p')"
                     icon="el-icon-menu"> 批量提交核对系统</el-button> -->

          <el-button v-if=" this.tabName=='数据完整性存疑预警'"
                     type="primary"
                     @click="LackFont('p')"
                     icon="el-icon-edit-outline"> 字段缺失排查</el-button>
          <el-button v-if=" this.wur_title=='低保边缘家庭'"
                     type="primary"
                     @click="diBaoLoadExcel"
                     icon="el-icon-download"> 低保边缘导出</el-button>
          <el-button v-if=" this.wur_title=='资金发放名单'"
                     type="primary"
                     @click="selectTime"
                     icon="el-icon-s-operation"> 查看资金发放确认汇总信息</el-button>
          <el-button v-if=" this.wur_title=='死亡预警'"
                     type="primary"
                     @click="dieLoadExcel"
                     icon="el-icon-download"> 死亡预警导出</el-button>
          <!-- <el-button v-if=" this.wur_title=='重复救助预警'" type="primary"  @click="getRepeatJob" icon="el-icon-download"> 重复救助预警定时按钮</el-button > -->

          <!-- 特困自理能力评估表数据生成按钮显示 需要大市账号，特困审批模块办结节点 -->

          <el-button v-if=" this.wur_title=='特困人员供养' && this.tabName =='办结' && this.is_city_account"
                     type="primary"
                     @click="addEditTKpgList('add')"
                     icon="el-icon-folder-add"> 生成特困自理能力评估数据</el-button>
          <el-button v-if=" this.wur_title=='特困人员供养' && this.tabName =='办结' && this.is_city_account"
                     type="primary"
                     @click=" ShowTkpfBox "
                     icon="el-icon-s-check">特困自理能力评估数据派发 </el-button>
          <el-button v-if=" this.wur_title=='特困人员供养' && this.tabName =='办结' && this.is_city_account"
                     type="primary"
                     @click=" addEditTKpgList('update') "
                     icon="el-icon-s-check">特困自理能力评估数据更新 </el-button>
          <!-- 自定义预警新增 -->
          <el-button v-if=" this.wur_title=='自定义预警' "
                     type="primary"
                     @click=" addEditzdyData('add') "
                     icon="el-icon-s-promotion">自定义预警新增 </el-button>
          <el-button v-if=" this.wur_title=='自定义预警' "
                     type="primary"
                     @click=" addEditzdyData('history') "
                     icon="el-icon-s-promotion">自定义预警历史记录 </el-button>
          <!-- <el-button v-if=" this.wur_title=='自助申请' " type="primary"  @click=" addEditzdyData('协助申请') " icon="el-icon-s-promotion">协助申请修改 </el-button > -->

        </el-form-item>
      </el-form>
    </div>

    <div class="content">
      <el-tabs v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane v-for="(item, index) in tabData"
                     :name="item.listname"
                     :key="index">
          <span slot="label">{{ item.val }}
            <!-- 列表数据数量显示 -->

            <span class="tabNum"
                  v-if="tabsNum2[item.val] && tabsNum2[item.val] <= 99">
              {{ tabsNum2[item.val] }}
            </span>
            <span class="tabNum"
                  v-else-if="tabsNum2[item.val] && tabsNum2[item.val] > 99">
              99+
            </span>
          </span>
        </el-tab-pane>
      </el-tabs>

      <!-- div class="umc-filter clearfix tables" -->
      <!-- 表格背景 -->
      <!-- row-class-name="table-row" -->

      <div style="overflow-x: auto">
        <el-table :data="tableData"
                  height="480px"
                  class="my_table"
                  border
                  highlight-current-row
                  style="width:100% !important;textAlign:center"
                  @selection-change="selectionChange"
                  v-loading="loading"
                  :element-loading-text="loading_text">
          <el-table-column type="selection"
                           width="42"></el-table-column>
          <!--表格-->
          <el-table-column v-if="itemT.field != 'btn'"
                           v-for="(itemT, index4) in tableList"
                           :key="index4"
                           :prop="itemT.field"
                           :label="itemT.names"
                           :fixed="itemT.fixed === 'true' ? true :false"
                           :width="itemT.width">
            <template slot-scope="{row}">
              <p :title="row[itemT.field]"
                 class="ellipsis">{{row[itemT.field]}}</p>
            </template>
          </el-table-column>
          <el-table-column v-else
                           label="操作"
                           :width="itemT.width"
                           fixed="right"
                           style="textAlign:center">
            <template slot-scope="scope">
              <el-button-group style="width=100%"
                               class="buttons">
                <el-button :type="itemF.btnType"
                           v-for="(itemF, index3) in scope.row[itemT.field]"
                           :key="index3"
                           :disabled="itemF.isDisabled=='Y'"
                           @click="btnEvent(itemF,scope.row)">{{ itemF.name }}</el-button>

              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--/div-->
      <!-- 核对反馈列表蒙版背景-->

      <!-- <div  @click="fkListClose('cfjz')" class="fkList" v-show="visible6">
      </div>  -->

      <!-- 核对反馈列表 -->
      <el-popover v-show="visible"
                  placement="top"
                  width="480px"
                  class="fkbox fkboxTable"
                  v-model="visible">
        <h3 style="display:inline-block;margin-bottom:10px;font-weight: 600;">核对反馈表</h3>
        <i class="el-icon-close"
           style="float:right;"
           @click="fkListClose('hdfk')"></i>
        <div style="text-align: center; margin: 0;overflow-y: auto;height:200px">
          <el-table :data="fkListTable"
                    @row-click="getPDF"
                    stripe
                    border
                    style="width: 100%">
            <el-table-column label="名称">
              <template slot-scope="{row}">
                <p :title="row.file_name"
                   class="ellipsis">{{row.file_name}}</p>
              </template>
            </el-table-column>
            <el-table-column label="时间">
              <template slot-scope="{row}">
                <p :title="row.upload_time"
                   class="ellipsis">{{row.upload_time}}</p>
              </template>
            </el-table-column>

          </el-table>
        </div>
      </el-popover>

      <el-popover v-show="visible5"
                  placement="top"
                  width="480px"
                  class="fkbox fkboxTable"
                  v-model="visible5">
        <h3 style="display:inline-block;margin-bottom:10px;font-weight: 600;">授权书列表</h3>
        <i class="el-icon-close"
           style="float:right;"
           @click="fkListClose('sqs')"></i>
        <div style="text-align: center; margin: 0;overflow-y: auto;height:200px">
          <el-table :data="SQSListTable"
                    @row-click="getIMG"
                    stripe
                    border
                    style="width: 100%">
            <el-table-column label="名称">
              <template slot-scope="{row}">
                <p :title="row.file_name"
                   class="ellipsis">{{row.file_name}}</p>
              </template>
            </el-table-column>
            <el-table-column label="时间">
              <template slot-scope="{row}">
                <p :title="row.upload_time"
                   class="ellipsis">{{row.upload_time}}</p>
              </template>
            </el-table-column>

          </el-table>
        </div>
      </el-popover>

      <!-- <el-popover v-show="visible6"  placement="top" width="1300" class="cfbox" v-model="visible6" > -->
      <el-dialog title="救助重复列表"
                 :visible.sync="visible6"
                 width="80%">
        <div style="text-align: center; margin: 0px auto;overflow-y: auto;height:auto;padding: 20px">
          <el-table :data="repeatRescueTable"
                    stripe
                    border
                    style="width: 100%">
            <el-table-column label="申请id">
              <template slot-scope="{row}">
                <p :title="row.ab_id"
                   class="ellipsis">{{row.ab_id}}</p>
              </template>
            </el-table-column>
            <el-table-column label="救助人姓名">
              <template slot-scope="{row}">
                <p :title="row.abm_ex3"
                   class="ellipsis">{{row.abm_ex3}}</p>
              </template>
            </el-table-column>
            <el-table-column label="救助类型">
              <template slot-scope="{row}">
                <p :title="row.ab_ex13"
                   class="ellipsis">{{row.ab_ex13}}</p>
              </template>
            </el-table-column>
            <el-table-column label="保障类别">
              <template slot-scope="{row}">
                <p :title="row.ab_ex41"
                   class="ellipsis">{{row.ab_ex41}}</p>
              </template>
            </el-table-column>
            <el-table-column label="申请人姓名">
              <template slot-scope="{row}">
                <p :title="row.ab_ex3"
                   class="ellipsis">{{row.ab_ex3}}</p>
              </template>
            </el-table-column>
            <el-table-column label="申请人身份证"
                             width="160">
              <template slot-scope="{row}">
                <p :title="row.ab_ex7"
                   class="ellipsis">{{row.ab_ex7}}</p>
              </template>
            </el-table-column>
            <el-table-column label="与户主关系"
                             width="100">
              <template slot-scope="{row}">
                <p :title="row.abm_ex1"
                   class="ellipsis">{{row.abm_ex1}}</p>
              </template>
            </el-table-column>
            <el-table-column label="个人救助金"
                             width="100">
              <template slot-scope="{row}">
                <p :title="row.abm_ex71"
                   class="ellipsis">{{row.abm_ex71}}</p>
              </template>
            </el-table-column>
            <el-table-column label="提交办结时间"
                             width="180">
              <template slot-scope="{row}">
                <p :title="row.ab_dat5"
                   class="ellipsis">{{row.ab_dat5 | formatDate}}</p>
              </template>
            </el-table-column>
            <el-table-column label="操作"
                             width="80"
                             fixed="right">
              <template slot-scope="scope">
                <el-button @click="openWindow(scope.row)"
                           type="text"
                           size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <span slot="footer"
              class="dialog-footer">
          <!-- <el-button @click="visible6 = false">取 消</el-button> -->
          <el-button type="primary"
                     @click="visible6 = false">关闭弹框</el-button>
        </span>
      </el-dialog>
      <el-dialog title="核对系统核授权书"
                 :visible.sync="dialogVisible5"
                 width="60%"
                 z-index=1999>
        <div style="margin:0 auto;width:100%;height:522px;overflow:auto;">
          <el-image style="dispaly:black;width:99%; text-align:center"
                    v-if="this.dialogVisible5"
                    :z-index="2015"
                    :src="this.imgURl"
                    :preview-src-list="[this.imgURl]">
          </el-image>
        </div>

        <!-- <span slot="footer" class="dialog-footer">
<el-button @click="dialogVisible = false">取 消</el-button>
<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
</span> -->
      </el-dialog>

      <div class="footer"
           style="position: relative;">
        <!-- 数量 -->
        <!-- <div style="display:inline-block;"  v-if="tabName !='养老机构' || tabName !='家庭核对系统'"> -->
        <div style="display:inline-block;padding-bottom:0px"
             v-if="isShowNum && this.tableName!='核对报告预警'">
          <el-form :inline="true"
                   class="com_num"
                   style="position: absolute;top: 11px;left: 0;">
            <el-form-item label="户数"><span style="color:green;margin-bottom: 0px ;font-size:12px">{{hNum}}</span></el-form-item>
            <!-- <el-form-item label="人数"><span style="color:green">{{pNum}} </span></el-form-item> -->
            <el-form-item label="在保人数"><span style="color:green;font-size:12px">{{zbnum}} </span></el-form-item>
            <el-form-item label="共同人数"><span style="color:green;font-size:12px">{{ynum}} </span></el-form-item>
            <el-form-item label="非共同人数"><span style="color:green;font-size:12px">{{nnum}} </span></el-form-item>
            <el-form-item label="非共同成员人数"><span style="color:green;font-size:12px">{{bnum}} </span></el-form-item>
            <el-form-item label="近亲属人数"><span style="color:green;font-size:12px">{{cnum}} </span></el-form-item>
          </el-form>
        </div>

        <div style="display:inline-block;padding-bottom:0px"
             v-if="isShowNum && this.tableName == '核对报告预警'">
          <el-form :inline="true"
                   class="com_num"
                   style="position: absolute;top: 11px;left: 0;">
            <el-form-item label="总数"><span style="color:green">{{num}} </span></el-form-item>
            <el-form-item label="核对报告存疑数"><span style="color:green;margin-bottom: 0px ">{{anum}} </span></el-form-item>
            <el-form-item label="已上传授权书数"><span style="color:green">{{bnum}} </span></el-form-item>
            <el-form-item label="已提交核对数"><span style="color:green">{{cnum}} </span></el-form-item>
            <el-form-item label="已完成数"><span style="color:green">{{dnum}} </span></el-form-item>
          </el-form>
        </div>
        <!-- 分页 -->
        <div style="position: absolute;top: 10px;right: 0;">
          <el-pagination style="display:inline-block;background: #fff;"
                         background
                         layout="total,sizes,prev,pager, next,jumper"
                         :page-size="30"
                         :current-page="page"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentPageChange"
                         :total="count">
          </el-pagination>
        </div>
      </div>

      <div class="CheckCategoriesBox">
        <el-dialog title="核对类别"
                   width="50%"
                   :before-close="HDLBbeforeClose"
                   :visible.sync="dialogFormVisible">
          <span style="font-size:17px">请确保核对类型与授权书中核对项目保持一致</span>
          <el-form :model="form">
            <el-form-item label="核对类别"
                          :label-width="formLabelWidth"
                          prop="ab_ex192">
              <el-select v-model="form.ab_ex192"
                         placeholder="请选核对类别">
                <el-option label="最低生活保障"
                           value="最低生活保障"></el-option>
                <el-option label="特困人员供养"
                           value="特困人员供养"></el-option>
                <el-option label="受灾人员救助"
                           value="受灾人员救助"></el-option>
                <el-option label="医疗救助"
                           value="医疗救助"></el-option>
                <el-option label="临时救助"
                           value="临时救助"></el-option>
                <el-option label="低保外重残"
                           value="低保外重残"></el-option>
                <el-option label="低保外一户多残依老养残"
                           value="低保外一户多残依老养残"></el-option>
                <el-option label="慈善救助"
                           value="慈善救助"></el-option>
                <el-option label="低保边缘"
                           value="低保边缘"></el-option>
                <el-option label="教育救助"
                           value="教育救助"></el-option>
                <el-option label="住房救助"
                           value="住房救助"></el-option>
                <el-option label="就业救助"
                           value="就业救助"></el-option>
                <el-option label="易返贫易致贫对象"
                           value="易返贫易致贫对象"></el-option>
                <el-option label="司法援助"
                           value="司法援助"></el-option>
                <el-option label="困难职工"
                           value="困难职工"></el-option>
                <el-option label="支出型困难"
                           value="支出型困难"></el-option>
                <el-option label="其他"
                           value="其他"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="符合救助类型">
              <el-checkbox-group v-model="typeOfSalvage"
                                 disabled>
                <el-checkbox label="特困人员供养"></el-checkbox>
                <el-checkbox label="最低生活保障按户保"></el-checkbox>
                <el-checkbox label="支出性贫困家庭"></el-checkbox>
                <el-checkbox label="单人保家庭"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="saveHDType">确 定</el-button>
          </div>
        </el-dialog>
      </div>

      <el-dialog title="请选择一个时间"
                 :visible.sync="dialogVisible10"
                 width="30%">
        <!-- <span>这是一段信息</span> -->
        <div class="block">
          <el-date-picker v-model="confirmationDate"
                          type="month"
                          placeholder="选择月"></el-date-picker>
        </div>

        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogVisible10 = false">取 消</el-button>
          <el-button type="primary"
                     @click="confirmReliefdistList">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 社救、临时救助派发选择 -->
      <el-dialog title="请选择一种派发方式"
                 :visible.sync="dialogVisible11"
                 width="40%"
                 :before-close="handleClose">
        <span style="color:red;margin:0 0 20px 0;display:block;">注意：<br>1、选择社会救助派发时，请确保该申请人不是已在保人员；<br>2、选择临时救助派发时，请确保该申请人本年度申请次数未超过2次。</span>
        <div>
          <el-radio-group v-model="type2"
                          style="display:flex">
            <el-radio v-for="(item ,index) in DistributeTypes"
                      :key="index"
                      :label="item.type"
                      :disabled='!item.status'>{{item.name}}</el-radio>
          </el-radio-group>
        </div>

        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogVisible11 = false ,type2=''">取 消</el-button>
          <el-button type="primary"
                     @click="submitType2">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 选择重新进行资金发放的街道 -->
      <el-dialog title="请勾选需要重新确认的街镇"
                 :visible.sync="dialogVisible_a"
                 width="30%">
        <!-- <span>这是一段信息</span> -->
        <div class="block">
          <el-checkbox :indeterminate="isIndeterminate"
                       v-model="checkAll"
                       @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities"
                             @change="handleCheckedCitiesChange">
            <el-checkbox class="labelName"
                         width='120px'
                         v-for="item in againIssueArr"
                         :label="item"
                         :key="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </div>

        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogVisible_a = false">取 消</el-button>
          <el-button type="primary"
                     @click="submintCity">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 核对预警-单人 -->
      <HDYJupLoad v-if="this.HDYJshow"
                  :isShow="this.HDYJshow"
                  :data="this.mustData"
                  ref="HDYJupLoad"
                  @function="hdyjData"></HDYJupLoad>
      <!-- 核对预警-批量 -->
      <HDYJupLoad2 v-if="this.HDYJshow2"
                   :isShow="this.HDYJshow2"
                   :btnType="btnType"
                   :data="this.tableData"
                   ref="HDYJupLoad"
                   @function2="hdyjData2"></HDYJupLoad2>

      <!-- 死亡预警 -->
      <DiedUpLoad v-if="this.Diedshow"
                  :isShow="this.Diedshow"
                  :data="this.diedForm"
                  ref="DiedUpLoad"
                  @function="diedData"></DiedUpLoad>

      <!-- 残疾人、水电气、通讯出行、疾病康复导入列表 -->
      <DisabledUpLoad v-if="this.Disabledshow"
                      :isShow="this.Disabledshow"
                      @closeDialog="Disabledshow = false"
                      :data="this.disabledForm"
                      :module_name='this.tableName'
                      ref="DisabledUpLoad"
                      @function="disabledData"></DisabledUpLoad>

      <!-- 投诉预警查看 -->
      <ComplaintsView v-if="this.ComplaintsViewshow"
                      :isShow="this.ComplaintsViewshow"
                      :data="this.ComplaintsViewForm"
                      ref="ComplaintsView"
                      @function="ComplaintsViewData"></ComplaintsView>
      <!-- 特困评估派发 -->
      <Tkpgpf v-if="this.TkpgpfShow"
              :isShow="this.TkpgpfShow"
              :data="this.ComplaintsViewForm"
              :props='this.props'
              ref="Tkpgpf"
              @function="TkpgpfView"></Tkpgpf>
      <!-- 定期走访 -->
      <Dqzf v-if="dqzfShow"
            :isShow="dqzfShow"
            :data="dqzfForm"
            ref="Dqzf"
            @closeDialog="dqzfShow = false"></Dqzf>
      <!-- <lookDetailView v-if="this.lookView" :isShowBox="this.lookView"  :data="this.DetailData" ref="lookDetailView" @function3="hdyjData3"></lookDetailView> -->

      <!-- 自定义预警新增、修改弹框 -->
      <addEditZdyyj v-if="this.zdyyjShow"
                    :isShow="this.zdyyjShow"
                    :data="this.zdyyjForm"
                    @function="zdyyjView"></addEditZdyyj>
      <!-- 自定义预警历史记录 -->
      <ZdyyjHistory v-if="this.zdyLsjlShow"
                    :isShow="this.zdyLsjlShow"
                    :data="this.zdyLsjlfForm"
                    @function="zdyLsjlShowView"></ZdyyjHistory>

      <!-- 协助申请修改 -->
      <checkXzsq v-if="this.xzsqShow"
                 :isShow="this.xzsqShow"
                 :data="this.xzsqForm"
                 @function="xzsqShowView"></checkXzsq>
      <!--情况调查报告上传  -->
      <Qkdcbg v-if="this.qkdcbgShow"
              :isShow="this.qkdcbgShow"
              :data="this.qkdcbgForm"
              @function="qkdcbgShowView"></Qkdcbg>
      <!--投诉预警-处理结果  -->
      <Cljg v-if="this.cljgShow"
            :isShow="this.cljgShow"
            :data="this.cljgForm"
            @function="cljgShowView"></Cljg>

    </div>
  </div>
</template>

<script>
// import upload from '../upload'
// import imageView from '../imageView'
// import Page1 from './ceshi/Page1.vue'
// import { formatTime } from './assets/js/utils'
// import CMapReaderFactory from 'vue-pdf/src/CMapReaderFactory.js'

import HDYJupLoad from '@/views/modules/assistance/components/HDYJupLoad.vue' //个人上传授权书组件 
import HDYJupLoad2 from '@/views/modules/assistance/components/HDYJupLoad2.vue' // 批量上传授权书组件
import DiedUpLoad from '@/views/modules/assistance/components/DiedUpLoad.vue' //未死亡证明材料上传组件 
import DisabledUpLoad from '@/views/modules/assistance/components/DisabledUpLoad.vue' //残疾人导入组件 
import ComplaintsView from '@/views/modules/assistance/components/ComplaintsView.vue' //投诉预警查看组件 
import Tkpgpf from '@/views/modules/assistance/components/Tkpgpf.vue' //投诉预警查看组件 
import Dqzf from '@/views/modules/assistance/components/Dqzf.vue' //定期走访查看组件 
import addEditZdyyj from '@/views/modules/assistance/components/addEditZdyyj.vue' //个性化预警组件 
import ZdyyjHistory from '@/views/modules/assistance/components/ZdyyjHistory.vue' //个性化预警历史记录组件 
import checkXzsq from '@/views/modules/assistance/components/checkXzsq.vue' //协助申请组件 
import Qkdcbg from '@/views/modules/assistance/components/Qkdcbg.vue' //情况调查报告组件 
import Cljg from '@/views/modules/assistance/components/Cljg.vue' //情况调查报告组件 
import ImportExcel from './importExcel.vue'
import { isSelectGreenChannelApi } from "@/api/PreAlertSystem"  // 预警平台系统api
// import lookDetailView from '@/views/modules/assistance/lookDetailView.vue' // 批量上传授权书组件
import { assistanceCalculationApi } from "@/api/unifiedProcessingCenter"
// import axios from "axios";
import pdf from "vue-pdf";
import request from "@/utils/request";   //后端接口调用封装
import { isCityAccount } from '@/utils/until' //大市账号校验
import { Loading } from "element-ui";
import xlsx from "xlsx";
// import Zdyyj from './zdyyj/zdyyj.vue'
let rowItem = null
export default {
  // 子组件
  components: {
    // Page1,
    // upload,
    // imageView,
    pdf,
    HDYJupLoad,
    HDYJupLoad2,
    DiedUpLoad,
    DisabledUpLoad,
    ImportExcel,
    ComplaintsView,

    Tkpgpf,
    Dqzf,
    addEditZdyyj,
    ZdyyjHistory,
    checkXzsq,
    Qkdcbg,
    Cljg,
    // lookDetailView

  },
  name: "commonList",
  // 父组件传值
  props: ["sKey", "type", "tableName", "search", "formItemLabel"],
  data () {
    return {
      tableRowInfo: {},
      typeOfSalvage: [],
      cljgShow: false, //处理结果弹框
      cljgForm: {},
      qkdcbgShow: false, //情况调查报告上传弹框
      qkdcbgForm: {},
      zdyyjShow: false, // 自定义预警显示 / 隐藏
      zdyyjForm: {},   // 自定义预警传值数据
      xzsqShow: false, // 协助申请显示 / 隐藏
      xzsqForm: {},    //协助申请修改传值
      zdyLsjlShow: false, // 自定义预警历史记录显示 / 隐藏
      zdyLsjlfForm: {},   // 自定义预警历史记录传值数据

      checkAll: false,
      checkedCities: [],
      // cities: cityOptions,
      isIndeterminate: true,
      dialogVisible_a: false,
      // 重新发放确认名单
      againIssueArr: [],

      visible: false, //核对反馈列表显示 / 隐藏
      visible5: false, //纸质授权书列表显示 / 隐藏
      visible6: false, //救助类型重复列表显示 / 隐藏
      repeatRescueTable: [], //重复救助列表
      fkListTable: [], //核对反馈列表
      SQSListTable: [], //授权书列表
      sid: "",
      page: 1, //页码
      count: 1,
      limit: 30,  //每页数据条数
      listname: "",
      numPages: 0,
      currentPage: 0,
      imgURl: '', //授权书图片
      loading: true, //表格加载过渡

      visiblebtn: false,//批量操作2个按钮
      centerDialogVisible: false,  //废除变量
      centerDialogVisible2: false, //页面跳转对话框
      centerDialogVisible3: false, //废除变量
      centerDialogVisible4: false, //pdf对话框
      centerDialogVisible5: false,  //核对报告pdf对话框
      dialogVisible5: false,  //核对授权书loading对话框
      dialogFormVisible: false, //核对类别表单展示

      form: {       //核对类别弹框的表单
        ab_ex192: '', //核对类别
        sid: '',      //sid-查找对应的户主
        item: {}     //存入'提交信息核对按钮'的属性
      },

      diedForm: {       //未死亡证明弹框的表单
        ad_ex10: '',     //未死亡证明照片
        btnName: '',     //按钮名称
        sid: '',         //sid-查找对应的户主
        item: {}         //存入'提交信息核对按钮'的属性--有没有无所谓
      },
      // 残疾人
      disabledForm: {},     //残疾人上传的表单 
      ComplaintsViewForm: {}, //残疾人
      dqzfForm: {}, //定期走访

      mustData: {},    //传给核对报告预警子组件的值
      HDYJshow: false, //核对报告预警弹框
      Diedshow: false, //死亡预警弹框
      Disabledshow: false, //残疾人导入弹框
      ComplaintsViewshow: false, //残疾人导入弹框
      HDYJshow2: false, //核对报告预警批量弹框
      TkpgpfShow: false, //特困评估派发弹框
      dqzfShow: false, //定期走访弹框

      // lookView:false, //查看页面

      btnType: '',      // 核对报告预警批量按钮类型  标记 || 上传
      formLabelWidth: '100px',
      // tupian: false,//图片
      pdfurl2: [],
      pdfList: [],
      src: "",    //PDF路径
      isLoad: true,
      titles: "",   //模块标题
      titles2: "",  //核对报告pdf标题
      titles3: "",  //废除变量
      activeName: "", //业务节点名

      // 选中数据
      selectionList: [],

      // disabled: false,
      // loading: false,
      isShowNum: false,

      tabName: '', //节点名

      pNum: '0', //节点人数
      hNum: '0', //节点户数
      zbnum: '0', //在保人数
      ynum: '0', //总共同人数
      nnum: '0', //总非共同人数
      bnum: '0', //总非共同家庭人数 / 已上传授权书数
      cnum: '0', //总近亲属人数 /  已提交核对数
      anum: '0', //核对报告存疑数
      dnum: '0', //已完成数
      num: '0',  //预警总数

      searchInline: { "searchArr": [] }, //搜索内容列表
      searchData: {},     //搜索项和搜索内容
      tabData: [],        //业务节点名
      tableList: [],      //列表显示字段
      tableData: [],      //表格数据
      buttonJson: [],     //后端新增的按钮数组
      addYljgBtn: false,   //导出、新增按钮显示
      xzqhArray: [],      //行政区划搜索
      tabsNum2: {},       //业务节点数据数量
      searchDataNum: {},  //公司名、父组件某些属性
      listHdBtn: {},       //操作按钮 属性（颜色、禁用状态、名称等）
      tabsnum: [],        //废除变量
      tabsnumArr: [],     //废除变量
      loading_text: '拼命加载中,请稍后',
      showOperateButton: false,

      // el-cascader懒加载
      props: {
        checkStrictly: true,
        lazy: true,
        lazyLoad (node, resolve) {
          const { level } = node; // 获取当前node对象中的level属性
          let pId = "0";
          if (level > 0) {
            let value = node.value;
            if (value) {
              let values = value.split("#");
              pId = values.length > 1 ? values[1] : "0";
            }
          }
          request({
            url: "/social/assistance/getCityOption",
            method: "post",
            data: {
              pId: pId,
            },
          })
            .then((res) => { })
            .catch((res) => {
              // console.log(res);
              // console.log(res,"city");
              const nodes = res.response.data;
              nodes.forEach((item) => {
                item.value = item.cs_ex2 + "#" + item.cs_ex1;
                item.label = item.cs_ex2;
                item.leaf = level >= 2; //判断是否为末尾节点，这个地方是0,1,2三级
              });
              console.log(nodes);
              resolve(nodes);
            });
        },
      },

      wur_title: '',//业务名称
      specialAccount: false,//是否为特殊账号
      is_city_account: false,//是否为大市账号
      dialogVisible10: false,//选择资金发放确认信息时间
      confirmationDate: new Date(),//资金发放查看确认信息-确认时间选择
      dialogVisible11: false,//派发方式选择
      type2: '',  //提交审核 派发方式选择
      DistributeTypes: [],//发布类型
      btn_porp: {}, //按钮属性
      optionData: {}, //选中列的数据
      // DetailData:[],//查看发送数据

    };
  },

  watch: {
    xzqhArray (newA, oldA) {
      console.log(newA);
      // console.log(newA.length);
      // let i = newA[0].split("#")[0] + "#" + newA[1].split("#")[0];
      let i = null;

      if (newA.length > 0) {
        i = newA.length == 1 ? newA[0].split("#")[0] : i;
        i = newA.length == 2 ? newA[0].split("#")[0] + "#" + newA[1].split("#")[0] : i;
        i = newA.length == 3 ? newA[0].split("#")[0] + "#" + newA[1].split("#")[0] + "#" + newA[2].split("#")[0] : i;
      }
      this.searchData.stone = i;
      // console.log(i);
    },
    $route: "fetchData",

    activeName (newA1, oldA1) {
      console.log(newA1, oldA1, '业务节点监听');
    },

  },

  methods: {
    dqzfCloseDialog () {
      console.log(111)
      // this.dqzfShow =  false
    },
    // 自定义预警新增
    addEditzdyData (key) {
      if (key == 'add') {
        this.zdyyjShow = true;
        console.log('正常触发自定义预警');
        this.zdyyjForm = {};

      }
      else if (key == '协助申请') {
        this.xzsqShow = true;
      }
      else {

        this.zdyLsjlShow = true;
        console.log('正常触发自定义预警');
        this.zdyyjForm = {};
      }

    },
    // 全选
    handleCheckAllChange (val) {
      this.checkedCities = val ? this.againIssueArr : [];
      this.isIndeterminate = false;
    },
    // 重新资金发放-选择街道
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.againIssueArr.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.againIssueArr.length;
    },

    // 关闭loding弹框提示
    handleClose () {
      this.$confirm('确认关闭？').then(_ => {
        // done();
        this.type2 = '';
        this.dialogVisible11 = false;
      }).catch(_ => { });
    },

    // 重复救助明细表查看跳转
    openWindow (data) {
      console.log('data', data);

      this.lookView = true;
      this.DetailData = data;
      console.log(this.tableData, '列表页数据');
      // 重复救助二级列表 查看 按钮跳转
      // if(process.env.NODE_ENV == "development"){  //生产环境执行

      //     // this.$router.push({path: '/social/assistance/dbListView?type=2&cId='+data.ab_ex7+'&sId='+data.ab_id+'&hdzt=未核对',});
      //     this.$router.push({path: '/assistance/db/dbListView?type=2&cId='+data.ab_ex7+'&sId='+data.ab_id,});

      //   }else {

      //     this.$pushRouter({path:generalConfig.defaultUrl + '/assistance/db/dbListView?type=2&cId='+data.ab_ex7+'&sId='+data.ab_id,})
      //     console.log(generalConfig.defaultUrl + '/assistance/db/dbListView?type=2&cId='+data.ab_ex7+'&sId='+data.ab_id,'path');
      //   }


    },


    // 提交审批确定时派发方式选择 -》1/2/3三种序号 1：社救+临时、2：社救:3：临时
    submitType2 () {
      console.log('派发方式选择', this.type2);
      this.dialogVisible11 = false;
      this.submitData(this.btn_porp, this.type2);
    },

    // 重复预警定时测试
    // getRepeatJob(){
    //   request({
    //       headers: {
    //         Accept: "application/json",
    //       },
    //       url: " /social/assistance/getRepeatJob",
    //       method: "post",
    //       data: {

    //       },
    //     }).then((res) => {
    //       console.log(res,'重复 then');
    //     }).catch((res)=>{
    //       console.log(res.response.data,'重复 catch');
    //     })
    // },


    // 死亡预警导出
    dieLoadExcel () {
      console.log(' 死亡预警导出');
      this.loading = true;

      request({
        headers: {
          Accept: "application/json",
        },
        url: "social/excel/exportDeathExcel",
        method: "post",
        data: {
          sCurItem: "",
          pParam: escape(escape(JSON.stringify(this.searchData))),
          sKey: "" + this.sKey,
          listname: this.listname,
          limit: "" + this.limit,
          page: "" + this.page,
        },
      }).then((res) => {

        this.loading = false;
        let data = this.base64ToBlob("data:application/vnd.ms-excel;base64," + res);
        let blob = new Blob([data], { type: "application/vnd.ms-excel", });
        let fileName = Date.parse(new Date()) + ".xlsx";
        console.log(blob, "--1659");

        if (window.navigator.msSaveOrOpenBlob) {

          navigator.msSaveBlob(blob, fileName);
        } else {

          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
          //释放内存
          window.URL.revokeObjectURL(link.href);

        }
      }).catch((res) => {

        this.loading = false;
        let data = this.base64ToBlob("data:application/vnd.ms-excel;base64," + res.response.data);
        let blob = new Blob([data], { type: "application/vnd.ms-excel", });
        let fileName = Date.parse(new Date()) + ".xlsx";
        console.log(blob);

        if (window.navigator.msSaveOrOpenBlob) {
          // console.log(2)
          navigator.msSaveBlob(blob, fileName);
        } else {
          // console.log(3)
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
          //释放内存
          window.URL.revokeObjectURL(link.href);
        }
      });
    },

    // 资金发放总汇日期选择
    selectTime () {
      this.dialogVisible10 = true;

    },

    // 请求 发放确认信息汇总接口
    confirmReliefdistList () {
      console.log(this.confirmationDate, '确认时间1');

      let date = this.confirmationDate;
      let y = date.getFullYear();
      let M = date.getMonth() + 1;
      let d = date.getDate();
      let ym = "";
      if (M > 9) {
        ym = y + '' + M;
      } else {
        ym = y + '0' + M;
      }

      // this.confirmationDate=ym
      // console.log(this.confirmationDate,ym,'确认时间2');

      // 日期选择弹框
      this.dialogVisible10 = false;


      // 是否为大市账号 是可选择日期查看资金发放确认信息 否 不可以
      if (this.is_city_account) {
        if (process.env.NODE_ENV == "development") {  //开发环境执行

          // grade 信息显示等级 1：区（市）2：街道； confirmationDate 选择的年月
          this.$router.push({ path: '/social/assistance/confirmReliefdistList?grade=1&confirmationDate=' + ym, });

        } else {

          this.$pushRouter({ path: generalConfig.defaultUrl + '/social/assistance/confirmReliefdistList?grade=1&confirmationDate=' + ym, })

        }


      } else {
        this.$message.error('您没有权限查看发放确认汇总信息')
      }


    },


    // 字段缺失按钮
    LackFont () {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/assistance/addLostFiled",
        method: "post",
        data: {},
      }).then((res) => {
        console.log('字段缺失请求结果 --then');
        this.loading = false;
        // 9.30-测试时结果为{}
        if (res.response.data.status == "+ERR") {
          // if(res.response.data[0].status=="+ERR"){
          this.$alert(res.response.data.msg, "提示");
        } else if (res.response.data.status == "+OK") {
          this.$alert(res.response.data.msg, "提示");
        }
      }).catch((res) => {
        console.log('字段缺失请求结果 --catch');
      }).catch((res) => {
        console.log('字段缺失请求结果 --catch');

        this.loading = false;
        // 9.30-测试时结果为{}
        if (res.response.data.status == "+ERR") {

          this.$alert(res.response.data.msg, "提示");

        } else if (res.response.data.status == "+OK") {

          this.$alert(res.response.data.msg, "提示");

        } else {

          this.$alert('网络错误！', "提示");

        }

      })
    },

    // 核对预警批量操作
    openMore (param) {
      console.log(param);

      this.visiblebtn = false;
      this.HDYJshow2 = true;
      this.btnType = param;
    },

    // 批量提交核对系统
    batchSubmit (param) {
      this.$confirm('是否提交此区(市)下所有已上传授权书数据到核对系统？', "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消'

      }).then(async (res) => {
        console.log('确定');
        // 批量提交核对系统请求
        return await request({
          headers: {
            Accept: "application/json",
          },
          url: "/social/assistance/batchCommitCheckReport",
          method: "post",
          data: {},
        }).then((res) => {

          console.log('批量提交核对系统请求结果 --then');
          this.loading = false;

          if (res.response.data[0].status == "+ERR") {

            this.$alert(res.response.data[0].msg, "提示");

          } else if (res.response.data[0].status == "+OK") {

            this.$alert(res.response.data[0].msg, "提示");

          } else {

            this.$alert('网络错误！', "提示");

          }

        }).catch((res) => {
          console.log('批量提交核对系统请求结果 --catch');
          this.loading = false;

          if (res.response.data[0].status == "+ERR") {

            this.$alert(res.response.data[0].msg, "提示");

          } else if (res.response.data[0].status == "+OK") {

            this.$alert(res.response.data[0].msg, "提示");
          } else {
            this.$alert('网络错误！', "提示");
          }

        })

      }).catch(action => {
        // 取消留在本页
        console.log("取消", action);
      });

      console.log('批量提交核对系统');
    },
    HDLBbeforeClose () {
      this.dialogFormVisible = false
      this.typeOfSalvage = []
    },
    // 批量操作授权书子向父传值
    hdyjData2 (param1, param2) {
      // console.log(param1,param2,'子组件传值');

      this.HDYJshow2 = param1;

      // 保存后重新请求，取消不请求
      if (!param2) {
        this.loadData();
      }
    },

    // 批量操作授权书子向父传值
    hdyjData3 (param1, param2) {

      console.log(param1, param2, '子组件传值3');

      this.lookView = param1;

      // 保存后重新请求，取消不请求
      // if(!param2){
      //   this.loadData();
      // }
    },


    /* 
      核对报告预警子向父传值 保存后 重新请求数据 
      其中param1是关闭弹框、param2是是否进行了保存，进行保存则重新请求列表，否则不发起请求
    */
    hdyjData (param1, param2) {
      this.HDYJshow = param1;
      console.log(param1, param2, '子组件传值');
      // 保存后重新请求，取消不请求
      if (!param2) {
        this.loadData();
      }
    },
    // 同上-死亡预警
    diedData (param1, param2) {
      this.Diedshow = param1;
      console.log(param1, param2, '子组件传值');
      // 保存后重新请求，取消不请求
      if (!param2) {
        this.loadData();
      }
    },
    // 同上-残疾人
    disabledData (param1, param2) {
      this.Disabledshow = param1;
      console.log(param1, param2, '子组件传值');
      // 保存后重新请求，取消不请求
      if (!param2) {
        this.loadData();
      }
    },
    // 同上-投诉预警查看
    ComplaintsViewData (param1, param2) {
      this.ComplaintsViewshow = param1;
      console.log(param1, param2, '子组件传值');
      // 保存后重新请求，取消不请求
      if (!param2) {
        this.loadData();
      }
    },

    // 同上-特困评估派发
    TkpgpfView (param1, param2) {
      this.TkpgpfShow = param1;
      console.log(param1, param2, '特困评估派发子组件传值');
      // 保存后重新请求，取消不请求
      if (!param2) {
        this.loadData();
      }
    },

    // 同上-定期走访
    DqzfView (param1, param2) {

      this.dqzfShow = param1;
      console.log(param1, param2, '定期走访子组件传值');
      // 保存后重新请求，取消不请求
      if (!param2) {
        this.loadData();
      }
    },

    // 同上-自定义预警
    zdyyjView (param1, param2) {

      this.zdyyjShow = param1;
      console.log(param1, param2, '自定义预警子组件传值');
      // 保存后重新请求，取消不请求
      if (!param2) {
        this.loadData();
      }
    },

    // 同上-自定义预警历史记录
    zdyLsjlShowView (param1, param2) {

      this.zdyLsjlShow = param1;
      console.log(param1, param2, '自定义预警历史记录子组件传值');
      // 保存后重新请求，取消不请求
      if (!param2) {
        this.loadData();
      }
    },

    // 同上-协助申请修改
    xzsqShowView (param1, param2) {

      this.xzsqShow = param1;
      console.log(param1, param2, '协助申请子组件传值');
      // 保存后重新请求，取消不请求
      if (!param2) {
        this.loadData();
      }
    },

    // 同上-上传情况调查报告
    qkdcbgShowView (param1, param2) {

      this.qkdcbgShow = param1;
      console.log(param1, param2, '上传情况调查报告子组件传值');
      // 保存后重新请求，取消不请求
      if (!param2) {
        this.loadData();
      }
    },

    // 同上-投诉预警-处理结果
    cljgShowView (param1, param2) {

      this.cljgShow = param1;
      console.log(param1, param2, '处理结果子组件传值');
      // 保存后重新请求，取消不请求
      if (!param2) {
        this.loadData();
      }
    },

    // // 同上-投诉预警处理结果
    // tsCljgShowView(param1,param2){

    //   this.tsCljgShow = param1;
    //   console.log(param1,param2,'投诉预警处理结果子组件传值');
    //   // 保存后重新请求，取消不请求
    //   if(!param2){
    //     this.loadData();
    //   }
    // },


    // 生成特困评估批次数据
    addEditTKpgList (key) {
      if (key == 'add') {
        this.$prompt('请输入验证字符', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          // inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          if (value != 8619) {

            this.$message({ type: 'warning', message: '验证错误' });

          } else {
            this.$message({ type: 'success', message: '验证成功' });
            this.loading = true;
            this.loading_text = '数据生成中，预计3~5分钟。。。';
            return request({
              headers: {
                'Accept': 'application/json',
              },
              url: '/social/assistance/addEvaluationReport',
              method: 'post',
              data: {}
            }).then(res => {

              console.log(res, 'then');
            }).catch(res => {
              try {
                console.log(res, 'catch');
                if (res.response.data.status == '+OK') {
                  this.loading = false;
                  this.$message.success(res.response.data.msg)
                }

              } catch (err) {

                this.$message.error(err)
                // console.log();

              }
            })

          }

        }).catch(() => {

          this.$message({ type: 'info', message: '取消输入' });

        });
      } else if (key == 'update') {
        // 更新特困评估数据
        this.$prompt('请输入验证字符', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          // 验证字符 
          if (value != 8619) {

            this.$message({ type: 'warning', message: '验证错误' });

          } else {
            this.$message({ type: 'success', message: '验证成功' });
            console.log('接口未完成');
            // return false
            this.loading = true;
            this.loading_text = '数据更新中，预计1分钟。。。';
            return request({
              headers: {
                'Accept': 'application/json',
              },
              url: '/social/assistance/updateEvaluationReport ',
              method: 'post',
              data: {}
            }).then(res => {

              console.log(res, 'then');

            }).catch(res => {
              try {

                console.log(res, 'catch');

                if (res.response.data.status == '+OK') {
                  this.loading = false;
                  this.$message.success(res.response.data.msg);
                }

              } catch (err) {

                this.$message.error(err);

              }
            })

          }

        }).catch(() => {

          this.$message({ type: 'info', message: '取消输入' });

        });

      }


    },

    // 打开特困自理能力评估数据派发弹框
    ShowTkpfBox () {

      console.log(this.props, 'props-quhua');
      console.log(this.xzqhArray, 'xzqhArray-quhua');

      this.TkpgpfShow = true;
    },

    // 给表格行 添加类名 进行样式调整 （从0开始）
    // 双数添加 warning-row 类名（白色），单数添加 success-row 类名（灰色）
    tableRowClassName ({ rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else if (rowIndex % 2 === 1) {
        return "success-row";
      }
      return "";
    },

    // 路由改变
    fetchData () {
      console.log("路由发送变化doing...");

      this.$refs.routers.loadData();
      this.isLoad = true;
      // this.$refs.routers2.loadData();
    },

    // 未知方法
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 列表多选事件--目前没啥用但是和标签绑定 
    selectionChange (val) {
      this.selectionList = val;
      console.log('多选事件', val);
    },

    // 未知方法

    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },


    resetQuery () {// 重置
      for (let key in this.searchData) {
        this.searchData[key] = "";
      }
      this.xzqhArray = [];

      // this.queryListByCriteria();
    },

    // 业务节点按钮
    handleClick (tab, event) {
      console.log("tab.name===============" + tab.name);
      this.listname = tab.name;
      this.page = 1;
      this.getData();
      this.loadData();
    },

    closedbListView (n) {
      this.centerDialogVisible2 = false;
    },

    // 修改每页列表长度
    handleSizeChange (val) {
      this.limit = val;
      this.loadData();
    },

    // 翻页
    handleCurrentPageChange (val) {
      this.page = val;
      this.loadData();
    },

    // 第一次一次加载的时候获取节点名
    getListName (isFrist) {

      // if(isFrist){

      //   console.log('第一次一次加载的时候获取节点名');

      // }else{

      //   console.log('非第一次一次加载的时候获取节点名');

      // }

      let listname = this.listname;
      // console.log('-------------------------------');
      console.log(this.listname, 'this.listname');
      // console.log('-------------------------------');

      try {
        if (isFrist && sessionStorage.getItem("activeName")) {

          var activeNameArr1 = sessionStorage.getItem(this.sKey + "activeName").split("/");
          var activeNameArr2 = sessionStorage.getItem("activeName").split("/");

          if (activeNameArr2.length > 2) {
            if (activeNameArr1[1] == activeNameArr2[1]) {

              listname = sessionStorage.getItem("activeName");
              this.page = 1;
            }
          } else if (activeNameArr2.length == 2) { //修改了：原--->  else if ((activeNameArr2.length = 2)) {
            if (activeNameArr1[0] == activeNameArr2[0]) {
              listname = sessionStorage.getItem("activeName");
              this.page = 1;
            }
          }
        }

        console.log(this.activeName, 'getListName 获取activeName');

      } catch (e) { }

      return listname;
    },

    // 调用checkHD接口 --验证核对报告，根据返回结果使按钮禁用
    loadBtn () {
      let ids = "";
      for (let i = 0; i < this.tableData.length; i++) {
        ids = ids == "" ? this.tableData[i].ab_id : ids + "," + this.tableData[i].ab_id;
      }

      console.log('loadBtn 调用前=>数据列表', this.tableData[0]);

      return request({
        url: "/social/assistance/checkHD",
        method: "post",
        data: {
          sId: ids,
        },

      }).then((res) => { })

        .catch((res) => {

          let data = res.response.data;
          this.listHdBtn = data;
          for (let i = 0; i < this.tableData.length; i++) {
            let btn = this.tableData[i].btn;
            let ab_id = this.tableData[i].ab_id;
            if (btn.length > 0) {
              for (let j = 0; j < btn.length; j++) {
                let name = btn[j].name;
                // 提交审核按钮 验证核对报告-有值，不修改按钮属性；
                // 无值-如果是临时放行，不修改按钮属性；
                // 非临时放行，按钮变灰、禁用 
                if (name == "提交审核") {
                  if (!this.listHdBtn[ab_id] && this.tableData[i].ab_ex202 != '临时放行') {
                    this.$set(this.tableData[i].btn[j], "isDisabled", "Y")
                    this.$set(this.tableData[i].btn[j], "btnType", "info")
                  }
                }
                // for(let i=0;i<this.tableData.length;i++){
                // 非导入数据按钮变灰
                if (this.tableData[i].ab_ex202 == '' && (name == "审核" || name == "公示结束" || name == "审批" || (name == "查看核对报告" && this.tabName == '办结'))) {
                  if (!this.listHdBtn[ab_id]) {
                    // console.log(name+'变灰');
                    this.$set(this.tableData[i].btn[j], "btnType", "info")
                    this.$forceUpdate()
                  }
                }
                // 导入数据按钮变黄
                // if( (name=='审核' && (data.ab_ex204 =='太极3月全量特困' || data.ab_ex204 =='太极3月全量低保'))){
                if ((name == '审核' && this.tableData[i].ab_ex202 != '')) {
                  if (!this.listHdBtn[ab_id]) {
                    console.log(name + '变黄');
                    this.$set(this.tableData[i].btn[j], "btnType", "warning")

                  }
                }
              }
            }

          }
        });
    },

    async loadData (isFrist) {

      for (var key in this.search) {
        this.searchData[key] = this.search[key];
      }

      // console.log(this.search,'this.search');
      // console.log(this.searchData,'this.searchData');
      // console.log('tableName load =>',this.tableName);
      // console.log('type load =>',this.type);

      this.getNum();   // 获取表格数据数量
      this.loading = true;

      let listname = '';

      // if(isFrist){
      listname = this.getListName(isFrist);

      // }

      this.getSearchData({
        sKey: "" + this.sKey,
        listname: listname,
        params: JSON.stringify(this.searchData),
        limit: "" + this.limit,
        page: "" + this.page,
      }).then((res) => {
        console.log(res, "000000")
        this.tableData = [];
        this.count = 1;
        if (res.data) {
          this.tableData = res.data;
          this.count = res.count;
        }
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i]["btn"]) {
            let btn = this.tableData[i].btn;

            for (let j = 0; j < btn.length; j++) {
              let type = this.tableData[i].btn[j].type;

              if (type == "openWin") {
                this.tableData[i].btn[j].btnType = "primary";
              } else {
                this.tableData[i].btn[j].btnType = "danger";
              }

              //this.tableData[i].btn[j].isDisabled="N";
              // //修改按钮名称
              // let name = this.tableData[i].btn[j].name;
              // if(name=='提交委托确认'){
              // 	this.tableData[i].btn[j].name = "核查派单"
              // }
            }
          }
        }

        this.loading = false;
      }).catch((res) => {
        console.log(res, "ressss")
        if (res.response.data.code !== 0) return this.$message.error(res.response.data.msg)
        this.tableData = [];
        this.count = 1;

        console.log(res, '1122222');
        if (res.response.data.data) {
          this.tableData = JSON.parse(JSON.stringify(res.response.data.data));
          this.count = res.response.data.count;
        }


        // 数据字段匹配，将资金发放信息管理的 最低生活保障边缘 改为 低保边缘家庭
        if (this.tabName == '资金发放信息') {
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].ar_ex1 == '最低生活保障边缘') {
              this.tableData[i].ar_ex1 = '低保边缘家庭';
            }
          }
        }

        for (let i = 0; i < this.tableData.length; i++) {

          // 针对儿童模块 的儿童主任和督导员  的列表页中的 经历内容 的显示
          if (['儿童主任', '儿童督导员'].includes(this.tabName)) {
            this.tableData[i].abcd_ex26 = this.tableData[i].abcd_ex26.replace(/["\\n"]+/g, '\n')
          }

          if (this.tableData[i]["btn"]) {
            let btn = this.tableData[i].btn;
            for (let j = 0; j < btn.length; j++) {
              let type = this.tableData[i].btn[j].type;
              if (type == "openWin") {
                this.tableData[i].btn[j].btnType = "primary";
              } else {
                this.tableData[i].btn[j].btnType = "danger";
              }
              // 删除退回阶段的 “删除”按钮
              if (this.tabName == '退回' && this.tableData[i].btn[j].name == "删除") {
                this.tableData[i].btn.splice(j, 1);
              }

            }
          }
        }


        /*
         * 现在是 核对报告预警模块 禁止个人提交核对系统 
         * 代码作用：【提交核对】操作按钮，变灰禁用
         *
         * 解除了2022.11.30
        */
        // if(['低保','特困供养','家庭边缘','支出贫困'].includes(this.tabName) ){
        // console.log('核对报告预警-按钮属性修改');
        // for(let i in this.tableData){
        //     for(let j in this.tableData[i].btn){

        //       if(this.tableData[i].btn[j].name=='提交核对'){
        //         // console.log('核对报告预警-按钮属性修改',j);
        //         this.$set(this.tableData[i].btn[j],"isDisabled","Y")
        //         this.$set(this.tableData[i].btn[j],"btnType","info")
        //       }
        //     }
        // }
        // }


        console.log(this.tableData, "--列表数据");
        console.log(this.tabName, "--模块名称");
        console.log(this.activeName.split('/'), "--activeName");
        // console.log(this.activeName.split('/')[1],"--activeName[1]");

        // 如果不是开发环境---将预警里面没有核对报告按钮禁用变灰
        // 核对预警按钮禁用，特殊账号不禁用

        if (process.env.NODE_ENV != "development" && this.activeName.split('/')[0] == '低收入人口核查' && this.specialAccount == false) {


          this.loadBtn();

        }

        this.loading = false;
      });
    },

    // 键盘Enter事件--输入搜索内容后直接回车搜索
    handleKeyDown (e) {
      let key = null;

      if (window.event === undefined) {

        key = e.keyCode;

      } else {

        key = window.event.keyCode;

      }

      if (key === 13) {
        console.log('回车事件');
        this.queryListByCriteria();
      }
    },

    // 查询按钮绑定事件
    queryListByCriteria () {
      console.log("查询内容", this.searchData);
      this.page = 1;
      console.log(this.searchData != "{}", this.searchData);

      // 搜索内容为空
      if (this.searchData != "{}") {
        sessionStorage.setItem("searchData", JSON.stringify(this.searchData));
      }

      if (this.searchData.code && (this.searchData.code.length != 18 && this.searchData.code.length != 15)) {
        this.$message.warning("请输入正确的身份证号码");
      } else {
        this.loadData();
      }
    },


    // 进入页面数据加载  ，frist是在create传的参数，初次加载时用的
    async getData (frist) {

      // 判断大市账号的
      this.is_city_account = await isCityAccount('登录账号');
      console.log(this.is_city_account, '判断大市账号');

      this.loading = true;
      let listname = this.getListName(frist);
      console.log(frist, 'frist');
      console.log(listname, 'listname');

      // console.log(this.checkSpecialAccount(),'账号验证');

      // console.log(,'账号验证');

      //  特殊账号验证  true 特殊账号（如民政局直属单位等） ；false 普通账号 
      await this.checkSpecialAccount();

      this.getDatas({
        sKey: "" + this.sKey,
        listname: listname,

      }).then((res) => {
        alert(this.listname)
        if (this.listname == "") {

          if (res[0].searchStr.length > 0) {
            this.searchInline.searchArr = res[0].searchStr;
          }

          if (res[0].tabJson.length > 0 && res[0].tabJson[0].maps.length > 0) {

            // 获取tabs的数量
            /*res.response.data[0].tabJson[0].maps.forEach(async (item, index) => {
              this.tabsnum[index] = await item.listname
              this.getSearchData({
                sKey: "" + this.sKey,
                listname: this.tabsnum[index],
                params: JSON.stringify(this.searchData),
                limit: "" + this.limit,
                page: "" + this.page
              }).then((res) => {
                this.$set(this.tabsnumArr, index, res.response.data.data
                  .length)
              }).catch((res) => {
                this.$set(this.tabsnumArr, index, res.response.data.data
                  .length)
              })
            })*/
            // 获取tabs的数量
            this.tabData = res[0].tabJson[0].maps;
            // this.activeName = res.response.data[0].tabJson[0].maps[0].val
            this.activeName = res[0].tabJson[0].maps[0].listname;
            console.log('getdata', this.tabData);
            sessionStorage.setItem(this.sKey + "activeName", this.activeName);
          }
        }

        this.loadData(frist);
        this.tableList = [];
        if (res[0].list.length > 0) {
          this.tableList = res[0].list;
          // console.log(res[0].list,"-");
        }

        this.wur_title = res[0].wur_title;
        // 供养机构、群众申请新增按钮， 资金发放信息的导出按钮， 核对报告预警模块的 核对报告检测按钮
        if (["供养机构", "资金发放信息", "群众申请", "核对报告预警", "残疾人两项补贴申请", '群众申请', '医疗推送', '预警推送', '主动排查'].includes(this.wur_title)) {
          this.addYljgBtn = true
        } else {
          this.addYljgBtn = false
        }

        this.buttonJson = res[0].buttonJson;

      }).catch((res) => {
        // console.log(res.response.data,"页面加载数据");

        if (typeof res.request === "undefined" || typeof res.response === "undefined" || res.request.status != 200) {
          console.log("请求失败了-----------------------6");
          this.$message.error("数据获取失败或请求超时666");
          this.$emit("closes", false);
          // this.goBack();
          return false;
        }

        // console.log(res.response.data.);

        // commmListJson 返回数据是否为数组
        let dataType = res.response.data instanceof Array;



        if (dataType) {
          if (this.listname == "") {

            if (res.response.data[0].searchStr.length > 0) {
              this.searchInline.searchArr = res.response.data[0].searchStr;
              // console.log(this.searchInline.searchArr,'this.searchInline.searchArr');
            }

            if (
              res.response.data[0].tabJson.length > 0 &&
              res.response.data[0].tabJson[0].maps.length > 0
            ) {
              // 获取tabs的数量
              /*res.response.data[0].tabJson[0].maps.forEach(async (item, index) => {
                this.tabsnum[index] = await item.listname
                this.getSearchData({
                  sKey: "" + this.sKey,
                  listname: this.tabsnum[index],
                  params: JSON.stringify(this.searchData),
                  limit: "" + this.limit,
                  page: "" + this.page
                }).then((res) => {
                  this.$set(this.tabsnumArr, index, res.response.data.data.length)
                }).catch((res) => {
                  this.$set(this.tabsnumArr, index, res.response.data.data.length)
                })
              })*/

              // 获取tabs的数量
              this.tabData = res.response.data[0].tabJson[0].maps;
              // console.log(this.tabData, "this.tabData");

              if (this.tabData.length > 2) { //防止标签卡的数量太少
                if (this.tabData[2].name == "委托确认") {
                  this.tabData[2].val = "核查派单";
                }
                if (this.tabData[2].name == "提交信息核对") {
                  console.log("请先落实核查信息");
                  this.$message.warning("请先落实核查信息");
                  return false;
                }
              }


              // 将节点名存入缓存中
              this.activeName = res.response.data[0].tabJson[0].maps[0].listname;
              console.log(res.response.data[0].tabJson[0].maps[0].listname);


            } else {
              //  this.activeName = res.response.data[0].tabJson[0].maps[0].listname;
            }

          }


          let len = res.response.data[0].wur_listname.split('/').length
          this.tabName = res.response.data[0].wur_listname.split('/')[len - 1]
          this.wur_title = res.response.data[0].wur_title;
          console.log(this.wur_title, ' this.wur_title');

        } else {


          this.$message.warning(res.response.data.msg);
        }

        // console.log('key+activeName--------------:'+sessionStorage.getItem(this.sKey+"activeName"))
        // console.log('this.activeName--------------:'+this.activeName)

        sessionStorage.setItem(this.sKey + "activeName", this.activeName);

        // 搜索数据本地缓存
        console.log(res.response.data[0], 'detData---');
        console.log(sessionStorage.getItem('searchData'), 'searchData');
        console.log(this.searchInline.searchArr, 'searchArr');

        console.log(this.searchData, 'searchData');


        // 获取节点名称

        // console.log(' tabName 获取节点名称=>',this.tabName);

        // 这里的的低保是指-核对报告预警低保     isShowNum--数字显示
        let tabNameArr = ['申请', '退回', '初审', '公示开始', '委托确认', '核对中', '审批', '办结', '低保']
        this.isShowNum = tabNameArr.some((item, index, arr) => {
          return item == this.tabName  //narr==ture
        })
        // console.log('isShowNum=>',this.isShowNum);


        // console.log(sessionStorage.getItem('activeName'),this.activeName);
        // console.log(
        //   sessionStorage.getItem("activeName"),
        //   "sessionStorage.getItem('activeName')" //存入本地缓存数据
        // );
        // console.log(sessionStorage.getItem('activeName').substring(0,12));

        if (sessionStorage.getItem("activeName") != null && this.activeName != 0) {

          var activeNameArr1 = this.activeName.split("/");
          var activeNameArr2 = sessionStorage.getItem("activeName").split("/");

          console.log(this.activeName, "本地缓存");
          console.log(activeNameArr1, "activeNameArr1");
          console.log(activeNameArr2, "activeNameArr2");


          // 业务节点位置名
          if (activeNameArr2.length > 2) {
            if (activeNameArr1[1] == activeNameArr2[1]) {
              this.activeName = sessionStorage.getItem("activeName");
              this.listname = this.activeName;
              this.page = 1;

              // 搜索数据缓存
              var huancunData = JSON.parse(sessionStorage.getItem('searchData'))
              if (huancunData) {

                this.searchData = huancunData;
              }

              sessionStorage.removeItem("activeName");
              // sessionStorage.removeItem("searchData");
            } else {
              sessionStorage.removeItem("searchData");
            }

          }
          // 修改了：注释了
          // else if( activeNameArr2[0]=='数据预警'){

          //   console.log('数据预警+++++++++++++++');
          //   this.listname = '';
          //   this.page = 1;

          // }
          else if (activeNameArr2.length == 2) { //修改了：原--->  else if ((activeNameArr2.length = 2)) {
            if (activeNameArr1[0] == activeNameArr2[0]) {
              this.activeName = sessionStorage.getItem("activeName");
              this.listname = sessionStorage.getItem("activeName");
              this.page = 1;

              // 搜索数据缓存
              var huancunData = JSON.parse(sessionStorage.getItem('searchData'))
              if (huancunData) {
                this.searchData = huancunData;
              }

              console.log(huancunData, '本地缓存数据');
              sessionStorage.removeItem("activeName");
              // sessionStorage.removeItem("searchData");
            } else {
              sessionStorage.removeItem("searchData");
            }
          }
        }
        this.loadData(frist);

        this.tableList = [];

        if (dataType) {

          if (res.response.data[0].list.length > 0) {
            this.tableList = res.response.data[0].list;
            // console.log("this.tableList=>",res.response.data[0].list);
          }
        }


        // “新增” 按钮显示，'特困人员供养','资金发放信息','支出性贫困家庭','城乡低保','家庭边缘','低保边缘家庭'-的导出按钮，核对报告预警的核对报告检测按钮-，'核对报告预警'--核对报告检测按钮
        var arr = ['特困人员供养', '资金发放信息', '群众申请', '供养机构', '支出性贫困家庭', '城乡低保', '家庭边缘', '困境儿童申请', '低保边缘家庭', '核对报告预警', '临时救助', '重复救助预警', '残疾人两项补贴申请', '群众申请', '医疗推送', '预警推送', '主动排查']
        if (arr.includes(res.response.data[0].wur_title)) {
          this.addYljgBtn = true;
        } else {
          this.addYljgBtn = false;
        }

        this.buttonJson = res.response.data[0].buttonJson;

        console.log(this.buttonJson, "----buttonJson");
        // console.log(res.response.data[0].wur_title, "----res.response.data[0].wur_title");
      });
    },

    // 获取业务数据数量
    getNum () {
      this.searchDataNum = { ...this.searchData };
      // console.log(this.searchDataNum);
      for (let key in this.searchDataNum) {
        // this.searchDataNum[key] = escape(this.searchDataNum[key]);  
        this.searchDataNum[key] = this.searchDataNum[key];
      }

      this.searchDataNum.type = this.type;
      this.searchDataNum.company = "泰州市姜堰区社会救助综合平台";
      this.searchDataNum.tableName = this.tableName;


      if (this.wur_title == '残疾人两项补贴申请') {
        request({
          headers: {
            Accept: "application/json",
          },
          url: "/social/assistance/getNodeNumber",
          method: "post",
          // data: this.searchDataNum,
          data: { type: '审批', },

        }).then((res) => {
          console.log('残疾人两项补贴审批Num', res);
        }).catch(res => {

          this.tabsNum2 = {};
          // console.log(res.response.data);
          let json = res.response.data;
          for (let i = 0; i < json.length; i++) {
            // console.log(json,'getBasicNum');
            if (json[i].ab_ex15) {
              //申请
              let ab_ex15 = unescape(json[i].ab_ex15);
              let ab_ex15_m = unescape(json[i].ab_ex15) + 'm';
              json[i].ab_ex15 = unescape(json[i].ab_ex15);

              if (ab_ex15 == "审核") {
                ab_ex15 = "审核2";
              } else if (ab_ex15 == "初审") {
                ab_ex15 = "审核";
              } else if (ab_ex15 == "公示") {
                ab_ex15 = "公示2";
              } else if (ab_ex15 == "公示开始") {
                ab_ex15 = "公示";
              } else if (ab_ex15 == "核对中") {
                ab_ex15 = "信息核对";
              } else if (ab_ex15 == "委托确认") {
                ab_ex15 = "核查派单";
              }

              //各个节点的数字 各节点数量
              let num = json[i].num;
              // let memnum = json[i].memnum;

              // console.log(ab_ex15, num,'各节点数量'); 

              this.tabsNum2[ab_ex15] = num;
              // this.tabsNum2[ab_ex15_m] = memnum;

            } else if (json[i].ac_ex3) {
              //变更
              let ac_ex3 = unescape(json[i].ac_ex3);
              let ac_ex3_m = unescape(json[i].ac_ex3) + 'm';
              json[i].ac_ex3 = unescape(json[i].ac_ex3);

              if (ac_ex3 == "初审") {
                ac_ex3 = "审核";
              } else if (ac_ex3 == "公示开始") {
                ac_ex3 = "公示";
              } else if (ac_ex3 == "核对中") {
                ac_ex3 = "信息核对";
              }

              let num = json[i].num;
              this.tabsNum2[ac_ex3] = num;

            } else if (json[i].ac_ex7) {
              //注销
              let ac_ex7 = unescape(json[i].ac_ex7);
              json[i].ac_ex7 = unescape(json[i].ac_ex7);

              if (ac_ex7 == "初审") {
                ac_ex7 = "审核";
              } else if (ac_ex7 == "公示开始") {
                ac_ex7 = "公示";
              } else if (ac_ex7 == "核对中") {
                ac_ex7 = "信息核对";
              }

              let num = json[i].num;
              this.tabsNum2[ac_ex7] = num;
            } else if (json[i].ab_ex13) {
              //注销
              let ab_ex13 = unescape(json[i].ab_ex13);
              json[i].ab_ex13 = unescape(json[i].ab_ex13);

            }
          }

          // 节点名称匹配
          this.tabName = this.tabName == '审核' ? '初审' : this.tabName;
          this.tabName = this.tabName == '困境儿童申请' ? '申请' : this.tabName;



          // json 包含 所有节点的各个对象的数量
          // 获取节点人数、户数
          if (json.length > 0) {
            for (let i in json) {

              if (json[i].ab_ex15 == this.tabName) {
                this.hNum = json[i].num;
                this.zbnum = json[i].zbnum;
                this.ynum = json[i].ynum;
                this.nnum = json[i].nnum;
                this.bnum = json[i].bnum;
                this.cnum = json[i].cnum;
                // this.pNum = json[i].memnum;
                break;
              } else if (json[i].ac_ex3 == this.tabName) {

                this.hNum = json[i].num;
                this.zbnum = json[i].zbnum;
                this.ynum = json[i].ynum;
                this.nnum = json[i].nnum;
                this.bnum = json[i].bnum;
                this.cnum = json[i].cnum;
                // this.pNum = json[i].memnum;
                break;
              } else if (json[i].ac_ex7 == this.tabName) {

                this.hNum = json[i].num;
                this.zbnum = json[i].zbnum;
                this.ynum = json[i].ynum;
                this.nnum = json[i].nnum;
                this.bnum = json[i].bnum;
                this.cnum = json[i].cnum;
                // this.pNum = json[i].memnum;
                break;
              } else if (json[i].ab_ex13 == this.tabName) {

                // 核对预警人数
                this.hNum = json[i].num;
                this.anum = json[i].anum;
                this.bnum = json[i].bnum;
                this.cnum = json[i].cnum;
                this.dnum = json[i].dnum;
                this.num = json[i].num;
                // this.pNum = json[i].memnum;
                break;
              } else {

                this.hNum = 0;
                this.hNum = 0;
                this.zbnum = 0;
                this.ynum = 0;
                this.nnum = 0;
                this.anum = 0;
                this.bnum = 0;
                this.cnum = 0;
                this.dnum = 0;
                this.num = 0;
                // this.pNum = 0;
              }
            }
          } else {
            this.hNum = 0;
            this.hNum = 0;
            this.zbnum = 0;
            this.ynum = 0;
            this.nnum = 0;
            this.anum = 0;
            this.bnum = 0;
            this.cnum = 0;
            this.dnum = 0;
            this.num = 0;
            // this.pNum = 0;
          }
          // 这里的的低保是指-核对报告预警低保
          let tabNameArr = ['申请', '退回', '初审', '公示开始', '委托确认', '核对中', '审批', '办结', '低保',]
          this.isShowNum = tabNameArr.some((item, index, arr) => {
            return item == this.tabName  //narr==ture
          })

          // console.log('isShowNum=>',this.isShowNum);
          // console.log('各节点人数、户数 =>',json);
          // console.log('this.hNum=>',this.hNum);
          console.log('节点名称=>', this.tabName);

        })

      } else {

        if (this.type) {
          request({
            headers: {
              Accept: "application/json",
            },
            url: "/social/assistance/getBasicNum",
            method: "post",
            data: this.searchDataNum,
          }).then((res) => {
            let json = res;
            for (let i = 0; i < json.length; i++) {
              let ab_ex15 = unescape(json[i].ab_ex15);
              // let ab_ex15_m = unescape(json[i].ab_ex15);
              let num = json[i].num;
              this.tabsNum2[ab_ex15] = num;
              // this.tabsNum2[ab_ex15_m] = memnum;
            }
          })
            .catch((res) => {
              this.tabsNum2 = {};
              // console.log(res.response.data,'数量');
              console.log("eeeee11", res)
              let json = res.response.data;
              for (let i = 0; i < json.length; i++) {
                // console.log(json,'getBasicNum');
                if (json[i].ab_ex15) {
                  //申请
                  let ab_ex15 = unescape(json[i].ab_ex15);
                  let ab_ex15_m = unescape(json[i].ab_ex15) + 'm';
                  json[i].ab_ex15 = unescape(json[i].ab_ex15);

                  if (ab_ex15 == "审核") {
                    ab_ex15 = "审核2";
                  } else if (ab_ex15 == "初审") {
                    ab_ex15 = "审核";
                  } else if (ab_ex15 == "公示") {
                    ab_ex15 = "公示2";
                  } else if (ab_ex15 == "公示开始") {
                    ab_ex15 = "公示";
                  } else if (ab_ex15 == "核对中") {
                    ab_ex15 = "信息核对";
                  } else if (ab_ex15 == "委托确认") {
                    ab_ex15 = "核查派单";
                  }

                  //各个节点的数字 各节点数量
                  let num = json[i].num;
                  // let memnum = json[i].memnum;

                  // console.log(ab_ex15, num,'各节点数量'); 

                  this.tabsNum2[ab_ex15] = num;
                  // this.tabsNum2[ab_ex15_m] = memnum;

                } else if (json[i].ac_ex3) {
                  //变更
                  let ac_ex3 = unescape(json[i].ac_ex3);
                  let ac_ex3_m = unescape(json[i].ac_ex3) + 'm';
                  json[i].ac_ex3 = unescape(json[i].ac_ex3);

                  if (ac_ex3 == "初审") {
                    ac_ex3 = "审核";
                  } else if (ac_ex3 == "公示开始") {
                    ac_ex3 = "公示";
                  } else if (ac_ex3 == "核对中") {
                    ac_ex3 = "信息核对";
                  }

                  let num = json[i].num;
                  this.tabsNum2[ac_ex3] = num;
                  // let memnum = json[i].memnum;

                  // this.tabsNum2[ac_ex3_m] = memnum;
                  // console.log(ac_ex3, num);
                  //  console.log(ac_ex3, num,'各节点数量'); //各个节点的数字

                } else if (json[i].ac_ex7) {
                  //注销
                  let ac_ex7 = unescape(json[i].ac_ex7);
                  json[i].ac_ex7 = unescape(json[i].ac_ex7);

                  if (ac_ex7 == "初审") {
                    ac_ex7 = "审核";
                  } else if (ac_ex7 == "公示开始") {
                    ac_ex7 = "公示";
                  } else if (ac_ex7 == "核对中") {
                    ac_ex7 = "信息核对";
                  }

                  let num = json[i].num;
                  this.tabsNum2[ac_ex7] = num;
                } else if (json[i].ab_ex13) {
                  //注销
                  let ab_ex13 = unescape(json[i].ab_ex13);
                  json[i].ab_ex13 = unescape(json[i].ab_ex13);
                  // if (ac_ex7 == "初审") {
                  //   ac_ex7 = "审核";
                  // } else if (ac_ex7 == "公示开始") {
                  //   ac_ex7 = "公示";
                  // } else if (ac_ex7 == "核对中") {
                  //   ac_ex7 = "信息核对";
                  // }

                  // let num = json[i].num;
                  // this.tabsNum2[ac_ex7] = num;
                }
              }

              // 节点名称匹配
              this.tabName = this.tabName == '审核' ? '初审' : this.tabName;
              this.tabName = this.tabName == '城乡低保申请' ? '申请' : this.tabName;
              this.tabName = this.tabName == '城乡低保退回' ? '退回' : this.tabName;
              this.tabName = this.tabName == '城乡低保初审' ? '初审' : this.tabName;
              this.tabName = this.tabName == '城乡低保公示开始' ? '公示开始' : this.tabName;
              this.tabName = this.tabName == '城乡低保审批' ? '审批' : this.tabName;
              this.tabName = this.tabName == '城乡低保办结' ? '办结' : this.tabName;

              this.tabName = this.tabName == '困境儿童申请' ? '申请' : this.tabName;

              this.tabName = this.tabName == '家庭边缘退回' ? '退回' : this.tabName;
              this.tabName = this.tabName == '家庭边缘初审' ? '初审' : this.tabName;
              this.tabName = this.tabName == '家庭边缘公示开始' ? '公示开始' : this.tabName;
              this.tabName = this.tabName == '家庭边缘审批' ? '审批' : this.tabName;
              this.tabName = this.tabName == '家庭边缘办结' ? '办结' : this.tabName;
              this.tabName = this.tabName == '家庭边缘申请' ? '申请' : this.tabName;

              this.tabName = this.tabName == '临时救助退回' ? '退回' : this.tabName;
              this.tabName = this.tabName == '临时救助初审' ? '初审' : this.tabName;
              this.tabName = this.tabName == '临时救助公示开始' ? '公示开始' : this.tabName;
              this.tabName = this.tabName == '临时救助审批' ? '审批' : this.tabName;
              this.tabName = this.tabName == '临时救助办结' ? '办结' : this.tabName;
              this.tabName = this.tabName == '临时救助申请' ? '申请' : this.tabName;
              this.tabName = this.tabName == '核对报告预警低保' ? '低保' : this.tabName;
              this.tabName = this.tabName == '核对报告预警特困' ? '特困供养' : this.tabName;
              this.tabName = this.tabName == '核对报告预警低保边缘' ? '家庭边缘' : this.tabName;
              this.tabName = this.tabName == '核对报告预警支出贫困' ? '支出贫困' : this.tabName;
              this.tabName = this.tabName == '低保边缘家庭' ? '办结' : this.tabName;

              // json 包含 所有节点的各个对象的数量
              // 获取节点人数、户数
              if (json.length > 0) {
                for (let i in json) {

                  if (json[i].ab_ex15 == this.tabName) {
                    this.hNum = json[i].num;
                    this.zbnum = json[i].zbnum;
                    this.ynum = json[i].ynum;
                    this.nnum = json[i].nnum;
                    this.bnum = json[i].bnum;
                    this.cnum = json[i].cnum;
                    // this.pNum = json[i].memnum;
                    break;
                  } else if (json[i].ac_ex3 == this.tabName) {

                    this.hNum = json[i].num;
                    this.zbnum = json[i].zbnum;
                    this.ynum = json[i].ynum;
                    this.nnum = json[i].nnum;
                    this.bnum = json[i].bnum;
                    this.cnum = json[i].cnum;
                    // this.pNum = json[i].memnum;
                    break;
                  } else if (json[i].ac_ex7 == this.tabName) {

                    this.hNum = json[i].num;
                    this.zbnum = json[i].zbnum;
                    this.ynum = json[i].ynum;
                    this.nnum = json[i].nnum;
                    this.bnum = json[i].bnum;
                    this.cnum = json[i].cnum;
                    // this.pNum = json[i].memnum;
                    break;
                  } else if (json[i].ab_ex13 == this.tabName) {

                    // 核对预警人数
                    this.hNum = json[i].num;
                    this.anum = json[i].anum;
                    this.bnum = json[i].bnum;
                    this.cnum = json[i].cnum;
                    this.dnum = json[i].dnum;
                    this.num = json[i].num;
                    // this.pNum = json[i].memnum;
                    break;
                  } else {

                    this.hNum = 0;
                    this.hNum = 0;
                    this.zbnum = 0;
                    this.ynum = 0;
                    this.nnum = 0;
                    this.anum = 0;
                    this.bnum = 0;
                    this.cnum = 0;
                    this.dnum = 0;
                    this.num = 0;
                    // this.pNum = 0;
                  }
                }
              } else {
                this.hNum = 0;
                this.hNum = 0;
                this.zbnum = 0;
                this.ynum = 0;
                this.nnum = 0;
                this.anum = 0;
                this.bnum = 0;
                this.cnum = 0;
                this.dnum = 0;
                this.num = 0;
                // this.pNum = 0;
              }
              // 这里的的低保是指-核对报告预警低保
              let tabNameArr = ['申请', '退回', '初审', '公示开始', '委托确认', '核对中', '审批', '办结', '低保', '特困供养', '家庭边缘', '支出贫困',]
              this.isShowNum = tabNameArr.some((item, index, arr) => {
                return item == this.tabName  //narr==ture
              })

              // console.log('isShowNum=>',this.isShowNum);
              // console.log('各节点人数、户数 =>',json);
              // console.log('this.hNum=>',this.hNum);
              console.log('节点名称=>', this.tabName);
            });
        }
      }

      return this.tableName;
    },

    // 列表数据
    getSearchData (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/weida/getCommonListJson",
        method: "post",
        data: data,
      });
    },

    // 页面识别及 数据筛选样式
    getDatas (data) {
      return request({
        url: "/social/common/commonListJson",
        method: "post",
        data: data,
      });
    },

    // 特殊账号识别--一般是市或区县直辖的福利机构
    checkSpecialAccount () {
      return request({
        url: "/social/common/checkSpecialAccount",
        method: "post",
        // data: data,
      }).then((res) => {

        console.log('456', '账号验证');

      }).catch((res) => {
        try {
          console.log(res.response.data[0].specialAccount, '特殊账号验证');
          this.specialAccount = res.response.data[0].specialAccount;
        } catch (error) {
          this.$message.error(error)
        }
      });

    },


    closes (data) {
      this.centerDialogVisible2 = false;
      this.$emit("closeWin", this.centerDialogVisible2);
      this.loadData();
      console.log("关闭了啊");
      // this.$emit('自定义名称',要发送的数据)
    },

    // 修改了内容 未保存点击关闭，重新打开由于路由没有发生变化，导致会显示上次修改内容，需要重新获取数据
    close () {
      console.log("关闭了");
      //this.$refs.routers.loadData();
    },

    // 获取核对系统授权书img或PDF照片
    getIMG (item) {

      var st = document.getElementById("pdfbox");
      var st2 = document.getElementById("iframe1");
      st.children[0].style.marginTop = "6vh";
      st.style.padding = "0px";

      // console.log(st.children[0].children[0].children[0].style.color="black");
      // console.log(st.children[0].children[0].style.fontWeight="600");


      // 拼接pdf请求路径
      var pingjie = "";
      pingjie = item.file_path + "/" + item.file_name
      pingjie = "/social/minios/showPDF?filename=" + pingjie;

      // 核对报告PDF弹框的标题  
      this.titles2 = "本报告核对系统中信息的反馈，仅作为委托部门审批的参考。";

      //  接口
      if (item.file_name) {
        request({
          headers: {
            Accept: "application/json",
          },
          url: pingjie,
          method: "post",
          data: {},
        }).then((res) => {
          this.loading = false;
          this.src = "data:image/png;base64," + res;
          this.dialogVisible5 = true;
        }).catch((res) => {

          // this.loading = false;
          // console.log(res.response.data,"--1106");
          this.src = "data:image/png;base64," + res.response.data;
          this.imgURl = "data:image/png;base64," + res.response.data;
          // this.src =  res.response.data;

          this.dialogVisible5 = true;
        });
      }
    },
    // 获取核对反馈PDF照片
    getPDF (item) {
      var st = document.getElementById("pdfbox");
      var st2 = document.getElementById("iframe1");
      st.children[0].style.marginTop = "6vh";
      st.style.padding = "0px";

      // console.log(st.children[0].children[0].children[0].style.color="black");
      // console.log(st.children[0].children[0].style.fontWeight="600");

      // 拼接pdf请求路径
      var pingjie = "";
      pingjie = item.file_path + "/" + item.file_name
      pingjie = "/social/minios/showPDF?filename=" + pingjie;

      this.titles2 = "本报告是核对对象在各相关部门信息系统中信息的反馈，仅作为委托部门审批的参考。";
      // this.loading = true;

      //  接口
      if (item.file_name) {
        request({
          headers: {
            Accept: "application/json",
          },
          url: pingjie,
          method: "post",
          data: {},
        }).then((res) => {
          this.loading = false;
          this.src = "data:application/pdf;base64," + res;
          this.centerDialogVisible4 = true;
        }).catch((res) => {
          // this.loading = false;
          console.log(res.response.data, "--1106");
          this.src = "data:application/pdf;base64," + res.response.data;
          // this.src =  res.response.data;
          // console.log(this.src);
          this.centerDialogVisible4 = true;
        });
      }
    },

    // 关闭核对反馈列表
    fkListClose (key) {
      console.log(key);
      if (key == 'hdfk') {
        this.visible = false;
      } else if (key == 'sqs') {
        this.visible5 = false;
      } else if (key == 'cfjz') {
        this.visible6 = false;
        console.log(this.tableData, '列表数据');
      }

    },


    // 操作 按钮事件 item-->按钮的属性  value-->点击行的数据
    btnEvent (item, value) {
      this.tableRowInfo = value
      rowItem = value
      // if (item.name === '绿色通道') return this.$emit("operatingButton", value)
      if (item.name === '补录材料' && item.title === '临时救助补录材料') return this.$emit("operateButton", value)
      if (item.name === '查看' && item.url === '问题反馈') return this.$emit("viewRowInfo", value)
      if (item.name === '提交审核' && item.url === '自助申请端口') return this.$emit("policyCalculation", value)
      if (item.name === '提取按人保成员') return this.$emit("rowOperatingButton", value)
      if (item.name === '急难型绿色通道' && item.url.includes('greenChannel')) return this.$emit("greenChannel", item, value)
      if (item.name === "查看" && this.$route.path.includes("/dqzfList")) return this.$emit("openView", value)
      if (item.url.includes("/QZSQsgzpf")) return this.$emit("sgzDistribute", value)
      // console.log(item.url,"按钮事件"); //群众申请、其他
      var arr = item.url.split("=");
      console.log('非pdf=>', arr, value, item.name);
      // 获取-----------sid
      if (["打印通知书", "打印档案", "打印档案", "审核", "公示结束", "审批"].includes(item.name)) {
        // if(item.name=="打印通知书" || item.name=="打印档案" || item.name=="审核" || item.name=="公示结束"|| item.name=="审批") {
        this.sid = arr[2];
      } else if (item.name == '查看' && this.tabName != '退回' && arr.length > 3) {


        console.log(value, '查看1');
        this.sid = arr[3].split('&')[0];

      } else if (item.name == '确认资金发放') {

        console.log(arr, 'sid');
        this.sid = arr[1].split('&')[0];

      } else {
        if (item.name == '查看') {
          if (this.tabName == '投诉预警') {

            this.ComplaintsViewshow = true;
            this.ComplaintsViewForm = value;
            return false

          }
          else if (this.tabName == '定期走访') { // 定期走访弹框显示
            this.dqzfShow = true;
            this.dqzfForm = value;
            // this.$forceUpdate();
            console.log('定期走访ww', this.dqzfShow);
            return false

          }


        } else if (item.name == '修改') {
          // 协助申请修改
          if (this.tabName == '自助申请') {
            this.xzsqShow = true;
            this.xzsqForm = value;
            return false
          }


        } else if (this.wur_title.indexOf('残疾人两项补贴') != -1) {

          this.sid = arr[2];
          console.log('残疾人两项补贴审批111');
          if (item.name == "核查派单") {
            this.submitData(item);
          } else if (item.name == "提交审核") {
            this.goUrl(item, value);
          }

        } else {
          this.sid = arr[1];

        }
        console.log(value, '查看2');
      }
      if (this.tableName == '投诉预警') {
        if (item.name == '上传情况调查报告') {
          console.log('情况调查报告');
          this.qkdcbgShow = true;
          this.qkdcbgForm = value;
          return false
        } else if (item.name == '标记已处理') {
          console.log('投诉预警-标记已处理');
          this.cljgShow = true;
          this.cljgForm = value;
          return false
        }

      }
      if (this.tableName == '自定义预警' && item.name == '修改') {

        this.zdyyjShow = true;
        this.zdyyjForm = value
        return false
      }
      // 点击核查派单检测区划是否完整
      if (item.name == "核查派单") {
        console.log('核查派单标记');
        if (value.ab_ex162 == '') {
          var xzqhArray = value.ab_ex162.split(",")

          this.$alert("请先填报行政区划", "提示", {
            confirmButtonText: "确定",
          });
          return false;

        } else {

          var xzqhArray = value.ab_ex162.split(",")
          console.log(xzqhArray);

          if (xzqhArray.length != 3) {

            this.$alert("请先填报行政区划", "提示", {
              confirmButtonText: "确定",
            });

            return false;
          }
        }
      }
      // 点击“查看核对报告”，调用反馈列表
      if (item.name == "查看核对报告") {
        console.log("查看核对报告");
        this.getFamilyHDPDF(this.sid, item, true)
      } else if (item.name == "查看授权书") {
        console.log("查看授权书");
        this.getFamilySQS(this.sid, item, true)

      } else if (item.name == "提交信息核对") {
        // return console.log(111)
        this.form.sid = this.sid;

        for (let i in this.tableData) {
          if (this.tableData[i].ab_id == this.sid) {

            this.form.ab_ex192 = this.tableData[i].ab_ex192
            this.goUrl(item)
            this.form.item = item
            console.log(this.form.item, '<=核对类型');
          }
        }
        console.log("提交信息核对=>", this.sid);

      }
      else if (item.name == "查看重复列表") {
        console.log(item, "查看重复列表");
        console.log(item, this.sid, "查看重复列表");


        for (let i in this.tableData) {
          if (this.tableData[i].ar_id == this.sid) {

            // this.form.ab_ex192 = this.tableData[i].ab_ex192
            // console.log(this.tableData[i],'<=点击数据');
            this.RepeatDetailList(this.sid, this.tableData[i], true)
          }
        }


        // this.RepeatDetailList(this.sid,item,true)

      } else if (item.name == "退回重新核查") {
        // console.log(item,"data");
        // console.log(arr,"arr");
        this.$confirm('是否退回到核查派单？', "提示", {
          // distinguishCancelAndClose: true,
          confirmButtonText: '退回核查派单',
          cancelButtonText: '取消'

        }).then(() => {

          // 确认退回上门核查
          console.log("退回核查派单");
          this.bankData(arr[2])
        }).catch(action => {
          console.log("留在本页"); // 取消留在本页
        });
      } else if ((item.name == "审核" || item.name == "公示结束" || item.name == "审批") && this.tableName == '申请') { // 核对报告过滤
        // 正式环境进行核对报告验证
        if (process.env.NODE_ENV != "development") {
          console.log('模块功能名称 =》', this.tableName);
          this.getFamilyHDPDF(item.url.includes("临时救助") ? value.ab_id : this.sid, item, false)
          return false
        } else {
          this.goUrl(item)
        }
      }
      else if (item.name == "上传纸质授权书") {
        console.log('上传核对授权书 sid=', this.sid);
        console.log(this.HDYJshow, '核对预警显示1');

        for (let i in this.tableData) {
          if (this.sid == this.tableData[i].ab_id) {
            console.log('获取对象姓名 ', this.tableData[i].ab_ex3);

            // this.isShow = true;
            // this.form.ab_ex192 = this.tableData[i].ab_ex192;
            // this.form.item = item;
            this.mustData = this.tableData[i];
            this.HDYJshow = true;

            console.log(this.HDYJshow, '核对预警显示2');
            console.log(this.form, '<=核对类型');
          }
        }
      } else if (item.name == "上传情况证明" || item.name == "查看情况证明") {
        // console.log(item.name, ' sid=', this.sid);
        // console.log(item.name, ' diedForm=', this.diedForm);
        // console.log(this.Diedshow, '死亡预警显示1');

        if (value.ad_ex10 == '' && item.name == "查看情况证明") {
          this.$alert('该对象未上传证明材料', '提示')

        } else {
          this.diedForm = value;
          this.diedForm.btnName = item.name;
          this.Diedshow = true;
        }
        // console.log(this.Diedshow, '死亡预警显示2');
      } else if (item.name == "重新发放资金") {
        // for(let i in this.tableData){
        // if(this.sid == this.tableData[i].ar_id){
        console.log(value);

        this.confirmReliefdistList2({
          sId: this.sid,
          arc_ex4: value.ar_ex5,//区划编码/账号
        }).then((res) => {

          alert(res[0].data);

        }).catch((res) => {
          if (typeof res.request === "undefined" || typeof res.response === "undefined" || res.request.status != 200) {
            console.log("请求失败了-----------------------6");
            this.$message.error("数据获取失败或请求超时");
            this.$emit("closes", false);
            // this.goBack();
            return false;
          }

          console.log(res.response.data, "信息确认");
          // if(res.response.data.status=="+OK"){
          this.optionData = value;

          if (res.response.data.length == 0) {
            this.againIssueArr = [];
            this.submintCity(value);

          } else {
            this.againIssueArr = [];
            for (let i in res.response.data) {
              this.againIssueArr.push(res.response.data[i].arc_ex5);

            }
            this.dialogVisible_a = true;
          }
          // }else{
          //   this.$message.error(res.response.data)
          // }

          console.log(this.againIssueArr, '重新发放列表');

          // if(res.response.data.length>0){
          //     if(res.response.data[0].status=="+ERR" ){
          //         this.$message.error(res.response.data[0].msg);
          //          this.loading = false;
          //         this.goBack();
          //         return false;
          //     }else{
          //         this.fomeData = res.response.data;
          //         this.loading = false;

          //     }
          // }else{
          //     this.fomeData = res.response.data;
          //     this.loading = false;
          // }

        });

        // this.againCreateReliefDistList(item, value)
        // }
        // }

      }
      else {
        this.btn_porp = item;
        this.goUrl(item, value)
      }
    },

    // 资金发放模块：确定提交选择街道进行重新发放
    submintCity (value) {

      console.log(this.checkedCities, '选择街道');
      console.log(this.optionData);

      // if(this.checkedCities.length>0){

      this.againCreateReliefDistList(this.optionData)
      this.dialogVisible_a = false;  //关闭街道弹框
      // }
    },


    // 提交核对时获取反馈信息
    checkData (sId, item) {
      request({
        headers: {
          Accept: "application/json",
        },
        url: '/social/assistance/checkData',
        method: "post",
        data: {
          sId: sId,
        },
      }).then((res) => {
        console.log(res, "then");

      }).catch((res) => {

        console.log(res.response.data[0], "--反馈信息");
        // 返回+ERR--数据不全，进行提示
        if (res.response.data[0].status == "+ERR") {

          this.$confirm(res.response.data[0].msg + '是否退回到核查派单？', "提示", {
            // distinguishCancelAndClose: true,
            confirmButtonText: '退回核查派单',
            cancelButtonText: '取消'
          }).then(() => {

            // 确认 退回上门核查
            console.log("退回核查派单");
            this.bankData(sId)

          }).catch(action => {

            // 取消 留在列表页
            console.log("留在本页");
          });

        } else if (res.response.data[0].status == "+OK") {  //数据完整，数据从 信息核对 提交到 审批确定

          this.goUrl(item)
        }
        //this.getFamilyHDPDF(this.sid,item,false)
      })
    },

    // 选择核对类别
    saveHDType () {
      var data = {
        sid: this.form.sid,
        ab_ex192: this.form.ab_ex192
      };
      if (this.form.ab_ex192) {
        request({
          headers: {
            Accept: "application/json",
          },
          url: '/social/assistance/saveHDType',
          method: "post",
          data: data
        }).then((res) => {
          if (res.data[0].status == "+OK") {
            this.dialogFormVisible = false
            this.getFamilyHDPDF(this.sid, this.form.item, false)
          } else {
            this.$message.warning(res.data.msg)
          }
        }).catch((res) => {
          if (res.response.data.status == "+OK") {
            this.dialogFormVisible = false
            this.submitData(this.form.item)
          } else {
            this.$message.warning(res.response.data.msg)
          }
        })
      }
      else {
        this.$message.warning('请选择核对类型')
      }
    },

    // 审核退回上门核查
    bankData (sId) {
      this.loading = true;
      request({
        headers: {
          Accept: "application/json",
        },
        url: '/social/assistance/bankData',
        method: "post",
        data: {
          sId: sId,
        },
      }).then((res) => {
        console.log(res, "then");
      }).catch((res) => {
        this.loading = false;
        //  11.10数据结构 改动 原：res.response.data[0].status
        console.log(res.response.data, "退回上门核查");
        if (res.response.data.status == "+OK") {
          this.$message.success(res.response.data.msg)
          this.loadData()
        } else {
          this.$message.warning(res.response.data.msg)
        }
      })
    },

    // 按钮退回上门核查
    bankDataCs (sId) {
      this.loading = true;
      request({
        headers: {
          Accept: "application/json",
        },
        url: '/social/assistance/bankDataCs',
        method: "post",
        data: {
          sId: sId,
        },
      }).then((res) => {
        console.log(res, "then");
      }).catch((res) => {
        this.loading = false;
        console.log(res.response.data, "退回上门核查");
        if (res.response.data[0].status == "+OK") {
          this.$message.success(res.response.data[0].msg)
          this.loadData()
        } else {
          this.$message.warning(res.response.data[0].msg)
        }
      })
    },

    //   // 退回重新核查 //预警退回接口与审批确定不通用
    backCheckAgain () {
      this.$confirm('该户无核对报告，是否退回重新核查？', "提示", {
        // distinguishCancelAndClose: true,
        confirmButtonText: '退回核查派单',
        cancelButtonText: '取消'
      }).then(() => {

        // 确认退回上门核查
        console.log("退回核查派单");
        this.bankDataCs(this.sid)
      })
        .catch(action => {
          // 取消留在本页
          console.log("留在本页");
        });
    },

    // 获取核对列表
    getFamilyHDPDF (sId, item, isShow) {

      return request({
        headers: {
          Accept: "application/json",
        },
        url: '/social/assistance/getFamilyHDPDF',
        method: "post",
        data: {
          sId: sId,
        },
      }).then((res) => {
        console.log(res, "then-getFamilyHDPDF");
        // console.log();
      }).catch((res) => {

        if (res.response.status == 200) {       //返回成功200
          // res.response.data[0]={}
          // console.log(res.response.data.length==0,"");
          // console.log(res.response.data[0]);
          if (res.response.data.length == 0) {
            //判断是否有数据--无
            // 展示
            if (isShow) {
              this.$alert('暂无核对报告', '提示', {
                confirmButtonText: '确定',
              });
            } else {
              console.log('节点数据列表=>', this.tableData);
              for (let i in this.tableData) {
                console.log(this.tableData[i].ab_id, this.sid);

                if (this.tableData[i].ab_id == sId) {
                  console.log(22);
                  if ((item.name == '审核' || item.name == '公示结束' || item.name == '审批') && this.tableData[i].ab_ex202 == '') {
                    // this.$confirm('该户无核对报告，请进入用户页面后进行退回重新核查操作',"提示" , {
                    //   // distinguishCancelAndClose: true,
                    //   confirmButtonText: '确定',
                    //   cancelButtonText: '取消'
                    // }).then(() => {
                    //   console.log("退回核查派单");

                    // })
                    // .catch(action => {
                    //   console.log("留在本页");
                    // });

                    // 退回上门核查操作 
                    // this.backCheckAgain();
                    this.goUrl(item);

                  } else if ((item.name == '审核' || item.name == '公示结束' || item.name == '审批') && this.tableData[i].ab_ex202 != '') {
                    this.goUrl(item);
                  }    //--有数据， isShow = false , 跳转页面
                  // else if(item.name=='审核' && (data.ab_ex204 =='太极3月全量特困' || data.ab_ex204 =='太极3月全量低保')){
                  //   if(this.tableData[i].ab_ex10 ==''){
                  //     this.$alert('该户信息不完整，请点击 “修改” 按钮进行数据补录', '提示', {
                  //       confirmButtonText: '确定',
                  //     });
                  //   }else{
                  //     this.$alert('该户还在经济核对中，请耐心等待核对完成', '提示', {
                  //       confirmButtonText: '确定',
                  //     });
                  //   }
                  // }
                }
              }
            }
            return false
          } else {
            //--有数据，如果 isShow = true ,展示反馈列表
            // 展示
            if (isShow) {
              for (let i in res.response.data) {
                for (let j in res.response.data[i]) {
                  res.response.data[i][j] = unescape(res.response.data[i][j])
                }
              }
              this.visible = true;
              if (this.visible == true) {
                this.fkListTable = [];
                for (let i in res.response.data) {

                  this.fkListTable.push(res.response.data[i])
                }
              } else if (this.visible == false) {
                this.fkListTable = []
              }
            } else {
              this.goUrl(item)
            }    //--有数据， isShow = false , 跳转页面

          }
        } else {
          // 如果是开发环境，没有核对报告也能提交，否则提示网络异常
          // 注 getFamilyHDPDF掉的是核对系统 的接口，核对系统出问题也会显示 ‘网络异常’
          if (process.env.NODE_ENV != "development") {
            this.$message.error("网络异常");
          } else {
            console.log("getFamilyHDPDF调用失败！");
            this.goUrl(item);
          }
        }
      })
    },



    // 查看资金发放确认信息数据
    confirmReliefdistList2 (data) {
      return request({
        method: "post",
        url: "/social/assistance/confirmReliefdistList",
        data: data,
      });
    },

    // 获取重复列表
    RepeatDetailList (sId, item, isShow) {
      this.loading = true;
      return request({
        headers: {
          Accept: "application/json",
        },
        url: '/social/assistance/assistanceRepeatDetailList ',
        method: "post",
        data: {
          sId: sId,
        },
      }).then((res) => {
        console.log(res, "then-RepeatDetailList");
      }).catch((res) => {
        this.loading = false;
        console.log(res.response, '重复列表明细');
        if (res.response.status == 200) {
          this.visible6 = isShow;
          this.repeatRescueTable = res.response.data;
        } else {
          this.$message.error("网络异常");
        }
      })

    },
    // 获取核对列表
    getFamilySQS (sId, item, isShow) {

      return request({
        headers: {
          Accept: "application/json",
        },
        url: '/social/assistance/getFamilySQSIMG',
        method: "post",
        data: {
          sId: sId,
        },
      }).then((res) => {

        console.log(res, "then-getFamilySQSIMG");

      }).catch((res) => {

        if (res.response.status == 200) {       //返回成功200

          // console.log(res.response.data.length==0,"");
          // console.log(res.response.data[0]);
          if (res.response.data.length == 0) {
            //判断是否有数据--无
            // 展示
            if (isShow) {
              this.$alert('暂无授权数书', '提示', {
                confirmButtonText: '确定',
              });
            } else {
              console.log('节点数据列表=>', this.tableData);
              for (let i in this.tableData) {
                console.log(this.tableData[i].ab_id, this.sid);

                if (this.tableData[i].ab_id == sId) {
                  console.log(22);

                }
              }
            }
            return false
          } else {
            //--有数据，如果 isShow = true ,展示反馈列表
            // 展示
            if (isShow) {
              for (let i in res.response.data) {
                for (let j in res.response.data[i]) {
                  res.response.data[i][j] = unescape(res.response.data[i][j])
                }
              }
              this.visible5 = true;
              if (this.visible5 == true) {
                this.SQSListTable = [];
                for (let i in res.response.data) {

                  this.SQSListTable.push(res.response.data[i])
                }
              } else if (this.visible == false) {
                this.SQSListTable = []
              }
            } else {
              this.goUrl(item)
            }    //--有数据， isShow = false , 跳转页面
            console.log(this.SQSListTable, '授权书数据');
          }
        } else {
          // 如果是开发环境，没有核对报告也能提交，否则提示网络异常
          // 注 getFamilyHDPDF掉的是家庭经济核对系统的接口，核对系统出问题也会显示 ‘网络异常’
          if (process.env.NODE_ENV != "development") {
            this.$message.error("网络异常");
          } else {
            this.$message.error("网络异常");
            console.log("getFamilyHDPDF调用失败！");
          }
        }
      })
    },
    async assistanceCalculation (id) {
      try {
        await assistanceCalculationApi(id)
      } catch (error) {
        if (error.response.data.code !== 200) return this.$message.error(error.response.data.msg)
        error.response.data.data.forEach(item => this.typeOfSalvage.push(item.type))
      }
    },
    //页面跳转触发 或 pdf请求
    // item :按钮属性  value:该行数据
    goUrl (item, value) {
      var st = document.getElementById("pdfbox");
      // var st2=document.getElementById("iframe1");

      st.children[0].style.marginTop = "6vh";
      st.style.padding = "0px"
      st.children[0].children[0].children[0].style.color = "black";
      st.children[0].children[0].style.fontWeight = "600";

      //获取申请人id，作为上门核查的判断条件
      var ab_id = this.sid
      // console.log(ab_id);

      // wz:位置
      // var wz = item.url.indexOf("=");
      // var ab_id = item.url.substring(wz + 1, item.url.length);

      // // console.log(item.url);

      // if(item.name=="打印通知书" ||item.name=="打印档案"){
      //   ab_id = item.url.substring(wz + 10, item.url.length);
      //   console.log(ab_id,wz,"打印档案");
      // }

      if (item.type == "openWin") {  //type=='openWin'页面跳转

        let timestamp = Date.parse(new Date());
        let url = item.url;
        url = url.indexOf("?") == -1 ? url + "?timestamp=" + timestamp : url + "&timestamp=" + timestamp;

        console.log(url, "-----url");
        if (process.env.NODE_ENV == "development") {  //生产环境执行
          this.$router.push({
            path: url,
          });
        } else {
          this.$pushRouter({ path: generalConfig.defaultUrl + url, })
        }

        // this.$pushRouter({path:generalConfig.defaultUrl + url,})
        this.centerDialogVisible2 = true;

        if (item.title) {
          this.titles = item.title;
        } else {
          this.titles = item.name;
        }

      } else if (item.type == "get") {  //type=='get' 获取pdf
        console.log(item.url, "get");

        this.titles2 = item.name;
        this.loading = true;

        request({
          headers: {
            Accept: "application/json",
          },
          url: item.url,
          method: "post",
          data: {},
        })
          .then((res) => {
            this.loading = false;
            this.src = "data:application/pdf;base64," + res;
            this.centerDialogVisible4 = true;
          })
          .catch((res) => {
            this.loading = false;
            this.src = "data:application/pdf;base64," + res.response.data;
            this.centerDialogVisible4 = true;
          });

      } else if (item.type == "get2") {

        this.titles2 = item.name;
        this.loading = true;

        // 图片转换
        request({
          headers: {
            Accept: "application/json",
          },
          url: item.url,
          method: "post",
          data: {},
        }).then((res) => {

          this.loading = false;

        }).catch((res) => {
          // alert(sef.tableData[i].ab_ex120)
          this.loading = false;
          let json = res.response.data;
          this.pdfList = [];
          for (let i = 0; i < json.length; i++) {
            this.pdfList.push(
              "data:image/;base64," + unescape(json[i].base64)
            );
          }
          //this.src = 'data:application/pdf;base64,' + res.response.data;
          this.centerDialogVisible5 = true;
          // console.log(this.tableData[0].ab_ex73, "---------电子授权书");
        });
      } else if (item.type == "confirm" || item.type == "comfirms") {

        let sef = this;
        console.log(sef.tabData, "--tabData业务节点");
        console.log(sef.tableData, "--tableData数据");


        if (sef.tabData.length != 0) {
          // tab 切换 第三个是核查派单
          if (sef.tabData[0].listname.indexOf("重复救助") != -1) {
            this.submitData(item)
          }
          else if (sef.tabData.length > 2 && sef.tabData[2].val == "核查派单") {
            // 残疾人提交审核校验
            if (this.wur_title.indexOf('残疾人两项补贴') != -1 && item.name == '提交审核') {
              console.log(value, '数据');
              if (value.abd_ex99 != '是') {
                this.$alert('请完成上门核查', '提示', {
                  type: 'warning'
                })
              } else {
                // 提交下一节点
                this.submitData(item, value);
              }
            } else {
              // 社救相关模块提交审核校验
              for (let i in sef.tableData) {
                // if (sef.tableData[i].btn[2].name == "提交信息核对" && sef.tableData[i].ab_ex120 === 'B' && sef.tableData[i].ab_id == ab_id) return this.$message.error("")
                if (sef.tableData[i].btn[2].name == "提交信息核对" && ['', 'F', 'A', 'G'].includes(sef.tableData[i].ab_ex120) && sef.tableData[i].ab_id == ab_id) {
                  // console.log(sef.tableData[i].ab_ex120 == "");
                  // console.log(sef.tableData[i]);
                  console.log("第" + (i * 1 + 1) + "位", "条件不符合");
                  this.$message.warning("请先完成上门核查");
                  return false;
                }
                else if (sef.tableData[i].btn[2].name == "提交信息核对" && !['', 'F', 'A', 'G'].includes(sef.tableData[i].ab_ex120) && sef.tableData[i].ab_id == ab_id) {
                  //  核对状态
                  //  if(sef.tableData[i].ab_ex192 == ""){
                  /*
                   * 提交信息核对时，特殊账号验证，特殊账号不用进行核对类型选择，直接提交，正常账号需要选择一个核对类型
                   *
                  */
                  if (!this.specialAccount) {
                    // 核对类型选择弹框
                    this.dialogFormVisible = true;
                    // console.log()
                    this.assistanceCalculation(this.tableRowInfo.ab_id)
                  } else {

                    this.submitData(item);
                  }

                  console.log(sef.tableData[i].ab_ex120, "ab_ex120");
                }

                // 尊老金不进行类别派发选择
                if (sef.tableData[i].btn[2].name == "提交审核" && sef.tableData[i].ab_id == ab_id && this.tabName.indexOf('尊老金') == -1) {
                  console.log('提交审核22222222');

                  this.getDistributeTypes();  //派发有临时救助
                  // this.submitData(item);    //派发无临时救助


                  // this.$message.warning("请先落实核查信息");
                  // console.log(sef.tableData[i], "条件通过2");
                  // return false;

                }

                if (sef.tableData[i].btn[2].name == "核查派单" && sef.tableData[i].ab_id == ab_id) {
                  this.submitData(item)
                  console.log('核查派单');
                }
                // 删除按钮点击提示
                if (sef.tableData[i].btn[1].name == "删除" && sef.tableData[i].ab_id == ab_id) {
                  this.submitData(item, i);
                  console.log('删除');
                }
                // if(sef.tableData[i].btn[2].name == "导出"){
                //   console.log('导出按钮的item',item);
                // }
              }
            }


          } else {
            //审批确定里的提交  ，死亡预警里的 标记已处理
            console.log('2492-sumitData');
            this.submitData(item, value)
          }
        }
        else if (item.name.indexOf('导出') != -1) {
          console.log('导出按钮的item', item);

        }
        else {
          // 执行删除
          console.log('执行删除=>', this.sid);
          console.log(this.tabName, "--模块名称");
          /*
           * 模块： 资金发放信息管理模块
           * 功能： 删除生成资金发放生成的数据。
           * 注意： 这里有一个时间的判断条件： 本月 && 开始是每月10号前，后来改成每月20号前，现在是每月31号前--才可删除
           * 变量： ym--年月：yyyymm格式  today--今天几号 ar_dat3_view--发放年月
          */

          if (this.tabName == "资金发放信息") {
            let date = new Date();
            let y = date.getFullYear();
            let M = date.getMonth() + 1;
            let d = date.getDate();
            let ym = "";
            if (M > 9) {
              ym = y + '' + M;
            } else {
              ym = y + '0' + M;
            }

            let today = d + '';
            // let ym =  date.Format('yyyyMM');
            // let today =  date.Format('dd');

            console.log(ym, today, "--当前时间", y, M, d);
            console.log("救助资金发放信息管理的删除按钮");
            // console.log(this.sid,'this.sId');

            for (let i in this.tableData) {
              if (this.tableData[i].ar_id == this.sid) {
                console.log(this.tableData[i].ar_dat3_view, ym);
                // console.log(this.tableData[i].btn[5].name,this.sid );
                console.log(item,);
                // if((this.tableData[i].ar_dat3_view*1 <= 202206 || today>20) && !['单人保家庭','低保边缘家庭','支出型困难家庭'].includes(this.tableData[i].ar_ex1) ){
                if ((this.tableData[i].ar_dat3_view < ym || today > 31) && !['单人保家庭', '低保边缘家庭', '支出型困难家庭'].includes(this.tableData[i].ar_ex1) && item.name == '删除') {

                  this.$confirm("超出操作时间，禁止删除", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                  }).then(() => {

                  }).catch((res) => {

                  })
                } else {
                  this.submitData(item)
                }
              }

            }
          } else {
            this.submitData(item, value)

          }
        }
        // console.log(item.name,'item.name');
      }

    },


    // 派发方式请求判断 1社救+临时 ；2社救 ；3临时
    getDistributeTypes () {
      console.log('派发方式请求判断');

      // 打开派发类型选择弹框
      this.dialogVisible11 = true;

      // 打开遮罩
      this.loading = true;

      // 设置定时器，30秒请求失败刷新页面
      let time = setTimeout(() => {
        this.loadData();
        this.$message.error("网络异常");
      }, 30000);

      request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/assistance/getDistributeTypes",
        method: "post",
        data: {
          id: this.sid,
        },
      }).then((res) => {

        this.loading = false;

        //释放内存
        // window.URL.revokeObjectURL(link.href);

      }).catch((res) => {


        // 数据请求成功删除定时器
        clearTimeout(time);



        if (res.response.data.status != '+OK') {
          this.$message.error("网络异常");
          this.loading = false;
          return false
        }

        this.loading = false;
        this.DistributeTypes = res.response.data.data;
        console.log(res.response.data.data, '派发方式请求判断');


      })
    },

    // 提交到下个阶段弹框提示
    async submitData (item, value) {
      console.log('comfirms 按钮属性=>', item);
      console.log('节点/模块名字', this.tabName, value);
      console.log("rowItem", rowItem, this.$route)
      if (item.name === "提交信息核对") {
        this.$confirm("是否提交到信息核对", "提示", {
          distinguishCancelAndClose: true,
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning",
        }).then(async () => {
          // 如果点击的是 否按钮
          try {
            await isSelectGreenChannelApi({
              sId: rowItem.ab_id,
              green: "否"
            })
          } catch (error) {
            if (error && error.response && error.response.data && error.response.data.status === "+OK") {
              this.$message.success(error.response.data.msg)
              return this.$refs['formSearchButton'].$el.click()
            }
            return this.$message.error(error.response.data.msg)
          }
          // 原是否提交到绿色通道功能
          // try {
          //   await isSelectGreenChannelApi({
          //     sId: rowItem.ab_id,
          //     green: "是"
          //   })
          // } catch (error) {
          //   // 如果点击的是  是按钮
          //   if (error && error.response && error.response.data && error.response.data.status === "+OK") {
          //     this.$message.success(error.response.data.msg)
          //     return this.$refs['formSearchButton'].$el.click()
          //   }
          //   return this.$message.error(error.response.data.msg)
          // }
        }).catch(async action => {
          this.$message.warning("已取消提交到信息核对")
          // return console.log(action, "action")
          // if (action === 'cancel') {
          //   // 如果点击的是 否按钮
          //   try {
          //     await isSelectGreenChannelApi({
          //       sId: rowItem.ab_id,
          //       green: "否"
          //     })
          //   } catch (error) {
          //     if (error && error.response && error.response.data && error.response.data.status === "+OK") {
          //       this.$message.success(error.response.data.msg)
          //       return this.$refs['formSearchButton'].$el.click()
          //     }
          //     return this.$message.error(error.response.data.msg)
          //   }
          // }
        })
        return
      }
      let type2 = '';
      let data = {};

      // 死亡预警的提交 value 是点击行的所有数据
      if (this.tabName == '死亡预警') {
        data = value;
      } else if (item.name == '确认资金发放') {
        type2 = '';

      } else {
        // 信息核对时提交审批选择的派发方式
        type2 = value;

      }


      // 派单类型选择弹框 除残疾人两补、尊老金模块以外的‘提交审核按钮’
      if (item.name == '提交审核' && this.tabName.indexOf('尊老金') == -1 && this.tabName.indexOf('残疾人') == -1) {
        console.log('尊老金1111111111111111111111111111111', this.tabName);
        this.dialogVisible11 = true;
      }

      // 提示信息拼接
      var prompt = '';
      if (item.name == '删除') {
        if (this.tabName == '资金发放信息') {
          //   console.log(this.tableData,"--列表数据");
          prompt = '确定要删除该批次发放名单?';
        } else {
          prompt = '确定要删除该条数据?';
        }
      }
      else if ([1, 2, 3].includes(type2)) {

        // 派发方式提示信息
        var name = ''
        if (type2 == 1) {

          name = ' 普通社会救助和临时救助';

        } else if (type2 == 2) {

          name = ' 普通社会救助 ';

        }
        else if (type2 == 3) {

          name = ' 临时救助 ';

        }

        console.log(type2, name, '派发选择');

        prompt = "确定要进行" + name + "派发?";


      } else {
        // 其他提交提示信息
        prompt = "确定要" + item.name + "?";
      }

      // 
      this.$confirm(prompt, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {

        this.loading = true; // 打开遮罩层

        // 设置定时器，30秒请求失败刷新页面
        let time = setTimeout(() => {
          this.loadData();
          this.$message.error("网络异常");
        }, 30000);

        // var data={};
        // var charId = sessionStorage.getItem("charId").split('_')[1]
        // if(item.name == '确认资金发放'){
        //   data.cId = charId
        // }

        console.log(item, data);
        //接口参数 
        var objData = {};

        if (this.wur_title == '自定义预警') {
          objData = {
            url: item.url,
            method: "post",
            data: {
              acw_id: this.sid
            },

          }

        } else
          if (type2 != '') {

            objData = {
              url: item.url + '&type=' + this.type2 + '&id=' + this.sid,
              method: "post",
              data: {
                type: this.type2,
                id: this.sid
              },

            }

          } else {

            objData = {
              url: item.url,
              method: "post",

              data: {
                type: this.type2,
                id: this.sid,
                ad_id: data.ad_id,
              }


            }

          }

        request(
          //   {
          //   url: item.url,
          //   method: "post",
          //   data: {},
          // }
          objData
        ).then((res) => {

          // 数据请求成功删除定时器
          clearTimeout(time);

          this.loading = false;
          if (res[0].status == "+OK") {

            // this.$alert(unescape(res[0].msg), '提示', {
            // confirmButtonText: '确定',
            // });

            this.$message({
              message: unescape(res[0].msg),
              type: "success",
            });

            this.loadData();
          } else {
            //  this.$alert(unescape(res[0].msg), '提示', {
            //   confirmButtonText: '确定',
            // });
            sef.$message.error(unescape(res[0].msg));
          }
        })
          .catch((res) => {

            // 数据请求成功删除定时器
            clearTimeout(time);
            this.loading = false;

            // this.loadData();
            // var string =  res.response.data[0].msg.replace('\n','<br>');
            console.log(res, 'res');

            // 死亡预警数据格式已经从[{}]改为{}==9.23
            // if( this.tabName=='死亡预警'){
            //   if (res.response.data.status == "+OK"){

            //     this.$alert(res.response.data.msg, "提示", {
            //       confirmButtonText: "确定",
            //       // customClass:'message_box_alert',
            //       // dangerouslyUseHTMLString:true
            //     });

            //     this.loadData();
            //   }else{

            //     this.$alert(res.response.data.msg, "提示", {
            //       confirmButtonText: "确定",
            //       type:'warning',
            //       // customClass:'message_box_alert',
            //       // dangerouslyUseHTMLString:true
            //     });

            //   }


            // }

            // else
            // let dataType = typeof(res.response.data)
            //  console.log(dataType,'数据类型','1');

            //  console.log(Object.prototype.toString.call(res.response.data),'2')



            // 判断返回的数据类型是否为数组
            let dataType = res.response.data instanceof Array
            console.log(res.response.data instanceof Array, '是否数组');

            // 是数组
            if (dataType == true) {
              if (res.response.data[0].status == "+OK") {

                let string = res.response.data[0].msg;
                console.log(res.response.data[0].msg, "------成功提示"); //上门核查中低保类别不能为空

                // this.$alert(unescape(res.response.data[0][0].msg), '提示', {
                this.$alert(unescape(string), '提示', {
                  confirmButtonText: '确定',
                  dangerouslyUseHTMLString: true
                }).then(res => {
                  // console.log(res,'res1');
                  // 关闭派发方式选择弹框
                  this.dialogVisible11 = false;
                }).catch(res => {
                  // console.log(res,'res2');

                });

                // console.log(res.response.data[0][0],"返回值msg");
                console.log(string, "返回值msg");

                // 提交审批成功后 派单类型清空
                this.type2 = ''

                this.loadData();

              } else {


                /*
                  * 功能 ：
                  * 1、业务数据提交下一节点，往下一节点提交成功后 ，后端提示信息回显
                  * 2、资金发放模块，排查没有进行资金发放的街道都有哪些， 街道间进行换行
                  *
                  * string 是提示内容
                  *
                  * 注：资金发放管理-确认资金发放按钮-接口返回的数据解构是 [{msg:'',stauts:''}]---9.23史工已解决为{}
                  *  群众申请-提交审批按钮-接口返回的数据解构是  {msg:'',stauts:''}
                */

                let string = '';

                console.log(res.response.data[0].msg);


                if (res.response.data[0].msg.indexOf('\r\n') != -1 && item.btnName == '确认资金发放') {

                  string = res.response.data[0].msg.split('\r\n').join('<br/>');
                } else {
                  string = res.response.data[0].msg;
                }

                console.log(res.response.data[0], 'data[0]');
                console.log(string, 'string');

                this.$alert(string, "提示", {
                  confirmButtonText: "确定",
                  customClass: 'message_box_alert',
                  dangerouslyUseHTMLString: true,
                  // type:'warning',
                }).then(res => {
                  console.log(res, 'res1');
                }).catch(res => {
                  console.log(res, 'res2');

                });


              }
            } else {
              if (res.response.data.status == "+OK") {

                let string = res.response.data.msg;
                console.log(res.response.data.msg, "------成功提示"); //上门核查中低保类别不能为空

                // this.$alert(unescape(res.response.data[0].msg), '提示', {
                this.$alert(unescape(string), '提示', {
                  confirmButtonText: '确定',
                  dangerouslyUseHTMLString: true
                }).then(res => {
                  // console.log(res,'res1');
                  // 关闭派发方式选择弹框
                  this.dialogVisible11 = false;
                }).catch(res => {
                  // console.log(res,'res2');

                });

                // console.log(res.response.data[0],"返回值msg");
                console.log(string, "返回值msg");

                // 提交审批成功后 派单类型清空
                this.type2 = ''

                this.loadData();

              } else {

                // 资金发放管理-确认资金发放按钮-接口返回的数据解构是 [{msg:'',stauts:''}]---9.23史工已解决为{}
                // 群众申请-提交审批按钮-接口返回的数据解构是  {msg:'',stauts:''}

                let string = '';
                console.log(res.response.data.msg.indexOf('\\r\\n') != -1);
                console.log(item, item.name == '确认资金发放');
                // console.log(res.response.data.msg);

                // 排查 没有进行资金发放的街道都有哪些， 街道间进行换行
                if (res.response.data.msg.indexOf('\\r\\n') != -1 && item.name == '确认资金发放') {

                  string = res.response.data.msg.split('\\r\\n').join('<br/>');
                } else {
                  string = res.response.data.msg;
                }

                console.log(res.response.data, 'data');
                console.log(string, 'string');

                this.$alert(string, "提示", {
                  confirmButtonText: "确定",
                  customClass: 'message_box_alert',
                  dangerouslyUseHTMLString: true,
                  // type:'warning',
                }).then(res => {
                  console.log(res, 'res1');
                }).catch(res => {
                  console.log(res, 'res2');

                });

              }

            }

          });
      })
        .catch(() => { });
    },

    // excel转码
    base64ToBlob (code) {
      let parts = code.split(";base64,");
      let contentType = parts[0].split(":")[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;

      let uInt8Array = new Uint8Array(rawLength);

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      return new Blob([uInt8Array], {
        type: contentType,
      });
    },

    // 低保导出按钮测试
    diBaoLoadExcel () {
      console.log('低保导出测试');
      // let msg = item.wb_msg;
      // let msgs = msg.split("#");
      // let selectField = msgs.length > 2 ? msgs[2] : "*";
      // let groupField = msgs.length > 3 ? msgs[3] : "";
      // let listField = msgs.length > 4 ? msgs[4] : "";
      // let titles = msgs.length > 5 ? msgs[5] : "";

      // console.log(msgs,selectField,groupField,listField,titles);
      //let url='/social/excel/ExcelDownload?printName='+escape(escape(msgs[0]))+"&groupField="+groupField+"&selectField="+escape(escape(selectField))+"&titles="+escape(escape(titles))+"&listField="+escape(escape(listField))+"&sType="+escape(escape(msgs.length>1 ? msgs[1]:""))+"&sCurItem=&pParam="+escape(escape(JSON.stringify(this.searchData)));

      this.loading = true;

      request({
        headers: {
          Accept: "application/json",
        },
        // url: "/social/excel/ExcelDownload",
        url: "/social/excel/ExcelDownload2",
        method: "post",
        data: {

          // printName: escape(escape(msgs[0])),
          // groupField: groupField,
          // selectField: escape(escape(selectField)),
          // titles: escape(escape(titles)),
          // listField: escape(escape(listField)),
          // sType: escape(escape(msgs.length > 1 ? msgs[1] : "")),
          sCurItem: "",
          pParam: escape(escape(JSON.stringify(this.searchData))),
          sKey: "" + this.sKey,
          listname: this.listname,
          limit: "" + this.limit,
          page: "" + this.page,
        },
      }).then((res) => {

        this.loading = false;
        let data = this.base64ToBlob("data:application/vnd.ms-excel;base64," + res);
        let blob = new Blob([data], { type: "application/vnd.ms-excel", });
        let fileName = Date.parse(new Date()) + ".xlsx";
        console.log(blob, "--1659");

        if (window.navigator.msSaveOrOpenBlob) {

          navigator.msSaveBlob(blob, fileName);
        } else {

          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
          //释放内存
          window.URL.revokeObjectURL(link.href);
        }
      }).catch((res) => {

        this.loading = false;
        let data = this.base64ToBlob("data:application/vnd.ms-excel;base64," + res.response.data);
        let blob = new Blob([data], { type: "application/vnd.ms-excel", });
        let fileName = Date.parse(new Date()) + ".xlsx";
        console.log(blob);

        if (window.navigator.msSaveOrOpenBlob) {
          // console.log(2)
          navigator.msSaveBlob(blob, fileName);
        } else {
          // console.log(3)
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
          //释放内存
          window.URL.revokeObjectURL(link.href);
        }
      });

    },


    // 救助资金发放**导出按钮，群众申请、尊老金的新增按钮，支出贫困等救助模块导出按钮
    async grant (item) {
      // return console.log(item)
      // 残疾补贴发放 excel导入
      if (item.buttonName === "新增" && item.wb_msg === '问题反馈') return this.$emit("addProblemFeedback")
      if (item.buttonName === "生成三个月无核对报告家庭" && item.wb_msg === '核对报告复核预警') return this.$emit("generateAReport")
      if (item.buttonName === "提交三个月无核对报告家庭" && item.wb_msg === '核对报告复核预警') return this.$emit("submitAReport")
      // if (item.buttonName === "新增") return this.$emit("addEmployee", item)
      if (item.buttonName === "区市发放统计报表" && this.tabName === '资金发放信息') {
        console.log(132132)
        return this.$emit("urbanStatisticalStatement", item)
      }
      if (item.buttonName === "定期走访记录派发" && this.tabName === '定期走访') return this.$emit("operateButton")
      if (item.buttonName === "新增" && this.$route.path.includes("audit")) return this.$emit("addData")
      if (item.buttonName === "生成定期走访记录" && this.$route.path.includes("dqzfList")) return this.$emit("createData")
      if (item.buttonName === "更新定期走访记录" && this.$route.path.includes("dqzfList")) return this.$emit("updataRecord")
      if (this.tabName == '资金发放信息') {

        console.log(item, '救助资金发放信息管理');

        if (item.name.indexOf('导出') != -1) {

          item.buttonName = '救助资金发放';
          item.wb_msg = '';
          item.buttonName = '救助资金发放导出';
          var sid = item.url.split("=")[1];


          this.$confirm('确认导出所选数据？', '提示')
            .then((res) => {

              this.loading = true;

              // 数据导出请求
              request({
                headers: {
                  Accept: "application/json",
                },
                // url: "/social/excel/exportReliefdistExcel",
                url: "/social/excel/exportReliefdistExcel2",
                method: "post",
                data: {

                  sId: sid,
                  btnName: item.name,
                },
              }).then((res) => {

                this.loading = false;
                let data = this.base64ToBlob("data:application/vnd.ms-excel;base64," + res);
                let blob = new Blob([data], { type: "application/vnd.ms-excel", });
                let fileName = Date.parse(new Date()) + ".xlsx";
                // console.log(blob,"--1659");

                if (window.navigator.msSaveOrOpenBlob) {

                  navigator.msSaveBlob(blob, fileName);
                } else {

                  var link = document.createElement("a");
                  link.href = window.URL.createObjectURL(blob);
                  link.download = fileName;
                  link.click();
                  //释放内存
                  window.URL.revokeObjectURL(link.href);
                }

              }).catch((res) => {

                this.loading = false;
                let data = this.base64ToBlob("data:application/vnd.ms-excel;base64," + res.response.data);
                let blob = new Blob([data], { type: "application/vnd.ms-excel", });
                let fileName = Date.parse(new Date()) + ".xlsx";
                console.log(blob);

                if (window.navigator.msSaveOrOpenBlob) {

                  navigator.msSaveBlob(blob, fileName);
                } else {

                  var link = document.createElement("a");
                  link.href = window.URL.createObjectURL(blob);
                  link.download = fileName;
                  link.click();
                  //释放内存
                  window.URL.revokeObjectURL(link.href);
                }
              })


            })
            .catch((res) => {
              console.log('取消导出');
            })
          // console.log(sid);


        }

      } else if (item.buttonName.indexOf("导出") != -1 && this.tabName == '死亡信息') {

        this.loading = true;
        let url = "/social" + item.url.split("?")[0];

        //  return false
        request({
          headers: {
            Accept: "application/json",
          },
          url: url,
          // url: "/social/excel/ExcelDownload2",
          // url: "/social/excel/ExcelDownload",
          method: "post",
          data: {
            type: this.tabName,
            searchData: this.searchData,
          }
        }).then((res) => {

          this.loading = false;
          let data = this.base64ToBlob("data:application/vnd.ms-excel;base64," + res);
          let blob = new Blob([data], { type: "application/vnd.ms-excel", });
          let fileName = Date.parse(new Date()) + ".xlsx";
          console.log(blob, "--1659");

          if (window.navigator.msSaveOrOpenBlob) {

            navigator.msSaveBlob(blob, fileName);
          } else {

            var link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            //释放内存
            window.URL.revokeObjectURL(link.href);
          }
        }).catch((res) => {

          this.loading = false;
          let data = this.base64ToBlob("data:application/vnd.ms-excel;base64," + res.response.data);
          let blob = new Blob([data], { type: "application/vnd.ms-excel", });
          let fileName = Date.parse(new Date()) + ".xlsx";
          console.log(blob);

          if (window.navigator.msSaveOrOpenBlob) {
            // console.log(2)
            navigator.msSaveBlob(blob, fileName);
          } else {
            // console.log(3)
            var link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            //释放内存
            window.URL.revokeObjectURL(link.href);
          }
        });

      } else if (item.buttonName.indexOf("导出") != -1 && this.tabName != '资金发放信息') {

        console.log(item, '非资金发放信息的导出按钮属性');

        let msg = item.wb_msg;
        let msgs = msg.split("#");
        let selectField = msgs.length > 2 ? msgs[2] : "*";
        let groupField = msgs.length > 3 ? msgs[3] : "";
        let listField = msgs.length > 4 ? msgs[4] : "";
        let titles = msgs.length > 5 ? msgs[5] : "";

        console.log(msgs, selectField, groupField, listField, titles);
        console.log(item.url, '按钮绑定地址');
        //let url='/social/excel/ExcelDownload?printName='+escape(escape(msgs[0]))+"&groupField="+groupField+"&selectField="+escape(escape(selectField))+"&titles="+escape(escape(titles))+"&listField="+escape(escape(listField))+"&sType="+escape(escape(msgs.length>1 ? msgs[1]:""))+"&sCurItem=&pParam="+escape(escape(JSON.stringify(this.searchData)));

        // 接口路径
        let url = '';
        let data = {};

        // 根据不同的模块调用不同的导出接口
        // 低保、特困、支出、单人保导出是ExcelDownload2，
        // 重复预警、生活状况变动监督模块是后端数据库里导出按钮自带的url属性 接口
        // 残疾人两项补贴 exportDisabled - 参数和其他不一样的
        // 预警申请导出是 exportWarning

        console.log(item.buttonName);
        console.log(item.url.split("?")[0], '重复救助预警导出url');

        data = {

          printName: escape(escape(msgs[0])),
          groupField: groupField,
          selectField: escape(escape(selectField)),
          titles: escape(escape(titles)),
          listField: escape(escape(listField)),
          sType: escape(escape(msgs.length > 1 ? msgs[1] : "")),
          sCurItem: "",
          pParam: escape(escape(JSON.stringify(this.searchData))),
          sKey: "" + this.sKey,
          listname: this.listname,
          limit: "" + this.limit,
          page: "" + this.page,
        };

        if (item.buttonName == '重复救助预警导出' || (item.buttonName == '导出' && ['水电气缴费情况', '通讯出行情况', '疾病康复情况'].includes(this.tableName))) {
          console.log('按钮自带导出');
          if (item.buttonName == '重复救助预警导出') {

            url = item.url.split("?")[0];
          } else {

            url = '/social' + item.url.split("?")[0];
            data = { type: this.tableName }
          }
          console.log(url);

        } else if (item.buttonName == '残疾人两项补贴导出') {

          url = "/social/assistance/exportDisabled";

        } else if (['群众申请', '医疗推送', '预警推送', '主动排查'].includes(this.wur_title)) {

          url = "/social/excel/exportWarning";
          data = {
            ab_ex13: this.wur_title,
            ab_ex15: this.tabName,
            params: JSON.stringify(this.searchData),
          }

        } else if (item.buttonName == '尊老金导出') {

          url = "/social/elderController/exportRepeatExcel ";

        } else { // 社救导出

          url = "/social/excel/ExcelDownload2";

        }
        // 联动救助保障平台 > 协同部门救助信息归集系统下 所有的模块导出url(死亡预警除外)
        let InformationCollectionArr = ["残疾人名单", "长护保险待遇名单", "高额医疗费", "特困职工", "大重病预警", "救助诚信", "陆运从业资格", "建档立卡扶贫"]
        if (InformationCollectionArr.includes(this.tabName)) {
          url = "/social/excel/exportDistrictLevelComparison",
            data.type = this.tabName
        }
        this.loading = true;
        request({
          headers: {
            Accept: "application/json",
          },
          url: url,
          // url: "/social/excel/ExcelDownload2",
          // url: "/social/excel/ExcelDownload",
          method: "post",
          data: data
        }).then((res) => {

          this.loading = false;
          let data = this.base64ToBlob("data:application/vnd.ms-excel;base64," + res);
          let blob = new Blob([data], { type: "application/vnd.ms-excel", });
          let fileName = Date.parse(new Date()) + ".xlsx";
          console.log(blob, "--1659");

          if (window.navigator.msSaveOrOpenBlob) {

            navigator.msSaveBlob(blob, fileName);
          } else {

            var link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            //释放内存
            window.URL.revokeObjectURL(link.href);
          }
        }).catch((res) => {

          this.loading = false;
          let data = this.base64ToBlob("data:application/vnd.ms-excel;base64," + res.response.data);
          let blob = new Blob([data], { type: "application/vnd.ms-excel", });
          let fileName = Date.parse(new Date()) + ".xlsx";
          console.log(blob);

          if (window.navigator.msSaveOrOpenBlob) {
            // console.log(2)
            navigator.msSaveBlob(blob, fileName);
          } else {
            // console.log(3)
            var link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            //释放内存
            window.URL.revokeObjectURL(link.href);
          }
        });
      } else if (item.buttonName.indexOf("支出贫困导出") != -1 || item.buttonName.indexOf("低保按户保导出") != -1) {
        // 这部分条件压根没用 , 是无效的起作用的是上一个条件
        console.log('支出贫困导出');
        console.log(item.url, "item.buttonName");

        if (process.env.NODE_ENV == "development") {

          this.$router.push({ path: item.url, });
        } else {

          this.$pushRouter({ path: generalConfig.defaultUrl + item.url, })
        }

        // this.$pushRouter({path:generalConfig.defaultUrl + item.url,})
        if (item.title) {
          this.titles = item.title;
        } else {
          this.titles = item.name;
        }

        this.centerDialogVisible2 = true;
      } else if (item.buttonName.indexOf("核对报告检测") != -1) {

        console.log('核对报告检测');
        await this.$alert("核对报告按当前日期比对近三个自然月数据，是否继续比对已认定数据中三个自然月内无核对报告数据？", '提示');

        console.log(item.url, '核对报告检测-item.url');
        console.log(sid, '核对报告检测-sid');
        var sid = item.url.split("=")[1];

        let msg = item.wb_msg;
        let msgs = msg.split("#");
        let selectField = msgs.length > 2 ? msgs[2] : "*";
        let groupField = msgs.length > 3 ? msgs[3] : "";
        let listField = msgs.length > 4 ? msgs[4] : "";
        let titles = msgs.length > 5 ? msgs[5] : "";

        console.log(msgs, selectField, groupField, listField, titles);
        //let url='/social/excel/ExcelDownload?printName='+escape(escape(msgs[0]))+"&groupField="+groupField+"&selectField="+escape(escape(selectField))+"&titles="+escape(escape(titles))+"&listField="+escape(escape(listField))+"&sType="+escape(escape(msgs.length>1 ? msgs[1]:""))+"&sCurItem=&pParam="+escape(escape(JSON.stringify(this.searchData)));

        this.loading = true;

        // 数据导出请求
        request({
          headers: {
            Accept: "application/json",
          },
          url: "/social/assistance/createCheckReportWaringList",
          // url: "/social/assistance/batchCommitCheckReport",
          method: "post",
          data: {
            printName: escape(escape(msgs[0])),
            groupField: groupField,
            selectField: escape(escape(selectField)),
            titles: escape(escape(titles)),
            listField: escape(escape(listField)),
            sType: escape(escape(msgs.length > 1 ? msgs[1] : "")),
            sCurItem: "",
            pParam: escape(escape(JSON.stringify(this.searchData))),
            sKey: "" + this.sKey,
            listname: this.listname,
            limit: "" + this.limit,
            page: "" + this.page,
            // sId:sid,
            // btnName:item.name,
          },
        }).then((res) => {
          console.log('核对报告检测请求结果 --then');
          this.loading = false;

        }).catch((res) => {
          console.log('核对报告检测请求结果 --catch');
          this.loading = false;

        })

      } else if (item.buttonName.indexOf("导入") != -1) {
        console.log(item.buttonName, '导入');
        if (item.buttonName == '残疾人两项补贴导入') {

          this.Disabledshow = true;
        } else if (item.buttonName == '导入') {
          console.log(this.tableName, '导入');
          this.Disabledshow = true;
        }

      } else {  // 新增按钮请求

        item.url = item.url.split('&')[0]
        console.log(item.url, "--新增");

        // 点击新增按钮，进行路由跳转（区分本地和线上环境）
        if (process.env.NODE_ENV == "development") {

          this.$router.push({
            path: item.url + '&eventType=addNewData', // query:JSON.stringify(this.searchData) 
          });
        } else {
          this.$pushRouter({ path: generalConfig.defaultUrl + item.url + '&eventType=addNewData' })
        }

        // 这个条件不知道干嘛的
        if (item.title) {
          this.titles = item.title;
        } else {
          this.titles = item.name;
        }

        this.centerDialogVisible2 = true;
      }
    },

    // 重新发放的街道
    againCreateReliefDistList (optionData) {
      this.loading = true;
      let obj = {
        "name": optionData.ar_ex1 === "低保边缘家庭" ? "最低生活保障边缘" : optionData.ar_ex1, //业务名称
        "date": optionData.ar_dat3_view, //发放年月
        "type": optionData.ar_ex6, //发放类型
        "subsidy": optionData.ar_ex10, //增发补助
        'ar_ex9': optionData.ar_ex9,
        'sid': optionData.ar_id,
        'arc_ex5': this.checkedCities,//选择的确认后重新发放的街道
      }

      // console.log(item,'重新发放资金');
      console.log(obj, '重新发放资金参数');
      console.log(optionData, '重新发放资金选中列数据');
      try {
        this.againCreateReliefDistListData({
          "data": '[' + JSON.stringify(obj) + ']',
        }).then((res) => {
          console.log(res, 'then');
        }).catch((res) => {
          console.log(res, 'catch');
          this.loading = false;
          if (res.response.data.status == '+OK') {
            // if(res.response.data[0].status=='+Ok'){
            this.$message.success(res.response.data.msg)
            this.loadData();
          } else if (res.response.data.status == '+ERR') {
            this.$message.error(res.response.data.msg)
            this.loading = false;
          } else if (res.response.data[0].status == '-ERR') {
            this.$message.error(res.response.data[0].msg)
            this.loading = false;
          } else {
            this.loading = false;
            this.$message.error('网络错误！')
          }

          // this.dialogVisible_a = false; //关闭街道弹框
        })

      } catch (error) {
        this.loading = false;
        this.$message.error('网络错误！')
      }

    },
    // 资金发放管理重新发放请求接口
    againCreateReliefDistListData (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/assistance/againCreateReliefDistList",
        method: "post",
        data: data,
      })
    }





  },
  // 销毁周期--销毁回车响应事件
  destroyed () {
    console.log('销毁周期');
    window.removeEventListener("keydown", this.handleKeyDown, true)
  },
  // 创建周期
  created () {
    this.getData(true);

    // console.log(this.tabsNum2,"created");
    // if(this.tabsNum2){   
    window.addEventListener("keydown", this.handleKeyDown, true); //开启监听键盘按下事件
    // }
  },
};
</script>



<style scoped lang="less">
.showOperateButton {
  position: absolute;
  left: 16px;
  top: auto;
  bottom: auto;
  z-index: 9999;
}
.g-box {
  display: flex;
  /* width: 100%; */
  height: 80vh;
  flex-direction: column;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.e-table {
  flex: 1;
  overflow: auto;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}

.view {
  height: 50px;
}

.footer {
  height: 57px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  padding-top: 10px;
  text-align: right;
  padding-right: 30px;
  /*background:#f9f9f9;*/
  background: #fff;
  border-top: 1px solid #ddd;
}
/* 搜索那一排的按钮间距 */
.btn_group > .el-form-item__content > button,
span {
  margin: 0 10px;
}
/* 通用全局样式 */
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 180px !important;
}
.labelName {
  width: 120px;
}
/* 解决tab切换到信息核对是表格下方留白的问题-需要注意列名要足够宽，不能换行，否则滑块会被挤不见 */
.my_table /deep/.el-table__body-wrapper {
  height: calc(100% - 44px) !important;
}
/deep/.table-row:hover {
  background-color: #d10d0d !important;
}
</style>

<style lang="less" scoped>
/* 表格添加下划线 */
.g-box .el-table td {
  border-bottom: 1px solid #ebeef5;
}

/* *站内信长单词强制居中 */
.message_box_alert {
  /* word-break: break-all !important; */
  text-align: center !important;
}
.message_box_alert p {
  height: auto;
  max-height: 500px;
  overflow-y: auto !important;
}

/*.warning-row {
  background: #c0d2c6 !important;
  background: #dcdcdc !important;
}*/
.success-row {
  /* background: #C0C0C0 !important; */
  background: #dcdcdc !important;
}

/* 	.el-dialog__header{
			text-align: center !important;
		} */
.el-dialog__title {
  font-size: 22px !important;
}
.el-table-column--selection .cell {
  text-align: center;
}
/* 操作下居中 */
.cell {
  text-align: center;
}
/* 表头颜色 */
.el-table--border th {
  /* background-color: #2196f394 !important; */
  /* box-shadow: 0 0 18px rgb(12 4 8 / 5%); */
  /* box-shadow: 0 2px 12px 0 rgb(0 0 0 / 5%); */
  font-weight: 700;
  font-size: 14px;
}
.buttonBox {
  margin-right: 10px;
}
/* 表格宽度铺满 */
.el-table__body,
.el-table__footer,
.el-table__header {
  width: 100% !important;
}
/* 节点数据样式 */
.tabNum {
  background-color: red;
  color: white;
  width: 30px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  text-align: center;
}
.com_num:nth-child(0) {
  /* color: rgb(109, 109, 109); */
  margin-bottom: 0px !important;
}
/* 反馈列表 */
.fkList {
  width: 100vw;
  height: 100vh;
  background-color: #0808087a;
  z-index: 100;
  position: absolute;
  top: -50px;
  left: -250px;
}
.cfbox {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 99999;
}
/deep/ .cfbox > .el-popover {
  width: 80%;
  z-index: 1000;
  padding: 10px;
  width: 1400px;
  max-height: 400px;
  text-align: center;
  transform: translate(-50%, -50%) !important;
}
.fkbox > .el-popover {
  width: 480px;
  z-index: 1000;
  max-height: 400px;
  /* overflow-y: auto; */
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.fkbox .el-table__body tr:hover > td {
  cursor: pointer !important;
}

.el-icon-close {
  font-size: 14px;
}
.el-icon-close:hover {
  color: rgb(51, 203, 250) !important;
}
.fkbox .el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #ebeef5;
}

.CheckCategoriesBox .el-dialog {
  width: 30%;
}
.CheckCategoriesBox .el-dialog__header {
  text-align: center;
  border-bottom: 1px solid #ddd;
}
.CheckCategoriesBox .el-dialog__body {
  padding: 20px 20px 0px;
}

.el-table__footer {
  border-bottom: 1px solid #ebeef5;
}

/deep/ .el-table__fixed-body-wrapper {
  top: 40.72px !important;
  height: calc(100% - 44px) !important;
}
/deep/ .has-gutter {
  th {
    height: 40.72px !important;
    font-size: unset;
    text-align: center;
    div {
      text-align: center !important;
    }
  }
}
/deep/ .el-table--border {
  border-bottom: unset;
}

/deep/ .el-table {
  text-align: center;
  .has-gutter {
    text-align: center;
    th {
      text-align: center;
    }
  }
  .el-table__row {
    text-align: center;
  }
}

/deep/ .fkbox.fkboxTable {
  .el-popover.el-popper {
    width: 480px !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%);
  }
}

/deep/ .el-table__header th {
  text-align: center;
}
/deep/ .el-table__body td {
  text-align: center;
}
/deep/.has-gutter th {
  text-align: center !important;
}
/deep/ .el-table__row td {
  text-align: center !important;
}
/deep/.my-popper {
  height: 300px;
  overflow-y: auto;
  background-color: orange;
}
</style>
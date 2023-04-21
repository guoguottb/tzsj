<template>
  <div class="g-box"
       @resize='aa'>

    <!-- <h2>统一查询</h2> -->
    <!-- <el-button type="primary"  @click ="aa()">获取账号</el-button> -->
    <div class="tycx">
      <!-- el-collapse-transition 折叠过渡 -->
      <el-collapse-transition>

        <el-form :inline="true"
                 :model="searchData"
                 class="demo-form-inline tycxForm"
                 label-width="120px"
                 label-position="left">
          <el-form-item label="申请人姓名">
            <el-input v-model="searchData.ab_ex3"
                      placeholder="申请人姓名"></el-input>
          </el-form-item>
          <el-form-item label="申请人身份证">
            <el-input v-model="searchData.ab_ex7"
                      placeholder="申请人身份证"></el-input>
          </el-form-item>
          <el-form-item label="户口性质">
            <el-select v-model="searchData.ab_ex6"
                       placeholder="户口性质">
              <el-option label="农业户口"
                         value="农业户口"></el-option>
              <el-option label="非农业户口"
                         value="非农业户口"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="行政区划">
            <el-cascader v-model="xzqhArray"
                         :props="props"
                         clearable></el-cascader>
          </el-form-item>
          <el-form-item label="建档立卡"
                        v-show='showMore'>
            <el-select v-model="searchData.ab_ex118"
                       placeholder="建档立卡">
              <el-option label="是"
                         value="是"></el-option>
              <el-option label="否"
                         value="否"></el-option>
            </el-select>
          </el-form-item>
          <!-- ????? -->
          <!-- <el-form-item label="残疾人补贴">
                        <el-select v-model="formInline.region" placeholder="残疾人补贴">
                        <el-option label="是" value="是"></el-option>
                        <el-option label="否" value="否"></el-option>
                        </el-select>
                    </el-form-item> -->
          <el-form-item label="救助类型">
            <el-select v-model="searchData.ab_ex13"
                       placeholder="救助类型">
              <el-option label="最低生活保障"
                         value="低保"></el-option>
              <el-option label="特困人员供养"
                         value="特困供养"></el-option>
              <el-option label="低收入家庭"
                         value="低收入家庭"></el-option>
              <el-option label="家庭边缘"
                         value="家庭边缘"></el-option>
              <el-option label="临时救助"
                         value="临时救助"></el-option>
              <el-option label="群众申请"
                         value="群众申请"></el-option>
              <el-option label="支出型困难家庭"
                         value="支出贫困"></el-option>
              <!-- <el-option label="残疾人补贴" value="残疾人补贴"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="查询数据来源"
                        v-show='showMore'>
            <el-select v-model="searchData.ab_ex157"
                       placeholder="数据来源">
              <el-option label="群众申请"
                         value="群众申请"></el-option>
              <el-option label="低保"
                         value="低保"></el-option>
              <el-option label="特困供养"
                         value="特困供养"></el-option>
              <el-option label="家庭边缘"
                         value="家庭边缘"></el-option>
              <el-option label="泰州公众号"
                         value="泰州公众号"></el-option>
              <el-option label="泰州通手机端"
                         value="泰州通手机端"></el-option>
              <el-option label="特困供养"
                         value="特困供养"></el-option>
              <el-option label="医疗推送"
                         value="医疗推送"></el-option>
              <el-option label="预警推送"
                         value="预警推送"></el-option>
              <el-option label="原救助系统城市低保"
                         value="原救助系统城市低保"></el-option>
              <el-option label="原救助系统农村低保"
                         value="原救助系统农村低保"></el-option>
              <el-option label="原救助系统特困"
                         value="原救助系统特困"></el-option>
              <el-option label="主动排查"
                         value="主动排查"></el-option>
              <el-option label="主动救助"
                         value="主动救助"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="保障开始时间"
                        v-show="showMore">
            <el-date-picker v-model="searchData.start_ab_dat19"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="保障结束时间"
                        v-show="showMore">
            <el-date-picker v-model="searchData.end_ab_dat19"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="保障开始年龄"
                        v-show="showMore">
            <el-input v-model="searchData.start_age"
                      placeholder="保障开始年龄"></el-input>
          </el-form-item>
          <el-form-item label="保障结束年龄"
                        v-show="showMore">
            <el-input v-model="searchData.end_age"
                      placeholder="保障结束年龄"></el-input>
          </el-form-item>
          <el-form-item label="特定对象"
                        v-show="showMore">
            <el-select v-model="searchData.abm_ex51"
                       placeholder="特定对象">
              <el-option label="请选择"
                         value=""></el-option>
              <el-option label="老年人"
                         value="老年人"></el-option>
              <el-option label="未成年人"
                         value="未成年人"></el-option>
              <el-option label="独居"
                         value="独居"></el-option>
              <el-option label="散居归侨/侨属"
                         value="散居归侨/侨属"></el-option>
              <el-option label="少数民族"
                         value="少数民族"></el-option>
              <el-option label="重病"
                         value="重病"></el-option>
              <el-option label="重残"
                         value="重残"></el-option>
              <el-option label="退役军人"
                         value="退役军人"></el-option>
              <el-option label="军转干部"
                         value="军转干部"></el-option>
              <el-option label="已故原工商业者无工作的配偶"
                         value="已故原工商业者无工作的配偶"></el-option>
              <el-option label="艾滋病患者"
                         value="艾滋病患者"></el-option>
              <el-option label="易肇事肇祸精神病人"
                         value="易肇事肇祸精神病人"></el-option>
              <el-option label="两牢释放人员"
                         value="两牢释放人员"></el-option>
              <el-option label="社区矫正人员"
                         value="社区矫正人员"></el-option>
              <el-option label="建国前老党员"
                         value="建国前老党员"></el-option>
              <el-option label="高校毕业生"
                         value="高校毕业生"></el-option>
              <el-option label="宗教教职员"
                         value="宗教教职员"></el-option>
              <el-option label="休渔期渔民"
                         value="休渔期渔民"></el-option>
              <el-option label="非农水库移民"
                         value="非农水库移民"></el-option>
              <el-option label="农业户口水库移民"
                         value="农业户口水库移民"></el-option>
              <el-option label="森工企业/含国有林场人员"
                         value="森工企业/含国有林场人员"></el-option>
              <el-option label="农垦企业人员/含农场"
                         value="农垦企业人员/含农场"></el-option>
              <el-option label="原民政救济对象"
                         value="原民政救济对象"></el-option>
              <el-option label="被征地人员"
                         value="被征地人员"></el-option>
              <el-option label="僧尼"
                         value="僧尼"></el-option>
              <el-option label="持独生子女父母光荣证人员"
                         value="持独生子女父母光荣证人员"></el-option>
              <el-option label="奖扶/特扶人员"
                         value="奖扶/特扶人员"></el-option>
              <el-option label="边民"
                         value="边民"></el-option>
              <el-option label="归侨"
                         value="归侨"></el-option>
              <el-option label="劳模先进"
                         value="劳模先进"></el-option>
              <el-option label="原工商业主"
                         value="原工商业主"></el-option>
              <el-option label="优抚对象"
                         value="优抚对象"></el-option>
              <el-option label="其他优抚对象"
                         value="其他优抚对象"></el-option>
              <el-option label="集中孤儿"
                         value="集中孤儿"></el-option>
              <el-option label="分散孤儿"
                         value="分散孤儿"></el-option>
              <el-option label="单亲家庭子女"
                         value="单亲家庭子女"></el-option>
              <el-option label="三类企业人员"
                         value="三类企业人员"></el-option>
              <el-option label="托管人员"
                         value="托管人员"></el-option>
              <el-option label="孤儿"
                         value="孤儿"></el-option>
              <el-option label="计生失独人员"
                         value="计生失独人员"></el-option>
              <el-option label="血友病转艾滋病人员"
                         value="血友病转艾滋病人员"></el-option>
              <el-option label="2008年前鉴定的完全丧失劳动能力残疾人"
                         value="2008年前鉴定的完全丧失劳动能力残疾人"></el-option>
              <el-option label="吸毒史人员"
                         value="吸毒史人员"></el-option>
              <el-option label="服刑人员"
                         value="服刑人员"></el-option>
              <el-option label="信访维稳对象"
                         value="信访维稳对象"></el-option>
              <el-option label="民政部门认定的其它特定救助对象"
                         value="民政部门认定的其它特定救助对象"></el-option>
              <el-option label="非特定救助对象"
                         value="非特定救助对象"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="成员姓名">
            <el-input v-model="searchData.abm_ex3"
                      placeholder="成员姓名"></el-input>
          </el-form-item>
          <el-form-item label="成员身份证号">
            <el-input v-model="searchData.abm_ex2"
                      placeholder="成员姓名"></el-input>
          </el-form-item>
          <!-- <el-form-item label="申请数据源">
                        <el-select v-model="searchData.ab_ex157" placeholder="申请数据源">
                            <el-option label="手机端申请" value="手机端申请"></el-option>
                            <el-option label="微信端申请" value="微信端申请"></el-option>
                            <el-option label="电脑端申请" value="电脑端申请"></el-option>
                            <el-option label="原低保系统导入数据" value="原低保系统导入数据"></el-option>
                        </el-select>
                    </el-form-item> -->
          <el-form-item label="家庭人口"
                        v-show="showMore">
            <el-input v-model="searchData.ab_ex5"
                      placeholder="家庭人口"></el-input>
          </el-form-item>
          <el-form-item label="申请时间"
                        v-show="showMore">
            <el-date-picker v-model="searchData.start_ab_dat14"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="审批时间"
                        v-show="showMore">
            <el-date-picker v-model="searchData.end_ab_dat5"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <!-- ???? -->
          <!--  <el-form-item label="家庭保障开始">
                        <el-select v-model="formInline.region" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="家庭保障结束">
                        <el-select v-model="formInline.region" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item> -->
          <!-- 缺一个字段 -->
          <el-form-item label="业务查询">
            <el-select v-model="searchData.ab_ex15"
                       placeholder="业务查询">
              <el-option label="审批"
                         value="审批"></el-option>
              <el-option label="变更"
                         value="变更"></el-option>
              <el-option label="注销"
                         value="注销"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户银行"
                        v-show="showMore">
            <el-input v-model="searchData.ab_ex42"
                      placeholder="开户银行"></el-input>
          </el-form-item>
          <el-form-item label="自理能力">
            <el-select v-model="searchData.abm_ex30"
                       placeholder="自理能力">
              <el-option label="失能"
                         value="失能"></el-option>
              <el-option label="半失能"
                         value="半失能"></el-option>
              <el-option label="自理"
                         value="自理"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="供养形式">
            <el-select v-model="searchData.ab_ex71"
                       placeholder="供养形式">
              <el-option label="集中供养"
                         value="集中供养"></el-option>
              <el-option label="分散供养"
                         value="分散供养"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="求助原因">
            <el-select v-model="searchData.ab_ex46"
                       placeholder="求助原因">
              <el-option label="缺乏劳动力"
                         value="缺乏劳动力"></el-option>
              <el-option label="无生活来源"
                         value="无生活来源"></el-option>
              <el-option label="疾病"
                         value="疾病"></el-option>
              <el-option label="残疾"
                         value="残疾"></el-option>
              <el-option label="教育"
                         value="教育"></el-option>
              <el-option label="住房"
                         value="住房"></el-option>
              <el-option label="受灾"
                         value="受灾"></el-option>
              <el-option label="其他"
                         value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="核减原因"
                        v-show="showMore">
            <el-select v-model="searchData.abm_ex75"
                       placeholder="核减原因">
              <el-option label="死亡"
                         value="死亡"></el-option>
              <el-option label="宣告死亡"
                         value="宣告死亡"></el-option>
              <el-option label="宣告失踪"
                         value="宣告失踪"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="婚姻状况"
                        v-show="showMore">
            <el-select v-model="searchData.abm_ex28"
                       placeholder="婚姻状况">
              <el-option label="未婚"
                         value="未婚"></el-option>
              <el-option label="已婚"
                         value="已婚"></el-option>
              <el-option label="离异"
                         value="离异"></el-option>
              <el-option label="初婚"
                         value="初婚"></el-option>
              <el-option label="再婚"
                         value="再婚"></el-option>
              <el-option label="复婚"
                         value="复婚"></el-option>
              <el-option label="丧偶"
                         value="丧偶"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否处于劳动年龄段"
                        v-show="showMore">
            <el-select v-model="searchData.abm_ex46"
                       placeholder="是否处于劳动年龄段">
              <el-option label="是"
                         value="是"></el-option>
              <el-option label="否"
                         value="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="健康状况"
                        v-show="showMore">
            <el-select v-model="searchData.abm_ex11"
                       placeholder="健康状况">
              <el-option label="健康"
                         value="健康"></el-option>
              <el-option label="残疾"
                         value="残疾"></el-option>
              <el-option label="重病"
                         value="重病"></el-option>
            </el-select>
          </el-form-item>
          <!-- ???? -->
          <!-- <el-form-item label="重病病种">
                        <el-select v-model="searchData" placeholder="重病病种">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item> -->
          <el-form-item label="残疾种类"
                        v-show="showMore">
            <el-select v-model="searchData.abm_ex39"
                       placeholder="残疾种类">
              <el-option label="肢体残疾"
                         value="肢体残疾"></el-option>
              <el-option label="精神残疾"
                         value="精神残疾"></el-option>
              <el-option label="智力残疾"
                         value="智力残疾"></el-option>
              <el-option label="盲视力残疾"
                         value="盲视力残疾"></el-option>
              <el-option label="言语残疾"
                         value="言语残疾"></el-option>
              <el-option label="听力残疾"
                         value="听力残疾"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="残疾等级"
                        v-show="showMore">
            <el-select v-model="searchData.abm_ex40"
                       placeholder="残疾等级">
              <el-option label="请选择"
                         value=""></el-option>
              <el-option label="一级残疾"
                         value="一级残疾"></el-option>
              <el-option label="二级残疾"
                         value="二级残疾"></el-option>
              <el-option label="三级残疾"
                         value="三级残疾"></el-option>
              <el-option label="四级残疾"
                         value="四级残疾"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="劳动能力"
                        v-show="showMore">
            <el-select v-model="searchData.abm_ex49"
                       placeholder="劳动能力">
              <el-option label="无劳动能力"
                         value="无劳动能力"></el-option>
              <el-option label="部分丧失劳动能力"
                         value="部分丧失劳动能力"></el-option>
              <el-option label="有劳动能力"
                         value="有劳动能力"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职业状况"
                        v-show="showMore">
            <el-select v-model="searchData.abm_ex14"
                       placeholder="职业状况">
              <el-option label="请选择"
                         value=""></el-option>
              <el-option label="在职职工"
                         value="在职职工"></el-option>
              <el-option label="灵活就业人员"
                         value="灵活就业人员"></el-option>
              <el-option label="登记失业人员"
                         value="登记失业人员"></el-option>
              <el-option label="未登记失业人员"
                         value="未登记失业人员"></el-option>
              <el-option label="无就业条件"
                         value="无就业条件"></el-option>
            </el-select>
          </el-form-item>
          <!--   <el-form-item label="房产性质">
                        <el-select v-model="searchData.abe_ex11" placeholder="房产性质">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item> -->
          <el-form-item label="购/建房时间"
                        v-show="showMore">
            <el-date-picker v-model="searchData.start_abe_dat2"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="享受年月">
            <el-date-picker v-model="searchData.end_abp_dat3"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="是否渐退期"
                        v-show="showMore">
            <el-select v-model="searchData.ab_ex207"
                       placeholder="是否渐退期">
              <el-option label="是"
                         value="是"></el-option>
              <el-option label="否"
                         value="否"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="活动区域">
                        <el-select v-model="formInline.region" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item> -->
          <!-- <el-form-item>
                        <el-button type="primary" @click="subSelect">查询</el-button>
                        <el-button type="info" @click="subReset">重置</el-button>
                        <el-button type="primary" @click="onSubmit">结果导出</el-button>
                    </el-form-item> -->
        </el-form>

      </el-collapse-transition>
    </div>
    <div class="btns_box">
      <el-button type="primary"
                 @click="subSelect">查询</el-button>
      <el-button type="info"
                 @click="subReset">重置</el-button>
      <el-button type="primary"
                 @click="onSubmit">结果导出</el-button>
      <el-button v-if="!showMore"
                 type="success"
                 icon="el-icon-arrow-down"
                 @click="showMoreOption('more')">更多查询</el-button>
      <el-button v-if="showMore"
                 type="success"
                 icon="el-icon-arrow-up"
                 @click="showMoreOption('less')">折叠查询</el-button>
    </div>
    <!-- <div class="content"> -->

    <el-table :data="tableData"
              height="50%"
              border
              style="width: 100%">
      <!-- <el-table-column  prop="ab_ex161" label="NO" width="100">
                </el-table-column> -->
      <el-table-column label="所在市">
        <template slot-scope="{row}">
          <p :title="row.ab_ex161"
             class="ellipsis">{{row.ab_ex161}}</p>
        </template>
      </el-table-column>
      <el-table-column label="街道">
        <template slot-scope="{row}">
          <p :title="row.ab_ex2"
             class="ellipsis">{{row.ab_ex2}}</p>
        </template>
      </el-table-column>
      <el-table-column label="村居">
        <template slot-scope="{row}">
          <p :title="row.ab_ex1"
             class="ellipsis">{{row.ab_ex1}}</p>
        </template>
      </el-table-column>
      <el-table-column label="申请人姓名">
        <template slot-scope="{row}">
          <p :title="row.ab_ex3"
             class="ellipsis">{{row.ab_ex3}}</p>
        </template>
      </el-table-column>
      <el-table-column label="户口性质">
        <template slot-scope="{row}">
          <p :title="row.ab_ex6"
             class="ellipsis">{{row.ab_ex6}}</p>
        </template>
      </el-table-column>
      <el-table-column width="180"
                       label="申请人身份证">
        <template slot-scope="{row}">
          <p :title="row.ab_ex7"
             class="ellipsis">{{row.ab_ex7}}</p>
        </template>
      </el-table-column>
      <el-table-column width="180"
                       label="成员身份证">
        <template slot-scope="{row}">
          <p :title="row.abm_ex2"
             class="ellipsis">{{row.abm_ex2}}</p>
        </template>
      </el-table-column>
      <el-table-column label="成员姓名">
        <template slot-scope="{row}">
          <p :title="row.abm_ex3"
             class="ellipsis">{{row.abm_ex3}}</p>
        </template>
      </el-table-column>
      <el-table-column width="100"
                       label="救助类别">
        <template slot-scope="{row}">
          <p :title="row.ab_ex13"
             class="ellipsis">{{row.ab_ex13}}</p>
        </template>
      </el-table-column>
      <el-table-column width="100"
                       label="业务节点">
        <template slot-scope="{row}">
          <p :title="row.ab_ex15"
             class="ellipsis">{{row.ab_ex15}}</p>
        </template>
      </el-table-column>
      <el-table-column label="成员姓名">
        <template slot-scope="{row}">
          <p :title="row.abm_ex3"
             class="ellipsis">{{row.abm_ex3}}</p>
        </template>
      </el-table-column>
      <el-table-column label="家庭人口">
        <template slot-scope="{row}">
          <p :title="row.ab_ex5"
             class="ellipsis">{{row.ab_ex5}}</p>
        </template>
      </el-table-column>
      <el-table-column width="160"
                       label="申请时间">
        <template slot-scope="{row}">
          <p :title="row.ab_dat14"
             class="ellipsis">{{row.ab_dat14}}</p>
        </template>
      </el-table-column>
    </el-table>
    <!-- </div> -->

    <div style="position: relative;">
      <div class="page_size">
        <el-pagination background
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="page"
                       :page-sizes="[10, 30, 50, 100]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="totalElements">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { cityOption } from '@/utils/city'
import request from "@/utils/request";
export default {
  name: "tycx",
  data () {
    return {
      height: 450,

      tableData: [],
      formInline: {
        user: '',
        region: ''
      },
      // options: [{
      // value: 'zhinan',
      // label: '指南',
      // }],
      showMore: false,
      value1: '',//开始时间
      value2: '',//结束时间
      value3: '',//申请时间
      value4: '',//审批时间
      value4: '',//
      searchData: {
        ab_ex118: '',  	//是否建档立卡(是,否)
        ab_ex13: '',		//救助类型
        ab_ex15: '',		//业务状态
        ab_ex157: '',	//数据来源
        ab_ex207: '',	//是否渐退期
        ab_ex3: '',		//申请人姓名
        ab_ex42: '',		//开户银行
        ab_ex46: '',		//救助原因
        ab_ex5: '',		//家庭人口
        ab_ex6: '',		//户口性质
        ab_ex7: '',		//申请人身份证
        ab_ex71: '',		//供养方式(集中,分散)
        abe_ex11: '',	//房屋性质(商品房----)
        abm_ex11: '',	//健康状况()
        abm_ex14: '',	//职业状况()
        abm_ex2: '',		//成员身份证
        abm_ex28: '',	//婚姻状况
        abm_ex3: '',		//成员姓名
        abm_ex30: '',	//自理能力()
        abm_ex39: '',	//残疾类型()
        abm_ex40: '',	//残疾等级()
        abm_ex46: '',	//是否属于劳动年龄
        abm_ex49: '',	//劳动能力()
        abm_ex51: '',	//特定对象
        abm_ex52: '',	//重病病种
        abm_ex75: '',	//核减原因
        administrativeDivision: '',	//行政区划
        disabilityAllowance: '',		//残疾人补贴
        end_ab_dat14: '',	//申请结束时间
        end_ab_dat19: '',	//待遇结束时间
        end_ab_dat5: '',		//审批结束时间
        end_abe_ex2: '',		//房屋购买结束时间
        end_abp_dat3: '',	//享受年月结束时间
        end_age: '',			//结束年龄
        sortField: '',		//排序字段
        start_ab_dat14: '',	//申请开始时间段
        start_ab_dat19: '',	//待遇开始时间段			
        start_ab_dat5: '',	//审批开始时间段
        start_abe_dat2: '',	//房屋购买开始时间
        start_abp_dat3: '',	//享受年月开始时间
        start_age: '',		//开始年龄
      },
      page: 1, //当前页
      pageNum: "1",  //页数
      pageSize: 10,	//每页几条
      totalElements: 0, //总条数
      totalPages: 0,		//共有多少页
      xzqhArray: [],      //行政区划搜索
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

    }
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
      } else {
        i = null;
      }
      this.searchData.administrativeDivision = i;
      // console.log(i);
    },
    $route: "fetchData",

    // activeName(newA1, oldA1) {
    //     console.log(newA1, oldA1,'业务节点监听');
    // },

  },
  created () {
    // this.options = cityOption();
    // console.log(city);


  },
  mounted () {
    window.onresize = () => {
      window.screenWidths = document.body.clientWidth//获取页面装口宽度 
      this.screenWidths = window.screenWidths//赋值screenWidths
      console.log('视口大小发生变化');

    }
  },

  methods: {
    // 展示/折叠 更多查询项
    showMoreOption (key) {
      console.log(key);

      if (key == 'more') {

        this.showMore = true;
        this.height = 250;

      } else if (key == 'less') {

        this.showMore = false;
        this.height = 450;

      } else {

        this.showMore = false;
        this.height = 450;
      }
    },

    handleSizeChange (val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
      this.subSelect();
    },
    handleCurrentChange (val) {
      this.page = val
      console.log(`当前页: ${val}`);
      this.subSelect();
    },

    aa () {
      // var account = isSpecialAccount();
      // this.$alert(account,'账号');
      console.log('视口大小发生变化');
    },

    onSubmit () {
      console.log('submit!');
    },
    //统一查询筛选调用的接口
    tycxList (data) {
      return request({
        headers: {
          Accept: "application/json",
        },
        url: "/social/assistance/getAllAssistance",
        method: "post",
        data: data,
      });
    },
    //点击查询调用的方法
    subSelect () {
      this.tycxList({
        ab_ex118: this.searchData.ab_ex118,	//是否建档立卡(是,否)
        ab_ex13: this.searchData.ab_ex13,		//救助类型
        ab_ex157: this.searchData.ab_ex157,	//数据来源
        ab_ex207: this.searchData.ab_ex207,	//是否渐退期
        ab_ex3: this.searchData.ab_ex3,		//申请人姓名
        ab_ex42: this.searchData.ab_ex42,		//开户银行
        ab_ex46: this.searchData.ab_ex46,		//救助原因
        ab_ex5: this.searchData.ab_ex5,		//家庭人口
        ab_ex6: this.searchData.ab_ex6,		//户口性质
        ab_ex7: this.searchData.ab_ex7,		//申请人身份证
        ab_ex71: this.searchData.ab_ex71,		//供养方式(集中,分散)
        ab_ex15: this.searchData.ab_ex15,    //业务节点
        abe_ex11: this.searchData.abe_ex11,	//房屋性质(商品房----)
        abm_ex11: this.searchData.abm_ex11,	//健康状况()
        abm_ex14: this.searchData.abm_ex14,	//职业状况()
        abm_ex2: this.searchData.abm_ex2,		//成员身份证
        abm_ex28: this.searchData.abm_ex28,	//婚姻状况
        abm_ex3: this.searchData.abm_ex3,		//成员姓名
        abm_ex30: this.searchData.abm_ex30,	//自理能力()
        abm_ex39: this.searchData.abm_ex39,	//残疾类型()
        abm_ex40: this.searchData.abm_ex40,	//残疾等级()
        abm_ex46: this.searchData.abm_ex46,	//是否属于劳动年龄
        abm_ex49: this.searchData.abm_ex49,	//劳动能力()
        abm_ex51: this.searchData.abm_ex51,	//特定对象
        abm_ex52: this.searchData.abm_ex52,	//重病病种
        abm_ex75: this.searchData.abm_ex75,	//核减原因
        administrativeDivision: this.searchData.administrativeDivision,	//行政区划
        disabilityAllowance: this.searchData.disabilityAllowance,		//残疾人补贴
        end_ab_dat14: this.searchData.end_ab_dat14,	//申请结束时间
        end_ab_dat19: this.searchData.end_ab_dat19,	//待遇结束时间
        end_ab_dat5: this.searchData.end_ab_dat5,		//审批结束时间
        end_abe_ex2: this.searchData.end_abe_ex2,		//房屋购买结束时间
        end_abp_dat3: this.searchData.end_abp_dat3,	//享受年月结束时间
        end_age: this.searchData.end_age,			//结束年龄
        pageNo: this.page,			//第几页,默认为零
        pageSize: this.pageSize,		//每页几条
        sortField: this.searchData.sortField,		//排序字段
        start_ab_dat14: this.searchData.start_ab_dat14,	//申请开始时间段
        start_ab_dat19: this.searchData.start_ab_dat19,	//待遇开始时间段			
        start_ab_dat5: this.searchData.start_ab_dat5,	//审批开始时间段
        start_abe_dat2: this.searchData.start_abe_dat2,	//房屋购买开始时间
        start_abp_dat3: this.searchData.start_abp_dat3,	//享受年月开始时间
        start_age: this.searchData.start_age,		//开始年龄
      }).then((res) => {
        console.log(res, 'then');
      }).catch((res) => {

        console.log("查询结果" + JSON.stringify(res.response.data.data.content))
        this.tableData = res.response.data.data.content
        this.totalElements = res.response.data.data.totalElements
        this.totalPages = res.response.data.data.totalPages
      })
    },
    //
    //点击重置按钮调用的方法
    subReset () {
      this.searchData = {};
      this.tableData = undefined;
      this.totalElements = 0;
      this.totalPages = 0;
      this.xzqhArray = [];//区划
      console.log(this.searchData.administrativeDivision);
      console.log(this.searchData, '查询条件');
      // this.searchData.administrativeDivision = '';
      // this.subSelect();
    }


  }

}
</script>

<style scoped lang="less">
.g-box {
  display: flex;
  /* width: 100%; */
  height: 80vh;
  flex-direction: column;
}
.tycxForm {
  max-height: 310px;
  overflow: auto;
}
.num {
  display: inline-block;
  color: #999;
}
.page_size {
  margin-top: 10px;
  display: inline-block;
  /* float: right; */
  position: absolute;
  top: 0px;
  right: 0;
}
/* 统一查询列表页输入框、选择框宽度 */
.tycx /deep/.el-input--small .el-input__inner {
  width: 199px !important;
}
.tycx /deep/.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.btns_box {
  padding: 10px 0;
  float: right;
}

/* .content {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .e-table {
        flex: 1;
        overflow: auto;
    } */

/deep/.has-gutter th {
  text-align: center !important;
}
/deep/ .el-table__row td {
  text-align: center !important;
}
</style>
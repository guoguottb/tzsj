<template>
  <div class="g-box">
    <div class="info">
      <el-form :inline="true"
               class="demo-form-inline">
        <h3 class="line_blue"
            id="page1">&emsp;档案信息</h3>
        <div class="lineSt"></div>
        <div class="top_1">
          <table class="top_2">
            <tr style="height:40px;">
              <td style="width:10%;">申请人:</td>
              <td style="width:10%;">王小辉</td>
              <td style="width:10%;">身份证号码:</td>
              <td style="width:20%;">362362196405042242</td>
              <!-- <td style="width:10%;">申请类别:</td> -->
              <td style="width:10%;">低保</td>
              <td rowspan="2"></td>
            </tr>
            <tr>
              <td>申请时间</td>
              <td>2021-01-05</td>
              <!-- <td>发放金额</td>
                            <td>1000</td> -->
              <td></td>
              <td colspan='2'></td>
              <td><img src='http://221.130.79.150:10088/image/aud/%E5%AE%A1%E6%A0%B8%E4%B8%AD.png'
                     class='imgSt'></td>
            </tr>
          </table>
        </div>

        <h3 class="line_blue"
            id="page2">&emsp;基础信息</h3>
        <div class="lineSt"></div>
        <div class="top_1">
          <table class="top_2">
            <tr style="height:40px;">
              <td style="width:10%;">行政区划:</td>
              <td style="width:40%;">海陵区</td>
              <td style="width:10%;">联系电话:</td>
              <td style="width:40%;">1518001422</td>
            </tr>
            <tr style="height:40px;">
              <td style="width:10%;">户口性质:</td>
              <td style="width:40%;">农业户口</td>
              <td style="width:10%;">家庭人口:</td>
              <td style="width:40%;">6</td>
            </tr>

            <tr style="height:40px;">
              <td>户籍地址:</td>
              <td>江苏省海陵区海陵镇125号</td>
              <td>家庭地址:</td>
              <td>江苏省海陵区海陵镇125号</td>
            </tr>
            <tr style="height:40px;">
              <td>求助原因:</td>
              <td>身患癌症，丧失工作能力。</td>
              <td>低保类型:</td>
              <td>低收入型低保</td>
            </tr>
            <tr style="height:40px;">
              <td>调查人:</td>
              <td>王海华</td>
              <td>调查结果:</td>
              <td>属实</td>
            </tr>
            <tr style="height:40px;">
              <td>诉求描述:</td>
              <td colspan="3">家中四口人，是失独家庭，家庭成员包括爷爷、奶奶和两个孙女，二老均缺乏劳动力，大孙女在苏州读职高，小孙女在蔡官学校读初中</td>
            </tr>
            <tr style="height:40px;">
              <td>变更理由:</td>
              <td colspan="3">家庭人口减少，身体患病需要医治。</td>
            </tr>
          </table>
        </div>

        <h3 class="line_blue"
            id="page3">&emsp;银行信息</h3>
        <div class="lineSt"></div>
        <div class="top_1">
          <table class="top_2">
            <tr style="height:40px;">
              <td style="width:10%;">开户银行:</td>
              <td style="width:20%;">中国工商银行</td>
              <td style="width:10%;">开户人:</td>
              <td style="width:20%;">王晓辉</td>
              <td style="width:10%;">银行账号:</td>
              <td style="width:20%;">623233010212045524</td>
            </tr>
          </table>
        </div>

        <h3 class="line_blue"
            id="page4">&emsp;共同生活家庭成员情况</h3>
        <div class="lineSt"></div>
        <div class="family">
          <el-table :data="tableData"
                    border
                    style="width: 100%">
            <el-table-column prop="ex1"
                             label="与户主关系"
                             width="100">
            </el-table-column>
            <el-table-column prop="ex2"
                             label="姓名"
                             width="80">
            </el-table-column>
            <el-table-column prop="ex3"
                             label="身份证号码"
                             width="180">
            </el-table-column>
            <el-table-column prop="ex4"
                             label="性别"
                             width="80">
            </el-table-column>
            <el-table-column prop="ex5"
                             label="民族"
                             width="80">
            </el-table-column>
            <el-table-column prop="ex6"
                             label="户口性质"
                             width="100">
            </el-table-column>
            <el-table-column prop="ex7"
                             label="健康状况"
                             width="100">
            </el-table-column>
            <el-table-column prop="ex8"
                             label="职业状况"
                             width="100">
            </el-table-column>
            <el-table-column prop="ex9"
                             label="婚姻状况"
                             width="100">
            </el-table-column>
            <el-table-column prop="ex10"
                             label="工作单位"
                             width="120">
            </el-table-column>
            <el-table-column prop="ex11"
                             label="月收入"
                             width="100">
            </el-table-column>
            <el-table-column prop="ex12"
                             label="增发类型"
                             width="80">
            </el-table-column>
            <el-table-column prop="ex13"
                             label="是否保障对象"
                             width="120">
            </el-table-column>

          </el-table>
        </div>

        <h3 class="line_blue"
            id="page5">&emsp;非共同生活赡抚扶养人信息</h3>
        <div class="lineSt"></div>
        <div class="family">
          <el-table :data="tableData2"
                    border
                    style="width: 100%">
            <el-table-column prop="ex1"
                             label="赡（扶，抚）养关系"
                             width="180">
            </el-table-column>
            <el-table-column prop="ex2"
                             label="姓名"
                             width="100">
            </el-table-column>
            <el-table-column prop="ex3"
                             label="身份证号码"
                             width="180">
            </el-table-column>
            <el-table-column prop="ex4"
                             label="健康状况"
                             width="100">
            </el-table-column>

            <el-table-column prop="ex5"
                             label="工作单位"
                             width="120">
            </el-table-column>
            <el-table-column prop="ex6"
                             label="月收入"
                             width="100">
            </el-table-column>
            <el-table-column prop="ex7"
                             label="月赡（扶，抚）养费"
                             width="150">
            </el-table-column>
            <el-table-column prop="ex8"
                             label="婚姻状况"
                             width="120">
            </el-table-column>

          </el-table>
        </div>

        <h3 class="line_blue"
            id="page6">&emsp;家庭收入情况(12个月)</h3>
        <div class="lineSt"></div>
        <div class="top_1">
          <table class="top_2">
            <tr style="height:40px;">
              <td style="width:10%;">工资性收入(元):</td>
              <td style="width:40%;">100.00</td>
              <td style="width:10%;">经营性收入(元):</td>
              <td style="width:40%;">0.00</td>
            </tr>
            <tr style="height:40px;">
              <td style="width:10%;">财产性收入(元):</td>
              <td style="width:40%;">0.00</td>
              <td style="width:10%;">转移性收入(元):</td>
              <td style="width:40%;">0.00</td>
            </tr>

            <tr style="height:40px;">
              <td>其他收入(元):</td>
              <td>100.00</td>
              <td>家庭总收入(元):</td>
              <td>100.00</td>
            </tr>
            <tr style="height:40px;">
              <td>家庭月平均收入(元):</td>
              <td>30.00</td>
              <td>低保标准(元):</td>
              <td>810.00</td>
            </tr>
            <tr style="height:40px;">
              <td>月保障金额(元):</td>
              <td>810.00</td>
            </tr>

          </table>
        </div>

        <h3 class="line_blue"
            id="page8">&emsp;家庭财产情况</h3>
        <div class="lineSt"></div>
        <div class="top_1">
          <div class="top_3">
            <el-table style="width: 100%">
              <el-table-column label="拥有车(船)情况"
                               style="text-align:center">
                <el-table-column prop="ex1"
                                 label="车(船)主"
                                 width="120">
                </el-table-column>

                <el-table-column prop="ex2"
                                 label="购买时间"
                                 width="120">
                </el-table-column>
                <el-table-column prop="city"
                                 label="用途"
                                 width="120">
                </el-table-column>
                <el-table-column prop="车辆价值"
                                 label="车辆价值"
                                 width="150">
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>

          <div class="top_3">
            <el-table style="width: 100%">
              <el-table-column label="拥有房产情况"
                               style="text-align:center">
                <el-table-column prop="ex1"
                                 label="产权人/共有人"
                                 width="120">
                </el-table-column>

                <el-table-column prop="ex2"
                                 label="建房(购房)时间"
                                 width="120">
                </el-table-column>
                <el-table-column prop="city"
                                 label="房屋地址"
                                 width="120">
                </el-table-column>
                <el-table-column prop="车辆价值"
                                 label="面积"
                                 width="150">
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
          <div style="margin-top:10px;">
            <table class="top_2">
              <tr style="height:40px;">
                <td style="width:10%;">银行总存款:</td>
                <td style="width:40%;">0.00</td>
                <td style="width:10%;">有价证券:</td>
                <td style="width:40%;">0.00</td>
              </tr>
              <tr style="height:40px;">
                <td style="width:10%;">债权:</td>
                <td style="width:40%;">0.00</td>
                <td style="width:10%;">其他金融产品:</td>
                <td style="width:40%;">0.00</td>
              </tr>
            </table>
          </div>
        </div>

        <h3 class="line_blue"
            id="page8">&emsp;已享受救助情况</h3>
        <div class="lineSt"></div>
        <div class="top_1">
          <div class="top_1">
            <el-table :data="assistance"
                      style="width: 100%">
              <el-table-column label="救助信息"
                               style="text-align:center">
                <el-table-column prop="ex1"
                                 label="姓名"
                                 width="120">
                </el-table-column>
                <el-table-column prop="ex2"
                                 label="救助类型"
                                 width="120">
                </el-table-column>
                <el-table-column prop="ex3"
                                 label="发放时间"
                                 width="120">
                </el-table-column>
                <el-table-column prop="ex4"
                                 label="发放金额"
                                 width="120">
                </el-table-column>
                <el-table-column prop="ex5"
                                 label="申请日期"
                                 width="150">
                </el-table-column>
                <el-table-column prop="ex6"
                                 label="审批日期"
                                 width="150">
                </el-table-column>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <h3 class="line_blue"
            id="page9">&emsp;变更报告</h3>
        <div class="lineSt"></div>
        <div class="top_1">
          <div class='top_6'>
            <p class="xiugai">基础信息修改</p>
            <div class="top_6">
              <span class="p1">家庭人口</span><span class="p2">从</span>
              <span class="p3">6</span> <span class="p2">变成</span>
              <span class="p3">5</span>
              <p>
                <span class="p1">家庭月保障金额</span><span class="p2">从</span>
                <span class="p3">2826.00</span><span class="p2">变成</span>
                <span class="p3">1974</span>
              </p>
            </div>
            <div top="top_7">
              <p class="xiugai">共同生活家庭成员</p>
              <p class="top_8">姓名：孟尔喜得数据变更情况:<span class="p1">与户主关系</span><span class="p2">从</span><span class="p3">户主本人</span><span class="p2">变成:配偶;</span>
                <span class="p1">健康状况</span><span class="p2">从</span><span class="p3">健康</span>
                <span class="p2">变成</span><span class="p1">疾病</span>
              </p>
            </div>
          </div>
        </div>

        <h3 class="line_blue"
            id="page10">&emsp;电子附件</h3>
        <div class="lineSt"></div>
        <div class="top_1">

          <div class="top_4">

            <div class="demo-image__preview">
              <el-image style="width: 100px; height: 100px"
                        :src="url"
                        :preview-src-list="srcList">
              </el-image>
              <span>身份证(<span style='color:red'>2</span>)</span>
            </div>

            <div class="demo-image__preview">
              <el-image style="width: 100px; height: 100px"
                        :src="url2"
                        :preview-src-list="srcList2">
              </el-image>
              <span>核对授权书(<span style='color:red'>1</span>)</span>
            </div>

            <div class="demo-image__preview">
              <el-image style="width: 100px; height: 100px"
                        :src="url3"
                        :preview-src-list="srcList3">
              </el-image>
              <span>民主评议(<span style='color:red'>1</span>)</span>
            </div>
            <div class="demo-image__preview">
              <el-image style="width: 100px; height: 100px"
                        :src="url3"
                        :preview-src-list="srcList3">
              </el-image>
              <span>其他材料(<span style='color:red'>1</span>)</span>
            </div>
            <div class="demo-image__preview">
              <el-image style="width: 100px; height: 100px"
                        :src="url3"
                        :preview-src-list="srcList3">
              </el-image>
              <span>审核审批表(<span style='color:red'>1</span>)</span>
            </div>
            <div class="demo-image__preview">
              <el-image style="width: 100px; height: 100px"
                        :src="url3"
                        :preview-src-list="srcList3">
              </el-image>
              <span>公示图片(<span style='color:red'>1</span>)</span>
            </div>
          </div>

        </div>

        <h3 class="line_blue"
            id="page11">&emsp;审批记录</h3>
        <div class="lineSt"></div>
        <div class="top_1">
          <div class="top_1">
            <table style="width:100%;table-layout:fixed"
                   id="recordt">
              <colgroup>
                <col style="width:15%">
                <col style="width:20%">
                <col style="width:15%">
                <col style="width:15%">
                <col style="width:15%">
                <col style="width:20%">
              </colgroup>
              <tbody>
                <tr>
                  <td style="color:#899197;height:30px">处理步骤：</td>
                  <td>申请</td>
                  <td style="color:#899197">处理时间：</td>
                  <td>2021-02-08 13:56</td>
                  <td style="color:#899197">处理结果：</td>
                  <td rowspan="2"
                      style="text-align:left"><img src="http://221.130.79.150:10088/image/aud/%E5%90%8C%E6%84%8F.png"
                         style="width:100px"></td>
                </tr>
                <tr>
                  <td style="color:#899197;height:30px">处理人：</td>
                  <td>丁晶</td>
                  <td style="color:#899197">处理用时：</td>
                  <td>0天</td>
                </tr>
                <tr style="border-bottom:1px solid #ddd">
                  <td style="color:#899197;height:30px">处理意见：</td>
                  <td colspan="4">在册低保</td>
                </tr>
                <tr>
                  <td colspan="5"
                      style="height:20px">&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </el-form>
    </div>
    <div class="ainfo">
      <div style="margin-left:25%;margin-top:20px;">
        <ul>
          <li :class="{listStyle:isShow1}"
              @click="isShow(1)">
            <a class="ainfoFont"
               :class="{listStyleA:!isShow1}"
               @click="counter('#page1')">档案信息</a><br>
          </li>
          <li :class="{listStyle:isShow2}"
              @click="isShow(2)">
            <a class="ainfoFont"
               :class="{listStyleA:!isShow2}"
               @click="counter('#page2')">基础信息</a><br>
          </li>
          <li :class="{listStyle:isShow3}"
              @click="isShow(3)">
            <a class="ainfoFont"
               :class="{listStyleA:!isShow3}"
               @click="counter('#page3')">银行信息</a><br>
          </li>
          <li :class="{listStyle:isShow4}"
              @click="isShow(4)">
            <a class="ainfoFont"
               :class="{listStyleA:!isShow4}"
               @click="counter('#page4')">共同生活家庭成员情况</a><br>
          </li>
          <li :class="{listStyle:isShow5}"
              @click="isShow(5)">
            <a class="ainfoFont"
               :class="{listStyleA:!isShow5}"
               @click="counter('#page5')">非共同生活赡抚扶养人信息</a><br>
          </li>
          <li :class="{listStyle:isShow6}"
              @click="isShow(6)">
            <a class="ainfoFont"
               :class="{listStyleA:!isShow6}"
               @click="counter('#page6')">家庭收入情况(12个月)</a><br>
          </li>
          <li :class="{listStyle:isSho76}"
              @click="isShow(7)">
            <a class="ainfoFont"
               :class="{listStyleA:!isShow7}"
               @click="counter('#page7')">家庭财产情况</a><br>
          </li>
          <li :class="{listStyle:isShow8}"
              @click="isShow(8)">
            <a class="ainfoFont"
               :class="{listStyleA:!isShow8}"
               @click="counter('#page8')">已享受救助情况</a><br>
          </li>
          <li :class="{listStyle:isShow9}"
              @click="isShow(9)">
            <a class="ainfoFont"
               :class="{listStyleA:!isShow9}"
               @click="counter('#page9')">变更报告</a><br>
          </li>
          <li :class="{listStyle:isShow10}"
              @click="isShow(10)">
            <a class="ainfoFont"
               :class="{listStyleA:!isShow10}"
               @click="counter('#page10')">电子附件</a><br>
          </li>
          <li :class="{listStyle:isShow11}"
              @click="isShow(11)">
            <a class="ainfoFont"
               :class="{listStyleA:!isShow11}"
               @click="counter('#page11')">审批记录</a>
          </li>
        </ul>
      </div>

    </div>

  </div>
</template>
<script>
export default {
  name: "dbListChangeView",
  data () {
    return {
      tableData: [{
        ex1: '户主本人',
        ex2: '王小辉',
        ex3: '362362196405042242',
        ex4: '男',
        ex5: '汉族',
        ex6: '农业户口',
        ex7: '健康',
        ex8: '失业',
        ex9: '已婚',
        ex10: '无',
        ex11: '100',
        ex12: '重病',
        ex13: '是',
      }, {
        ex1: '配偶',
        ex2: '黄春花',
        ex3: '362362197005042233',
        ex4: '女',
        ex5: '汉族',
        ex6: '农业户口',
        ex7: '健康',
        ex8: '失业',
        ex9: '已婚',
        ex10: '无',
        ex11: '100',
        ex12: '重病',
        ex13: '是',
      }, {
        ex1: '子女',
        ex2: '王海红',
        ex3: '362362199005042233',
        ex4: '女',
        ex5: '汉族',
        ex6: '农业户口',
        ex7: '健康',
        ex8: '在业',
        ex9: '已婚',
        ex10: '无',
        ex11: '1000',
        ex12: '健康',
        ex13: '否',
      }],
      tableData2: [{
        ex1: '侄子',
        ex2: '王关伟',
        ex3: '362362198405042784',
        ex4: '健康',
        ex5: '海鲜市场',
        ex6: '1200',
        ex7: '健康',
        ex8: '500',
        ex9: '已婚',

      }, {
        ex1: '伯父',
        ex2: '王金全',
        ex3: '362362195405048854',
        ex4: '健康',
        ex5: '海鲜市场',
        ex6: '2300',
        ex7: '健康',
        ex8: '500',
        ex9: '已婚',
      }],
      assistance: [{
        ex1: '王小辉',
        ex2: '慈善救助',
        ex3: '2020-12-01',
        ex4: '500',
        ex5: '2020-11-01',
        ex6: '2020-11-15',


      }], url: 'http://221.130.79.150:9000/jdlsg/2021/2/20/202102201059253401000001912',
      srcList: [
        'http://221.130.79.150:9000/jdlsg/2021/2/20/202102201059253401000001912',
        'http://221.130.79.150:9000/jdlsg/2021/2/20/202102201059334601000004624'
      ],
      url2: 'http://221.130.79.150:9000/jdlsg/2021/2/20/202102201505421681000008054',
      srcList2: [
        'http://221.130.79.150:9000/jdlsg/2021/2/20/202102201505421681000008054'

      ], url3: 'http://221.130.79.150:9000/jdlsg/2021/2/20/202102201103247341000008429',
      srcList3: [
        'http://221.130.79.150:9000/jdlsg/2021/2/20/202102201103247341000008429'

      ],
      isShow1: true,
      isShow2: true,
      isShow3: true,
      isShow4: true,
      isShow5: true,
      isShow6: true,
      isShow7: true,
      isShow8: true,
      isShow9: true,
      isShow10: true,
      isShow11: true,

    }
  }, methods: {
    counter (id) { //counter1是绑定的点击事件名称
      document.querySelector(id).scrollIntoView(true);
      // const returnEle = document.querySelector("#page8"); //productId是将要跳转区域的id
      // if (!!returnEle) {
      // 	returnEle.scrollIntoView(true); // true 是默认的
      // }
      // document.querySelector("counter1").scrollIntoView(true); //这里的counter1是将要返回地方的id
    },
    isShow (n) {
      this.isShow1 = true
      this.isShow2 = true
      this.isShow3 = true
      this.isShow4 = true
      this.isShow5 = true
      this.isShow6 = true
      this.isShow7 = true
      this.isShow8 = true
      this.isShow9 = true
      this.isShow10 = true
      this.isShow11 = true
      if (n == 1) {
        this.isShow1 = false
      } else if (n == 2) {
        this.isShow2 = false
      } else if (n == 3) {
        this.isShow3 = false
      } else if (n == 4) {
        this.isShow4 = false
      } else if (n == 5) {
        this.isShow5 = false
      } else if (n == 6) {
        this.isShow6 = false
      } else if (n == 7) {
        this.isShow7 = false
      } else if (n == 8) {
        this.isShow8 = false
      } else if (n == 9) {
        this.isShow9 = false
      } else if (n == 10) {
        this.isShow10 = false
      } else if (n == 11) {
        this.isShow11 = false
      }
    }
  }
}
</script>
<style scoped>
.lineSt {
  background-color: #dcdfe6;
  height: 1px;
  width: 100%;
  margin-bottom: 10px;
}
.top_2 {
  width: 100%;
}
.top_1 {
  margin-bottom: 50px;
}
.imgSt {
  width: 140px;
  margin-top: -4%;
  z-index: 10000;
  transform: rotate(30deg);
  -ms-transform: rotate(30deg); /* IE 9 */
}
.line_blue {
  border-left: 2px solid #3385ff;
}
.family {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 50px;
}
.top_3 {
  width: 50%;
  float: left;
}
.top_4 {
  height: 200px;
  margin-top: 40px;
  margin-bottom: -30px;
}

.xiugai {
  margin: 0.625rem;

  font-weight: bold;
}

.p1 {
  margin: 0.625rem;
  color: #7373ff;
}
.p3 {
  color: red;
}
.top_8 {
  margin-bottom: 1.25rem;
  text-indent: 0.5em;
}

.demo-image__preview {
  height: 120px;
  width: 100px;
  float: left;
  margin-left: 5%;
}
.info {
  width: 85%;
  float: left;
  border-right: 2px solid #b6bec0;
  overflow: hidden;
}
.ainfo {
  width: 15%;
  float: left;
  margin-left: 80%;
  font-size: 14px;
  line-height: 20px;
  position: absolute;
  text-align: left;
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
.g-box {
  height: 800px;
  overflow: auto;
  /*overflow:hidden*/
}
</style>
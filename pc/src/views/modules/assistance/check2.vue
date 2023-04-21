<template>
    <div class='g-box'>
         <div class="layui-tab-item" id="sjPdf" style="background-color:#FFF;">
            <div style="width:100%;padding:0px;" class="layui-container">
                <div style="text-align: center;"><h2>泰州市社会救助家庭经济状况核对报告</h2></div>
                <div style="margin-left: 3%">
                    <table style="margin-left: 5%;">
                        <tr>
                            <td style="width: 15%;border:none;" ></td>
                            <td style="width: 25%;border:none;"></td>
                            <td style="width: 15%;border:none;"></td>
                            <td style="width: 45%;border:none;"></td>
                        </tr>
                        <tr>
                            <td class="noneBody black">核对编号：</td>
                            <td class="noneBody" colspan="3" id="ab_ex85">{{info.ab_ex85}}</td>
                        </tr>
                        <tr>
                            <td class="noneBody black">核对时间：</td>
                            <td class="noneBody" id="ab_dat3">{{info.ab_dat3}}</td>
                            <td class="noneBody black">申请救助类型：</td>
                            <td class="noneBody" id="ab_ex13">{{info.ab_ex13}}</td>
                        </tr>
                        <tr>
                            <td class="noneBody black">申请人：</td>
                            <td class="noneBody" id="ab_ex3">{{info.ab_ex3}}</td>
                            <td class="noneBody black">身份证号码：</td>
                            <td class="noneBody" id="ab_ex7">{{info.ab_ex7}}</td>
                        </tr>
                    </table>

                </div>
                <div>
                    <h4 class="black">一、家庭基本情况</h4>
                </div>
                <div class="family" style="margin-left:8%;">
                     <div style="margin-left:15%;margin-top:10px;"><h3>家庭成员基本情况</h3></div>
                    <div >
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column prop="abm_ex3" label="姓名" width="100"></el-table-column>
                            <el-table-column prop="abm_ex2" label="身份证号" width="200"></el-table-column>
                            <el-table-column prop="abm_ex1" label="与主申请人关系" width="180"></el-table-column>
                            <el-table-column prop="ab_ex11" label="户籍所在地" width="380"></el-table-column>
                        </el-table>
                    </div>
                    <div style="margin-left:15%;margin-top:10px;"><h3>赡抚养人基本情况</h3></div>
                    <div >
                        <el-table :data="tableData2" border style="width: 100%">
                            <el-table-column prop="abm_ex3" label="姓名" width="100"></el-table-column>
                            <el-table-column prop="abm_ex2" label="身份证号" width="200"></el-table-column>
                            <el-table-column prop="abm_ex1" label="与主申请人关系" width="180"></el-table-column>
                            <el-table-column prop="ab_ex11" label="户籍所在地" width="380"></el-table-column>
                        </el-table>
                    </div>
                </div>
                
                <h4 class="black">二、家庭财产信息</h4>
                <div>
                    <span>&emsp;&emsp;此次经济核对了15个省级项目，5个市级项目共有婚姻，户籍信息车辆，金融信息，职工基本信息，证券信息等反馈疑似信息，具体信息反馈如下：</span>
                </div>
                <div id="cont">

                    <div style="width:90%;margin-left:5%;"  >
                        <div style="width:99.8%;text-align:center;background:#eeeeee;height:30px;line-height:30px;border:1px solid #ddd;border-bottom:0" class="black">证劵信息</div>
                            <table style="table-layout:fixed;width:100%;margin-bottom:20px;border:1px solid #ddd;padding-right:1px; " v-for="(item,index) in zj" :key="index">
                            <colgroup>
                                <col style="width:15%"/>
                                <col style="width:18%"/>
                                <col style="width:15%"/>
                                <col style="width:18%"/>
                                <col style="width:15%"/>
                                <col style="width:18%"/>
                            </colgroup>
                            
                            <tr >
                                <td class="black">家庭成员姓名</td>
                                <td >{{item.abm_ex3}}</td>
                                <td class="black">股票总市值</td>
                                <td >{{item.d204c240001}}</td>
                                <td class="black">新三板总股本</td>
                                <td >{{item.d204c240002}}</td>
                            </tr>
                            <tr>
                                <td class="black">新三板估值</td>
                                <td >{{item.d204c240003}}</td>
                                <td class="black">持有基金总市值</td>
                                <td >{{item.d204c240004}}</td>
                                <td class="black">债券总市值</td>
                                <td >{{item.d204c240005}}</td>
                            </tr>
                            <tr>
                                <td class="black">数据记录的实际查询日期</td>
                                <td >{{item.d204c240006}}</td>
                                <td class="black">结果标识</td>
                                <td >{{item.d204c240007}}</td>
                                <td class="black">托管商</td>
                                <td >{{item.d204c240008}}</td>
                            </tr>
                            <tr>
                                <td class="black">深市/沪市</td>
                                <td >{{item.d204c240009}}</td>
                                <td class="black">是否开立</td>
                                <td >{{item.d204c240010}}</td>
                                <td class="black">反馈时间</td>
                                <td >{{item.ahc_dat2}}</td>
                                </tr>
                            </table>
                        </div>
                </div>


            </div><br/><br/>
            <div style="width:90%;margin-left:5%;"  >
                <div style="width:99.8%;text-align:center;background:#eeeeee;height:30px;line-height:30px;border:1px solid #ddd;border-bottom:0" class="black">存款信息</div>
                <table style="table-layout:fixed;width:100%;margin-bottom:20px;border:1px solid #ddd;padding-right:1px; " v-for="(item,index) in ck" :key="index">
                    <colgroup>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                    </colgroup>

                    <tr >
                        <td class="black">家庭成员姓名</td>
                        <td >{{item.abm_ex3}}</td>
                        <td class="black">个人存款是否超限</td>
                        <td >{{item.d204c230016}}</td>
                        <td class="black">家庭存款是否超限</td>
                        <td >{{item.d204c230017}}</td>
                    </tr>
                    <tr>
                        <td class="black">反馈时间</td>
                        <td >{{item.ahc_dat2}}</td>
                    </tr>
                </table>
            </div>

            <div style="width:90%;margin-left:5%;"  >
                <div style="width:99.8%;text-align:center;background:#eeeeee;height:30px;line-height:30px;border:1px solid #ddd;border-bottom:0" class="black">不动产信息</div>
                <table style="table-layout:fixed;width:100%;margin-bottom:20px;border:1px solid #ddd;padding-right:1px; " v-for="(item,index) in bdc" :key="index">
                    <colgroup>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                    </colgroup>
                
                    <tr >
                        <td class="black">家庭成员姓名</td>
                        <td >{{item.abm_ex3}}</td>
                        <td class="black">房地坐落</td>
                        <td >{{item.d204c310001}}</td>
                        <td class="black">建筑面积</td>
                        <td >{{item.d204c310002}}</td>
                    </tr>
                    <tr >
                        <td class="black">规划用途</td>
                        <td >{{item.d204c310003}}</td>
                        <td class="black">房屋性质</td>
                        <td >{{item.d204c310004}}</td>
                        <td class="black">不动产权证号</td>
                        <td >{{item.d204c310005}}</td>
                    </tr>
                    <tr >
                        <td class="black">登记时间</td>
                        <td >{{item.d204c310006}}</td>
                        <td class="black">共有方式</td>
                        <td >{{item.d204c310007}}</td>
                        <td class="black">房屋结构</td>
                        <td >{{item.d204c310008}}</td>
                    </tr>
                    <tr >
                        <td class="black">房屋类型</td>
                        <td >{{item.d204c310009}}</td>
                        <td class="black">反馈时间</td>
                        <td >{{item.ahc_dat2}}</td>

                    </tr>
                </table>
            </div>

            <div style="width:90%;margin-left:5%;"  >
                <div style="width:99.8%;text-align:center;background:#eeeeee;height:30px;line-height:30px;border:1px solid #ddd;border-bottom:0" class="black">公积金缴存信息</div>
                    <table style="table-layout:fixed;width:100%;margin-bottom:20px;border:1px solid #ddd;padding-right:1px; " v-for="(item,index) in gjjjc" :key="index">
                        <colgroup>
                            <col style="width:15%"/>
                            <col style="width:18%"/>
                            <col style="width:15%"/>
                            <col style="width:18%"/>v-for=
                            <col style="width:15%"/>
                            <col style="width:18%"/>
                        </colgroup>
           
                        <tr >
                            <td class="black">家庭成员姓名</td>
                            <td >{{item.abm_ex3}}</td>
                            <td class="black">职工缴交率</td>
                            <td >{{item.d204d3410001}}</td>
                            <td class="black">该职工代码存在的数据条数</td>
                            <td >{{item.d204d3410002}}</td>
                        </tr>
                        <tr >
                            <td class="black">汇缴年月</td>
                            <td >{{item.d204d3410003}}</td>
                            <td class="black">营业执照代码</td>
                            <td >{{item.d204d3410004}}</td>
                            <td class="black">月缴额</td>
                            <td >{{item.d204d3410005}}</td>
                        </tr>
                        <tr >
                            <td class="black">单位缴交率</td>
                            <td >{{item.d204d3410006}}</td>
                            <td class="black">单位代码</td>
                            <td >{{item.d204d3410007}}</td>
                            <td class="black">单位名称</td>
                            <td >{{item.d204d3410008}}</td>
                        </tr>
                        <tr >
                            <td class="black">职工内码</td>
                            <td >{{item.d204d3410009}}</td>
                            <td class="black">职工月缴额</td>
                            <td >{{item.d204d3410010}}</td>
                            <td class="black">汇缴状态</td>
                            <td >{{item.d204d3410011}}</td>
                    </tr>
                    <tr >
                        <td class="black">单位月缴</td>
                        <td >{{item.d204d3410012}}</td>
                        <td class="black">反馈时间</td>
                        <td >{{item.ahc_dat2}}</td>
                    </tr>
                </table>
            </div>
            <div style="width:90%;margin-left:5%;"  >
                <div style="width:99.8%;text-align:center;background:#eeeeee;height:30px;line-height:30px;border:1px solid #ddd;border-bottom:0" class="black">公积金贷款信息</div>
                <table style="table-layout:fixed;width:100%;margin-bottom:20px;border:1px solid #ddd;padding-right:1px; " v-for="(item,index) in gjjdk" :key="index">
                    <colgroup>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                    </colgroup>
                    <tr >
                        <td class="black">家庭成员姓名</td>
                        <td >{{item.abm_ex3}}</td>
                        <td class="black">经办银行</td>
                        <td >{{item.d204d340001}}</td>
                        <td class="black">申请日期</td>
                        <td >{{item.d204d340002}}</td>
                    </tr>
                    <tr >
                        <td class="black">申请贷款期限(月)</td>
                        <td >{{item.d204d340003}}</td>
                        <td class="black">还款方式</td>
                        <td >{{item.d204d340004}}</td>
                        <td class="black">贷款类型</td>
                        <td >{{item.d204d340005}}</td>
                    </tr>
                    <tr >
                        <td class="black">月还金额</td>
                        <td >{{item.d204d340006}}</td>
                        <td class="black">扣款账号</td>
                        <td >{{item.d204d340007}}</td>
                        <td class="black">还款账户</td>
                        <td >{{item.d204d340008}}</td>
                    </tr>
                    <tr >
                        <td class="black">反馈时间</td>
                        <td >{{item.ahc_dat2}}</td>
                    </tr>
                </table>
            </div>
            <div style="width:90%;margin-left:5%;"  >
                <div style="width:99.8%;text-align:center;background:#eeeeee;height:30px;line-height:30px;border:1px solid #ddd;border-bottom:0" class="black">车辆信息</div>
                <table style="table-layout:fixed;width:100%;margin-bottom:20px;border:1px solid #ddd;padding-right:1px; " v-for="(item,index) in car" :key="index">
                    <colgroup>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                    </colgroup>
            
                    <tr >
                        <td class="black">家庭成员姓名</td>
                        <td >{{item.abm_ex3}}</td>
                        <td class="black">中文品牌</td>
                        <td >{{item.d204c210001}}</td>
                        <td class="black">号牌号码</td>
                        <td >{{item.d204c210002}}</td>
                    </tr>
                    <tr >
                        <td class="black">车辆型号</td>
                        <td >{{item.d204c210003}}</td>
                        <td class="black">初次登记日期</td>
                        <td >{{item.d204c210004}}</td>
                        <td class="black">使用性质</td>
                        <td >{{item.d204c210006}}</td>
                    </tr>
                    <tr >
                        <td class="black">机动车状态</td>
                        <td >{{item.d204c210012}}</td>
                        <td class="black">号牌种类</td>
                        <td >{{item.d204c210016}}</td>
                        <td class="black">反馈时间</td>
                        <td >{{item.ahc_dat2}}</td>
                    </tr>
                </table>
            </div>
            <div style="width:90%;margin-left:5%;"  >
                <div style="width:99.8%;text-align:center;background:#eeeeee;height:30px;line-height:30px;border:1px solid #ddd;border-bottom:0" class="black">企业高级管理人员</div>
                <table style="table-layout:fixed;width:100%;margin-bottom:20px;border:1px solid #ddd;padding-right:1px; " v-for="(item,index) in business" :key="index">
                    <colgroup>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                    </colgroup>
                    <tr >
                        <td class="black">家庭成员姓名</td>
                        <td >{{item.abm_ex3}}</td>
                        <td class="black">所属企业的统一社会信用代码</td>
                        <td >{{item.d204b120001}}</td>
                        <td class="black">注册号</td>
                        <td >{{item.d204b120002}}</td>
                    </tr>
                    <tr >
                        <td class="black">企业名称</td>
                        <td >{{item.d204b120003}}</td>
                        <td class="black">企业类型</td>
                        <td >{{item.d204b120004}}</td>
                        <td class="black">注册资本</td>
                        <td >{{item.d204b120005}}</td>
                    </tr>
                    <tr >
                        <td class="black">经营范围</td>
                        <td >{{item.d204b120006}}</td>
                        <td class="black">职务</td>
                        <td >{{item.d204b120007}}</td>
                        <td class="black">登记机关</td>
                        <td >{{item.d204b120008}}</td>
                    </tr>
                    <tr >
                        <td class="black">成立日期</td>
                        <td >{{item.d204b120009}}</td>
                        <td class="black">在业状态</td>
                        <td >{{item.d204b120010}}</td>
                        <td class="black">反馈时间</td>
                        <td >{{item.ahc_dat2}}</td>
                    </tr>
                </table>
             </div>
             <div style="width:90%;margin-left:5%;"  >
                <div style="width:99.8%;text-align:center;background:#eeeeee;height:30px;line-height:30px;border:1px solid #ddd;border-bottom:0">死亡信息</div>
                <table style="table-layout:fixed;width:100%;margin-bottom:20px;border:1px solid #ddd;padding-right:1px; " v-for="(item,index) in byg" :key="index">
                    <colgroup>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                    </colgroup>
                    <tr >
                        <td class="black">家庭成员姓名</td>
                        <td >{{item.abm_ex3}}</td>
                        <td class="black">性别</td>
                        <td >{{item.d204z780001}}</td>
                        <td class="black">出生日期</td>
                        <td >{{item.d204z780002}}</td>
                    </tr>
                    <tr >
                        <td class="black">注销标识</td>
                        <td >{{item.d204z780003}}</td>
                        <td class="black">派出所</td>
                        <td >{{item.d204z780004}}</td>
                        <td class="black">反馈时间</td>
                        <td >{{item.ahc_dat2}}</td>
                    </tr>
                </table>
            </div>
            <div style="width:90%;margin-left:5%;"  >
                <div style="width:99.8%;text-align:center;background:#eeeeee;height:30px;line-height:30px;border:1px solid #ddd;border-bottom:0" class="black">个人所得税信息</div>
                    <table style="table-layout:fixed;width:100%;margin-bottom:20px;border:1px solid #ddd;padding-right:1px; " v-for="(item,index) in income" :key="index">
                    <colgroup>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                    </colgroup>

                    <tr >
                        <td class="black">家庭成员姓名</td>
                        <td >{{item.abm_ex3}}</td>
                        <td class="black">税款所属期起</td>
                        <td >{{item.d204d380002}}</td>
                        <td class="black">税款所属期止</td>
                        <td >{{item.d204d380003}}</td>
                    </tr>
                    <tr >
                        <td class="black">入库金额</td>
                        <td >{{item.d204d380005}}</td>
                        <td class="black">收入额</td>
                        <td >{{item.d204d380006}}</td>
                        <td class="black">入库日期</td>
                        <td >{{item.d204d380007}}</td>
                    </tr>
                    <tr >
                        <td class="black">单位纳税人名称</td>
                        <td >{{item.d204d380010}}</td>
                        <td class="black">所得项目名称</td>
                        <td >{{item.d204d380013}}</td>
                        <td class="black">应纳税所得额</td>
                        <td >{{item.d204d380014}}</td>
                    </tr>
                    <tr >
                        <td class="black">反馈时间</td>
                        <td >{{item.ahc_dat2}}</td>
                    </tr>
                </table>
            </div>
            <div style="width:90%;margin-left:5%;"  >
                <div style="width:99.8%;text-align:center;background:#eeeeee;height:30px;line-height:30px;border:1px solid #ddd;border-bottom:0" class="black">个体经营者信息</div>
                <table style="table-layout:fixed;width:100%;margin-bottom:20px;border:1px solid #ddd;padding-right:1px; " v-for="(item,index) in individual" :key="index">
                    <colgroup>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                    </colgroup>
                    <tr >
                        <td class="black">家庭成员姓名</td>
                        <td >{{item.abm_ex3}}</td>
                        <td class="black">个体工商户的统一社会信用代码</td>
                        <td >{{item.d204b120001}}</td>
                        <td class="black">注册号</td>
                        <td >{{item.d204b120002}}</td>
                    </tr>
                    <tr >
                        <td class="black">资金数额</td>
                        <td >{{item.d204b120003}}</td>
                        <td class="black">经营范围</td>
                        <td >{{item.d204b120004}}</td>
                        <td class="black">登记机关</td>
                        <td >{{item.d204b120005}}</td>
                    </tr>
                    <tr >
                        <td class="black">成立日期</td>
                        <td >{{item.d204b120006}}</td>
                        <td class="black">在业状态</td>
                        <td >{{item.d204b120007}}</td>
                        <td class="black">企业名称</td>
                        <td >{{item.d204b120008}}</td>
                    </tr>
                    <tr >
                        <td class="black">反馈时间</td>
                        <td >{{item.ahc_dat2}}</td>
                    </tr>
                </table>
            </div>
            <div style="width:90%;margin-left:5%;"  >
                <div style="width:99.8%;text-align:center;background:#eeeeee;height:30px;line-height:30px;border:1px solid #ddd;border-bottom:0" class="black">企业投资人信息</div>
                <table style="table-layout:fixed;width:100%;margin-bottom:20px;border:1px solid #ddd;padding-right:1px; " v-for="(item,index) in investor" :key="index">
                    <colgroup>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        </colgroup>
                        <tr >
                            <td class="black">家庭成员姓名</td>
                            <td >{{item.abm_ex3}}</td>
                            <td class="black">所属企业的统一社会信用代码</td>
                            <td >{{item.d204b120001}}</td>
                            <td class="black">注册号</td>
                            <td >{{item.d204b120002}}</td>
                        </tr>
                        <tr >
                            <td class="black">企业名称</td>
                            <td >{{item.d204b120003}}</td>
                            <td class="black">认缴出资额</td>
                            <td >{{item.d204b120004}}</td>
                            <td class="black">登记机关</td>
                            <td >{{item.d204b120005}}</td>
                        </tr>
                        <tr >
                            <td class="black">成立日期</td>
                            <td >{{item.d204b120006}}</td>
                            <td class="black">在业状态</td>
                            <td >{{item.d204b120007}}</td>
                            <td class="black">反馈时间</td>
                            <td >{{item.ahc_dat2}}</td>
                        </tr>
                   </table>
             </div>
             <div style="width:90%;margin-left:5%;"  >
                <div style="width:99.8%;text-align:center;background:#eeeeee;height:30px;line-height:30px;border:1px solid #ddd;border-bottom:0" class="black">司法信息</div>
                <table style="table-layout:fixed;width:100%;margin-bottom:20px;border:1px solid #ddd;padding-right:1px; " v-for="(item,index) in judicial" :key="index">
                    <colgroup>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                    </colgroup>
        
                    <tr >
                        <td class="black">家庭成员姓名</td>
                        <td >{{item.abm_ex3}}</td>
                        <td class="black">是否重点人员</td>
                        <td >{{item.d204z820001}}</td>
                        <td class="black">类型</td>
                        <td >{{item.d204z820002}}</td>
                    </tr>
                    <tr >
                        <td class="black">反馈时间</td>
                        <td >{{item.ahc_dat2}}</td>
                    </tr>
                </table>
            </div>
            <div style="width:90%;margin-left:5%;"  >
                <div style="width:99.8%;text-align:center;background:#eeeeee;height:30px;line-height:30px;border:1px solid #ddd;border-bottom:0" class="black">就业失业信息</div>
                    <table style="table-layout:fixed;width:100%;margin-bottom:20px;border:1px solid #ddd;padding-right:1px; " v-for="(item,index) in loseJob" :key="index">
                        <colgroup>
                            <col style="width:15%"/>
                            <col style="width:18%"/>
                            <col style="width:15%"/>
                            <col style="width:18%"/>
                            <col style="width:15%"/>
                            <col style="width:18%"/>
                        </colgroup>

                        <tr >
                            <td class="black">家庭成员姓名</td>
                            <td >{{item.abm_ex3}}</td>
                            <td class="black">失业经办人</td>
                            <td >{{item.d204d3210001}}</td>
                            <td class="black">减少原因</td>
                            <td >{{item.d204d3210002}}</td>
                        </tr>
                        <tr >
                            <td class="black">失业原因</td>
                            <td >{{item.d204d3210003}}</td>
                            <td class="black">失业登记时间</td>
                            <td >{{item.d204d3210004}}</td>
                            <td class="black">就业登记日期</td>
                            <td >{{item.d204d3210005}}</td>
                        </tr>
                        <tr >
                            <td class="black">就业时间</td>
                            <td >{{item.d204d3210006}}</td>
                            <td class="black">剩余失业保险金月数</td>
                            <td >{{item.d204d3210007}}</td>
                            <td class="black">结束期</td>
                            <td >{{item.d204d3210008}}</td>
                        </tr>
                        <tr >
                            <td class="black">登记号码</td>
                            <td >{{item.d204d3210009}}</td>
                            <td class="black">人员类别</td>
                            <td >{{item.d204d3210010}}</td>
                            <td class="black">就业形式</td>
                            <td >{{item.d204d3210011}}</td>
                        </tr>
                        <tr >
                            <td class="black">失业经办机构</td>
                            <td >{{item.d204d3210012}}</td>
                            <td class="black">经办机构</td>
                            <td >{{item.d204d3210013}}</td>
                            <td class="black">单位名称</td>
                            <td >{{item.d204d3210014}}</td>
                        </tr>
                        <tr >
                            <td class="black">失业经办机构</td>
                            <td >{{item.d204d3210015}}</td>
                            <td class="black">反馈时间</td>
                            <td >{{item.ahc_dat2}}</td>
                        </tr>
                    </table>
            </div>
            <div style="width:90%;margin-left:5%;"  >
                <div style="width:99.8%;text-align:center;background:#eeeeee;height:30px;line-height:30px;border:1px solid #ddd;border-bottom:0" class="black">婚姻信息</div>
                <table style="table-layout:fixed;width:100%;margin-bottom:20px;border:1px solid #ddd;padding-right:1px; " v-for="(item,index) in marriage" :key="index">
                    <colgroup>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                    </colgroup>

                    <tr >
                        <td class="black">家庭成员姓名</td>
                        <td >{{item.abm_ex3}}</td>
                        <td class="black">配偶姓名</td>
                        <td >{{item.d204z630004}}</td>
                        <td class="black">配偶证件号码</td>
                        <td >{{item.d204z630005}}</td>
                    </tr>
                    <tr >
                        <td class="black">婚姻状况</td>
                        <td >{{item.d204z630006}}</td>
                        <td class="black">登记日期</td>
                        <td >{{item.d204z630007}}</td>
                        <td class="black">登记类型</td>
                        <td >{{item.d204z630008}}</td>
                    </tr>

                    <tr >
                        <td class="black">反馈时间</td>
                        <td >{{item.ahc_dat2}}</td>
                    </tr>
                </table>
            </div>
            <div style="width:90%;margin-left:5%;"  >
                <div style="width:99.8%;text-align:center;background:#eeeeee;height:30px;line-height:30px;border:1px solid #ddd;border-bottom:0" class="black">社会组织</div>
                <table style="table-layout:fixed;width:100%;margin-bottom:20px;border:1px solid #ddd;padding-right:1px; " v-for="(item,index) in organization" :key="index">
                    <colgroup>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                    </colgroup>
   
                    <tr >
                        <td class="black">家庭成员姓名</td>
                        <td >{{item.abm_ex3}}</td>
                        <td class="black">组织名称</td>
                        <td >{{item.d204z540001}}</td>
                        <td class="black">组织类型</td>
                        <td >{{item.d204z540002}}</td>
                    </tr>
                     <tr >
                        <td class="black">登记证号</td>
                        <td >{{item.d204z540003}}</td>
                        <td class="black">组织机构代码</td>
                        <td >{{item.d204z540004}}</td>
                        <td class="black">业务主管单位</td>
                        <td >{{item.d204z540005}}</td>
                    </tr>
                    <tr >
                        <td class="black">登记管理机关</td>
                        <td >{{item.d204z540006}}</td>
                        <td class="black">开办资金(元)</td>
                        <td >{{item.d204z540007}}</td>
                        <td class="black">行业分类</td>
                        <td >{{item.d204z540008}}</td>
                    </tr>
                    <tr >
                        <td class="black">反馈时间</td>
                        <td >{{item.ahc_dat2}}</td>
                    </tr>
                </table>
            </div>
            <div style="width:90%;margin-left:5%;"  >
                <div style="width:99.8%;text-align:center;background:#eeeeee;height:30px;line-height:30px;border:1px solid #ddd;border-bottom:0" class="black">法人纳税信息</div>
                <table style="table-layout:fixed;width:100%;margin-bottom:20px;border:1px solid #ddd;padding-right:1px; " v-for="(item,index) in taxes" :key="index">
                    <colgroup>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                         <col style="width:15%"/>
                        <col style="width:18%"/>
                    </colgroup>
              
                    <tr >
                        <td class="black">家庭成员姓名</td>
                        <td >{{item.abm_ex3}}</td>
                        <td class="black">纳税人企业名称</td>
                        <td >{{item.d204d330002}}</td>
                        <td class="black">申报日期</td>
                        <td >{{item.d204d330006}}</td>
                    </tr>
                    <tr >
                        <td class="black">税种</td>
                        <td >{{item.d204d330007}}</td>
                        <td class="black">收入</td>
                        <td >{{item.d204d330009}}</td>
                        <td class="black">税额</td>
                        <td >{{item.d204d330010}}</td>
                    </tr>
                    <tr >
                        <td class="black">税务登记证号</td>
                        <td >{{item.d204d330011}}</td>
                        <td class="black">税务登记类型</td>
                        <td >{{item.d204d330012}}</td>
                        <td class="black">征税机构</td>
                        <td >{{item.d204d330014}}</td>
                    </tr>
                    <tr >
                        <td class="black">免税收入额</td>
                        <td >{{item.d204d330015}}</td>
                        <td class="black">所属期起</td>
                        <td >{{item.d204d330018}}</td>
                        <td class="black">所属期止</td>
                        <td >{{item.d204d330019}}</td>
                    </tr>
                    <tr >
                        <td class="black">申报表类型</td>
                        <td >{{item.d204d330020}}</td>
                        <td class="black">反馈时间</td>
                        <td >{{item.ahc_dat2}}</td>
                    </tr>
                </table>
            </div>
            <div style="width:90%;margin-left:5%;"  >
                <div style="width:99.8%;text-align:center;background:#eeeeee;height:30px;line-height:30px;border:1px solid #ddd;border-bottom:0" class="black">职工基础信息</div>
                <table style="table-layout:fixed;width:100%;margin-bottom:20px;border:1px solid #ddd;padding-right:1px; " v-for="(item,index) in works" :key="index">
                    <colgroup>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                    </colgroup>
           
                    <tr >
                        <td class="black">家庭成员姓名</td>
                        <td >{{item.abm_ex3}}</td>
                        <td class="black">性别</td>
                        <td >{{item.d204d340001}}</td>
                        <td class="black">个人存款账户号码</td>
                        <td >{{item.d204d340002}}</td>
                    </tr>
                    <tr >
                        <td class="black">出生日期</td>
                        <td ></td>
                        <td class="black">就业状态</td>
                        <td >{{item.d204d340004}}</td>
                        <td class="black">婚姻状况</td>
                        <td >{{item.d204d340005}}</td>
                    </tr>
                    <tr >
                        <td class="black">最高学历</td>
                        <td >{{item.d204d340006}}</td>
                        <td class="black">销户日期</td>
                        <td >{{item.d204d340007}}</td>
                        <td class="black">是否转业军人</td>
                        <td >{{item.d204d340008}}</td>
                    </tr>
                    <tr >
                        <td class="black">参工日期</td>
                        <td >{{item.d204d340009}}</td>
                        <td class="black">社保账号</td>
                        <td >{{item.d204d340010}}</td>
                        <td class="black">开户日期</td>
                        <td >{{item.d204d340011}}</td>
                    </tr>
                    <tr >
                        <td class="black">是否现役军人</td>
                        <td >{{item.d204d340012}}</td>
                        <td class="black">职称</td>
                        <td >{{item.d204d340013}}</td>
                         <td class="black">所属行业</td>
                        <td >{{item.d204d340014}}</td>
                    </tr>
                    <tr >
                        <td class="black">家庭住址</td>
                        <td >{{item.d204d340015}}</td>
                        <td class="black">信用等级</td>
                        <td >{{item.d204d340016}}</td>
                        <td class="black">联系地址</td>
                        <td >{{item.d204d340017}}</td>
                    </tr>
                    <tr >
                        <td class="black">浮动工资</td>
                        <td >{{item.d204d340018}}</td>
                        <td class="black">是否存在住房公积金</td>
                        <td >{{item.d204d340019}}</td>
                        <td class="black">民族</td>
                        <td >{{item.d204d340020}}</td>
                    </tr>
                    <tr >
                        <td class="black">职务</td>
                        <td >{{item.d204d340021}}</td>
                        <td class="black">英文姓名</td>
                        <td >{{item.d204d340022}}</td>
                        <td class="black">职业</td>
                        <td >{{item.d204d340023}} </td>
                    </tr>
                    <tr >
                        <td class="black">是否贷款</td>
                        <td >{{item.d204d340024}}</td>
                        <td class="black">邮编</td>
                        <td >{{item.d204d340025}}</td>
                        <td class="black">实际工资基数</td>
                        <td >{{item.d204d340026}}</td>
                    </tr>
                    <tr >
                        <td class="black">联系地址邮编</td>
                        <td >{{item.d204d340027}}</td>
                        <td class="black">户籍性质</td>
                        <td >{{item.d204d340028}}</td>
                        <td class="black">个人存款账户开户行</td>
                        <td >{{item.d204d340029}}</td>
                    </tr>
                    <tr >
                        <td class="black">职工内码</td>
                        <td >{{item.d204d340030}}</td>
                        <td class="black">代为代码</td>
                        <td >{{item.d204d340031}}</td>
                        <td class="black">政治面貌</td>
                        <td >{{item.d204d340032}}</td>
                    </tr>
                    <tr >
                        <td class="black">反馈时间</td>
                        <td >{{item.ahc_dat2}}</td>
                    </tr>
                </table>
            </div>
            <div style="width:90%;margin-left:5%;"  >
                <div style="width:99.8%;text-align:center;background:#eeeeee;height:30px;line-height:30px;border:1px solid #ddd;border-bottom:0" class="black">高考信息</div>
                <table style="table-layout:fixed;width:100%;margin-bottom:20px;border:1px solid #ddd;padding-right:1px; " v-for="(item,index) in college" :key="index">
                    <colgroup>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                    </colgroup>
         
                    <tr >
                        <td class="black">家庭成员姓名</td>
                        <td >{{item.abm_ex3}}</td>
                        <td class="black">户口所在地</td>
                        <td >{{item.d204z510001}}</td>
                        <td class="black">院校名称</td>
                        <td >{{item.d204z510002}}</td>
                    </tr>
                    <tr >
                        <td class="black">批次名称</td>
                        <td >{{item.d204z510003}}</td>
                        <td class="black">录取年度</td>
                        <td >{{item.d204z510004}}</td>
                        <td class="black">反馈时间</td>
                        <td >{{item.ahc_dat2}}</td>
                    </tr>
                </table>
            </div>
            <div style="width:90%;margin-left:5%;"  >
                <div style="width:99.8%;text-align:center;background:#eeeeee;height:30px;line-height:30px;border:1px solid #ddd;border-bottom:0" class="black">户籍信息</div>
                <table style="table-layout:fixed;width:100%;margin-bottom:20px;border:1px solid #ddd;padding-right:1px; " v-for="(item,index) in hj" :key="index">
                    <colgroup>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                    </colgroup>
              
                    <tr >
                        <td class="black">家庭成员姓名</td>
                        <td >{{item.abm_ex3}}</td>
                        <td class="black">性别</td>
                        <td >{{item.d204a050002}}</td>
                        <td class="black">民族</td>
                         <td >{{item.d204a050003}}</td>
                    </tr>
                     <tr >
                        <td class="black">出生日期</td>
                        <td >{{item.d204a050004}}</td>
                        <td class="black">户籍行政区划</td>
                        <td >{{item.d204a050010}}</td>
                        <td class="black">派出所</td>
                        <td >{{item.d204a050011}}</td>
                    </tr>
                    <tr >
                        <td class="black">反馈时间</td>
                        <td >{{item.ahc_dat2}}</td>
                    </tr>
                </table>
            </div>
            <div style="width:90%;margin-left:5%;"  >
                 <div style="width:99.8%;text-align:center;background:#eeeeee;height:30px;line-height:30px;border:1px solid #ddd;border-bottom:0" class="black">殡葬信息</div>
                <table style="table-layout:fixed;width:100%;margin-bottom:20px;border:1px solid #ddd;padding-right:1px;  " v-for="(item,index) in bz" :key="index">
                    <colgroup>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                        <col style="width:15%"/>
                        <col style="width:18%"/>
                    </colgroup>
              
                    <tr >
                        <td class="black">家庭成员姓名</td>
                        <td >{{item.abm_ex3}}</td>
                        <td class="black">性别</td>
                        <td >{{item.d204z620004}}</td>
                        <td class="black">出生日期</td>
                        <td >{{item.d204z620005}}</td>
                    </tr>
                     <tr >
                        <td class="black">死亡日期</td>
                        <td >{{item.d204z620006}}</td>
                        <td class="black">死亡原因</td>
                        <td >{{item.d204z620007}}</td>
                        <td class="black">死亡地点</td>
                        <td >{{item.d204z620008}}</td>
                    </tr>
                    <tr >
                        <td class="black">殡仪馆名称</td>
                        <td >{{item.d204z620010}}</td>
                        <td class="black">反馈时间</td>
                        <td >{{item.ahc_dat2}}</td>
                    </tr>
                </table>
            </div>
            <div class="black">注：1、如有疑问或与事实不符，请接到核对报告后5日内通知核查机构。</div>
            <div  class="black">2、本报告仅供本行政区域内社会救助审核使用，不做其他用途。</div>
            <div  class="black">3、本报告于<span class="dateTime">2020-07-26</span>进行了第1次打印。</div>
            <div  class="black" style="margin-left:65%;"><h3>泰州市社会救助家庭经济状况核对中心</h3></div>
            <div style="bottom: 200px;margin-left:70%;" class="black"><span class="dateTime"></span></div>
        </div>
    </div>
</template>
<script>
import request from '@/utils/request'
export default {
    data(){
        return{
            activeName:'first',
            sId:'',
            zj:[],//证卷
            ck:[],
            bdc:[],
            gjjjc:[],
            gjjdk:[],
            car:[],
            business:[],
            byg:[],
            income:[],
            individual:[],
            investor:[],
            judicial:[],
            loseJob:[],
            marriage:[],
            organization:[],
            taxes:[],
            works:[],
            college:[],
            hj:[],
            bz:[],
            info:{},
            tableData :[],
            tableData2 :[]
        }
    },
    created(){
        
        this.sId=this.$route.query.sId;
        this.loadData();
    },
    methods:{
        loadData(){
            this.getData21();
            this.getData1();
            this.getData2();
            this.getData3();
            this.getData4();
            this.getData5();
            this.getData6();
            this.getData7();
            this.getData8();
            this.getData9();
            this.getData10();
            this.getData11();
            this.getData12();
            this.getData13();
            this.getData14();
            this.getData15();
            this.getData16();
            this.getData17();
            this.getData18();
            this.getData19();
            this.getData20();
           
        },
        getData1(){
            request({
                headers: {
                    'Accept': 'application/json',
                },
                url: '/social/assistance/getBone',
                method: 'post',
                // data:{
                // sId:"57943",
                // },
                data: {sId:this.sId}
            }).then(rs=>{
                this.zj=res.response.data;
            }).catch(res=>{
                this.zj=res.response.data;
            })
           
        },
        getData2(){
            request({
                headers: {
                    'Accept': 'application/json',
                },
                url: '/social/assistance/getDeposit',
                method: 'post',
                // data:{
                // sId:"57943",
                // },
                data: {sId:this.sId}
            }).then(rs=>{
                this.ck=res.response.data;
                for(let i=0;i<this.ck.length;i++){
                    var abm_ex3 = unescape(this.ck[i].abm_ex3);
                    var d204c230016 = unescape(this.ck[i].d204c230016);
                    if(d204c230016=='0'){
                        d204c230016='否';
                    }else{
                        d204c230016='是';
                    }
                    this.ck[i].d204c230016=d204c230016;


                    var d204c230017 = unescape(this.ck[i].d204c230017);
                    if(d204c230017=='0'){
                        d204c230017='否';
                    }else{
                        d204c230017='是';
                    }
                    this.ck[i].d204c230017=d204c230017;
                    var ahc_dat2 = unescape(this.ck[i].ahc_dat2)!=null?unescape(this.ck[i].ahc_dat2).substring(0,10):'';
                    this.ck[i].ahc_dat2=ahc_dat2
                }
            }).catch(res=>{
                this.ck=res.response.data;
                for(let i=0;i<this.ck.length;i++){
                    var abm_ex3 = unescape(this.ck[i].abm_ex3);
                    var d204c230016 = unescape(this.ck[i].d204c230016);
                    if(d204c230016=='0'){
                        d204c230016='否';
                    }else{
                        d204c230016='是';
                    }
                    this.ck[i].d204c230016=d204c230016;


                    var d204c230017 = unescape(this.ck[i].d204c230017);
                    if(d204c230017=='0'){
                        d204c230017='否';
                    }else{
                        d204c230017='是';
                    }
                    this.ck[i].d204c230017=d204c230017;
                    var ahc_dat2 = unescape(this.ck[i].ahc_dat2)!=null?unescape(this.ck[i].ahc_dat2).substring(0,10):'';
                    this.ck[i].ahc_dat2=ahc_dat2
                }
            })
           
        },
        getData3(){
             request({
                headers: {
                    'Accept': 'application/json',
                },
                url: '/social/assistance/getEstate',
                method: 'post',
                // data:{
                // sId:"57943",
                // },
                data: {sId:this.sId}
            }).then(rs=>{
                this.bdc=res.response.data;
            }).catch(res=>{
                this.bdc=res.response.data;
            })
            
        },
        getData4(){
            request({
                headers: {
                    'Accept': 'application/json',
                },
                url: '/social/assistance/getFundHand',
                method: 'post',
                // data:{
                // sId:"57943",
                // },
                data: {sId:this.sId}
            }).then(rs=>{
                let json3=res.response.data.sj.oldData;
                let datas=[];
                for (var i = 1; i < json3.length; i++) {
                    var json = json3[i];
                    for(var k in json){

                        if(json[k]==null){
                            json[k]="";
                        }
                    }
                    datas.push(json);
                }
                this.gjjjc=datas;
            }).catch(res=>{
                let json3=res.response.data.sj.oldData;
                let datas=[];
                for (var i = 1; i < json3.length; i++) {
                    var json = json3[i];
                    for(var k in json){

                        if(json[k]==null){
                            json[k]="";
                        }
                    }
                    datas.push(json);
                }
                this.gjjjc=datas;
            })
           
        },
        getData5(){
            request({
                headers: {
                    'Accept': 'application/json',
                },
                url: '/social/assistance/getFund',
                method: 'post',
                // data:{
                // sId:"57943",
                // },
                data: {sId:this.sId}
            }).then(rs=>{
                let json3=res.response.data.sj.oldData;
                let datas=[];
                for (var i = 1; i < json3.length; i++) {
                    var json = json3[i];
                    for(var k in json){

                        if(json[k]==null){
                            json[k]="";
                        }
                    }
                    datas.push(json);
                }
                this.gjjdk=datas;
            }).catch(res=>{
                let json3=res.response.data.sj.oldData;
                let datas=[];
                for (var i = 1; i < json3.length; i++) {
                    var json = json3[i];
                    for(var k in json){

                        if(json[k]==null){
                            json[k]="";
                        }
                    }
                    datas.push(json);
                }
                this.gjjdk=datas;
            })
           
            
        },
        getData6(){
            request({
                headers: {
                    'Accept': 'application/json',
                },
                url: '/social/assistance/getCar',
                method: 'post',
                // data:{
                // sId:"57943",
                // },
                data: {sId:this.sId}
            }).then(rs=>{
                this.car=res.response.data;
            }).catch(res=>{
                this.car=res.response.data;
            })
            
        },

   
    
    getData7(){
        request({
                headers: {
                    'Accept': 'application/json',
                },
                url: '/social/assistance/getCeo',
                method: 'post',
                // data:{
                // sId:"57943",
                // },
                data: {sId:this.sId}
            }).then(rs=>{
                this.business=res.response.data;
            }).catch(res=>{
                this.business=res.response.data;
        })
        
    },
    
    getData8(){
        request({
                headers: {
                    'Accept': 'application/json',
                },
                url: '/social/assistance/getByg',
                method: 'post',
                // data:{
                // sId:"57943",
                // },
                data: {sId:this.sId}
            }).then(rs=>{
                let json3=res.response.data.sj.oldData;
                let datas=[];
                for (var i = 1; i < json3.length; i++) {
                    var json = json3[i];
                    for(var k in json){

                        if(json[k]==null){
                            json[k]="";
                        }
                    }
                    datas.push(json);
                }
                this.byg=datas;
            }).catch(res=>{
                let json3=res.response.data.sj.oldData;
                let datas=[];
                for (var i = 1; i < json3.length; i++) {
                    var json = json3[i];
                    for(var k in json){

                        if(json[k]==null){
                            json[k]="";
                        }
                    }
                    datas.push(json);
                }
                this.byg=datas;
        })
        
    },
    getData9(){
        request({
                headers: {
                    'Accept': 'application/json',
                },
                url: '/social/assistance/getIncome',
                method: 'post',
                // data:{
                // sId:"57943",
                // },
                data: {sId:this.sId}
            }).then(rs=>{
                this.income=res.response.data;
            }).catch(res=>{
                this.income=res.response.data;
        })
    },
    getData10(){
         request({
                headers: {
                    'Accept': 'application/json',
                },
                url: '/social/assistance/getIndividual',
                method: 'post',
                // data:{
                // sId:"57943",
                // },
                data: {sId:this.sId}
            }).then(rs=>{
                this.individual=res.response.data;
            }).catch(res=>{
                this.individual=res.response.data;
        })
    },
    
    getData11(){
        request({
                headers: {
                    'Accept': 'application/json',
                },
                url: '/social/assistance/getInvestor',
                method: 'post',
                // data:{
                // sId:"57943",
                // },
                data: {sId:this.sId}
            }).then(rs=>{
                this.investor=res.response.data;
            }).catch(res=>{
                this.investor=res.response.data;
        })
    },
    
    getData12(){
        request({
                headers: {
                    'Accept': 'application/json',
                },
                url: '/social/assistance/getJudicial',
                method: 'post',
                // data:{
                // sId:"57943",
                // },
                data: {sId:this.sId}
            }).then(rs=>{
                this.judicial=res.response.data;
            }).catch(res=>{
                this.judicial=res.response.data;
        })
        
    },
    
    getData13(){
        request({
                headers: {
                    'Accept': 'application/json',
                },
                url: '/social/assistance/getLoseJob',
                method: 'post',
                // data:{
                // sId:"57943",
                // },
                data: {sId:this.sId}
            }).then(rs=>{
                let json3=res.response.data.sj.oldData;
                let datas=[];
                for (var i = 1; i < json3.length; i++) {
                    var json = json3[i];
                    for(var k in json){

                        if(json[k]==null){
                            json[k]="";
                        }
                    }
                    datas.push(json);
                }
                this.loseJob=datas
            }).catch(res=>{
               let json3=res.response.data.sj.oldData;
                let datas=[];
                for (var i = 1; i < json3.length; i++) {
                    var json = json3[i];
                    for(var k in json){

                        if(json[k]==null){
                            json[k]="";
                        }
                    }
                    datas.push(json);
                }
                this.loseJob=datas
        })
       
    },
    
    getData14(){
        request({
                headers: {
                    'Accept': 'application/json',
                },
                url: '/social/assistance/getMarriage',
                method: 'post',
                // data:{
                // sId:"57943",
                // },
                data: {sId:this.sId}
            }).then(rs=>{
                this.marriage=res.response.data;
            }).catch(res=>{
                this.marriage=res.response.data;
        })
    },
     getData15(){
         request({
                headers: {
                    'Accept': 'application/json',
                },
                url: '/social/assistance/getOrganization',
                method: 'post',
                // data:{
                // sId:"57943",
                // },
                data: {sId:this.sId}
            }).then(rs=>{
                this.organization=res.response.data;
            }).catch(res=>{
                this.organization=res.response.data;
        })
    },
    
    getData16(){
        request({
                headers: {
                    'Accept': 'application/json',
                },
                url: '/social/assistance/getTaxes',
                method: 'post',
                // data:{
                // sId:"57943",
                // },
                data: {sId:this.sId}
            }).then(rs=>{
                this.taxes=res.response.data;
            }).catch(res=>{
                this.taxes=res.response.data;
        })
       
    },
    
    getData17(){
        request({
                headers: {
                    'Accept': 'application/json',
                },
                url: '/social/assistance/getWorks',
                method: 'post',
                // data:{
                // sId:"57943",
                // },
                data: {sId:this.sId}
            }).then(rs=>{
                let json3=res.response.data.sj.oldData;
                let datas=[];
                for (var i = 1; i < json3.length; i++) {
                    var json = json3[i];
                    for(var k in json){

                        if(json[k]==null){
                            json[k]="";
                        }
                    }
                    datas.push(json);
                }
                this.works=datas;
            }).catch(res=>{
                let json3=res.response.data.sj.oldData;
                let datas=[];
                for (var i = 1; i < json3.length; i++) {
                    var json = json3[i];
                    for(var k in json){

                        if(json[k]==null){
                            json[k]="";
                        }
                    }
                    datas.push(json);
                }
                this.works=datas;
        })
    },
    
    getData18(){
         request({
                headers: {
                    'Accept': 'application/json',
                },
                url: '/social/assistance/getCollege',
                method: 'post',
                // data:{
                // sId:"57943",
                // },
                data: {sId:this.sId}
            }).then(rs=>{
                 let json3=res.response.data.sj.oldData;
                let datas=[];
                for (var i = 1; i < json3.length; i++) {
                    var json = json3[i];
                    for(var k in json){

                        if(json[k]==null){
                            json[k]="";
                        }
                    }
                    datas.push(json);
                }
                this.college=datas;
            }).catch(res=>{
                 let json3=res.response.data.sj.oldData;
                let datas=[];
                for (var i = 1; i < json3.length; i++) {
                    var json = json3[i];
                    for(var k in json){

                        if(json[k]==null){
                            json[k]="";
                        }
                    }
                    datas.push(json);
                }
                this.college=datas;
        })

    },
    getData19(){
        request({
                headers: {
                    'Accept': 'application/json',
                },
                url: '/social/assistance/getHJInfo',
                method: 'post',
                // data:{
                // sId:"57943",
                // },
                data: {sId:this.sId}
            }).then(rs=>{
                let json3=res.response.data.sj.oldData;
                let datas=[];
                for (var i = 1; i < json3.length; i++) {
                    var json = json3[i];
                    for(var k in json){

                        if(json[k]==null){
                            json[k]="";
                        }
                    }
                    datas.push(json);
                }
                this.hj=datas;
            }).catch(res=>{
                let json3=res.response.data.sj.oldData;
                let datas=[];
                for (var i = 1; i < json3.length; i++) {
                    var json = json3[i];
                    for(var k in json){

                        if(json[k]==null){
                            json[k]="";
                        }
                    }
                    datas.push(json);
                }
                this.hj=datas;
        })
        //户籍信息
       

    },

    getData20(){
        request({
                headers: {
                    'Accept': 'application/json',
                },
                url: '/social/assistance/getBZInfo',
                method: 'post',
                // data:{
                // sId:"57943",
                // },
                data: {sId:this.sId}
            }).then(rs=>{
                this.bz=res.response.data;
            }).catch(res=>{
                this.bz=res.response.data;
        })
        
    },

    getData21(){
        request({
                
                url: '/social/assistance/getBasicDataByIdCard',
                method: 'post',
                // data:{
                // sId:"57943",
                // },
                data: {sId:this.sId}
            }).then(rs=>{
                
            }).catch(res=>{
                let json3=res.response.data;
                this.info = {'ab_ex3':json3[0].ab_ex3,
                    'ab_ex85':json3[0].ab_ex85,
                    'ab_ex13':json3[0].ab_ex13,
                    'ab_ex7':json3[0].ab_ex7,
                    'ab_dat3':json3[0].ab_dat3
                    };

                let datas=[];
                let datas2=[];
                for (var i = 0; i < json3.length; i++) {
                    var json = json3[i];
                    if(json.abm_ex6=='Y'){
                        datas.push(json);
                    }else{
                        datas2.push(json);
                    }
                }
                this.tableData = datas;
                this.tableData2 = datas2;
                
        })
        
    }






 }










}
</script>
<style  scoped>
    .g-box{
        
		height: 80VH !important;
		overflow: auto !important;
    }
</style>
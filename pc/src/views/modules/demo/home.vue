<template>
    <div class="g-box2">
        
        <div class="box1">
            <!-- <div class="card_group">
               
                <div class="card"></div>
                <div class="card"></div>
                <div class="card"></div>

            </div>
            <div class="echeart_continer">
                <div class="continer_left"></div>
                <div class="continer_right">
                    <div class="echeart "></div>
                    <div class="echeart "></div>
                </div>
            </div> -->

            <el-row :gutter="24" class="card_group">
                <el-col :span="6" >
                    <el-card shadow="hover" class="card">
                    <div class="operation apply">申请业务</div>
                    <div class="operation_num">总数 <span >4399</span> <span style="color:#f44336;margin-left:20px;">-1</span> </div>
                    <div class="operation_value">
                        <span>户数 0</span>
                        <span>人数 0</span>
                        <span>退回 0</span>
                    </div>
                    </el-card>
                </el-col>
               
                <el-col :span="6">
                    <el-card shadow="hover" class="card">
                    <div class="operation apply">审批业务</div>
                    <div class="operation_num">总数 <span >4399</span>  <span style="color:#03a9f4;margin-left:20px;">+1</span></div>
                    <div class="operation_value">
                        <span>户数 0</span>
                        <span>人数 0</span>
                        <span>退回 0</span>
                    </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                   <el-card shadow="hover" class="card">
                    <div class="operation apply">变更业务</div>
                    <div class="operation_num">总数 <span >4399</span> <span style="color:#03a9f4;margin-left:20px;">+1</span></div>
                    <div class="operation_value">
                        <span>户数 0</span>
                        <span>人数 0</span>
                        <span>退回 0</span>
                    </div>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card shadow="hover" class="card">
                    <div class="operation apply">注销业务</div>
                    <div class="operation_num">总数  <span >4399</span> </div>
                    <div class="operation_value">
                        <span>户数 0</span>
                        <span>人数 0</span>
                        <span>退回 0</span>
                    </div>
                    </el-card>
                </el-col>
            </el-row>
            
            <el-row :gutter="24" style="margin-top:20px">
                <el-col :span="18">
                    <!-- <el-card shadow="always" > -->
                        <div class="EchartPractice echart">
                            <div id="main"></div>
                        </div>

                    <!-- </el-card> -->
                </el-col>
                <el-col :span="6" >
                        <el-row >
                            <el-col :span="24" >
                                <el-card shadow="hover"  class="card">
                                 <div class="EchartPractice">
                                    <div id="main2"></div>
                                </div>
                                </el-card>
                            </el-col>
                            
                        </el-row>
                        <el-row  style="margin-top:20px">
                            <el-col :span="24" >
                               <el-card shadow="hover"  class="card">
                                <!-- 1鼠标悬浮时显示 -->
                                </el-card>
                            </el-col>
                            
                        </el-row>
                </el-col>
                
            </el-row>

        </div>
       
    </div>
</template>

<script>
export default {
    name: "EchartPractice",
    data(){
        return{
            type:'bar',
            source:[
                    ['product', '户数', '人数', '在保人数'],
                    ['申请', 43.3, 85.8, 93.7],
                    ['退回', 83.1, 73.4, 55.1],
                    ['核查派单', 86.4, 65.2, 82.5],
                    ['信息核对', 72.4, 53.9, 39.1]
                ]
        }
    },
   
    methods:{
        drawChart() {
            let myEchart_bar = this.$echarts.init(document.getElementById("main"));
            let myEchart_pie = this.$echarts.init(document.getElementById("main2"));
            let option1 = {
                x: 'left', 
                title:{
                    text:"申请预警数据统计",
                    textStyle: {
                        fontSize: 16,
                        fontWeight: 'bolder',
                        color: '#333'          // 主标题文字颜色
                    },
                },
                tooltip:{},
                // 图列
                legend:{
                    // 强制设置图形为圆。
                    icon: 'circle',
                },
                dataset: {
                    // 提供一份数据。
                    source:this.source,
                    // x: 'left',   
                    // orient: 'horizontal', 
                },

                // x轴
                xAxis:{
                    // data: ["苹果","香蕉","橘子","葡萄",]
                    // 取数据第一列
                    type: 'category'
                },
                // y轴
                yAxis:{},
                
                series:[{
                    // name:'申请',
                    type:this.type,
                    // data:[50,60,45,30,]
                },{
                    type:this.type,
                    // data:[50,60,45,30,]
                },{
                    type:this.type,
                    // data:[50,60,45,30,]
                },]
            };
            
            let option2 = {
                // title:{
                //     // text:"申请预警数据统计",
                //     textStyle: {
                //         fontSize: 14,
                //         // fontWeight: 'bolder',
                //         color: '#333'          // 主标题文字颜色
                //     },
                // },
                tooltip:{},
                series:[{
                    // name:'销量',
                    type:'pie',
                    radius: '50%', 
                    data:[{
                        value:40,
                        name:'申请'
                    },{
                        value:20,
                        name:'退回'
                    },{
                        value:30,
                        name:'核查派单'
                    },{
                        value:10,
                        name:'信息核对'
                    }]
                }]
            };
            myEchart_bar.setOption(option1);
            myEchart_pie.setOption(option2);
        }
    },
    mounted() {
        this.drawChart();
    }
  }
</script>

<style scoped>
    .box1{
        /* display: flex; */
        /* flex-direction: column; */
        /* justify-content: space-between; */
        width: 99%;
        height: auto;
    }
     /* .card_group{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
     } */
    .card{
        height: 150px;
        /* background-color: #fff; */
        /* border-radius: 5px; */
    }
    .operation{
        font-size: 16px;
        color: #999;
    }
    .operation_num{
        font-size: 20px;
        /* font-weight: 600; */
        margin: 15px 0;
    }
    .operation_value{
        font-size: 16px;
        color: #999;
        display: flex;
        justify-content: space-between;
    }
    #main {
        width: 100%;
        height:300px;
        margin: auto;
        padding: 20px 20px 0;
        /* padding-top: 20px; */
    }
    #main2 {
        width: 100%;
        height:150px;
        margin: auto;
        /* margin-top: 100px */
    }
    .echart{
        height: 320px;
        background-color: #fff;
        border-radius: 4px;
    }
    /* .echeart_continer{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    } */
    /* .continer_left{
        height: 320px;
        background-color: #fff;
        border-radius: 5px;
    }
    .continer_right{
        height: 320px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .echeart{
        width: 100%;
        height: 120px;
        background-color: #fff;
        border-radius: 5px;
    } */
</style>

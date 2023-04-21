<template>
    <div class="g-box1">
        
        <div class="box1">
             <!-- <div class="searchBox">
                <el-form :inline="true" :model="searchData" class="demo-form-inline">
                    <el-form-item label="救助类型" label-width="110px"  >
                        <el-select v-model="searchData.helpType" placeholder="请选择救助类型">
                            <el-option label="低保" value="低保"></el-option>
                            <el-option label="特困" value="特困"></el-option>
                            <el-option label="单人保" value="单人保"></el-option>
                            <el-option label="低保边缘" value="低保边缘"></el-option>
                            <el-option label="支出" value="支出"></el-option>
                            <el-option label="临时" value="临时"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="年龄段" label-width="110px"  >
                        <el-select v-model="searchData.age" placeholder="请选择年龄段">
                            <el-option label="0~17岁" value="0~18岁"></el-option>
                            <el-option label="18~60岁" value="18~60岁"></el-option>
                            <el-option label="&lt;60岁" value="&lt;60岁"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="区县" label-width="110px"  >
                        <el-select v-model="searchData.address" placeholder="请选择区县">
                            <el-option label="海陵区" value="海陵区"></el-option>
                            <el-option label="高港区" value="高港区"></el-option>
                            <el-option label="姜堰区" value="姜堰区"></el-option>
                            <el-option label="兴化市" value="兴化市"></el-option>
                            <el-option label="靖江市" value="靖江市"></el-option>
                            <el-option label="泰兴市" value="泰兴市"></el-option>
                            <el-option label="医药高新区" value="医药高新区"></el-option>
                           <el-option label="民政局直属单位" value="民政局直属单位"></el-option> 
                        </el-select>
                    </el-form-item>
                    <el-form-item label="图表类型" label-width="110px"  >
                        <el-select v-model="searchData.graphics" placeholder="请选择救助类型">
                            <el-option label="柱状图" value="柱状图"></el-option>
                            <el-option label="折线图" value="折线图"></el-option>
                            <el-option label="饼图" value="饼图"></el-option>
                            <el-option label="雷达图" value="雷达图"></el-option>
                            <el-option label="散点图" value="散点图"></el-option>
                            <el-option label="仪表盘图" value="仪表盘图"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                         <div class="searchBtn">

                        <el-button  type="primary"  @click="queryListByCriteria"  @keyup.enter.native="queryListByCriteria" icon="el-icon-search">查询</el-button>
                        <el-button type="info" @click="resetQuery" icon="el-icon-refresh" > 重置</el-button >
                    </div>
                    </el-form-item>
                </el-form>-->
                <!-- <el-form>
                   
         
                </el-form> 
            </div> -->

            <!-- <el-row :gutter="24" class="card_group">
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
            </el-row> -->
            

            

            <el-row :gutter="24" style="margin-top:20px">
            
                <!-- 左 -->

                <el-col :span="12">
                    
                    <el-card shadow="always"  class="card2">
                       
                        <div class="EchartPractice echart">
                            <div id="main"></div>
                        </div>
                        <!-- <el-card shadow="hover"  class="card"> -->
                       
                   </el-card>

                </el-col>

                <!-- 右 -->
                <el-col :span="12">
                    <el-card shadow="always"  class="card">
                         <el-tabs v-model="activeName1" @tab-click="handleClick">
                            <el-tab-pane label="低保" name="1">
                            </el-tab-pane>
                            <el-tab-pane label="特困" name="2">
                            </el-tab-pane>
                            <el-tab-pane label="单人保" name="3">
                            </el-tab-pane>
                            <el-tab-pane label="低保边缘" name="4">
                            </el-tab-pane>
                            <el-tab-pane label="支出" name="5">
                            </el-tab-pane>
                        </el-tabs>
                        <div class="EchartPractice">
                            <div id="main2"></div>
                        </div>
                    <!-- </el-card> -->
                    <!-- <el-card shadow="always"  class="card > -->
                        <div class="EchartPractice" style="padding-top:20px;border-top:1px solid #999">
                            <div id="main3"></div>
                        </div>
                    </el-card>
                </el-col>

                
                
            </el-row>
            <!-- <el-row  :gutter="24" style="margin-top:20px">
                <el-col :span="12" >

                  <el-card shadow="always"  class="card" >
                        <div class="EchartPractice echart">
                            <div id="main3"></div>
                        </div>
                   </el-card>

                </el-col>
                <el-col :span="12"> 
                    <el-card shadow="always"  class="card" >
                         <el-tabs v-model="activeName2" @tab-click="handleClick2">
                            <el-tab-pane label="海陵区" name="1">
                            </el-tab-pane>
                            <el-tab-pane label="高港区" name="2">
                            </el-tab-pane>
                            <el-tab-pane label="姜堰区" name="3">
                            </el-tab-pane>
                            <el-tab-pane label="兴化市" name="4">
                            </el-tab-pane>
                            <el-tab-pane label="靖江市" name="5">
                            </el-tab-pane>
                            <el-tab-pane label="泰兴市" name="6">
                            </el-tab-pane>
                            <el-tab-pane label="医药高新区" name="7">
                            </el-tab-pane>
                        </el-tabs>
                        <div class="EchartPractice echart">
                            <div id="main4"></div>
                        </div>
                   </el-card>

                </el-col>
            </el-row> -->

        </div>
       
    </div>
</template>

<script>
export default {
    name: "EchartPractice",
    data(){
        return{
            activeName1: '1',
            activeName2: '1',
           
            type:'bar',
            searchData:{
                graphics:'',
                address:'',
                agr:'',
                helpType:'',
            },
            color:["#5470c6","#91cc75","#fac858","#ee6666",'#73c0de','#3ba272','#fc8452','#9a60b4','#ea7ccc'],
            // 
            helpType:['低保','特困','支出','单人保'],
            searchInline:{},

            // 柱状数据-bar
            source:[
                ['product', '户数', '人数', '在保人数'],
                ['申请', 43, 85, 93],
                ['退回', 83, 73, 55],
                ['核查派单', 86, 65, 82],
                ['信息核对', 72, 53, 39]
            ],

            // 折线图

            // 饼图

            // 雷达图

            // 散点图

            // 仪表盘


        }
    },
   
    methods:{

        handleClick(tab, event) {
            console.log(tab.label, event);
            this.drawChart(tab.label);
        },
       
       handleClick2(tab, event) {
            console.log(tab.label, event);
            this.drawChart(tab.label);
        },

        drawChart(key) {
            console.log(key,'图表');
            // 3 初始化
            let myEchart_bar = this.$echarts.init(document.getElementById("main"));
            let myEchart_pie = this.$echarts.init(document.getElementById("main2"));
            let myEchart_line = this.$echarts.init(document.getElementById("main3"));
            
            // 4 配置-柱状图
            let option1 = {
                x: 'left', 
                title:{
                    text:"区县救助人数统计",
                    textStyle: {
                        fontSize: 14,
                        fontWeight: 'bolder',
                        color: '#333'          // 主标题文字颜色
                    },
                },
                tooltip:{},
                color:this.color,
                // 图列
                legend:{
                    // 强制设置图形为圆。
                    // icon: 'circle',
                },

                // 提供一份数据。
                dataset: {
                    
                    source:this.source,
                    // x: 'left',   
                    // orient: 'horizontal', 
                },

                // x轴
                xAxis:{
                    data: ["海陵区","高港区","姜堰区","兴化市","靖江市","泰兴市",'医药高新区']
                    // type: 'category' //种类 // 取数据第一列
                },
                // y轴
                yAxis:{},
                
                series:[{
                    name:'救助人数',
                    type:this.type,
                    data:[1550,6650,14125,15230,6260,4355,6360]
                }
                
                ]
            };

           
            
            // 饼图配置项
            let option2 = {

                tooltip:{trigger: 'item'},
                legend:{
                    // 强制设置图形为圆。
                    icon: 'circle',
                },
                title:{
                    text:"年龄分布",
                    // 主标题文字属性
                    textStyle: {
                        fontSize: 14,
                        fontWeight: 'bolder',
                        color: '#333'          
                    },
                },
                
                stateAnimation:{
                    duration: 300,
                    easing: "cubicOut",
                },
                animation: "auto",
                animationDuration: 1000,
                color:this.color,
                animationDurationUpdate: 500,
                animationEasing: 'cubicInOut',
                animationEasingUpdate: 'cubicInOut',
                animationThreshold: 2000,
                progressiveThreshold: 3000,
                progressive: 400,
                hoverLayerThreshold: 3000,
                useUTC: false,

                
                series:[{
                    name:'人数',
                    type:'pie',
                    radius:  ['40%', '70%'],
                    // 中间的显示
                    label: {
                        // show: false,
                        // position: 'center'
                       
                        formatter: '{b}:  ({d}%)'
                   
                        
                    },
                    // labelLine: {
                    //     show: false
                    // },
                    
                    // emphasis: {
                    //     label: {
                    //     show: true,
                    //     fontSize: '40',
                    //     fontWeight: 'bold'
                    //     }
                    // },
                    data:[{
                        value:240,
                        name:'0~17岁'
                    },{
                        value:520,
                        name:'18~60岁'
                    },{
                        value:730,
                        name:'大于60岁'
                    }]
                }]
            };

            //  折线图
           let option3 = {
                title: {
                    text: '资金发放数据',
                      textStyle: {
                        fontSize: 14,
                        fontWeight: 'bolder',
                        color: '#333'          
                    },
                },
                tooltip:{
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                // 图列
                legend: {
                    data: ['海陵区','高港区','姜堰区','兴化市','靖江市','泰兴市','医药高新区'],
                },
                // legend:{
                //     // 强制设置图形为圆。
                //     icon: 'circle',
                // },
                grid: {
                    left: '2%',
                    right: '2%',
                    bottom: '8%',
                    containLabel: true
                },

                color:this.color,

                xAxis:{// x轴
                    type: 'category', //种类
                    boundaryGap: false,
                    data: ['202203','202204','202205','202206','202207','202208','202209','2022010'],
                },
                
                yAxis:{// y轴
                     type:'value'
                },
                
                series:[
                    {
                        name: '海陵区',
                        type: 'line',
                        smooth: true,
                        stack: 'Total',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data:[  6985 , 11200 , 9600 , 2650 , 3565 , 9985 , 15200 , ],
                    },
                    {
                        name: '高港区',
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data:[4650 , 4565 , 4985 , 4200 , 4600 , 5200 , 4600 ,  ],
                    },
                    {
                        name: '姜堰区',
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data:[11650 , 11565 , 12985 , 11200 , 13600 , 13200 , 13600 ,  ],
                    },
                    {
                        name: '兴化市',
                        type: 'line',
                        smooth: true,
                        stack: 'Total',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data:[11650 , 12565 , 12985 , 12200 , 12600 , 12200 , 12600 ,  ],
                    },
                    {
                        name: '靖江市',
                        type: 'line',
                        smooth: true,
                        stack: 'Total',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data:[4650 , 4565 , 4985 , 5200 ,5300 , 5200 , 5200 ,  ],
                    },
                    {
                        name: '泰兴市',
                        type: 'line',
                        smooth: true,
                        stack: 'Total',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data:[7850 , 8565 ,8985 , 8200 , 8600 , 8200 , 8600 ,  ],
                    },
                    {
                        name: '医药高新区',
                        type: 'line',
                        smooth: true,
                        stack: 'Total',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data:[1650 , 2565 , 2985 , 2200 ,2600 , 2200 , 2600 ,  ],
                    },
                ]
            };


             if(key == '特困'){
                option1.series[0].data=[2550,5650,12125,16230,7260,5355,5360];

                let value=[362,565,125];

                for(let i in value){
                    option2.series[0].data[i].value = value[i];
                }
                // option2.series[0].data[0].value=[2550,5650,12125,16230,7260,5355,5360]
            }

            // 5 赋值
            myEchart_bar.setOption(option1);
            myEchart_pie.setOption(option2);
            myEchart_line.setOption(option3);
        },

        queryListByCriteria(){
            console.log(this.searchData);
        },
        resetQuery(){
            this.searchData={
                graphics:'',
                address:'',
                agr:'',
                helpType:'',
            }
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
    .searchBox{
            padding: 20px 10px 0; 
            background-color: #fff;
    }
    .searchBtn{
            display: inline-block;
            margin-left:25px ;
    }
    .card{
        height: 740px;
        /* height: 360px; */
        /* background-color: #f5f5f5; */
        /* border-radius: 5px; */
    }
    .card2{
        height: 740px;
        /* background-color: #f5f5f5; */
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
        /* padding: 20px 20px 0; */
        /* padding-top: 20px; */
    }
    #main2 {
        width: 100%;
        height:300px;
        margin: auto;
        /* margin-top: 100px */
    }
    #main3 {
        width: 100%;
        height:300px;
        margin: auto;
        /* margin-top: 100px */
    }
    #main4 {
        width: 100%;
        height:300px;
        margin: auto;
        /* margin-top: 100px */
    }
    .echart{
        height: 320px;
        background-color: #fff;
        border-radius: 4px;
    }
    .num{
        width: 100%;
        list-style: none;
        display: flex;
        justify-content: space-around;
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

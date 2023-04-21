<template>
    <div class="g-box1">
        
        <div class="box1">
            <el-row :gutter="24" style="margin-top:20px">
            
                <!-- 左 -->

                <el-col :span="12">
                    
                    <el-card shadow="always"  class="card2">
                       
                        <div class="EchartPractice echart">
                            <div id="main" >
								</div>
                        </div>
                        <!-- <el-card shadow="hover"  class="card"> -->
                       
                   </el-card>

                </el-col>

                <!-- 右 -->
                <el-col :span="12">
                    <el-card shadow="always"  class="card2">
                         <el-tabs v-model="activeName1" @tab-click="handleClick">
                            <el-tab-pane label="低保" name="1">
                            </el-tab-pane>
                            <el-tab-pane label="特困人员" name="2">
                            </el-tab-pane>
                            <el-tab-pane label="单人保家庭" name="3">
                            </el-tab-pane>
                            <el-tab-pane label="低保边缘" name="4">
                            </el-tab-pane>
                            <el-tab-pane label="支出型困难" name="5">
                            </el-tab-pane>
                        </el-tabs>
                        <div class="EchartPractice">
                            <div id="main2"></div>
                        </div>
                        <div class="EchartPractice" style="padding-top:20px;border-top:1px solid #999">
                            <div id="main3"></div>
                        </div>
                    </el-card>
                </el-col>

                
                
            </el-row>
        </div>
       
    </div>
</template>

<script>
import request from "@/utils/request";
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

            helpType:['低保','特困人员','支出型困难','单人保家庭','低保边缘'],
            searchInline:{},		
            //柱状图五个list
			isLoadbar:false, //柱状图是否加载完成
			dataList1:[],	//低保
			dataList2:[],	//特困
			dataList3:[],	//支出贫困
			dataList4:[],	//单人保
			dataList5:[],	//低保边缘
			//救助类型
			typeOfRescue:'低保',
			//年龄分布饼状图
			isLoadPie:false,	//饼状图是否加载
			ageList:[],
			//资金发放折线图
			isLoadLine:false,	//折线图是否加载
			monthLists:[],	//资金发放的月份
			cityLists:[],	//地区
			jyDataList:[],  //姜堰
			ggDataList:[],	//高港区
			hlDataList:[],	//海陵区
			jjDataList:[],	//靖江市
			txDataList:[],	//泰兴市
			xhDataList:[],	//兴华
			yygxDataList:[],	//医药高新区
        }
    },
   created() {
	   
	   
   },
    methods:{
			//获取各区办结数据的接口
			finishList(data) {
			        return request({
			            headers: {
			                Accept: "application/json",
			            },
			            url: "/social/statisticalAnalysis/selectNumGroupByType",
			            method: "post",
			        });
			},
			//通过类型过去年龄分布
			ageGroupList(data) {
			        return request({
			            headers: {
			                Accept: "application/json",
			            },
			            url: "/social/statisticalAnalysis/selectAgeDistribution",
			            method: "post",
						data:data
			        });
			},
			//获取资金发放(本年)
			moneyGroupMonthList(data) {
			        return request({
			            headers: {
			                Accept: "application/json",
			            },
			            url: "/social/statisticalAnalysis/selectStatisticalFundRelease",
			            method: "post",
						data:data
			        });
			},
			//加载各区办结数据给图表
			getFinishList(){
				this.finishList({
					
				}).then((res)=>{
					console.log(res,'then');
				}).catch((res)=>{
					console.log("查询结果",res.response.data.data.data1)
						
						this.dataList1=res.response.data.data.data1										
						this.dataList2=res.response.data.data.data2								
						this.dataList3=res.response.data.data.data3								
						this.dataList4=res.response.data.data.data4					
						this.dataList5=res.response.data.data.data5
						this.drawChart(this.typeOfRescue)	
						this.isLoadbar=true

					
				
				})
			},
			//加载全部数据后渲染图表
			async  getAllList(val){
				this.getFinishList();
				this.getMoneyGroupMonthList(val)
				try{
					await this.ageGroupList({
						"typeOfRescue":val
					})
				}catch(e){
					const res = e.response
					if(res &&res.status === 200) {
						this.ageList = res.data.data.data	
						this.isLoadPie=true
						console.log("执行中")
						//渲染图表
						if(this.isLoadbar && this.isLoadPie &&this.isLoadLine){
							console.log("完成任务")
							this.drawChart(this.typeOfRescue)	
						}else{
							console.log("任务失败")
						}
								
					}
				}		
			},
			getMoneyGroupMonthList(val){
				this.moneyGroupMonthList({
					"typeOfRescue":val
				}).then((res)=>{
					console.log(res,'then');
				}).catch((res)=>{
					console.log("查询结果2",res.response.data.data)
					this.monthLists=res.response.data.data.monthLists
					this.cityLists=res.response.data.data.cityLists
					this.jyDataList=res.response.data.data.data0
					this.ggDataList=res.response.data.data.data1
					this.hlDataList=res.response.data.data.data2
					this.jjDataList=res.response.data.data.data3
					this.txDataList=res.response.data.data.data4
					this.xhDataList=res.response.data.data.data5
					this.yygxDataList=res.response.data.data.data6
					this.drawChart(this.typeOfRescue)	
					this.isLoadLine=true
				})	
			},
			
        handleClick(tab, event) {		
			this.typeOfRescue=tab.label
			//alert(this.typeOfRescue)
			this.getAllList(tab.label);
            console.log(tab.label, event);
            this.drawChart(tab.label);			
        },
       

        drawChart(key) {
			let myEchart_bar = this.$echarts.init(document.getElementById("main"));
            let myEchart_pie = this.$echarts.init(document.getElementById("main2"));
            let myEchart_line = this.$echarts.init(document.getElementById("main3"));
            
			//柱状图
			let option1 = {
				 title: {
					text: '各区救助户数'
				  },
				  tooltip: {
					trigger: 'axis',
					axisPointer: {
					  type: 'shadow'
					}
				  },
				  legend: {},
				  grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				  },
				  color:this.color,
				  xAxis: {
					type: 'value',
					boundaryGap: [0, 0.01]
				  },
				  yAxis: {
					type: 'category',
					data: ['姜堰区','高港区','海陵区','靖江市','泰兴市','兴化市','医药高新区',]
				  },
				  series: [
					{
					  name: '最低生活保障',
					  type: 'bar',
					  data: this.dataList1,
					},
					{
					  name: '特困供养',
					  type: 'bar',
					  data: this.dataList2,
					},
					 {
					  name: '支出贫困',
					  type: 'bar',
					  data: this.dataList3,
					},
					  {
					  name: '单人保',
					  type: 'bar',
					  data: this.dataList4,
					},
					  {
					  name: '低保边缘',
					  type: 'bar',
					  data: this.dataList5,
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
                color:this.color,   
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
             
                    data:[{
                        value:this.ageList[0],
                        name:'0~17岁'
                    },{
                        value:this.ageList[1],
                        name:'18~60岁'
                    },{
                        value:this.ageList[2],
                        name:'大于60岁'
                    }]
                }]
            };

            //  折线图
           let option3 = {
                title: {
                    text: '资金发放金额',
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
                        },
                    }
                },
                // 图列
                legend: {
                    data: this.cityLists,
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
                    data: this.monthLists,
					axisLabel: {
						interval:0,
						rotate:40
					},
                },
				//设置x轴字体倾斜
				 
                
                yAxis:{// y轴
                     type:'value'
                },
                
                series:[
                   {
                       name: '姜堰区',
                       type: 'line',
                       smooth: true,
                       stack: 'Total',
                       areaStyle: {},
                       emphasis: {
                           focus: 'series'
                       },
                       data:this.jyDataList,
                   },
                    {
                        name: '高港区',
                        type: 'line',
                        smooth: true,
                        stack: 'Total',
                        areaStyle: {},
                        emphasis: {
                            focus: 'series'
                        },
                        data:this.ggDataList,
                    },
					{
					    name: '海陵区',
					    type: 'line',
					    smooth: true,
					    stack: 'Total',
					    areaStyle: {},
					    emphasis: {
					        focus: 'series'
					    },
					    data:this.hlDataList,
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
                       data:this.jjDataList,
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
				       data:this.txDataList,
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
                        data:this.xhDataList,
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
                        data:this.yygxDataList,
                    },
                ]
            };

             if(key == '特困人员'){
                let data = {
                  bar:{
                      hl:this.hlDataList,
                      gg:this.ggDataList,
                      jy:this.jyDataList,
                      xh:this.xhDataList,
                      jj:this.jjDataList,
                      tx:this.txDataList,
                      yygx:this.yygxDataList,
                  },
                     pie:this.ageList,
                }


                option3.series[0].data = data.bar.jy;
                option3.series[1].data = data.bar.gg;
                option3.series[2].data = data.bar.hl;
                option3.series[3].data = data.bar.jj;
                option3.series[4].data = data.bar.tx;
                option3.series[5].data = data.bar.xh;
                option3.series[6].data = data.bar.yygx;

                for(let i in data.pie){
                    option2.series[0].data[i].value = data.pie[i];
				}

               
            }else if(key == '低保'){
                 let data = {
					bar:{
					   hl:this.hlDataList,
					   gg:this.ggDataList,
					   jy:this.jyDataList,
					   xh:this.xhDataList,
					   jj:this.jjDataList,
					   tx:this.txDataList,
					   yygx:this.yygxDataList,
				   },
                  pie:this.ageList,
             }
             
             
       option3.series[0].data = data.bar.jy;
       option3.series[1].data = data.bar.gg;
       option3.series[2].data = data.bar.hl;
       option3.series[3].data = data.bar.jj;
       option3.series[4].data = data.bar.tx;
       option3.series[5].data = data.bar.xh;
       option3.series[6].data = data.bar.yygx;
          
             
                for(let i in data.pie){
                    option2.series[0].data[i].value = data.pie[i];
                }

            }else if(key == '支出型困难'){

                 let data = {
           bar:{
           					   hl:this.hlDataList,
           					   gg:this.ggDataList,
           					   jy:this.jyDataList,
           					   xh:this.xhDataList,
           					   jj:this.jjDataList,
           					   tx:this.txDataList,
           					   yygx:this.yygxDataList,
           				   },
                pie:this.ageList,
           }
           
           
           option3.series[0].data = data.bar.jy;
           option3.series[1].data = data.bar.gg;
           option3.series[2].data = data.bar.hl;
           option3.series[3].data = data.bar.jj;
           option3.series[4].data = data.bar.tx;
           option3.series[5].data = data.bar.xh;
           option3.series[6].data = data.bar.yygx;

                for(let i in data.pie){
                    option2.series[0].data[i].value = data.pie[i];
                }

            }else if(key == '单人保家庭'){

                 let data = {
                  bar:{
                  					   hl:this.hlDataList,
                  					   gg:this.ggDataList,
                  					   jy:this.jyDataList,
                  					   xh:this.xhDataList,
                  					   jj:this.jjDataList,
                  					   tx:this.txDataList,
                  					   yygx:this.yygxDataList,
                  				   },
                       pie:this.ageList,
                  }
                  
                  
                  option3.series[0].data = data.bar.jy;
                  option3.series[1].data = data.bar.gg;
                  option3.series[2].data = data.bar.hl;
                  option3.series[3].data = data.bar.jj;
                  option3.series[4].data = data.bar.tx;
                  option3.series[5].data = data.bar.xh;
                  option3.series[6].data = data.bar.yygx;
                for(let i in data.pie){
                    option2.series[0].data[i].value = data.pie[i];
                }

            }else if(key == '低保边缘'){

                 let data = {
                bar:{
                					   hl:this.hlDataList,
                					   gg:this.ggDataList,
                					   jy:this.jyDataList,
                					   xh:this.xhDataList,
                					   jj:this.jjDataList,
                					   tx:this.txDataList,
                					   yygx:this.yygxDataList,
                				   },
                     pie:this.ageList,
                }
                
                
                option3.series[0].data = data.bar.jy;
                option3.series[1].data = data.bar.gg;
                option3.series[2].data = data.bar.hl;
                option3.series[3].data = data.bar.jj;
                option3.series[4].data = data.bar.tx;
                option3.series[5].data = data.bar.xh;
                option3.series[6].data = data.bar.yygx;

                for(let i in data.pie){
                    option2.series[0].data[i].value = data.pie[i];
                }

            }

            // 5 赋值
           //加载图表
            myEchart_bar.setOption(option1);
            myEchart_pie.setOption(option2);
            myEchart_line.setOption(option3);
        },

        queryListByCriteria(){
            console.log(this.searchData);
        },
    },
    mounted() {
		this.getAllList(this.typeOfRescue)
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
        /* height: 740px; */
        height: 360px;
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
        height:700px;
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

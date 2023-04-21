// 统计分析
<template>
  <div class="g-box"  >
    <div class="g-box2">
        <h2 style="text-align:center">泰州市特困低保复核工作进度表</h2>

        <!-- <div style="width:100%;height:10px;background-color:#eee"></div>
        <div id="page1" style="width:100% ;height:auto;margin:10px 0;"> 
            <el-form class="searchTj demo-form-inline" >
            
            <el-form-item label="救助类型" class="block" :inline="true">
                <el-select  v-model="value2" >
                <el-option value="低保" label="低保"></el-option>
                <el-option value="特困" label="特困"></el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item style="line-height:52px;display:inline-block;" >
                <el-button type="primary" @click="queryListByCriteria" 
                icon="el-icon-search" > 查询</el-button>
            
                <el-button type="info" @click="resetQuery" 
                icon="el-icon-refresh" > 重置</el-button >
            </el-form-item>
            
            </el-form>
        </div> -->
     <!-- <div style="width:100%;height:10px;background-color:#eee"></div> -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="低保" name="first"></el-tab-pane>
            <el-tab-pane label="特困" name="second"></el-tab-pane>
        </el-tabs>
        <div style="display:flex;justify-content: space-between;">
            <!-- <div style="display: inline-block;"> -->
            <!-- <span  width="10%">报表时间 </span> -->
            <!-- <el-date-picker  v-model="value1" type="date" :clearable='false' width='200'></el-date-picker> -->
            <!-- <span  width="15%" prop="data">{{value1}}</span> -->
            <!-- <span></span> -->
            <!-- </div> -->
            <div style="display:flex;justify-content: space-between;width:100px;">
            <el-button  icon="el-icon-folder-opened" type="text" size="mini" @click="exportExcel" >导出</el-button>
            <el-button  icon="el-icon-printer" type="text" size="mini" @click="printTable" style="width:50px;">打印</el-button>
            </div>
        </div>


         <table class="Btable tableBox" id="BtableA" border=.5 cellpadding="0" cellspacing="0" style="width:100%" v-loading="loading">
                <thead  style="text-align:center;font-size:10px">
                    <tr class="tabTime">
                        <th colspan="17" style="text-align:left">报表时间：{{value1}}</th>
                    </tr>
                    <tr class="titleColor title">
                        <th colspan="17" style="border:none;font-size:14px;text-align:center">{{tableTitle}}</th>
                    </tr>
                    <tr class="titleColor">
                        <th class="printThA5 " colspan="2" style="">区划</th>
                        <!-- <th class="printThA5" colspan="" ></th> -->
                        <th class="printThA3 " colspan="3">补录</th>
                        <th class="printThA3 " colspan="3">审核</th>
                        <th class="printThA3 " colspan="3">公示</th>

                        <th class="printThA3 " colspan="3">审批</th>
                        <th class="printThA3 " colspan="3">办结</th>
                    </tr>
                    <tr class="printThA3 titleColor" >
                        <th class="printThA2 " >区县</th>
                        <th class="printThA2 valTxt" >街道</th>
                        <th class="printThA2" >户数</th>
                        <th class="printThA2" >人数</th>
                        <th class="printThA2" >比率</th>
                        <th class="printThA2" >户数</th>
                        <th class="printThA2" >人数</th>
                        <th class="printThA2" >比率</th>
                        <th class="printThA2" >户数</th>
                        <th class="printThA2" >人数</th>
                        <th class="printThA2" >比率</th>
                        <th class="printThA2" >户数</th>
                        <th class="printThA2" >人数</th>
                        <th class="printThA2" >比率</th>
                        <th class="printThA2" >户数</th>
                        <th class="printThA2" >人数</th>
                        <th class="printThA2" >比率</th>
                    </tr>
                    <tr class="setVal" v-for="(item, index)  in tableData" :key="index" >
                        <td  class="printThA2 val"  >{{item.tj_ex1}}</td>
                        <td  class="printThA2 valTxt">{{item.tj_ex2}}</td>
                        <td  class="printThA2 val"  >{{item.tj_ex3}}</td>
                        <td  class="printThA2 val"  >{{item.tj_ex4}}</td>
                        <td  class="printThA2 val"  >{{item.tj_ex5}}</td>
                        <td  class="printThA2 val"  >{{item.tj_ex6}}</td>
                        <td  class="printThA2 val"  >{{item.tj_ex7}}</td>
                        <td  class="printThA2 val"  >{{item.tj_ex8}}</td>
                        <td  class="printThA2 val"  >{{item.tj_ex9}}</td>
                        <td  class="printThA2 val"  >{{item.tj_ex10}}</td>
                        <td  class="printThA2 val"  >{{item.tj_ex11}}</td>
                        <td  class="printThA2 val"  >{{item.tj_ex12}}</td>
                        <td  class="printThA2 val"  >{{item.tj_ex13}}</td>
                        <td  class="printThA2 val"  >{{item.tj_ex14}}</td>
                        <td  class="printThA2 val"  >{{item.tj_ex15}}</td>
                        <td  class="printThA2 val"  >{{item.tj_ex16}}</td>
                        <td  class="printThA2 val"  >{{item.tj_ex17}}</td>
                    </tr>
                </thead>
                <tbody id="type1"></tbody>
        </table>


      <!-- <el-table  class="oneTh" :data="tableData"  :stripe='true' border :height="heigth" id="mytable" show-summary  v-loading="loading">
        
        <el-table-column   :label="tableTitle" style="display:none" class="tablefirst" >
            <el-table-column prop="tj_ex1" label="区县" width="100">
            </el-table-column>
            <el-table-column prop="tj_ex2" label="街道" width="70">
            </el-table-column>
           
            <el-table-column  label="补录"  >
                <el-table-column  label="户数" prop="tj_ex3" width="70">
                </el-table-column>
                <el-table-column  label="人数" prop="tj_ex4" width="70">
                </el-table-column>
                <el-table-column  label="比率" prop="tj_ex5" width="70">
                </el-table-column>
            </el-table-column>

            <el-table-column  label="审核">
                <el-table-column  label="户数" prop="tj_ex6" width="70">
                </el-table-column>
                <el-table-column  label="人数" prop="tj_ex7" width="70">
                </el-table-column>
                 <el-table-column  label="比率" prop="tj_ex8" width="70">
                </el-table-column>
            </el-table-column>

              <el-table-column  label="公示">
                <el-table-column  label="户数" prop="tj_ex9" width="70">
                </el-table-column>
                <el-table-column  label="人数" prop="tj_ex10" width="70">
                </el-table-column>
                 <el-table-column  label="比率" prop="tj_ex11" width="70">
                </el-table-column>
            </el-table-column>

            <el-table-column  label="审批">
                <el-table-column  label="户数" prop="tj_ex12" width="70">
                </el-table-column>
                <el-table-column  label="人数" prop="tj_ex13" width="70">
                </el-table-column>
                 <el-table-column  label="比率" prop="tj_ex14" width="70">
                </el-table-column>
            </el-table-column>
            
          

            <el-table-column  label="办结">
                <el-table-column  label="户数" prop="tj_ex15" width="70">
                </el-table-column>
                <el-table-column  label="人数" prop="tj_ex16" width="70">
                </el-table-column>
                 <el-table-column  label="比率" prop="tj_ex17" width="70">
                </el-table-column>
            </el-table-column>

        </el-table-column>
                
    </el-table> -->
     
    </div>
  </div>
</template>

<script>
  import request from '@/utils/request'
  import FileSaver from "file-saver";
  import XLSX from "xlsx-style";
  import XLSX2 from "xlsx";
  export default {
    name: "QuarterlyTable",
    data() {
      return {
        value1: new Date().Format('yyyy-MM-dd'), //时间 
        value2:'低保',  //救助类型
        tableTitle:'', //表格标题
        heigth:'auto',
        isShow:true,
        loading:false,
        activeName:'first',
        tableData:[{
          tj_ex1:"兴化市",
          tj_ex2:'信息街道',
          tj_ex3:1234,
          tj_ex4:234,
          tj_ex5:42,
          tj_ex6:34,
          tj_ex7:130,
          tj_ex8:45,
          tj_ex9:1244,
          tj_ex10:42,
          tj_ex11:34,
          tj_ex12:67,
          tj_ex13:54,
          tj_ex14:10044,
          tj_ex15:67,
          tj_ex16:1874,
          tj_ex17:34,
          tj_ex18:567,
          tj_ex19:78,
          tj_ex20:324,
        },
        {
          tj_ex1:"泰兴市",
          tj_ex2:'天目山街道',
          tj_ex3:2344,
          tj_ex4:324,
          tj_ex5:34,
          tj_ex6:100,
          tj_ex7:34,
          tj_ex8:100,
          tj_ex9:34,
          tj_ex10:10044,
          tj_ex11:100,
          tj_ex12:100,
          tj_ex13:23,
          tj_ex14:100,
          tj_ex15:100,
          tj_ex16:100,
          tj_ex17:43,
          tj_ex18:100,
          tj_ex19:45,
          tj_ex20:100,
          },
        {
          tj_ex1:"泰兴市",
          tj_ex2:'天目山街道',
          tj_ex3:234,
          tj_ex4:324,
          tj_ex5:34,
          tj_ex6:10044,
          tj_ex7:34,
          tj_ex8:100,
          tj_ex9:34,
          tj_ex10:10044,
          tj_ex11:100,
          tj_ex12:100,
          tj_ex13:23,
          tj_ex14:100,
          tj_ex15:100,
          tj_ex16:100,
          tj_ex17:43,
          tj_ex18:100,
          tj_ex19:45,
          tj_ex20:100,
          },
        {
          tj_ex1:"泰兴市",
          tj_ex2:'天目山街道',
          tj_ex3:234,
          tj_ex4:324,
          tj_ex5:34,
          tj_ex6:100,
          tj_ex7:34,
          tj_ex8:100,
          tj_ex9:34,
          tj_ex10:100,
          tj_ex11:100,
          tj_ex12:100,
          tj_ex13:23,
          tj_ex14:100,
          tj_ex15:100,
          tj_ex16:100,
          tj_ex17:43,
          tj_ex18:100,
          tj_ex19:45,
          tj_ex20:100,
          },
        {
          tj_ex1:"泰兴市",
          tj_ex2:'天目山街道',
          tj_ex3:234,
          tj_ex4:324,
          tj_ex5:34,
          tj_ex6:100,
          tj_ex7:34,
          tj_ex8:100,
          tj_ex9:34,
          tj_ex10:100,
          tj_ex11:100,
          tj_ex12:100,
          tj_ex13:23,
          tj_ex14:100,
          tj_ex15:100,
          tj_ex16:100,
          tj_ex17:43,
          tj_ex18:100,
          tj_ex19:45,
          tj_ex20:100,
          },
        {
          tj_ex1:"泰兴市",
          tj_ex2:'天目山街道',
          tj_ex3:234,
          tj_ex4:324,
          tj_ex5:34,
          tj_ex6:100,
          tj_ex7:34,
          tj_ex8:100,
          tj_ex9:34,
          tj_ex10:100,
          tj_ex11:100,
          tj_ex12:100,
          tj_ex13:23,
          tj_ex14:100,
          tj_ex15:100,
          tj_ex16:100,
          tj_ex17:43,
          tj_ex18:100,
          tj_ex19:45,
          tj_ex20:100,
          },
        {
          tj_ex1:"泰兴市",
          tj_ex2:'天目山街道',
          tj_ex3:234,
          tj_ex4:324,
          tj_ex5:34,
          tj_ex6:100,
          tj_ex7:34,
          tj_ex8:100,
          tj_ex9:34,
          tj_ex10:100,
          tj_ex11:100,
          tj_ex12:100,
          tj_ex13:23,
          tj_ex14:100,
          tj_ex15:100,
          tj_ex16:100,
          tj_ex17:43,
          tj_ex18:100,
          tj_ex19:45,
          tj_ex20:100,
          },
        {
          tj_ex1:"泰兴市",
          tj_ex2:'天目山街道',
          tj_ex3:234,
          tj_ex4:324,
          tj_ex5:34,
          tj_ex6:100,
          tj_ex7:34,
          tj_ex8:100,
          tj_ex9:34,
          tj_ex10:100,
          tj_ex11:100,
          tj_ex12:100,
          tj_ex13:23,
          tj_ex14:100,
          tj_ex15:100,
          tj_ex16:100,
          tj_ex17:43,
          tj_ex18:100,
          tj_ex19:45,
          tj_ex20:100,
          },
        {
          tj_ex1:"泰兴市",
          tj_ex2:'天目山街道',
          tj_ex3:234,
          tj_ex4:324,
          tj_ex5:34,
          tj_ex6:100,
          tj_ex7:34,
          tj_ex8:100,
          tj_ex9:34,
          tj_ex10:100,
          tj_ex11:100,
          tj_ex12:100,
          tj_ex13:23,
          tj_ex14:100,
          tj_ex15:100,
          tj_ex16:100,
          tj_ex17:43,
          tj_ex18:100,
          tj_ex19:45,
          tj_ex20:100,
          },
        {
          tj_ex1:"泰兴市",
          tj_ex2:'天目山街道',
          tj_ex3:234,
          tj_ex4:324,
          tj_ex5:34,
          tj_ex6:100,
          tj_ex7:34,
          tj_ex8:100,
          tj_ex9:34,
          tj_ex10:100,
          tj_ex11:100,
          tj_ex12:100,
          tj_ex13:23,
          tj_ex14:100,
          tj_ex15:100,
          tj_ex16:100,
          tj_ex17:43,
          tj_ex18:100,
          tj_ex19:45,
          tj_ex20:100,
          },
        {
          tj_ex1:"泰兴市",
          tj_ex2:'天目山街道',
          tj_ex3:234,
          tj_ex4:324,
          tj_ex5:34,
          tj_ex6:100,
          tj_ex7:34,
          tj_ex8:100,
          tj_ex9:34,
          tj_ex10:100,
          tj_ex11:100,
          tj_ex12:100,
          tj_ex13:23,
          tj_ex14:100,
          tj_ex15:100,
          tj_ex16:100,
          tj_ex17:43,
          tj_ex18:100,
          tj_ex19:45,
          tj_ex20:100,
          },
        {
          tj_ex1:"泰兴市",
          tj_ex2:'天目山街道',
          tj_ex3:234,
          tj_ex4:324,
          tj_ex5:34,
          tj_ex6:100,
          tj_ex7:34,
          tj_ex8:100,
          tj_ex9:34,
          tj_ex10:100,
          tj_ex11:100,
          tj_ex12:100,
          tj_ex13:23,
          tj_ex14:100,
          tj_ex15:100,
          tj_ex16:100,
          tj_ex17:43,
          tj_ex18:100,
          tj_ex19:45,
          tj_ex20:100,
          },
          {
          tj_ex1:"海陵区",
          tj_ex2:'医药高新区本级',
          tj_ex3:100,
          tj_ex4:54,
          tj_ex5:100,
          tj_ex6:23,
          tj_ex7:100,
          tj_ex8:15,
          tj_ex9:100,
          tj_ex10:76,
          tj_ex11:100,
          tj_ex12:100,
          tj_ex13:56,
          tj_ex14:100,
          tj_ex15:100,
          tj_ex16:100,
          tj_ex17:100,
          tj_ex18:56,
          tj_ex19:100,
          tj_ex20:100,
          },{
          tj_ex1:"兴化市",
          tj_ex2:'信息街道',
          tj_ex3:100,
          tj_ex4:100,
          tj_ex5:100,
          tj_ex6:56,
          tj_ex7:100,
          tj_ex8:100,
          tj_ex9:56,
          tj_ex10:100,
          tj_ex11:100,
          tj_ex12:87,
          tj_ex13:100,
          tj_ex14:98,
          tj_ex15:100,
          tj_ex16:34,
          tj_ex17:100,
          tj_ex18:34,
          tj_ex19:100,
          tj_ex20:100,
        },{
          tj_ex1:"泰兴市",
          tj_ex2:'信息街道',
          tj_ex3:100,
          tj_ex4:100,
          tj_ex5:100,
          tj_ex6:100,
          tj_ex7:23,
          tj_ex8:100,
          tj_ex9:100,
          tj_ex10:234,
          tj_ex11:546,
          tj_ex12:100,
          tj_ex13:76,
          tj_ex14:100,
          tj_ex15:100,
          tj_ex16:100,
          tj_ex17:100,
          tj_ex18:234,
          tj_ex19:100,
          tj_ex20:100,
          },{
          tj_ex1:"海陵区",
          tj_ex2:'天目山街道',
          tj_ex3:100,
          tj_ex4:100,
          tj_ex5:100,
          tj_ex6:100,
          tj_ex7:34,
          tj_ex8:100,
          tj_ex9:56,
          tj_ex10:100,
          tj_ex11:67,
          tj_ex12:100,
          tj_ex13:100,
          tj_ex14:100,
          tj_ex15:100,
          tj_ex16:67,
          tj_ex17:100,
          tj_ex18:100,
          tj_ex19:100,
          tj_ex20:100,
          },{
          tj_ex1:"姜堰市",
          tj_ex2:'天目山街道',
          tj_ex3:100,
          tj_ex4:100,
          tj_ex5:67,
          tj_ex6:100,
          tj_ex7:100,
          tj_ex8:100,
          tj_ex9:100,
          tj_ex10:100,
          tj_ex11:100,
          tj_ex12:34,
          tj_ex13:100,
          tj_ex14:100,
          tj_ex15:87,
          tj_ex16:100,
          tj_ex17:23,
          tj_ex18:100,
          tj_ex19:63,
          tj_ex20:100,
          }],
        BodyTableList1:[
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'ww',remarks:'qq'},
            {typeName:'SS',amount:'SDD',remarks:'ss'},
            {typeName:'SS',amount:'ee',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'ff'},
            {typeName:'SS',amount:'SDffD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'},
            {typeName:'SS',amount:'SDD',remarks:'FF'}
        ],
        
      };
    },
    created(){
        this.loadData();
        // window.addEventListener("resize", this.watchWindowSize);
    },
    mounted(){
        this.changetype()
    //   this.watchWindowSize()
    },
    methods: {
        // 监听窗口变化
        watchWindowSize() {
        var zoomTable = document.getElementById('mytable');
        // var page1 = document.getElementById('page1');
        // 获取窗口的宽度和高度，不包括滚动条
        
        var w = document.documentElement.clientWidth;
        var h = document.documentElement.clientHeight;
        zoomTable.style.zoom = Number(w / 1920 )
        // 打印结果
        // console.log('page1=>',page1.children);
        // console.log('w=>',w);
        // console.log('h=>',h);
        // console.log("result.innerHTML = 宽: " + w + ", " + "高: " + h);
        },
    
        // 数据加载
        loadData(){
        
            console.log(this.value1);
            this.tableTitle = this.value2+'进度表'

            let tableTr=''
            // console.log(this.BodyTableList1);
            console.log(this.tableData);
            var data = this.tableData;
            var arr = [];
            // 获取种类
            for(let i in data){
                if(i>0){
                    if(data[i-1].tj_ex1 != data[i].tj_ex1){
                       var isPush = arr.some((item)=> data[i].tj_ex1==item)
                        if(!isPush){
                            arr.push(data[i].tj_ex1);
                        }
                    }
                }else{
                    arr.push(data[i].tj_ex1)
                }
            }

            // 数据分组
            var narr = [];
            for(let j in arr){
                narr[j] = data.filter(item=> item.tj_ex1==arr[j])
            }

            // 计算合计
            for(let k in narr){
                let obj = JSON.parse(JSON.stringify(narr[k][0])) 
                for(let a in obj){
                    // console.log(a,[a],a != 'tj_ex1');
                   if( a != 'tj_ex1' || a != 'tj_ex2'){
                       obj[a] = 0;
                   }
                }
                obj.tj_ex1 = narr[k][0].tj_ex1;
                obj.tj_ex2 = '合计';
                let len = narr[k].length
                for(let a in narr[k]){
                    
                    for(let b in narr[k][a]){
                            // console.log(a,[a],a != 'tj_ex1');
                        if( b != 'tj_ex1' || b != 'tj_ex2'){
                            obj[b] += narr[k][a][b];
                        }
                    }
                    obj.tj_ex1 = narr[k][0].tj_ex1;
                    obj.tj_ex2 = '合计';

                    
                    // obj.tj_ex4 += narr[k][a].tj_ex4;
                    // obj.tj_ex5 += narr[k][a].tj_ex5;
                    // obj.tj_ex6 += narr[k][a].tj_ex6;
                    if(a == len-1){
                        narr[k].unshift(obj)
                        // ()
                    }
                }
            }


            var tableData = []
            for(let i in narr){
                for(let j in narr[i]){
                    tableData.push(narr[i][j])
                }
            }


            this.tableData = tableData;
            console.log(arr);
            console.log(narr);
            
            
        },

        changetype(){
            // let rowList = document.querySelector('#BtableA')
            // let rowList1 = document.getElementById('type1')
            // let tab = document.getElementById('tab')

            var rowNode = document.getElementsByClassName('valTxt')
            // var rowNode1 = document.getElementsByTagName('td')
            // var rowList = rowNode
            // for(let item in rowNode){
            //     console.log(item.length);
            // }
            console.log(rowNode);
            for(let i in rowNode){
                if(rowNode[i].textContent=='合计'){
                    console.log(rowNode[i],i);
                    // console.log(rowNode[i].style.backgroundColor='#00c1c1',i);
                    console.log(rowNode[i].parentNode,i);
                    rowNode[i].parentNode.style.backgroundColor = '#c4f1f1';
                }
            }
            // console.log(rowNode1);
            // console.log(rowList1);
            // console.log('tab=>',tab);
            // console.log(document.querySelector('#BtableA'));
            // console.log(Array.prototype.slice.apply(rowNode));
            // console.log(Array.prototype.slice.apply(rowNode1));
        },

        handleClick(tab, event) {
            console.log(tab, event);
            this.value2 = tab.label;
            this.queryListByCriteria()
        },

        // 缩放表格滚轮
    // bigTable(i){
    //   var zoomTable = document.getElementById('mytable');
    //   var zoombox = document.getElementById('g-box2');

    //   // console.log(zoomTable.style);
    //   // console.log(i);
    //   zoomTable.style.zoom = Number(window.innerWidth / 1920 )
    //   console.log('滚轮变换宽度=>',window.innerWidth);
    //   this.zoom = window.innerWidth
    //   console.log("zoomTable.style.zoom=>",zoomTable.style.zoom);
    //   // zoomTable.style.zoom = Number(this.big / window.innerWidth)
    //   // zoombox.style.zoom = Number(window.innerWidth / this.big )

    // },

    // 查询
        queryListByCriteria(){
            this.loading = true;//加载中蒙版
            this.isShow = this.value2=='低保' ? true : false;// true展示集中，false展示分散
            this.value1 = this.value1>100000 ? this.value1.Format('yyyy-MM-dd') : this.value1

            this.loadData();
            console.log(Number(this.value1));
            // 设置定时器，30秒请求失败刷新页面
            let time = setTimeout(()=>{
            this.loading = false
            },1000)
        
            console.log(this.value1);
            console.log(this.value2);

        },
		// 重置
		resetQuery() {

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

        //定义导出Excel表格事件
        exportExcel() {
            /* 从表生成工作簿对象 */
            // let wb = XLSX2.utils.table_to_book(document.querySelector('#mytable'))
            let wb = XLSX2.utils.table_to_book(document.querySelector('#BtableA'))

           
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
                '泰州市民政局社会救助季度表.xlsx'
                )
            } catch (e) {
                if (typeof console !== 'undefined') console.log(e, wbout)
            }
            return wbout
        },

        //打印页面内容
        printTable(){

             var win = window.open('');
             // 写入
        win.document.write(`
            <html>
                <head>
                    <title>`+this.tableTitle+`打印</title>
                </head>
            
                <style>
                    .clearfix:after{
                        content: "020"; 
                        display: block; 
                        height: 0; 
                        clear: both; 
                        visibility: hidden;
                    }
                    .clearfix {
                        zoom: 1; 
                    }
                    #detailePrintStyle{
                        width:100%;
                        height: 100%;
                    }
                    .printTitleSpan{
                        width:100%;
                        margin-bottom:10px;
                    }
                    .printTitleSpan .titleContent{
                        float:left;
                        margin-right:10px;
                    }
                    .printTitleSpan .contentStyle{
                        min-width:100px;
                        padding:0 5px;
                        border-bottom:1px solid #ccc;
                    }
                    #detailePrintStyle #BtableA{
                        border:1px solid #666;
                        margin-bottom:20px;
                    }
                   
                    #detailePrintStyle #BtableA el-table__body thead tbody{
                        text-align:center;
                        font-size:0.5rem;
                        width:100%;
                        
                    }
                   .titleColor{
                        background-color:#95e3f8;
                    }
                    .tabTime{
                        display:none;
                        // 
                    }
                    .title{
                        border-top:1px solid #666;
                    }
                    th{
                        height:30px;
                        line-height:30px;
                    }
                    tr{
                        height:20px;
                        line-height:20px;
                        font-size:0.5rem;
                    }
                    .printThA1{
                        width:100px;
                    }
                    .printThA2{
                        width:85px;
                        word-break:break-all; word-wrap:break-all;
                    }
                    .printThA3{
                        width:200px;
                    }
                     .printThA5{
                        width:600px;
                    }
                    input{
                        border:none;
                        text-align:center;
                    }
                    #detailePrintStyle .inputTxt{
                        border-bottom: 1px solid #000;
                    }
                    .noPrint{
                        display: none;
                    }
                </style>
                <body>
                    <div id="detailePrintStyle">
                <!--<div class="printTitleSpan">
                    <div class="clearfix" style="width:100%">
                        <div class="titleContent">交出人：</div><div class="titleContent contentStyle">123</div>
                        <div class="titleContent">接收人：</div><div class="titleContent contentStyle">123</div>
                    </div>
                    <br>
                    <div class="clearfix" style="width:100%">
                        <div class="titleContent">交接时间：</div><div class="titleContent contentStyle">123</div>
                        <div class="titleContent">所属期间：</div><div class="titleContent contentStyle">123</div>                 
                    </div>
                </div> -->
            `);

            let wpt = document.querySelector('#BtableA');
            win.document.write(wpt.outerHTML);
            win.document.write('</div></body></html>');
            win.document.close();//在IE浏览器中使用必须添加这一句
            win.focus();//在IE浏览器中使用必须添加这一句
            win.print();
            win.close();
            // let newContent = wpt.innerHTML;
            // let oldContent = document.body.innerHTML;
            // document.body.innerHTML = newContent;
            // window.print(); //打印方法
            // // window.localtion.reload();
            // history.go(0)
            // document.body.innerHTML = oldContent;
        },
    },
}   

</script>


<style>
/* 低保特困进度表 */
.g-box {
  height: 80vh !important;
}
.g-box2 {
  width: 100%;
  height: 100%;
  overflow-y: auto !important;
}
.oneTh .el-table__header th
{
  font-size: 0.75rem;
  /* border:1px solid #333; */
}
.el-header, .el-footer {
  border-bottom: 1px solid #ddd;
  color: #333;
  text-align: center;
  line-height: 50px;
  font-size: 30px;
}
.tableBox{
    border:0;
    color:#111;
}
.tableBox tr{
    border:0.5px solid #aaa;
}
.tableBox tr:nth-child(0){
    border: none;
}
.titleColor{
    background-color:#95e3f8;
}
.searchTj .el-form-item__content{
  /* display: inline-block; */
	/* display: flex; */
  /* flex-wrap: wrap; */
  /* justify-content: space-between; */
}
.demonstration{
	font-size: 14px;
    color: #606266;
}
.block{
  display: inline-block;
  min-width: 290px;
}
.footer {
  height: 50px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  padding-top: 10px;
  text-align: right;
  padding-right: 30px;
  background: #fff;
  border-top: 1px solid #ddd;
}
 
</style>
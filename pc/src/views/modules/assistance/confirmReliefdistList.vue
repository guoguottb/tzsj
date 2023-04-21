<template>
  <div class="g-box">
    <div>
      <el-button type="primary"
                 @click="goBack">返回资金发放管理</el-button>
      <el-button type="danger"
                 @click="dialogVisible=true">资金发放管理确认信息导出</el-button>
      <el-button style="float:right"
                 v-if="ReturnToSuperior"
                 type="primary"
                 @click="confirmReliefdistList(parentSearchInfo,'upOneLevel')">返回上级</el-button>
    </div>
    <el-table :data="fomeData"
              border
              style="width: 100%; margin-top:20px;"
              height="600px"
              v-loading="loading"
              element-loading-text="正在加载数据，请稍后">
      <el-table-column label="业务名称">
        <template slot-scope="{row}">
          <p :title="row.arc_ex1"
             class="ellipsis">{{row.arc_ex1}}</p>
        </template>
      </el-table-column>
      <el-table-column label="发放机构名称"
                       width="120">
        <template slot-scope="{row}">
          <p :title="row.arc_ex9"
             class="ellipsis">{{row.arc_ex9}}</p>
        </template>
      </el-table-column>
      <el-table-column label="确认单位名称"
                       width="120">
        <template slot-scope="{row}">
          <p :title="row.arc_ex5"
             class="ellipsis">{{row.arc_ex5}}</p>
        </template>
      </el-table-column>
      <el-table-column label="发放年月"
                       width="160">
        <template slot-scope="{row}">
          <p :title="row.arc_dat2"
             class="ellipsis">{{row.arc_dat2}}</p>
        </template>
      </el-table-column>
      <el-table-column label="完成确认时间"
                       width="160">
        <template slot-scope="{row}">
          <p :title="row.arc_dat1"
             class="ellipsis">{{row.arc_dat1}}</p>
        </template>
      </el-table-column>
      <el-table-column label="发放类型">
        <template slot-scope="{row}">
          <p :title="row.arc_ex7"
             class="ellipsis">{{row.arc_ex7}}</p>
        </template>
      </el-table-column>
      <el-table-column label="发放笔数">
        <template slot-scope="{row}">
          <p :title="row.arc_ex2"
             class="ellipsis">{{row.arc_ex2}}</p>
        </template>
      </el-table-column>
      <el-table-column label="发放人数">
        <template slot-scope="{row}">
          <p :title="row.arc_ex11"
             class="ellipsis">{{row.arc_ex11}}</p>
        </template>
      </el-table-column>
      <el-table-column label="发放金额">
        <template slot-scope="{row}">
          <p :title="row.arc_ex3"
             class="ellipsis">{{row.arc_ex3}}</p>
        </template>
      </el-table-column>
      <el-table-column label="确认状态">
        <template slot-scope="{row}">
          <p :title="row.confirm"
             class="ellipsis">{{row.confirm}}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       width="180px"
                       style="text-align:center">
        <template slot-scope="scope">
          <!-- 查看发放详情 -->
          <el-button type="primary"
                     v-if="scope.row.isCunOrStreet!==2 && scope.row.confirm === '已确认'"
                     @click="viewDetails(scope.row,'next')">查看发放详情</el-button>
          <!-- <el-button type="primary"
                     v-if="['街道','镇','园区','乡','滨江新区','公司'].every( item => scope.row.arc_ex5.indexOf(item)==-1 ) && ['1',''].includes(grade)"
                     @click="next(scope.row)">查看发放详情</el-button> -->
          <!-- 如果row.isCunOrStreet 为 1/2 则可以返回上一级 -->
          <!-- <el-button type="primary"
                     v-if="scope.row.isCunOrStreet"
                     @click="last(scope.row)">返回上一级</el-button> -->
          <!-- <el-button type="primary"
                     v-else-if="['街道','镇','园区','乡','滨江新区','公司'].every( item => scope.row.arc_ex5.indexOf(item)==-1 ) && grade=='2'"
                     @click="last(scope.row)">返回上一级</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="导出提示"
               :visible.sync="dialogVisible"
               width="30%">
      <!-- <span>这是一段信息</span> -->
      <el-select v-model="type"
                 placeholder="请选择一种救助类型">
        <el-option v-for="item in names"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="exportData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "confirmReliefdistList",
  data () {
    return {
      parentSearchInfo: {},
      fomeData: [],
      arc_ex4: '',
      loading: true,
      sId: '',
      confirmationDate: '',
      grade: '',
      queryArr: [],
      loading: true,
      dialogVisible: false,
      type: '',
      names: [
        // 最低生活保障边缘 在泰州的标准名称应该是 低保边缘家庭
        { label: "农村最低生活保障", value: "农村最低生活保障" },
        { label: "城市最低生活保障", value: "城市最低生活保障" },
        { label: "特困人员供养", value: "特困人员供养" },
        { label: "单人保家庭", value: "单人保家庭" },
        { label: "低保边缘家庭", value: "最低生活保障边缘" },
        { label: "支出型困难家庭", value: "支出型困难家庭" },
        { label: "临时救助", value: "临时救助" }
      ],
      ReturnToSuperior: 0
    };
  },
  created () {
    this.loadData();
  },
  methods: {
    loadData (data, key) {
      console.log(this.$router);
      this.queryArr.push(this.$route.query);
      console.log(this.$route.query.grade);
      var charId = sessionStorage.getItem("charId").split('_')[1];
      if (this.$route.query.grade) this.grade = this.$route.query.grade;
      console.log(data, 'data');
      console.log(this.grade, 'this.grade');

      // 获取区划编码 / 账号
      if (data == undefined) {
        this.arc_ex4 = charId;
      } else {
        for (let i in this.fomeData) {
          if (key == 'last') {
            this.arc_ex4 = data.arc_ex10
          } else
            if (data.arc_ex4 == this.fomeData[i].arc_ex4) {

              this.arc_ex4 = this.fomeData[i].arc_ex4;
            }
        }
      }
      console.log(this.$route.query.confirmationDate, '年月');
      if (this.fomeData.length == 0) {

        if (this.$route.query.confirmationDate == undefined) {
          // 非总汇 sId用按钮自带id
          this.sId = this.$route.query.sId;

        } else {
          this.confirmationDate = this.$route.query.confirmationDate;
          // 总汇 sId为空
        }
      } else {
        // console.log(data);
        this.sId = data.arc_mainid;
        // 用泰州的账号看汇总确认的区级信息，继续看下一级的时候要把年月给去掉,因为后端在判断权限的时候先判断的年月
        // 如果用查看汇总按钮进入的在街道级展示返回上一级的时候要加上时间，因为返回的是大市级要看到所有的
        if (this.$route.query.confirmationDate != '' && key == 'last') {
          this.confirmationDate = this.$route.query.confirmationDate;
        } else {

          this.confirmationDate = '';
        }
      }
      this.loading = true;
      this.searchInfo = {
        sId: this.sId,
        arc_ex4: this.arc_ex4,
        confirmationDate: this.confirmationDate,
      }
      this.confirmReliefdistList(this.searchInfo, "first", this.searchInfo)
    },
    async confirmReliefdistList (Data, val) {
      try {
        await this.confirmReliefdistListApi(Data)
      } catch (error) {
        if (error && error.response.status === 200) {
          console.log(error, "confirmReliefdistList")
          // 如果点击的是查看资金详情 this.ReturnToSuperior === true 返回上一级显示
          if (val === 'next') this.ReturnToSuperior++
          if (val === 'upOneLevel') this.ReturnToSuperior--
          let tableData = error.response.data
          // 保存上一级的数据
          this.parentSearchInfo = {
            arc_ex4: tableData[0].parentArc_ex4,
            sId: tableData[0].parentSId,
            street: tableData[0].parentIsStreet
          }
          return this.fomeData = error.response.data
        }
        this.$message.error("数据获取失败")
      } finally {
        this.loading = false;
      }
    },
    // 查看村级资金发放情况
    viewVillageInfo (row) {
      console.log(row)
    },
    // 返回
    goBack () {
      this.$emit("closes", false)
      this.$router.go(-1)
      if (process.env.NODE_ENV != "development") {
        this.$router.go(-1)
      }
    },

    // 查看下一级
    viewDetails (data, val) {
      this.confirmReliefdistList({
        sId: data.arcMainId,
        street: data.arc_ex5,
        arc_ex4: data.arc_ex4,
      }, val)
    },
    // 导出数据
    exportData () {
      this.dialogVisible = false;
      this.loading = true;
      // 如果是大市账号导出区级确认信息，就进行年月格式转换
      if (this.arc_ex4 == "321200000000") {
        var arr = this.confirmationDate.split('');
        //  年月格式转换
        if (arr[4] == '-') {

        } else {
          arr[3] += '-';
        }

        this.confirmationDate = arr.join('');

        console.log(arr, '1');

        console.log(this.confirmationDate, '1');
      } else {
        //  var arr = this.confirmationDate.split('');
        console.log(this.arc_ex4, '2');
        console.log(this.confirmationDate, '2');
      }

      // return
      this.ExportData({
        // "data": JSON.stringify(this.fomeData) ,
        sId: this.sId,
        arc_ex4: this.arc_ex4,
        confirmationDate: this.confirmationDate,
        type: this.type,
      })
        .then((res) => { })
        .catch((res) => {
          if (typeof res.request === "undefined" || typeof res.response === "undefined" || res.request.status != 200) {
            console.log("请求失败了-----------------------6");
            this.$message.error("数据获取失败或请求超时");
            this.$emit("closes", false);
            this.goBack();
            return false;
          }


          let data = this.base64ToBlob("data:application/vnd.ms-excel;base64," + res.response.data);
          let blob = new Blob([data], { type: "application/vnd.ms-excel", });
          let fileName = Date.parse(new Date()) + ".xlsx";
          console.log(blob);
          this.loading = false;

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
        })



    },

    // 加载数据
    confirmReliefdistListApi (data) {
      return request({
        method: "post",
        url: "/social/assistance/confirmReliefdistList",
        data: data,
      });
    },

    // 导出
    ExportData (data) {
      return request({
        method: "post",
        url: "social/excel/exportReliefdistConfirmExcel",
        data: data,
      });
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

  },
};
</script>

<style scoped lang="less">
.g-box {
  display: flex;
  width: 100%;
  height: 80vh;
  flex-direction: column;
}
/deep/.has-gutter th {
  text-align: center !important;
}
/deep/ .el-table__row td {
  text-align: center !important;
}
</style>
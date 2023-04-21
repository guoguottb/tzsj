<template>
  <div class="HDYJBox">
    <el-dialog title="特困自理评估数据派发窗口"
               :visible.sync="isShow1"
               z-index=1999
               :before-close="handleClose">

      <!-- 特困派发 -->

      <el-button type="primary"
                 @click="addData()">新增</el-button>
      <!-- <el-divider></el-divider> -->

      <div style="max-height:520px;overflow:auto;box-sizing: border-box;">
        <el-row style="margin-top:10px"
                :span="24"
                v-for="(item,index) in this.save_info"
                :key="index">
          <el-col :span="24">
            <el-divider content-position="left">指派{{index*1+1}}</el-divider>
            <div class="block">
              <span class="demonstration"
                    style="margin-right:20px">区划选择：</span>
              <el-cascader @blur="openList"
                           width="100%"
                           placeholder="选择区划"
                           v-model="save_info[index].townArr"
                           :show-all-levels="false"
                           :props="props1"
                           style="width:90%">

              </el-cascader>

            </div>
            <!-- style="max-height:160px;overflow:auto" -->
            <!-- :options="props1" -->
            <!-- :props="{ multiple: true,lazy:true }" -->

          </el-col>
          <el-col :span="10"
                  style="margin-top:10px">
            <div class="block">
              <span class="demonstration"
                    style="margin-right:20px">人员指定：</span>
              <!-- <el-cascader @change="openList1"
                                v-model="save_info[index].jigou"
                                :show-all-levels="false"
                                placeholder="选择评估人员"
                                :options="option"
                                filterable></el-cascader> -->
              <el-select v-model="save_info[index].jigou"
                         placeholder="选择评估机构">
                <el-option v-for="(item,indexpg) in option"
                           :key="indexpg"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>

            </div>
          </el-col>

          <el-col :span="5"
                  style="margin-top:10px">

            <el-button type="danger"
                       @click="deleteData(index)">删除</el-button>

          </el-col>
        </el-row>
      </div>

      <el-row style="margin-top:20px">
        <div class="dialog-footer">
          <el-button @click="closeView">取 消</el-button>
          <el-button type="primary"
                     @click="saveHDType">确 定</el-button>
        </div>
      </el-row>

    </el-dialog>

  </div>
</template>

<script>
import request from '@/utils/request'
// import imageView from '@/views/modules/assistance/imageView'
// import upload from '@/views/modules/assistance/upload'
export default {
  name: "Tkpgpf",
  props: ["data", "isShow", 'props'],
  components: {
    // imageView,
    // upload
  },
  data () {
    return {
      isShow1: this.isShow,
      formLabelWidth: '100px',
      dialogVisible: false,
      close: false,   //关闭弹窗后重新请求数据

      save_info: [{
        townArr: [],     //街道参数
        //  usename:'',  //人名参数名
        jigou: '',       //评估机构
        index: 0,

      }],

      // 区划 
      // el-cascader懒加载
      props1: {
        multiple: true,//多选
        // checkStrictly:true,
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
            .then((res) => {
              console.log(res, "city");
            })
            .catch((res) => {
              // console.log(res);
              console.log(res, "city");
              const nodes = res.response.data;
              nodes.forEach((item) => {
                item.value = item.cs_ex2 + "#" + item.cs_ex1;
                item.label = item.cs_ex2;
                item.leaf = level >= 1; //判断是否为末尾节点，这个地方是0,1,2三级
              });

              resolve(nodes);
            });
        },
      },

      option1: [],//区划
      option: [],//评估机构
      loading: true,

    }
  },

  watch: {
    isShow1 (newS, oldS) {

      // console.log(newS,oldS,'123');
      this.isShow1 = newS;

      this.getEmit(newS);

    },


    $route: "fetchData",
  },

  created () {
    this.loadData();
  },
  methods: {

    //关闭确定 
    handleClose (done) {
      if (this.data.btnName != '查看未死亡证明') {
        this.$confirm('确认放弃操作？')
          .then(_ => {
            done();
            this.close = true; //关闭弹窗后不再重新请求数据
          })
          .catch(_ => { });

      } else {
        done();
        this.close = true;
      }
    },

    // 取消
    closeView () {
      this.isShow1 = false; //关闭核对授权书上传弹窗
      this.close = true;    //关闭弹窗后不再重新请求数据
      // getEmit()
    },


    // 子向父传值
    getEmit () {

      this.$emit('function', this.isShow1, this.close);
    },

    async loadData (index) {

      // 区划

      // 评估人
      this.getEvaluationMan({

      }).then(res => {

      }).catch(res => {
        console.log(res, 'men');
        let data = res.response.data;
        // 根据后端传递的列表进行插入选项
        if (data.length > 0) {
          for (let i in data) {
            this.option.push({ value: '', label: '' }),
              this.option[i].value = data[i].jigou;
            this.option[i].label = data[i].jigou;
            // for(let j in data[i].man){
            //     this.option[i].children.push({value:'',label:''})
            //     this.option[i].children[j].value = data[i].man[j];
            //     this.option[i].children[j].label = data[i].man[j];
            // }
          }
        }
        console.log(this.option);
      })

    },


    // 添加评估人员
    addData () {
      console.log('添加人员');
      let obj = {
        townArr: [],     //街道参数
        // usename:'',  //人名参数名
        jigou: ''    //评估机构
        // index:this.save_info.length,
      }
      this.save_info.push(obj)
      console.log(this.save_info);
    },

    //删除评估人员 
    deleteData (index) {
      console.log(index);

      // 删除指定评估人员
      for (let i in this.save_info) {
        if (i == index) {
          this.save_info.splice(i, 1)
        }
      }

      // console.log(this.save_info,'save_info');
    },

    // 保存指定对象
    saveHDType () {

      // console.log('上传保存',this.save_info);

      let data = [];

      for (let i in this.save_info) {
        let obj = {
          // usename:[],
          // 后台接受机构名称是数组形式
          jigou: [],
          ab_ex2: []
        }


        data.push(obj);
        // data[i].jigou = this.save_info[i].jigou; 
        data[i].jigou.push(this.save_info[i].jigou);
        for (let j in this.save_info[i].townArr) {

          data[i].ab_ex2.push(this.save_info[i].townArr[j][1].split('#')[0])
        }


      }

      console.log(data, 'data');
      // return false
      this.closeView();

      this.distributionEvaluationReport({
        // "ab_ex2": JSON.stringify(this.save_info.twonArr) ,
        // "usename": this.save_info.usename,

        data
      }).then((res) => {

      }).catch((res) => {
        console.log(res, 'pf');
        if (res.response.data.status == "+OK") {
          this.$message.success(res.response.data.msg)
          this.isShow1 = false;
          this.loading = false;
          // this.getEmit();
          console.log("保存成功");
        } else {
          console.log("保存失败");
          this.$message.error(res.response.data.msg)
        }
      })
    },


    openList1 (event) {

      console.log(111);
    },

    //    打开自理评估人员
    openList (event) {

    },

    // 获取自理评估人员
    getEvaluationMan (data) {
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: '/social/assistance/getEvaluationMan',
        method: 'post',
        data: data
      })
    },

    // 保存指定派发的接口 分配自理评估能力记录接口
    distributionEvaluationReport (data) {
      return request({
        headers: {
          'Accept': 'application/json',
        },
        url: '/social/assistance/distributionEvaluationReport ',
        method: 'post',
        data: data
      })
    },

  }

}
</script>

<style scoped>
.HDYJBox .el-dialog {
  width: 60%;
}
.HDYJBox .el-dialog__header {
  text-align: center;
  border-bottom: 1px solid #ddd;
}
.HDYJBox .el-dialog__body {
  padding: 20px 20px 0px;
}
.block {
  width: 100%;
  /* margin: 0 auto; */
}
.clearfix {
  text-align: center;
}
.hdTitle >>> .el-form-item__label::before {
  content: " * ";
  color: red;
}
</style>
<template>
  <div>
    <!-- <commonList sKey="576"
                :type="`残疾人补贴审核`"
                :tableName="`残疾人补贴审核`"></commonList> -->
    <el-card class="box-card">
      <div slot="header"
           class="clearfix"
           style="text-align: center">
        <span>残疾人两项补贴申请查看</span>
        <el-button style="float: right; padding: 3px 0"
                   type="text">操作按钮</el-button>
      </div>
      <el-row>
        <el-col :span="20">
          <div class="leftFather">
            <!-- 档案信息 -->
            <el-descriptions class="margin-top"
                             id="maodian"
                             style="margin-bottom:20px"
                             title="档案信息"
                             :column="3">
              <el-descriptions-item>
                <template slot="label">
                  用户名
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  手机号
                </template>
                18100000000
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  居住地
                </template>
                苏州市
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  备注
                </template>
                <el-tag size="small">学校</el-tag>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  联系地址
                </template>
                江苏省苏州市吴中区吴中大道 1188 号
              </el-descriptions-item>
            </el-descriptions>
            <!-- 基础信息 -->
            <el-descriptions class="margin-top"
                             style="margin-bottom:20px"
                             title="基础信息"
                             :column="2">
              <el-descriptions-item>
                <template slot="label">
                  姓名
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  年龄
                </template>
                18100000000
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  户籍类别
                </template>
                苏州市
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  民族
                </template>
                <el-tag size="small">学校</el-tag>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  与户主关系
                </template>
                江苏省苏州市吴中区吴中大道 1188 号
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  残疾证号
                </template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  残疾类别
                </template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  残疾等级
                </template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  户籍住址
                </template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  现住址
                </template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  家庭人口数
                </template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  伤残原因说明
                </template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  残疾人收入说明
                </template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  是否享受低保
                </template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  家庭特征
                </template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  联系电话
                </template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  行政区划
                </template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  是否属于村干部或经办人员近亲属
                </template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  求助描述
                </template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  求助原因
                </template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  求助描述
                </template>
              </el-descriptions-item>
            </el-descriptions>
            <!-- 银行信息 -->
            <el-descriptions class="margin-top"
                             style="margin-bottom:20px"
                             title="银行信息"
                             :column="2">
              <el-descriptions-item>
                <template slot="label">
                  用户名
                </template>
                kooriookami
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  手机号
                </template>
                18100000000
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  居住地
                </template>
                苏州市
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  备注
                </template>
                <el-tag size="small">学校</el-tag>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  联系地址
                </template>
                江苏省苏州市吴中区吴中大道 1188 号
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  是否提交
                </template>
                <el-tag type="danger">未提交</el-tag>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-col>
        <el-col :span="4">
          <a href="#maodian">跳转</a>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import commonList from "../../commonList"
export default {
  data () {
    return {}
  },
  created () {

  },
  methods: {

  },
  components: {
    commonList
  }
}
</script>

<style scoped lang='less'>
/deep/ .el-descriptions--mini,
.el-descriptions--small {
  font-size: 14px;
}
.leftFather {
  height: 400px;
  overflow: hidden;
  overflow-y: scroll;
}
</style>

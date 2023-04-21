<template>
  <div class="helpApply">
    <header>
      <div class="headerHead">
        <div>
          <div :class="{headerF:isShow}">监护风险</div>
          <!-- <div class="headerCircle"></div> -->
        </div>
        <div class="headerRectangle"></div>
        <div>
          <div :class="{headerF:isShow2}">生理风险</div>
          <!-- <div class="headerCircle"></div> -->
        </div>
        <div class="headerRectangle"></div>
        <div>
          <div :class="{headerF:isShow3}">行为风险</div>
          <!-- <div class="headerCircle"></div> -->
        </div>
        <div class="headerRectangle"></div>
        <div>
          <div :class="{headerF:isShow4}">评估意见</div>
          <!-- <div class="headerCircle"></div> -->
        </div>
      </div>
    </header>

    <!-- 
            ——红色一级风险：有严重行为问题，应立即介入；
                A1有任一选项或A2得分在40分以下
 
            ——黄色二级风险：有明显行为问题，宜定期介入；
                A2得分在40至59分之间
 
            ——蓝色三级风险：有轻微行为问题，可定期介入；
                A2得分在60至79分之间
 
            ——绿色四级风险：无明显行为问题，保持关注。
                A2得分在80分以上
         -->
    <van-sticky>
      <div class="pg_result"
           v-if="isShow4!=true">
        <span style="margin:10px">评估项目：
          <span v-if="page1==true"
                :class="this.colors">监护风险</span>
          <span v-if="page2==true"
                :class="this.colors">生理风险</span>
          <span v-if="page3==true"
                :class="this.colors">行为风险</span>
        </span>

        <span style="margin:10px">累积分数：
          <span v-if="page1==true"
                :class="this.colors">{{this.result[0].score}}</span>
          <span v-if="page2==true"
                :class="this.colors">{{this.result[1].score}}</span>
          <span v-if="page3==true"
                :class="this.colors">{{this.result[2].score}}</span>
        </span>

        <span style="margin:10px">评估分级：
          <span v-if="page1==true"
                :class="this.colors">{{this.result[0].grade}}</span>
          <span v-if="page2==true"
                :class="this.colors">{{this.result[1].grade}}</span>
          <span v-if="page3==true"
                :class="this.colors">{{this.result[2].grade}}</span>
        </span>
      </div>
    </van-sticky>
    <main>
      <div id="page1"
           v-show="page1"
           style="height: auto; display: block;text-align: left;">

        <div class="A1">
          <van-form @submit="next1">
            <div class="title"> A.1 强制报告事项</div>

            <van-field required
                       :name="form.forces[0].title"
                       :label="form.forces[0].title">
              <template #input>

                <van-checkbox-group v-model="whetherCheckA1[0].values">
                  <van-checkbox class="marginstyle"
                                @click="checkEvent('A1',whetherCheckA1[0].values)"
                                v-for="(item1,index1) in form.forces[0].descs"
                                :key='index1'
                                :name="item1.index"
                                shape="square">
                    {{item1.desc}} <span v-if="(item1.score>'0')">{{item1.score}}分</span></van-checkbox>
                </van-checkbox-group>

              </template>
            </van-field>

            <van-field required
                       :name="form.forces[1].title"
                       :label="form.forces[1].title">
              <template #input>
                <van-checkbox-group v-model="whetherCheckA1[1].values">
                  <van-checkbox class="marginstyle"
                                @click="checkEvent('A1',whetherCheckA1[1].values)"
                                v-for="(item1,index1) in  form.forces[1].descs"
                                :key='index1'
                                :name="item1.index"
                                shape="square">
                    {{item1.desc}} <span v-if="(item1.score>'0')">{{item1.score}}分</span></van-checkbox>
                </van-checkbox-group>
              </template>
            </van-field>

            <div class="title">A.2 监护风险评估</div>

            <!-- <div  v-for="(item ,index) in form.items" :key="index+'a2'" style="backgroundColor:#fafafa;"> -->
            <div style="backgroundColor:#fafafa;">

              <!-- <div > -->
              <div class="title1"> <span></span>{{itemsA21.title}}</div>

              <van-field required
                         v-for="(item1 ,index1) in itemsA21.subs"
                         :key="index1+'a21'"
                         :name="item1.title+':'"
                         :label="item1.title+'：'">
                <template #input>
                  <van-radio-group @change="checkEvent2('A21',index1,item1)"
                                   v-model="whetherCheckA21[index1].score">
                    <van-radio class="marginstyle"
                               v-for="(item2,index2) in item1.descs"
                               :key="index2+'a21'"
                               :name="item2.score"
                               shape="square">

                      {{item2.desc}} <span>（{{item2.score}}分）</span></van-radio>

                  </van-radio-group>
                </template>
              </van-field>

              <div class="title1"> <span></span>{{itemsA22.title}}</div>
              <van-field required
                         v-for="(item1 ,index1) in itemsA22.subs"
                         :key="index1+'a22'"
                         :name="item1.title+':'"
                         :label="item1.title+'：'">
                <template #input>
                  <van-radio-group @change="checkEvent2('A22',index1,item1)"
                                   v-model="whetherCheckA22[index1].score">
                    <van-radio class="marginstyle"
                               v-for="(item2,index2) in item1.descs"
                               :key="index2+'a22'"
                               :name="item2.score"
                               shape="square">

                      {{item2.desc}} <span>（{{item2.score}}分）</span></van-radio>

                  </van-radio-group>
                </template>
              </van-field>

              <div class="title1"> <span></span>{{itemsA23.title}}</div>
              <van-field required
                         v-for="(item1 ,index1) in itemsA23.subs"
                         :key="index1+'a23'"
                         :name="item1.title+':'"
                         :label="item1.title+'：'">
                <template #input>
                  <van-radio-group @change="checkEvent2('A23',index1,item1)"
                                   v-model="whetherCheckA23[index1].score">
                    <van-radio class="marginstyle"
                               v-for="(item2,index2) in item1.descs"
                               :key="index2+'a23'"
                               :name="item2.score"
                               shape="square">

                      {{item2.desc}} <span>（{{item2.score}}分）</span></van-radio>

                  </van-radio-group>
                </template>
              </van-field>
              <!-- </div> -->
            </div>

          </van-form>
        </div>

        <van-button type="info"
                    style="width: 100%;"
                    @click="next1">下一步</van-button>

      </div>

      <div id="page2"
           v-show="page2"
           style="display: block;padding-top: 10px;">
        <div>
          <van-form @submit="next2">
            <div class="title"> B.1 强制报告事项</div>

            <van-field required
                       :name="form2.forces[0].title"
                       :label="form2.forces[0].title">
              <template #input>

                <van-checkbox-group v-model="whetherCheckB1[0].values">
                  <van-checkbox class="marginstyle"
                                @click="checkEvent('B1',whetherCheckB1[0].values)"
                                v-for="(item1,index1) in form2.forces[0].descs"
                                :key='index1'
                                :name="item1.index"
                                shape="square">
                    {{item1.desc}} <span v-if="(item1.score>'0')">{{item1.score}}分</span></van-checkbox>
                </van-checkbox-group>

              </template>
            </van-field>

            <van-field required
                       :name="form2.forces[1].title"
                       :label="form2.forces[1].title">
              <template #input>
                <van-checkbox-group v-model="whetherCheckB1[1].values">
                  <van-checkbox class="marginstyle"
                                @click="checkEvent('B1',whetherCheckB1[1].values)"
                                v-for="(item1,index1) in  form2.forces[1].descs"
                                :key='index1'
                                :name="item1.index"
                                shape="square">
                    {{item1.desc}} <span v-if="(item1.score>'0')">{{item1.score}}分</span></van-checkbox>
                </van-checkbox-group>
              </template>
            </van-field>

            <div class="title">B.2 生理风险评估</div>

            <!-- <div  v-for="(item ,index) in form2.items" :key="index+'C21'" style="backgroundColor:#fafafa;"> -->
            <div style="backgroundColor:#fafafa;">

              <div class="title1"><span></span>{{itemsB21.title}}</div>
              <van-field required
                         v-for="(item1 ,index1) in itemsB21.subs"
                         :key="index1+'b21'"
                         :name="item1.title+':'"
                         :label="item1.title+'：'">
                <template #input>
                  <van-radio-group @change="checkEvent2('B21',index1,item1)"
                                   v-model="whetherCheckB21[index1].score">
                    <van-radio class="marginstyle"
                               v-for="(item2,index2) in item1.descs"
                               :key="index2+'b21'"
                               :name="item2.score"
                               shape="square">
                      {{item2.desc}}<span>（{{item2.score}}分）</span>
                    </van-radio>
                  </van-radio-group>
                </template>
              </van-field>

              <div class="title1"><span></span>{{itemsB22.title}}</div>
              <van-field required
                         v-for="(item1 ,index1) in itemsB22.subs"
                         :key="index1+'b22'"
                         :name="item1.title+':'"
                         :label="item1.title+'：'">
                <template #input>
                  <van-radio-group @change="checkEvent2('B22',index1,item1)"
                                   v-model="whetherCheckB22[index1].score">
                    <van-radio class="marginstyle"
                               v-for="(item2,index2) in item1.descs"
                               :key="index2+'b22'"
                               :name="item2.score"
                               shape="square">
                      {{item2.desc}}<span>（{{item2.score}}分）</span>
                    </van-radio>
                  </van-radio-group>
                </template>
              </van-field>

              <div class="title1"><span></span>{{itemsB23.title}}</div>
              <van-field required
                         v-for="(item1 ,index1) in itemsB23.subs"
                         :key="index1+'b23'"
                         :name="item1.title+':'"
                         :label="item1.title+'：'">
                <template #input>
                  <van-radio-group @change="checkEvent2('B23',index1,item1)"
                                   v-model="whetherCheckB23[index1].score">
                    <van-radio class="marginstyle"
                               v-for="(item2,index2) in item1.descs"
                               :key="index2+'b23'"
                               :name="item2.score"
                               shape="square">
                      {{item2.desc}}<span>（{{item2.score}}分）</span>
                    </van-radio>
                  </van-radio-group>
                </template>
              </van-field>

              <div class="title1"><span></span>{{itemsB24.title}}</div>
              <van-field required
                         v-for="(item1 ,index1) in itemsB24.subs"
                         :key="index1+'b24'"
                         :name="item1.title+':'"
                         :label="item1.title+'：'">
                <template #input>
                  <van-radio-group @change="checkEvent2('B24',index1,item1)"
                                   v-model="whetherCheckB24[index1].score">
                    <van-radio class="marginstyle"
                               v-for="(item2,index2) in item1.descs"
                               :key="index2+'b24'"
                               :name="item2.score"
                               shape="square">
                      {{item2.desc}}<span>（{{item2.score}}分）</span>
                    </van-radio>
                  </van-radio-group>
                </template>
              </van-field>

              <div class="title1"><span></span>{{itemsB25.title}}</div>
              <van-field required
                         v-for="(item1 ,index1) in itemsB25.subs"
                         :key="index1+'b25'"
                         :name="item1.title+':'"
                         :label="item1.title+'：'">
                <template #input>
                  <van-radio-group @change="checkEvent2('B25',index1,item1)"
                                   v-model="whetherCheckB25[index1].score">
                    <van-radio class="marginstyle"
                               v-for="(item2,index2) in item1.descs"
                               :key="index2+'b25'"
                               :name="item2.score"
                               shape="square">
                      {{item2.desc}}<span>（{{item2.score}}分）</span>
                    </van-radio>
                  </van-radio-group>
                </template>
              </van-field>

            </div>

          </van-form>

          <div style="margin: 16px 0 16px 0;display: flex;justify-content: space-around;">
            <van-button block
                        native-type="button"
                        @click="back2">上一步</van-button>
            <van-button block
                        type="info"
                        native-type="button"
                        @click="next2">下一步</van-button>
          </div>

        </div>
      </div>

      <div id="page3"
           v-show="page3"
           style="display: none;">
        <div>
          <van-form @submit="next3">
            <div class="title"> C.1 强制报告事项</div>

            <van-field required
                       :name="form3.forces[0].title"
                       :label="form3.forces[0].title">
              <template #input>

                <van-checkbox-group v-model="whetherCheckC1[0].values">
                  <van-checkbox class="marginstyle"
                                @click="checkEvent('C1',whetherCheckC1[0].values)"
                                v-for="(item1,index1) in form3.forces[0].descs"
                                :key='index1'
                                :name="item1.index"
                                shape="square">
                    {{item1.desc}} <span v-if="(item1.score>'0')">{{item1.score}}分</span></van-checkbox>
                </van-checkbox-group>

              </template>
            </van-field>

            <van-field required
                       :name="form3.forces[1].title"
                       :label="form3.forces[1].title">
              <template #input>
                <van-checkbox-group v-model="whetherCheckC1[1].values">
                  <van-checkbox class="marginstyle"
                                @click="checkEvent('C1',whetherCheckC1[1].values)"
                                v-for="(item1,index1) in  form3.forces[1].descs"
                                :key='index1'
                                :name="item1.index"
                                shape="square">
                    {{item1.desc}} <span v-if="(item1.score>'0')">{{item1.score}}分</span></van-checkbox>
                </van-checkbox-group>
              </template>
            </van-field>

            <!-- 一级标题 -->
            <div class="title">C.2 行为风险评估</div>

            <!-- <div  v-for="(item ,index) in form3.items" :key="index+'c2'" style="backgroundColor:#fafafa;"> -->
            <div style="backgroundColor:#fafafa;">

              <!-- 二级标题 -->
              <div class="title1"> <span></span>{{itemsC21.title}}</div>
              <!-- 评估项 -->
              <van-field required
                         v-for="(item1 ,index1) in itemsC21.subs"
                         :key="index1+'c21'"
                         :name="item1.title+':'"
                         :label="item1.title+'：'">
                <template #input>
                  <van-radio-group @change="checkEvent2('C21',index1,item1)"
                                   v-model="whetherCheckC21[index1].score">
                    <van-radio class="marginstyle"
                               v-for="(item2,index2) in item1.descs"
                               :key="index2+'c21'"
                               :name="item2.score"
                               shape="square">
                      {{item2.desc}} <span>（{{item2.score}}分）</span></van-radio>

                  </van-radio-group>
                </template>
              </van-field>

              <!-- 二级标题 -->
              <div class="title1"> <span></span>{{itemsC22.title}}</div>
              <!-- 评估项 -->
              <van-field required
                         v-for="(item1 ,index1) in itemsC22.subs"
                         :key="index1+'c22'"
                         :name="item1.title+':'"
                         :label="item1.title+'：'">
                <template #input>
                  <van-radio-group @change="checkEvent2('C22',index1,item1)"
                                   v-model="whetherCheckC22[index1].score">
                    <van-radio class="marginstyle"
                               v-for="(item2,index2) in item1.descs"
                               :key="index2+'c22'"
                               :name="item2.score"
                               shape="square">
                      {{item2.desc}} <span>（{{item2.score}}分）</span></van-radio>

                  </van-radio-group>
                </template>
              </van-field>

              <!-- 二级标题 -->
              <div class="title1"> <span></span>{{itemsC23.title}}</div>
              <!-- 评估项 -->
              <van-field required
                         v-for="(item1 ,index1) in itemsC23.subs"
                         :key="index1+'c23'"
                         :name="item1.title+':'"
                         :label="item1.title+'：'">
                <template #input>
                  <van-radio-group @change="checkEvent2('C23',index1,item1)"
                                   v-model="whetherCheckC23[index1].score">
                    <van-radio class="marginstyle"
                               v-for="(item2,index2) in item1.descs"
                               :key="index2+'c23'"
                               :name="item2.score"
                               shape="square">
                      {{item2.desc}} <span>（{{item2.score}}分）</span></van-radio>

                  </van-radio-group>
                </template>
              </van-field>

              <!-- 二级标题 -->
              <div class="title1"> <span></span>{{itemsC24.title}}</div>
              <!-- 评估项 -->
              <van-field required
                         v-for="(item1 ,index1) in itemsC24.subs"
                         :key="index1+'c24'"
                         :name="item1.title+':'"
                         :label="item1.title+'：'">
                <template #input>
                  <van-radio-group @change="checkEvent2('C24',index1,item1)"
                                   v-model="whetherCheckC24[index1].score">
                    <van-radio class="marginstyle"
                               v-for="(item2,index2) in item1.descs"
                               :key="index2+'c24'"
                               :name="item2.score"
                               shape="square">
                      {{item2.desc}} <span>（{{item2.score}}分）</span></van-radio>

                  </van-radio-group>
                </template>
              </van-field>

              <!-- 二级标题 -->
              <div class="title1"> <span></span>{{itemsC25.title}}</div>
              <!-- 评估项 -->
              <van-field required
                         v-for="(item1 ,index1) in itemsC25.subs"
                         :key="index1+'c25'"
                         :name="item1.title+':'"
                         :label="item1.title+'：'">
                <template #input>
                  <van-radio-group @change="checkEvent2('C25',index1,item1)"
                                   v-model="whetherCheckC25[index1].score">
                    <van-radio class="marginstyle"
                               v-for="(item2,index2) in item1.descs"
                               :key="index2+'c25'"
                               :name="item2.score"
                               shape="square">
                      {{item2.desc}} <span>（{{item2.score}}分）</span></van-radio>

                  </van-radio-group>
                </template>
              </van-field>

            </div>
          </van-form>
          <div style="margin-top: 20px;display: flex;justify-content: space-around;">
            <van-button block
                        native-type="button"
                        @click="back3">上一步</van-button>
            <van-button block
                        type="info"
                        @click="next3">下一步</van-button>
          </div>
        </div>
      </div>
      <div id="page4"
           v-show="page4"
           style="display: block;margin: 50px 0; ">
        <div>
          <van-form @submit="next4">
            <!-- <div class="title"> 评估建议及意见</div> -->
            <div class="title_bg"> <span></span>困境现状</div>
            <van-field v-model="dilemmaSituation"
                       rows="3"
                       autosize
                       type="textarea"
                       maxlength="500"
                       placeholder="请输入困境现状"
                       show-word-limit />

            <div class="title_bg"> <span>困境成因</span></div>
            <van-field v-model="causeOfDilemma"
                       rows="3"
                       autosize
                       label=""
                       type="textarea"
                       maxlength="500"
                       placeholder="请输入困境成因"
                       show-word-limit />

            <div class="title_bg"> <span>服务建议</span></div>
            <van-field v-model="serviceSuggestion"
                       rows="3"
                       autosize
                       label=""
                       type="textarea"
                       maxlength="500"
                       placeholder="请输入服务建议"
                       show-word-limit />

            <div class="title_bg"> <span>评估机构对困境儿童做出评估意见</span></div>
            <van-field v-model="assessmentScore"
                       number
                       label="评估得分:"
                       placeholder="请输入评估得分" />

            <van-field label="其他（特殊说明）:"
                       label-width="150px">
              <template #input>
                <van-radio-group @change="checkEvent3"
                                 direction="horizontal"
                                 v-model="whetherSpecial">
                  <van-radio class="marginstyle"
                             name="false"
                             shape="square"><span>无</span></van-radio>
                  <van-radio class="marginstyle"
                             name="true"
                             shape="square"><span>有</span></van-radio>
                </van-radio-group>
              </template>
            </van-field>

            <van-field v-if="whetherSpecial=='true'"
                       v-model="specialCase"
                       rows="3"
                       autosize
                       label="特殊说明:"
                       type="textarea"
                       maxlength="500"
                       placeholder="请输入特殊说明"
                       show-word-limit />

            <van-field v-model="evaluationAgencyOpinion"
                       rows="3"
                       autosize
                       label="评估意见:"
                       type="textarea"
                       maxlength="500"
                       placeholder="请输入评估意见"
                       show-word-limit />
            <!-- <van-field v-model="pgName" label="评估员:" placeholder="请输入评估员姓名" />
						
						<van-field :value='date1' clickable @click="showTime = true" readonly  name="date1" label="评估时间"/> -->

            <!-- <van-popup v-model="showTime" readonly position="bottom">
							<van-datetime-picker v-model="time1" type="datetime" @confirm="optionEvent($event,'评估时间')" @cancel="showTime = false" />
						</van-popup> -->

            <div class="title_bg"> <span>评估机构负责人审核意见</span></div>
            <van-field v-model="evaluationAgencyHeadOpinion"
                       rows="3"
                       autosize
                       label="审核意见"
                       type="textarea"
                       maxlength="500"
                       placeholder="请输入审核意见"
                       show-word-limit />
            <!-- <van-field v-model="fzrName" label="负责人:" placeholder="请输入负责人姓名" />
						<van-field :value='date2' clickable @click="showTime = true" readonly  name="date2" label="审批时间"/> -->

          </van-form>
          <div style="width:100%;position: fixed;left:10;bottom: 0px;display: flex;justify-content: space-around;">

            <van-button block
                        native-type="button"
                        @click="back4">上一步</van-button>
            <van-button block
                        type="info"
                        @click="next4">提交</van-button>
          </div>
        </div>
      </div>

    </main>
    <footer>
    </footer>
  </div>

</template>
 
<script>
import {
  getNewEvaluateRecordApi, // 获取最新的四色评估记录(新接口)
  saveAloneEvaluateRecordApi, // 单独保存四色评估记录(新接口)
} from "@/api/dilemmaChild.js"
import request from '@/utils/request.js'
import { compressImg, tszfValidate, tszfFilter, tszfFilter2, getAge, getBirthday, getSex, xzqh, } from '@/utils/utils.js'
export default {
  data () {
    return {

      // message1:'',	//困境现状
      // message2:'',	//困境成因
      // message3:'',	//服务建议
      // message4:'',	//评估意见
      // message5:'',	//审批意见
      // pgName:'',		//评估员姓名
      // fzrName:'',		//负责人姓名
      // otherThing:'无',	//有无其他情况
      // otherThingMsg:'',	//其他情况说明
      // value:'',		//评估得分
      // date1:'',		//评估时间
      // date2:'',		//审批时间

      dilemmaSituation: '',//困境现状
      causeOfDilemma: '',//困境成因
      serviceSuggestion: '',//服务建议
      assessmentScore: '',//评估得分
      whetherSpecial: '',//有无其他情况
      specialCase: '',//其他情况说明
      evaluationAgencyOpinion: '',//评估意见
      evaluationAgencyHeadOpinion: '',//审批意见



      // showTime:false,

      // 评估结果
      result: [
        {
          score: '0',
          grade: '',
        },
        {
          score: '0',
          grade: '',
        },
        {
          score: '0',
          grade: '',
        },
      ],

      taskSubId: this.$route.query.taskSubId, //评估任务ID
      recordId: this.$route.query.recordId,	//评估记录ID

      isShow: true,
      isShow2: false,
      isShow3: false,
      isShow4: false,

      page1: true,
      page2: false,
      page3: false,
      page4: false,

      rules: {
        rules1: [
          {
            required: true,
            message: '请选择申请方式',
            trigger: 'onBlur'
          }
        ],
        rules2: [
          {
            required: true,
            message: '请填写姓名',
            trigger: 'onBlur',

          }
        ],
        rules3: [
          {
            required: true,
            message: '请填写身份证号',
            trigger: 'onBlur'
          }
        ],
        rules4: [
          {
            required: true,
            message: '请选择行政区划',
            trigger: 'onBlur'
          }
        ],
        rules5: [
          {
            required: true,
            message: '请填写家庭住址',
            trigger: 'onBlur'
          }
        ],
        rules6: [
          {
            required: true,
            message: '请填写家庭人口',
            trigger: 'onBlur'
          }
        ],
        rules7: [
          {
            required: true,
            message: '请选择户籍性质',
            trigger: 'onBlur'
          }
        ],
        rules8: [
          {
            required: true,
            message: '请填写联系电话',
            trigger: 'onBlur'
          }
        ],
        rules9: [
          {
            required: true,
            message: '请填写求助描述',
            trigger: 'onBlur'
          }
        ],
        rules10: [
          {
            required: true,
            message: '请选择求助原因',
            trigger: 'onBlur'
          }
        ],
        rules11: [
          {
            required: true,
            message: '请选择求助类别',
            trigger: 'onBlur'
          }
        ],

      },

      // 监护风险评估表-强制报告项
      whetherCheckA1: [
        { values: [] },
        { values: [] }
      ],
      // 如果从困境儿童上门核查过来 数据回显的返回值
      getDataInfo: {},
      // 分数项
      whetherCheckA21: [],
      whetherCheckA22: [],
      whetherCheckA23: [],
      colors: 'redFont',
      // 监护风险评估
      form: {
        forces: [{
          "descs": [{
            "desc": "监护人不履行监护职责3个月以上",
            "score": 0,
            index: 0,
            "whetherCheck": true
          }, {
            "desc": "抚养人为失能半失能老人、无民事行为能力人",
            "score": 0,
            index: 1,
            "whetherCheck": false
          }, {
            "desc": "抚养人为限制民事行为能力人，儿童在八周岁以下或异性儿童在十四周岁以下",
            "score": 0,
            index: 2,
            "whetherCheck": true
          }, {
            "desc": "监护人或扶养人侵害儿童身心健康或侵犯儿童合法权益",
            "score": 0,
            index: 3,
            "whetherCheck": false
          }, {
            "desc": "监护人不依法履行监护职责或履职不当致使未成年人涉嫌违法犯罪或遭受犯罪行为侵害",
            "score": 0,
            index: 4,
            "whetherCheck": false
          }, {
            "desc": "流浪儿童",
            "score": 0,
            index: 5,
            "whetherCheck": false
          }],
          "title": "家庭监护"
        }, {
          "descs": [{
            "desc": "无户籍",
            "score": 0,
            index: 0,
            "whetherCheck": false
          }, {
            "desc": "无监护人",
            "score": 0,
            index: 1,
            "whetherCheck": false
          }],
          "title": "国家监护"
        }],

      },
      itemsA21: {
        "subs": [{
          "title": "年龄",
          "descs": [{
            "desc": "60周以下",
            "score": 8,
            "whetherCheck": false
          }, {
            "desc": "60周岁至70周岁",
            "score": 6,
            "whetherCheck": false
          }, {
            "desc": "70周岁至80周岁",
            "score": 4,
            "whetherCheck": false
          }, {
            "desc": "80周岁及以上",
            "score": 2,
            "whetherCheck": false
          }]
        }, {
          "title": "受教育程度",
          "descs": [{
            "desc": "本科及以上",
            "score": 8,
            "whetherCheck": false
          }, {
            "desc": "大专",
            "score": 6,
            "whetherCheck": false
          }, {
            "desc": "高中及中专",
            "score": 4,
            "whetherCheck": false
          }, {
            "desc": "初中及以下",
            "score": 2,
            "whetherCheck": false
          }]
        }, {
          "title": "身体健康状况",
          "descs": [{
            "desc": "身体健康",
            "score": 8,
            "whetherCheck": false
          }, {
            "desc": "有慢性病",
            "score": 6,
            "whetherCheck": false
          }, {
            "desc": "三级四级视力听力言语肢体残疾",
            "score": 4,
            "whetherCheck": false
          }, {
            "desc": "一级二级视力听力言语肢体残疾、三级四级智力精神残疾、严重疾病",
            "score": 2,
            "whetherCheck": false
          }]
        }, {
          "title": "心理健康情况",
          "descs": [{
            "desc": "心理健康",
            "score": 6,
            "whetherCheck": false
          }, {
            "desc": "心理亚健康",
            "score": 3,
            "whetherCheck": false
          }, {
            "desc": "心理病态",
            "score": 0,
            "whetherCheck": false
          }]
        }, {
          "title": "监护意识",
          "descs": [{
            "desc": "全面履行监护职责",
            "score": 9,
            "whetherCheck": false
          }, {
            "desc": "能照顾儿童基本生活",
            "score": 6,
            "whetherCheck": false
          }, {
            "desc": "怠于履行监护职责",
            "score": 3,
            "whetherCheck": false
          }, {
            "desc": "不履行监护职责",
            "score": 0,
            "whetherCheck": false
          }]
        }, {
          "title": "遵纪守法",
          "descs": [{
            "desc": "无任何犯罪记录",
            "score": 6,
            "whetherCheck": false
          }, {
            "desc": "有吸毒、酗酒、赌博等恶习",
            "score": 2,
            "whetherCheck": false
          }, {
            "desc": "有犯罪记录",
            "score": 1,
            "whetherCheck": false
          }]
        }],
        "title": "监护人情况"
      },

      itemsA22: {
        "subs": [{
          "title": "经济收入",
          "descs": [{
            "desc": "达到当地城乡居民人均收入水平以上",
            "score": 5,
            "whetherCheck": false
          }, {
            "desc": "达到当地城乡居民人均消费入水平以上",
            "score": 3,
            "whetherCheck": false
          }, {
            "desc": "低收入家庭",
            "score": 1,
            "whetherCheck": false
          }]
        }, {
          "title": "夫妻关系",
          "descs": [{
            "desc": "关系和睦",
            "score": 10,
            "whetherCheck": false
          }, {
            "desc": "偶有争吵",
            "score": 9,
            "whetherCheck": false
          }, {
            "desc": "关系紧张、经常争吵",
            "score": 6,
            "whetherCheck": false
          }, {
            "desc": "离婚1次或单身",
            "score": 4,
            "whetherCheck": false
          }, {
            "desc": "离婚2次以上",
            "score": 2,
            "whetherCheck": false
          }]
        }, {
          "title": "亲子关系",
          "descs": [{
            "desc": "关系和谐",
            "score": 10,
            "whetherCheck": false
          }, {
            "desc": "关系一般",
            "score": 6,
            "whetherCheck": false
          }, {
            "desc": "关系紧张",
            "score": 2,
            "whetherCheck": false
          }]
        }],
        "title": "家庭状况"
      },

      itemsA23: {
        "subs": [{
          "title": "亲属支持",
          "descs": [{
            "desc": "经常往来",
            "score": 10,
            "whetherCheck": false
          }, {
            "desc": "偶有往来",
            "score": 8,
            "whetherCheck": false
          }, {
            "desc": "几乎不往来",
            "score": 4,
            "whetherCheck": false
          }]
        }, {
          "title": "邻里支持",
          "descs": [{
            "desc": "邻里关系友善",
            "score": 10,
            "whetherCheck": false
          }, {
            "desc": "邻里关系一般",
            "score": 8,
            "whetherCheck": false
          }, {
            "desc": "几乎不往来",
            "score": 4,
            "whetherCheck": false
          }]
        }, {
          "title": "生活环境",
          "descs": [{
            "desc": "环境好，经常参加政府、社区、学校、公益机构、组织的各类服务活动",
            "score": 10,
            "whetherCheck": false
          }, {
            "desc": "环境较好，偶有参加政府、社区、学校、公益机构、组织的各类服务活动",
            "score": 8,
            "whetherCheck": false
          }, {
            "desc": "环境一般，不参加各类服务活动",
            "score": 4,
            "whetherCheck": false
          }]
        }],
        "title": "社会支持"
      },

      // 生理风险评估表-强制报告项
      whetherCheckB1: [
        { values: [] },
        { values: [] }
      ],

      // 分数项
      whetherCheckB21: [],
      whetherCheckB22: [],
      whetherCheckB23: [],
      whetherCheckB24: [],
      whetherCheckB25: [],
      // 生理风险评估
      form2: {
        "forces": [
          {
            "descs": [{
              "desc": "重病儿童，但未享受政策保障或被截留、侵吞",
              "score": 0,
              index: 0,
            }, {
              "desc": "重病或长期患病儿童，家庭消极治疗、迟缓送医致使儿童面临危险境地",
              "score": 0,
              index: 1,
            }, {
              "desc": "体重过轻或严重营养不良、发育迟缓",
              "score": 0,
              index: 2,
            }, {
              "desc": "其他生理因素原因产生风险的儿童",
              "score": 0,
              index: 3,
            }],
            "title": "疾病"
          }, {
            "descs": [{
              "desc": "重残儿童，但未享受政策保障或被截留、侵吞",
              "score": 0,
              index: 0,
            }, {
              "desc": "重残儿童，家庭消极康复致使儿童面临危险境地",
              "score": 0,
              index: 1,
            }],
            "title": "残疾"
          }],
      },
      itemsB21: {
        "subs": [{
          "title": "年龄",
          "descs": [{
            "desc": "6周岁（含）至18周岁以下",
            "score": 8,
            "whetherCheck": false
          }, {
            "desc": "3周岁至6周岁",
            "score": 6,
            "whetherCheck": false
          }, {
            "desc": "3周岁以下",
            "score": 4,
            "whetherCheck": false
          }]
        }, {
          "title": "发育状况",
          "descs": [{
            "desc": "营养状况良好，发育良好",
            "score": 6,
            "whetherCheck": false
          }, {
            "desc": "营养状况一般，发育正常",
            "score": 4,
            "whetherCheck": false
          }, {
            "desc": "营养状况差，有发育迟缓情况",
            "score": 2,
            "whetherCheck": false
          }]
        }, {
          "title": "卫生状况",
          "descs": [{
            "desc": "卫生状况良好",
            "score": 6,
            "whetherCheck": false
          }, {
            "desc": "卫生状况一般",
            "score": 4,
            "whetherCheck": false
          }, {
            "desc": "卫生状况差",
            "score": 1,
            "whetherCheck": false
          }]
        },
          // {
          // 	"title": "残疾等级",
          // 	"descs": [{
          // 		"desc": "身体正常",
          // 		"score": 20,
          // 		"whetherCheck": false
          // 	}, {
          // 		"desc": "基本正常",
          // 		"score": 16,
          // 		"whetherCheck": false
          // 	}, {
          // 		"desc": "四级视力残疾，三级四级听力言语残疾，四级肢体残疾",
          // 		"score": 10,
          // 		"whetherCheck": false
          // 	}, {
          // 		"desc": "二级三级视力残疾，一级二级听力言语残疾，三级肢体残疾",
          // 		"score": 5,
          // 		"whetherCheck": false
          // 	}, {
          // 		"desc": "一级视力，二级及以上肢体残疾，三级四级智力及精神残疾",
          // 		"score": 0,
          // 		"whetherCheck": false
          // 	}]
          // }
        ],
        "title": "个人状况"
      },
      itemsB22: {
        "subs": [{
          "title": "残疾等级",
          "descs": [{
            "desc": "身体正常",
            "score": 20,
            "whetherCheck": false
          }, {
            "desc": "基本正常",
            "score": 16,
            "whetherCheck": false
          }, {
            "desc": "四级视力残疾，三级四级听力言语残疾，四级肢体残疾",
            "score": 10,
            "whetherCheck": false
          }, {
            "desc": "二级三级视力残疾，一级二级听力言语残疾，三级肢体残疾",
            "score": 5,
            "whetherCheck": false
          }, {
            "desc": "一级视力，二级及以上肢体残疾，三级四级智力及精神残疾",
            "score": 0,
            "whetherCheck": false
          }]
        }],
        "title": "残疾情况"
      },
      itemsB23: {
        "subs": [{
          "title": "疾病情况",
          "descs": [{
            "desc": "身体健康",
            "score": 30,
            "whetherCheck": false
          }, {
            "desc": "慢性疾病",
            "score": 15,
            "whetherCheck": false
          }, {
            "desc": "重大疾病",
            "score": 6,
            "whetherCheck": false
          }]
        }],
        "title": "疾病情况"
      },
      itemsB24: {
        "subs": [{
          "title": "康复治疗",
          "descs": [{
            "desc": "完全康复",
            "score": 20,
            "whetherCheck": false
          }, {
            "desc": "明显改善",
            "score": 12,
            "whetherCheck": false
          }, {
            "desc": "效果一般",
            "score": 4,
            "whetherCheck": false
          }]
        }],
        "title": "康复情况"
      },
      itemsB25: {
        "subs": [{
          "title": "社会保障",
          "descs": [{
            "desc": "基本享受政策保障",
            "score": 10,
            "whetherCheck": false
          }, {
            "desc": "部分享受政策保障",
            "score": 6,
            "whetherCheck": false
          }, {
            "desc": "未享受政策保障",
            "score": 0,
            "whetherCheck": false
          }]
        }],
        "title": "社会保障"
      },

      // 行为风险评估表-强制报告项
      whetherCheckC1: [
        { values: [] },
        { values: [] }
      ],
      // 分数项
      whetherCheckC21: [],
      whetherCheckC22: [],
      whetherCheckC23: [],
      whetherCheckC24: [],
      whetherCheckC25: [],
      // 行为风险评估
      form3: {
        "forces": [{
          "descs": [{
            "desc": "结伙斗殴，追逐、拦截他人，强拿硬要或者任意损毁、占用公私财物等寻衅滋事行为",
            "score": 0,
            index: 0,
          }, {
            "desc": "非法携带枪支、弹药或者弩、匕首等国家规定的管制器具",
            "score": 0,
            index: 1,
          }, {
            "desc": "殴打、辱骂、恐吓，或者故意伤害他人身体",
            "score": 0,
            index: 2,
          }, {
            "desc": "盗窃、哄抢、抢夺或者故意损毁公私财物",
            "score": 0,
            index: 3,
          }, {
            "desc": "传播淫秽的读物、音像制品或者信息等",
            "score": 0,
            index: 4,
          }, {
            "desc": "卖淫、嫖娼，或者进行淫秽表演",
            "score": 0,
            index: 5,
          }, {
            "desc": "吸食、注射毒品，或者向他人提供毒品",
            "score": 0,
            index: 6,
          }, {
            "desc": "参与赌博赌资较大",
            "score": 0,
            index: 7,
          }],
          "title": "危害他人"
        }, {
          "descs": [{
            "desc": "自杀行为",
            "score": 0,
            index: 0,
          }, {
            "desc": "自残行为",
            "score": 0,
            index: 1,
          }],
          "title": "危害自己"
        }],

      },

      itemsC21: {
        "subs": [{
          "title": "学习习惯",
          "descs": [{
            "desc": "遵守学校纪律，学习习惯良好",
            "score": 10,
            "whetherCheck": false
          }, {
            "desc": "偶有迟到、早退、旷课",
            "score": 6,
            "whetherCheck": false
          }, {
            "desc": "经常迟到、早退、旷课、逃学",
            "score": 2,
            "whetherCheck": false
          }]
        }, {
          "title": "学习成绩",
          "descs": [{
            "desc": "学习成绩好",
            "score": 10,
            "whetherCheck": false
          }, {
            "desc": "学习成绩一般",
            "score": 6,
            "whetherCheck": false
          }, {
            "desc": "学习成绩较差",
            "score": 2,
            "whetherCheck": false
          }]
        }, {
          "title": "学校交往",
          "descs": [{
            "desc": "与老师同学关系良好",
            "score": 10,
            "whetherCheck": false
          }, {
            "desc": "与老师同学关系一般",
            "score": 6,
            "whetherCheck": false
          }, {
            "desc": "与老师同学关系较差",
            "score": 2,
            "whetherCheck": false
          }]
        },],
        "title": "学校行为"
      },
      itemsC22: {
        "subs": [{
          "title": "家庭行为",
          "descs": [{
            "desc": "与家长沟通良好，主动承担力所能及的家务劳动",
            "score": 20,
            "whetherCheck": false
          }, {
            "desc": "与家长沟通较少，偶尔承担力所能及的家务劳动",
            "score": 16,
            "whetherCheck": false
          }, {
            "desc": "与家长没有沟通，有顶撞家长、偶发冲突情况",
            "score": 10,
            "whetherCheck": false
          }]
        }],
        "title": "家庭行为"
      },
      itemsC23: {
        "subs": [{
          "title": "交往对象",
          "descs": [{
            "desc": "社交正常，无不良社交对象",
            "score": 8,
            "whetherCheck": false
          }, {
            "desc": "偶有不良交往对象",
            "score": 4,
            "whetherCheck": false
          }, {
            "desc": "经常与不良交往对象交往",
            "score": 1,
            "whetherCheck": false
          }]
        }, {
          "title": "出入场所",
          "descs": [{
            "desc": "基本无出入未成年人不宜进入场所的情况",
            "score": 6,
            "whetherCheck": false
          }, {
            "desc": "偶尔有出入未成年人不宜进入场所的情况",
            "score": 4,
            "whetherCheck": false
          }, {
            "desc": "经常有出入未成年人不宜进入场所的情况",
            "score": 1,
            "whetherCheck": false
          }]
        }, {
          "title": "网络行为",
          "descs": [{
            "desc": "除学习外基本不参与或很少接触网络产品和服务",
            "score": 10,
            "whetherCheck": false
          }, {
            "desc": "偶尔有浏览网站，观看网络直播和音视频，有网络社交等的行为",
            "score": 6,
            "whetherCheck": false
          }, {
            "desc": "经常浏览网站，有注册的网络游戏/直播账号，观看或参与网络直播及影视频，有网络社交或者在网络上发布信息等与学习无关的行为",
            "score": 1,
            "whetherCheck": false
          }]
        },
        {
          "title": "课外活动",
          "descs": [{
            "desc": "坚持参加健康的课外活动",
            "score": 6,
            "whetherCheck": false
          }, {
            "desc": "较少参加健康的课外活动",
            "score": 4,
            "whetherCheck": false
          }, {
            "desc": "偶有抽烟、喝酒、赌博、不良网游等活动",
            "score": 2,
            "whetherCheck": false
          }, {
            "desc": "常有抽烟、喝酒、赌博、不良网游等活动",
            "score": 1,
            "whetherCheck": false
          }]
        }],
        "title": "社会行为"
      },
      itemsC24: {
        "subs": [{
          "title": "自我认知",
          "descs": [{
            "desc": "自我认知正面积极，自身感觉良好",
            "score": 10,
            "whetherCheck": false
          }, {
            "desc": "自我认知客观冷静，自我感觉一般",
            "score": 6,
            "whetherCheck": false
          }, {
            "desc": "自我认知负面消极，自我感觉较差",
            "score": 3,
            "whetherCheck": false
          }, {
            "desc": "自我认知否定悲观，自述没有朋友、曾遭遇校园霸凌、被同龄人孤立等情况",
            "score": 0,
            "whetherCheck": false
          }]
        },],
        "title": "自我认知"
      },
      itemsC25: {
        "subs": [{
          "title": "心理健康",
          "descs": [{
            "desc": "心理健康且稳定",
            "score": 10,
            "whetherCheck": false
          }, {
            "desc": "心理亚健康，控制力较差",
            "score": 8,
            "whetherCheck": false
          }, {
            "desc": "存在心理健康隐患",
            "score": 6,
            "whetherCheck": false
          }, {
            "desc": "存在心理疾病",
            "score": 3,
            "whetherCheck": false
          }]
        },],
        "title": "心理健康"
      },


    }
  },

  created () {
    this.loadData();
    console.log(this.$route.query.Id, 'id');
  },

  methods: {
    optionEvent () {
      let date = new Date();
      console.log(date);
      // this.time1 = date;
      let YY = date.getFullYear() + '-';
      let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
      let hh = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours());
      let mm = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes());
      let ss = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());

      // this.date1 = YY + MM + DD + " "+ hh + ":" + mm + ":" + ss;
      this.date1 = YY + MM + DD;
      this.date2 = YY + MM + DD;

      // this.showTime = false;
    },

    async loadData () {
      // 强制报告项
      console.log(this.form.forces, 'form.forces');
      this.whetherCheckA21 = [];
      this.whetherCheckA22 = [];
      this.whetherCheckA23 = [];
      this.whetherCheckB21 = [];
      this.whetherCheckB22 = [];
      this.whetherCheckB23 = [];
      this.whetherCheckB24 = [];
      this.whetherCheckB25 = [];
      this.whetherCheckC21 = [];
      this.whetherCheckC22 = [];
      this.whetherCheckC23 = [];
      this.whetherCheckC24 = [];
      this.whetherCheckC25 = [];
      // let index = 0
      for (let i in this.itemsA21.subs) {
        let obj = {
          index: '',
          score: '',
          mainTitle: '监护人情况',
        };
        this.whetherCheckA21.push(obj);
        this.whetherCheckA21[i].index = i;
      }
      for (let i in this.itemsA22.subs) {
        let obj = {
          index: '',
          score: '',
          mainTitle: this.itemsA22.title,
        };
        this.whetherCheckA22.push(obj);
        this.whetherCheckA22[i].index = i;
      }
      for (let i in this.itemsA23.subs) {
        let obj = {
          index: '',
          score: '',
          mainTitle: this.itemsA23.title,
        };
        this.whetherCheckA23.push(obj);
        this.whetherCheckA23[i].index = i;
      }
      // B
      for (let i in this.itemsB21.subs) {
        let obj = {
          index: '',
          score: '',
          mainTitle: this.itemsB21.title,
        };
        this.whetherCheckB21.push(obj);
        this.whetherCheckB21[i].index = i;
      }
      for (let i in this.itemsB22.subs) {
        let obj = {
          index: '',
          score: '',
          mainTitle: this.itemsB22.title,
        };
        this.whetherCheckB22.push(obj);
        this.whetherCheckB22[i].index = i;
      }
      for (let i in this.itemsB23.subs) {
        let obj = {
          index: '',
          score: '',
          mainTitle: this.itemsB23.title,
        };
        this.whetherCheckB23.push(obj);
        this.whetherCheckB23[i].index = i;
      }
      for (let i in this.itemsB24.subs) {
        let obj = {
          index: '',
          score: '',
          mainTitle: this.itemsB24.title,
        };
        this.whetherCheckB24.push(obj);
        this.whetherCheckB24[i].index = i;
      }
      for (let i in this.itemsB25.subs) {
        let obj = {
          index: '',
          score: '',
          mainTitle: this.itemsB25.title,
        };
        this.whetherCheckB25.push(obj);
        this.whetherCheckB25[i].index = i;
      }
      for (let i in this.itemsC21.subs) {
        let obj = {
          index: '',
          score: '',
          mainTitle: this.itemsC21.title,
        };
        this.whetherCheckC21.push(obj);
        this.whetherCheckC21[i].index = i;
      }
      for (let i in this.itemsC22.subs) {
        let obj = {
          index: '',
          score: '',
          mainTitle: this.itemsC22.title,
        };
        this.whetherCheckC22.push(obj);
        this.whetherCheckC22[i].index = i;
      }
      for (let i in this.itemsC23.subs) {
        let obj = {
          index: '',
          score: '',
          mainTitle: this.itemsC23.title,
        };
        this.whetherCheckC23.push(obj);
        this.whetherCheckC23[i].index = i;
      }
      for (let i in this.itemsC24.subs) {
        let obj = {
          index: '',
          score: '',
          mainTitle: this.itemsC24.title,
        };
        this.whetherCheckC24.push(obj);
        this.whetherCheckC24[i].index = i;
      }
      for (let i in this.itemsC25.subs) {
        let obj = {
          index: '',
          score: '',
          mainTitle: this.itemsC25.title,
        };
        this.whetherCheckC25.push(obj);
        this.whetherCheckC25[i].index = i;
      }
      // 如果是从上门核查完成之后跳过来的
      if (this.$route.query.childID) {
        await getNewEvaluateRecordApi({
          id: this.$route.query.childID
        }).then(res => {
          if (res) this.getDataInfo = res.data
          // 查看赋值
          if (res.data.recordId) {
            // 评估意见或建议
            this.dilemmaSituation = res.data.opinion.dilemmaSituation;
            this.causeOfDilemma = res.data.opinion.causeOfDilemma;
            this.serviceSuggestion = res.data.opinion.serviceSuggestion;
            this.assessmentScore = res.data.opinion.assessmentScore;
            this.whetherSpecial = res.data.opinion.whetherSpecial + '';
            this.specialCase = res.data.opinion.specialCase;
            this.evaluationAgencyOpinion = res.data.opinion.evaluationAgencyOpinion;
            this.evaluationAgencyHeadOpinion = res.data.opinion.evaluationAgencyHeadOpinion;
            // 强制报告项
            this.whetherCheckA1 = res.data.custodyRisk.forces
            this.whetherCheckB1 = res.data.physiologyRisk.forces
            this.whetherCheckC1 = res.data.actionRisk.forces
            // 总分，等级

            this.result[0].score = res.data.custodyRisk.totalScore;
            // this.result[0].grade =  res.data.custodyRisk.level=='1'?'';
            this.result[1].score = res.data.physiologyRisk.totalScore;
            this.result[1].grade = res.data.physiologyRisk.level;
            this.result[2].score = res.data.actionRisk.totalScore;
            this.result[2].grade = res.data.actionRisk.level;

            if (res.data.custodyRisk.level == '1') {
              this.result[0].grade = '一级风险';
              this.colors = 'redFont';
            } else if (res.data.custodyRisk.level == '2') {
              this.result[0].grade = '二级风险';
              this.colors = 'yellowFont';
            } else if (res.data.custodyRisk.level == '3') {
              this.result[0].grade = '三级风险';
              this.colors = 'blueFont';
            } else if (res.data.custodyRisk.level == '4') {
              this.result[0].grade = '四级风险';
              this.colors = 'greenFont';
            }
            // 获取勾选项
            let itemsA = res.data.custodyRisk.items
            let itemsB = res.data.physiologyRisk.items
            let itemsC = res.data.actionRisk.items

            // 评估ID
            this.pgId = res.data.id
            console.log(itemsA);
            this.whetherCheckA21 = [];
            this.whetherCheckA22 = [];
            this.whetherCheckA23 = [];
            for (let i in itemsA) {
              if (i < 6) {
                this.whetherCheckA21.push(itemsA[i])
              } else if (i < 9) {
                this.whetherCheckA22.push(itemsA[i])
              } else if (i < itemsA.length) {
                this.whetherCheckA23.push(itemsA[i])
              }
            }
            this.whetherCheckB21 = [];
            this.whetherCheckB22 = [];
            this.whetherCheckB23 = [];
            this.whetherCheckB24 = [];
            this.whetherCheckB25 = [];

            for (let i in itemsB) {
              if (i < 3) {
                this.whetherCheckB21.push(itemsB[i]);
              } else if (i < 4) {
                this.whetherCheckB22.push(itemsB[i]);
              } else if (i < 5) {
                this.whetherCheckB23.push(itemsB[i]);
              } else if (i < 6) {
                this.whetherCheckB24.push(itemsB[i]);
              } else if (i < itemsB.length) {
                this.whetherCheckB25.push(itemsB[i]);
              }
            }
            this.whetherCheckC21 = [];
            this.whetherCheckC22 = [];
            this.whetherCheckC23 = [];
            this.whetherCheckC24 = [];
            this.whetherCheckC25 = [];
            for (let i in itemsC) {
              if (i < 3) {
                this.whetherCheckC21.push(itemsC[i]);
              } else if (i < 4) {
                this.whetherCheckC22.push(itemsC[i]);
              } else if (i < 8) {
                this.whetherCheckC23.push(itemsC[i]);
              }
              else if (i < 9) {
                this.whetherCheckC24.push(itemsC[i]);
              }
              else if (i < itemsC.length) {
                this.whetherCheckC25.push(itemsC[i]);
              }
            }
            console.log(this.whetherCheckA1, 'whetherCheckA1');

            if (this.whetherCheckA1[0].values.length > 0 || this.whetherCheckA1[1].values.length > 0) {

              this.result[0].grade = '一级风险';
              this.colors = 'redFont';
              console.log('一级风险');
            } else {
              if (this.result[0].score < 40) {
                this.result[0].grade = '一级风险';
                this.colors = 'redFont';
              } else if (this.result[0].score < 59) {
                this.result[0].grade = '二级风险';
                this.colors = 'yellowFont';
              } else if (this.result[0].score < 79) {
                this.result[0].grade = '三级风险';
                this.colors = 'blueFont';
              } else if (this.result[0].score >= 80) {
                this.result[0].grade = '四级风险';
                this.colors = 'greenFont';
              }
            }
          } else {
            // 评估时间赋值
            this.optionEvent();
          }
        }).catch(error => {
          console.log(error, "this errpr")
          this.$toast.fail('数据获取失败')
        })
      }
      // else
      if (this.$route.query.taskSubId) {
        await this.getData({
          id: this.taskSubId
        }).then(res => {
          console.log(res.data.recordId == null, 'recordId');
          // 查看赋值
          if (res.data.recordId != null) {
            // 评估意见或建议
            this.dilemmaSituation = res.data.opinion.dilemmaSituation;
            this.causeOfDilemma = res.data.opinion.causeOfDilemma;
            this.serviceSuggestion = res.data.opinion.serviceSuggestion;
            this.assessmentScore = res.data.opinion.assessmentScore;
            this.whetherSpecial = res.data.opinion.whetherSpecial + '';
            this.specialCase = res.data.opinion.specialCase;
            this.evaluationAgencyOpinion = res.data.opinion.evaluationAgencyOpinion;
            this.evaluationAgencyHeadOpinion = res.data.opinion.evaluationAgencyHeadOpinion;
            // 强制报告项
            this.whetherCheckA1 = res.data.custodyRisk.forces
            this.whetherCheckB1 = res.data.physiologyRisk.forces
            this.whetherCheckC1 = res.data.actionRisk.forces
            // 总分，等级
            this.result[0].score = res.data.custodyRisk.totalScore;
            // this.result[0].grade =  res.data.custodyRisk.level=='1'?'';
            this.result[1].score = res.data.physiologyRisk.totalScore;
            this.result[1].grade = res.data.physiologyRisk.level;
            this.result[2].score = res.data.actionRisk.totalScore;
            this.result[2].grade = res.data.actionRisk.level;
            if (res.data.custodyRisk.level == '1') {
              this.result[0].grade = '一级风险';
              this.colors = 'redFont';
            } else if (res.data.custodyRisk.level == '2') {
              this.result[0].grade = '二级风险';
              this.colors = 'yellowFont';
            } else if (res.data.custodyRisk.level == '3') {
              this.result[0].grade = '三级风险';
              this.colors = 'blueFont';
            } else if (res.data.custodyRisk.level == '4') {
              this.result[0].grade = '四级风险';
              this.colors = 'greenFont';
            }
            // 获取勾选项
            let itemsA = res.data.custodyRisk.items
            let itemsB = res.data.physiologyRisk.items
            let itemsC = res.data.actionRisk.items
            // 评估ID
            this.pgId = res.data.id
            console.log(itemsA);
            this.whetherCheckA21 = [];
            this.whetherCheckA22 = [];
            this.whetherCheckA23 = [];
            for (let i in itemsA) {
              if (i < 6) {
                this.whetherCheckA21.push(itemsA[i])
              } else if (i < 9) {
                this.whetherCheckA22.push(itemsA[i])
              } else if (i < itemsA.length) {
                this.whetherCheckA23.push(itemsA[i])
              }
            }
            this.whetherCheckB21 = [];
            this.whetherCheckB22 = [];
            this.whetherCheckB23 = [];
            this.whetherCheckB24 = [];
            this.whetherCheckB25 = [];
            for (let i in itemsB) {
              if (i < 3) {
                this.whetherCheckB21.push(itemsB[i]);
              } else if (i < 4) {
                this.whetherCheckB22.push(itemsB[i]);
              } else if (i < 5) {
                this.whetherCheckB23.push(itemsB[i]);
              } else if (i < 6) {
                this.whetherCheckB24.push(itemsB[i]);
              } else if (i < itemsB.length) {
                this.whetherCheckB25.push(itemsB[i]);
              }
            }
            this.whetherCheckC21 = [];
            this.whetherCheckC22 = [];
            this.whetherCheckC23 = [];
            this.whetherCheckC24 = [];
            this.whetherCheckC25 = [];
            for (let i in itemsC) {
              if (i < 3) {
                this.whetherCheckC21.push(itemsC[i]);
              } else if (i < 4) {
                this.whetherCheckC22.push(itemsC[i]);
              } else if (i < 8) {
                this.whetherCheckC23.push(itemsC[i]);
              }
              else if (i < 9) {
                this.whetherCheckC24.push(itemsC[i]);
              }
              else if (i < itemsC.length) {
                this.whetherCheckC25.push(itemsC[i]);
              }
            }
            console.log(this.whetherCheckA1, 'whetherCheckA1');

            if (this.whetherCheckA1[0].values.length > 0 || this.whetherCheckA1[1].values.length > 0) {

              this.result[0].grade = '一级风险';
              this.colors = 'redFont';
              console.log('一级风险');
            } else {
              if (this.result[0].score < 40) {
                this.result[0].grade = '一级风险';
                this.colors = 'redFont';
              } else if (this.result[0].score < 59) {
                this.result[0].grade = '二级风险';
                this.colors = 'yellowFont';
              } else if (this.result[0].score < 79) {
                this.result[0].grade = '三级风险';
                this.colors = 'blueFont';
              } else if (this.result[0].score >= 80) {
                this.result[0].grade = '四级风险';
                this.colors = 'greenFont';
              }
            }
          } else {
            // 评估时间赋值
            this.optionEvent();
          }
        }).catch(error => {
          console.log(error)
          this.$toast.fail('数据获取失败')
        })
      }
    },
    // 获取数据
    getData (data) {
      return request({
        method: 'post',
        url: '/social/childEvaluate/getEvaluateRecord',
        data: data
      })
    },

    checkEvent (key, data) {

      console.log(key, data, data.length);

      // debugger
      if (key == 'A1') {
        if (this.whetherCheckA1[0].values.length > 0 || this.whetherCheckA1[1].values.length > 0) {

          this.result[0].grade = '一级风险';
          this.colors = 'redFont';
          console.log(this.colors, 'this.colors');
        } else {

          if (this.result[0].score < 40) {
            this.result[0].grade = '一级风险';
            this.colors = 'redFont';
          } else if (this.result[0].score < 59) {
            this.result[0].grade = '二级风险';
            this.colors = 'yellowFont';
          } else if (this.result[0].score < 79) {
            this.result[0].grade = '三级风险';
            this.colors = 'blueFont';
          } else if (this.result[0].score >= 80) {
            this.result[0].grade = '四级风险';
            this.colors = 'greenFont';
            console.log(this.colors);
          }
        }


      }


      if (key == 'B1') {
        if (this.whetherCheckB1[0].values.length > 0 || this.whetherCheckB1[1].values.length > 0) {

          this.result[1].grade = '一级风险';
          this.colors = 'redFont';
        } else {

          if (this.result[1].score < 40) {
            this.result[1].grade = '一级风险';
            this.colors = 'redFont';
          } else if (this.result[1].score < 59) {
            this.result[1].grade = '二级风险';
            this.colors = 'yellowFont';
          } else if (this.result[1].score < 79) {
            this.result[1].grade = '三级风险';
            this.colors = 'blueFont';
          } else if (this.result[1].score >= 80) {
            this.result[1].grade = '四级风险';
            this.colors = 'greenFont';
          }
        }

      }



      if (key == 'C1') {
        if (this.whetherCheckC1[0].values.length > 0 || this.whetherCheckC1[1].values.length > 0) {

          this.result[2].grade = '一级风险';
          this.colors = 'redFont';

        } else {

          if (this.result[2].score < 40) {
            this.result[2].grade = '一级风险';
            this.colors = 'redFont';
          } else if (this.result[2].score < 59) {
            this.result[2].grade = '二级风险';
            this.colors = 'yellowFont';
          } else if (this.result[2].score < 79) {
            this.result[2].grade = '三级风险';
            this.colors = 'blueFont';
          } else if (this.result[2].score >= 80) {
            this.result[2].grade = '四级风险';
            this.colors = 'greenFont';
          }
        }


      }


    },

    checkEvent2 (key, index, value) {
      let sumA = 0;
      let sumA1 = 0;
      let sumA2 = 0;
      let sumA3 = 0;
      let sumA4 = 0;
      let sumA5 = 0;

      if (key.indexOf('A2') != -1) {

        // console.log(this.whetherCheckA21);

        for (let i in this.whetherCheckA21) {
          sumA1 += this.whetherCheckA21[i].score * 1
        }

        // console.log(this.whetherCheckA22);
        for (let i in this.whetherCheckA22) {
          sumA2 += this.whetherCheckA22[i].score * 1
        }


        // console.log(this.whetherCheckA23);
        for (let i in this.whetherCheckA23) {
          sumA3 += this.whetherCheckA23[i].score * 1
        }


        // 计算该表格评估总分
        sumA = sumA1 * 1 + sumA2 * 1 + sumA3 * 1;
        this.result[0].score = sumA;

        if (this.whetherCheckA1[0].values.length > 0 || this.whetherCheckA1[1].values.length > 0) {

          this.result[0].grade = '一级风险';
          this.colors = 'redFont';
        } else if (this.result[0].score < 40) {
          this.result[0].grade = '一级风险';
          this.colors = 'redFont';
        } else if (this.result[0].score < 59) {
          this.result[0].grade = '二级风险';
          this.colors = 'yellowFont';
        } else if (this.result[0].score < 79) {
          this.result[0].grade = '三级风险';
          this.colors = 'blueFont';
        } else if (this.result[0].score >= 80) {
          this.result[0].grade = '四级风险';
          this.colors = 'greenFont';
        }
      }
      else if (key.indexOf('B2') != -1) {


        // console.log(this.whetherCheckB21);

        for (let i in this.whetherCheckB21) {
          sumA1 += this.whetherCheckB21[i].score * 1
        }



        // console.log(this.whetherCheckB22);
        for (let i in this.whetherCheckB22) {
          sumA2 += this.whetherCheckB22[i].score * 1
        }


        // console.log(this.whetherCheckB23);
        for (let i in this.whetherCheckB23) {
          sumA3 += this.whetherCheckB23[i].score * 1
        }

        // console.log(this.whetherCheckB24);
        for (let i in this.whetherCheckB24) {
          sumA4 += this.whetherCheckB24[i].score * 1
        }

        // console.log(this.whetherCheckB25);
        for (let i in this.whetherCheckB25) {
          sumA5 += this.whetherCheckB25[i].score * 1
        }

        sumA = sumA1 * 1 + sumA2 * 1 + sumA3 * 1 + sumA4 * 1 + sumA5 * 1;
        this.result[1].score = sumA;

        if (this.whetherCheckB1[0].values.length > 0 || this.whetherCheckB1[1].values.length > 0) {

          this.result[1].grade = '一级风险';
          this.colors = 'redFont';
        } else if (this.result[1].score < 40) {
          this.result[1].grade = '一级风险';
          this.colors = 'redFont';
        } else if (this.result[1].score < 59) {
          this.result[1].grade = '二级风险';
          this.colors = 'yellowFont';
        } else if (this.result[1].score < 79) {
          this.result[1].grade = '三级风险';
          this.colors = 'blueFont';
        } else if (this.result[1].score >= 80) {
          this.result[1].grade = '四级风险';
          this.colors = 'greenFont';
        }

      }
      else if (key.indexOf('C2') != -1) {
        for (let i in this.whetherCheckC21) {
          sumA1 += this.whetherCheckC21[i].score * 1
        }
        console.log(this.whetherCheckC22);
        for (let i in this.whetherCheckC22) {
          sumA2 += this.whetherCheckC22[i].score * 1
        }
        console.log(this.whetherCheckC23);
        for (let i in this.whetherCheckC23) {
          sumA3 += this.whetherCheckC23[i].score * 1
        }
        console.log(this.whetherCheckC24);
        for (let i in this.whetherCheckC24) {
          sumA4 += this.whetherCheckC24[i].score * 1
        }
        console.log(this.whetherCheckC25);
        for (let i in this.whetherCheckC25) {
          sumA4 += this.whetherCheckC25[i].score * 1
        }
        sumA = sumA1 * 1 + sumA2 * 1 + sumA3 * 1 + sumA4 * 1;
        this.result[2].score = sumA;
        if (this.whetherCheckC1[0].values.length > 0 || this.whetherCheckC1[1].values.length > 0) {
          this.result[2].grade = '一级风险';
          this.colors = 'redFont';
        } else if (this.result[2].score < 40) {
          this.result[2].grade = '一级风险';
          this.colors = 'redFont';
        } else if (this.result[2].score < 59) {
          this.result[2].grade = '二级风险';
          this.colors = 'yellowFont';
        } else if (this.result[2].score < 79) {
          this.result[2].grade = '三级风险';
          this.colors = 'blueFont';
        } else if (this.result[2].score >= 80) {
          this.result[2].grade = '四级风险';
          this.colors = 'greenFont';
        }
      }
      // console.log(sumA,sumA1,sumA2,sumA3);
      console.log(key, index, value, this.colors);
    },
    checkEvent3 (event) {
      console.log(event, '3');
    },
    // 监护风险评估完成，下一步
    next1 () {
      let toast = this.$toast({
        type: 'loading',
        message: '提交中...',
        overlay: true,
        duration: 0
      })
      let grade = '';
      if (this.result[0].grade == '一级风险') {
        grade = '1';
      } else if (this.result[0].grade == '二级风险') {
        grade = '2';
      } else if (this.result[0].grade == '三级风险') {
        grade = '3';
      } else if (this.result[0].grade == '四级风险') {
        grade = '4';
      }
      let custodyRisk = {
        forces: [],
        items: [],
        level: grade,
        totalScore: this.result[0].score,
      }
      custodyRisk.forces = this.whetherCheckA1;
      custodyRisk.items = this.whetherCheckA21.concat(this.whetherCheckA22.concat(this.whetherCheckA23))
      // 如果是从困境儿童上门核查过来的页面
      if (this.$route.query.childID) {
        saveAloneEvaluateRecordApi({
          custodyRisk: custodyRisk,
          // taskId:this.taskId,
          childId: this.$route.query.childID,				// 儿童id
          // buildReport:false,		// 是否生成评估报告
          taskSubId: this.getDataInfo.taskSubId,
          recordId: this.getDataInfo.recordId,
        }).then(res => {
          console.log(res, 'res');
          toast.clear();
          this.getDataInfo.recordId = res.data; //评估id
          this.page1 = false;
          this.page2 = true;
          this.isShow = false;
          this.isShow2 = true;
          if (this.whetherCheckB1[0].values.length > 0 || this.whetherCheckB1[1].values.length > 0) {
            this.result[1].grade = '一级风险';
            this.colors = 'redFont';
          } else {
            if (this.result[1].score < 40) {
              this.result[1].grade = '一级风险';
              this.colors = 'redFont';
            } else if (this.result[1].score < 59) {
              this.result[1].grade = '二级风险';
              this.colors = 'yellowFont';
            } else if (this.result[1].score < 79) {
              this.result[1].grade = '三级风险';
              this.colors = 'blueFont';
            } else if (this.result[1].score >= 80) {
              this.result[1].grade = '四级风险';
              this.colors = 'greenFont';
            }
          }
        }).catch(error => {
          // 提示提交失败
          console.log(error)
          this.$toast.fail('提交失败')
        })
      }
      // else
      if (!this.$route.query.childID) {
        this.save({
          custodyRisk: custodyRisk,
          // taskId:this.taskId,
          // childId:this.childId,				// 儿童id
          // buildReport:false,		// 是否生成评估报告
          taskSubId: this.taskSubId,
          recordId: this.recordId,
        }).then(res => {
          console.log(res, 'res');
          toast.clear();
          this.recordId = res.data; //评估id
          this.page1 = false;
          this.page2 = true;
          this.isShow = false;
          this.isShow2 = true;
          if (this.whetherCheckB1[0].values.length > 0 || this.whetherCheckB1[1].values.length > 0) {
            this.result[1].grade = '一级风险';
            this.colors = 'redFont';
          } else {
            if (this.result[1].score < 40) {
              this.result[1].grade = '一级风险';
              this.colors = 'redFont';
            } else if (this.result[1].score < 59) {
              this.result[1].grade = '二级风险';
              this.colors = 'yellowFont';
            } else if (this.result[1].score < 79) {
              this.result[1].grade = '三级风险';
              this.colors = 'blueFont';
            } else if (this.result[1].score >= 80) {
              this.result[1].grade = '四级风险';
              this.colors = 'greenFont';
            }
          }
        }).catch(error => {
          // 提示提交失败
          console.log(error)
          this.$toast.fail('提交失败')
        })
      }
    },
    // 生理风险评估完成，下一步
    next2 () {
      let toast = this.$toast({
        type: 'loading',
        message: '提交中...',
        overlay: true,
        duration: 0
      })
      let grade = '';
      if (this.result[1].grade == '一级风险') {
        grade = '1';
      } else if (this.result[1].grade == '二级风险') {
        grade = '2';
      } else if (this.result[1].grade == '三级风险') {
        grade = '3';
      } else if (this.result[1].grade == '四级风险') {
        grade = '4';
      }
      console.log(grade);
      let physiologyRisk = {
        forces: [],
        items: [],
        level: grade,
        totalScore: this.result[1].score,
      }

      physiologyRisk.forces = this.whetherCheckB1;
      physiologyRisk.items = this.whetherCheckB21.concat(this.whetherCheckB22).concat(this.whetherCheckB23).concat(this.whetherCheckB24).concat(this.whetherCheckB25)

      console.log(physiologyRisk);
      console.log(this.childId, '儿童id');
      // 如果是上门核查页面跳转过来的
      if (this.$route.query.childID) {
        saveAloneEvaluateRecordApi({
          physiologyRisk: physiologyRisk,
          // taskId:this.taskId,
          childId: this.$route.query.childID,
          // buildReport:false,		// 是否生成评估报告
          // id:this.pgId,
          taskSubId: this.getDataInfo.taskSubId,
          recordId: this.getDataInfo.recordId,
        }).then(res => {
          console.log(res, 'res');
          this.getDataInfo.recordId = res.data; //评估id
          console.log(this.pgId, '评估id');
          this.page2 = false;
          this.page3 = true;
          this.isShow2 = false;
          this.isShow3 = true;
          console.log(this.whetherCheckC1[0].values.length, 'C强制报告项');
          // 显示第三张表
          if (this.whetherCheckC1[0].values.length > 0 || this.whetherCheckC1[1].values.length > 0) {
            this.result[2].grade = '一级风险';
            this.colors = 'redFont';
          } else {
            if (this.result[2].score < 40) {
              this.result[2].grade = '一级风险';
              this.colors = 'redFont';
            } else if (this.result[2].score < 59) {
              this.result[2].grade = '二级风险';
              this.colors = 'yellowFont';
            } else if (this.result[2].score < 79) {
              this.result[2].grade = '三级风险';
              this.colors = 'blueFont';
            } else if (this.result[2].score >= 80) {
              this.result[2].grade = '四级风险';
              this.colors = 'greenFont';
            }
          }
          toast.clear();
        }).catch(error => {
          // 提示提交失败
          console.log(error)
          this.$toast.fail('提交失败')

        })

      }
      if (!this.$route.query.childID) {
        this.save({
          physiologyRisk: physiologyRisk,
          // taskId:this.taskId,
          // childId:this.childId,				// 儿童id
          // buildReport:false,		// 是否生成评估报告
          // id:this.pgId,
          taskSubId: this.taskSubId,
          recordId: this.recordId,
        }).then(res => {
          console.log(res, 'res');
          // this.pgId = res.data; //评估id
          console.log(this.pgId, '评估id');
          this.page2 = false;
          this.page3 = true;
          this.isShow2 = false;
          this.isShow3 = true;
          console.log(this.whetherCheckC1[0].values.length, 'C强制报告项');
          // 显示第三张表
          if (this.whetherCheckC1[0].values.length > 0 || this.whetherCheckC1[1].values.length > 0) {
            this.result[2].grade = '一级风险';
          } else {
            if (this.result[2].score < 40) {
              this.result[2].grade = '一级风险';
              this.colors = 'redFont';
            } else if (this.result[2].score < 59) {
              this.result[2].grade = '二级风险';
              this.colors = 'yellowFont';
            } else if (this.result[2].score < 79) {
              this.result[2].grade = '三级风险';
              this.colors = 'blueFont';
            } else if (this.result[2].score >= 80) {
              this.result[2].grade = '四级风险';
              this.colors = 'greenFont';
            }
          }
          toast.clear();
        }).catch(error => {
          // 提示提交失败
          console.log(error)
          this.$toast.fail('提交失败')

        })
      }


    },
    next3 () {
      let toast = this.$toast({
        type: 'loading',
        message: '提交中...',
        overlay: true,
        duration: 0
      })
      let grade = '';

      if (this.result[2].grade == '一级风险') {
        grade = '1';
      } else if (this.result[2].grade == '二级风险') {
        grade = '2';
      } else if (this.result[2].grade == '三级风险') {
        grade = '3';
      } else if (this.result[2].grade == '四级风险') {
        grade = '4';
      }

      console.log(grade, this.result[2].grade == '三级风险');
      console.log(this.result[2].grade);

      let actionRisk = {
        forces: [],
        items: [],
        level: grade,
        totalScore: this.result[1].score,
      }

      actionRisk.forces = this.whetherCheckC1;
      actionRisk.items = this.whetherCheckC21.concat(this.whetherCheckC22).concat(this.whetherCheckC23).concat(this.whetherCheckC24).concat(this.whetherCheckC25)
      console.log(this.childId, '儿童id');
      if (this.$route.query.childID) {
        this.save({
          actionRisk: actionRisk,
          // taskId:this.taskId,
          childId: this.$route.query.childID,
          // buildReport:true,		// 是否生成评估报告
          // id:this.pgId,
          taskSubId: this.getDataInfo.taskSubId,
          recordId: this.getDataInfo.recordId,
        }).then(res => {
          this.getDataInfo.recordId = res.data
          console.log(res, 'res');
          console.log(this.pgId, '评估id');
          // this.pgId = res.data; //评估id
          toast.clear();

          this.page3 = false;
          this.page4 = true;
          this.isShow3 = false;
          this.isShow4 = true;
          // this.$toast.fail('提交成功')
          // this.$dialog.alert({
          // 	message: '提交成功',
          // }).then(()=>{
          // 	this.$router.push('/etpgList')
          // })

        }).catch(error => {

          // 提示提交失败
          console.log(error)
          this.$toast.fail('提交失败')

        })
      }
      if (!this.$route.query.childID) {
        this.save({
          actionRisk: actionRisk,
          // taskId:this.taskId,
          // childId:this.childId,				// 儿童id
          // buildReport:true,		// 是否生成评估报告
          // id:this.pgId,
          taskSubId: this.taskSubId,
          recordId: this.recordId,
        }).then(res => {

          console.log(res, 'res');
          console.log(this.pgId, '评估id');
          // this.pgId = res.data; //评估id
          toast.clear();

          this.page3 = false;
          this.page4 = true;
          this.isShow3 = false;
          this.isShow4 = true;
          // this.$toast.fail('提交成功')
          // this.$dialog.alert({
          // 	message: '提交成功',
          // }).then(()=>{
          // 	this.$router.push('/etpgList')
          // })

        }).catch(error => {

          // 提示提交失败
          console.log(error)
          this.$toast.fail('提交失败')

        })
      }
    },
    next4 () {
      let data = {
        assessmentScore: this.assessmentScore,
        causeOfDilemma: this.causeOfDilemma,
        dilemmaSituation: this.dilemmaSituation,
        evaluationAgencyHeadOpinion: this.evaluationAgencyHeadOpinion,
        evaluationAgencyOpinion: this.evaluationAgencyOpinion,
        serviceSuggestion: this.serviceSuggestion,
        specialCase: this.specialCase,
        taskSubId: this.taskSubId,
        whetherSpecial: this.whetherSpecial,
        childId: this.$route.query.childID,
      }
      // return console.log(data)
      if (this.$route.query.childID) {
        saveAloneEvaluateRecordApi(data).then(res => {
          if (res.status == '+OK') {
            this.$dialog.alert({
              message: '提交成功',
            }).then(() => {
              this.$router.push('/etpgList')
            })
          } else {
            this.$toast.fail('提交失败')
          }
        }).catch(res => {
          console.log(res, 'catch');
          this.$toast.fail('提交失败')
        })
      } else {
        request({
          method: 'post',
          url: '/social/childEvaluate/saveEvaluateOpinion',
          data: data
        }).then(res => {
          if (res.status == '+OK') {
            this.$dialog.alert({
              message: '提交成功',
            }).then(() => {
              this.$router.push('/etpgList')
            })
          } else {
            this.$toast.fail('提交失败')
          }
        }).catch(res => {
          console.log(res, 'catch');
          this.$toast.fail('提交失败')
        })
      }
    },

    back2 () {

      this.page1 = true;
      this.page2 = false;
      this.isShow = true;
      this.isShow2 = false;

      if (this.whetherCheckA1[0].values.length > 0 || this.whetherCheckA1[1].values.length > 0) {

        this.result[0].grade = '一级风险';
        this.colors = 'redFont';

      } else {

        if (this.result[0].score < 40) {
          this.result[0].grade = '一级风险';
          this.colors = 'redFont';
        } else if (this.result[0].score < 59) {
          this.result[0].grade = '二级风险';
          this.colors = 'yellowFont';
        } else if (this.result[0].score < 79) {
          this.result[0].grade = '三级风险';
          this.colors = 'blueFont';
        } else if (this.result[0].score >= 80) {
          this.result[0].grade = '四级风险';
          this.colors = 'greenFont';
        }
      }
    },

    // 返回 生理评估表
    back3 () {
      this.page3 = false;
      this.page2 = true;
      this.isShow3 = false;
      this.isShow2 = true;

      if (this.whetherCheckB1[0].values.length > 0 || this.whetherCheckB1[1].values.length > 0) {

        this.result[1].grade = '一级风险';
        this.colors = 'redFont';

      } else {

        if (this.result[1].score < 40) {
          this.result[1].grade = '一级风险';
          this.colors = 'redFont';
        } else if (this.result[1].score < 59) {
          this.result[1].grade = '二级风险';
          this.colors = 'yellowFont';
        } else if (this.result[1].score < 79) {
          this.result[1].grade = '三级风险';
          this.colors = 'blueFont';
        } else if (this.result[1].score >= 80) {
          this.result[1].grade = '四级风险';
          this.colors = 'greenFont';
        }
      }
    },
    back4 () {
      this.page4 = false;
      this.page3 = true;
      this.isShow4 = false;
      this.isShow3 = true;
    },

    save (data) {

      // 遮罩
      // let toast = this.$toast({
      // 	type:'loading',
      // 	message:'提交中...',
      // 	overlay:true,
      // 	duration:0
      // })

      // var date=new Date();
      // var year=date.getFullYear(); //获取当前年份
      // var mon=date.getMonth()+1; //获取当前月份
      // var da=date.getDate(); //获取当前日
      // var day=date.getDay(); //获取当前星期几
      // var h=date.getHours(); //获取小时
      // var m=date.getMinutes(); //获取分钟
      // var s=date.getSeconds(); //获取秒
      // var d=document.getElementById('Date');
      // h<10 ? h='0'+h:h;
      // m<10 ? m='0'+m:m;
      // s<10 ? s='0'+s:s;
      // var mytime=year+'-'+mon+'-'+da+' '+h+':'+m+':'+s;
      // this.form.ab_dat14 = mytime

      // =

      // 提交
      return request({
        method: 'post',
        url: '/social/childEvaluate/saveEvaluateRecord',
        data: data
      })
      // .then(res=>{

      // 	toast.clear();
      // 	// 提示提交成功
      // 	// this.$toast.success('提交成功')
      // 	// this.$router.push('/')
      // 	this.$dialog.alert({
      // 	      message: '提交成功',
      // 	    }).then(()=>{
      // 			this.$router.push('/')
      // 		})
      // 	console.log(res)

      // }).catch(error=>{

      // 	toast.clear()
      // 	// 提示提交失败
      // 	this.$toast.fail('提交失败')
      // 	console.log(error)

      // })
    },



  }
}
</script>
 
<style scoped>
.headerF {
  color: #333333;
}

.marginstyle {
  margin: 10px;
}

.helpApply {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  background-size: 100% 100%;
  position: fixed;
  overflow: auto;
}

header {
  width: 100%;
  height: 88px;
  background-color: #3e80cc;
  position: fixed;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #ffffff;
}

.headerHead {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  padding: 0 4px;
}

.headerRectangle {
  width: 70px;
  height: 6px;
  background-color: #f5f5f5;
  border-radius: 10px;
  margin: 0 10px 0 10px;
}

main {
  margin-top: 0px;
}
.page1Font1 {
  margin-bottom: 20px;
  font-size: 34px;
  font-weight: 600;
}
.page1Font2 {
  font-size: 28px;
  line-height: 50px;
  letter-spacing: 1px;
}
.page1Font3 {
  font-size: 28px;
}
.page2Div1 {
  padding: 0 20px 0 20px;
  text-align: left;
}
.page2Div2 {
  border-bottom: #aaa solid 1px;
  font-size: 30px;
}

/* 新增的样式 */
.title2 {
  /* content: ' '; */
  border-left: 6px solid #1989fa;
  padding-left: 4px;
  /* width: 3px;
        height: 20px;
        background-color: #1989fa; */
}
.title {
  text-align: center;
  margin-left: 5px;
  margin: 15px 5px;
  padding: 10px;
  font-size: 0.4rem;
  font-weight: 600;
  color: #222;
  /* border-bottom:1px solid #aaa; */
}
.title1 {
  margin-left: 5px;
  padding: 10px;
  font-size: 20px;
  text-align: left;
  border-bottom: 1px solid #aaa;
  /* border-bottom:1px solid #111; */
}
.title1 > span {
  border-left: 6px solid #1989fa;
  padding-left: 4px;
}
.title_bg {
  margin-left: 5px;
  padding: 20px 10px 10px;
  font-size: 28px;
  text-align: left;
  /* background-color: #fefefe; */
  /* border-bottom:1px solid #ddd; */
  /* border-bottom:1px solid #111; */
}
.title_bg > span {
  border-left: 6px solid #1989fa;
  padding-left: 4px;
}
.pg_result {
  width: 100%;
  display: flex;
  background-color: rgb(227, 253, 255);
  margin: 80px auto 0;
  text-align: center;
  box-shadow: 0px 0px 10px #a1a1a1;
  /* box-shadow: (0, 0 5px)#545454; */
}

/* 风险等级颜色 */
.redFont {
  color: #ee0a24;
}
.yellowFont {
  color: #ff976a;
}
.blueFont {
  color: #1989fa;
}
.greenFont {
  color: #07c160;
}
</style>
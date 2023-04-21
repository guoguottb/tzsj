<template>
    <div>
        <h3 class="line_blue">&emsp;承包山林土地情况</h3>
        <div class="lineSt"></div>
        <el-row class="button-group" style="padding: 0px 0px 5px 15px">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddDetails('lands')">
                新增</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelDetails('lands')">
                删除</el-button>
        </el-row>
        <el-table :data="lands" border :row-class-name="rowClassName"
            @selection-change="handleLandsData" empty-text='空' class="my-table">
            <el-table-column type="selection" width="40" align="center" />
            <el-table-column prop="abl_ex1" label="承包人姓名" min-width="110">
                <template slot-scope="scope">
                    <el-input v-model="lands[scope.row.xh-1].abl_ex1"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="abl_ex2" label="承包面积(亩)" min-width="190">
                <template slot-scope="scope">
                    <el-input v-model="lands[scope.row.xh-1].abl_ex2"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="abl_ex3" label="土地类型" min-width="130">
                <template slot-scope="scope">
                    <el-select v-model="lands[scope.row.xh-1].abl_ex3" >
                        <el-option
                            v-for="item in landType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column prop="abl_ex4" label="土地估值(元)" min-width="130">
                <template slot-scope="scope">
                    <el-input v-model="lands[scope.row.xh-1].abl_ex4"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="abl_ex5" label="备注" min-width="200" >
                <template slot-scope="scope">
                    <el-input v-model="lands[scope.row.xh-1].abl_ex5"></el-input>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
	import request from '@/utils/request'
	import {isName, isNum} from '@/utils/until'
	export default {
		name: "LandEdit",
        props: [],
		components: {
		},
        data() {
            return {
                lands: [],
                landType: [
                    {label: "耕地", value: "耕地"},
                    {label: "山林", value: "山林"},
                    {label: "草场", value: "草场"},
                    {label: "水塘", value: "水塘"},
                    {label: "其他", value: "其他"}
                ]
            }
        },
        created() {
            this.loadData();
        },
        methods: {
            loadData() {
                this.loadLand({
					"sId": this.$route.query.sId,
				}).then(res => {
					this.lands = res[0].data;
				}).catch(res => {
                    if(!this.requestError(res)) return false;
					this.lands = res.response.data[0].data;
				})

                /*this.loadDropOptions({
                    sNames: "土地类型"
                }).then(res => {
                    this.landType = res[0].data.landType;
                }).catch(res => {
                    if(!this.requestError(res)) return false;
					this.landType = res.response.data[0].data.landType;
				})*/
            },
			loadLand(data){
				return request({
					method: 'post',
					url: '/social/assistance/getBasicLand',
					data: data
				});
			},
            /*
            loadDropOptions(data){
				return request({
					method: 'post',
					url: '/social/assistance/getBasicLand',
					data: data
				});
            },*/
            requestError(res){
                if(typeof res.request === 'undefined' || typeof res.response === 'undefined' || res.request.readyState != 4 || res.request.status != 200){
                    console.log('请求失败了-----------------------6')
                    this.$message.error('数据获取失败或请求超时')
                    this.$emit("closes", false)
                    this.$router.go(-1)
                    return false
                }
                return true;
            },
			handleLandsData(selection) {
				this.checkedLands = selection;
			},
            handleAddDetails() {
                if (!this.lands) this.lands = new Array();
                let obj = {
                    abl_id: "",
                    abl_ex1: "",
                    abl_ex2: "",
                    abl_ex3: "",
                    abl_ex4: "",
                    abl_ex5: ""
                };
                this.lands.push(obj);
			},
            handleDelDetails() {
                let obj = this.checkedLands;
                let old = this.lands;
                if (obj.length > 0) {
                    obj.forEach((v1, i1) => {
                        old.forEach((v2, i2) => {
                            if (v1.xh == v2.xh) {
                                old.splice(i2, 1)
                            }
                        })
                    })
                }
			},
			rowClassName({ 
				row,
				rowIndex
			}) {
				row.xh = rowIndex + 1;
			},
            getData(){
                return this.lands;
            },
            //数据校验
            verify(){
                if(this.lands.length > 0){
                    try{
                    for(let i in this.lands){
                        let abl_ex1 = this.lands[i].abl_ex1;
                        let abl_ex2 = this.lands[i].abl_ex2;
                        let abl_ex3 = this.lands[i].abl_ex3;
                        let abl_ex4 = this.lands[i].abl_ex4;
                        let index=Number(i)+1;
                        if(!abl_ex1){
                            this.$message.warning("请填写第"+(index)+"行承包人姓名");
                            return false;
                        }
                        
                        if(abl_ex1){
                            let msg = isName(abl_ex1, "land.abl_ex1", index);
                            if(msg != true){
                                this.$message.warning("第" + index + "行承包人姓名有误，只能为汉字!");
                                return false;
                            }
                        }

                        if(!abl_ex2){
                            this.$message.warning("请填写第"+(index)+"行承包面积");
                            return false;
                        }

                        if(abl_ex2){
                            let msg = isNum(abl_ex2, "land.abl_ex2", index);
                            if(msg != true){
                                this.$message.warning("第" + index + "行承包面积有误!");
                                return false;
                            }
                        }

                        if(!abl_ex3){
                            this.$message.warning("请选择第"+(index)+"行土地类型");
                            return false;
                        }

                        if(abl_ex4){
                            let msg = isNum(abl_ex4, "land.abl_ex4", index);
                            if(msg != true){
                                this.$message.warning("第" + index + "行土地估值输入有误!");
                                return false;
                            }
                        }

                    }
                    }catch(e){
                        alert(e.message)
                        return false;
                    }
                }
                return true;
            }
        }
    }
</script>

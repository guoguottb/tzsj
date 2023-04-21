//示例代码
<template>
  <div>
    <div class="container">
      <div class="col-md-10 col-md-offset-1">
        <div class="page-header">
          <h3>招行度量指标体系</h3>
        </div>
        <div class="row">
          <div class="col-md-8 col-md-offset-2">
            <form class="form-horizontal row">
              <div class="col-md-4">
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      v-model="horizontal"
                    > 横排
                  </label>
                </div>
              </div>
              <div class="col-md-4">
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      v-model="collapsable"
                    > 竖排
                  </label>
                </div>
              </div>
              <div class="col-md-4">
                <div class="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      v-model="expandAll"
                      @change="expandChange"
                    > 显示所有项
                  </label>
                </div>
              </div>
              <p><br></p>
              <p><br></p>

            </form>
          </div>
        </div>
        <p><br></p>
        <div class="text-center">
          <vue2-org-tree name="test"
                         :data="data"
                         :horizontal="horizontal"
                         :collapsable="collapsable"
                         :label-class-name="labelClassName"
                         :render-content="renderContent"
                         @on-expand="onExpand"
                         @on-node-click="onNodeClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import roleService from "../../api/user/role-manage";
  export default {
    data() {
      return {
        data: {

        },
        horizontal: true,
        collapsable: true,
        expandAll: false


      };
    },
    created(){
      this.getRootData();
    },
    methods: {
      getRootData(){
        /*this.$http({
          url: this.$http.adornUrl('role/children'),
          method: 'get',
          params: this.$http.adornParams({
            parentId: 'rootId'
          },false)
        })*/
          roleService.getRoleChildren({parentId: 'rootId'}).then(({data}) => {
          let rootData = {};
          if(data.status === 0){
            rootData.id = data.data[0].roleId;
            rootData.label = data.data[0].name;
            rootData.children = [{}];
          }
          this.data = Object.assign({},rootData);
        })
      },
      labelClassName(data){
        return 'bg-sdfsdf'
      },
      renderContent(h, data) {
        return data.label;
      },
      onExpand(data) {
        if ("expand" in data) {
          data.expand = !data.expand;
          if (!data.expand && data.children) {
            this.collapse(data.children);
          }
        } else {
          this.$set(data, "expand", true);
        }
      },
      //点击选项执行的方法，可以用于跳转到其他链接，注意一定要写协议头
      onNodeClick(e, data) {
        //alert(data.label);
        // window.location.href=data.url;
      },
      collapse(list) {
        var _this = this;
        list.forEach(function(child) {
          if (child.expand) {
            child.expand = false;
          }
          child.children && _this.collapse(child.children);
        });
      },
      expandChange() {
        this.toggleExpand(this.data, this.expandAll);
      },
      toggleExpand(data, val) {
        var _this = this;
        if (Array.isArray(data)) {
          data.forEach(function(item) {
            _this.$set(item, "expand", val);
            if (item.children) {
              _this.toggleExpand(item.children, val);
            }
          });
        } else {
          this.$set(data, "expand", val);
          if (data.children) {
            _this.toggleExpand(data.children, val);
          }
        }
      }
    }
  };
</script>
<style type="text/css" scope>
  .org-tree-node-label {
    white-space: nowrap;
  }
  .bg-white {
    background-color: white;
  }
  .bg-orange {
    background-color: orange;
  }
  .bg-gold {
    background-color: gold;
  }
  .bg-gray {
    background-color: gray;
  }
  .bg-lightpink {
    background-color: lightpink;
  }
  .bg-chocolate {
    background-color: chocolate;
  }
  .bg-tomato {
    background-color: tomato;
  }
  .bg-sdfsdf{
    background-color: blue
  }
</style>

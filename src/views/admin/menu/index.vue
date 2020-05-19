<template>
  <div class="template_content">
    <div class="content_box">
      <!-- 操作 -->
      <div class="table_top">
        <a-button-group>
          <a-button icon="plus" type="primary" @click="addMenu('add')">{{$t('logistics.add')}}</a-button>
          <a-button icon="edit" type="primary" @click="editMenu('edit')">{{$t('logistics.editor')}}</a-button>
          <a-button icon="delete" type="primary" @click="delMenu('del')">{{$t('logistics.delete')}}</a-button>
        </a-button-group>
      </div>
      <div>
        <a-row>
          <a-col :span="4" class="col-h">
            <a-tree
              :treeData="menuTreeData"
              :replaceFields="menuReplaceFields"
              defaultExpandAll
              @select="onMenuCheck"
              checkStrictly
              showLine
            />
          </a-col>
          <a-col :span="10">
            <a-form :form="modalForm" @submit="modalHandleSubmit">
              <a-form-item
                :label="$t('parentId')"
                :label-col="{ span: 3 }"
                :wrapper-col="{ span: 21 }"
              >
                <a-input disabled v-decorator="['parentId']" :placeholder="$t('inpparentId')" />
              </a-form-item>
              <a-form-item
                :label="$t('menuId')"
                :label-col="{ span: 3 }"
                :wrapper-col="{ span: 21 }"
              >
                <a-input
                  v-decorator="['menuId', { rules: [{ required: true, message: this.$t('inpmenuId')  }] }]"
                  :placeholder="$t('inpmenuId')"
                />
              </a-form-item>
              <a-form-item :label="$t('name')" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
                <a-input
                  v-decorator="['name', { rules: [{ required: true, message: this.$t('inpname')  }] }]"
                  :placeholder="$t('inpname')"
                />
              </a-form-item>
              <a-form-item
                :label="$t('permission')"
                :label-col="{ span: 3 }"
                :wrapper-col="{ span: 21 }"
              >
                <a-input v-decorator="['permission']" :placeholder="$t('inppermission')" />
              </a-form-item>
              <a-form-item :label="$t('icon')" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
                <a-input v-decorator="['icon']" :placeholder="$t('inpicon')" />
              </a-form-item>
              <a-form-item :label="$t('type')" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
                <a-select
                  v-decorator="[
          'type',
          { rules: [{ required: true, message: this.$t('inptype') }] },
        ]"
                  :placeholder="$t('inptype')"
                >
                  <a-select-option value="0">{{$t('logistics.btn')}}</a-select-option>
                  <a-select-option value="1">{{$t('logistics.menu')}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item :label="$t('sort')" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
                <a-input v-decorator="['sort']" :placeholder="$t('inpsort')" />
              </a-form-item>
              <a-form-item
                :label="$t('component')"
                :label-col="{ span: 3 }"
                :wrapper-col="{ span: 21 }"
              >
                <a-input v-decorator="['component']" :placeholder="$t('inpcomponent')" />
              </a-form-item>
              <a-form-item :label="$t('path')" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
                <a-input v-decorator="['path']" :placeholder="$t('inppath')" />
              </a-form-item>
              <a-form-item v-show="btnShowType" :wrapper-col="{ span: 21, offset: 3 }">
                <a-button
                  type="primary"
                  html-type="submit"
                  class="btn_right_margin"
                >{{$t('logistics.save')}}</a-button>
                <a-button>{{$t('logistics.cancel')}}</a-button>
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>
<script>
// 导入接口
import {
  addObj,
  delObj,
  fetchMenuTree,
  getObj,
  putObj
} from "@/api/admin/menu";
import { disposereq } from "@/utils/util";
export default {
  data() {
    return {
      modalForm: this.$form.createForm(this, { name: "coordinated" }),
      menuTreeData: [],
      menuReplaceFields: {
        children: "children",
        title: "name",
        key: "id"
      },
      checkData: "",
      btnType: "",
      btnShowType: false
    };
  },
  // 创建完毕
  created() {
    this.importFontpack("admin/menu/");
    this.GetAllMenu();
  },
  // 即将更新渲染
  beforeUpdate() {
    this.importFontpack("admin/menu/");
  },
  methods: {
    // 获取所有菜单
    GetAllMenu() {
      fetchMenuTree()
        .then(res => {
          if (res.code == 0) {
            this.menuTreeData = res.data;
          } else {
            this.$message.info(err);
          }
        })
        .catch(err => {
          disposereq(this, err);
        });
    },
    // 菜单选中事件
    onMenuCheck(checkedKeys, info) {
      let row = info.selectedNodes[0].data.props;
      this.btnShowType = false;
      this.checkData = row;
      this.$nextTick(() => {
        this.modalForm.setFieldsValue({
          parentId: row.parentId,
          menuId: row.id,
          name: row.name,
          permission: row.permission,
          icon: row.icon,
          type: row.type,
          sort: row.keepAlive,
          component: row.component,
          path: row.path
        });
      });
    },
    // 添加菜单
    addMenu(type) {
      this.btnType = type;
      this.btnShowType = true;
      if (this.checkData == "") {
        this.$nextTick(() => {
          this.modalForm.setFieldsValue({
            parentId: -1
          });
        });
      } else {
        this.$nextTick(() => {
          this.modalForm.setFieldsValue({
            parentId: this.checkData.id,
            menuId: "",
            name: "",
            permission: "",
            icon: "",
            type: "",
            sort: "",
            component: "",
            path: ""
          });
        });
      }
    },
    // 编辑菜单
    editMenu(type) {
      this.btnType = type;
      if (this.checkData == "") {
        this.$message.info(this.$t("selecteditmenu"));
      } else {
        this.btnShowType = true;
      }
    },
    // 删除菜单
    delMenu(type) {
      this.btnType = type;
      this.btnShowType = false;
      if (this.checkData == "") {
        this.$message.info(this.$t("selectdeletemenu"));
      } else {
        delObj(this.checkData.id)
          .then(res => {
            if (res.code == 0) {
              this.GetAllMenu();
              this.$message.success(this.$t("logistics.deleteSuccess"));
            } else {
              this.$message.info(err);
            }
          })
          .catch(err => {
            this.$message.info(err);
          });
      }
    },
    // 提交事件
    modalHandleSubmit(e) {
      e.preventDefault();
      this.modalForm.validateFields((err, values) => {
        if (!err && this.btnType == "add") {
          addObj(values)
            .then(res => {
              if (res.code == 0) {
                this.GetAllMenu();
                this.$message.success(this.$t("logistics.addSuccess"));
              } else {
                this.$message.info(err);
              }
            })
            .catch(err => {
              this.$message.info(err);
            });
        } else if (!err && this.btnType == "edit") {
          putObj(values)
            .then(res => {
              if (res.code == 0) {
                this.GetAllMenu();
                this.$message.success(this.$t("logistics.editSuccess"));
              } else {
                this.$message.info(err);
              }
            })
            .catch(err => {
              this.$message.info(err);
            });
        }
      });
    }
  }
};
</script>
<style>
.template_content {
  background-color: #f0f2f5;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.content_box {
  width: 100%;
  background-color: #fff;
  padding: 14px;
}
.table_top {
  padding-bottom: 14px;
}
.btn_margin {
  margin: 0px 5px;
}
.btn_right_margin {
  margin-right: 10px;
}
.col-h{
  min-height: 400px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 1px;
}
</style>
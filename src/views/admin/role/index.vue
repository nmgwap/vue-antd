<template>
  <div class="template_content">
    <!-- 主体内容 -->
    <div class="content_box">
      <!-- 表格操作 -->
      <div class="table_top">
        <a-button
          icon="plus"
          type="primary"
          class="btn_right_margin"
          @click="showModal('')"
        >{{$t('logistics.new')}}</a-button>
      </div>
      <a-table
        :columns="columns"
        :dataSource="data"
        :loading="loading"
        :pagination="pagination"
        bordered
        size="small"
        @change="handleTableChange"
      >
        <template slot="action" slot-scope="text, record">
          <a-button
            icon="edit"
            type="primary"
            class="btn_margin"
            @click="showModal(record)"
          >{{$t('logistics.editor')}}</a-button>
          <a-button
            icon="delete"
            type="danger"
            class="btn_margin"
            @click="deleteRow({record})"
          >{{$t('logistics.delete')}}</a-button>
          <a-button
            icon="cluster"
            type="link"
            class="btn_margin"
            @click="menuAuthModal({record})"
          >{{$t('logistics.MenuPermissions')}}</a-button>
          <a-button
            icon="cluster"
            type="link"
            class="btn_margin"
            @click="deptAuthModal({record})"
          >{{$t('logistics.DepartmentPermission')}}</a-button>
        </template>
      </a-table>
    </div>
    <!-- 添加及编辑弹窗 -->
    <a-modal :title="modalTitle" v-model="modalVisible" :footer="null">
      <a-form :form="modalForm" @submit="modalHandleSubmit">
        <a-form-item :label="$t('unit')" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-cascader
            :options="deptOptions"
            :fieldNames="fieldNames"
            changeOnSelect
            :placeholder="$t('selectunit')"
            v-decorator="['unitId', { rules: [{ required: true, message: this.$t('selectunit') }] }]"
          />
        </a-form-item>
        <a-form-item :label="$t('roleName')" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input
            v-decorator="[
          'roleName',
        ]"
            :placeholder="$t('inproleName')"
          />
        </a-form-item>
        <a-form-item :label="$t('roleCode')" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input
            v-decorator="[
          'roleCode',
        ]"
            :placeholder="$t('inproleCode')"
          />
        </a-form-item>
        <a-form-item :label="$t('roleDesc')" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input
            v-decorator="[
          'roleDesc',
        ]"
            :placeholder="$t('inproleDesc')"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 19, offset: 5 }">
          <a-button type="primary" html-type="submit">{{$t('logistics.save')}}</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 菜单权限弹窗 -->
    <a-modal
      :title="$t('logistics.MenuPermissions')"
      v-model="menumodalVisible"
      :footer="null"
      destroyOnClose
    >
      <a-tree
        checkable
        :treeData="menuTreeData"
        :defaultCheckedKeys="menuDefaultCheckedKeys"
        :replaceFields="menuReplaceFields"
        defaultExpandAll
        @check="this.onMenuCheck"
      />
      <div class="btn-box">
        <a-button type="primary" @click="saveMenu">{{$t('logistics.save')}}</a-button>
      </div>
    </a-modal>
    <!-- 部门权限弹窗 -->
    <a-modal
      :title="$t('logistics.DepartmentPermission')"
      v-model="deptmodalVisible"
      :footer="null"
      destroyOnClose
    >
      <a-tree
        checkable
        :treeData="deptTreeData"
        :defaultCheckedKeys="deptDefaultCheckedKeys"
        :replaceFields="deptReplaceFields"
        defaultExpandAll
        @check="this.onDeptCheck"
      />
      <div class="btn-box">
        <a-button type="primary" @click="saveDept">{{$t('logistics.save')}}</a-button>
      </div>
    </a-modal>
  </div>
</template>
<script>
// 导入接口
import {
  addObj,
  delObj,
  fetchList,
  putObj,
  fetchRoleTree,
  permissionUpd
} from "@/api/admin/role";
import {
  getdept,
  fetchTree,
  getRoledept,
  saveRoledept
} from "@/api/admin/dept";
import { fetchMenuTree } from "@/api/admin/menu";
import { disposereq } from "@/utils/util";
let columnsCN = [
  {
    title: "角色名称",
    dataIndex: "roleName",
    align: "center"
  },
  {
    title: "角色标识",
    dataIndex: "roleCode",
    align: "center"
  },
  {
    title: "角色描述",
    dataIndex: "roleDesc",
    align: "center"
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    align: "center"
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];
let columnsEN = [
  {
    title: "Character name",
    dataIndex: "roleName",
    align: "center"
  },
  {
    title: "Role identification",
    dataIndex: "roleCode",
    align: "center"
  },
  {
    title: "Role description",
    dataIndex: "roleDesc",
    align: "center"
  },
  {
    title: "Creation time",
    dataIndex: "createTime",
    align: "center"
  },
  {
    title: "operation",
    key: "action",
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];
let columnsJA = [
  {
    title: "キャラクター名",
    dataIndex: "roleName",
    align: "center"
  },
  {
    title: "キャラクター表示",
    dataIndex: "roleCode",
    align: "center"
  },
  {
    title: "キャラクター記述",
    dataIndex: "roleDesc",
    align: "center"
  },
  {
    title: "創建時期",
    dataIndex: "createTime",
    align: "center"
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];
export default {
  data() {
    return {
      username: "",
      loading: true,
      searchPage: {
        current: 1,
        size: 10,
        username: ""
      },
      columns:
        localStorage.lang == "cn"
          ? columnsCN
          : localStorage.lang == "en"
          ? columnsEN
          : columnsJA,
      data: [],
      pagination: {
        showQuickJumper: true,
        showSizeChanger: true
      },
      modalVisible: false,
      modalTitle: this.$t("logistics.add"),
      modalForm: this.$form.createForm(this, { name: "coordinated" }),
      parameters: {
        roleName: "",
        roleCode: "",
        unitId: "",
        roleDesc: ""
      },
      deptOptions: [],
      roleList: "",
      rowData: {},
      fieldNames: { label: "name", value: "id", children: "children" },
      menumodalVisible: false,
      menuTreeData: [],
      menuDefaultCheckedKeys: [],
      menuReplaceFields: {
        children: "children",
        title: "name",
        key: "id"
      },
      deptmodalVisible: false,
      deptTreeData: [],
      deptDefaultCheckedKeys: [],
      deptReplaceFields: {
        children: "children",
        title: "name",
        key: "id"
      }
    };
  },
  // 创建完毕
  created() {
    this.importFontpack("admin/role/");
    this.getList(this.searchPage);
    this.getDept();
    this.GetAllMenu();
  },
  // 即将更新渲染
  beforeUpdate() {
    this.importFontpack("admin/role/");
  },
  methods: {
    // 获取用户
    getList(pageData) {
      fetchList(pageData)
        .then(res => {
          this.loading = false;
          if (res.code == 0) {
            this.data = res.data.records;
            const pager = { ...this.pagination };
            pager.current = res.data.current;
            pager.total = res.data.total;
            this.pagination = pager;
          } else {
            this.$message.info(err);
          }
        })
        .catch(err => {
          this.$message.info(err);
        });
    },
    // 获取所属部门
    getDept() {
      fetchTree()
        .then(res => {
          this.loading = false;
          if (res.code == 0) {
            this.deptOptions = res.data;
            this.deptTreeData = res.data;
          } else {
            this.$message.info(err);
          }
        })
        .catch(err => {
          this.$message.info(err);
        });
    },
    // 获取选中部门
    GetCheckRoledept(id) {
      getRoledept(id)
        .then(res => {
          if (res.code == 0) {
            this.deptDefaultCheckedKeys = res.data;
            this.deptmodalVisible = true;
          } else {
            this.$message.info(err);
          }
        })
        .catch(err => {
          this.$message.info(err);
        });
    },
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
          this.$message.info(err);
        });
    },
    // 获取选中菜单
    GetCheckMenu(id) {
      fetchRoleTree(id)
        .then(res => {
          this.menuDefaultCheckedKeys = res;
          this.menumodalVisible = true;
        })
        .catch(err => {
          this.$message.info(err);
        });
    },
    // 表格数据变化触发事件
    handleTableChange(pagination, filters, sorter) {
      const searchPage = { ...this.searchPage };
      searchPage.current = pagination.current;
      searchPage.size = pagination.pageSize;
      this.loading = true;
      this.getList(searchPage);
    },
    // 搜索事件
    handleSubmit() {
      const searchPage = { ...this.searchPage };
      this.loading = true;
      this.getList(searchPage);
    },
    // 显示对话框
    showModal(row) {
      this.modalVisible = true;
      // 判断添加或者编辑
      if (row == "") {
        this.modalTitle = this.$t("logistics.add");
        this.modalType = "add";
        this.$nextTick(() => {
          this.modalForm.setFieldsValue({
            roleName: "",
            roleCode: "",
            unitId: [],
            roleDesc: ""
          });
        });
      } else {
        this.modalTitle = this.$t("logistics.editor");
        this.modalType = "edit";
        let unitId = [];
        getdept(row.unitId).then(res => {
          let unitId = res.data.unitNo.split("|").map(Number);
          unitId.splice(0, 1);
          this.$nextTick(() => {
            this.modalForm.setFieldsValue({
              roleName: row.roleName,
              roleCode: row.roleCode,
              unitId: unitId,
              roleDesc: row.roleDesc
            });
            this.rowData = row;
          });
        });
      }
    },
    // 删除行数据
    deleteRow(row) {
      delObj(row.record.roleId)
        .then(res => {
          this.loading = false;
          if (res.code == 0) {
            this.$message.success(this.$t("logistics.deleteSuccess"));
            const searchPage = { ...this.searchPage };
            this.loading = true;
            this.getList(searchPage);
          } else {
            this.$message.info(err);
          }
        })
        .catch(err => {
          this.$message.info(err);
        });
    },
    // 对话框
    modalHandleSubmit(e) {
      e.preventDefault();
      this.modalForm.validateFields((err, values) => {
        if (!err && this.modalType == "add") {
          values.unitId = values.unitId[values.unitId.length - 1];
          addObj(values)
            .then(res => {
              if (res.code == 0) {
                this.modalVisible = false;
                this.$message.success(this.$t("logistics.addSuccess"));
                const searchPage = { ...this.searchPage };
                this.loading = true;
                this.getList(searchPage);
              } else {
                this.$message.info(err);
              }
            })
            .catch(err => {
              this.$message.info(err);
            });
        } else if (!err && this.modalType == "edit") {
          this.rowData.roleName = values.roleName;
          this.rowData.roleCode = values.roleCode;
          this.rowData.unitId = values.unitId[values.unitId.length - 1];
          this.rowData.roleDesc = values.roleDesc;
          putObj(this.rowData)
            .then(res => {
              if (res.code == 0) {
                this.modalVisible = false;
                this.$message.success(this.$t("logistics.editSuccess"));
                const searchPage = { ...this.searchPage };
                this.loading = true;
                this.getList(searchPage);
              } else {
                this.$message.info(err);
              }
            })
            .catch(err => {
              this.$message.info(err);
            });
        }
      });
    },
    // 显示菜单权限
    menuAuthModal(row) {
      this.GetCheckMenu(row.record.roleId);
      this.roleId = row.record.roleId;
    },
    onMenuCheck(checkedKeys, info) {
      this.menuDefaultCheckedKeys = checkedKeys;
    },
    // 保存菜单
    saveMenu() {
      permissionUpd(this.roleId, this.menuDefaultCheckedKeys.toString())
        .then(res => {
          if (res.code == 0) {
            this.menumodalVisible = false;
            this.$message.success(this.$t("logistics.success"));
          } else {
            this.$message.info(err);
          }
        })
        .catch(err => {
          this.$message.info(err);
        });
    },
    // 显示部门权限
    deptAuthModal(row) {
      this.GetCheckRoledept(row.record.roleId);
      this.roleId = row.record.roleId;
    },
    onDeptCheck(checkedKeys, info) {
      this.deptDefaultCheckedKeys = checkedKeys;
    },
    // 保存菜单
    saveDept() {
      saveRoledept({
        roleId: this.roleId,
        deptIds: this.deptDefaultCheckedKeys
      })
        .then(res => {
          if (res.code == 0) {
            this.deptmodalVisible = false;
            this.$message.success(this.$t("logistics.success"));
          } else {
            this.$message.info(err);
          }
        })
        .catch(err => {
          this.$message.info(err);
        });
    }
  }
};
</script>
<style>
.search_box {
  width: 100%;
  box-sizing: border-box;
  padding: 14px;
  background-color: #fff;
}
.template_content {
  background-color: #f0f2f5;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.content_box {
  width: 100%;
  background-color: #fff;
  margin-top: 10px;
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
.btn-box {
  margin-top: 20px;
}
</style>
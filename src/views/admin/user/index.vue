<template>
  <div class="template_content">
    <!-- 搜索 -->
    <div class="search_box">
      <a-form layout="inline">
        <a-form-item :label="$t('logistics.search')+'：'">
          <a-input v-model="searchPage.username" :placeholder="$t('username')" allowClear></a-input>
        </a-form-item>
        <a-form-item>
          <a-button icon="search" type="primary" @click="handleSubmit">{{$t('logistics.search')}}</a-button>
        </a-form-item>
      </a-form>
    </div>
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
        <!-- 角色 -->
        <span slot="roleList" slot-scope="roleList">
          <a-tag v-for="role in roleList" :key="role.roleId" color="purple">{{role.roleName}}</a-tag>
        </span>
        <!-- 状态 -->
        <span slot="lockFlag" slot-scope="lockFlag">
          <a-tag
            :key="lockFlag"
            :color="lockFlag == '0'?'#108ee9':'#f50'"
          >{{lockFlag == '0'?"有效":"锁定"}}</a-tag>
        </span>
        <!-- 操作 -->
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
        </template>
      </a-table>
    </div>
    <!-- 弹窗 -->
    <a-modal :title="modalTitle" v-model="modalVisible" :footer="null">
      <a-form :form="modalForm" @submit="modalHandleSubmit">
        <a-form-item :label="$t('username')" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input
            v-decorator="['username', { rules: [{ required: true, message: this.$t('inpusername') }] }]"
            :placeholder="$t('inpusername')"
          />
        </a-form-item>
        <a-form-item :label="$t('password')" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input
            v-decorator="['password', { rules: [{ required: true, message: this.$t('inppassword') }] }]"
            :placeholder="$t('inppassword')"
          />
        </a-form-item>
        <a-form-item :label="$t('dept')" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-cascader
            :options="deptOptions"
            :fieldNames="fieldNames"
            changeOnSelect
            :placeholder="$t('selectdept')"
            v-decorator="['deptId', { rules: [{ required: true, message: this.$t('selectdept') }] }]"
          />
        </a-form-item>
        <a-form-item :label="$t('phone')" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input v-decorator="[
          'phone',
        ]" :placeholder="$t('inpphone')" />
        </a-form-item>
        <a-form-item :label="$t('role')" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-select
            v-decorator="[
          'role',
          { rules: [{ required: true, message: this.$t('selectrole')}] },
        ]"
            :placeholder="$t('selectrole')"
            mode="multiple"
          >
            <a-select-option
              v-for="item in roleList"
              :key="item.roleId"
              :value="item.roleId"
            >{{item.roleName}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="$t('lockFlag')" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-select
            v-decorator="[
          'lockFlag',
          { rules: [{ required: true, message: this.$t('selectlockFlag') }] },
        ]"
            :placeholder="$t('selectlockFlag')"
          >
            <a-select-option value="0">{{$t('logistics.effective')}}</a-select-option>
            <a-select-option value="9">{{$t('logistics.lock')}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 19, offset: 5 }">
          <a-button type="primary" html-type="submit">{{$t('logistics.save')}}</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
// 导入接口
import { addObj, delObj, fetchList, getObj, putObj } from "@/api/admin/user";
import { deptRoleList } from "@/api/admin/role";
import { fetchTree } from "@/api/admin/dept";
import { disposereq } from "@/utils/util";
let columnsCN = [
  {
    title: "用户名",
    dataIndex: "username",
    align: "center"
  },
  {
    title: "手机号",
    dataIndex: "phone",
    align: "center"
  },
  {
    title: "角色",
    dataIndex: "roleList",
    align: "center",
    scopedSlots: { customRender: "roleList" }
  },
  {
    title: "部门",
    dataIndex: "deptName",
    align: "center"
  },
  {
    title: "状态",
    dataIndex: "lockFlag",
    align: "center",
    scopedSlots: { customRender: "lockFlag" }
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
    title: "user name",
    dataIndex: "username",
    align: "center"
  },
  {
    title: "Mobile phone no.",
    dataIndex: "phone",
    align: "center"
  },
  {
    title: "role",
    dataIndex: "role",
    align: "center",
    scopedSlots: { customRender: "roleList" }
  },
  {
    title: "department",
    dataIndex: "deptName",
    align: "center"
  },
  {
    title: "state",
    dataIndex: "lockFlag",
    align: "center",
    scopedSlots: { customRender: "lockFlag" }
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
    title: "ユーザー名",
    dataIndex: "username",
    align: "center"
  },
  {
    title: "携帯電話番号",
    dataIndex: "phone",
    align: "center"
  },
  {
    title: "役",
    dataIndex: "role",
    align: "center",
    scopedSlots: { customRender: "roleList" }
  },
  {
    title: "省庁",
    dataIndex: "deptName",
    align: "center"
  },
  {
    title: "状态",
    dataIndex: "lockFlag",
    align: "center",
    scopedSlots: { customRender: "lockFlag" }
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
        username: "",
        password: "",
        deptId: [],
        phone: "",
        role: [],
        deptName: "",
        lockFlag: ""
      },
      deptOptions: [],
      roleList: "",
      rowData: {},
      fieldNames: { label: "name", value: "id", children: "children" }
    };
  },
  // 创建完毕
  created() {
    this.importFontpack("admin/user/");
    this.getList(this.searchPage);
    this.getDept();
    this.getdeptRoleList();
  },
  // 即将更新渲染
  beforeUpdate() {
    this.importFontpack("admin/user/");
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
          disposereq(this, err);
        });
    },
    // 获取所属部门
    getDept() {
      fetchTree()
        .then(res => {
          this.loading = false;
          if (res.code == 0) {
            this.deptOptions = res.data;
          } else {
            this.$message.info(err);
          }
        })
        .catch(err => {
          disposereq(this, err);
        });
    },
    // 获取角色
    getdeptRoleList() {
      deptRoleList()
        .then(res => {
          this.loading = false;
          if (res.code == 0) {
            this.roleList = res.data;
          } else {
            this.$message.info(err);
          }
        })
        .catch(err => {
          disposereq(this, err);
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
            username: "",
            password: "",
            deptId: [],
            phone: "",
            role: [],
            deptName: "",
            lockFlag: ""
          });
        });
      } else {
        this.modalTitle = this.$t("logistics.editor");
        this.modalType = "edit";
        // 获取角色liebiao
        let role = [];
        for (let i = 0; i < row.roleList.length; i++) {
          role.push(row.roleList[i].roleId);
        }
        let deptId = row.unitNo.split("|").map(Number);
        deptId.splice(0, 1);
        this.$nextTick(() => {
          this.modalForm.setFieldsValue({
            username: row.username,
            password: row.password,
            deptId: deptId,
            phone: row.phone,
            role: role,
            deptName: row.deptName,
            lockFlag: row.lockFlag
          });
          this.rowData = row;
        });
      }
    },
    // 删除行数据
    deleteRow(row) {
      delObj(row.record.userId)
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
          disposereq(this, err);
        });
    },
    // 对话框
    modalHandleSubmit(e) {
      e.preventDefault();
      this.modalForm.validateFields((err, values) => {
        if (!err && this.modalType == "add") {
          values.deptId = values.deptId[values.deptId.length - 1];
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
          this.rowData.username = values.username;
          this.rowData.password = values.password;
          this.rowData.deptId = values.deptId[values.deptId.length - 1];
          this.rowData.phone = values.phone;
          this.rowData.role = values.role;
          this.rowData.deptName = values.deptName;
          this.rowData.lockFlag = values.lockFlag;
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
</style>
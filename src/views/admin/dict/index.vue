<template>
  <div class="template_content">
    <!-- 搜索 -->
    <div class="search_box">
      <a-form layout="inline">
        <a-form-item :label="$t('logistics.search')+'：'">
          <a-input v-model="searchPage.type" :placeholder="$t('type')" allowClear></a-input>
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
        <a-form-item :label="$t('value')" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input
            v-decorator="['value', { rules: [{ required: true, message: this.$t('inpvalue') }] }]"
            :placeholder="$t('inpvalue')"
          />
        </a-form-item>
        <a-form-item :label="$t('label')" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input
            v-decorator="['label', { rules: [{ required: true, message: this.$t('inplabel') }] }]"
            :placeholder="$t('inplabel')"
          />
        </a-form-item>
        <a-form-item :label="$t('type')" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input
            v-decorator="['type', { rules: [{ required: true, message: this.$t('inptype') }] }]"
            :placeholder="$t('inptype')"
          />
        </a-form-item>
        <a-form-item
          :label="$t('description')"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 19 }"
        >
          <a-input
            v-decorator="['description', { rules: [{ required: true, message: this.$t('inpdescription') }] }]"
            :placeholder="$t('inpdescription')"
          />
        </a-form-item>
        <a-form-item :label="$t('sort')" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input
            v-decorator="['sort', { rules: [{ required: true, message: this.$t('inpsort') }] }]"
            :placeholder="$t('inpsort')"
          />
        </a-form-item>
        <a-form-item :label="$t('remarks')" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input v-decorator="[
          'remarks',
        ]" :placeholder="$t('inpremarks')" />
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
import { addObj, delObj, fetchList, getObj, putObj } from "@/api/admin/dict";
import { disposereq } from "@/utils/util";
let columnsCN = [
  {
    title: "数据值",
    dataIndex: "value",
    align: "center"
  },
  {
    title: "标签名",
    dataIndex: "label",
    align: "center"
  },
  {
    title: "类型",
    dataIndex: "type",
    align: "center"
  },
  {
    title: "描述",
    dataIndex: "description",
    align: "center"
  },
  {
    title: "排序",
    dataIndex: "sort",
    align: "center"
  },
  {
    title: "备注信息",
    dataIndex: "remarks",
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
    title: "data value",
    dataIndex: "value",
    align: "center"
  },
  {
    title: "Tag name",
    dataIndex: "label",
    align: "center"
  },
  {
    title: "类型",
    dataIndex: "type",
    align: "center"
  },
  {
    title: "describe",
    dataIndex: "description",
    align: "center"
  },
  {
    title: "sort",
    dataIndex: "sort",
    align: "center"
  },
  {
    title: "Note information",
    dataIndex: "remarks",
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
    title: "データ値",
    dataIndex: "value",
    align: "center"
  },
  {
    title: "タグ名",
    dataIndex: "label",
    align: "center"
  },
  {
    title: "タイプ",
    dataIndex: "type",
    align: "center"
  },
  {
    title: "描写",
    dataIndex: "description",
    align: "center"
  },
  {
    title: "序列",
    dataIndex: "sort",
    align: "center"
  },
  {
    title: "備考情報",
    dataIndex: "remarks",
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
      type: "",
      loading: true,
      searchPage: {
        current: 1,
        size: 10
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
        deptId: "",
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
    this.importFontpack("admin/dict/");
    this.getList(this.searchPage);
  },
  // 即将更新渲染
  beforeUpdate() {
    this.importFontpack("admin/dict/");
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
            value: "",
            label: "",
            type: "",
            description: "",
            sort: "",
            remarks: ""
          });
        });
      } else {
        this.modalTitle = this.$t("logistics.editor");
        this.modalType = "edit";
        this.rowData = row;
        this.$nextTick(() => {
          this.modalForm.setFieldsValue({
            value: row.value,
            label: row.label,
            type: row.type,
            description: row.description,
            sort: row.sort,
            remarks: row.remarks
          });
        });
      }
    },
    // 删除行数据
    deleteRow(row) {
      delObj(row.record)
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
          this.rowData.id = this.rowData.id;
          this.rowData.value = values.value;
          this.rowData.label = values.label;
          this.rowData.type = values.type;
          this.rowData.description = values.description;
          this.rowData.sort = values.sort;
          this.rowData.remarks = values.remarks;
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
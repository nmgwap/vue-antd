<template>
  <div class="template_content">
    <!-- 搜索 -->
    <div class="search_box">
      <a-form layout="inline">
        <a-form-item :label="$t('logistics.search')+'：'">
          <a-input v-model="searchPage.tableName" :placeholder="$t('tableName')" allowClear></a-input>
        </a-form-item>
        <a-form-item>
          <a-button icon="search" type="primary" @click="handleSubmit">{{$t('logistics.search')}}</a-button>
        </a-form-item>
      </a-form>
    </div>
    <!-- 主体内容 -->
    <div class="content_box">
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
            icon="download"
            type="primary"
            class="btn_margin"
            @click="showModal(record)"
          >{{$t('logistics.generate')}}</a-button>
        </template>
      </a-table>
    </div>
    <!-- 弹窗 -->
    <a-modal :title="modalTitle" v-model="modalVisible" :footer="null">
      <a-form :form="modalForm" @submit="modalHandleSubmit">
        <a-form-item :label="$t('tableName')" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input disabled="disabled" v-decorator="['tableName']" />
        </a-form-item>
        <a-form-item
          :label="$t('packageName')"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 19 }"
        >
          <a-input v-decorator="['packageName']" :placeholder="$t('emp')" />
        </a-form-item>
        <a-form-item :label="$t('author')" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input v-decorator="['author']" :placeholder="$t('emp')" />
        </a-form-item>
        <a-form-item :label="$t('moduleName')" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input v-decorator="['moduleName']" :placeholder="$t('emp')" />
        </a-form-item>
        <a-form-item
          :label="$t('tablePrefix')"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 19 }"
        >
          <a-input v-decorator="['tablePrefix']" :placeholder="$t('emp')" />
        </a-form-item>
        <a-form-item :label="$t('comments')" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input v-decorator="['comments']" :placeholder="$t('emp')" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 19, offset: 5 }">
          <a-button type="primary" html-type="submit">{{$t('logistics.generate')}}</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
// 导入接口
import { fetchList, handleDown } from "@/api/admin/gen";
import { disposereq } from "@/utils/util";
let columnsCN = [
  {
    title: "表名称",
    dataIndex: "tableName",
    align: "center"
  },
  {
    title: "表注释",
    dataIndex: "tableComment",
    align: "center"
  },
  {
    title: "索引",
    dataIndex: "engine",
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
    title: "user db host",
    dataIndex: "tableName",
    align: "center"
  },
  {
    title: "Table annotation",
    dataIndex: "tableComment",
    align: "center"
  },
  {
    title: "index",
    dataIndex: "engine",
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
    title: "表名称",
    dataIndex: "tableName",
    align: "center"
  },
  {
    title: "表注釈",
    dataIndex: "tableComment",
    align: "center"
  },
  {
    title: "索引",
    dataIndex: "engine",
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
      rowData: {},
      logType: [],
      loading: true,
      searchPage: {
        current: 1,
        tableName: "",
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
      modalTitle: this.$t("logistics.generate"),
      modalForm: this.$form.createForm(this, { name: "coordinated" })
    };
  },
  // 创建完毕
  created() {
    this.importFontpack("admin/gen/");
    this.getList(this.searchPage);
  },
  // 即将更新渲染
  beforeUpdate() {
    this.importFontpack("admin/gen/");
  },
  methods: {
    // 获取日志
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
      this.$nextTick(() => {
        this.modalForm.setFieldsValue({
          tableName: row.tableName,
          packageName: "",
          author: "",
          moduleName: "",
          tablePrefix: "",
          comments: ""
        });
      });
      this.rowData = row;
    },
    // 对话框
    modalHandleSubmit(e) {
      e.preventDefault();
      this.modalForm.validateFields((err, values) => {
        if (!err) {
          handleDown(values)
            .then(response => {
              setTimeout(() => {
                this.modalVisible = false;
              }, 1000);
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
<template>
  <div class="template_content">
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
            icon="eye"
            type="primary"
            class="btn_margin"
            @click="showModal(record)"
          >{{$t('logistics.check')}}</a-button>
          <a-button
            icon="delete"
            type="danger"
            class="btn_margin"
            @click="deleteRow({record})"
          >{{$t('logistics.delete')}}</a-button>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
// 导入接口
import { delObj, fetchList } from "@/api/admin/token";
import { disposereq } from "@/utils/util";
let columnsCN = [
  {
    title: "用户ID",
    dataIndex: "user_id",
    align: "center"
  },
  {
    title: "用户名",
    dataIndex: "username",
    align: "center"
  },
  {
    title: "令牌",
    dataIndex: "access_token",
    align: "center"
  },
  {
    title: "类型",
    dataIndex: "token_type",
    align: "center"
  },
  {
    title: "过期时间",
    dataIndex: "expires_in",
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
    title: "user ID",
    dataIndex: "user_id",
    align: "center"
  },
  {
    title: "user name",
    dataIndex: "username",
    align: "center"
  },
  {
    title: "token",
    dataIndex: "access_token",
    align: "center"
  },
  {
    title: "type",
    dataIndex: "token_type",
    align: "center"
  },
  {
    title: "Expiration time",
    dataIndex: "expires_in",
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
    title: "ユーザーID",
    dataIndex: "user_id",
    align: "center"
  },
  {
    title: "ユーザー名",
    dataIndex: "username",
    align: "center"
  },
  {
    title: "令牌",
    dataIndex: "access_token",
    align: "center"
  },
  {
    title: "タイプ",
    dataIndex: "token_type",
    align: "center"
  },
  {
    title: "期限切れ時間。",
    dataIndex: "expires_in",
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
      logType: [],
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
      modalTitle: "添加",
      modalForm: this.$form.createForm(this, { name: "coordinated" })
    };
  },
  // 创建完毕
  created() {
    this.importFontpack("admin/token/");
    this.getList(this.searchPage);
  },
  // 即将更新渲染
  beforeUpdate() {
    this.importFontpack("admin/token/");
  },
  methods: {
    // 获取令牌列表
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
<template>
  <div class="template_content">
    <!-- 搜索 -->
    <div class="search_box">
      <a-form layout="inline">
        <a-form-item :label="$t('logistics.search')+'：'">
          <a-select
            v-model="searchPage.type"
            allowClear
            :placeholder="$t('selecttype')"
            style="width: 120px"
          >
            <a-select-option
              v-for="item in logType"
              :key="item.label"
              :value="item.remarks"
            >{{item.label}}</a-select-option>
          </a-select>
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
    <!-- 弹窗 -->
    <a-modal :title="modalTitle" v-model="modalVisible" :footer="null">
      <a-form :form="modalForm">
        <a-form-item :label="$t('type')" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input v-decorator="['type']" />
        </a-form-item>
        <a-form-item :label="$t('title')" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input v-decorator="['title']" />
        </a-form-item>
        <a-form-item :label="$t('remoteAddr')" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input v-decorator="['remoteAddr']" />
        </a-form-item>
        <a-form-item :label="$t('method')" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input v-decorator="['method']" />
        </a-form-item>
        <a-form-item :label="$t('serviceId')" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input v-decorator="['serviceId']" />
        </a-form-item>
        <a-form-item :label="$t('time')" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input v-decorator="['time']" />
        </a-form-item>
        <a-form-item :label="$t('createTime')" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input v-decorator="['createTime']" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
// 导入接口
import { addObj, delObj, fetchList, putObj } from "@/api/admin/log";
import { remote } from "@/api/admin/dict";
import { disposereq } from "@/utils/util";
let columnsCN = [
  {
    title: "类型",
    dataIndex: "type",
    align: "center"
  },
  {
    title: "标题",
    dataIndex: "title",
    align: "center"
  },
  {
    title: "IP地址",
    dataIndex: "remoteAddr",
    align: "center"
  },
  {
    title: "请求方式",
    dataIndex: "method",
    align: "center"
  },
  {
    title: "客户端",
    dataIndex: "serviceId",
    align: "center"
  },
  {
    title: "请求时间",
    dataIndex: "time",
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
    title: "type",
    dataIndex: "type",
    align: "center"
  },
  {
    title: "title",
    dataIndex: "title",
    align: "center"
  },
  {
    title: "IP Address",
    dataIndex: "remoteAddr",
    align: "center"
  },
  {
    title: "Request way",
    dataIndex: "method",
    align: "center"
  },
  {
    title: "client",
    dataIndex: "serviceId",
    align: "center"
  },
  {
    title: "Request time",
    dataIndex: "time",
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
    title: "タイプ",
    dataIndex: "type",
    align: "center"
  },
  {
    title: "タイトル",
    dataIndex: "title",
    align: "center"
  },
  {
    title: "IPアドレス",
    dataIndex: "remoteAddr",
    align: "center"
  },
  {
    title: "請求方式",
    dataIndex: "method",
    align: "center"
  },
  {
    title: "クライアント",
    dataIndex: "serviceId",
    align: "center"
  },
  {
    title: "リクエストタイム",
    dataIndex: "time",
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
      logType: [],
      type: "",
      loading: true,
      searchPage: {
        current: 1,
        descs: "create_time",
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
      modalTitle: this.$t("logistics.check"),
      modalForm: this.$form.createForm(this, { name: "coordinated" })
    };
  },
  // 创建完毕
  created() {
    this.importFontpack("admin/log/");
    this.getList(this.searchPage);
    this.getLogType("log_type");
  },
  // 即将更新渲染
  beforeUpdate() {
    this.importFontpack("admin/log/");
  },
  methods: {
    // 获取 日志类型
    getLogType(type) {
      remote(type)
        .then(res => {
          this.loading = false;
          if (res.code == 0) {
            this.logType = res.data;
          } else {
            this.$message.info(err);
          }
        })
        .catch(err => {
          disposereq(this, err);
        });
    },
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
          type: row.type,
          title: row.title,
          remoteAddr: row.remoteAddr,
          method: row.method,
          serviceId: row.serviceId,
          time: row.time,
          createTime: row.createTime
        });
      });
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
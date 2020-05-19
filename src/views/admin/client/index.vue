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
        <!-- 状态 -->
        <span slot="autoapprove" slot-scope="autoapprove">
          <a-tag
            :key="autoapprove"
            :color="autoapprove == 'true'?'#108ee9':'#f50'"
          >{{autoapprove == 'true'?"是":"否"}}</a-tag>
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
        <a-form-item :label="$t('clientId')" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input
            v-decorator="['clientId', { rules: [{ required: true, message: this.$t('inpclientId') }] }]"
            :placeholder="$t('inpclientId')"
          />
        </a-form-item>
        <a-form-item
          :label="$t('clientSecret')"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 19 }"
        >
          <a-input
            v-decorator="['clientSecret', { rules: [{ required: true, message: this.$t('xinpclientSecretxx') }] }]"
            :placeholder="$t('xinpclientSecretxx')"
          />
        </a-form-item>
        <a-form-item :label="$t('scope')" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-input
            v-decorator="['scope', { rules: [{ required: true, message: this.$t('inpscope') }] }]"
            :placeholder="$t('inpscope')"
          />
        </a-form-item>
        <a-form-item
          :label="$t('authorizedGrantTypes')"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 19 }"
        >
          <a-input
            v-decorator="['authorizedGrantTypes', { rules: [{ required: true, message: this.$t('inpauthorizedGrantTypes') }] }]"
            :placeholder="$t('inpauthorizedGrantTypes')"
          />
        </a-form-item>
        <a-form-item
          :label="$t('webServerRedirectUri')"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 19 }"
        >
          <a-input
            v-decorator="['webServerRedirectUri']"
            :placeholder="$t('inpwebServerRedirectUri')"
          />
        </a-form-item>
        <a-form-item
          :label="$t('authorities')"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 19 }"
        >
          <a-input
            v-decorator="[
          'authorities',
        ]"
            :placeholder="$t('inpauthorities')"
          />
        </a-form-item>
        <a-form-item
          :label="$t('autoapprove')"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 19 }"
        >
          <a-select
            v-decorator="[
          'autoapprove',
          { rules: [{ required: true, message: this.$t('selectautoapprove') }] },
        ]"
            :placeholder="$t('selectautoapprove')"
          >
            <a-select-option value="true">{{$t('logistics.is')}}</a-select-option>
            <a-select-option value="9">{{$t('logistics.no')}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          :label="$t('accessTokenValidity')"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 19 }"
        >
          <a-input
            v-decorator="[
          'accessTokenValidity',
        ]"
            :placeholder="$t('inpaccessTokenValidity')"
          />
        </a-form-item>
        <a-form-item
          :label="$t('refreshTokenValidity')"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 19 }"
        >
          <a-input
            v-decorator="[
          'refreshTokenValidity',
        ]"
            :placeholder="$t('inprefreshTokenValidity')"
          />
        </a-form-item>
        <a-form-item
          :label="$t('additionalInformation')"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 19 }"
        >
          <a-input
            v-decorator="[
          'additionalInformation',
        ]"
            :placeholder="$t('inpadditionalInformation')"
          />
        </a-form-item>
        <a-form-item
          :label="$t('resourceIds')"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 19 }"
        >
          <a-input
            v-decorator="[
          'resourceIds',
        ]"
            :placeholder="$t('inpresourceIds')"
          />
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
import { addObj, delObj, fetchList, getObj, putObj } from "@/api/admin/client";
import { disposereq } from "@/utils/util";
let columnsCN = [
  {
    title: "编号",
    dataIndex: "clientId",
    align: "center"
  },
  {
    title: "密钥",
    dataIndex: "clientSecret",
    align: "center"
  },
  {
    title: "域",
    dataIndex: "scope",
    align: "center"
  },
  {
    title: "授权模式",
    dataIndex: "authorizedGrantTypes",
    align: "center"
  },

  {
    title: "自动放行",
    dataIndex: "autoapprove",
    align: "center",
    scopedSlots: { customRender: "autoapprove" }
  },
  {
    title: "令牌时效",
    dataIndex: "accessTokenValidity",
    align: "center"
  },
  {
    title: "刷新时效",
    dataIndex: "refreshTokenValidity",
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
    title: "Serial number",
    dataIndex: "clientId",
    align: "center"
  },
  {
    title: "key",
    dataIndex: "clientSecret",
    align: "center"
  },
  {
    title: "domain",
    dataIndex: "scope",
    align: "center"
  },
  {
    title: "Authorization model",
    dataIndex: "authorizedGrantTypes",
    align: "center"
  },

  {
    title: "Automatic release",
    dataIndex: "autoapprove",
    align: "center",
    scopedSlots: { customRender: "autoapprove" }
  },
  {
    title: "token aging",
    dataIndex: "accessTokenValidity",
    align: "center"
  },
  {
    title: "Refresh the aging",
    dataIndex: "refreshTokenValidity",
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
    title: "番号",
    dataIndex: "clientId",
    align: "center"
  },
  {
    title: "鍵",
    dataIndex: "clientSecret",
    align: "center"
  },
  {
    title: "域",
    dataIndex: "scope",
    align: "center"
  },
  {
    title: "ライセンスモデル",
    dataIndex: "authorizedGrantTypes",
    align: "center"
  },

  {
    title: "自動放出",
    dataIndex: "autoapprove",
    align: "center",
    scopedSlots: { customRender: "autoapprove" }
  },
  {
    title: "トークン時効",
    dataIndex: "accessTokenValidity",
    align: "center"
  },
  {
    title: "時効を更新する",
    dataIndex: "refreshTokenValidity",
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
    this.importFontpack("admin/client/");
    this.getList(this.searchPage);
  },
  // 即将更新渲染
  beforeUpdate() {
    this.importFontpack("admin/client/");
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
            clientId: "",
            clientSecret: "",
            scope: "",
            authorizedGrantTypes: "",
            webServerRedirectUri: "",
            authorities: "",
            autoapprove: "",
            accessTokenValidity: "",
            refreshTokenValidity: "",
            additionalInformation: "",
            resourceIds: ""
          });
        });
      } else {
        this.modalTitle = this.$t("logistics.editor");
        this.modalType = "edit";
        this.rowData = row;
        this.$nextTick(() => {
          this.modalForm.setFieldsValue({
            clientId: row.clientId,
            clientSecret: row.clientSecret,
            scope: row.scope,
            authorizedGrantTypes: row.authorizedGrantTypes,
            webServerRedirectUri: row.webServerRedirectUri,
            authorities: row.authorities,
            autoapprove: row.autoapprove,
            accessTokenValidity: row.accessTokenValidity,
            refreshTokenValidity: row.refreshTokenValidity,
            additionalInformation: row.additionalInformation,
            resourceIds: row.resourceIds
          });
        });
      }
    },
    // 删除行数据
    deleteRow(row) {
      delObj(row.record.clientId)
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
          putObj(values)
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
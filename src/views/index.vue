<template>
  <a-layout class="layoutbox" id="components-layout-demo-custom-trigger">
    <!-- 左侧菜单 -->
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo">{{collapsed?"admin":"管理云平台"}}</div>
      <a-menu
        theme="dark"
        mode="inline"
        :defaultSelectedKeys="['1']"
        @click="selectItem"
        :selectedKeys="[$route.path]"
      >
        <a-sub-menu v-for="item in menu" :key="item.path">
          <span slot="title">
            <i class="iconfont" :class="item.icon"></i>
            <span v-show="!collapsed">{{item.name}}</span>
          </span>
          <a-menu-item v-for="childrenitem in item.children" :key="childrenitem.showPath">
            <i class="iconfont" :class="childrenitem.icon"></i>
            <span>{{childrenitem.name}}</span>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <!-- 页面整体头部导航 -->
      <a-layout-header class="headbox" style="background: #fff; padding: 0">
        <!-- 左侧展示与隐藏 -->
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
        <div class="user-head">
          <!-- 切换语言 -->
          <div class="toggle">
            <a-select :defaultValue="defaultValue" @change="handleChange">
              <a-select-option value="cn">中文</a-select-option>
              <a-select-option value="en">English</a-select-option>
              <a-select-option value="ja">日本語</a-select-option>
            </a-select>
          </div>
          <!-- 用户信息 -->
          <a-dropdown>
            <a class="ant-dropdown-link" href="#">
              {{UserInfo.username}}
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item @click="headClick('home')">
                <i class="iconfont iconicon_huabanfuben"></i>
                <span>{{$t('logistics.index')}}</span>
              </a-menu-item>
              <a-menu-item @click="headClick('msg')">
                <i class="iconfont icongerenzhongxin"></i>
                <span>{{$t('logistics.PersonalInformation')}}</span>
              </a-menu-item>
              <a-menu-item @click="headClick('quit')">
                <i class="iconfont icontuichu2"></i>
                <span>{{$t('logistics.LogOut')}}</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </a-layout-header>
      <!-- 中间主体部分 -->
      <a-layout-content
        :style="{ margin: '10px 10px', padding: '0px', background: '#fff', minHeight: '280px' }"
      >
        <router-view class="avue-view" />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { GetMenu } from "../api/admin/token";
import { disposereq } from "@/utils/util";
export default {
  data() {
    return {
      collapsed: false,
      menu: [],
      UserInfo: {},
      defaultValue: localStorage.lang
    };
  },
  created() {
    this.getMenu();
    //  获取用户信息
    this.UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
  },
  methods: {
    // 获取菜单
    getMenu() {
      GetMenu()
        .then(res => {
          if (res.code == 0) {
            this.formatData(
              localStorage.lang == "cn"
                ? res.data.cn
                : localStorage.lang == "en"
                ? res.data.en
                : res.data.ja
            );
          } else {
            this.$message.info(err);
          }
        })
        .catch(err => {
          disposereq(this, err);
        });
    },
    // 菜单点击事件
    selectItem(item) {
      this.$router.push({
        path: item.key
      });
    },
    // 由于数据格式不符合，需要对数据进行处理
    formatData(data) {
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].children.length; j++) {
          data[i].children[j].showPath =
            data[i].path + "/" + data[i].children[j].path;
        }
      }
      this.menu = data;
    },
    headClick(type) {
      if (type == "home") {
        this.$router.push({
          path: "/index"
        });
      } else if (type == "msg") {
      } else {
        localStorage.removeItem("token");
        this.$router.push({
          path: "/login"
        });
      }
    },
    // 切换多语言
    handleChange(val) {
      this.$root.Bus.$emit("switchLanguage", val);
    }
  }
};
</script>
<style>
.layoutbox {
  height: 100%;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  margin: 16px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
}
.headbox {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.iconfont {
  font-size: 14px !important;
  margin-right: 5px;
}
.toggle {
  display: inline-block;
  box-sizing: border-box;
  padding-right: 20px;
}
.user-head {
  display: inline-block;
  box-sizing: border-box;
  padding-right: 20px;
}
</style>
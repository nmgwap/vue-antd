/**
* app
*/ 
<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-locale-provider>
</template>
<script>
import cn from "ant-design-vue/lib/locale-provider/zh_CN";
import en from "ant-design-vue/lib/locale-provider/en_US";
import ja from "ant-design-vue/lib/locale-provider/ja_JP";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
export default {
  name: "app",
  data() {
    return {
      locale: cn
    };
  },
  // 创建完毕状态
  created() {
    // 默认中文
    localStorage.lang == undefined ? localStorage.setItem("lang", "cn") : "";
    // 自己配置多语言适配
    this.$root.Bus.$on("switchLanguage", value => {
      switch (value) {
        case "cn":
          localStorage.setItem("lang", "cn");
          break;
        case "en":
          localStorage.setItem("lang", "en");
          break;
        case "ja":
          localStorage.setItem("lang", "ja");
          break;
      }
      // 刷新页面
      this.$router.go(0);
    });
    // 系统组件适配
    let lang = localStorage.lang;
    if (lang == "cn") {
      this.locale = cn;
      moment.locale("cn");
    } else if (lang == "en") {
      this.locale = en;
      moment.locale("en");
    } else if (lang == "ja") {
      this.locale = ja;
      moment.locale("ja");
    }
  },
  // 挂载结束状态
  mounted() {},
  methods: {}
};
</script>
<style scoped>
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
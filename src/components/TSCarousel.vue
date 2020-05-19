/**
 * 登录页轮播
 **/ 

<template>
  <a-carousel autoplay class="a-body">
    <img :src="data[0]" alt />
    <img :src="data[1]" alt />
    <img :src="data[2]" alt />
    <img :src="data[3]" alt />
  </a-carousel>
</template>
<script>
export default {
  data() {
    return {
      data: [
        require("../assets/img/1.png"),
        require("../assets/img/2.png"),
        require("../assets/img/3.png"),
        require("../assets/img/4.png")
      ]
    };
  },
  methods: {}
};
</script>
<style scoped>
/* For demo */
.a-body {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
}
.a-body img {
  width: 100%;
  height: 100vh;
}
.ant-carousel .slick-slider {
  width: 100% !important;
  height: 100% !important;
}
.ant-carousel >>> .slick-slide {
  height: 100%;
  line-height: 100vh;
  overflow: hidden;
}
</style>
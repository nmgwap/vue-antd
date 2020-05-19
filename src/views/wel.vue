/**
* 欢迎界面
*/ 
<template >
  <div class="wel-con" :class="FullScreen?'map-FullScreen':'map'">
    <!-- 按钮 -->
    <div class="Full" @click="buttoncli">
      <i class="iconquanping" style="height:30px;"></i>
    </div>
    <!-- 头部 -->
    <div class="head-title">
      <dv-decoration-8 style="width:25%;;height:60px;" />
      <div class="title-con">
        <div class="bigtitle">
          <span>企业实时销售数据</span>
        </div>
        <dv-decoration-5 style="width:100%;height:60px;" />
      </div>
      <dv-decoration-8 :reverse="true" style="width:25%;height:60px;" />
    </div>
    <!-- 中间主体内容 -->
    <div class="smcon" v-if="showSwipe">
      <dv-border-box-1>
        <div class="border-con">
          <div class="border-smcon">
            <!-- 时间 -->
            <div class="time">{{NewTime}}</div>
            <!-- 装饰 -->
            <div class="Decoration">
              <dv-decoration-3 style="width:250px;height:30px;" />
            </div>
            <div class="con-left">
              <dv-border-box-13>
                <div class="left-bp">
                  <div class="left-item">
                    <div class="po-ab">当日支付方式</div>
                    <div class="po-n">
                      <dv-capsule-chart :config="payTypeconfig" style="width:100%;height:100%" />
                    </div>
                  </div>
                  <dv-decoration-10 style="width:100%;height:5px;" />
                  <div class="left-item pad-b">
                    <div class="po-ab pad-b">周销售额趋势</div>
                    <div class="po-n">
                      <dv-charts :option="yearoption" style="width:100%;height:100%" />
                    </div>
                  </div>
                  <dv-decoration-4 :reverse="true" style="width:100%;height:5px;" />
                  <div class="left-item">
                    <div class="po-ab pad-b">月份销售额</div>
                    <div class="po-n">
                      <dv-charts :option="mounthconfig" style="width:100%;height:100%" />
                    </div>
                  </div>
                </div>
              </dv-border-box-13>
            </div>
            <div class="con-cen">
              <div class="cen-box">
                <div class="cen-top">
                  <div class="cent-box">
                    <!-- <dv-border-box-7> -->
                    <div class="dv-smbox">
                      <div class="cent">
                        <dv-border-box-8>
                          <div class="title-box">
                            <div class="tbox-top">
                              <!-- 装饰 -->
                              <div class="zs-box">
                                <dv-decoration-1 style="width:100%;height:100%" />
                              </div>
                              <div class="cen-t">实时贸易总量</div>
                              <dv-digital-flop
                                :config="totalconfig"
                                style="width:100%;height:50px;"
                              />
                              <div class="cen-t">实时贸易总笔数</div>
                              <dv-digital-flop
                                :config="totalpenconfig"
                                style="width:100%;height:50px;"
                              />
                            </div>
                            <div class="tbox-bottom">
                              <dv-scroll-ranking-board :config="Realtimeconfig" />
                            </div>
                          </div>
                        </dv-border-box-8>
                      </div>
                      <div class="cent">
                        <dv-charts :option="machineTpyeoption" />
                      </div>
                    </div>
                    <!-- </dv-border-box-7> -->
                  </div>
                </div>
                <div class="cen-bottom">
                  <dv-border-box-12>
                    <div class="tab-box">
                      <div class="tab-item">
                        <div class="po-tab">商品销售排行</div>
                        <div class="po-tn">
                          <dv-scroll-board :config="productConfig" style="width:100%;height:100%" />
                        </div>
                      </div>
                      <dv-decoration-2 :reverse="true" style="width:5px;height:100%;" />
                      <div class="tab-item">
                        <div class="po-tab">机器销售排行</div>
                        <div class="po-tn">
                          <dv-scroll-board :config="machineConfig" style="width:100%;height:100%" />
                        </div>
                      </div>
                      <dv-decoration-2 :reverse="true" style="width:5px;height:100%;" />
                      <div class="tab-item">
                        <div class="po-tab">城市排行</div>
                        <div class="po-tn">
                          <dv-scroll-board :config="CityConfig" style="width:100%;height:100%" />
                        </div>
                      </div>
                    </div>
                  </dv-border-box-12>
                </div>
              </div>
            </div>
            <div class="con-right">
              <dv-border-box-13>
                <div class="left-bp">
                  <div class="left-item">
                    <div class="po-ab">24小时交易记录</div>
                    <div class="po-n">
                      <dv-charts :option="Dayoption" style="width:100%;height:100%" />
                    </div>
                  </div>
                  <dv-decoration-10 class="rotate" style="width:100%;height:5px;" />
                  <div class="left-item pad-b">
                    <div class="po-ab pad-b">畅销饮料占比</div>
                    <div class="po-n">
                      <dv-charts :option="selloption" style="width:100%;height:100%" />
                    </div>
                  </div>
                  <dv-decoration-4 class="rotate" :reverse="true" style="width:100%;height:5px;" />
                  <div class="left-item">
                    <div class="po-ab pad-b">优惠券领取核销</div>
                    <div class="po-n po-bn">
                      <div class="Coupons">
                        <div class="Half">
                          <dv-charts :option="mapsoption" />
                        </div>
                        <div class="Half">
                          <dv-charts :option="mapoption" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </dv-border-box-13>
            </div>
          </div>
        </div>
      </dv-border-box-1>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
// 导入全屏显示方法
import { fullscreenToggel } from "@/utils/util";
export default {
  name: "welcome",
  data() {
    return {
      showSwipe:true,
      FullScreen: false,
      NewTime: "",
      // 支付方式
      payTypeconfig: {
        data: [
          {
            name: "支付宝",
            value: 167
          },
          {
            name: "微信",
            value: 67
          },
          {
            name: "会员卡",
            value: 123
          },
          {
            name: "银联",
            value: 55
          },
          {
            name: "建行龙支付",
            value: 98
          }
        ]
      },
      // 商品销售排行
      productConfig: {
        data: [
          ["果缤纷沁甜梅莓美味果汁饮料", "11234笔"],
          ["美汁源C粒柠檬", "12222笔"],
          ["雪碧汽水", "11234笔"],
          ["酷儿QOO橙汁饮料", "11222笔"],
          ["美汁源果粒橙", "11123笔"],
          ["康师傅橙汁饮品", "10234笔"],
          ["椰树牌天然椰子汁", "10123笔"],
          ["农夫果园芒果", "10111笔"],
          ["康师傅水蜜桃汁饮品", "9123笔"],
          ["水溶C100柠檬汁饮料", "9111笔"]
        ],
        index: true,
        columnWidth: [50],
        align: ["center"]
      },
      // 机器销售排行
      machineConfig: {
        data: [
          ["ET93000791", "11123234笔"],
          ["ET93000294", "12222123笔"],
          ["ET93000278", "11234222笔"],
          ["ET93000723", "11222332笔"],
          ["ET93000894", "11123342笔"],
          ["ET93000387", "10234123笔"],
          ["ET93000813", "10123555笔"],
          ["ET93000786", "10111444笔"],
          ["ET93000642", "9123333笔"],
          ["ET93000947", "9111444笔"]
        ]
      },
      // 城市销售排行
      CityConfig: {
        data: [
          ["上海市", "1251台"],
          ["嘉兴市", "1222台"],
          ["青岛市", "1118台"],
          ["乌鲁木齐市", "800台"],
          ["常州市", "565台"],
          ["赤峰市", "524台"],
          ["银川市", "234台"],
          ["苏州市", "225台"]
        ]
      },
      // 当时销售排行
      Dayoption: {
        grid: {
          left: 40,
          right: 10,
          top: 20,
          bottom: 30,
          style: {
            fill: "rgba(0, 0, 0, 0)"
          }
        },
        xAxis: {
          data: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24;00"],
          axisLine: {
            style: {
              stroke: "#fff",
              lineWidth: 1
            }
          },
          axisLabel: {
            style: {
              fill: "#fff",
              fontSize: 12,
              rotate: 0
            }
          }
        },
        yAxis: {
          data: "value",
          axisLine: {
            style: {
              stroke: "#fff",
              lineWidth: 1
            }
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            style: {
              fill: "#fff",
              fontSize: 12,
              rotate: 0
            }
          }
        },
        series: [
          {
            data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
            type: "line",
            lineArea: {
              show: true,
              gradient: ["rgba(55, 162, 218, 0.6)", "rgba(55, 162, 218, 0)"]
            }
          }
        ]
      },
      // 周销售额趋势
      yearoption: {
        legend: {
          top: 20,
          iconHeight: 12,
          data: ["本周", "上周"],
          textStyle: {
            fontSize: 12,
            fill: "#fff"
          }
        },
        grid: {
          left: 40,
          right: 10,
          top: 20,
          bottom: 30,
          style: {
            fill: "rgba(0, 0, 0, 0)"
          }
        },
        xAxis: {
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          axisLine: {
            style: {
              stroke: "#fff",
              lineWidth: 1
            }
          },
          axisLabel: {
            style: {
              fill: "#fff",
              fontSize: 12,
              rotate: 0
            }
          }
        },
        yAxis: {
          data: "value",
          axisLine: {
            style: {
              stroke: "#fff",
              lineWidth: 1
            }
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            style: {
              fill: "#fff",
              fontSize: 12,
              rotate: 0
            }
          }
        },
        series: [
          {
            name: "本周",
            data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
            type: "bar",
            shapeType: "leftEchelon"
          },
          {
            name: "上周",
            data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
            type: "bar",
            shapeType: "rightEchelon"
          }
        ]
      },
      // 畅销饮料占比
      selloption: {
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 10,
          style: {
            fill: "rgba(0, 0, 0, 0)"
          }
        },
        series: [
          {
            type: "pie",
            radius: "80%",
            data: [
              { name: "可口可乐", value: 93 },
              { name: "百事可乐", value: 32 },
              { name: "哇哈哈", value: 65 },
              { name: "康师傅", value: 44 },
              { name: "统一", value: 52 }
            ],
            insideLabel: {
              show: true
            },
            roseType: true
          }
        ]
      },
      // 月份销售额
      mounthconfig: {
        legend: {
          top: 20,
          iconHeight: 12,
          textStyle: {
            fontSize: 12,
            fill: "#fff"
          }
        },
        grid: {
          left: 40,
          right: 10,
          top: 20,
          bottom: 30,
          style: {
            fill: "rgba(0, 0, 0, 0)"
          }
        },
        xAxis: {
          name: "第一周",
          data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
          axisLine: {
            style: {
              stroke: "#fff",
              lineWidth: 1
            }
          },
          axisLabel: {
            style: {
              fill: "#fff",
              fontSize: 12,
              rotate: 0
            }
          }
        },
        yAxis: {
          name: "销售额",
          data: "value",
          axisLine: {
            style: {
              stroke: "#fff",
              lineWidth: 1
            }
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            style: {
              fill: "#fff",
              fontSize: 12,
              rotate: 0
            }
          }
        },
        series: [
          {
            data: [1200, 2230, 1900, 2100, 3500, 4200, 3985],
            type: "bar",
            backgroundBar: {
              show: true
            }
          }
        ]
      },
      // 优惠券领取
      mapsoption: {
        title: {
          text: "优惠券领取",
          offset: [0, -40],
          style: {
            fill: "#f9fbff",
            fontSize: 14,
            fontWeight: "bold",
            textAlign: "center",
            textBaseline: "bottom"
          }
        },
        series: [
          {
            type: "gauge",
            data: [
              {
                name: "itemA",
                value: 55,
                gradient: ["#e7bcf3", "#e690d1", "#fb7293"],
                localGradient: true
              }
            ],
            center: ["50%", "55%"],
            radius: "60%",
            axisLabel: {
              formatter: "{value}%",
              style: {
                fill: "#fff"
              }
            },
            details: {
              show: true,
              offset: [0, 40],
              formatter: "剩余{value}%",
              style: {
                fontSize: 12,
                fontWeight: "bold",
                textAlign: "center",
                textBaseline: "middle"
              }
            },
            axisTick: {
              style: {
                stroke: "#fff"
              }
            },
            animationCurve: "easeInOutBack"
          }
        ]
      },

      // 优惠券核销
      mapoption: {
        title: {
          text: "优惠券核销",
          offset: [0, -40],
          style: {
            fill: "#f9fbff",
            fontSize: 14,
            fontWeight: "bold",
            textAlign: "center",
            textBaseline: "bottom"
          }
        },
        series: [
          {
            type: "gauge",
            data: [
              {
                name: "itemA",
                value: 55,
                gradient: ["#e7bcf3", "#e690d1", "#fb7293"],
                localGradient: true
              }
            ],
            center: ["50%", "55%"],
            radius: "60%",
            axisLabel: {
              formatter: "{value}%",
              style: {
                fill: "#fff"
              }
            },
            details: {
              show: true,
              offset: [0, 40],
              formatter: "剩余{value}%",
              style: {
                fontSize: 12,
                fontWeight: "bold",
                textAlign: "center",
                textBaseline: "middle"
              }
            },
            axisTick: {
              style: {
                stroke: "#fff"
              }
            },
            animationCurve: "easeInOutBack"
          }
        ]
      },
      totalconfig: {
        number: [8595214.5],
        toFixed: 2,
        content: "{nt}元",
        textAlign: "left",
        style: {
          fontSize: 30
        }
      },
      totalpenconfig: {
        number: [895214],
        content: "{nt}笔",
        textAlign: "left",
        style: {
          fontSize: 30
        }
      },
      machineTpyeoption: {
        legend: {
          bottom: 10,
          iconHeight: 12,
          data: ["今年销售额", "去年销售额"],
          textStyle: {
            fontSize: 12,
            fill: "#fff"
          }
        },

        radar: {
          indicator: [
            { name: "1月", max: 9000000 },
            { name: "2月", max: 9000000 },
            { name: "3月", max: 9000000 },
            { name: "4月", max: 9000000 },
            { name: "5月", max: 9000000 },
            { name: "6月", max: 9000000 },
            { name: "7月", max: 9000000 },
            { name: "8月", max: 9000000 },
            { name: "9月", max: 9000000 },
            { name: "10月", max: 9000000 },
            { name: "11月", max: 9000000 },
            { name: "12月", max: 9000000 }
          ],
          axisLabel: {
            style: {
              fill: "#fff",
              fontSize: 12
            }
          },
          polygon: true,
          axisLine: {
            style: {
              stroke: "rgba(251, 114, 147, .3)"
            }
          },
          splitLine: {
            style: {
              stroke: "rgba(251, 114, 147, .5)",
              fill: "rgba(251, 114, 147, .2)"
            }
          }
        },
        series: [
          {
            name: "今年销售额",
            type: "radar",
            data: [6110000, 6560000, 7780000, 5520000, 7660000, 8320000],
            label: {
              show: true
            },
            animationCurve: "easeOutBounce"
          },
          {
            name: "去年销售额",
            type: "radar",
            data: [
              6220000,
              6450000,
              5200000,
              7300000,
              6400000,
              8000000,
              7250000,
              6580000,
              5570000,
              3570000,
              6840000,
              5120000
            ],
            label: {
              show: true
            },
            animationCurve: "easeOutBounce"
          }
        ]
      },
      // 实时销售商品
      Realtimeconfig: {
        rowNum: 5,
        unit: "￥",
        data: [
          {
            name: "酷儿维生素C+钙香橙汁450ml",
            value: 3.5
          },
          {
            name: "健桑桑果汁30%500ml",
            value: 6
          },
          {
            name: "汇源100%果汁（苹果汁）200ml",
            value: 4
          },
          {
            name: "午时金银花露饮料",
            value: 2.5
          },
          {
            name: "泰山牌仙草蜜颗粒饮料",
            value: 10
          },
          {
            name: "雀巢丝滑拿铁咖啡饮料268ml",
            value: 5.5
          },
          {
            name: "红牛维生素营养液500ml",
            value: 6
          }
        ]
      }
    };
  },
  // 创建完毕状态(里面是操作)
  created() {
    // 时间定时器
    setInterval(this.getTime, 1000);
    // 请求数据
    this.showSwipe = false;
    this.$nextTick(function() {
      this.showSwipe = true;
    });
  },
  // 挂载结束状态(里面是操作)
  mounted() {},
  // 里面的函数只有调用才会执行
  methods: {
    buttoncli() {
      // 是否全屏
      this.FullScreen = !this.FullScreen;
      this.FullScreen
        ? (this.Realtimeconfig.rowNum = 7)
        : (this.Realtimeconfig.rowNum = 5);
      fullscreenToggel();
    },
    // 请求数据
    getData() {
      // 支付方式-胶囊柱状图
      // 商品销售排行
      // 机器销售排行
      // 城市销售排行
      // 24小时交易记录
      // 周销售额趋势
      // 畅销饮料占比
      // 月份销售额-今年和去年
      // 优惠券领取核销
      // 实时销售商品
    },
    // 当前时间
    getTime() {
      let now = new Date();
      let year = now.getYear();
      year = now.getFullYear();
      let month = now.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      let days = now.getDate();
      days = days < 10 ? "0" + days : days;
      let hour = now.getHours();
      hour = hour < 10 ? "0" + hour : hour;
      let minutes = now.getMinutes();
      minutes = minutes < 10 ? "0" + minutes : minutes;
      let seconds = now.getSeconds();
      seconds = seconds < 10 ? "0" + seconds : seconds;
      this.NewTime =
        year +
        "-" +
        month +
        "-" +
        days +
        "  " +
        hour +
        ":" +
        minutes +
        ":" +
        seconds;
    }
  }
};
</script>
<style>
.wel-con {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-image: url("../styles/img/bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.Full {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  box-sizing: border-box;
  padding: 5px;
  border-radius: 5px;
}
.Full:hover {
  background-color: #fff;
}
.Full > img {
  width: 100%;
  height: 100%;
}
.map {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
}
.map-FullScreen {
  z-index: 9000;
  object-fit: contain;
  position: fixed !important;
  top: 0px !important;
  right: 0px !important;
  bottom: 0px !important;
  left: 0px !important;
  box-sizing: border-box !important;
  min-width: 0px !important;
  max-width: none !important;
  min-height: 0px !important;
  max-height: none !important;
  width: 100% !important;
  height: 100% !important;
  transform: none !important;
  margin: 0px !important;
}
.head-title {
  width: 100%;
  height: 100px;
  text-align: center;
  display: flex;
  justify-content: space-between;
}
.title-con {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.bigtitle {
  display: inline-block;
  font-size: 30px;
  color: #f9fbff;
  position: relative;
  height: 30px;
}
.bigtitle > span {
  width: 100%;
  text-align: center;
  position: absolute;
  left: 0px;
  top: 10px;
}
.smcon {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding-top: 100px;
}
.border-con {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
}
.border-smcon {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}
.con-left {
  width: 25%;
  height: 100%;
  box-sizing: border-box;
  position: absolute;
  left: 0px;
  top: 0px;
}
.con-cen {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0px 25%;
}
.con-right {
  width: 25%;
  height: 100%;
  box-sizing: border-box;
  position: absolute;
  right: 0px;
  top: 0px;
}
.left-bp {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
}
.left-top {
  width: 100%;
  height: 49%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.left-bottom {
  width: 100%;
  height: 49%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cen-box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}
.cen-top {
  width: 100%;
  height: calc(100% - 40%);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.cent-box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 5px;
}
.cen-bottom {
  width: 100%;
  height: 40%;
  box-sizing: border-box;
}
.tab-box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  justify-content: center;
}
.left-item {
  width: 100%;
  height: 33%;
  box-sizing: border-box;
  position: relative;
}
.po-ab {
  position: absolute;
  top: 0px;
  left: 0px;
  color: #f9fbff;
}
.po-n {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 20px;
}
.tab-item {
  width: 33%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}
.rotate {
  transform: rotate(180deg);
}
.po-tab {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  text-align: center;
  color: #f9fbff;
}
.po-tn {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 30px;
}
.pad-b {
  padding-top: 8px;
}
.po-bn {
  padding-top: 38px;
}
.cen-t {
  font-size: 12px;
  color: #f9fbff;
  text-align: left;
}
.cent {
  width: 50%;
  box-sizing: border-box;
  text-align: center;
}

.dv-smbox {
  width: 100%;
  height: 100%;
  /* padding: 10px; */
  box-sizing: border-box;
  display: flex;
  justify-items: space-between;
}
.title-box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
}
.time {
  position: absolute;
  top: -35px;
  right: 5%;
  font-size: 25px;
  color: #f9fbff;
}
.Decoration {
  position: absolute;
  top: -35px;
  left: 5%;
}
.tbox-top {
  width: 100%;
  height: 130px;
  box-sizing: border-box;
  position: relative;
}
.tbox-bottom {
  width: 100%;
  height: calc(100% - 130px);
  box-sizing: border-box;
}
.zs-box {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 180px;
  height: 50px;
}
.Coupons {
  widows: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.Half {
  width: 50%;
  height: 100%;
}
</style>
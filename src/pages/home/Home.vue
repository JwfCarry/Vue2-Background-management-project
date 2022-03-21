<template>
  <el-row class="home" :gutter="20">
    <!-- 左边区域 -->
    <el-col :span="8" style="margin-top: 20px">
      <!-- 左上方管理员信息区域 -->
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" alt="" />
          <div class="userinfo">
            <p class="name">JWF</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间: <span>2022-3-17</span></p>
          <p>上次登录地点: <span>河南省商丘市</span></p>
        </div>
      </el-card>
      <!-- 左下方表格区域 -->
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="订单类别" width="128">
          </el-table-column>
          <el-table-column prop="todayBuy" label="今日购买数量" width="129">
          </el-table-column>
          <el-table-column prop="monthBuy" label="本月购买数量" width="129">
          </el-table-column>
          <el-table-column prop="totalBuy" label="总购买数量">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!-- 右边区域 -->
    <el-col style="margin-top: 20px" :span="16">
      <!-- 上方区域 -->
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 下方表格区域 -->
      <el-card style="height: 280px">
        <div style="height: 280px" ref="echarts"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <div style="height: 240px" ref="userEcharts"></div>
        </el-card>
        <el-card style="height: 260px">
          <div style="height: 240px" ref="videoEcharts"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../../api/data";
import * as echarts from "echarts";
export default {
  name: "Home",
  data() {
    return {
      userImg: require("../../assets/images/jwfimg.png"),
      tableData: [
        {
          name: "上衣类",
          todayBuy: 123,
          monthBuy: 400,
          totalBuy: 3500,
        },
        {
          name: "裤子类",
          todayBuy: 200,
          monthBuy: 400,
          totalBuy: 2000,
        },
        {
          name: "袜子类",
          todayBuy: 320,
          monthBuy: 8000,
          totalBuy: 54000,
        },
        {
          name: "裙子类",
          todayBuy: 21,
          monthBuy: 102,
          totalBuy: 600,
        },
        {
          name: "内衣类",
          todayBuy: 40,
          monthBuy: 700,
          totalBuy: 5200,
        },
        {
          name: "鞋子类",
          todayBuy: 24,
          monthBuy: 700,
          totalBuy: 1200,
        },
        {
          name: "其他",
          todayBuy: 16,
          monthBuy: 200,
          totalBuy: 330,
        },
      ],
      countData: [
        {
          name: "今日支付订单",
          value: 1224,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 170,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 267,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 13780,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 2800,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 2004,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    getData().then((res) => {
      const { code, data } = res.data;
      if (code === 20000) {
        this.tableData = data.tableData;
        const order = data.orderData;
        const xData = order.date;
        const keyArray = Object.keys(order.data[0]);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });
        const option = {
          tooltip: {
            trigger: "item",
          },
          xAxis: {
            data: xData,
          },
          yAxis: {},
          legend: {
            data: keyArray,
          },
          series,
        };
        const E = echarts.init(this.$refs.echarts);
        E.setOption(option);
        //用户图
        const userOption = {
          legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: data.userData.map((item) => item.date),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name: "新增用户",
              data: data.userData.map((item) => item.new),
              type: "bar",
            },
            {
              name: "活跃用户",
              data: data.userData.map((item) => item.active),
              type: "bar",
              // bar 表示柱状图
            },
          ],
        };
        const U = echarts.init(this.$refs.userEcharts);
        U.setOption(userOption);
        //饼图
        const videoOption = {
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [
            {
              data: data.videoData,
              type: "pie",
            },
          ],
        };
        const V = echarts.init(this.$refs.videoEcharts);
        V.setOption(videoOption);
      }
      console.log(res);
    });
  },
};
</script>

<style>
</style>
// mock数据模拟
import Mock from 'mockjs'

// 图表数据
let List = []
export default {
    getStatisticalData: () => {
        //Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
        for (let i = 0; i < 7; i++) {
            List.push(
                Mock.mock({
                    上衣类: Mock.Random.float(100, 8000, 0, 0),
                    裤子类: Mock.Random.float(100, 8000, 0, 0),
                    袜子类: Mock.Random.float(100, 8000, 0, 0),
                    裙子类: Mock.Random.float(100, 8000, 0, 0),
                    内衣类: Mock.Random.float(100, 8000, 0, 0),
                    鞋子类: Mock.Random.float(100, 8000, 0, 0),
                    其他: Mock.Random.float(100, 8000, 0, 0),
                })
            )
        }
        return {
            code: 20000,
            data: {
                // 饼图
                videoData: [
                    {
                        name: '上衣类',
                        value: 2999
                    },
                    {
                        name: '裤子类',
                        value: 5999
                    },
                    {
                        name: '袜子类',
                        value: 1500
                    },
                    {
                        name: '裙子类',
                        value: 1999
                    },
                    {
                        name: '内衣类',
                        value: 2200
                    },
                    {
                        name: '鞋子类',
                        value: 4500
                    },
                    {
                        name: '其他',
                        value: 4500
                    }
                ],
                // 柱状图
                userData: [
                    {
                        date: '周一',
                        new: 5,
                        active: 200
                    },
                    {
                        date: '周二',
                        new: 10,
                        active: 500
                    },
                    {
                        date: '周三',
                        new: 12,
                        active: 550
                    },
                    {
                        date: '周四',
                        new: 60,
                        active: 800
                    },
                    {
                        date: '周五',
                        new: 65,
                        active: 550
                    },
                    {
                        date: '周六',
                        new: 53,
                        active: 770
                    },
                    {
                        date: '周日',
                        new: 33,
                        active: 170
                    }
                ],
                // 折线图
                orderData: {
                    date: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'],
                    data: List
                },
                tableData: [
                    {
                        name: '上衣类',
                        todayBuy: 500,
                        monthBuy: 3500,
                        totalBuy: 22000
                    },
                    {
                        name: '裤子类',
                        todayBuy: 300,
                        monthBuy: 2200,
                        totalBuy: 24000
                    },
                    {
                        name: '袜子类',
                        todayBuy: 800,
                        monthBuy: 4500,
                        totalBuy: 65000
                    },
                    {
                        name: '内衣类',
                        todayBuy: 1200,
                        monthBuy: 6500,
                        totalBuy: 45000
                    },
                    {
                        name: '鞋子类',
                        todayBuy: 300,
                        monthBuy: 2000,
                        totalBuy: 34000
                    },
                    {
                        name: '其他',
                        todayBuy: 350,
                        monthBuy: 3000,
                        totalBuy: 22000
                    }
                ]
            }
        }
    }
}
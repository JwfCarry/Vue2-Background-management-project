//这是Vue-x文件
import Vue from "vue";
import Vuex from 'vuex';
import Cookie from "js-cookie"
Vue.use(Vuex);

const actions = {}
const mutations = {
    //定义侧边栏伸缩事件函数
    isCollapse(state) {
        state.isCollapse = !state.isCollapse;
    },
    //定义面包屑功能函数
    selectMenu(state, value) {
        if (value.name !== 'home') {
            state.currentMenu = value
            const result = state.tabsList.findIndex(item => item.name === value.name)
            if (result === -1) {
                state.tabsList.push(value)
            }
        } else {
            state.currentMenu = null
        }
    },
    //删除tag函数
    closeTag(state, value) {
        const result = state.tabsList.findIndex(item => item.name === value.name);
        state.tabsList.splice(result, 1);
    },
    //这是token功能函数
    setToken(state, value) {
        state.token = value;
        Cookie.set('token', value)
    },
    clear(state) {
        state.token = ''
        Cookie.remove('token')
    },
    getToken(state) {
        state.token = state.token || Cookie.get('token')
    },
    //这是用户登录后 设置功能访问权限的函数
    setMenu(state, value) {
        state.menu = value;
        Cookie.set('menu', JSON.stringify(value))
    },
    clearMenu(state) {  //清除路由
        state.menu = [];
        Cookie.remove('menu')
    },
    addMenu(state, router) {
        if (!Cookie.get('menu')) {
            return
        }
        const menu = JSON.parse(Cookie.get('menu'))
        state.menu = menu;
        const menuArray = [];
        menu.forEach(item => {
            if (item.children) {
                item.children = item.children.map(item => {
                    item.component = () => import(`../pages/${item.url}`)
                    return item
                })
                menuArray.push(...item.children)
            } else {
                item.component = () => import(`../pages/${item.url}`)
                menuArray.push(item)
            }
        });
        //路由的动态添加
        menuArray.forEach(item => {
            router.addRoute('Main', item)
        })
    }
}
const state = {
    isCollapse: false,
    tabsList: [{
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'home'
    }],
    currentMenu: null,
    token: '',
    menu: []
}





export default new Vuex.Store({
    state,
    actions,
    mutations,
})
//路由器js文件
import store from '../store';
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'Main',
        component: () => import('../pages/Main.vue'),
        redirect: '/home',
        children: []
    }, {
        path: '/login',
        name: 'login',
        component: () => import('../pages/login/Login.vue')
    }]
});
//登录功能路由守卫  
router.beforeEach((to, from, next) => {
    store.commit('getToken'); //先获取一下token
    const token = store.state.token;//拿到token
    if (!token && to.name !== 'login') {  //如果用户没有token并且想访问除了登录界面以外的系统页面 那么就不放行 并将路由自动跳转到登录界面
        next({ name: 'login' })
    } else if (token && to.name === 'login') { //当我们已经登录主页后 更改路径为login后 这个时候不用显示登录界面 所有要进行判断 并跳回主页home
        next({ name: 'home' })
    } else {
        next() //满足条件 放行 正常登录访问
    }
})
export default router;
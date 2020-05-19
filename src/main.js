import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入Antd
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false;
Vue.use(Antd);

// 增加混入
import shareUtils from "@/mixins/utils";
Vue.mixin(shareUtils);

// 过滤器
import * as filters from './utils/util'
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

//导入
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 路由拦截器
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (to.matched.length != 0) {
        if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
            if (Boolean(localStorage.getItem("token"))) { // 通过vuex state获取当前的user是否存在
                if (to.path == '/' && from.path == '/') {
                    next({
                        path: '/index'
                    })
                } else {
                    next();
                }
            } else {
                next({
                    path: '/login',
                    query: {
                        redirect: to.fullPath
                    } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                })
            }
        } else {
            if (Boolean(localStorage.getItem("token"))) { // 判断是否登录
                if (to.path != "/" && to.path != "/login") { //判断是否要跳到登录界面
                    next();
                } else {
                    /**
                     * 防刷新，如果登录，修改路由跳转到登录页面，修改路由为登录后的首页 
                     */
                    next({
                        path: '/index'
                    })
                }
            } else {
                next();
            }
        }
    } else {
        next({
            path: '/login',
            query: {
                redirect: to.fullPath
            } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
    }
})

router.afterEach(() => {
    NProgress.done()
})

import {
    iconfontUrl,
    iconfontVersion
} from '@/utils/config'
import {
    loadStyle
} from './utils/util'
iconfontVersion.forEach(ele => {
    loadStyle(iconfontUrl.replace('$key', ele))
})

// 导入语言包
import i18n from '../public/languages/i18n'

Vue.config.productionTip = false
new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
    data: {
        // 空的实例放到根组件下，所有的子组件都能调用
        Bus: new Vue()
    }
}).$mount('#app')
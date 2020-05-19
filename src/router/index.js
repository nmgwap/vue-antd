import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: '登录页',
  component: () =>
    import( /* webpackChunkName: "page" */ '@/views/login'),
  meta: {
    requireAuth: false,
  },
}, {
  path: '/',
  name: '首页',
  component: () =>
    import( /* webpackChunkName: "page" */ '@/views/index'),
  meta: {
    requireAuth: true,
  },
  children: [{
    path: '/index',
    name: '首页',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/views/wel'),
    meta: {
      requireAuth: true,
    }
  }, {
    path: '/upms/user',
    name: '用户管理',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/views/admin/user/index'),
    meta: {
      requireAuth: true,
    }
  }, {
    path: '/upms/role',
    name: '角色管理',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/views/admin/role/index'),
    meta: {
      requireAuth: true,
    }
  }, {
    path: '/upms/menu',
    name: '菜单管理',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/views/admin/menu/index'),
    meta: {
      requireAuth: true,
    }
  }, {
    path: '/upms/dept',
    name: '部门管理',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/views/admin/dept/index'),
    meta: {
      requireAuth: true,
    }
  }, {
    path: '/admin/log',
    name: '日志管理',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/views/admin/log/index'),
    meta: {
      requireAuth: true,
    }
  }, {
    path: '/admin/dict',
    name: '字典管理',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/views/admin/dict/index'),
    meta: {
      requireAuth: true,
    }
  }, {
    path: '/admin/gen',
    name: '代码生成',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/views/admin/gen/index'),
    meta: {
      requireAuth: true,
    }
  }, {
    path: '/admin/client',
    name: '代码生成',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/views/admin/client/index'),
    meta: {
      requireAuth: true,
    }
  }, {
    path: '/admin/token',
    name: '令牌管理',
    component: () =>
      import( /* webpackChunkName: "page" */ '@/views/admin/token/index'),
    meta: {
      requireAuth: true,
    }
  }]
}]

const router = new VueRouter({
  // 页面刷新白屏问题
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
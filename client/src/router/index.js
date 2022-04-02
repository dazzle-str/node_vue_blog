import Vue from 'vue'
import VueRouter from 'vue-router'
import Start from '../views/Start.vue'
import Index from '../views/Index.vue'
import Home from '../views/Home.vue'
import Blog from '../views/Blog.vue'
import Article from '../views/Article.vue'
import Create from '../views/Create.vue'
import Info from '../views/Info.vue'
import Mine from '../views/Mine.vue'
import Console from '../views/Console/Console.vue'
import Articles from '../views/Console/Article.vue'
import Category from '../views/Console/Category.vue'
import Comment from '../views/Console/Comment.vue'
import User from '../views/Console/User.vue'
import Recommend from '../views/Console/Recommend.vue'

Vue.use(VueRouter)

const routes = [
  { name: 'start', path: '/start', component: Start },
  {
    name: 'index',
    path: '/',
    component: Index,
    children: [
      { name: 'home', path: '/', component: Home },
      { name: 'blog', path: '/article', component: Blog },
      { name: 'article', path: '/article/:aid', component: Article, props: true },
      { name: 'create', path: '/create', component: Create, meta: { need_login: true } },
      { name: 'edit', path: '/create/:aid', component: Create, props: true, meta: { need_login: true } },
      { name: 'info', path: '/userinfo', component: Info, meta: { need_login: true } },
      { name: 'mine', path: '/myarticle', component: Mine, meta: { need_login: true } }
    ]
  },
  {
    name: 'console',
    path: '/console',
    component: Console,
    redirect: '/console/article',
    children: [
      { path: 'article', component: Articles },
      { path: 'category', component: Category },
      { path: 'comment', component: Comment },
      { path: 'user', component: User },
      { path: 'recommend', component: Recommend }
    ],
    meta: { need_login: true }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const { need_login = false } = to.meta
  const userdata = JSON.parse(localStorage.getItem('userdata'))
  if (need_login && !userdata) {
    next('start')
  } else {
    next()
  }
})

export default router

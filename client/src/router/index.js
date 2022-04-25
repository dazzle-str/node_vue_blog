import Vue from 'vue'
import VueRouter from 'vue-router'
// import Start from '../views/Start.vue'
const Start = () => import('../views/Start.vue')
// import Index from '../views/Index.vue'
const Index = () => import('../views/Index.vue')
// import Home from '../views/Home.vue'
const Home = () => import('../views/Home.vue')
// import Blog from '../views/Blog.vue'
const Blog = () => import('../views/Blog.vue')
// import Diary from '../views/Diary.vue'
const Diary = () => import('../views/Diary.vue')
// import Article from '../views/Article.vue'
const Article = () => import('../views/Article.vue')
// import Create from '../views/Create.vue'
const Create = () => import('../views/Create.vue')
// import Write from '../views/Write.vue'
const Write = () => import('../views/Write.vue')
// import Info from '../views/Info.vue'
const Info = () => import('../views/Info.vue')
// import Content from '../views/Content.vue'
const Content = () => import('../views/Content.vue')
// import Console from '../views/Console/Console.vue'
const Console = () => import('../views/Console/Console.vue')
// import Articles from '../views/Console/Article.vue'
const Articles = () => import('../views/Console/Article.vue')
// import Diarys from '../views/Console/Diary.vue'
const Diarys = () => import('../views/Console/Diary.vue')
// import Category from '../views/Console/Category.vue'
const Category = () => import('../views/Console/Category.vue')
// import Comment from '../views/Console/Comment.vue'
const Comment = () => import('../views/Console/Comment.vue')
// import User from '../views/Console/User.vue'
const User = () => import('../views/Console/User.vue')
// import Recommend from '../views/Console/Recommend.vue'
const Recommend = () => import('../views/Console/Recommend.vue')

Vue.use(VueRouter)

const routes = [
  { name: 'start', path: '/start', component: Start },
  {
    path: '/',
    component: Index,
    children: [
      { name: 'home', path: '/', component: Home },
      { name: 'blog', path: '/article', component: Blog },
      { name: 'diary', path: '/mooddiary', component: Diary },
      { name: 'article', path: '/article/:aid', component: Article, props: true },
      { name: 'create', path: '/create', component: Create, meta: { need_login: true } },
      { name: 'edit', path: '/create/:aid', component: Create, props: true, meta: { need_login: true } },
      { name: 'write', path: '/write', component: Write, meta: { need_login: true } },
      { name: 'info', path: '/userinfo', component: Info, meta: { need_login: true } },
      { name: 'content', path: '/myarticle', component: Content, meta: { need_login: true } }
    ]
  },
  {
    name: 'console',
    path: '/console',
    component: Console,
    redirect: '/console/article',
    children: [
      { path: 'article', component: Articles },
      { path: 'diary', component: Diarys },
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

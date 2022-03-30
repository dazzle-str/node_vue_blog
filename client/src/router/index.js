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
  { path: '/start', component: Start },
  {
    path: '/',
    component: Index,
    children: [
      { path: '/', component: Home },
      { path: '/article', component: Blog },
      { path: '/article/:aid', component: Article, props: true },
      { path: '/create', component: Create },
      { path: '/create/:aid', component: Create, props: true },
      { path: '/userinfo', component: Info },
      { path: '/myarticle', component: Mine }
    ]
  },
  {
    path: '/console',
    component: Console,
    redirect: '/console/article',
    children: [
      { path: 'article', component: Articles },
      { path: 'category', component: Category },
      { path: 'comment', component: Comment },
      { path: 'user', component: User },
      { path: 'recommend', component: Recommend }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/start' || to.path === '/' || to.path.startsWith('/article')) return next()
  if (!localStorage.token) return next('/start')
  next()
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Reset from '../views/Reset.vue'
import Main from '../views/Main.vue'
import AddArticle from '../views/article/Add.vue'
import ArticleDetail from '../views/article/Detail.vue'
import Info from '../views/Info.vue'
import Mine from '../views/Mine.vue'
import Console from '../views/Console/Console.vue'
import Article from '../views/Console/Article.vue'
import Category from '../views/Console/Category.vue'
import Comment from '../views/Console/Comment.vue'
import User from '../views/Console/User.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/reset', component: Reset },
  {
    path: '/',
    component: Home,
    children: [
      { path: '/', component: Main },
      { path: '/create', component: AddArticle },
      { path: '/create/:aid', component: AddArticle, props: true },
      { path: '/article/:aid', component: ArticleDetail, props: true },
      { path: '/userinfo', component: Info },
      { path: '/myarticle', component: Mine },
      {
        path: '/console',
        component: Console,
        children: [
          { path: 'article', component: Article },
          { path: 'category', component: Category },
          { path: 'comment', component: Comment },
          { path: 'user', component: User }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register' || to.path === '/reset') return next()
  if (!localStorage.token) return next('/login')
  next()
})

export default router

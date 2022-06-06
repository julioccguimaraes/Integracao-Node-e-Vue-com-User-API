import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegiterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import UserView from '../views/UserView.vue'
import EditView from '../views/EditView.vue'
import axios from 'axios'

function auth (to, from, next) {
  if(localStorage.getItem('token') != undefined) {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }
    axios.post("http://localhost:3000/validate", {}, config).then(() => {
      next()
    }).catch(err => {
      console.log(err)
      next('/login')
    })
  } else {
    next('/login')
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: RegiterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/admin/users',
    name: 'users',
    component: UserView,
    beforeEnter: auth
  },
  {
    path: '/admin/users/edit/:id',
    name: 'edit',
    component: EditView,
    beforeEnter: auth
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

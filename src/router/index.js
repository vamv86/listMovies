import Vue from 'vue'
import VueRouter from 'vue-router'
import Default from '../components/MovieList';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'default',
    component: Default
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

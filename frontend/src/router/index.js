import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/post/:slug', component: () => import('../views/PostView.vue') },
  { path: '/admin', component: () => import('../views/AdminView.vue') },
  { path: '/admin/new', component: () => import('../views/EditorView.vue') },
  { path: '/admin/edit/:id', component: () => import('../views/EditorView.vue') },
  { path: '/:pathMatch(.*)*', component: () => import('../views/NotFoundView.vue') }
]

export default createRouter({
  history: createWebHistory(),
  routes
})

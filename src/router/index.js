import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListProject from '@/components/project/listProject.vue'
import CreateProject from '@/components/project/createProject.vue'
import DetailProject from '@/components/project/detailProject.vue'
import UpdateProject from '@/components/project/updateProject.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/project',
      name: 'list',
      component: ListProject
    },
    {
      path: '/create',
      name: 'create',
      component: CreateProject
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: DetailProject
    },
    {
      path: '/update/:id',
      name: 'update',
      component: UpdateProject
    }
  ]
})

export default router

//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes
const routes = [
    {
        path: '/',
        name: 'kamar.index',
        component: () => import( /* webpackChunkName: "post.index" */ '@/views/kamar/IndexKamar.vue')
    },
    {
        path: '/create',
        name: 'kamar.create',
        component: () => import( /* webpackChunkName: "post.create" */ '@/views/kamar/CreateKamar.vue')
    },
    {
        path: '/edit/:id',
        name: 'kamar.edit',
        component: () => import( /* webpackChunkName: "post.edit" */ '@/views/kamar/EditKamar.vue')
    }
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes  // config routes
})

export default router

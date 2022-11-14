import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router);
import Main from '@/views/mainPage/'

export const constantRouterMap = [
    {
        path: '/',
        component: Layout,
        redirect: '/index',
        children: [
            {
                path: 'index',
                component: Main,
                name: "菜单"
            },{
                path: 'test',
                component: ()=>import('@/views/test')
            }
        ],
    },
];

const createRouter = () => new Router({
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
});

const router = createRouter();

export default router

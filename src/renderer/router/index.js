import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);


export const constantRouterMap = [
    {
        path: '/',
        component: () => import('@/views/index/index'),
    }
];

const createRouter = () => new Router({
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
});

const router = createRouter();

export default router

import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Detail from './views/Detail'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        name: 'home',
        component: Home,
        props:(route)=>{
            return{
                search_input:route.query.search_input
            }
        }
    }
    , {
        path: '/detail',
        name: 'detail',
        component: Detail
    },{
        path: '/tag',
        name: 'tag',
        component: Home,
    },{
        path: '*',
        name: 'home',
        component: Home,
        props: (route) => ({ params: route.query })
    }]
})

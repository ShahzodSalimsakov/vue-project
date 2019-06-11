import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import Home from '@/components/Home'
import Ad from '@/components/Ads/Ad'
import AdList from '@/components/Ads/AdList'
import NewAd from '@/components/Ads/NewAd'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'
import Orders from '@/components/User/Orders'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path:'/',
            component:Home
        },
        {
            path:'/ad/:id',
            component:Ad,
            props:true
        },
        {
            path:'/list',
            component:AdList,
            beforeEnter: AuthGuard
        },
        {
            path:'/new',
            component:NewAd,
            beforeEnter: AuthGuard
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/registration',
            component:Registration
        },
        {
            path:'/orders',
            component:Orders,
            beforeEnter: AuthGuard
        }
    ],
    mode: 'history'
})
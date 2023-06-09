import { RouteRecordRaw } from "vue-router";
import { First } from "../components/welcome/First";
import { FirstActions } from "../components/welcome/FirstActions";
import { Second } from "../components/welcome/Second";
import { SecondActions } from "../components/welcome/SecondActions";
import { Third } from "../components/welcome/Third";
import { ThirdActions } from "../components/welcome/ThirdActions";
import { Fourth } from "../components/welcome/Fourth";
import { FourthActions } from '../components/welcome/FourthActions';
import { Welcome } from "../views/Welcome";
import { StartPage } from "../views/StartPage";
import { ItemPage } from "../views/ItemPage";
import { ItemCreate } from "../components/item/ItemCreate";
import { ItemList } from "../components/item/ItemList";
import { TagCreate } from "../components/tag/TagCreate";
import { TagEdit } from "../components/tag/TagEdit";
import { TagPage } from "../views/TagPage";
import { SignInPage } from "../views/SignInPage";
import { StatisticsPage } from "../views/StatisticsPage";
import { http } from "../shared/Http";
import { ComingSoon } from "../shared/ComingSoon";

export const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/welcome' },
    // { path: '/', component: Foo },
    // { path: '/about', component: Bar },
    {
        path: '/welcome',
        // component: Welcome,
        component: () => import('../views/Welcome'),
        beforeEnter: (to, from, next) => {
            localStorage.getItem('skipFeatures') === 'yes' ? next('/items') : next()
        },
        children: [
            { path: '', redirect: '/welcome/1' },
            { path: '1', name: 'Welcome1', components: { main: First, footer: FirstActions } },
            { path: '2', name: 'Welcome2', components: { main: Second, footer: SecondActions } },
            { path: '3', name: 'Welcome3', components: { main: Third, footer: ThirdActions } },
            { path: '4', name: 'Welcome4', components: { main: Fourth, footer: FourthActions } }
        ]
    },
    // { path: '/start', component: StartPage },
    {
        path: '/items',
        // component: ItemPage,
        component: () => import('../views/ItemPage'),
        beforeEnter: async (to, from, next) => {
            await http.get('/me').catch(() => {
                next('/sign_in?return_to=' + to.path)
            })
            next()
        },
        children: [
            { path: '', component: ItemList },
            { path: 'create', component: ItemCreate }
        ]
    },
    {
        path: '/tags',
        // component: TagPage,
        component: () => import('../views/TagPage'),
        children: [
            {
                path: 'create',
                // component: TagCreate
                component: () => import('../components/tag/TagCreate')
            },
            {
                path: ':id/edit',
                // component: TagEdit
                component: () => import('../components/tag/TagEdit')
            }
        ]
    },
    {
        path: '/sign_in',
        // component: SignInPage
        component: () => import('../views/SignInPage')
    },
    {
        path: '/statistics',
        // component: StatisticsPage
        component: () => import('../views/StatisticsPage')
    },
    {
        path: '/export',
        // component: ComingSoon
        component: () => import('../shared/ComingSoon')
    },
    {
        path: '/notify', component: ComingSoon
    }
]
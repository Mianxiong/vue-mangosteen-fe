import { createApp } from 'vue'
import { App } from './App'
import { createRouter } from 'vue-router';
import { routes } from './config/routes';
import { history } from './shared/history';
import '@svgstore';
import { createPinia, storeToRefs } from 'pinia';
import { useMeStore } from './stores/useMeStore';

const router = createRouter({
    history,
    routes,
})

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')

const meStore = useMeStore()
const {mePromise} = storeToRefs(meStore)
meStore.fetchMe()
// const promise = http.get('/me')
// fetchMe()

const whiteList: Record<string, 'exact' | 'startsWith'> = {
    '/': 'exact',
    '/items': 'exact',
    '/welcome': 'startsWith',
    '/sign_in': 'startsWith'
}

// const whiteList = {
//     exact: ['/', '/start'],
//     startsWith: ['/welcome', '/sign_in']
// }

router.beforeEach(async (to, from) => {
    for(const key in whiteList) {
        const value = whiteList[key]
        if(value === 'exact' && to.path === key) {
            return true
        }
        if(value === 'startsWith' && to.path.startsWith(key)) {
            return true
        }
    }
    return mePromise!.value!.then(
        () => true,
        () => '/sign_in?return_to=' + from.path
    )
    // if (to.path === '/' || to.path.startsWith('/welcome') || to.path.startsWith('/sign_in') || to.path === '/start') {
    // // if (['/', 'start'].includes(to.path) || to.path.startsWith('/sign_in') || to.path === '/start') {
    //     return true
    // } else {
    //     // await http.get('/me').catch(() => {
    //     // const path = await promise.catch(() => {
    //     //     return '/sign_in?return_to=' + to.path
    //     // })
    //     // return true
    //     // const path = await mePromise!.then(
    //     const path = await mePromise!.value!.then(
    //         () => true, // 成功
    //         () => '/sign_in?return_to=' + from.path //失败
    //     )
    //     return path
    // }
})




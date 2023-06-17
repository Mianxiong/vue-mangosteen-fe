import { createApp } from 'vue'
import { App } from './App'
import { createRouter } from 'vue-router';
import { routes } from './config/routes';
import { history } from './shared/history';
import '@svgstore';
import { http } from './shared/Http';
import { fetchMe, mePromise } from './shared/me';

const router = createRouter({
    history,
    routes,
})
// const promise = http.get('/me')
fetchMe()
router.beforeEach(async (to, from) => {
    if (to.path === '/' || to.path.startsWith('/welcome') || to.path.startsWith('/sign_in') || to.path === '/start') {
        return true
    } else {
        // await http.get('/me').catch(() => {
        // const path = await promise.catch(() => {
        //     return '/sign_in?return_to=' + to.path
        // })
        // return true
        const path = await mePromise!.then(
            () => true, // 成功
            () => '/sign_in?return_to=' + to.path //失败
        )
        return path
    }
})
const app = createApp(App)
app.use(router)
app.mount('#app')

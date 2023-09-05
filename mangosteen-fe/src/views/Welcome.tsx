import { Transition, VNode, defineComponent, ref, watchEffect } from 'vue';
import { RouteLocationNormalizedLoaded, RouterView, useRoute, useRouter } from 'vue-router';
import s from './Welcome.module.scss'
import logo from '../assets/icons/mangosteen.svg'
import { useSwipe } from '../hooks/useSwipe';
import { throttle } from '../shared/throttle';
console.log(logo);
const pushMapLeft: Record<string, string> = {//全局的静态对象，放到外面，这样在它的生命周期里面只声明一次，不会重复多次去声明
    'Welcome1': '/welcome/2',
    'Welcome2': '/welcome/3',
    'Welcome3': '/welcome/4',
    'Welcome4': '/items',
}
const pushMapRight: Record<string, string> = {//全局的静态对象，放到外面，这样在它的生命周期里面只声明一次，不会重复多次去声明
    'Welcome1': '/welcome/1',
    'Welcome2': '/welcome/1',
    'Welcome3': '/welcome/2',
    'Welcome4': '/welcome/3',
}
export const Welcome = defineComponent({
    setup: (props, context) => {
        const main = ref<HTMLElement>() // 用ref引用这个main
        const { direction, swiping } = useSwipe(main, { beforeStart: e => e.preventDefault() })
        const route = useRoute() // 路由信息
        const router = useRouter() // 路由器
        
        const replace = throttle(() => {
            // if (route.name === 'Welcome1') {
            //     router.push('/welcome/2')
            // } else if (route.name === 'Welcome2') {
            //     router.push('/welcome/3')
            // } else if (route.name === 'Welcome3') {
            //     router.push('/welcome/4')
            // } else if (route.name === 'Welcome4') {
            //     router.push('/start')
            // }
            const name = (route.name || 'Welcome1').toString()
            router.replace(pushMapLeft[name])
        }, 500)
        const back = throttle(() => {
            // if (route.name === 'Welcome1') {
            //     router.push('/welcome/2')
            // } else if (route.name === 'Welcome2') {
            //     router.push('/welcome/3')
            // } else if (route.name === 'Welcome3') {
            //     router.push('/welcome/4')
            // } else if (route.name === 'Welcome4') {
            //     router.push('/start')
            // }
            const name = (route.name || 'Welcome1').toString()
            router.replace(pushMapRight[name])
        }, 500)
        watchEffect(() => {
            console.log('direction', direction.value)
            if (swiping.value && direction.value === 'left') {
                replace()
            } else if(swiping.value && direction.value === 'right'){
                back()
            }
        })
        return () => (<div class={s.wrapper}>
            <header>
                <svg>
                    <use xlinkHref='#mangosteen'></use>
                </svg>
                <h1>点滴记账</h1>
            </header>
            <main class={s.main} ref={main}>
                <RouterView name="main">
                    {/* {(obj: any) => <Transition name="slide-fade"><obj.Component /></Transition>} */}
                    {({ Component: Content, route: R }: { Component: VNode, route: RouteLocationNormalizedLoaded }) =>
                        // <Transition enterFromClass={direction.value === 'left' ? s.slide_fade_left_enter_from : s.slide_fade_right_enter_from} enterActiveClass={s.slide_fade_enter_active} leaveToClass={direction.value === 'left' ? s.slide_fade_left_leave_to : s.slide_fade_right_leave_to} leaveActiveClass={s.slide_fade_leave_active}>
                        //     {Content}
                        // </Transition>
                        <Transition
                            enterFromClass={s.slide_fade_enter_from}
                            enterActiveClass={s.slide_fade_enter_active}
                            leaveToClass={s.slide_fade_leave_to}
                            leaveActiveClass={s.slide_fade_leave_active}>
                            {Content}
                        </Transition>
                    }
                </RouterView>
                {/* <RouterView name="main" /> */}
            </main>
            <footer><RouterView name="footer" /></footer>
        </div>
        )
    }
})
export default Welcome
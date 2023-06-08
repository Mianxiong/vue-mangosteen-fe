import { Transition, VNode, defineComponent, ref, watchEffect } from 'vue';
import { RouteLocationNormalizedLoaded, RouterView } from 'vue-router';
import s from './Welcome.module.scss'
import logo from '../assets/icons/mangosteen.svg'
import { useSwipe } from '../hooks/useSwipe';
console.log(logo);

export const Welcome = defineComponent({
    setup: (props, context) => {
        const main = ref<HTMLElement|null>(null) // 用ref引用这个main
        const {direction, swiping} = useSwipe(main)
        watchEffect(()=>{
            console.log(swiping.value, direction.value)
        })
        useSwipe(main)
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
                        <Transition enterFromClass={s.slide_fade_enter_from} enterActiveClass={s.slide_fade_enter_active} leaveToClass={s.slide_fade_leave_to} leaveActiveClass={s.slide_fade_leave_active}>
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
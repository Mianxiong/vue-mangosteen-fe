import { Transition, VNode, defineComponent } from 'vue';
import { RouteLocationNormalizedLoaded, RouterView } from 'vue-router';
import s from './Welcome.module.scss'
import logo from '../assets/icons/mangosteen.svg'
console.log(logo);

export const Welcome = defineComponent({
    setup: (props, context) => {
        return () => (<div class={s.wrapper}>
            <header>
                <img src={logo} />
                <h1>点滴记账</h1>
            </header>
            <main class={s.main}>
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
import { defineComponent } from 'vue';
import { Navbar } from '../shared/Navbar';
import s from './MainLayout.module.scss'
export const MainLayout = defineComponent({
    // 三个插槽，没有属性
    setup: (props, context) => {
        return () => (
            <div class={s.wrapper}>
                <Navbar class={s.navbar}>{
                    {
                        // default: '山竹记账', icon: <Icon name='menu'/>
                        default: () => context.slots.title?.(),
                        // icon: (_class: string) => <Icon name='menu' class={_class} />
                        icon: () => context.slots.icon?.()

                    }
                }</Navbar>
                {context.slots.default?.()}
            </div>

        )
    }
})
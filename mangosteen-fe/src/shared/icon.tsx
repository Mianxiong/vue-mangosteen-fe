import { PropType, defineComponent } from 'vue';
import s from './Icon.module.scss'
// interface Props{
//     name: string
// }
// export const Icon = defineComponent<Props>({
//   setup: (props, context) => {
//     return () => (
//       <svg class={s.icon}>
//         <use xlinkHref={'#' + props.name}></use>
//       </svg>
//     )
//   }
// })
export type IconName = 'add' | 'chart' | 'clock' | 'cloud' | 'mangosteen' | 'pig' | 'menu'
export const Icon = defineComponent({
    props: {
        name: {
            // type: String as PropType<'add' | 'chart' | 'clock' | 'cloud' | 'mangosteen' | 'pig'>
            type: String as PropType<IconName>,
            required: true
        }
    },
    setup:(props, context) => {
        return () => (
            <svg class={s.icon}>
                <use xlinkHref={'#'+props.name}></use>
            </svg>
        )
    }
})
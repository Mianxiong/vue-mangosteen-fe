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
export const Icon = defineComponent({
    props: {
        name: {
            // type: String as PropType<'add' | 'chart' | 'clock' | 'cloud' | 'mangosteen' | 'pig'>
            type: String
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
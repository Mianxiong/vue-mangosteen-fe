import s from './welcome.module.scss';
import pig from '../../assets/icons/pig.svg'
import { FunctionalComponent, ref, watchEffect, defineComponent } from 'vue';
import { useSwipe } from '../../hooks/useSwipe';
import { useRouter } from 'vue-router';
// export const First = defineComponent({
//   setup() {
//     const div = ref<HTMLDivElement>()
//     const router = useRouter() //路由器
//     const { swiping, direction } = useSwipe(div, {
//       beforeStart: e => e.preventDefault()
//     })
//     watchEffect(() => {
//       if (swiping.value && direction.value === 'left') {
//         router.push('/welcome/2')
//       }
//     })
//     return () => (<div class={s.card} ref={div}>
//       <svg>
//         <use xlinkHref='#pig'></use>
//       </svg>
//       <h2>会挣钱<br />还会省钱</h2>
//     </div>
//     )
//   }

// })
export const First: FunctionalComponent = () => {
  return (
    <div class={s.card}>
      <svg>
        <use xlinkHref='#pig'></use>
      </svg>
      <h2>会挣钱<br />还会省钱</h2>
    </div>
  )
}
First.displayName = 'First'

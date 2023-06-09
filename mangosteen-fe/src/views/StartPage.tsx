import { defineComponent } from 'vue';
import { Button } from '../shared/Button';
import s from './StartPage.module.scss'
import { FloatButton } from '../shared/FloatButton';
export const StartPage = defineComponent({
  setup: (props, context) => {
    const onClick = () => {
      console.log('hi')
    }
    return () => (
      <div class={s.button_wrapper}>
        <Button class={s.button} onClick={onClick}>测试</Button>
        <FloatButton iconName='add'/>
      </div>
      
    )
  }
})
import { defineComponent, PropType } from 'vue';
import s from './ComingSoon.module.scss';
import { Center } from './Center';
import { Icon } from './icon';
export const ComingSoon = defineComponent({
  setup: (props, context) => {
    return () => (
      <div>
        <Center class={s.pig_wrapper}>
            <Icon name="pig" class={s.pig}/>
        </Center>
        <p class={s.text}>敬请期待</p>
      </div>
    )
  }
})
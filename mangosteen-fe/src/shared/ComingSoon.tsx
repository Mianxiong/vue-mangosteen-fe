import { defineComponent, PropType } from 'vue';
import s from './ComingSoon.module.scss';
import { Center } from './Center';
import { Icon } from './icon';
import { useRouter } from 'vue-router';
import { Button } from './Button';
export const ComingSoon = defineComponent({
  setup: (props, context) => {
    const router = useRouter()
    const onClick = () => {
      router.back()
    }
    return () => (
      <div>
        <Center class={s.pig_wrapper}>
          <Icon name="pig" class={s.pig} />
        </Center>
        <p class={s.text}>敬请期待</p>
        <p class={s.link}>
          <Button onClick={onClick}>返回</Button>
        </p>
      </div>
    )
  }
})
export default ComingSoon
import { PropType, defineComponent } from 'vue';
import { Icon, IconName } from './icon';
import s from './FloatButton.module.scss'
export const FloatButton = defineComponent({
  props: {
    iconName: {
        type: String as PropType<IconName>,
        required: true
    }
  },  
  setup: (props, context) => {
    return () => (
      <div class={s.floatButton}>
        <Icon name={props.iconName} class={s.icon}/>
      </div>
    )
  }
})
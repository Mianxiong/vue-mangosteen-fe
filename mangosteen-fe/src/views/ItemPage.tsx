import { defineComponent, PropType } from 'vue';
import s from './ItemPage.module.scss';
import { MainLayout } from '../layouts/MainLayout';
import { Icon } from '../shared/icon';
import { RouterView } from 'vue-router';
export const ItemPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <RouterView/>
    )
  }
})
export default ItemPage
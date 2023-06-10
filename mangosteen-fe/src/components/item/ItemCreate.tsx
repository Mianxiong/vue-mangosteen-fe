import { defineComponent, PropType, ref } from 'vue';
import s from './ItemCreate.module.scss';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/icon';
import { Tabs, Tab } from '../../shared/Tabs';
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const refKind = ref('支出')
    const onUpdateSelected = (name: string) => refKind.value = name
    return () => (
      <MainLayout>{
        {
          title: () => '记一笔',
          icon: () => <Icon name="left" class={s.navIcon} />,
          default: () => <>
            {/* <Tabs selected={refKind.value} onUpdateSelected={name => refKind.value = name}> */}
            {/* <Tabs selected={refKind.value} onUpdateSelected={onUpdateSelected}> */}
            <Tabs v-model:selected={refKind.value}>
              <Tab name="支出">
                icon 列表
              </Tab>
              <Tab name="收入">
                icon 列表2
              </Tab>
            </Tabs>
          </>
        }
      }</MainLayout>
    )
  }
})
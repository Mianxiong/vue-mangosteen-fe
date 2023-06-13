import { defineComponent, PropType, ref } from 'vue';
import s from './ItemCreate.module.scss';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/icon';
import { Tabs, Tab } from '../../shared/Tabs';
import { InputPad } from './InputPad';
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const refKind = ref('支出')
    const refExpensesTags = ref([
      { id: 1, name: '餐费', sign: '￥', category: 'expenses'},
      { id: 2, name: '打车', sign: '￥', category: 'expenses'},
      { id: 3, name: '聚餐', sign: '￥', category: 'expenses'}
    ])
    const refIncomeTags = ref([
      { id: 4, name: '工资', sign: '￥', category: 'income'},
      { id: 5, name: '彩票', sign: '￥', category: 'income'},
      { id: 6, name: '滴滴', sign: '￥', category: 'income'}
    ])
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
                {refExpensesTags.value.map(tag=>{
                  return <div class={s.tag}>
                    <div class={s.sign}>
                      {tag.sign}
                    </div>
                    <div class={s.name}>
                      {tag.name}
                    </div>
                  </div>
                })}
              </Tab>
              <Tab name="收入">
                {refIncomeTags.value.map(tag => {
                  return <span>{tag.name}</span>
                })}
              </Tab>
            </Tabs>
            <div class={s.inputPad_wrapper}>
              <InputPad />
            </div>
            
          </>
        }
      }</MainLayout>
    )
  }
})
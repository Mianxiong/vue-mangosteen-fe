
import { Component, DefineComponent, defineComponent, PropType, reactive, ref, toRaw, watchEffect } from 'vue';
import { Overlay } from 'vant'

import s from './TimeTabsLayout.module.scss'
import { ItemSummary } from '../components/item/ItemSummary';
import { Form, FormItem } from '../shared/Form';
import { OverlayIcon } from '../shared/Overlay';
import { Time } from '../shared/time';
import { MainLayout } from './MainLayout';
import { Tab, Tabs } from '../shared/Tabs';
import { useItemStore } from '../stores/useItemStore';

const demo = defineComponent({
    props: {
        startDate: {
            type: String as PropType<string>,
            required: false
        },
        endDate: {
            type: String as PropType<string>,
            required: false
        }
    }
})

export const TimeTabsLayout = defineComponent({
    props: {
        component: {
            type: Object as PropType<typeof demo>,
            required: true  
        },
        rerenderOnSwitchTab: {
          type: Boolean,
          default: false
        },
        hideThisYear: {
          type: Boolean,
          default: false
        }
    },
  setup: (props, context) => {
    const refSelected = ref('本月')
    // const t = new Time(new Date(2000, 0, 31, 0, 0, 0))
    // console.log(t.add(1, 'month').getRaw());
    const time = new Time()
    // const customTime = reactive([new Date(), new Date()])
    // const customTime = reactive({
    //   start: new Time().format(), end: new Time().format()
    // })
    const tempTime = reactive({
      start: new Time().format(),
      end: new Time().format()
    })
    const customTime = reactive<{start?:string,end?:string}>({})
    // Object.assign(customTime, tempTime)
    const timeList = [
      {start: time.firstDayOfMonth(), end: time.lastDayOfMonth()},
      {start: time.add(-1,'month').firstDayOfMonth(), end: time.add(-1,'month').lastDayOfMonth()},
      {start: time.firstDayOfYear(), end: time.lastDayOfYear()}
      // [time.firstDayOfMonth(), time.lastDayOfMonth()],
      // [time.add(-1, 'month').firstDayOfMonth(), time.add(-1,'month').lastDayOfMonth()],
      // [time.firstDayOfYear(), time.lastDayOfYear()]
    ]
    // watchEffect(()=> {
    //   if(refSelected.value === '自定义时间') {
    //     refOverlayVisible.value = true
    //   }
    // })
    const refOverlayVisible = ref(false)
    const onSubmitCustomTime = (e:Event) => {
      e.preventDefault()
      refOverlayVisible.value = false
      Object.assign(customTime, tempTime)
      // if (customTime.start === tempTime.start && customTime.start === tempTime.end) {
      //   const itemStore = useItemStore(['items', customTime.start, customTime.end])()
      //   itemStore.$reset()
      //   itemStore.fetchItems(customTime.start, customTime.end)
      // } else {
      // Object.assign(customTime, tempTime)
      // }
      // console.log('1',customTime);
      // tempTime.end = new Time(customTime.end + 'T00:00:00.000+0800').add(1,'day').format()
      // console.log('2',customTime);
    }
    const onSelect = (value: string) => { if (value === '自定义时间') { refOverlayVisible.value = true } }
    return () => (
      <MainLayout>{
        {
          title: () => '点滴记账',
          icon: () => <OverlayIcon />,
          default: () => <>
            {props.hideThisYear ? (
              <Tabs classPrefix='customTabs' v-model:selected={refSelected.value}
              onUpdate:selected={ onSelect } rerenderOnSelect={props.rerenderOnSwitchTab}>
              <Tab name="本月" value="本月">
                <props.component startDate={timeList[0].start.format()} endDate={timeList[0].end.format()}/>
              </Tab>
              <Tab name="上月" value="上月">
                {/* <ItemSummary /> */}
                <props.component startDate={timeList[1].start.format()} endDate={timeList[1].end.format()} />
              </Tab>
              <Tab name="自定义时间" value="自定义时间">
                {/* <ItemSummary /> */}
                <props.component startDate={customTime.start} endDate={customTime.end} />
              </Tab>
            </Tabs>
            ) : (
              <Tabs classPrefix='customTabs' v-model:selected={refSelected.value}
              onUpdate:selected={ onSelect } rerenderOnSelect={props.rerenderOnSwitchTab}>
              <Tab name="本月" value="本月">
                <props.component startDate={timeList[0].start.format()} endDate={timeList[0].end.format()}/>
              </Tab>
              <Tab name="上月" value="上月">
                {/* <ItemSummary /> */}
                <props.component startDate={timeList[1].start.format()} endDate={timeList[1].end.format()} />
              </Tab>
              <Tab name="今年" value="今年">
                {/* <ItemSummary /> */}
                <props.component startDate={timeList[2].start.format()} endDate={timeList[2].end.format()} />
              </Tab>
              <Tab name="自定义时间" value="自定义时间">
                {/* <ItemSummary /> */}
                <props.component startDate={customTime.start} endDate={customTime.end} />
              </Tab>
            </Tabs>
            )}
            
            <Overlay show={refOverlayVisible.value} class={s.overlay}>
              <div class={s.overlay_inner}>
                <header>
                  请选择时间
                </header>
                <main>
                  <Form onSubmit={onSubmitCustomTime}>
                    <FormItem label='开始时间' v-model={tempTime.start} type='date'/>
                    <FormItem label='结束时间' v-model={tempTime.end} type='date'/>
                    <FormItem>
                      <div class={s.actions}>
                        <button type='button' onClick={() => refOverlayVisible.value = false}>取消</button>
                        <button type='submit'>确认</button>
                      </div>
                    </FormItem>
                  </Form>
                </main>
              </div>
            </Overlay>
          </>
        }
      }</MainLayout>
    )
  }
})


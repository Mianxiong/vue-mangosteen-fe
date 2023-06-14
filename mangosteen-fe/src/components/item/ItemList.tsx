
import { defineComponent, PropType, reactive, ref, toRaw, watchEffect } from 'vue';
import {Overlay} from 'vant'
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/icon';
import { Tab, Tabs } from '../../shared/Tabs';
import s from './ItemList.module.scss'
import { ItemSummary } from './ItemSummary';
import { Time } from '../../shared/time';
import { Form, FormItem } from '../../shared/Form';
import { OverlayIcon } from '../../shared/Overlay';
import { TimeTabsLayout } from '../../layouts/TimeTabsLayout';

export const ItemList = defineComponent({
  setup: (props, context) => {
    // const refSelected = ref('本月')
    // // const t = new Time(new Date(2000, 0, 31, 0, 0, 0))
    // // console.log(t.add(1, 'month').getRaw());
    // const time = new Time()
    // // const customTime = reactive([new Date(), new Date()])
    // const customTime = reactive({
    //   start: new Time().format(), end: new Time().format()
    // })
    // const timeList = [
    //   {start: time.firstDayOfMonth(), end: time.lastDayOfMonth()},
    //   {start: time.add(-1,'month').firstDayOfMonth(), end: time.add(-1,'month').lastDayOfMonth()},
    //   {start: time.firstDayOfYear(), end: time.lastDayOfYear()}
    //   // [time.firstDayOfMonth(), time.lastDayOfMonth()],
    //   // [time.add(-1, 'month').firstDayOfMonth(), time.add(-1,'month').lastDayOfMonth()],
    //   // [time.firstDayOfYear(), time.lastDayOfYear()]
    // ]
    // // watchEffect(()=> {
    // //   if(refSelected.value === '自定义时间') {
    // //     refOverlayVisible.value = true
    // //   }
    // // })
    // const refOverlayVisible = ref(false)
    // const onSubmitCustomTime = (e:Event) => {
    //   e.preventDefault()
    //   refOverlayVisible.value = false
    // }
    // const onSelect = (value: string) => { if (value === '自定义时间') { refOverlayVisible.value = true } }
    return () => (
      <TimeTabsLayout component={ItemSummary}/>
      // <MainLayout>{
      //   {
      //     title: () => '点滴记账',
      //     icon: () => <OverlayIcon />,
      //     default: () => <>
      //       <Tabs classPrefix='customTabs' v-model:selected={refSelected.value}
      //         onUpdate:selected={ onSelect }>
      //         <Tab name="本月">
      //           <ItemSummary startDate={timeList[0].start.format()} endDate={timeList[0].end.format()}/>
      //         </Tab>
      //         <Tab name="上月">
      //           {/* <ItemSummary /> */}
      //           <ItemSummary startDate={timeList[1].start.format()} endDate={timeList[1].end.format()} />
      //         </Tab>
      //         <Tab name="今年">
      //           {/* <ItemSummary /> */}
      //           <ItemSummary startDate={timeList[2].start.format()} endDate={timeList[2].end.format()} />
      //         </Tab>
      //         <Tab name="自定义时间">
      //           {/* <ItemSummary /> */}
      //           <ItemSummary startDate={customTime.start} endDate={customTime.end} />
      //         </Tab>
      //       </Tabs>
      //       <Overlay show={refOverlayVisible.value} class={s.overlay}>
      //         <div class={s.overlay_inner}>
      //           <header>
      //             请选择时间
      //           </header>
      //           <main>
      //             <Form onSubmit={onSubmitCustomTime}>
      //               <FormItem label='开始时间' v-model={customTime.start} type='date'/>
      //               <FormItem label='结束时间' v-model={customTime.end} type='date'/>
      //               <FormItem>
      //                 <div class={s.actions}>
      //                   <button type='button' onClick={() => refOverlayVisible.value = false}>取消</button>
      //                   <button type='submit'>确认</button>
      //                 </div>
      //               </FormItem>
      //             </Form>
      //           </main>
      //         </div>
      //       </Overlay>
      //     </>
      //   }
      // }</MainLayout>
    )
  }
})



import { defineComponent, PropType, reactive, ref, toRaw } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/icon';
import { Tab, Tabs } from '../../shared/Tabs';
import s from './ItemList.module.scss'
import { ItemSummary } from './ItemSummary';
import { Time } from '../../shared/time';

export const ItemList = defineComponent({
  setup: (props, context) => {
    const refSelected = ref('本月')
    // const t = new Time(new Date(2000, 0, 31, 0, 0, 0))
    // console.log(t.add(1, 'month').getRaw());
    const time = new Time()
    // const customTime = reactive([new Date(), new Date()])
    const customTime = reactive({
      start: new Time(), end: new Time()
    })
    const timeList = [
      {start: time.firstDayOfMonth(), end: time.lastDayOfMonth()},
      {start: time.add(-1,'month').firstDayOfMonth(), end: time.add(-1,'month').lastDayOfMonth()},
      {start: time.firstDayOfYear(), end: time.lastDayOfYear()}
      // [time.firstDayOfMonth(), time.lastDayOfMonth()],
      // [time.add(-1, 'month').firstDayOfMonth(), time.add(-1,'month').lastDayOfMonth()],
      // [time.firstDayOfYear(), time.lastDayOfYear()]
    ]
    
    return () => (
      <MainLayout>{
        {
          title: () => '点滴记账',
          icon : () => <Icon name="menu"/>,
          default: () => (
            <Tabs classPrefix={'customTabs'} v-model:selected={refSelected.value}>
              <Tab name="本月">
                <ItemSummary startDate={timeList[0].start.format()} endDate={timeList[0].end.format()}/>
              </Tab>
              <Tab name="上月">
                {/* <ItemSummary /> */}
                <ItemSummary startDate={timeList[1].start.format()} endDate={timeList[1].end.format()} />
              </Tab>
              <Tab name="今年">
                {/* <ItemSummary /> */}
                <ItemSummary startDate={timeList[2].start.format()} endDate={timeList[2].end.format()} />
              </Tab>
              <Tab name="自定义时间">
                {/* <ItemSummary /> */}
                <ItemSummary startDate={customTime.start.format()} endDate={customTime.end.format()} />
              </Tab>
            </Tabs>
          )
        }
      }</MainLayout>
    )
  }
})


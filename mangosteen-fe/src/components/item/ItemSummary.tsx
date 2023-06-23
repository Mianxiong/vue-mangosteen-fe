import { defineComponent, onMounted, PropType, reactive, ref, watch } from 'vue';
import s from './ItemSummary.module.scss'
import { FloatButton } from '../../shared/FloatButton';
import { http } from '../../shared/Http';
import { Button } from '../../shared/Button';
import { Money } from '../../shared/Money';
import { Datetime } from '../../shared/DateTime';
import { Center } from '../../shared/Center';
import { Icon } from '../../shared/icon';
import { RouterLink } from 'vue-router';
import { useAfterMe } from '../../hooks/useAfterMe';
import { useItemStore } from '../../stores/useItemStore';
import { Time } from '../../shared/time';
export const ItemSummary = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: false
    },
    endDate: {
      type: String as PropType<string>,
      required: false
    },
    // onSubmit: {
    //   type: Boolean as PropType<boolean>,
    //   required: false
    // }
  },
  setup: (props, context) => {
    // const items = ref<Item[]>([])
    // const hasMore = ref(false)
    // const page = ref(0)
    // const fetchItems = async () => {
    //   if (!props.startDate || !props.endDate) { return }
    //   const response = await http.get<Resources<Item>>('/items', {
    //     happen_after: props.startDate,
    //     happen_before: props.endDate,
    //     page: page.value + 1
    //   }, {
    //     _mock: 'itemIndex',
    //     _autoLoading: true
    //   })
    //   const { resources, pager } = response.data
    //   items.value?.push(...resources)
    //   hasMore.value = (pager.page - 1) * pager.per_page + resources.length < pager.count
    //   page.value += 1
    // }

    // if(!props.startDate || !props.endDate) {
    //   return () => <div>请先选择时间范围</div>
    // }

    // onMounted(fetchItems)
    // useAfterMe(fetchItems)
    const itemStore = useItemStore(['items', props.startDate, props.endDate])()
    useAfterMe(() => itemStore.fetchItems(props.startDate, props.endDate))

    // watch(() => [props.startDate, props.endDate], () => {
    //   items.value = []
    //   hasMore.value = false
    //   page.value = 0
    //   fetchItems()
    // })
    watch(
      () => [props.startDate, props.endDate],
      () => {
        // itemStore.reset()
        itemStore.$reset()     
        itemStore.fetchItems(props.startDate, props.endDate)
      }
    )
    const itemsBalance = reactive({
      expenses: 0, income: 0, balance: 0
    })
    const fetchItemsBalance = async () => {
      if (!props.startDate || !props.endDate) { return }
      const endDate = new Time(props.endDate + 'T00:00:00.000+0800').add(1, 'day').format()
      const response = await http.get('/items/balance', {
        happen_after: props.startDate,
        happen_before: endDate,
        // page: page.value + 1
      }, {
        _mock: 'itemIndexBalance',
      })
      Object.assign(itemsBalance, response.data)
    }
    // onMounted(fetchItemsBalance)
    useAfterMe(fetchItemsBalance)
    watch(() => [props.startDate, props.endDate], () => {
      Object.assign(itemsBalance, {
        expenses: 0, income: 0, balance: 0
      })
      fetchItemsBalance()
    })
    return () => (
      !props.startDate || !props.endDate ? (<div>请先选择时间范围</div>
      ) : (
        <div class={s.wrapper}>
          {(itemStore.items && itemStore.items.length > 0) ? (
            <>
              <ul class={s.total}>
                <li>
                  <span>收入</span>
                  <Money value={itemsBalance.income} />
                </li>
                <li>
                  <span>支出</span>
                  <Money value={itemsBalance.expenses} />
                </li>
                <li>
                  <span>净收入</span>
                  <Money value={itemsBalance.balance} />
                </li>
              </ul>
              <ol class={s.list}>
                {itemStore.items.map((item) => (
                  <li>
                    <div class={s.sign}>
                      {/* <span>{item.tags_id[0]}</span> */}
                      {/* <span>{item.tags![0].sign}</span> */}
                      <span>{item.tags && item.tags.length > 0 ? item.tags[0].sign : '💰'}</span>
                    </div>
                    <div class={s.text}>
                      <div class={s.tagAndAmount}>
                        {/* <span class={s.tag}>{item.tags_id[0]}</span> */}
                        {/* <span class={s.tag}>{item.tags![0].name}</span> */}
                        <span class={s.tag}>{item.tags && item.tags.length > 0 ? item.tags[0].name : '未分类'}</span>
                        <span class={s.amount}>￥<Money value={item.amount} /></span>
                      </div>
                      <div class={s.time}><Datetime value={item.happen_at} /></div>
                    </div>
                  </li>
                ))}
              </ol>
              <div class={s.more}>
                {itemStore.hasMore ?
                  <Button onClick={() => itemStore.fetchNextPage(props.startDate, props.endDate)}>加载更多</Button> :
                  <span>没有更多</span>
                }
              </div>
            </>
          ) : (
            <>
              <Center class={s.pig_wrapper} direction="|">
                <Icon name="pig" class={s.pig} />
                <p>目前没有数据</p>
              </Center>
              <div class={s.button_wrapper}>
                <RouterLink to="/items/create">
                  <Button class={s.button}>开始记账</Button>
                </RouterLink>
              </div>
            </>
          )}
          {/* <FloatButton iconName="add" /> */}

          {/* <ul class={s.total}>
          <li><span>收入</span><span>128</span></li>
          <li><span>支出</span><span>99</span></li>
          <li><span>净收入</span><span>39</span></li>
        </ul>
        <ol class={s.list}>
          <li>
            <div class={s.sign}>
              <span>X</span>
            </div>
            <div class={s.text}>
              <div class={s.tagAndAmount}>
                <span class={s.tag}>旅行</span>
                <span class={s.amount}>￥1234</span>
              </div>
              <div class={s.time}>
                2000-01-01 12:39
              </div>
            </div>
          </li>
          <li>
            <div class={s.sign}>
              <span>X</span>
            </div>
            <div class={s.text}>
              <div class={s.tagAndAmount}>
                <span class={s.tag}>旅行</span>
                <span class={s.amount}>￥1234</span>
              </div>
              <div class={s.time}>
                2000-01-01 12:39
              </div>
            </div>
          </li>
          <li>
            <div class={s.sign}>
              <span>X</span>
            </div>
            <div class={s.text}>
              <div class={s.tagAndAmount}>
                <span class={s.tag}>旅行</span>
                <span class={s.amount}>￥1234</span>
              </div>
              <div class={s.time}>
                2000-01-01 12:39
              </div>
            </div>
          </li>
          <li>
            <div class={s.sign}>
              <span>X</span>
            </div>
            <div class={s.text}>
              <div class={s.tagAndAmount}>
                <span class={s.tag}>旅行</span>
                <span class={s.amount}>￥1234</span>
              </div>
              <div class={s.time}>
                2000-01-01 12:39
              </div>
            </div>
          </li>
          <li>
            <div class={s.sign}>
              <span>X</span>
            </div>
            <div class={s.text}>
              <div class={s.tagAndAmount}>
                <span class={s.tag}>旅行</span>
                <span class={s.amount}>￥1234</span>
              </div>
              <div class={s.time}>
                2000-01-01 12:39
              </div>
            </div>
          </li>
          <li>
            <div class={s.sign}>
              <span>X</span>
            </div>
            <div class={s.text}>
              <div class={s.tagAndAmount}>
                <span class={s.tag}>旅行</span>
                <span class={s.amount}>￥1234</span>
              </div>
              <div class={s.time}>
                2000-01-01 12:39
              </div>
            </div>
          </li>
        </ol>
        <div class={s.more}>向下滑动加载更多</div>
        <FloatButton iconName='add' /> */}
          <RouterLink to="/items/create">
            <FloatButton iconName='add' />
          </RouterLink>
        </div>)
    )
  }
})
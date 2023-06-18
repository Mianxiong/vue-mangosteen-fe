import { defineComponent, onMounted, PropType, ref } from 'vue';
import s from './ItemCreate.module.scss';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/icon';
import { Tabs, Tab } from '../../shared/Tabs';
import { InputPad } from './InputPad';
import { http } from '../../shared/Http';
import { Button } from '../../shared/Button';
import { useTags } from '../../shared/useTags';
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    // const refExpensesTags = ref([
    //   { id: 1, name: '餐费', sign: '￥', category: 'expenses' },
    //   { id: 2, name: '打车', sign: '￥', category: 'expenses' },
    //   { id: 3, name: '聚餐', sign: '￥', category: 'expenses' },
    //   { id: 4, name: '打车', sign: '￥', category: 'expenses' },
    //   { id: 5, name: '聚餐', sign: '￥', category: 'expenses' },
    //   { id: 6, name: '打车', sign: '￥', category: 'expenses' },
    //   { id: 7, name: '聚餐', sign: '￥', category: 'expenses' },
    // ])
    // const refIncomeTags = ref([
    //   { id: 4, name: '工资', sign: '￥', category: 'income' },
    //   { id: 5, name: '彩票', sign: '￥', category: 'income' },
    //   { id: 6, name: '滴滴', sign: '￥', category: 'income' },
    //   { id: 11, name: '彩票', sign: '￥', category: 'income' },
    //   { id: 18, name: '滴滴', sign: '￥', category: 'income' },
    //   { id: 17, name: '彩票', sign: '￥', category: 'income' },
    //   { id: 19, name: '滴滴', sign: '￥', category: 'income' },
    //   { id: 4, name: '工资', sign: '￥', category: 'income' },
    //   { id: 5, name: '彩票', sign: '￥', category: 'income' },
    //   { id: 6, name: '滴滴', sign: '￥', category: 'income' },
    //   { id: 11, name: '彩票', sign: '￥', category: 'income' },
    //   { id: 18, name: '滴滴', sign: '￥', category: 'income' },
    //   { id: 17, name: '彩票', sign: '￥', category: 'income' },
    //   { id: 19, name: '滴滴', sign: '￥', category: 'income' },
    //   { id: 4, name: '工资', sign: '￥', category: 'income' },
    //   { id: 5, name: '彩票', sign: '￥', category: 'income' },
    //   { id: 6, name: '滴滴', sign: '￥', category: 'income' },
    //   { id: 11, name: '彩票', sign: '￥', category: 'income' },
    //   { id: 18, name: '滴滴', sign: '￥', category: 'income' },
    //   { id: 17, name: '彩票', sign: '￥', category: 'income' },
    //   { id: 19, name: '滴滴', sign: '￥', category: 'income' },
    //   { id: 4, name: '工资', sign: '￥', category: 'income' },
    //   { id: 5, name: '彩票', sign: '￥', category: 'income' },
    //   { id: 6, name: '滴滴', sign: '￥', category: 'income' },
    //   { id: 11, name: '彩票', sign: '￥', category: 'income' },
    //   { id: 18, name: '滴滴', sign: '￥', category: 'income' },
    //   { id: 17, name: '彩票', sign: '￥', category: 'income' },
    //   { id: 19, name: '滴滴', sign: '￥', category: 'income' },
    //   { id: 4, name: '工资', sign: '￥', category: 'income' },
    //   { id: 5, name: '彩票', sign: '￥', category: 'income' },
    //   { id: 6, name: '滴滴', sign: '￥', category: 'income' },
    //   { id: 11, name: '彩票', sign: '￥', category: 'income' },
    //   { id: 18, name: '滴滴', sign: '￥', category: 'income' },
    //   { id: 17, name: '彩票', sign: '￥', category: 'income' },
    //   { id: 19, name: '滴滴', sign: '￥', category: 'income' },
    // ])
    const refKind = ref('支出')

    const {tags: expensesTags, hasMore, fetchTags} = useTags((page)=>{
      return http.get<Resources<Tag>>('/tags', {
        kind: 'expenses',
        page: page + 1,
        _mock: 'tagIndex'
      })
    })

    const { tags: incomeTags, hasMore:hasMore2, fetchTags: fetchTags2 } = useTags((page) => {
      return http.get<Resources<Tag>>('/tags', {
        kind: 'income',
        page: page + 1,
        _mock: 'tagIndex'
      })
    })

    // const response = await http.get<Resources<Tag>>('/tags', {
    //   kind: 'expenses',
    //   page: page.value + 1,
    //   _mock: 'tagIndex'
    // })

    // const refPage = ref(0)
    // const refHasMore = ref(false)
    // const refExpensesTags = ref<Tag[]>([])
    // const fetchTags = async ()=> {
    //   const response = await http.get<Resources<Tag>>('/tags', {
    //     kind: 'expenses',
    //     page: refPage.value + 1,
    //     _mock: 'tagIndex'
    //   })
    //   const { resources, pager } = response.data
    //   refExpensesTags.value.push(...resources)
    //   refHasMore.value = (pager.page - 1) * pager.per_page + resources.length < pager.count
    //   refPage.value += 1
    // }
    // const onLoadMore = fetchTags
    // onMounted(fetchTags)


    // onMounted(()=>{
    //   fetchTags()
    // })
    // const onLoadMore = async () => {
    //   const response = await http.get<Resources<Tag>>('/tags', {
    //     kind: 'expenses',
    //     page: refPage.value + 1,
    //     _mock: 'tagIndex'
    //   })
    //   const {resources, pager} = response.data
    //   refExpensesTags.value.push(...resources)
    //   refHasMore.value = (pager.page - 1) * pager.per_page + resources.length < pager.count
    //   refPage.value += 1
    // }
    // onMounted(async () => {
    //   // const response = await http.get<{ resources: Tag[] }>('/tags', {
    //   const response = await http.get<Resources<Tag>>('/tags', {
    //     kind: 'expenses',
    //     page: refPage.value + 1,
    //     _mock: 'tagIndex'
    //   })
    //   const {resources, pager} = response.data
    //   // refExpensesTags.value = resources
    //   refExpensesTags.value.push(...resources)
    //   refHasMore.value = (pager.page - 1) * pager.per_page + resources.length < pager.count
    //   refPage.value += 1
    // })
    onMounted(async () => {
      const response = await http.get<{ resources: Tag[] }>('/tags', {
        kind: 'income',
        _mock: 'tagIndex'
      })
      refIncomeTags.value = response.data.resources
    })
    const refIncomeTags = ref<Tag[]>([])
    // const onUpdateSelected = (name: string) => refKind.value = name
    return () => (
      <MainLayout class={s.layout}>{
        {
          title: () => '记一笔',
          icon: () => <Icon name="left" class={s.navIcon} />,
          default: () => <>
            {/* <Tabs selected={refKind.value} onUpdateSelected={name => refKind.value = name}> */}
            {/* <Tabs selected={refKind.value} onUpdateSelected={onUpdateSelected}> */}
            <div class={s.wrapper}>
              {/* 接受一个值，监听一个事件 */}
              {/* 如果不用v-model，用事件怎么办？ */}
              <Tabs v-model:selected={refKind.value} class={s.tabs}>
                <Tab name="支出">
                  <div class={s.tags_wrapper}>
                    <div class={s.tag}>
                      <div class={s.sign}>
                        <Icon name="add" class={s.createTag} />
                      </div>
                      <div class={s.name}>
                        新增
                      </div>
                    </div>
                    {expensesTags.value.map(tag =>
                      <div class={[s.tag, s.selected]}>
                        <div class={s.sign}>
                          {tag.sign}
                        </div>
                        <div class={s.name}>
                          {tag.name}
                        </div>
                      </div>
                    )}
                  </div>
                 
                  <div class={s.more}>
                    {hasMore.value ? <Button class={s.loadMore} onClick={fetchTags}>加载更多</Button> : <span class={s.noMore}>没有更多</span>}                   
                  </div>
                </Tab>
                <Tab name="收入">
                  <div class={s.tags_wrapper}>
                    <div class={s.tag}>
                      <div class={s.sign}>
                        <Icon name="add" class={s.createTag} />
                      </div>
                      <div class={s.name}>
                        新增
                      </div>
                    </div>
                    {incomeTags.value.map(tag =>
                      <div class={[s.tag, s.selected]}>
                        <div class={s.sign}>
                          {tag.sign}
                        </div>
                        <div class={s.name}>
                          {tag.name}
                        </div>
                      </div>
                    )}
                  </div>
                  <div class={s.more}>
                    {hasMore2.value ? <Button class={s.loadMore} onClick={fetchTags2}>加载更多</Button> : <span class={s.noMore}>没有更多</span>}
                  </div>
                </Tab>
              </Tabs>
              <div class={s.inputPad_wrapper}>
                <InputPad />
              </div>
            </div>         
          </>
        }
      }</MainLayout>
    )
  }
})
import { defineComponent, reactive, toRaw } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { EmojiSelect } from '../../shared/EmojiSelect';
import { Rules, validate } from '../../shared/validate';
import s from './Tag.module.scss';
import { Icon } from '../../shared/icon';
import { Button } from '../../shared/Button';
import { TagForm } from './TagForm';
import { BackIcon } from '../../shared/BackIcon';
import { useRoute, useRouter } from 'vue-router';
import { http } from '../../shared/Http';
import { Dialog } from 'vant';
export const TagEdit = defineComponent({
  setup: (props, context) => {
    // const formData = reactive({
    //   name: '',
    //   sign: ''
    // })
    // const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({})
    // const onSubmit = (e: Event) => {
    //   console.log(toRaw(formData))
    //   // 会去做推测
    //   const rules: Rules<typeof formData> = [
    //     { key: 'name', type: 'required', message: '必填' },
    //     { key: 'name', type: 'pattern', regex: /^.{1,4}$/, message: '只能填 1 到 4 个字符' },
    //     { key: 'sign', type: 'required', message: '必填' }
    //   ]
    //   Object.assign(errors, {
    //     name: undefined,
    //     sign: undefined
    //   })
    //   // const errors = validate(formData, rules)
    //   // 将得到的错误一个一个覆盖给 errors
    //   Object.assign(errors, validate(formData, rules))
    //   console.log(errors);

    //   // 不会去做推测，会去对比
    //   // const errors = validate(formData, [
    //   //     { key: 'name', type: 'required', message: '必填' },
    //   //     { key: 'name', type: 'pattern', regex: /^.{1,4}$/, message: '只能填 1 到 4 个字符' },
    //   //     { key: 'sign', type: 'required', message: '必填' }
    //   // ])
    //   // errors = {
    //   //     name: ['错误1','错误2'],
    //   //     sign: ['错误3','错误4']
    //   // }
    //   e.preventDefault()
    // }
    const route = useRoute()
    const numberId = parseInt(route.params.id!.toString())
    if (Number.isNaN(numberId)) {
      return () => <div>id 不存在</div>
    }
    const router = useRouter()
    const onError = ()=>{
      Dialog.alert({title:'提示', message:'删除失败'})
    }
    const onDelete = async (options?: {withItems?: boolean}) => {
      // 这个await它只会等到成功的那一瞬间
      await Dialog.confirm({
        title: '确认',
        message: '你真的要删除吗？'
      })
      await http.delete(`/tags/${numberId}`,{
        with_items: options?.withItems ? 'true' : 'false'
      }, {_autoLoading: true}).catch(onError)
      router.back()
    }
    // const onDeleteHard = () => {
    //   await http.delete(`/tags/${numberId}`, {
    //     withItems: true
    //   })
    // }

    return () => (
      <MainLayout>{{
        title: () => '编辑标签',
        icon: () => <BackIcon />,
        default: () => <>
          <TagForm id={numberId} />
          <div class={s.actions}>
            {/* <Button level='danger' class={s.removeTags} onClick={()=>onDelete()}>删除标签</Button> */}
            <Button level='danger' class={s.removeTagsAndItems} onClick={() => onDelete({ withItems: true })}>删除标签（对应记账也会被删除）</Button>
          </div>
        </>
      }}</MainLayout>
    )
  }
})

export default TagEdit
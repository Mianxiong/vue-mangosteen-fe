import { defineComponent, reactive, toRaw } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { EmojiSelect } from '../../shared/EmojiSelect';
import { Rules, validate } from '../../shared/validate';
import s from './Tag.module.scss';
import { Icon } from '../../shared/icon';
import { Button } from '../../shared/Button';
import { TagForm } from './TagForm';
import { BackIcon } from '../../shared/BackIcon';
export const TagEdit = defineComponent({
  setup: (props, context) => {
    const formData = reactive({
      name: '',
      sign: ''
    })
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({})
    const onSubmit = (e: Event) => {
      console.log(toRaw(formData))
      // 会去做推测
      const rules: Rules<typeof formData> = [
        { key: 'name', type: 'required', message: '必填' },
        { key: 'name', type: 'pattern', regex: /^.{1,4}$/, message: '只能填 1 到 4 个字符' },
        { key: 'sign', type: 'required', message: '必填' }
      ]
      Object.assign(errors, {
        name: undefined,
        sign: undefined
      })
      // const errors = validate(formData, rules)
      // 将得到的错误一个一个覆盖给 errors
      Object.assign(errors, validate(formData, rules))
      console.log(errors);

      // 不会去做推测，会去对比
      // const errors = validate(formData, [
      //     { key: 'name', type: 'required', message: '必填' },
      //     { key: 'name', type: 'pattern', regex: /^.{1,4}$/, message: '只能填 1 到 4 个字符' },
      //     { key: 'sign', type: 'required', message: '必填' }
      // ])
      // errors = {
      //     name: ['错误1','错误2'],
      //     sign: ['错误3','错误4']
      // }
      e.preventDefault()
    }
    return () => (
      <MainLayout>{{
        title: () => '新建标签',
        icon: () => <BackIcon />,
        default: () => <>
          <TagForm />
          <div class={s.actions}>
            <Button level='danger' class={s.removeTags} onClick={() => { }}>删除</Button>
            <Button level='danger' class={s.removeTagsAndItems} onClick={() => { }}>删除标签和记账</Button>
          </div>
        </>
      }}</MainLayout>
    )
  }
})
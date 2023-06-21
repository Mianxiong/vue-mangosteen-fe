import { defineComponent, onMounted, PropType, reactive, toRaw } from 'vue';
import s from './Tag.module.scss';
import { EmojiSelect } from '../../shared/EmojiSelect';
import { hasError, Rules, validate } from '../../shared/validate';
import { Button } from '../../shared/Button';
import { Form, FormItem } from '../../shared/Form';
import { useRoute, useRouter } from 'vue-router';
import { http } from '../../shared/Http';
import { onFormError } from '../../shared/onFormError';
export const TagForm = defineComponent({
    props: {
        id: Number
    },
    setup: (props, context) => {
        const route = useRoute()
        // if(!route.query.kind) {
        //     return ()=><div>参数错误</div>
        // }
        const formData = reactive<Partial<Tag>>({
            id: undefined,
            name: '',
            sign: '',
            kind: route.query.kind!.toString()
        })
        const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({})
        const router = useRouter()
        const onSubmit = async (e: Event) => {
            e.preventDefault()
            console.log(toRaw(formData))
            // 会去做推测
            const rules: Rules<typeof formData> = [
                { key: 'name', type: 'required', message: '必填' },
                { key: 'name', type: 'pattern', regex: /^.{1,4}$/, message: '只能填 1 到 4 个字符' },
                { key: 'sign', type: 'required', message: '必填' }
            ]
            Object.assign(errors, {
                name: [],
                sign: []
            })
            // const errors = validate(formData, rules)
            // 将得到的错误一个一个覆盖给 errors
            Object.assign(errors, validate(formData, rules))
            console.log(errors);
            if (!hasError(errors)) {
                const promise = await formData.id ? http.post(`/tags/${formData.id}`, formData, {
                    _mock: 'tagEdit', _autoLoading: true
                }) :
                    http.post(`/tags`, formData, {
                        _mock: 'tagCreate', _autoLoading: true
                    })
                await promise.catch((error) =>
                    onFormError(error, (data) => Object.assign(errors, data.errors))
                )
                router.back()
                // if(formData.id) {
                //     await http.post(`/tags/${formData.id}`, formData, {
                //         params: { _mock: 'tagEdit' }
                //     }).catch((error) => {
                //         onFormError(error, (data) => {
                //             Object.assign(errors, data.errors)
                //         })
                //     })
                //     router.back()
                // } else {
                //     await http.post(`/tags`, formData, {
                //         params: { _mock: 'tagCreate' }
                //     }).catch((error) => {
                //         onFormError(error, (data) => {
                //             Object.assign(errors, data.errors)
                //         })
                //     })
                //     router.back()
                // }

            }

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
        }
        onMounted(async () => {
            if (!props.id) { return }
            const response = await http.get<Resource<Tag>>(`/tags/${props.id}`, {}, { _mock: 'tagShow' })
            console.log(response);
            Object.assign(formData, response.data.resource)
        })
        return () => (
            // <form class={s.form} onSubmit={onSubmit}>
            //     <div class={s.formRow}>
            //         <label class={s.formLabel}>
            //             <span class={s.formItem_name}>标签名</span>
            //             <div class={s.formItem_value}>
            //                 <input v-model={formData.name} class={[s.formItem, s.input, s.error]}></input>
            //             </div>
            //             <div class={s.formItem_errorHint}>
            //                 <span>{errors['name'] ? errors['name'][0] : ' '}</span>
            //             </div>
            //         </label>
            //     </div>
            //     <div class={s.formRow}>
            //         <label class={s.formLabel}>
            //             <span class={s.formItem_name}>符号{formData.sign}</span>
            //             <div class={s.formItem_value}>
            //                 <EmojiSelect v-model={formData.sign} class={[s.formItem, s.emojiList, s.error]} />
            //             </div>
            //             <div class={s.formItem_errorHint}>
            //                 <span>{errors['sign'] ? errors['sign'][0] : ' '}</span>
            //             </div>
            //         </label>
            //     </div>
            //     <p class={s.tips}>记账时长按标签即可进行编辑</p>
            //     <div class={s.formRow}>
            //         <div class={s.formItem_value}>
            //             <Button class={[s.formItem, s.button]}>确定</Button>
            //         </div>
            //     </div>
            // </form>
            <Form onSubmit={onSubmit}>
                <FormItem label='标签名（最多 4 个 字符）'
                    type="text"
                    v-model={formData.name}
                    error={errors['name']?.[0]} />
                <FormItem label={'符号 ' + formData.sign}
                    type="emojiSelect" v-model={formData.sign}
                    error={errors['sign']?.[0]} />
                <FormItem>
                    <p class={s.tips}>记账时长按标签即可进行编辑</p>
                </FormItem>
                <FormItem>
                    <Button type="submit" class={[s.button]}>确定</Button>
                </FormItem>
            </Form>
        )
    }
})
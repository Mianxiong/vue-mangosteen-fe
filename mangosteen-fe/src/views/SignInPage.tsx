import { defineComponent, PropType, reactive, ref } from 'vue';
import s from './SignInPage.module.scss';
import { MainLayout } from '../layouts/MainLayout';
import { Icon } from '../shared/icon';
import { Form, FormItem } from '../shared/Form';
import { Button } from '../shared/Button';
import { hasError, validate } from '../shared/validate';
import { http } from '../shared/Http';
import { useBool } from '../hooks/useBool';
import { history } from '../shared/history';
import { useRoute, useRouter } from 'vue-router';
import { refreshMe } from '../shared/me';
import { BackIcon } from '../shared/BackIcon';
import { useMeStore } from '../stores/useMeStore';
export const SignInPage = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup: (props, context) => {
        const meStore = useMeStore()
        const formData = reactive({
            email: '757134184@qq.com',
            code: ''
        })
        const errors = reactive({
            email: [],
            code: []
        })
        const refValidationCode = ref<any>()
        const { ref: refDisabled, toggle, on: disabled, off: enable } = useBool(false)
        const router = useRouter()
        const route = useRoute()
        const onSubmit = async (e: Event) => {
            e.preventDefault()
            Object.assign(errors, {
                email: [], code: []
            })
            const newErrors = validate(formData, [
                { key: 'email', type: 'required', message: '必填' },
                { key: 'email', type: 'pattern', regex: /.+@.+/, message: '必须是邮箱地址' },
                { key: 'code', type: 'required', message: '必填' }
            ])
            Object.assign(errors, newErrors)
            if (!hasError(errors)) {
                // const response = await http.post<{ jwt: string }>('/session', formData).catch(onError)
                // const response = await http.post<{ jwt: string }>('/session', formData, {
                //     params: { _mock: 'session' }
                // }).catch(onError)
                const response = await http.post<{ jwt: string }>('/session', formData, {_autoLoading: true})
                    .catch(onError)
                console.log(response)
                localStorage.setItem('jwt', response.data.jwt)
                //1.
                // const returnTo = localStorage.getItem('returnTo')
                // if (returnTo) { router.push(returnTo) }
                // else { router.push('/') }
                //2.
                // router.push('/sign_in?return_to=' + encodeURIComponent(route.fullPath))
                const returnTo = route.query.return_to?.toString()
                // refreshMe().then(()=> {
                //     router.push(returnTo || '/')
                // }, () => {
                //     window.alert('登录失败')
                // })
                // refreshMe()
                meStore.refreshMe()
                router.push(returnTo || '/')
            }
        }
        const onError = (error: any) => {
            if (error.response.status === 422) {
                Object.assign(errors, error.response.data.errors)
            }
            throw error
        }
        const onClickSendValidationCode = async () => {
            disabled()
            const response = await http.post('/validation_codes', { email: formData.email }, {
                params: { _autoLoading: true }
            })
                .catch(onError)
                .finally(enable)
            // 成功
            console.log('response', response);
            refValidationCode.value.startCount()
        }
        return () => (
            <MainLayout>{
                {
                    title: () => '登录',
                    icon: () => <BackIcon />,
                    default: () => (
                        <div class={s.wrapper}>
                            {/* <div>{JSON.stringify(formData)}</div> */}
                            <div class={s.logo}>
                                <Icon class={s.icon} name='mangosteen' />
                                <h1 class={s.appName}>点滴记账</h1>
                            </div>
                            <Form onSubmit={onSubmit}>
                                <FormItem label="邮箱地址" type="text" placeholder='请输入邮箱，然后点击发送验证码'
                                    v-model={formData.email} error={errors.email?.[0]} />
                                <FormItem ref={refValidationCode} label="验证码" type="validationCode" onClick={onClickSendValidationCode}
                                    v-model={formData.code} error={errors.code?.[0]} placeholder='请输入六位数字' disabled={refDisabled.value} countForm={60} />
                                <FormItem style={{ paddingTop: '64px' }}>
                                    <Button type="submit">登录</Button>
                                </FormItem>
                            </Form>
                        </div>
                    )
                }
            }</MainLayout>
        )
    }
})
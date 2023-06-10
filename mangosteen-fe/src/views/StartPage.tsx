import { defineComponent, ref } from 'vue';
import { Button } from '../shared/Button';
import s from './StartPage.module.scss'
import { FloatButton } from '../shared/FloatButton';
import { Center } from '../shared/Center';
import { Icon } from '../shared/icon';
import { Navbar } from '../shared/Navbar';
import { Overlay } from '../shared/Overlay';
import { RouterLink } from 'vue-router';
import { MainLayout } from '../layouts/MainLayout';
export const StartPage = defineComponent({
  setup: (props, context) => {
    const refOverlayVisible = ref(false)
    const onClick = () => {
      console.log('hi')
    }
    const onClickMenu = () => {
      refOverlayVisible.value = !refOverlayVisible.value
    }
    return () => (
        <MainLayout>{
          {
            title: () => '点滴记账',
            icon: () => <Icon name="menu" class={s.navIcon} onClick={onClickMenu} />,
            default: () => <>
              <Center class={s.pig_wrapper}>
                <Icon name="pig" class={s.pig} />
              </Center>
              <div class={s.button_wrapper}>
                <RouterLink to="/items/create">
                  <Button class={s.button} onClick={onClick}>开始记账</Button>
                </RouterLink>
              </div>
              <RouterLink to="/items/create">
                <FloatButton iconName='add' />
              </RouterLink>
              {refOverlayVisible.value && <Overlay onClose={() => refOverlayVisible.value = !refOverlayVisible.value} />}
            </>
          }
        }</MainLayout>
    )
  }
})
{/* <nav>menu</nav> */ }
{/* <Navbar>
          {
            {
              // default: '山竹记账', icon: <Icon name='menu'/>
              default: () => '点滴记账',
              // icon: (_class: string) => <Icon name='menu' class={_class} />
              icon: () => <Icon name="menu" class={s.navIcon} onClick={onClickMenu} />
            }
          }
        </Navbar> */}
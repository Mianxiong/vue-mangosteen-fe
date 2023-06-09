import { defineComponent } from 'vue';
import { Button } from '../shared/Button';
import s from './StartPage.module.scss'
import { FloatButton } from '../shared/FloatButton';
import { Center } from '../shared/Center';
import { Icon } from '../shared/icon';
import { Navbar } from '../shared/Navbar';
export const StartPage = defineComponent({
  setup: (props, context) => {
    const onClick = () => {
      console.log('hi')
    }
    return () => (
      <div>
        {/* <nav>menu</nav> */}
        <Navbar>
          {
            {
              // default: '山竹记账', icon: <Icon name='menu'/>
              default: '点滴记账',
              // icon: (_class: string) => <Icon name='menu' class={_class} />
              icon: <Icon name="menu" class={s.navIcon}/>
              
            }
          }
        </Navbar>
        <Center class={s.pig_wrapper}>
          <Icon name="pig" class={s.pig} />
        </Center>
        <div class={s.button_wrapper}>
          <Button class={s.button} onClick={onClick}>开始记账</Button>
        </div>  
        <FloatButton iconName='add' />
      </div>

    )
  }
})
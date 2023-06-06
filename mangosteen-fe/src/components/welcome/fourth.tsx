import s from './WelcomeLayout.module.scss';
import cloud from '../../assets/icons/cloud.svg'
import { RouterLink } from 'vue-router';
import { WelcomeLayout } from './WelcomeLayout';
export const Fourth = () => (
  <WelcomeLayout>
    {{
      icon: () => <img class={s.icon} src={cloud} />,
      title: () => <h2>会挣钱<br />还要会省钱</h2>,
      buttons: () => <>
        <RouterLink class={s.fake} to="/start">跳过</RouterLink>
        <RouterLink to="/start">完成</RouterLink>
        <RouterLink class={s.fake} to="/start">跳过</RouterLink>
      </>
    }}
  </WelcomeLayout>
)
Fourth.displayName = 'Fourth'

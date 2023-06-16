import s from './welcome.module.scss';
import { RouterLink } from 'vue-router';
import { FunctionalComponent } from 'vue';
import { SkipFeatures } from '../../shared/SkipFeatures';
const onClick = () => {
    localStorage.setItem('skipFeatures', 'yes')
}
export const FourthActions: FunctionalComponent = () => {
    return <div class={s.actions}>
        {/* <RouterLink class={s.fake} to="/start">跳过</RouterLink> */}
        <SkipFeatures class={s.fake} />
        <span onClick={onClick}>
            <RouterLink to="/start">完成</RouterLink>
        </span>
        
        {/* <RouterLink class={s.fake} to="/start">跳过</RouterLink> */}
        <SkipFeatures class={s.fake} />
    </div>
}

FourthActions.displayName = 'FourthActions'
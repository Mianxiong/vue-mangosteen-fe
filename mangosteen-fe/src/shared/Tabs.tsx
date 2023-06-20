import { defineComponent, PropType } from 'vue';
import s from './Tabs.module.scss';
export const Tabs = defineComponent({
    props: {
        selected: {
            type: String as PropType<string>
        },
        classPrefix: {
            type: String
        },
        rerenderOnSelect: {
            type: Boolean as PropType<boolean>,
            default: false
        }
        // onUpdateSelected: {
        //     type: Function as PropType<(name: string) => void>
        // }
    },
    emits: ['update:selected'],
    setup: (props, context) => {

        return () => {
            const tabs = context.slots.default?.()
            console.log(tabs)
            if (!tabs) return () => null
            for (let i = 0; i < tabs.length; i++) {
                if (tabs[i].type !== Tab) {
                    throw new Error('<Tabs> only accepts <Tab> as children')
                }
            }
            const cp = props.classPrefix
            return <div class={[s.tabs, cp + '_tabs']}>
                <ol class={[s.tabs_nav, cp + '_tabs_nav']}>
                    {tabs.map(item =>
                        // <li class={item.props?.name === props.selected ? s.selected : ''}
                        //     onClick={() => props.onUpdateSelected?.(item.props?.name)}
                        // >
                        //     {item.props?.name}
                        // </li>
                        <li class={[item.props?.name === props.selected ? [s.selected, cp + '_selected'] : '', cp + '_tabs_nav_item']}
                            // 触发事件 emit('update:selected')
                            onClick={() => context.emit('update:selected', item.props?.name)}>
                            {item.props?.name}
                        </li>
                    )}
                </ol>
                {/* <div key={props.selected}>
                    {tabs.find(item => item.props?.name === props.selected)}
                </div> */}
                {props.rerenderOnSelect ?
                    <div key={props.selected}>
                        {tabs.find(item => item.props?.name === props.selected)}
                    </div> :
                    <div>
                        {/* {tabs.map(item => <div style={{display: item.props?.name === props.selected ? 'block' : 'none'}}>{item}</div>)} */}
                        {tabs.map(item => <div v-show={item.props?.name === props.selected}>{item}</div>)}
                    </div>
                }

            </div>
        }
    }
})

export const Tab = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup: (props, context) => {
        return () => (
            <div>
                {context.slots.default?.()}
            </div>
        )
    }
})
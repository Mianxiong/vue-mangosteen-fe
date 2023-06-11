import { defineComponent, PropType, ref } from 'vue';
import s from './InputPad.module.scss';
import { Icon } from '../../shared/icon';
import { time } from '../../shared/time';
import { DatetimePicker, Popup } from 'vant';
export const InputPad = defineComponent({
    setup: (props, context) => {      
        const now = new Date()
        const refDate = ref<Date>(now)
        const appendText = (n: number | string) => refAmount.value += n.toString()
        const buttons = [
            { text: '1', onClick: () => { appendText(1) } },
            { text: '2', onClick: () => { appendText(2) } },
            { text: '3', onClick: () => { appendText(3) } },
            { text: '清空', onClick: () => { refAmount.value = '' } },
            { text: '4', onClick: () => { appendText(4) } },
            { text: '5', onClick: () => { appendText(5) } },
            { text: '6', onClick: () => { appendText(6) } },
            { text: '+', onClick: () => { } },
            { text: '7', onClick: () => { appendText(7) } },
            { text: '8', onClick: () => { appendText(8) } },
            { text: '9', onClick: () => { appendText(9) } },
            { text: '-', onClick: () => { } },
            { text: '.', onClick: () => { appendText('.') } },
            { text: '0', onClick: () => { appendText(0) } },
            { text: '删', onClick: () => { } },
            { text: '提交', onClick: () => { } }
        ]
        const refDatePickerVisible = ref(false)
        const showDatePicker = () => refDatePickerVisible.value = true
        const hideDatePicker = () => refDatePickerVisible.value = false
        const setDate = (date: Date) => { refDate.value = date; hideDatePicker() }
        const refAmount = ref('')
        return () => <>
            <div class={s.dateAndAmount}>
                <span class={s.date}>
                    <Icon name="date" class={s.icon} />
                    <span>
                        <span onClick={showDatePicker}>{time(refDate.value).format()}</span>
                        <Popup position='bottom' v-model:show={refDatePickerVisible.value}>
                            <DatetimePicker value={refDate.value} title="选择年月日" type="date" 
                                onConfirm={setDate}
                                onCancel = {hideDatePicker}>
                            </DatetimePicker>

                        </Popup>
                        {/* <DatePicker
                            v-model={refDate.value}
                            title="选择日期"
                        /> */}
                    </span>
                </span>
                <span class={s.amount}>{refAmount.value}</span>
            </div>
            <div class={s.buttons}>
                {buttons.map(button => <button onClick={button.onClick}>{button.text}</button>)}
            </div>
        </>
    }
})
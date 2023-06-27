import { computed, defineComponent, onMounted, PropType, ref, watch } from 'vue';
import s from './Charts.module.scss';
import { FormItem } from '../../shared/Form';
import { LineChart } from './LineChart';
import { PieChart } from './PieChart';
import { Bars } from './Bars';
import { http } from '../../shared/Http';
import { Time } from '../../shared/time';

const DAY = 24 * 3600 * 1000

type Data1Item = { happen_at: string, amount: number }
type Data1 = Data1Item[]
type Data2Item = { tag_id: number; tag: Tag; amount: number }
type Data2 = Data2Item[]

export const Charts = defineComponent({
    props: {
        startDate: {
            type: String as PropType<string>,
            required: false
        },
        endDate: {
            type: String as PropType<string>,
            required: false
        }
    },
    setup: (props, context) => {
        // const category = ref('expenses')
        const kind = ref('expenses')
        const data1 = ref<Data1>([])
        // const betterData1 = computed(() => {
        //     return data1.value.map(item => [item.happen_at, item.amount] as [string, number])
        // })
        const betterData1 = computed<[string, number][]>(() => {
            if (!props.startDate || !props.endDate) {
                return []
            }
            const array = []
            const diff = new Date(props.endDate).getTime() - new Date(props.startDate).getTime()
            const n = diff / DAY + 1
            let data1Index = data1.value.length - 1
            for (let i = 0; i < n; i++) {
                const time = new Time(props.startDate + 'T00:00:00.000+0800').add(i, 'day').getTimestamp()
                if (data1.value[data1Index] && new Date(data1.value[data1Index].happen_at + 'T00:00:00.000+0800').getTime() === time) {
                    array.push([new Date(time).toISOString(), data1.value[data1Index].amount])
                    data1Index -= 1
                } else {
                    array.push([new Date(time).toISOString(), 0])
                }
            }
            return array as [string, number][]
            // return Array.from({ length: n }).map((_, i) => {
            //     const time = new Time(props.startDate + 'T00:00:00.000+0800').add(i, 'day').getTimestamp()
            //     const item = data1.value[0]
            //     const amount = (item && new Date(item.happen_at + 'T00:00:00.000+0800').getTime() === time)
            //         ? data1.value.shift()!.amount
            //         : 0
            //     return [new Date(time).toISOString(), amount]
            // })
        })

        const fetchData1 = async () => {
            const endDate = new Time(props.endDate + 'T00:00:00.000+0800').add(1, 'day').format()
            const response = await http.get<{ groups: Data1, summary: number }>('/items/summary', {
                happen_after: props.startDate,
                happen_before: endDate,
                kind: kind.value,
                group_by: 'happen_at',
            }, {
                _mock: 'itemSummary',
                _autoLoading: true
            })
            console.log('response.data', response.data)
            data1.value = response.data.groups
        }
        onMounted(fetchData1)
        watch(() => [kind.value, props.startDate, props.endDate], fetchData1)
        // data2
        const data2 = ref<Data2>([])
        const betterData2 = computed<{ name: string; value: number }[]>(() =>
            data2.value.map((item) => ({
                name: item.tag.name,
                value: item.amount
            }))
        )

        // data3
        const betterData3 = computed<{ tag: Tag, amount: number, percent: number }[]>(() => {
            const total = data2.value.reduce((sum, item) => sum + item.amount, 0)
            return data2.value.map(item => ({
                ...item,
                percent: Math.round(item.amount / total * 100)
            }))
        })

        const fetchData2 = async () => {
            if (props.startDate === undefined || props.endDate === undefined) {
                return
            }
            const endDate = new Time(props.endDate + 'T00:00:00.000+0800').add(1, 'day').format()
            const response = await http.get<{ groups: Data2; summary: number }>('/items/summary', {
                happen_after: props.startDate,
                happen_before: endDate,
                kind: kind.value,
                group_by: 'tag_id'
            }, {
                _mock: 'itemSummary'
            })
            data2.value = response.data.groups
        }
        onMounted(fetchData2)
        watch(() => [kind.value, props.startDate, props.endDate], fetchData2)


        return () => (
            <div class={s.wrapper}>
                <FormItem label='类型' type="select" options={[
                    { value: 'expenses', text: '支出' },
                    { value: 'income', text: '收入' }
                ]} v-model={kind.value} />
                {!props.startDate || !props.endDate ? (<div>请先选择时间范围</div>
                ) : <div><LineChart data={betterData1.value} />
                    <PieChart data={betterData2.value} />
                    <Bars data={betterData3.value} /></div>}

            </div>
        )
    }
})
import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
import s from './PieChart.module.scss';
import * as echarts from 'echarts';
const defaultOption = {
    grid: [
        { left: 0, top: 0, right: 0, bottom: 0 }
    ],
    series: [
        {
            type: 'pie',
            radius: '70%',
            // data: [
            //     { value: 1048, name: 'Search Engine' },
            //     { value: 735, name: 'Direct' },
            //     { value: 580, name: 'Email' },
            //     { value: 484, name: 'Union Ads' },
            //     { value: 300, name: 'Video Ads' }
            // ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
export const PieChart = defineComponent({
    props: {
        data: {
            type: Array as PropType<{name: string, value: number}[]>
        }
    },
    setup: (props, context) => {
        const refDiv = ref<HTMLDivElement>()
        let chart: echarts.ECharts | undefined = undefined
        onMounted(() => {
            if (refDiv.value === undefined) { return }
            // 基于准备好的dom，初始化echarts实例
            // var myChart = echarts.init(refDiv.value);
            
            // 绘制图表
            // myChart.setOption(option);
            chart = echarts.init(refDiv.value)
            chart.setOption(defaultOption)
        })
        watch(()=> props.data, ()=> {
            chart?.setOption({
                series: [
                    {
                        data: props.data
                    }
                ]
            })
        })
        return () => (
            <div class={s.wrapper}>
                <div ref={refDiv} class={s.wrapper}></div>
            </div>
        )
    }
})
import { defineComponent, ref } from "vue";
import { RouterView } from "vue-router";
import "./App.scss"

// 具名导出，vscode会自动帮忙重构
export const App = defineComponent({
    // setup() {
    //     const refCount = ref(0) // 只要有ref, 使用.value , setup可以声明ref, render就不能
    //     const onClick = () => {
    //         refCount.value += 1
    //     }
    //     return () => <><div>
    //         {/* jsx 语法，需要自己写.vue */}
    //         {refCount.value}
    //     </div>
    //         <div>
    //             <button onClick={onClick}>+1</button>
    //         </div>
    //     </> // 特殊的地方，需要用函数进行返回
    // }
    //此时，运行npm run dev，页面是空白的，它不知道怎么去渲染这个东西，需要安装vitejs/plugin-vue-jsx插件
    setup() {
        // return () => <>
        //     <header>导航
        //         <ul>
        //             <li><router-link to="/">Foo</router-link></li>
        //             <li><router-link to="/about">Bar</router-link></li>
        //         </ul>
        //     </header>
        //     <div>
        //         <RouterView/>
        //     </div>
        //     <footer>页脚</footer>
        // </>
        return ()=> (
            <div class="page">
                <RouterView/>
            </div>
        )
    }


})
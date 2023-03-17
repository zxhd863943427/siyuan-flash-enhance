import { createApp,ref } from 'vue'
import App from './App.vue'
import TopButton from './components/TopButton.vue'
import sheet from './components/sheet.vue'
import { Plugin, Menu, clientApi } from 'siyuan'
import { addCards,removeCards,openDynamiMarkCard } from './utils/card'

const beautifulFeature = [
  { content: "闪卡样式增强", status: ref(false) },
  { content: "复习挖空增强", status: ref(false) },
  { content: "类remnote复习界面", status: ref(false) },
  { content: "层级闪卡", status: ref(false) },

]

const labFeature = [
  { content: "内置卡包制卡", status: ref(true) },
  { content: "数学块遮挡制卡", status: ref(false) },
  { content: "沉浸式制卡", status: ref(false) },

]
const dangerousFeature = [
  { content: "清除当页闪卡", func: removeCards },
]


let settingConfig = {
    beautifulFeature: beautifulFeature,
    labFeature: labFeature,
    dangerousFeature: dangerousFeature,
  }



// let app = createApp(App,settingConfig)
// app.mount('#app')

export default class CardPlugin extends Plugin {
    public el: HTMLElement
    public sheet: HTMLElement

    constructor() {
        super()
        this.el = document.createElement('button')
        this.sheet = document.createElement('div')
    }

    onload() {
        
        const button = createApp(TopButton)
        button.mount(this.el)
        this.el.addEventListener('click', (event) => {
            addCards(labFeature[0]["status"].value)
            event.stopPropagation()
            event.preventDefault()
        })
        this.el.addEventListener('contextmenu', (event) => {
            const menu = document.createElement('div')
            const app = createApp(App,settingConfig)
            app.mount(menu)
            new Menu('CardPlugin').addItem({ element: menu }).showAtMouseEvent(event)
            event.stopPropagation()
        })
        clientApi.addToolbarLeft(this.el)

        //注册动态制卡快捷键
        this.registerCommand({
            command: "openDynamiMarkCard",
            shortcut: "alt+d",
            description: "根据菜单的选项，打开动态制卡功能",
            callback: () =>{openDynamiMarkCard(
                labFeature[2]["status"].value,
                labFeature[0]["status"].value)
                },
    })

        //插入小型功能sheet
        const AppSheet = createApp(sheet,settingConfig)
        AppSheet.mount(this.sheet)
        let base = document.querySelector("head")
        base?.appendChild(this.sheet)
    }

    onunload() {
        this.el && this.el.remove();
        this.sheet && this.sheet.remove();
    }
}
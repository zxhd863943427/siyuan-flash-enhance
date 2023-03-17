import { createApp,ref } from 'vue'
import App from './App.vue'
import TopButton from './components/TopButton.vue'
import { Plugin, Menu, clientApi } from 'siyuan'
import { addCards,removeCards } from './utils/card'

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
  { content: "debug", func: testClick }
]
function testClick() {
  console.log(labFeature[0]["status"].value)
}

let settingConfig = {
    beautifulFeature: beautifulFeature,
    labFeature: labFeature,
    dangerousFeature: dangerousFeature,
  }



// let app = createApp(App,settingConfig)
// app.mount('#app')

export default class CardPlugin extends Plugin {
    public el: HTMLElement

    constructor() {
        super()
        this.el = document.createElement('button')
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
    }

    onunload() {
        this.el && this.el.remove();
    }
}
import { createApp } from 'vue'
import App from './App.vue'
import TopButton from './components/TopButton.vue'
// import { Plugin, Menu, clientApi } from 'siyuan'

createApp(App).mount('#app')

export default class CalendarPlugin extends Plugin {
    public el: HTMLElement

    constructor() {
        super()
        this.el = document.createElement('button')
    }

    onload() {
        
        const button = createApp(TopButton)
        button.mount(this.el)
        this.el.addEventListener('click', (event) => {
            const menu = document.createElement('div')
            const app = createApp(App)

            app.mount(menu)
            new Menu('Calendar').addItem({ element: menu }).showAtMouseEvent(event)
            event.stopPropagation()
        })
        clientApi.addToolbarLeft(this.el)
    }

    onunload() {}
}
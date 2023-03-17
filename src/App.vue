<template>
  <n-card  style="min-width: 300px" class="menu">
    <template #header>
      <div style="color:var(--b3-theme-on-background)">
        管理界面
      </div>
    </template>
      <div class="option">
    危险功能
    </div>

    <MyButton :name="tempClickData[0].content" :click-func="tempClickData[0].func"></MyButton>

    <div class="option">
      美化功能
    </div>
    <template v-for="item in beautifulFeature">
      <Option :name="item.content" v-model:open="item.status.value"></Option>
    </template>


    <div class="option">
      实验功能
    </div>
    <template v-for="item in labFeature">
      <Option :name="item.content" v-model:open="item.status.value"></Option>
    </template>

  </n-card>
</template>

<script lang="ts" setup>
import { NCard } from 'naive-ui'
import Option from "./components/Option.vue"
import MyButton from "./components/MyButton.vue"
import { ref, watch } from 'vue'

const beautifulFeature = [
  { content: "闪卡样式增强", status: ref(false) },
  { content: "复习挖空增强", status: ref(false) },
  { content: "类remnote复习界面", status: ref(false) },
  { content: "层级闪卡", status: ref(false) },

]

const labFeature = [
  { content: "数学块遮挡制卡", status: ref(false) },
  { content: "沉浸式制卡", status: ref(false) },

]
const tempClickData = [
  { content: "清除当页闪卡", func: testClick },
]
function testClick() {
  console.log("It click!")
}



</script>

<style scoped>
.option {
  font-size: 1.1em;
  font-weight: 600;
  margin: 5px 0px 0px;
}
.menu{
  color: var(--b3-theme-on-background);
  background-color:  var(--b3-menu-background);
}
</style>
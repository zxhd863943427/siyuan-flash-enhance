<template>
    <div id="option">
        <div id="content">
            <span style="float: left; margin: auto 0">{{ name }}</span>
            <n-button @click="props.clickFunc" style="float: right" size="tiny" color="#f6385e"> warn </n-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui'
import { ref } from 'vue'
const props = defineProps({
    name: String,
    clickFunc: Function
})
</script>

<style scoped>
#option {
    display: grid;
    align-items: center;
    min-height: 30px;
}

#content {
    display: flex;
    justify-content: space-between;
}
</style>
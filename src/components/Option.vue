<template>
    <n-switch  v-model:value="status" @update:value="$emit('update:open', status)"></n-switch>
</template>

<script lang="ts" setup>
import { NSwitch } from 'naive-ui'
import {ref} from 'vue'
const props = defineProps({
    open: Boolean
})
console.log(props.open)
const status = ref(props.open)
</script>


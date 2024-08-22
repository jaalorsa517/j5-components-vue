<script setup lang='ts'>
import { ref, watch } from 'vue';
import { OptionType } from "lib/shared/types"

const props = defineProps({
  options: { type: Array<OptionType>, default: [] },
  modelValue: { type: String, default: '' },
  name:{ type: String, default: '' },
})

const emits = defineEmits(['update:modelValue'])
const modelValue = ref(props.modelValue)


watch(modelValue, (newValue: string) => {
  emits('update:modelValue', newValue)
})

watch(() => props.modelValue, (newValue: string) => {
  modelValue.value = newValue
})

</script>

<template>
  <select v-model="modelValue" class="j5v-select" :name="name">
    <option v-for="option in props.options" :key="option.value" :value="option.value">{{ option.text }}</option>
  </select>
</template>

<style lang="scss">
  .j5v-select {
    background-color: #fff;
  }
</style>
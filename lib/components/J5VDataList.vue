<script setup lang='ts'>
import { J5VIcons } from "lib/main";

const props = defineProps({
  options: { type: Array<string>, default: [] },
  placeholder: { type: String, default: 'Buscar...' },
  hasIcon: { type: Boolean, default: false },
  icon: { type: String, default: "find" }
})

const emits = defineEmits<{
  (e: 'inputValue', value: string): void,
  (e: 'itemSelected', value: string): void
}>()

let timer: number

function sleepTyping(time: number, fn: Function) {
  clearTimeout(timer)
  timer = setTimeout(() => {
    fn()
  }, time)
}

function onInputValue(evt: any) {
  const value = evt.target.value
  if (!value) return
  sleepTyping(300, () => {
    emits("inputValue", value)
  })
}

function onItemSelected(evt: any) {
  const value = evt.target.textContent
  emits("itemSelected", value)
}

</script>

<template>
  <div class="j5v-datalist">
    <div class="j5v-datalist__input">
      <input type="text" :placeholder="props.placeholder" @input="onInputValue">
      <J5VIcons v-if="props.hasIcon" class="j5v-datalist__icon" :name="props.icon" />
    </div>
    <div class="j5v-datalist__datalist">
      <slot>
        <ul v-if="props.options.length" class="j5v-datalist__list" @click="onItemSelected">
          <li v-for="option, index in options" :key="index">{{ option }}</li>
        </ul>
      </slot>
    </div>
  </div>
</template>
<style lang="scss"></style>
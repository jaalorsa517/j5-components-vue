<script setup lang='ts'>
import { onMounted, ref, watch, useTemplateRef } from "vue";
import { J5VIcons } from "lib/main";

const props = defineProps({
  options: { type: Array<string>, default: [] },
  placeholder: { type: String, default: 'Buscar...' },
  hasIcon: { type: Boolean, default: false },
  icon: { type: String, default: "find" },
  modelValue: { default: '' },
})

const emits = defineEmits<{
  (e: 'inputValue', value: string): void,
  (e: 'itemSelected', value: any): void,
  (e: 'update:modelValue', value: string): void
}>()

const inputElement: any = useTemplateRef<HTMLInputElement>("inputElement")
const slotElement = ref()
let timer: any
const hasOptions = ref(Boolean(props.options.length))

watch(() => props.modelValue, (newValue) => {
  inputElement.value.value = newValue
})

function sleepTyping(time: number, fn: Function) {
  clearTimeout(timer)
  timer = setTimeout(() => {
    fn()
  }, time)
}

function onInputValue(evt: any) {
  const value = evt.target.value
  if (!value) {
    hasOptions.value = false
    emits("update:modelValue", value)
    return
  }
  sleepTyping(500, () => {
    hasOptions.value = true
    emits("inputValue", value)
    emits("update:modelValue", value)
  })
}

function onItemSelected(evt: any) {
  inputElement.value.value = ""
  inputElement.value.focus()
  hasOptions.value = false

  if (!props.options.length) {
    emits("itemSelected", evt.target)
    return
  }
  const value = evt.target.textContent
  emits("itemSelected", value)

}

function onFocus(evt: any) {
  evt.target.select()
  if (!slotElement.value?.childElementCount) return
  hasOptions.value = true
}

onMounted(() => {
  inputElement.value.value = props.modelValue
})

</script>

<template>
  <div class="j5v-datalist">
    <div class="j5v-datalist__input">
      <J5VIcons v-if="props.hasIcon" class="j5v-datalist__icon" :name="props.icon" />
      <input type="text" :placeholder="props.placeholder" ref="inputElement" @input="onInputValue" @focus="onFocus"
        @keydown.esc="hasOptions = false">
    </div>
    <div class="j5v-datalist__datalist">
      <ul v-show="inputElement?.value && hasOptions" class="j5v-datalist__list card" ref="slotElement"
        @click="onItemSelected">
        <slot>
          <li class="j5v-datalist__item" v-for="option, index in options" :key="index">{{ option }}</li>
        </slot>
      </ul>
    </div>
    <div class="j5v-datalist__mask" v-if="hasOptions" @click="hasOptions = false"></div>
  </div>
</template>
<style lang="scss">
@import "styles/main";

.j5v-datalist {
  --height-input: 44px;
  --width-input: 40em;
  --z-index: 100;
  width: var(--width-input);
  position: relative;

  &__input {
    @include Flex(row, flex-start, center);
    height: var(--height-input);
    width: 100%;
    padding: 0.4em;
    position: relative;
    z-index: var(--z-index);
    border-radius: 4px;
    border: none;
    box-shadow: var(--shadow);
    background-color: var(--color-white);

    &:focus-within {
      outline: 0.5px solid var(--color-second);
    }

    >input {
      flex: 3;
      font-family: var(--font-principal);
      color: var(--color-font-dark);
      outline: none;
      appearance: none;
      border: none;
      box-shadow: none;
    }

    >.j5v-datalist__list {
      flex: 1;
    }
  }

  & &__datalist {
    width: 100%;
    position: absolute;
    left: 0;
    top: calc(var(--height-input) + 3px);
    z-index: calc(1 + var(--z-index));
  }

  & &__list {
    max-height: 9.375em;
    list-style: none;
    background-color: var(--color-white);
    overflow: auto;
  }

  & &__item {
    padding: 0.3em 0;
    cursor: pointer;
    border-bottom: 1px solid var(--color-gray-light);

    &:last-child {
      padding-bottom: 0;
      border-bottom: none;
    }

    &:first-child {
      padding-top: 0;
    }
  }

  &__mask {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: calc(var(--z-index) - 1);
    background-color: transparent;
  }
}
</style>
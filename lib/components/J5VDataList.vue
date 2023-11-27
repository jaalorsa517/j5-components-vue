<script setup lang='ts'>
import { J5VIcons } from "lib/main";
import { ref } from "vue";

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
const hasOptions = ref(Boolean(props.options.length))

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
    return
  }
  sleepTyping(300, () => {
    hasOptions.value = true
    emits("inputValue", value)
  })
}

function onItemSelected(evt: any) {
  const value = evt.target.textContent
  emits("itemSelected", value)
  hasOptions.value = false
}

function onFocus(evt: any) {
  evt.target.select()
}

</script>

<template>
  <div class="j5v-datalist">
    <div class="j5v-datalist__input">
      <J5VIcons v-if="props.hasIcon" class="j5v-datalist__icon" :name="props.icon" />
      <input type="text" :placeholder="props.placeholder" @input="onInputValue" @focus="onFocus">
    </div>
    <div class="j5v-datalist__datalist">
      <slot>
        <ul v-if="hasOptions" class="j5v-datalist__list card" @click="onItemSelected">
          <li class="j5v-datalist__item" v-for="option, index in options" :key="index">{{ option }}</li>
        </ul>
      </slot>
    </div>
  </div>
</template>
<style lang="scss">
@import "styles/main";

.j5v-datalist {
  --height-input: 44px;
  --width-input: 40em;
  width: var(--width-input);
  position: relative;

  &__input {
    @include Flex(row, flex-start, center);
    height: var(--height-input);
    width: 100%;
    padding: 0.4em;
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

  & &__list {
    width: 100%;
    position: absolute;
    left: 0;
    top: calc(var(--height-input) + 3px);
    list-style: none;
    background-color: var(--color-white);
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
}
</style>
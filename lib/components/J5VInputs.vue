<script setup lang='ts'>
import { computed, onMounted, useTemplateRef, watch } from "vue";
import { validateInput } from "lib/utils/validators"
import { InpuModeType } from "lib/shared/types"

const props = defineProps({
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  modelValue: { default: '' },
  name: { type: String, default: '' },
  initialValue: { type: String, default: '' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  hasFocus: { type: Boolean, default: false },
  hasInputEvent: { type: Boolean, default: false },
  hasFocusEvent: { type: Boolean, default: false },
  hasBlurEvent: { type: Boolean, default: false },
})

const emit = defineEmits(["update:modelValue"])

const vFocus = (el: HTMLInputElement) => {
  if (props.hasFocus) {
    el.focus()
  }
}

let isInitial: boolean = true
const inputElement: any = useTemplateRef<HTMLInputElement>("inputElement")
const isNumber = () => ["number"].includes(props.type)
const isTel = () => ["tel"].includes(props.type)
const typesKeyboards: Record<string, InpuModeType> = { text: "text", tel: "tel", email: "email", number: "decimal" }

const inputMode = computed(() => {
  return typesKeyboards[props.type] || "none"
})
const symbolDecimal = 1.1.toLocaleString().replace(/\d/g, '');
const regexNumber = new RegExp(`^\\d+((\\${symbolDecimal}\\d+)?|(\\${symbolDecimal})?)$`, "gm")
const regexTel = new RegExp("^[0-9]+$", "g")

watch(() => props.modelValue, (newValue) => {
  if (isNumber()) {
    inputElement.value.value = newValue.toString().replace(".", symbolDecimal)
    return
  }
  inputElement.value.value = newValue
})

function handlerInputDecimal(newValue: string, oldValue: string) {
  const isNumberMatch = newValue.match(regexNumber)?.length
  if (isNumberMatch) {
    assignModelValue(newValue)
    return
  }
  assignModelValue(oldValue)
}

function handlerInputTel(newValue: string, oldValue: string) {
  const isTelMatch = newValue.match(regexTel)?.length
  if (isTelMatch) {
    assignModelValue(newValue)
    return
  }
  assignModelValue(oldValue)
}

function assignModelValue(newValue: string) {
  if (!isInitial) emitModelValue(newValue)
  inputElement.value.value = newValue
}

function emitModelValue(value: string) {
  if (isNumber()) {
    emit('update:modelValue', value.toString().replace(",", "."))
    return
  }
  emit('update:modelValue', value)
}

function validator(evt: any, isActive: boolean) {
  if (evt.type === "focus") evt.target.select()
  if (!isActive) return
  validateInput(evt.target, props.type)
}

function onInput(evt: any) {
  let newValue = evt.target.value
  const oldValue = evt.target.value.slice(0, -1)
  if (isNumber()) {
    if (["."].includes(evt.data)) {
      newValue = oldValue + symbolDecimal
    }
    handlerInputDecimal(newValue, oldValue)
  }
  else if (isTel()) {
    handlerInputTel(newValue, oldValue)
  }
  else {
    assignModelValue(newValue)
  }

  if (props.hasInputEvent) {
    const evtElement = inputElement.value as HTMLInputElement
    validateInput(evtElement, props.type)
  }
}

function onBlur(evt: any) {
  validator(evt, props.hasBlurEvent)
}

function onFocus(evt: any) {
  validator(evt, props.hasFocusEvent)
}

function onPaste(evt: any) {
  const clipboardData = evt.clipboardData;
  let newValue = clipboardData.getData('text/plain');
  const oldValue = inputElement.value.value
  if (isNumber()) {
    evt.preventDefault()
    if (newValue.includes(".")) {
      newValue = newValue.replace(".", symbolDecimal)
    }
    handlerInputDecimal(newValue, oldValue)
    return
  }

  if (isTel()) {
    evt.preventDefault()
    handlerInputTel(newValue, oldValue)
    return
  }
}

function onCopy(evt: any) {
  if (isNumber()) {
    evt.preventDefault()
    const newValue = inputElement.value.value.replace(symbolDecimal, '.')
    const clipBoard = evt.clipboardData
    clipBoard?.setData('text/plain', newValue)
  }
}

onMounted(() => {
  let newValue = props.modelValue?.toString() || props.initialValue?.toString() || ""

  if (isNumber() && newValue?.includes(".")) {
    newValue = newValue.replace(".", symbolDecimal)
  }
  inputElement.value.value = newValue
  onInput({ target: inputElement.value })
  isInitial = false
})

</script>

<template>
  <div class="j5v-input">
    <input type="text" ref="inputElement" :inputmode="inputMode" :placeholder="props.placeholder"
      :disabled="props.disabled" :required="props.required" :name="props.name" @focus="onFocus" @blur="onBlur"
      @input="onInput" @paste="onPaste" @copy="onCopy" v-focus>
  </div>
</template>

<style lang="scss">
@import "styles/main";

.j5v-input {
  @include Flex(column, center, flex-start);
}
</style>

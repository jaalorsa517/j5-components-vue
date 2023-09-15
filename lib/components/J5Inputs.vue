<script setup lang='ts'>
//TODO: Mejorar el input number
//TODO: Agregar input currency
import { computed, onMounted, ref, watch } from "vue";
import { validateInput } from "lib/utils/validators"
import { InpuModeType } from "lib/shared/types"

const props = defineProps({
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  modelValue: { type: String, default: '' },
  name: { type: String, default: '' },
  required: { type: Boolean, default: false },
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

const text = ref(props.modelValue)
const hasModelValue = Boolean(props.modelValue)
const inputElement: any = ref(null)
const isNumber = () => ["number"].includes(props.type)
const typesKeyboards: Record<string, InpuModeType> = { text: "text", tel: "tel", email: "email", number: "decimal" }

const inputMode = computed(() => {
  return typesKeyboards[props.type] || "none"
})
const regexNumber = new RegExp(`\d+`, "g")

watch(text, (newValue, oldValue) => {
  if (newValue.toString() === oldValue.toString()) return
  inputElement.value.value = newValue

  if (isNumber()) {
    handlerInputDecimal(newValue.toString(), oldValue.toString())
  }
  else {
    assignModelValue(newValue.toString())
  }

  if (props.hasInputEvent) {
    const evt = inputElement.value as HTMLInputElement
    validateInput(evt, props.type)
  }
})

watch(() => props.modelValue, (newValue) => {
  const value = newValue?.length ? newValue : isNumber() ? "0" : ""
  text.value = value
})

function handlerInputDecimal(newValue: string, oldValue: string) {
  if (newValue.match(regexNumber)?.length) {
    const value = parseFloat(oldValue) || 0
    assignModelValue(value.toString())
  }
  else
    assignModelValue(newValue)
}

function assignModelValue(newValue: string) {
  if (hasModelValue) {
    emit('update:modelValue', newValue)
  }
  inputElement.value.value = newValue
  text.value = newValue
}

function validator(evt: any, isActive: boolean) {
  if (evt.type === "focus") evt.target.select()
  if (!isActive) return
  validateInput(evt.target, props.type)
}

onMounted(() => {
  text.value = props.modelValue || ""
})

</script>
<template>
  <div class="j5-input">
    <input type="text" :inputmode="inputMode" :placeholder="props.placeholder" v-model="text" :required="props.required"
      :name="props.name" @focus="validator($event, props.hasFocus)" ref="inputElement"
      @blur="validator($event, props.hasBlurEvent)" v-focus>
  </div>
</template>
<style lang="scss">
@import "styles/main";

.j5-input {
  @include Flex(column, center, flex-start);
}
</style>
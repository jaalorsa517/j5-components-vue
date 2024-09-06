<script setup lang='ts'>
import { ref } from "vue"
import { J5VSelect, OptionType } from "lib/main"

const options: Array<OptionType> = [
  { value: "red", text: "Red" },
  { value: "green", text: "Green" },
  { value: "blue", text: "Blue" },
]

const modelValue = ref("blue")

</script>
<template>
  <div class="selects">
    <h3>Select <span>{{ modelValue }}</span></h3>
    <J5VSelect :options="options" v-model="modelValue"/>
  </div>
</template>
<style lang="scss">
.select {
  @include Flex(column, center, center);
  gap: 1em;
  flex-wrap: wrap;

  @include tabletWidth() {
    @include Flex(row, center, center);
  }
}
</style>
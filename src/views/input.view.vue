<script setup lang="ts">
import { ref } from "vue";
import { J5VInput } from "../../lib/main"

const num = ref()
</script>

<template>
  <div class="input">
    <h3>{{ num }}</h3>
    <J5VInput type="number" placeholder="number" v-model="num" :hasInputEvent="true"/>
    <J5VInput type="text" placeholder="text" :hasFocus="true" :initialValue="123"/>
    <J5VInput type="tel" placeholder="tel" :hasFocus="true" :disabled="true"/>
    <J5VInput type="email" placeholder="email" :hasFocusEvent="true" :hasBlurEvent="true"/>
  </div>
</template>
<style lang="scss">
.input {
  @include Flex(column, center, center);
  gap: 1em;
  flex-wrap: wrap;

  @include tabletWidth() {
    @include Flex(row, center, center);
  }
}
</style>
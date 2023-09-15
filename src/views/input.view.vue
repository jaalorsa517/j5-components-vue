<script setup lang="ts">
import { J5Input } from "../../lib/main"
</script>
<template>
  <div class="input">
    <J5Input type="number" placeholder="number" />
    <J5Input type="text" placeholder="text" />
    <J5Input type="tel" placeholder="tel" />
    <J5Input type="email" placeholder="email" />
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
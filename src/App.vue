<script setup lang="ts">
import { ref } from "vue";
import { J5Input, J5Icons } from "../lib/main";

const text = ref("123");

</script>


<template>
  <div>
    <J5Input type="number" placeholder="Número" />
    <J5Input v-model="text" name="Nombre" required />
    {{ text }}
    <J5Icons name="arrow_back" />
  </div>
</template>

<style></style>

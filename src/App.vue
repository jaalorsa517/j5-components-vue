<script setup lang="ts">
import { ref } from "vue";
import { J5Input } from "../lib/main";

const text = ref("123");

</script>


<template>
  <div>
    <J5Input type="number" placeholder="Número" />
    <J5Input  v-model="text"  name="Nombre" required/>
    {{ text }}
  </div>
</template>

<style></style>

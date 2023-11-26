<script setup lang='ts'>
import { reactive } from "vue";
import { J5VDatalist } from "../../lib/main"

const options: Array<string> = reactive([])
const selecteds: Array<string> = reactive([])

function setOption(value: string) {
  
  options.push(`Option ${value}`)
}

</script>
<template>
  <div class="datalist">
    <J5VDatalist :hasIcon="true" :options="options" @inputValue="setOption" @itemSelected="selecteds.push($event)" />
    <div>
      <p>Texto seleccionado {{ selecteds }}</p>
    </div>
  </div>
</template>
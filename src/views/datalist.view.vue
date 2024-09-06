<script setup lang='ts'>
import { reactive, ref, watch } from "vue";
import { J5VDatalist } from "lib/main"

const inputValue = ref("inicial")
const inputValue3 = ref("montaña")

const options: Array<string> = reactive([])
const selecteds: Array<string> = reactive([])

const options2: Array<string> = reactive([])
const selecteds2: Array<string> = reactive([])

const options3: Array<string> = reactive(["Option 1", "Option 2", "Option 3"])
const selecteds3: Array<string> = reactive([])

function setOption(value: string) {
  options.push(`Option ${value}`)
}

watch(inputValue, (value: string) => {
  if (!value) {
    return
  }
  options2.push(`Option ${value}`)
})

watch(inputValue3, (value: string) => {
  if (!value) {
    return
  }
  options3.push(`Option ${value}`)
})

function onItemSelected(evt: any) {
  const value = evt.textContent
  selecteds2.push(value)
}

</script>

<template>
  <div class="datalist">
    <div class="datalist__container">
      <h3>Datalist default</h3>
      <J5VDatalist :hasIcon="true" :options="options" @inputValue="setOption" @itemSelected="selecteds.push($event)" />
      <div>
        <p>Texto seleccionado {{ selecteds }}</p>
      </div>
    </div>
    <div class="datalist__container">
      <h3>Datalist default y v-model</h3>
      <J5VDatalist :hasIcon="true" :options="options3" v-model="inputValue3" @itemSelected="selecteds3.push($event)" />
      <div>
        <p>Texto seleccionado {{ selecteds3 }}</p>
      </div>
    </div>
    <div class="datalist__container">
      <h3>Datalist with slot</h3>
      <J5VDatalist :hasIcon="true" v-model="inputValue" @itemSelected="onItemSelected">
        <li class="datalist__item" v-for="option, index in options2" :key="index">
          <span>{{ index }}</span>
          <span>{{ option }}</span>
        </li>
      </J5VDatalist>
      <div>
        <p>Texto seleccionado {{ selecteds2 }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.datalist {
  &__container {
    margin: 2em auto;
  }

  &__list {
    background-color: white;
  }

  &__item {
    @include Flex(row, flex-start, center);
    gap: 1em;
  }
}
</style>
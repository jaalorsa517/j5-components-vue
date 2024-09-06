<script setup lang="ts">
import { ref } from "vue"
import { J5VAlert } from "lib/main"

const isShowProps = ref(false)
const isShowSlots = ref(false)
</script>
<template>
  <section class="alert">
    <div class="alert__container" flex-center=row>
      <button @click="isShowProps = true">Mostrar Alerta Opción Props</button>
      <button @click="isShowSlots = true">Mostrar Alerta Opción Slots</button>
    </div>
    <J5VAlert v-if="isShowSlots">
      <template v-slot:header>
        <h2>Titulo <i>Slots</i></h2>
      </template>
      <template v-slot:body>
        <p>Texto inyectado a través de <b>slots</b>.</p>
      </template>
      <template v-slot:footer>
        <div class="alert__container alert__container--btn" flex-center=row>
          <button @click="isShowSlots = false">Aprobar</button>
          <button @click="isShowSlots = false">Denegar</button>
        </div>
      </template>
    </J5VAlert>
    <J5VAlert v-if="isShowProps" title="Titulo Props" body="Texto inyectado a través de props." btnOkText="Ok"
      :hasBtnCancel="true" @confirm="isShowProps = false">
    </J5VAlert>
  </section>
</template>
<style lang="scss">
.alert {
  @include Flex(column, center, center);
  &__container {
    flex-direction: column;
    gap: 1em;
    &--btn{
      flex-direction: row;
    }
  }
  @include tabletWidth(){
    &__container{
      flex-direction: row;
    }
  }
}
</style>
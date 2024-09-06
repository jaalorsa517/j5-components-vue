<script setup lang="ts">
import { computed } from "vue";
import { J5VIcons } from "lib/main";
import { dic as icons } from "lib/components/J5VIcons/icons"

const keys_icons = computed(() => Object.keys(icons))

</script>


<template>
  <div class="icons">
    <div class="icons__container" v-for="ico, key in keys_icons" :key="key">
      <J5VIcons class="icons__ico" :name="ico" />
      <p>{{ ico }}</p>
    </div>

  </div>
</template>

<style lang="scss">
.icons {
  @include Flex();
  gap: 1em;
  flex-wrap: wrap;

  &__container {
    @include Flex(column, center, center);
    width: auto;
  }

  &__ico {
    width: 50px;
    text-align: center;
    font-size: 2em;
  }
}
</style>

<script setup lang="ts">
import { computed } from "vue";
import { routes } from "src/router"

const routesName = computed(() => routes.map(route => route.name))
</script>

<template>
  <section class="home">
    <h2>Rutas disponibles</h2>
    <ul class="home__list">
      <li class="home__item" v-for="route in routesName" :key="route">
        <RouterLink :to="{ name: route }">{{ route }}</RouterLink>
      </li>
    </ul>
  </section>
  <RouterView class="app"/>
</template>

<style lang="scss">
.home{
  @include Flex(column);

  &__list{
    @include Flex(row);
    padding: 1em 0;
    gap: 1em;
    flex-wrap: wrap;
    list-style: none;

     & a {
      text-decoration: underline;
      &:visited, &:link {
        color: inherit;
      }
    }
  }
}
</style>

<script setup lang="ts">
import { inject } from "vue";
import { dic } from "./icons";

const dicInyect = inject("j5-icons") || {}

const dicDefinitve = {...dic, ...dicInyect}
const { name, color } = defineProps({ name: String, color: { type: String, default: "currentColor" } });

const getIco = (name:string) => {
  let tagName = "path";
  let colorProp = "fill";
  let strokeWidth = "";
  const ico = dicDefinitve[name];
  if (ico) {
    if (ico.includes("<polygon")) {
      tagName = "polygon";
    } else if (ico.includes("<rect")) {
      tagName = "rect";
    } else if (ico.includes("<circle")) {
      tagName = "circle";
      colorProp = "stroke";
      strokeWidth = 'stroke-width="1"';
    }
    let re = new RegExp(`<${tagName}`, "g");
    return ico.replace(re, `<${tagName} ${colorProp}="${color}" ${strokeWidth}`);
  } else {
    return "?";
  }
};
</script>
<template>
  <i class="jiconic" v-if="name" v-html="`${getIco(name)}`"></i>
</template>
<style lang="scss">
.jiconic {
  font-style: normal;
  line-height: 1em;
  svg {
    width: 1em;
    height: 1em;
  }
}
</style>

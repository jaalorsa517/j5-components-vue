<script setup lang="ts">
import { inject } from "vue";
import { dic } from "./icons";

const dicInyect = inject<Record<string, string>>("j5v-icons", {})

const dicDefinitve: Record<string, string> = { ...dic, ...dicInyect }
const { name, color } = defineProps({ name: String, color: { type: String, default: "currentColor" } });

const getIco = (name: string) => {
  const ico = dicDefinitve[name];
  if (!ico)
    return "?";

  let tagName = "path";
  let colorProp = "fill";
  let ohterAttrs = "";

  if (Boolean(ico.match(/<path(.*)stroke="(.*)">/g)?.length)) {
    ohterAttrs = "fill=none";
    colorProp = "stroke";
  } else if (Boolean(ico.match(/<polygon(.*)stroke="(.*)">/g)?.length)) {
    tagName = "polygon";
    ohterAttrs = "fill=none";
    colorProp = "stroke";
  } else if (ico.includes("<polygon")) {
    tagName = "polygon";
  } else if (ico.includes("<rect")) {
    tagName = "rect";
  } else if (ico.includes("<circle")) {
    tagName = "circle";
    colorProp = "stroke";
  } else if (ico.includes("<line")) {
    tagName = "line";
    colorProp = "stroke";
  }
  const re = new RegExp(`<${tagName}`, "g");
  return ico.replace(re, `<${tagName} ${colorProp}="${color}" ${ohterAttrs}`);
};
</script>
<template>
  <i class="j5v-icons" v-if="name" v-html="`${getIco(name)}`"></i>
</template>
<style lang="scss">
.j5v-icons {
  font-style: normal;
  line-height: 1em;

  svg {
    width: 1em;
    height: 1em;
  }
}
</style>

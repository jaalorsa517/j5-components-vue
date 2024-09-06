import { createRouter, createWebHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    name: "Alerts",
    component: () => import("src/views/alerts.view.vue"),
  },
  {
    path: "/icons",
    name: "Icons",
    component: () => import("src/views/icons.view.vue"),
  },
  {
    path: "/input",
    name: "Input",
    component: () => import("src/views/input.view.vue"),
  },
  {
    path: "/select",
    name: "Select",
    component: () => import("src/views/select.view.vue"),
  },
  {
    path: "/datalist",
    name: "DataList",
    component: () => import("src/views/datalist.view.vue"),
  }
];

export const router = createRouter({
  routes,
  history: createWebHistory(),
});

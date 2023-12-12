import { createRouter, createWebHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    name: "Alerts",
    component: () => import("../views/alerts.view.vue"),
  },
  {
    path: "/icons",
    name: "Icons",
    component: () => import("../views/icons.view.vue"),
  },
  {
    path: "/input",
    name: "Input",
    component: () => import("../views/input.view.vue"),
  },
  {
    path: "/select",
    name: "Select",
    component: () => import("../views/select.view.vue"),
  },
  {
    path: "/datalist",
    name: "DataList",
    component: () => import("../views/datalist.view.vue"),
  }
];

export const router = createRouter({
  routes,
  history: createWebHistory(),
});

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
  }
];

export const router = createRouter({
  routes,
  history: createWebHistory(),
});

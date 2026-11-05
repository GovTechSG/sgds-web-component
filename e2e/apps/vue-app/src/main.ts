import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "@webcomponents/scoped-custom-element-registry";
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component/css/sgds.css";
import "./index.css";
import App from "./App.vue";

const routes = [
  { path: "/", redirect: "/accordion" },
  { path: "/accordion", component: () => import("./pages/accordion.vue") },
  { path: "/appnav", component: () => import("./pages/appnav.vue") },
  { path: "/alertlink", component: () => import("./pages/alertlink.vue") },
  { path: "/alert", component: () => import("./pages/alert.vue") },
  { path: "/breadcrumb", component: () => import("./pages/breadcrumb.vue") },
  { path: "/button", component: () => import("./pages/button.vue") },
  { path: "/card", component: () => import("./pages/card.vue") },
  { path: "/badge", component: () => import("./pages/badge.vue") },
  { path: "/closebutton", component: () => import("./pages/closebutton.vue") },
  { path: "/checkboxgroup", component: () => import("./pages/checkboxgroup.vue") },
  { path: "/combobox", component: () => import("./pages/combobox.vue") },
  { path: "/datatable", component: () => import("./pages/datatable.vue") },
  { path: "/datepicker", component: () => import("./pages/datepicker.vue") },
  { path: "/descriptionlist", component: () => import("./pages/descriptionlist.vue") },
  { path: "/dropdown", component: () => import("./pages/dropdown.vue") },
  { path: "/divider", component: () => import("./pages/divider.vue") },
  { path: "/drawer", component: () => import("./pages/drawer.vue") },
  { path: "/fileupload", component: () => import("./pages/fileupload.vue") },
  { path: "/footer", component: () => import("./pages/footer.vue") },
  { path: "/icon", component: () => import("./pages/icon.vue") },
  { path: "/iconbutton", component: () => import("./pages/iconbutton.vue") },
  { path: "/iconcard", component: () => import("./pages/iconcard.vue") },
  { path: "/iconlist", component: () => import("./pages/iconlist.vue") },
  { path: "/imagecard", component: () => import("./pages/imagecard.vue") },
  { path: "/input", component: () => import("./pages/input.vue") },
  { path: "/link", component: () => import("./pages/link.vue") },
  { path: "/mainnav", component: () => import("./pages/mainnav.vue") },
  { path: "/masthead", component: () => import("./pages/masthead.vue") },
  { path: "/modal", component: () => import("./pages/modal.vue") },
  { path: "/overflowmenu", component: () => import("./pages/overflowmenu.vue") },
  { path: "/progressbar", component: () => import("./pages/progressbar.vue") },
  { path: "/pagination", component: () => import("./pages/pagination.vue") },
  { path: "/quantitytoggle", component: () => import("./pages/quantitytoggle.vue") },
  { path: "/radiogroup", component: () => import("./pages/radiogroup.vue") },
  { path: "/select", component: () => import("./pages/select.vue") },
  { path: "/sidenav", component: () => import("./pages/sidenav.vue") },
  { path: "/sidebar", component: () => import("./pages/sidebar.vue") },
  { path: "/skeleton", component: () => import("./pages/skeleton.vue") },
  { path: "/spinner", component: () => import("./pages/spinner.vue") },
  { path: "/step", component: () => import("./pages/step.vue") },
  { path: "/stepper", component: () => import("./pages/stepper.vue") },
  { path: "/subnav", component: () => import("./pages/subnav.vue") },
  { path: "/switch", component: () => import("./pages/switch.vue") },
  { path: "/systembanner", component: () => import("./pages/systembanner.vue") },
  { path: "/tabgroup", component: () => import("./pages/tabgroup.vue") },
  { path: "/table", component: () => import("./pages/table.vue") },
  { path: "/tableofcontents", component: () => import("./pages/tableofcontents.vue") },
  { path: "/textarea", component: () => import("./pages/textarea.vue") },
  { path: "/thumbnailcard", component: () => import("./pages/thumbnailcard.vue") },
  { path: "/tooltip", component: () => import("./pages/tooltip.vue") },
  { path: "/toastcontainer", component: () => import("./pages/toastcontainer.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");

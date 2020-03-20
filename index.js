// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./vuex";
import vuetify from "./classes/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  vuetify: vuetify,
  store,
  router,
  el: "#app",
  render: h => h(App)
});

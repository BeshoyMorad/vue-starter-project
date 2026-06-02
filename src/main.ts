import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { queryClient } from "@/lib/query-client";
import "./css/index.css";
import router from "./router/index.ts";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import App from "./App.vue";

dayjs.extend(duration);
dayjs.extend(relativeTime);

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia).use(VueQueryPlugin, { queryClient }).use(router).mount("#app");

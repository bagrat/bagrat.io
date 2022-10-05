import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import VueGtag from "vue-gtag";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLocationDot,
  faClock,
  faEnvelope,
  faGlobe,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "./assets/main.css";

library.add(
  faLocationDot,
  faClock,
  faEnvelope,
  faGlobe,
  faBook,
  faGithub,
  faStackOverflow
);

const app = createApp(App);

app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(VueGtag, {
  config: { id: "G-HNLFGWWDBJ" },
});

app.mount("#app");

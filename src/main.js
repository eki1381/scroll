import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import VueSplash from 'vue-splash';

import "./style.css";

const vuetify = createVuetify({
    components,
    directives,
  })
  
  createApp(App).use(vuetify).use(VueSplash).mount('#app')

import Vue from 'vue'
import App from './App.vue'
import './assets/css/index.css';
import VueTailwind from 'vue-tailwind'
import MyOwnTheme from 'vue-tailwind/src/themes/default.js'
import { router } from './index.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.use(VueTailwind, {
  theme: MyOwnTheme
});
library.add(fas)
library.add(far)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')

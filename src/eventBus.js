import Vue from 'vue'
var Bus = new Vue({
  name: 'bus',
  data() {
    return {

    }
  }
})
Vue.use({
  Bus
})
export default Bus
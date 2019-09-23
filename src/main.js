// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { Button, Input, DatePicker, Upload, Icon, Timeline } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import router from './router'

Vue.use(Button);
Vue.use(Input);
Vue.use(Input.TextArea);
Vue.use(DatePicker);
Vue.use(DatePicker.RangePicker);
Vue.use(Upload);
Vue.use(Icon);
Vue.use(Timeline);
/* Vue.use(Timeline.TimelineItem); */


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
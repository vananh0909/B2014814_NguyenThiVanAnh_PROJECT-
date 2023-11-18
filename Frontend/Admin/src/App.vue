<template>
  <div id="app">
    <Headerad v-if="showHeader"></Headerad>
    <router-view></router-view>
    <Footerad v-if="showFooter"></Footerad>
  </div>
</template>

<script>
import Headerad from './components/Headerad.vue'
import Footerad from './components/Footerad.vue'

export default {
  name: 'App',
  components: {
    Headerad,
    Footerad
  },
  data() {
    return {
      showHeader: true,
      showFooter: true
    };
  },
  watch: {
    $route(to, from) {
      // Kiểm tra nếu đang ở trang login thì ẩn header và footer
      if (to.path === '/loginadmin') {
        this.showHeader = false;
        this.showFooter = false;
      } else {
        this.showHeader = true;
        this.showFooter = true;
      }
    }
  }
}
</script>

<template>
  <div class="app container">
    <router-view />
    <navigation />
  </div>
</template>

<script>
import Navigation from './components/Navigation';
import { FeedTracking } from './models';

export default {
  name: 'app',
  components: {
    Navigation
  },
  data() {
    return { }
  },
  created() {
    let feedTracking = this.getStorage('feedTracking');
    if (!feedTracking) {
      feedTracking = new FeedTracking();
      this.setStorage('feedTracking', feedTracking);
    }
  }
}
</script>

<style scoped>
.app {
  padding: 2em;
  height: 100vh;
}
.app > .navigation {
  bottom: 0;
  padding: 1em 0;
  position: absolute;
  width: 90%;
}
</style>

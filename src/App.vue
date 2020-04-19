<template>
  <div class="app container">
    <home />
    <feed-form />
    <feed-list />
  </div>
</template>

<script>
import FeedForm from './components/FeedForm';
import FeedList from './components/FeedList';
import Home from './components/Home';
import { FeedTracking } from './models';

export default {
  name: 'app',
  components: {
    FeedForm,
    FeedList,
    Home
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
}
</style>

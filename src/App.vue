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

export default {
  name: 'app',
  components: {
    FeedForm,
    FeedList,
    Home
  },
  data () {
    return { }
  }
}
</script>

<style scoped>
.app {
  padding: 2em;
}
</style>

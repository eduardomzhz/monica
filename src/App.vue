<template>
  <div class="container">
    <feed-form />
    <feed-list />
  </div>
</template>

<script>
import FeedForm from './components/FeedForm';
import FeedList from './components/FeedList';

export default {
  name: 'app',
  components: {
    FeedForm,
    FeedList
  },
  data () {
    return { }
  }
}
</script>

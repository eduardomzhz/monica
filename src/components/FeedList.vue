<template>
  <div>
    <nav class="level flex space-between">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">FECHA</p>
          <b-select v-model="selectedDate" @input="setFeedDay">
            <option
              v-for="day in feedDays"
              :value="day.date"
              :key="day.date">
              {{ dateToString(day.date) }}
            </option>
          </b-select>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">TOTAL DEL DÍA</p>
          <p class="title">{{ totalQuantity }} oz</p>
        </div>
      </div>
    </nav>
    <div v-if="selectedDay && selectedDay.feeds.length > 0">
      <div class="flex border-bottom">
        <span class="list-header center">HORA</span>
        <span class="list-header center">CANTIDAD</span>
        <span class="list-header center"></span>
      </div>
      <div v-for="feed in (selectedDay ? selectedDay.feeds : [])" :key="feed.time" class="flex">
        <span class="center">{{ timeToString(feed.time) }}</span>
        <span class="center">{{ feed.quantity }} oz</span>
        <span class="center">
          <button class="button is-small" @click="removeFeed(feed)">&times;</button>
        </span>
      </div>
    </div>
    <div v-else class="no-results">
      <p class="center">No hay elementos para mostrar.</p>
    </div>
  </div>
</template>

<script>
import { Feed, FeedDay, FeedTracking } from '../models';
export default {
  data() {
    return {
      selectedDay: null,
      selectedDate: null,
      feedDays: []
    }
  },
  computed: {
    totalQuantity() {
      return (this.selectedDay) 
        ? this.selectedDay.getTotal()
        : 0;
    }
  },
  created() {
    this.setFeedDay();
  },
  methods: {
    setFeedDay() {
      const storedTracking = this.getStorage('feedTracking');
      const feedTracking = new FeedTracking(storedTracking.days);
      this.selectedDate = this.selectedDate || this.dateToAppDate(new Date());
      const feedDay = feedTracking.getDay(this.selectedDate);
      this.selectedDay = new FeedDay(this.selectedDate);
      if (feedDay) {
        this.selectedDay.feeds = feedDay.feeds;
      }
      this.feedDays = feedTracking.days.sort((a, b) => b.date - a.date);
    },
    removeFeed(selectedFeed) {
      const storedTracking = this.getStorage('feedTracking');
      const feedTracking = new FeedTracking(storedTracking.days);
      this.selectedDay.removeFeed(selectedFeed);
      feedTracking.updateDay(this.selectedDay);
      if (this.selectedDay.feeds.length === 0) {
        feedTracking.removeDay(this.selectedDay);
      }
      this.setStorage('feedTracking', feedTracking);
      this.setFeedDay();
    },
  }
}
</script>

<style scoped>
.no-results {
  padding: 2em 0;
}
</style>
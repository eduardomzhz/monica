<template>
  <div>
    <nav class="level">
      <b-field label="FECHA" style="display: inline-block">
        <b-select v-model="selectedDate" @input="setFeedDay">
          <option
            v-for="day in feedDays"
            :value="day.date"
            :key="day.date">
            {{ dateToString(day.date) }}
          </option>
        </b-select>
      </b-field>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">TOTAL DEL DÍA</p>
          <p class="title">{{ totalQuantity }} oz</p>
        </div>
      </div>
    </nav>
    <b-table :data="selectedDay ? selectedDay.feeds : []">
      <template slot-scope="props">
        <b-table-column label="HORA">{{ timeToString(props.row.time) }}</b-table-column>
        <b-table-column label="CANTIDAD">{{ props.row.quantity }} oz</b-table-column>
        <b-table-column label="">
          <button class="button" @click="removeFeed(props.row)">&times;</button>
        </b-table-column>
      </template>
    </b-table>
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
      this.feedDays = feedTracking.days;
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
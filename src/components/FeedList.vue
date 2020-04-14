<template>
  <div>
    <nav class="level">
      <b-field label="FECHA" style="display: inline-block">
        <b-select v-model="selectedDate" @input="setFeedDay">
          <option
            v-for="day in feedDays"
            :value="day.date"
            :key="day.date">
            {{ day.date }}
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
    <b-table :data="selectedFeedDay ? selectedFeedDay.feeds : []">
      <template slot-scope="props">
        <b-table-column label="HORA">{{ props.row.time }}</b-table-column>
        <b-table-column label="CANTIDAD">{{ props.row.quantity }} oz</b-table-column>
        <b-table-column label="">
          <button class="button" @click="removeFeed(props.row)">&times;</button>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      today: new Date(),
      selectedFeedDay: null,
      selectedDate: null,
      feedDays: [].reduce
    }
  },
  computed: {
    totalQuantity() {
      return this.selectedFeedDay 
        ? this.selectedFeedDay.feeds.reduce((last, current) => last + Number(current.quantity), 0)
        : 0;
    }
  },
  created() {
    this.setFeedDay();
  },
  methods: {
    formatDate(date) {
      return [date.getDate(), date.getMonth() + 1, date.getFullYear()]
        .map(value => value < 10 ? `0${value}` : `${value}`).join('/');
    },
    formatTime(date) {
      return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    },
    setFeedDay() {
      this.feedDays = JSON.parse(localStorage.getItem('feedDays'));
      this.selectedDate = this.selectedDate || this.formatDate(this.today);
      if (!this.feedDays) {
        this.feedDays = [];
        localStorage.setItem('feedDays', JSON.stringify(this.feedDays));
      }
      this.selectedFeedDay = this.feedDays.find(day => day.date === this.selectedDate);
    },
    removeFeed(selectedFeed) {
      this.feedDays = JSON.parse(localStorage.getItem('feedDays'));
      let dayIndex = this.feedDays.findIndex(day => day.date === this.selectedFeedDay.date);
      let feedIndex = this.selectedFeedDay.feeds.findIndex(feed => feed.time === selectedFeed.time && feed.quantity === selectedFeed.quantity);
      this.selectedFeedDay.feeds.splice(feedIndex, 1);
      if (this.selectedFeedDay.feeds.length > 0) {
        this.feedDays.splice(dayIndex, 1, this.selectedFeedDay);
      } else {
        this.feedDays.splice(dayIndex, 1);
      }
      localStorage.setItem('feedDays', JSON.stringify(this.feedDays));
    }
  }
}
</script>
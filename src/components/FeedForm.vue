<template>
  <form>
    <div class="field">
      <label class="label">FECHA:</label>
      <div class="control">
        <b-datepicker
          v-model="today"
          :showWeekNumber="false"
          :date-formatter="formatDate">
        </b-datepicker>
      </div>
    </div>
    <div class="field">
      <label class="label">HORA:</label>
      <div class="control">
        <b-timepicker
          v-model="today"
          :enable-seconds="false"
          :hour-format="'12'">
        </b-timepicker>
      </div>
    </div>
    <div class="field">
      <label class="label">CANTIDAD:</label>
      <div class="control">
        <input type="number" class="input" v-model="feed.quantity">
      </div>
    </div>
    <div class="field">
      <button class="button" :disabled="!feed.quantity" @click.prevent="addFeed">AGREGAR</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      today: new Date(),
      feed: {
        time: null,
        quantity: null
      }
    }
  },
  created() {
    let feedDays = localStorage.getItem('feedDays');
    if (!feedDays) {
      feedDays = [];
      localStorage.setItem('feedDays', JSON.stringify(feedDays));
    }
  },
  methods: {
    addFeed() {
      let todayDate = this.formatDate(this.today);
      this.feed.time = this.formatTime(this.today);
      let feedDays = JSON.parse(localStorage.getItem('feedDays'));
      let currentFeedDay = feedDays.find(day => day.date === todayDate);
      let missingCurrentFeedDay = !currentFeedDay;
      if (missingCurrentFeedDay) {
        currentFeedDay = { date: todayDate, feeds: [] };
      }
      currentFeedDay.feeds.push(this.feed);
      if (missingCurrentFeedDay) {
        feedDays.push(currentFeedDay);
      } else {
        let index = feedDays.findIndex(day => day.date === todayDate);
        feedDays.splice(index, 1, currentFeedDay);
      }
      localStorage.setItem('feedDays', JSON.stringify(feedDays));
      this.resetForm();
    },
    formatDate(date) {
      return [date.getDate(), date.getMonth() + 1, date.getFullYear()]
        .map(value => value < 10 ? `0${value}` : `${value}`).join('/');
    },
    formatTime(date) {
      return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    },
    resetForm() {
      this.today = new Date();
      this.feed = {
        time: null,
        quantity: null
      };
    }
  }
}
</script>
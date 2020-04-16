<template>
  <div class="level">
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">ULTIMA TOMA</p>
        <p class="title">{{ lastFeedTime || '--' }} | {{ lastFeedQuantity || 0 }} oz</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">TOTAL DEL DÍA</p>
        <p class="title">{{ totalQuantity || 0 }} oz</p>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">COMPARACIÓN DÍA ANTERIOR</p>
        <p class="title">{{ prevDayFeedDiff || 0 }} oz</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lastFeedTime: null,
      lastFeedQuantity: 0,
      totalQuantity: 0,
      prevDayFeedDiff: 0
    }
  },
  created() {
    let feedDays = localStorage.getItem('feedDays');
    if (!feedDays) {
      feedDays = [];
      localStorage.setItem('feedDays', JSON.stringify(feedDays));
    }
    this.updateData();
  },
  methods: {
    formatDate(date) {
      return [date.getDate(), date.getMonth() + 1, date.getFullYear()]
        .map(value => value < 10 ? `0${value}` : `${value}`).join('/');
    },
    formatTime(date) {
      let timeString = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      return `${timeString.length < 8 ? 0 + timeString : timeString}`;
    },
    toSortTime(timeString) {
      let [time, convention] = timeString.split(' ');
      let [hours, minutes] = time.split(':');
      hours = (hours === '12' && convention === 'PM') ? hours : '00';
      return Number(`${hours}${minutes}`) + (convention === 'PM' ? 1200 : 0);
    },
    updateData() {
      let todayDate = this.formatDate(new Date());
      let todayTime = this.formatTime(new Date());
      let feedDays = JSON.parse(localStorage.getItem('feedDays'));
      let index = feedDays.findIndex(day => day.date === todayDate);
      let currentDay = (index > -1)
        ? feedDays[index]
        : null;
      let prevDay = (index < 0)
        ? feedDays[feedDays.length - 1]
        : (feedDays.length > 1)
          ? feedDays[index - 1]
          : null;
      if (currentDay) {
        let lastFeed = currentDay.feeds[currentDay.feeds.length - 1];
        this.lastFeedTime = lastFeed.time;
        this.lastFeedQuantity = lastFeed.quantity;
        this.totalQuantity = currentDay.feeds.reduce((last, current) => last + Number(current.quantity), 0);
      }
      if (prevDay) {
        let currentTime = this.toSortTime(todayTime);
        let prevDayFeeds = prevDay.feeds.filter(feed => this.toSortTime(feed.time) <= currentTime);
        let prevDayQuantity = prevDayFeeds.map(feed => Number(feed.quantity)).reduce((prev, curr) => prev + curr, 0);
        let diff = this.totalQuantity - prevDayQuantity;
        this.prevDayFeedDiff = `${diff > 0 ? '+' : ''}${diff}`;
      } else {
        this.prevDayFeedDiff = `${this.totalQuantity > 0 ? '+' : ''}${this.totalQuantity}`; 
      }
    }
  }
}
</script>
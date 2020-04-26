<template>
  <div class="level flex-columns">
    <div class="level-item has-text-centered full-width">
      <div class="full-width">
        <p class="heading">ULTIMA TOMA</p>
        <p class="title flex">
          <span>{{ lastFeedTime || '--' }}</span>
          <span>{{ lastFeedQuantity || 0 }} oz</span>
        </p>
      </div>
    </div>
    <div class="level-item has-text-centered full-width">
      <div class="full-width flex">
        <div>
          <p class="heading">SIGUIENTE TOMA</p>
          <p class="title">{{ nextFeedTime || '--' }}</p>
        </div>
        <div>
          <p class="heading">TOTAL DEL DÍA</p>
          <p class="title">{{ totalQuantity || 0 }} oz</p>
        </div>
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
import { FeedDay, FeedTracking } from '../models';

export default {
  data() {
    return {
      nextFeedTime: null,
      lastFeedTime: null,
      lastFeedQuantity: 0,
      totalQuantity: 0,
      prevDayFeedDiff: 0
    }
  },
  created() {
    this.updateData();
  },
  methods: {
    updateData() {
      const appDate = this.dateToAppDate(new Date());
      const appTime = this.timeToAppTime(new Date());
      const storedTracking = this.getStorage('feedTracking');
      const feedTracking = new FeedTracking(storedTracking.days);
      const index = feedTracking.days.findIndex(day => day.date === appDate);
      const currentDay = (index > -1)
        ? new FeedDay(appDate, feedTracking.days[index].feeds)
        : null;
      let prevDay = (index < 0)
        ? feedTracking.getLastDay()
        : (feedTracking.days.length > 1)
          ? feedTracking.days[index - 1]
          : null;
      if (currentDay) {
        const lastFeed = currentDay.getLastFeed();
        this.totalQuantity = currentDay.getTotal();
        this.updateLastFeedData(lastFeed);
      }
      if (prevDay) {
        prevDay = new FeedDay(prevDay.date, prevDay.feeds);
        const lastFeed = prevDay.getLastFeed();
        const prevDayQuantity = prevDay.getTotalBefore(appTime);
        const diff = this.totalQuantity - prevDayQuantity;
        this.prevDayFeedDiff = `${diff > 0 ? '+' : ''}${diff}`;
        if (!this.lastFeedTime) {
          this.updateLastFeedData(lastFeed);
        }
      } else {
        this.prevDayFeedDiff = `${this.totalQuantity > 0 ? '+' : ''}${this.totalQuantity}`; 
      }
    },
    updateLastFeedData(lastFeed) {
      const settings = this.getStorage('settings');
      const nextFeedAppTime = this.addHoursToAppTime(lastFeed.time, settings.timeInterval);
      this.nextFeedTime = this.timeToString(nextFeedAppTime);
      this.lastFeedTime = this.timeToString(lastFeed.time);
      this.lastFeedQuantity = lastFeed.quantity;
    }
  }
}
</script>

<style scoped>
.level-item {
  padding: 2em 0;
}
.level-item .title {
  font-size: 2em;
}
</style>
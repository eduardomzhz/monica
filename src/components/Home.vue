<template>
  <div class="level">
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">ULTIMA TOMA</p>
        <p class="title">{{ lastFeedTime || '--' }} &rarr; {{ lastFeedQuantity || 0 }} oz</p>
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
import { FeedDay, FeedTracking } from '../models';

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
    this.updateData();
  },
  methods: {
    updateData() {
      const appDate = this.dateToAppDate(new Date());
      const appTime = this.timeToAppTime(new Date());
      const storedTracking = this.getStorage('feedTracking');
      const feedTracking = new FeedTracking(storedTracking.days);
      let index = feedTracking.days.findIndex(day => day.date === appDate);
      let currentDay = (index > -1)
        ? new FeedDay(appDate, feedTracking.days[index].feeds)
        : null;
      let prevDay = (index < 0)
        ? feedTracking.days[feedTracking.days.length - 1]
        : (feedTracking.days.length > 1)
          ? feedTracking.days[index - 1]
          : null;
      if (currentDay) {
        let lastFeed = currentDay.feeds[currentDay.feeds.length - 1];
        this.lastFeedTime = this.timeToString(lastFeed.time);
        this.lastFeedQuantity = lastFeed.quantity;
        this.totalQuantity = currentDay.getTotal();
      }
      if (prevDay) {
        prevDay = new FeedDay(prevDay.date, prevDay.feeds);
        const prevDayQuantity = prevDay.getTotalBefore(appTime);
        let diff = this.totalQuantity - prevDayQuantity;
        this.prevDayFeedDiff = `${diff > 0 ? '+' : ''}${diff}`;
      } else {
        this.prevDayFeedDiff = `${this.totalQuantity > 0 ? '+' : ''}${this.totalQuantity}`; 
      }
    }
  }
}
</script>
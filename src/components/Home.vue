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
    <div class="level-item has-text-centered full-width">
      <div class="full-width">
        <p class="heading">TENDENCIA {{ appSettings.chartDays }} DIAS</p>
        <p class="title">
          <vue-frappe
            id="chart"
            :height="200"
            :labels="chartLabels"
            :colors="['#DB5461']"
            :axisOptions="{ xAxisMode: 'thick', xIsSeries: 1 }"
            :lineOptions="{ hideDots: 1, regionFill: 1 }"
            :tooltipOptions="{ formatTooltipY: (data) => `${data} oz` }"
            :dataSets="chartData">
        </vue-frappe>
        </p>
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
      prevDayFeedDiff: 0,
      chartData: [{
        chartType: 'line',
        values: []
      }],
      chartLabels: [],
      appSettings: {}
    }
  },
  created() {
    this.appSettings = this.getStorage('settings');
    this.updateData();
  },
  methods: {
    updateChart(days) {
      this.chartData[0].values = [];
      this.chartLabels = [];
      days.forEach(day => {
        const feedDay = new FeedDay(day.date, day.feeds);
        this.chartData[0].values.push(feedDay.getTotal());
        this.chartLabels.push(this.dateToString(feedDay.date));
      });
    },
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
      const lastDays = feedTracking.days.slice(this.appSettings.chartDays * -1);
      this.updateChart(lastDays);
    },
    updateLastFeedData(lastFeed) {
      const nextFeedAppTime = this.addHoursToAppTime(lastFeed.time, this.appSettings.timeInterval);
      this.nextFeedTime = this.timeToString(nextFeedAppTime);
      this.lastFeedTime = this.timeToString(lastFeed.time);
      this.lastFeedQuantity = lastFeed.quantity;
    }
  }
}
</script>

<style scoped>
.level-item {
  padding: 1.5em 0;
}
.level-item .title {
  font-size: 1.5em;
}
</style>
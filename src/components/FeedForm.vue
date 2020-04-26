<template>
  <nav class="level flex flex-columns">
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">FECHA</p>
        <div class="control">
          <b-datepicker
            v-model="form.date"
            :showWeekNumber="false"
            :date-formatter="dateToString">
          </b-datepicker>
        </div>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">HORA</p>
        <div class="control">
          <b-timepicker
            v-model="form.date"
            :enable-seconds="false"
            :mobile-native="false"
            :hour-format="'12'">
          </b-timepicker>
        </div>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">CANTIDAD</p>
        <div class="control">
          <input type="number" class="input" v-model="form.quantity">
        </div>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading"></p>
        <div class="field">
          <button class="button" :disabled="!form.quantity" @click.prevent="save">GUARDAR</button>
        </div>
      </div>
    </div>
  </nav>

</template>

<script>
import { Feed, FeedDay, FeedTracking } from '../models';

export default {
  data() {
    return {
      form: {
        date: new Date(),
        quantity: null
      }
    }
  },
  methods: {
    save() {
      const storedTracking = this.getStorage('feedTracking');
      const appDate = this.dateToAppDate(this.form.date);
      const appTime = this.timeToAppTime(this.form.date);
      const feed = new Feed(appTime, Number(this.form.quantity));
      const feedTracking = new FeedTracking(storedTracking.days);
      const storedFeedDay = feedTracking.getDay(appDate);
      const currentFeedDay = new FeedDay(appDate);
      if (storedFeedDay) {
        currentFeedDay.feeds = storedFeedDay.feeds;
      }
      currentFeedDay.addFeed(feed);
      if (storedFeedDay) {
        feedTracking.updateDay(currentFeedDay);
      } else {
        feedTracking.addDay(currentFeedDay);
      }
      this.setStorage('feedTracking', feedTracking);
      this.showToast('Registro guardado.');
      this.reset();
    },
    reset() {
      this.form.date = new Date();
      this.form.quantity = null;
    }
  }
}
</script>

<style scoped>
.level-item {
  padding: 1em 0;
}
</style>
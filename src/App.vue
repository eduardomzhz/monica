<template>
  <div class="app">
    <div class="container">
      <router-view />
    </div>
    <navigation />
    <span class="version">v{{ version }}</span>
  </div>
</template>

<script>
import Navigation from './components/Navigation';
import { FeedTracking } from './models';
import { version } from '../package.json';

export default {
  name: 'app',
  components: {
    Navigation
  },
  data() {
    return { version }
  },
  created() {
    let feedTracking = this.getStorage('feedTracking');
    if (!feedTracking) {
      feedTracking = new FeedTracking();
      this.setStorage('feedTracking', feedTracking);
    }
  }
}
</script>

<style>
.app {
  padding: 2em;
  height: 100vh;
  background-color: #8c54c1;
  color: #f2ecf8;
}
.app > div:first-child {
  margin-bottom: 4em;
}
.app > .navigation {
  bottom: 0;
  left: 0;
  padding: 1em;
  position: fixed;
  width: 100%;
}
.app .tabs li {
  background-color: #663495;
}
.app .tabs li a {
  border-color: #4c2770;
  color: #f2ecf8;
}
.app .tabs li a:hover,
.app .tabs li.is-active a,
.app .tabs li.is-active {
  background-color: #4c2770;
  border-color: #4c2770;
  color: #f2ecf8;
}
.app .button {
  background-color: #663495;
  border-color: #4c2770;
  color: #f2ecf8;
}
.app .select select,
.app .input {
  background: none;
  border: none;
  border-bottom: 1px solid;
  border-radius: 0;
  box-shadow: none;
  color: #f2ecf8;
  font-size: 1.2em;
  text-align: center;
}
.app .select:not(.is-multiple):not(.is-loading)::after {
  border-color: #f2ecf8;
}
.app .dropdown-item .select select {
  color: #363636;
}
.version {
  bottom: 0;
  font-size: 0.7em;
  position: fixed;
  filter: opacity(30%);
}
.flex {
  display: flex;
  align-items: center;
}
.flex > span, 
.flex > div {
  flex: 1;
  padding: 3px 0;
}
.flex-columns {
  flex-direction: column;
}
.space-between {
  justify-content: space-between;
}
.border-bottom {
  border-bottom: 1px solid whitesmoke;
}
.center {
  text-align: center;
}
.right {
  text-align: right;
}
.full-width {
  width: 100%;
}
.heading {
  font-size: 14px;
  color: #261338;
}
.title {
  color: #f2ecf8;
}
</style>
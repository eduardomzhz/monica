<template>
  <div class="app" :class="theme">
    <div class="container">
      <router-view @updateSettings="update" />
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
    return { 
      version,
      theme: null
    }
  },
  created() {
    let feedTracking = this.getStorage('feedTracking');
    if (!feedTracking) {
      feedTracking = new FeedTracking();
      this.setStorage('feedTracking', feedTracking);
    }
    let settings = this.getStorage('settings');
    if (!settings) {
      settings = {
        theme: 'default',
        timeInterval: 3
      };
      this.setStorage('settings', settings);
    }
    this.update();
  },
  methods: {
    update() {
      let settings = this.getStorage('settings');
      this.theme = settings.theme;
    }
  }
}
</script>

<style>
:root {
  --white: #f2ecf8;
  --light-purple: #9966c8;
  --purple: #663495;
  --dark-purple: #4c2770;
  --darker-purple: #261338;
  --black: #0c0612; 
}
.app {
  padding: 2em;
  height: 100vh;
}
.app.default {
  background-color: var(--light-purple);
  color: var(--white);
}
.app.light {
  background-color: var(--white);
  color: var(--black);
}
.app.dark {
  background-color: var(--black);
  color: var(--white);
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
  background-color: var(--purple);
}
.app .tabs li a {
  border-color: var(--dark-purple);
  color: var(--white);
}
.app .tabs li a:hover,
.app .tabs li.is-active a,
.app .tabs li.is-active {
  background-color: var(--dark-purple);
  border-color: var(--dark-purple);
  color: var(--white);
}
.app .button {
  background-color: var(--purple);
  border-color: var(--dark-purple);
  color: var(--white);
}
.app .select select,
.app .input {
  background: none;
  border: none;
  border-bottom: 1px solid;
  border-radius: 0;
  box-shadow: none;
  font-size: 1.2em;
  text-align: center;
}
.app.default .select select,
.app.dark .select select,
.app.default .input,
.app.dark .input {
  color: var(--white);
}
.app.light .select select,
.app.light .input {
  color: var(--black);
}
.app.default .select:not(.is-multiple):not(.is-loading)::after,
.app.dark .select:not(.is-multiple):not(.is-loading)::after {
  border-color: var(--white);
}
.app.light .select:not(.is-multiple):not(.is-loading)::after {
  border-color: var(--purple);
}
.app .dropdown-item .select select {
  color: var(--black);
}
.app.default .b-radio.radio input[type="radio"]:checked + .check,
.app.dark .b-radio.radio input[type="radio"]:checked + .check {
  border-color: var(--white)  ;
}
.app.light .b-radio.radio input[type="radio"]:checked + .check {
  border-color: var(--black)  ;
}
.app.default .b-radio.radio input[type="radio"] + .check::before,
.app.dark .b-radio.radio input[type="radio"] + .check::before {
  background-color: var(--white);
}
.app.light .b-radio.radio input[type="radio"] + .check::before {
  background-color: var(--black);
}
.app.default .heading {
  color: var(--darker-purple);
}
.app.light .heading {
  color: var(--purple);
}
.app.dark .heading {
  color: var(--light-purple);
}
.app.default .title,
.app.dark .title {
  color: var(--white);
}
.app.light .title {
  color: var(--black);
}
.app.default .border-bottom,
.app.dark .border-bottom {
  border-bottom: 1px solid var(--white);
}
.app.light .border-bottom {
  border-bottom: 1px solid var(--light-purple);
}
.app.default .list-header {
  color: var(--darker-purple);
}
.app.light .list-header {
  color: var(--purple);
}
.app.dark .list-header {
  color: var(--light-purple);
}
.app.default ~ .notices .toast.is-dark {
  color: var(--white);
  background: var(--dark-purple);
}
.app.light ~ .notices .toast.is-dark,
.app.dark ~ .notices .toast.is-dark {
  color: var(--white);
  background: var(--light-purple);
}
.app ~ .notices .toast {
  border-radius: 0.3em;
}
.app ~ .dialog.modal .modal-card {
  color: var(--white);
}
.app.default ~ .dialog.modal .modal-card section,
.app.default ~ .dialog.modal .modal-card footer {
  background-color: var(--dark-purple);
}
.app.light ~ .dialog.modal .modal-card section,
.app.dark ~ .dialog.modal .modal-card section,
.app.light ~ .dialog.modal .modal-card footer,
.app.dark ~ .dialog.modal .modal-card footer {
  background-color: var(--light-purple);
}
.app ~ .dialog.modal .modal-card footer button.is-primary {
  background-color: var(--darker-purple);
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
}
</style>
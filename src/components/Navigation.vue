<template>
  <div class="navigation">
    <div class="tabs is-toggle is-fullwidth">
      <ul>
        <li v-for="tab in tabs" :key="tab.route">
          <router-link :to="tab.route" @click="setActive(tab.route)">{{ tab.label }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { 
      tabs: [
        {
          isActive: true,
          route: '/',
          label: 'RESUMEN'
        },
        {
          isActive: false,
          route: '/feed-form',
          label: 'AGREGAR'
        },
        {
          isActive: false,
          route: '/feed-list',
          label: 'HISTORIAL'
        },
      ]
    }
  },
  methods: {
    setActive(route) {
      this.tabs.forEach(tab => tab.isActive = (tab.route === route));
    }
  }
}
</script>
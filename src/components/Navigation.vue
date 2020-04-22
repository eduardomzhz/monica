<template>
  <div class="navigation">
    <div class="tabs is-toggle is-fullwidth">
      <ul>
        <li v-for="(tab, index) in tabs" 
          :key="tab.index" 
          :class="{ 'is-active': tab.isActive }" 
          @click="setActive(index)">
          <router-link :to="tab.route">{{ tab.label }}</router-link>
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
    setActive(activeIndex) {
      this.tabs.forEach((tab, index) => {
        tab.isActive = (index === activeIndex)
      });
    }
  }
}
</script>
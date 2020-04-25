<template>
  <nav class="level flex flex-columns">
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">TEMA</p>
        <div class="control">
          <b-radio v-for="(theme, index) in themes"
            :key="index"
            v-model="form.theme"
            name="theme"
            :native-value="theme.name"
            @input="update">
            {{ theme.label }}
          </b-radio>
        </div>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">TIEMPO ENTRE TOMAS (HORAS)</p>
        <div class="control">
          <input type="number" class="input" v-model="form.timeInterval" @input="update">
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      form: {
        theme: null,
        timeInterval: null
      },
      themes: [
        {
          name: 'default',
          label: 'Default'
        },
        {
          name: 'light',
          label: 'Claro'
        },
        {
          name: 'dark',
          label: 'Oscuro'
        }
      ]
    }
  },
  created() {
    this.form = { ...this.getStorage('settings') };
  },
  methods: {
    update() {
      this.setStorage('settings', this.form);
      this.$emit('updateSettings');
    }
  }
}
</script>

<style scoped>
.level-item {
  padding: 2em 0;
}
</style>
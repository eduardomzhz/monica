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
            @input="saveTheme">
            {{ theme.label }}
          </b-radio>
        </div>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">TIEMPO ENTRE TOMAS (HORAS)</p>
        <div class="control">
          <input type="number" class="input" v-model="form.timeInterval">
        </div>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading">DÍAS EN GRÁFICO</p>
        <div class="control">
          <input type="number" class="input" v-model="form.chartDays">
        </div>
      </div>
    </div>
    <div class="level-item has-text-centered">
      <div>
        <p class="heading"></p>
        <div class="field">
          <button class="button" :disabled="!canSave" @click.prevent="save">GUARDAR</button>
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
        timeInterval: null,
        chartDays: null
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
  computed: {
    canSave() {
      return !!(
        this.form.chartDays
        && this.form.chartDays >= 2
        && this.form.chartDays % 1 === 0
        && this.form.chartDays <= 365
        && this.form.timeInterval
        && this.form.timeInterval >= 1
        && this.form.timeInterval % 1 === 0
        && this.form.timeInterval <= 24
      );
    }
  },
  created() {
    this.form = { ...this.getStorage('settings') };
  },
  methods: {
    save() {
      this.setStorage('settings', this.form);
      this.showToast('Ajustes actualizados.');
    },
    saveTheme() {
      this.setStorage('settings', this.form);
      this.$emit('updateTheme');
    }
  }
}
</script>

<style scoped>
.level-item {
  padding: 2em 0;
}
</style>
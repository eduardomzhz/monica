export default {
  methods: {
    /* -------- LocalStorage methods -------- */
    clearStorage() {
      localStorage.clear();
    },
    getStorage(key) {
      return JSON.parse(localStorage.getItem(key));
    },
    removeStorage(key) {
      localStorage.removeItem(key);
    },
    setStorage(key, value) {
      const formattedValue = (typeof(value) === 'object')
        ? JSON.stringify(value)
        : value;
      localStorage.setItem(key, formattedValue);
    },
    /* -------- DateTime methods -------- */
    dateToAppDate(date) {
      return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
        .map(value => value < 10 ? `0${value}` : `${value}`).join('');
    },
    dateToString(date) {
      return (typeof(date) === 'string')
        ? `${date.slice(6, 8)}/${date.slice(4, 6)}/${date.slice(0, 4)}`
        : [date.getDate(), date.getMonth() + 1, date.getFullYear()]
          .map(value => value < 10 ? `0${value}` : `${value}`).join('/');
    },
    timeToAppTime(time) {
      const locale = time.toLocaleString('en-US', { 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: false }
      );
      return locale.replace(':', '');
    },
    timeToString(time) {
      let timeString = '';
      if (typeof(time) === 'string') {
        const hour = time.slice(0, 2);
        const minutes = time.slice(2, 4);
        const fixedHour = hour > 12 ? `${hour < 10 ? 0 : ''}${hour - 12}` : hour; 
        timeString = `${fixedHour}: ${minutes} ${hour > 11 ? 'PM' : 'AM'}`;
      } else {
        timeString = time.toLocaleString('en-US', { 
          hour: 'numeric', 
          minute: 'numeric', 
          hour12: true }
        );
      }
      return timeString;
    }
  }
}
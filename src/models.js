export class Feed {
  constructor(time = null, quantity = null) {
    this.time = time;
    this.quantity = quantity;
  }
}

export class FeedDay {
  constructor(date = null, feeds = []) {
    this.date = date;
    this.feeds = feeds;
  }

  addFeed(feed) {
    this.feeds.push(feed);
    this.sortFeeds();
  }
  getTotal(feeds = this.feeds) {
    return feeds.reduce((last, current) => last + current.quantity, 0);
  }
  getTotalBefore(time) {
    const feeds = this.feeds.filter(feed => feed.time <= time);
    return this.getTotal(feeds);
  }
  removeFeed(feed) {
    const index = this.feeds.findIndex(_feed => 
      _feed.time === feed.time 
      && _feed.quantity === feed.quantity
    );
    if (index > -1) {
      this.feeds.splice(index, 1);
    }
  }
  sortFeeds() {
    this.feeds.sort((a, b) => a.time - b.time);
  }
}

export class FeedTracking {
  constructor(days = []) {
    this.days = days;
  }

  addDay(day) {
    this.days.push(day);
    this.sortDays();
  }
  getDay(date) {
    return this.days.find(day => day.date === date);
  }
  removeDay(day) {
    const index = this.days.findIndex(_day => _day.date === day.date);
    if (index > -1) {
      this.days.splice(index, 1);
    }
  }
  updateDay(day) {
    const index = this.days.findIndex(_day => _day.date === day.date);
    if (index > -1) {
      this.days.splice(index, 1, day);
    }
  }
  sortDays() {
    this.days.sort((a, b) => a.date - b.date);
  }
}
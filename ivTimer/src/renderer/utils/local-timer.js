export function createLocalTimer () {
  return new LocalTimer()
}

export default class LocalTimer {
  constructor () {
    this.current = this.now()
    this.timerId = this.start()
  }
  [Symbol.toPrimitive] () {
    return `${this.current.hour}:${this.current.minute}:${this.current.second} ${this.current.day}.${this.current.month}.${this.current.year}`
  }
  get () {
    return this.current
  }
  start () {
    return setInterval(this.now, 1000)
  }
  now () {
    const [date, time] = (new Date()).toLocaleString().split(',')
    const [day, month, year] = date.split('.')
    const [hour, minute, second] = time.split(':')
    this.current = {
      day: +day,
      month: +month,
      year: +year,
      hour: +hour,
      minute: +minute,
      second: +second
    }
    // console.log(`${this.current.hour}:${this.current.minute}:${this.current.second} ${this.current.day}.${this.current.month}.${this.current.year}`)
    return this.current
  }
  validateDate (obj) {
    for (let period of ['second', 'minute', 'hour', 'day', 'month', 'year']) {
      obj[period] = +obj[period]
      switch (period) {
        case 'second':
        case 'minute':
          if (obj[period] > 59) obj[period] = 0
          break
        case 'hour':
          if (obj[period] > 23) obj[period] = 0
          break
        case 'month':
          if (obj[period] > 12) obj[period] = 0
          break
        case 'day':
          switch (obj.month) {
            case 2:
              const vy = obj.year % 4 || (obj.year % 100 === 0 && obj.year % 400) ? 28 : 29
              if (obj.day > vy) obj.day = 1
              break
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
              if (obj.day > 31) obj.day = 1
              break
            default:
              if (obj.day > 30) obj.day = 1
              break
          }
          break
      }
    }
    if (obj.id === undefined) obj.id = ~~(Math.random() * 100000)
    return obj
  }
  equl ({day, month, year, hour, minute, second}) {
    return day === this.current.day &&
    month === this.current.month &&
    year === this.current.year &&
    hour === this.current.hour &&
    minute === this.current.minute &&
    second === this.current.second
  }
  equlDate ({day, month, year}) {
    return day === this.current.day &&
    month === this.current.month &&
    year === this.current.year
  }
  equlTime ({hour, minute, second}) {
    return hour === this.current.hour &&
    minute === this.current.minute &&
    second === this.current.second
  }
  equlMonth ({month, year}) {
    return month === this.current.month && year === this.current.year
  }
}

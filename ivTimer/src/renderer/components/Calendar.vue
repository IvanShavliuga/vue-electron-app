<script>
export default {
  data () {
    return {
      day: new Date(), // день
      month: new Date().getMonth(), // месяц
      year: new Date().getFullYear(), // год
      daysWeek: [
        { ru: 'пн', en: 'mon' },
        { ru: 'вт', en: 'tue' },
        { ru: 'ср', en: 'wed' },
        { ru: 'чт', en: 'thu' },
        { ru: 'пт', en: 'fri' },
        { ru: 'сб', en: 'sat' },
        { ru: 'вс', en: 'sun' }
      ],
      namesMonth: [
        { ru: 'Январь', en: 'January' },
        { ru: 'Февраль', en: 'February' },
        { ru: 'Март', en: 'March' },
        { ru: 'Апрель', en: 'April' },
        { ru: 'Май', en: 'May' },
        { ru: 'Июнь', en: "June's" },
        { ru: 'Июль', en: 'July' },
        { ru: 'Август', en: 'August' },
        { ru: 'Сентябрь', en: 'September' },
        { ru: 'Октябрь', en: 'October' },
        { ru: 'Ноябрь', en: 'November' },
        { ru: 'Декабрь', en: 'December' }
      ],
      dayArray: [], // массив дней
      dCount: [], // количество дней в месяце
      current: {
        day: 7,
        month: 4
      },
      end: {
        day: 14,
        month: 4
      }
    }
  },
  methods: {
    calendar (y, m) {
      if (y % 4 === 0) {
        this.dCount = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      } else {
        this.dCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      }
      const [day, month, year] = (new Date()).toLocaleDateString().split('.')
      this.current = {
        day: +day,
        month: +month,
        year: +year
      }
      const startDayWeek = (new Date(y, m).getDay() || 7) - 1
      let daysInWeek = []
      const daysMonth = this.dCount[m]
      const daysMonthPrev = this.dCount[m > 0 ? m - 1 : 11]
      let d = 1
      let dw = 0
      daysInWeek.length = 7
      daysInWeek.fill(-1)
      for (dw = 0; dw < startDayWeek; dw++) {
        daysInWeek[startDayWeek - dw - 1] = {
          day: daysMonthPrev - dw,
          currmonth: false
        }
      }
      for (dw = startDayWeek; dw < 7; dw++) {
        daysInWeek[dw] = { day: d, currmonth: true, weekend: dw >= 5 }
        d++
      }
      this.dayArray.push(daysInWeek)
      dw = 0
      let endd = 1
      while (d <= daysMonth) {
        daysInWeek = []
        for (dw = 0; dw < 7; dw++) {
          if (d > daysMonth) {
            daysInWeek[dw] = { day: endd, currmonth: false, weekend: dw >= 5 }
            endd++
          } else {
            daysInWeek[dw] = { day: d, currmonth: true, weekend: dw >= 5 }
          }
          d++
        }
        this.dayArray.push(daysInWeek)
      }
    },
    displayCells (d) {
      if (this.current.day === d.day && d.currmonth) {
        return 'calendar__day-current'
      } else {
        const list = this.$store.getters.tasksList.filter(({day, month, year}) => {
          return d.day === day && this.month + 1 === month && year === this.year
        })
        console.log(this.month)
        if (list.length) return 'calendar__day-task'
        if (!d.currmonth) {
          return 'calendar__day-prev'
        } else {
          if (d.weekend) return 'calendar__day-weekend'
          return 'calendar__day-month'
        }
      }
    },
    toDay (day, month, year) {
      if (+day >= this.current.day && +month >= this.current.month && +year >= this.year) { this.$router.push(`/add?day=${day}&month=${month}&year=${year}`) }
    },
    prev () {
      if (this.month > 0) {
        this.month--
        this.dayArray = []
        this.calendar(this.year, this.month)
      } else if (this.month === 0) {
        this.month = 11
        this.year--
        this.dayArray = []
        this.calendar(this.year, this.month)
      }
    },
    next () {
      if (this.month < 11) {
        this.month++
        this.dayArray = []
        this.calendar(this.year, this.month)
      } else if (this.month === 11) {
        this.month = 0
        this.year++
        this.dayArray = []
        this.calendar(this.year, this.month)
      }
    }
  },
  mounted () {
    this.calendar(this.year, this.month)
  }
}
</script>
<template>
  <div class="calendar">
    <h2 class="calendar__caption">
      <span class="calendar__caption-buttons" @click="prev">&lt;</span>
      <span>{{ namesMonth[month].ru }}</span>
      <span>{{ year }}</span>
      <span class="calendar__caption-buttons" @click="next">&gt;</span>
    </h2>
    <table class="calendar__table">
      <tbody>
        <tr class="calendar__table-header">
          <th v-for="dw in daysWeek" :key="dw.en" class="calendar__table-days">
            {{ dw.ru }}
          </th>
        </tr>
        <tr v-for="(dwa, k1) in dayArray" :key="k1 * 100" class="calendar__table-row">
          <td v-for="(d, k2) in dwa" :key="d + k2 * 100" class="calendar__table-cell" :class="displayCells(d)" @click="toDay(d.day, month + 1, year)">
            {{ d.day }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style lang="scss" scoped>
.calendar {
  margin: 0;
  padding: 15px;
  &__caption {
    color: white;
    font-weight: 700;
    text-align: center;
    &-buttons {
      color: yellow;
      font-size: 25px;
      font-weight: 900;
      margin: 0 10px;
    }
  }
  &__table {
    font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-weight: 800;
    width: 100%;
    border: 1px solid white;
    border-collapse: collapse;
    &-header {
      background-color: rgba(128,128,10, 0.7);
    }
    &-days {
      color: yellow;
      font-weight: 700;
    }
    &-row {
      background: rgba(128,128,128, 0.2);
      &:nth-child(2n) {
        background-color: rgba(234,234,234, 0.3);
      }
    }
    &-cell {
      color: white;
      text-align: center;
      &:nth-child(6), &:nth-child(7) {
        background-color: rgba(234,10,10, 0.1);
      }
    }
  }
  &__day {
    &-current {
      color: yellow;
      background-color: rgba(234,234,10, 0.1);
    }
    &-prev {
      color: silver;
    }
    &-month {
      color: white;
    }
    &-weekend {
      color: tomato;
    }
    &-task {
      color: yellow;
      background-color: rgba(15,12,200, 0.6);
    }
  }
}
</style>
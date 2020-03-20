<template>
  <div class="pricecalendar">
    <datepicker
      ref="calendar"
      :inline="true"
      v-on:selected="rangeManager"
      :highlighted="highlighted"
      :day-cell-content="customFormat"
      :bootstrap-styling="true"
    ></datepicker>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import * as lang from "vuejs-datepicker/src/locale";

export default {
  name: "Pricecalendar",
  components: {
    Datepicker
  },
  data() {
    return {
      format: "d MMMM yyyy",
      disabledDates: {},
      disabledFn: {
        customPredictor(date) {
          if (date.getDate() % 3 === 0) {
            return true;
          }
        }
      },
      highlightedFn: {
        customPredictor(date) {
          if (date.getDate() % 4 === 0) {
            return true;
          }
        }
      },
      highlighted: {},
      startDate: null,
      endDate: null,
      eventMsg: null,
      language: "en",
      languages: lang,
      vModelExample: null,
      changedMonthLog: []
    };
  },
  methods: {
    highlightTo(val) {
      if (typeof this.highlighted.to === "undefined") {
        this.highlighted = {
          to: null,
          daysOfMonth: this.highlighted.daysOfMonth,
          from: this.highlighted.from
        };
      }
      this.highlighted.to = val;
      return true;
    },
    customFormat(day) {
      return `<div class='price'>$${Math.floor(
        Math.random() * 79 + 1
      )}</div><div class='num'>${day.date}</div>`;
    },
    highlightFrom(val) {
      if (typeof this.highlighted.from === "undefined") {
        this.highlighted = {
          to: this.highlighted.to,
          daysOfMonth: this.highlighted.daysOfMonth,
          from: null
        };
      }
      this.highlighted.from = val;
      return true;
    },
    rangeManager(val) {
      if (!this.startDate) {
        this.startDate = val;
        this.highlightFrom(val);
      } else {
        if (val <= this.startDate) {
          this.startDate = val;
          this.endDate = NaN;
          this.highlightFrom(NaN);
          this.highlightTo(NaN);
          this.setHighlightedDays(this.$refs.calendar);
        }
        if (val >= this.endDate) {
          this.startDate = val;
          this.endDate = NaN;
          this.highlightFrom(NaN);
          this.highlightTo(NaN);
          this.setHighlightedDays(this.$refs.calendar);
        } else {
          this.endDate = val;
          this.highlightFrom(this.startDate);
          this.highlightTo(val);
          this.setHighlightedDays(this.$refs.calendar);
        }
      }
    },
    setHighlightedDays(elem) {
      this.highlighted = {
        from: this.highlighted.from,
        to: this.highlighted.to,
        daysOfMonth: []
      };
    },
    setDisabledDays(elem) {
      if (elem.target.value === "undefined") {
        return;
      }
      let disabledDays = elem.target.value.split(",").map(day => parseInt(day));
      this.disabledDates = {
        from: this.disabledDates.from,
        to: this.disabledDates.to,
        daysOfMonth: disabledDays
      };
    },
    disableTo(val) {
      if (typeof this.disabled.to === "undefined") {
        this.disabledDates = {
          to: null,
          daysOfMonth: this.disabledDates.daysOfMonth,
          from: this.disabled.from
        };
      }
      this.disabledDates.to = val;
    },
    disableFrom(val) {
      if (typeof this.disabledDates.from === "undefined") {
        this.disabled = {
          to: this.disabledDates.to,
          daysOfMonth: this.disabled.daysOfMonth,
          from: null
        };
      }
      this.disabledDates.from = val;
    },
    openPicker() {
      this.$refs.programaticOpen.showCalendar();
    },
    logChangedMonth(date) {
      this.changedMonthLog.push(date);
    },
    getPrice(day) {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
div[class="price"] {
  font-size: 50%;
  position: relative;
  top: -30%;
  right: 0px;
  width: 100%;
  height: 10%;
  color: green;
  z-index: 999;
}

div[class*="calendar"] {
  color: grey;
}

span.cell.day.selected {
  background: green;
}

span.cell.day.selected:hover {
  background: olive;
}

span.cell.day.highlighted {
  background: purple;
}

span.cell.day.highlighted.highlight-end {
  background: red;
}

span.cell.day.highlighted.highlight-start {
  background: green;
}

span[class*="selected"] {
  background-color: yellow;
  background: purple;
  color: orange;
}

span[class*="highlighted"] {
  background-color: yellow;
  background: purple;
  color: black;
}
</style>
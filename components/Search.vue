<template>
  <div style="height:340px;">
    <transition name="slide-fade" :duration="{ enter: 500, leave: 800 }">
      <div v-if="!processing" class="form">
        <div v-for="tag in tags" :key="tag.id">
          <Tag :result="tag"/>
        </div>
        <toggle-button
          v-on:input="state.return=!state.return"
          :width="100"
          :height="25"
          :labels="{checked: 'One-Way', unchecked: 'Return'}"
        ></toggle-button>

        <autocomplete
          ref="departing"
          :source="this.airports"
          results-property="id"
          results-display="displayName"
          placeholder="Departing From"
          :v-model="this.state.departing"
          v-on:input="(id)=>updateDeparting(id)"
          v-bind:initialValue="this.$store.state.departing"
          :disableInput="processing"
        ></autocomplete>

        <autocomplete
          ref="arriving"
          :source="this.airports"
          results-property="id"
          results-display="displayName"
          placeholder="Arriving At"
          v-on:input="(id)=>updateArriving(id)"
          initialValue="Austin, TX - AUS"
          :disableInput="processing"
        ></autocomplete>

        <datepicker
          class="customPicker"
          ref="depart"
          placeholder="Depart Date"
          v-model="state.startDate"
          :disabled="processing"
        ></datepicker>

        <datepicker
          class="customPicker"
          ref="return"
          placeholder="Return Date"
          v-model="state.endDate"
          :disabled="processing"
          :hidden="state.return"
        ></datepicker>
        <button class="button" v-on:click="makeRequest" :disabled="processing">I am a Button</button>
      </div>
    </transition>
    <div :hidden="!processing" class="holder">
      <transition name="slide-fade" :duration="{ enter: 3000, leave: 100 }">
        <lottie
          ref="lot"
          :options="defaultOptions"
          :height="400"
          :width="400"
          v-on:animCreated="handleAnimation"
          v-if="processing"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
import Autocomplete from "vuejs-auto-complete";
import { ToggleButton } from "vue-js-toggle-button";
import * as lang from "vuejs-datepicker/src/locale";
import axios from "axios";
import Lottie from "vue-lottie";
import * as animationData from "/assets/Plane.json";
import Tag from "/components/Tag";

const state = {
  date1: new Date(),
  startDate: NaN,
  endDate: NaN,
  departing: NaN,
  arriving: NaN,
  return: false
};

export default {
  name: "Search",
  components: {
    Datepicker,
    Autocomplete,
    ToggleButton,
    Lottie,
    Tag
  },
  data() {
    return {
      eventMsg: null,
      state: state,
      language: "en",
      airports: [],
      defaultOptions: { animationData: animationData },
      animationSpeed: 1,
      results: []
    };
  },
  computed: {
    processing() {
      return this.$store.state.processing;
    },
    tags() {
      var t = [];
      var temp = this.$store
        .$db()
        .model("search")
        .query()
        .where("departing", this.$store.state.currentDeparting)
        .orWhere("departing", this.$store.state.currentArriving)
        .orWhere("arriving", this.$store.state.currentDeparting)
        .orWhere("arriving", this.$store.state.currentArriving)
        .get();
      for (const search of temp) {
        t.push(search.departing);
      }
      return temp;
    }
  },
  created() {
    axios
      .get("airports.json")
      .then(response => {
        this.airports = response.data;
      })
      .catch(error => console.log(error));
  },
  methods: {
    handleAnimation: function(anim) {
      this.anim = anim;
    },
    updateDeparting: function(e) {
      state.departing = e;
      this.$store.commit("updatedeparting", e);
    },
    updateArriving: function(e) {
      state.arriving = e;
      this.$store.commit("updatearriving", e);
    },
    makeRequest: function() {
      this.$store.dispatch("performSearch", {
        departing: state.departing,
        arriving: state.arriving,
        depart: state.startDate,
        arrive: state.endDate,
        oneway: state.return
      });

      this.$store
        .$db()
        .model("search")
        .insert({
          data: [
            {
              departing: state.departing,
              arriving: state.arriving,
              depart: state.startDate.getTime(),
              arrive: state.endDate.getTime(),
              oneway: state.return
            }
          ]
        });
    }
  },
  filters: {
    pretty: function(value) {
      return JSON.stringify(JSON.parse(value), null, 2);
    }
  }
};
</script>

<style scoped>
body {
  font-family: "Helvetica Neue Light", Helvetica, sans-serif;
  padding: 1em 2em 2em;
  font: black;
}
input,
select {
  padding: 0.75em 0.5em;
  font-size: 100%;
  border: 1px solid #ccc;
  width: 100%;
}

select {
  height: 2.5em;
}

.example {
  background: #f2f2f2;
  border: 1px solid #ddd;
  padding: 0em 1em 1em;
  margin-bottom: 2em;
}

code,
pre {
  margin: 1em 0;
  padding: 1em;
  border: 1px solid #bbb;
  display: block;
  background: #ddd;
  border-radius: 3px;
}

.settings {
  margin: 2em 0;
  border-top: 1px solid #bbb;
  background: #eee;
}


h5 {
  font-size: 100%;
  padding: 0;
}

.form-group {
  margin-bottom: 1em;
}

.form-group label {
  font-size: 80%;
  display: block;
}

.price {
  font-size: 50%;
  position: relative;
  top: -30%;
  right: 0px;
  width: 100%;
  height: 10%;
  color: green;
  z-index: 999;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 2s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.holder {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  z-index: 999;
}

.button {
  background-color: rgb(191, 203, 217);
  color: white;
  width: auto;
  height: 40px;
  border-radius: 25px;
  border-color: rgb(191, 203, 217);
}
</style>

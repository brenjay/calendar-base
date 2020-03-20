<template>
  <div id="app">
    <v-app id="app">
      <v-navigation-drawer v-model="drawer" app clipped>
        <v-list dense>
          <v-list-item @click>
            <v-list-item-action>
              <v-icon>mdi-dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click>
            <v-list-item-action>
              <v-icon>settings</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app clipped-left>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Application</v-toolbar-title>
      </v-app-bar>

      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <Search></Search>
              <v-date-picker/>
            <v-flex shrink>
              <v-tooltip right>
                <span>Test</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>

      <v-footer app>
        <span>&copy; 2020</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import Search from "/components/Search.vue";
import Result from "/components/Result.vue";
import Pricecalendar from "/components/PriceCalendar.vue";
import * as lang from "vuejs-datepicker/src/locale";
import axios from "axios";
import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

const state = {
  date1: new Date(),
  startDate: NaN,
  endDate: NaN,
  departing: NaN,
  arriving: NaN,
  return: false,
  processing: false
};

export default {
  name: "app",
  components: {
    Search,
    Result,
    Pricecalendar
  },
  props: {
    source: String
  },
  data() {
    return {
      state: state,
      results: [],
      drawer: null
    };
  },
  computed: {
    processing() {
      return this.$store.state.processing;
    },
    current() {
      return this.$store.state.currentDeparting;
    },
    searches() {
      return this.$store
        .$db()
        .model("search")
        .all();
    },
    mySearch() {
      return this.$store
        .$db()
        .model("search")
        .query()
        .all();
    },
    related() {
      return this.$store
        .$db()
        .model("search")
        .query()
        .where("departing", this.$store.state.currentDeparting)
        .orWhere("departing", this.$store.state.currentArriving)
        .orWhere("arriving", this.$store.state.currentDeparting)
        .orWhere("arriving", this.$store.state.currentArriving)
        .get();
    }
  },
  mounted() {
    axios
      .get("airports.json")
      .then(response => {
        this.airports = response.data;
      })
      .catch(error => console.log(error));
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
  methods: {
    makeRequest: async function() {
      state.processing = !state.processing;
      await new Promise(resolve =>
        setTimeout(resolve, Math.floor(Math.random() * 2000) + 1000)
      );
      this.results[this.results.length] = {
        departing: state.departing,
        arriving: state.arriving
      };
      state.processing = !state.processing;
    }
  },
  filters: {
    pretty: function(value) {
      return JSON.stringify(JSON.parse(value), null, 2);
    }
  }
};
</script>

<style>
body {
  font-family: "Helvetica Neue Light", Helvetica, sans-serif;
}
</style>

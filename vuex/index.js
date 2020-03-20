import Vue from "vue";
import Vuex from "vuex";
import VuexORM from "@vuex-orm/core";
import Search from "/models/Search";

Vue.use(Vuex);

// Create a new instance of Database.
const database = new VuexORM.Database();

// Register Models to Database.
database.register(Search);

// Create Vuex Store and register database through Vuex ORM
export default new Vuex.Store({
  plugins: [VuexORM.install(database)],
  state: {
    processing: false,
    results: [],
    currentDeparting: null,
    currentArriving: null
  },
  mutations: {
    processing(state) {
      state.processing = true;
    },
    processed(state) {
      state.processing = false;
    },
    updatedeparting(state, payload) {
      state.currentDeparting = payload;
    },
    updatearriving(state, payload) {
      state.currentArriving = payload;
    }
  },
  getters: {},
  actions: {
    performSearch({ commit, state }, payload) {
      commit("processing");
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit("processed");
          resolve();
        }, Math.floor(Math.random() * 5000) + 3000);
      });
    },
    performWait({ commit, state }, payload) {
      commit("processing");
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit("processed");
          resolve();
        }, Math.floor(Math.random() * 5000) + 3000);
      });
    }
  }
});

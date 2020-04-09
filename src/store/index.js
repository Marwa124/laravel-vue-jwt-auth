import Vue from "vue";
import Vuex from "vuex";

import {AppUrl} from "@/router/routes";
import VuexPersistence from 'vuex-persist'
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    loggedIn: false
  },
  plugins: [new VuexPersistence().plugin],
  mutations: {
    SET_token(state, payload)
    {
      state.token = payload;
    },
    SET_user(state, payload)
    {
      state.user = payload;
    },
    SET_loggedIn(state, payload)
    {
      state.loggedIn = payload;
    }
  },
  actions: {
    loginAction({commit}, payload){
      return new Promise((resolve, reject) => {
        payload.form.post(AppUrl + "api/auth/login", payload.form).then(res => {
          commit('SET_token', res.data.access_token);
          commit('SET_user', res.data.user);
          commit('SET_loggedIn', true);
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    logoutAction({commit, state}){
      return new Promise((resolve, reject) => {
        axios.post(AppUrl + 'api/auth/logout', {
          token: state.token,
        }).then(res => {
          commit('SET_token', null);
          commit('SET_user', null);
          commit('SET_loggedIn', false);
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      });
    },
    registerAction({commit}, payload){
      return new Promise((resolve, reject) => {
        payload.form.post(AppUrl + 'api/auth/register', payload.form).then(res => {
          commit('SET_token', res.data.access_token);
          commit('SET_user', res.data.user);
          commit('SET_loggedIn', true);
          resolve(res);
        }).catch(err => {
          reject(err);
        })
      });
    }
  },
  getters: {
    get_loggedIn(state)
    {
      return state.loggedIn;
    }
  },
  modules: {}
});

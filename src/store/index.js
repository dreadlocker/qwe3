import Vue from 'vue'
import Vuex from 'vuex'
import { filterAll } from "@/assets/constants.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [],
    allProducts: {},
    filteredProducts: {},
    categoriesDropdownValue: null,
    isAuth: false,
    adminStep: 0,
    showLoader: true,
    orderingDropdownValue: '',
  },
  getters: {
    hasSomeProducts(state) {
      return Object.values(state.allProducts)
        .map((productsByCategory) => productsByCategory.length > 0)
        .some((bool) => bool);
    },
  },
  mutations: {
    saveCategories(state, value) {
      state.categories = value
    },
    saveFilteredProducts(state, category) {
      if (category === undefined || category === filterAll) {
        state.filteredProducts = state.allProducts
      } else {
        state.filteredProducts = {
          [category]: state.allProducts[category]
        }
      }
    },
    saveCategoriesDropdownSelect(state, value) {
      state.categoriesDropdownValue = value
    },
    onIsAuthChange(state, value) {
      state.isAuth = value
    },
    adminStepChange(state, value) {
      state.adminStep = value
    },
    showLoaderChange(state, value) {
      state.showLoader = value
    },
    saveAllProducts(state, value) {
      state.allProducts = value
    },
    saveOrderedFilteredProducts(state, value) {
      state.filteredProducts = value
    },
    saveOrderingDropdownValue(state, value) {
      state.orderingDropdownValue = value
    },
  },
  actions: {
  },
  modules: {
  }
})

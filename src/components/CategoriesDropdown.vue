<template>
  <div class="wrapper">
    <label v-if="!hideText" for="products" class="label"
      >Филтър по категория:
    </label>
    <select
      @change="onChange($event)"
      :value="categoriesDropdownValue"
      name="products"
      id="products"
    >
      <option :value="filterAll">{{ filterAll }}</option>
      <option
        v-for="(category, index) in this.$store.state.categories"
        :key="index"
        :value="category"
      >
        {{ category }}
      </option>
    </select>
  </div>
</template>

<script>
import { filterAll } from "@/assets/constants.js";
import { mapState } from "vuex";

export default {
  name: "CategoriesDropdown",
  props: {
    hideText: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      filterAll: filterAll,
    };
  },
  computed: {
    categoriesDropdownValue() {
      const categoriesDropdownValue = this.$store.state.categoriesDropdownValue;
      return categoriesDropdownValue ? categoriesDropdownValue : filterAll;
    },
  },
  methods: {
    onChange(e) {
      const category = e.target.value;

      this.$store.commit("saveFilteredProducts", category);
      this.$store.commit("saveCategoriesDropdownSelect", category);
      this.$store.commit("saveOrderingDropdownValue");
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/sassVars.scss";

.wrapper {
  margin-top: $navbar-margin-bottom;
}
.label {
  display: block;
}
</style>

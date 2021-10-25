<template>
  <div class="wrapper">
    <label for="products" class="label">Подреди по: </label>
    <select
      @change="onChange($event)"
      :value="orderingDropdownValue"
      name="products"
      id="products"
    >
      <option value=""></option>
      <option
        v-for="option in options"
        :key="option.label"
        :value="option.label"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
import _ from "lodash";
import { mapState } from "vuex";

export default {
  name: "OrderingDropdown",
  computed: {
    ...mapState({
      filteredProducts: (state) => state.filteredProducts,
      orderingDropdownValue: (state) => state.orderingDropdownValue,
    }),
  },
  data() {
    return {
      options: [
        {
          label: "Цена - от ниска към висока",
          method: "byPriceAscending",
        },
        {
          label: "Цена - от висока към ниска",
          method: "byPriceDecending",
        },
        {
          label: "Име - от A към Z",
          method: "byNameAscending",
        },
        {
          label: "Име - от Z към A",
          method: "byNameDecending",
        },
      ],
    };
  },
  methods: {
    onChange(e) {
      const value = e.target.value;
      this.$store.commit("saveOrderingDropdownValue", value);

      if (value === "") return;

      const optionMethod = this.options.find(
        (option) => option.label === value
      ).method;

      const filteredProductsClone = _.cloneDeep(this.filteredProducts);
      let orderedProducts = [];
      if (optionMethod === "byPriceAscending") {
        orderedProducts = Object.values(filteredProductsClone).map((products) =>
          products.sort((a, b) => a.price - b.price)
        );
      }
      if (optionMethod === "byPriceDecending") {
        orderedProducts = Object.values(filteredProductsClone).map((products) =>
          products.sort((a, b) => b.price - a.price)
        );
      }
      if (optionMethod === "byNameAscending") {
        orderedProducts = Object.values(filteredProductsClone).map((products) =>
          products.sort((a, b) => a.brandName.localeCompare(b.brandName))
        );
      }
      if (optionMethod === "byNameDecending") {
        orderedProducts = Object.values(filteredProductsClone).map((products) =>
          products.sort((a, b) => b.brandName.localeCompare(a.brandName))
        );
      }

      Object.values(filteredProductsClone).forEach((products, index) => {
        products = orderedProducts[index];
      });
      this.$store.commit("saveOrderedFilteredProducts", filteredProductsClone);
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

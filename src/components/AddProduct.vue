<template>
  <div class="wrapper">
    <h3>Добавяне на продукт</h3>
    <label for="category">Категория</label>
    <Dropdown :hideText="true" id="category" />
    <label for="brandName">Име</label>
    <input v-model="brandName" id="brandName" type="text" autofocus />
    <label for="price">Цена</label>
    <input v-model="price" id="price" type="text" />
    <label for="imageUrl">Снимка</label>
    <!-- TODO: multer -->
    <!-- <input type="file" name="imageUrl" id="imageUrl" /> -->
    <input v-model="imageUrl" id="imageUrl" type="text" />
    <button @click.prevent="submit" class="btn">Създай</button>
    <button @click="goBack" class="btn">Назад</button>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_API_URL } from "@/utils/helper.js";
import Dropdown from "@/components/Dropdown.vue";
import { mapState } from "vuex";
import { filterAll } from "@/assets/constants.js";

export default {
  name: "AddProduct",
  components: {
    Dropdown,
  },
  computed: {
    ...mapState({
      adminStep: (state) => state.adminStep,
      dropdownValue: (state) => state.dropdownValue,
    }),
  },
  data() {
    return {
      filterAll: filterAll,
      category: "",
      brandName: "",
      price: "",
      imageUrl: "",
    };
  },
  methods: {
    goBack() {
      this.$store.commit("adminStepChange", this.adminStep - 2);
    },
    submit(e) {
      if (
        this.dropdownValue === this.filterAll ||
        !this.dropdownValue ||
        !this.brandName ||
        !this.price ||
        !this.imageUrl
      ) {
        alert("Има не попълнени полета!");
        return;
      }

      const price = Number(this.price);
      if (price === 0 || isNaN(price)) {
        alert("Цената на продукта не е число!");
        return;
      }

      const params = {
        params: {
          category: this.dropdownValue,
          brandName: this.brandName,
          imageUrl: this.imageUrl,
          price: price,
        },
      };

      axios
        .post(`${BASE_API_URL}products`, params)
        .then(({ data }) => {
          this.$store.commit("saveDropdownSelect", this.filterAll);
          this.category = "";
          this.brandName = "";
          this.imageUrl = "";
          this.price = "";
          this.$store.commit("saveAllProducts", data);
          alert("Продуктът беше добавен");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  #category {
    margin: 5px 0 10px 0;
  }
  #brandName,
  #price {
    margin-bottom: 10px;
  }
  .btn {
    margin-top: 50px;
  }
}
</style>

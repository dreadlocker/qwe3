<template>
  <div v-if="categoriesOfAvailableProduct !== null">
    <h3>В момента има уреди със следните категории:</h3>
    <span v-for="(item, index) in categoriesOfAvailableProduct" :key="index">
      {{ `${item} | ` }}
    </span>
    <h3>Проверете дали вашият тип уред го има в падащото меню с категории</h3>
    <CategoriesDropdown :hideText="true" />
    <div class="btns-holder">
      <div>
        <button @click="changeStep(3)" class="btn">Няма го</button>
        <button @click="changeStep(4)">Има го</button>
      </div>
      <button @click="deleteAllCategories" class="btn-delete">
        ИЗТРИВАНЕ НА ВСИЧКИ КАТЕГОРИИ
      </button>
    </div>
    <button @click="changeStep(0, true)" class="btn-edit">
      Промяна на вече съществуващи продукти
    </button>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_API_URL } from "@/utils/helper.js";
import CategoriesDropdown from "@/components/CategoriesDropdown.vue";
import { mapState } from "vuex";

export default {
  name: "CategoriesEdit",
  components: {
    CategoriesDropdown,
  },
  data() {
    return {
      categoriesOfAvailableProduct: null,
    };
  },
  methods: {
    changeStep(step, setAuth) {
      this.$store.commit("adminStepChange", step);
    },
    deleteAllCategories() {
      const condition = confirm(
        "Сигурни ли сте, че искате да изтриете всички категории?"
      );

      if (condition) {
        this.$store.commit("showLoaderChange", true);
        axios
          .delete(`${BASE_API_URL}categories`)
          .then(({ data }) => {
            this.$store.commit("saveCategories", data);
            this.$store.commit("showLoaderChange", false);
            alert("Всички категории бяха изтрити!");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    getCategoriesOfAllProducts() {
      axios
        .get(`${BASE_API_URL}products`)
        .then(({ data }) => {
          this.categoriesOfAvailableProduct = Array.from(
            new Set(data.products.map((item) => item.category))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getCategoriesOfAllProducts();
  },
};
</script>

<style scoped lang="scss">
.btns-holder {
  margin-top: 10px;
  .btn {
    margin-right: 10px;
  }
  .btn-delete {
    background-color: red;
    color: white;
    padding: 10px;
    margin-top: 50px;
  }
}
.btn-edit {
  background-color: blue;
  color: white;
  padding: 10px;
  margin-top: 50px;
}
</style>

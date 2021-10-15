<template>
  <div id="app">
    <Navbar v-if="!showLoader && !isAuth && !this.adminStep" />
    <Loader v-if="showLoader" />
    <router-view v-else />
  </div>
</template>

<script>
import axios from "axios";
import { BASE_API_URL } from "@/utils/helper.js";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    Navbar,
    Loader,
  },
  computed: {
    ...mapState({
      isAuth: (state) => state.isAuth,
      adminStep: (state) => state.adminStep,
      showLoader: (state) => state.showLoader,
      categories: (state) => state.categories,
    }),
  },
  data() {
    return {
      // url: "https://qwer-3d393-default-rtdb.europe-west1.firebasedatabase.app/.json",
      // postArgs: {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify([{}]),
      // },
    };
  },
  methods: {
    // TODO: kato vzimam vsi4ki prodykti da proverqvam dali nqma nesu6estvyva6ta kategoriq 4e moje da hvurli gre6ka
    getCategories() {
      axios
        .get(`${BASE_API_URL}categories`)
        .then(({ data }) => {
          // TODO: tova da se sloji sled vsi4ki zaqvki
          const categories = data.data.map((category) => category.name);
          this.$store.commit("saveCategories", categories);
        })
        .catch((err) => {
          console.log(err);
        });

      //   fetch(this.url)
      //     .then((response) => response.json())
      //     .then((response) => {
      //       this.showLoader = false;
      //       response = response.map(category => ({
      //         label: category.label,
      //         products: category.products.filter(product => product),
      //       }))
      //       this.$store.commit("saveCategories", response);
      //       this.$store.commit("saveFilteredProducts");
      //     });
      // },

      // sendData() {
      //   fetch(`${this.url}?auth=${this.token}`, this.postArgs)
      //     .then((response) => response.json())
      //     .then(({ name }) => {
      //       this.showLoader = false;
      //     });
      // },
      // deleteData() {
      //   fetch(`${this.url}?auth=${this.token}`, {
      //     method: "DELETE",
      //   }).then((response) => {
      //     this.showLoader = false;
      //   });
      // },
    },
    getProducts() {
      axios
        .get(`${BASE_API_URL}products`)
        .then(({ data }) => {
          const { products } = data;
          const transformedProducts = {};
          this.categories.forEach((category) => {
            const productsByCategory = products.filter(
              (product) => product.category === category
            );
            transformedProducts[category] = productsByCategory;
          });

          this.$store.commit("saveAllProducts", transformedProducts);
          this.$store.commit("saveFilteredProducts");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  async mounted() {
    await this.getCategories();
    await this.getProducts();
    setTimeout(() => {
      this.$store.commit("showLoaderChange", false);
    }, 0);
  },
};
</script>

<style lang="scss">
@import "@/assets/sassVars.scss";

html {
  width: 100%;
  height: 100%;
}

body {
  width: $body-width;
  height: 100%;
  margin: 0 $body-margin-x 20px $body-margin-x;
  padding: 0;
  display: flex;
  justify-content: center;
}

#app {
  width: 100%;
  // max-width: 1000px;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(365deg);
  }
}
</style>

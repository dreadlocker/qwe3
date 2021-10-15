<template>
  <div>
    <Dropdown v-if="!this.adminStep" />
    <Products v-if="this.adminStep === 0" />
    <Login v-if="this.adminStep === 1" />
    <CategoriesEdit v-if="this.adminStep === 2" />
    <AddCategory v-if="this.adminStep === 3" />
    <AddProduct v-if="this.adminStep === 4" />
    <!-- TODO: da skriq tozi byton nakraq -->
    <div class="footer"></div>
  </div>
</template>

<script>
// TODO: da iztriq nenyjniq kod
import Dropdown from "@/components/Dropdown.vue";
import Products from "@/components/Products.vue";
import Login from "@/components/Login.vue";
import CategoriesEdit from "@/components/CategoriesEdit.vue";
import AddCategory from "@/components/AddCategory.vue";
import AddProduct from "@/components/AddProduct.vue";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    Dropdown,
    Products,
    Login,
    CategoriesEdit,
    AddCategory,
    AddProduct,
  },
  computed: {
    ...mapState({
      adminStep: (state) => state.adminStep,
    }),
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/sassVars.scss";

.cards-holder {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  .card {
    min-width: 250px;
    width: 30%;
    height: 350px;
    box-shadow: 0px 0px 15px grey;
    border-radius: 5px;
    margin-bottom: 10px;
    .img-holder {
      width: 100%;
      height: 80%;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
    .info-1 {
      margin: 0 10px;
      .info-2 {
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
}
.footer {
  width: 100%;
  height: $footer-height;
}

@media (max-width: 587px) {
  .cards-holder {
    justify-content: center;
    .card {
      width: 60%;
    }
  }
}
</style>

<template>
  <div>
    <CategoriesDropdown v-if="isDropdownVisible" />
    <OrderingDropdown v-if="isDropdownVisible" />
    <Products v-if="adminStep === 0" />
    <Login v-if="adminStep === 1" />
    <CategoriesEdit v-if="isAuth && adminStep === 2" />
    <AddCategory v-if="isAuth && adminStep === 3" />
    <AddProduct v-if="isAuth && adminStep === 4" />
    <div class="footer"></div>
  </div>
</template>

<script>
import CategoriesDropdown from "@/components/CategoriesDropdown.vue";
import OrderingDropdown from "@/components/OrderingDropdown.vue";
import Products from "@/components/Products.vue";
import Login from "@/components/Login.vue";
import CategoriesEdit from "@/components/CategoriesEdit.vue";
import AddCategory from "@/components/AddCategory.vue";
import AddProduct from "@/components/AddProduct.vue";
import { mapState, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    CategoriesDropdown,
    OrderingDropdown,
    Products,
    Login,
    CategoriesEdit,
    AddCategory,
    AddProduct,
  },
  computed: {
    ...mapState({
      adminStep: (state) => state.adminStep,
      isAuth: (state) => state.isAuth,
    }),
    ...mapGetters(["hasSomeProducts"]),
    isDropdownVisible() {
      return this.hasSomeProducts && this.adminStep === 0;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/sassVars.scss";

.footer {
  width: 100%;
  height: $footer-height;
}
</style>

<template>
  <div class="wrapper">
    <h3>Добавяне на продукт</h3>
    <label for="brandName">Име</label>
    <input v-model="brandName" id="brandName" type="text" autofocus />
    <label for="price">Цена</label>
    <input v-model="price" id="price" type="text" />
    <label for="image">Снимка</label>
    <!-- <input
      ref="file"
      @change="previewFiles"
      type="file"
      name="image"
      id="image"
    /> -->
    <input v-model="imageUrl" id="image" type="text" name="image" />
    <label for="category" class="category-label">Категория</label>
    <Dropdown :hideText="true" id="category" />
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
import { configUrlEncoded } from "@/utils/helper.js";

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
      // category: "",
      category: "Хладилници",
      // brandName: "",
      brandName: "a",
      // price: "",
      price: 1,
      // image: "",
      imageUrl: "imageUrl.imageUrl",
    };
  },
  methods: {
    goBack() {
      this.$store.commit("adminStepChange", this.adminStep - 2);
    },
    async submit(e) {
      if (
        this.dropdownValue === this.filterAll ||
        !this.dropdownValue ||
        !this.brandName ||
        !this.price ||
        !this.imageUrl
        // !this.image
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
          price: price,
          imageUrl: this.imageUrl,
        },
      };

      // const [firstResponse, secondResponse] = await Promise.all([
      //   axios.post(`${BASE_API_URL}products`, params.params, configUrlEncoded),
      //   axios.post(`${BASE_API_URL}products`, this.image, configFormData),
      // ]);

      axios
        .post(`${BASE_API_URL}products`, params.params, configUrlEncoded)
        .then(({ data }) => {
          this.category = "";
          this.brandName = "";
          this.imageUrl = "";
          this.price = "";
          // this.image = "";
          // this.$refs.file.value = "";
          // this.$store.commit("saveAllProducts", secondResponse.data);
          this.$store.commit("saveDropdownSelect", this.filterAll);
          this.$store.commit("saveAllProducts", data);
          alert("Продуктът беше добавен");
        })
        .catch((err) => {
          console.log("Some error!");
          throw new Error(err);
        });
    },
    // previewFiles(event) {
    //   const file = event.target.files[0];
    //   if (file.size > 5000000) {
    //     alert("Изберете по-малък файл от 5MB!");
    //     return;
    //   }

    //   const formData = new FormData();
    //   formData.append("image", file);
    //   this.image = formData;
    // },
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

  .category-label {
    margin-top: 15px;
  }
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

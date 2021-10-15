<template>
  <div>
    <button @click="goBack" v-if="isAuth" class="back-btn">Назад</button>
    <div v-for="category in Object.keys(filteredProducts)" :key="category">
      <div v-if="filteredProducts[category].length > 0">
        <hr />
        <h1>{{ category }}</h1>
        <hr />
        <div class="cards-holder">
          <div
            v-for="product in filteredProducts[category]"
            :key="product.id"
            class="card"
          >
            <div class="img-holder">
              <div
                :style="{ backgroundImage: `url(${product.imageUrl})` }"
                class="img"
              ></div>
            </div>
            <div class="content-holder">
              <div v-if="isAuth" class="row-holder">
                <div class="text-holder">Марка:</div>
                <!-- TODO: kato editva6 1 prodykt se editvat vsi4ki -->
                <input v-model="brandName" class="inp-edit" type="text" />
              </div>
              <div v-else>
                <span>Марка: </span>
                <span class="info-2">{{ product.brandName }}</span>
              </div>
              <div v-if="isAuth" class="row-holder">
                <div class="text-holder">Цена:</div>
                <input v-model="price" class="inp-edit" type="number" />
              </div>
              <div v-else>
                <span class="text-holder">Цена: </span>
                <span class="info-2">{{ product.price }}</span>
                <span v-if="!isAuth"> лв.</span>
              </div>
              <div v-if="isAuth" class="row-holder new-image">
                <div class="text-holder">Снимка:</div>
                <input v-model="imageUrl" class="inp-edit" type="text" />
                <!-- <input class="inp-edit" type="file" name="file" id="file" /> -->
              </div>
              <div class="btns-holder">
                <button
                  @click="deleteProduct(product._id, product.category)"
                  v-if="isAuth"
                  class="delete-btn"
                >
                  Изтрий
                </button>
                <button @click="editProduct(product._id)" v-if="isAuth">
                  Запази
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 v-else>Няма налични продукти</h1>
    </div>
    <div v-if="!isAuth" class="ghost-holder">
      <div @click="showLoginPage" class="ghost"></div>
    </div>
  </div>
</template>

<script>
// TODO: da iztriq nenyjniq kod
import { mapState } from "vuex";
import axios from "axios";
import { BASE_API_URL } from "@/utils/helper.js";

export default {
  name: "Products",
  computed: {
    ...mapState({
      filteredProducts: (state) => state.filteredProducts,
      categories: (state) => state.categories,
      adminStep: (state) => state.adminStep,
      isAuth: (state) => state.isAuth,
      allProducts: (state) => state.allProducts,
    }),
  },
  data() {
    return {
      brandName: "",
      price: "",
      imageUrl: "",
    };
  },
  methods: {
    showLoginPage() {
      this.$store.commit("adminStepChange", this.adminStep + 1);
    },
    deleteProduct(productId, category) {
      const condition = confirm(
        "Сигурни ли сте, че искате да изтриете този продукт?"
      );

      if (condition) {
        axios
          .delete(`${BASE_API_URL}products/${productId}`)
          .then(() => {
            const filteredProductsOnCategory = this.allProducts[
              category
            ].filter((product) => product._id !== productId);
            this.allProducts[category] = filteredProductsOnCategory;
            this.$store.commit("saveAllProducts", this.allProducts);

            alert("Продуктът беше изтрит!");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    editProduct(productId) {
      const params = {
        params: {
          brandName: this.brandName,
          price: Number(this.price),
          imageUrl: this.imageUrl,
        },
      };

      axios
        .put(`${BASE_API_URL}products/${productId}`, params)
        .then(() => {
          this.brandName = "";
          this.price = "";
          this.imageUrl = "";
          alert("Продуктът беше обновен.");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goBack() {
      this.$store.commit("adminStepChange", 2);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/sassVars.scss";

$img-holder-height: 80%;
$text-holder-width: 65px;
$row-holder-width: 95%;

.back-btn {
  color: white;
  background-color: blue;
  padding: 10px;
  margin: 10px 0;
}
.cards-holder {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  .card {
    min-width: 250px;
    width: 30%;
    height: 430px;
    box-shadow: 0px 0px 15px grey;
    border-radius: 5px;
    margin-bottom: 10px;
    .img-holder {
      width: 100%;
      height: $img-holder-height;
      display: flex;
      justify-content: center;
      .img {
        width: $row-holder-width;
        height: 100%;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
      }
    }
    .info-2 {
      font-size: 20px;
      font-weight: bold;
    }
    .new-image {
      display: flex;
      align-items: center;
    }
    .content-holder {
      width: 100%;
      height: calc(100% - #{$img-holder-height});
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .row-holder {
        width: $row-holder-width;
        text-align: left;
        display: flex;
        .text-holder {
          width: $text-holder-width;
          display: inline;
        }
        .inp-edit {
          width: calc(#{$row-holder-width} - #{$text-holder-width});
          display: inline;
          input {
            width: inherit;
          }
        }
      }
      .btns-holder {
        display: flex;
        margin-top: 5px;
        .delete-btn {
          color: white;
          background-color: red;
          margin-right: 10px;
        }
      }
    }
  }
}
.footer {
  width: 100%;
  height: $footer-height;
}
.ghost-holder {
  display: flex;

  .ghost {
    width: 20px;
    height: 20px;
    // TODO: uncomment
    border: 1px solid red;
    // background-color: transparent;
    // color: transparent;
    // border: transparent;
  }
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

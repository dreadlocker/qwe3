<template>
  <div class="wrapper">
    <label for="username">Потребител</label>
    <input v-model="username" id="username" type="text" autofocus />
    <label for="password">Парола</label>
    <input v-model="password" id="password" type="password" />
    <button @click="checkUser" class="login-btn">Влез</button>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_API_URL } from "@/utils/helper.js";
import { mapState } from "vuex";

export default {
  name: "Login",
  computed: {
    ...mapState({
      adminStep: (state) => state.adminStep,
    }),
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    checkUser() {
      const params = {
        params: {
          username: this.username,
          password: this.password,
        },
      };

      this.$store.commit("showLoaderChange", true);
      axios
        .get(`${BASE_API_URL}users`, params)
        .then(({ data }) => {
          this.$store.commit("onIsAuthChange", true);
          this.$store.commit("adminStepChange", this.adminStep + 1);
          this.$store.commit("showLoaderChange", false);
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
  height: fit-content;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  #username {
    margin-bottom: 10px;
  }
  .login-btn {
    margin-top: 10px;
  }
}
</style>

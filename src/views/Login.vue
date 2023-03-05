<template>
  <form @submit.prevent="submitForm" class="RegF RTL" v-if="$store.state.Lang">
    <h1>تسجيل الدخول</h1>
    <div class="Input">
      <i class="bx bxs-user-circle"></i>
      <label>اسم المستخدم</label>
      <input v-model="username" type="text" placeholder="اسم المستخدم" />
    </div>
    <div class="Input">
      <i class="bx bxs-lock-alt"></i>
      <label>كلمة المرور</label>
      <input v-model="password" type="password" placeholder="كلمة المرور" />
    </div>
    <div class="errors" v-if="errors.length">
      <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
    </div>
    <div class="Input">
      <button>تسجيل الدخول</button>
    </div>
    <div class="ll">
      لا تملك حسابا حتى الآن ؟ قم
      <router-link to="/sgin-up">تسجيل حساب</router-link>
    </div>
  </form>
  <form @submit.prevent="submitForm" class="RegF" v-else>
    <h1>Login</h1>
    <div class="Input">
      <i class="bx bxs-user-circle"></i>
      <label>Username</label>
      <input v-model="username" type="text" placeholder="Username" />
    </div>
    <div class="Input">
      <i class="bx bxs-lock-alt"></i>
      <label>Password</label>
      <input v-model="password" type="password" placeholder="Password" />
    </div>
    <div class="errors" v-if="errors.length">
      <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
    </div>
    <div class="Input">
      <button>Login</button>
    </div>
    <div class="ll">
      don't have an account yet ?
      <router-link to="/sgin-up">register</router-link>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      errors: [],
    };
  },
  mounted() {
    if (this.$store.state.isAuthenticated) {
      this.$router.push("/");
    }

    if (this.$store.state.Lang) {
      document.title = "تسجيل الدخول | HEstore";
    } else {
      document.title = "Login | HEstore";
    }
  },
  methods: {
    async submitForm() {
      this.errors = [];

      if (this.$store.state.Lang) {
        if (this.username === "") {
          this.errors.push("اسم المستخدم مفقود ");
        }

        if (this.password === "") {
          this.errors.push("كلمة المرور مفقودة");
        }
      } else {
        if (this.username === "") {
          this.errors.push("The username is missing ");
        }

        if (this.password === "") {
          this.errors.push("The password is missing ");
        }
      }
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");
      const formData = {
        username: this.username,
        password: this.password,
      };
      await axios
        .post("/api/v1/token/login/", formData)
        .then((response) => {
          const token = response.data.auth_token;
          this.$store.commit("setToken", token);

          axios.defaults.headers.common["Authorization"] = "Token " + token;
          localStorage.setItem("token", token);
          localStorage.setItem("username", this.username);
          const toPath = this.$route.query.to || "/cart";
          this.$router.push(toPath);
        })
        .catch((error) => {
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.push(`${property}: ${error.response.data[property]}`);
            }
          } else {
            if (this.$store.state.Lang) {
              this.errors.push("هناك خطأ ما. حاول مرة اخرى");
            } else {
              this.errors.push("Something went wrong. please try again");
            }
            console.log(JSON.stringify(error));
          }
        });
    },
  },
};
</script>

<style lang="scss">
.RTL {
  input {
    padding-left: 0;
    padding-right: 25px;
  }
}
.RegF {
  width: 350px;
  box-shadow: 0 0 2px 2px #33333338;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 25px;
  padding: 20px 0;

  h1 {
    font-size: 25px;
  }
  .Input {
    width: 95%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    position: relative;

    input {
      width: 100%;
      height: 35px;
      border: none;
      padding-left: 25px;
      border-bottom: 2px solid #333;
    }

    i {
      position: absolute;
      top: 55%;
    }

    button {
      width: 100%;
      height: 35px;
      border-radius: 10px;
      border: none;
      background: #333;
      color: #fff;
      transition: 0.4s;
      cursor: pointer;

      &:hover {
        background: #1f65f0;
      }
    }
  }
  .ll {
    text-transform: capitalize;
  }
}
.errors {
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  p {
    background: #e6020281;
    width: 325px;
    padding: 0 5px;
    border-radius: 10px;
    display: grid;
    place-items: center;
    text-transform: capitalize;
  }
}
</style>

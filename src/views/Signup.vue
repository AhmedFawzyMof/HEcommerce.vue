<template>
  <form @submit.prevent="submitForm" class="RegF RTL" v-if="$store.state.Lang">
    <h1>تسجيل حساب</h1>
    <div class="Input">
      <i class="bx bxs-user-circle"></i>
      <label>اسم المستخدم</label>
      <input v-model="username" type="text" placeholder="اسم المستخدم" />
    </div>
    <div class="Input">
      <i class="bx bxs-envelope"></i>
      <label>بريد إلكتروني</label>
      <input v-model="email" type="email" placeholder="بريد إلكتروني" />
    </div>
    <div class="Input">
      <i class="bx bxs-lock-alt"></i>
      <label>كلمة المرور</label>
      <input v-model="password" type="password" placeholder="كلمة المرور" />
    </div>
    <div class="Input">
      <i class="bx bxs-lock-alt"></i>
      <label>تأكيد كلمة المرور</label>
      <input
        v-model="password2"
        type="password"
        placeholder="تأكيد كلمة المرور"
      />
    </div>
    <div class="errors" v-if="errors.length">
      <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
    </div>
    <div class="Input">
      <button>تسجيل</button>
    </div>
    <div class="ll">
      لديك حساب ؟ قم<router-link to="/log-in"> بتسجيل الدخول </router-link>
    </div>
  </form>
  <form @submit.prevent="submitForm" class="RegF" v-else>
    <h1>Register</h1>
    <div class="Input">
      <i class="bx bxs-user-circle"></i>
      <label>Username</label>
      <input v-model="username" type="text" placeholder="Username" />
    </div>
    <div class="Input">
      <i class="bx bxs-envelope"></i>
      <label>E-mail</label>
      <input v-model="email" type="email" placeholder="E-mail" />
    </div>
    <div class="Input">
      <i class="bx bxs-lock-alt"></i>
      <label>Password</label>
      <input v-model="password" type="password" placeholder="Password" />
    </div>
    <div class="Input">
      <i class="bx bxs-lock-alt"></i>
      <label>Confirm Password</label>
      <input v-model="password2" type="password" placeholder="Password" />
    </div>
    <div class="errors" v-if="errors.length">
      <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
    </div>
    <div class="Input">
      <button>Register</button>
    </div>
    <div class="ll">
      have an account ? <router-link to="/log-in">Login</router-link>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "Signup",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      password2: "",
      errors: [],
    };
  },
  mounted() {
    if (this.$store.state.isAuthenticated) {
      this.$router.push("/");
    }

    if (this.$store.state.Lang) {
      document.title = "تسجيل حساب | HEstore";
    } else {
      document.title = "Register | HEstore";
    }
  },
  methods: {
    submitForm() {
      this.errors = [];
      if (this.$store.state.Lang) {
        if (this.username === "") {
          this.errors.push("اسم المستخدم مفقود ");
        }
        if (this.email === "") {
          this.errors.push("البريد الإلكتروني مفقود");
        }
        if (this.password === "") {
          this.errors.push("كلمة المرور مفقودة");
        }
        if (this.password !== this.password2) {
          this.errors.push("كلمات المرور غير متطابقة");
        }
      } else {
        if (this.username === "") {
          this.errors.push("The username is missing ");
        }
        if (this.email === "") {
          this.errors.push("The email is missing ");
        }
        if (this.password === "") {
          this.errors.push("The password is missing ");
        }
        if (this.password !== this.password2) {
          this.errors.push("The passwords doesn't match");
        }
      }
      const formData = {
        username: this.username,
        password: this.password,
        email: this.email,
      };
      axios
        .post("api/v1/users/", formData)
        .then((response) => {
          this.$router.push("/log-in");
        })
        .catch((error) => {
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.push(`${property}: ${error.response.data[property]}`);
            }
          } else if (error.message) {
            if (this.$store.state.Lang) {
              this.errors.push("هناك خطأ ما. حاول مرة اخرى");
            } else {
              this.errors.push("Something went wrong. please try again");
            }
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
</style>

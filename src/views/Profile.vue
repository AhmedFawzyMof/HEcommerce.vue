<template>
  <div class="containerU">
    <form
      @submit.prevent="UsernameForm"
      class="RegF RTL"
      v-if="$store.state.Lang"
    >
      <h1>غير اسم المستخدم</h1>
      <div class="Input">
        <i class="bx bxs-user-circle"></i>
        <label>اسم مستخدم جديد</label>
        <input
          v-model="new_username"
          type="text"
          placeholder="اسم مستخدم جديد"
        />
      </div>
      <div class="Input">
        <i class="bx bxs-lock-alt"></i>
        <label>كلمة المرور الحالية</label>
        <input
          v-model="current_password"
          type="password"
          placeholder="كلمة المرور الحالية"
        />
      </div>
      <div class="errors" v-if="errors.length">
        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
      </div>
      <div class="Input">
        <button>غير اسم المستخدم</button>
      </div>
      <router-link to="/User/Profile/password">تعديل كلمة السر</router-link>
    </form>
    <form @submit.prevent="UsernameForm" class="RegF" v-else>
      <h1>Change Username</h1>
      <div class="Input">
        <i class="bx bxs-user-circle"></i>
        <label>New Username</label>
        <input v-model="new_username" type="text" placeholder="New Username" />
      </div>
      <div class="Input">
        <i class="bx bxs-lock-alt"></i>
        <label>Currunt Password</label>
        <input
          v-model="current_password"
          type="password"
          placeholder="Currunt Password"
        />
      </div>
      <div class="errors" v-if="errors.length">
        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
      </div>
      <div class="Input">
        <button>Change Username</button>
      </div>
      <router-link to="/User/Profile/password">Edit Password</router-link>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Profile",
  data() {
    return {
      new_username: "",
      current_password: "",
      errors: [],
    };
  },
  mounted() {
    if (this.$store.state.Lang) {
      document.title = "تعديل الملف الشخصي | HEstore";
    } else {
      document.title = "Edit Profile | HEstore";
    }
  },
  methods: {
    async UsernameForm() {
      const formData = {
        new_username: this.new_username,
        current_password: this.current_password,
      };
      await axios
        .post("/api/v1/users/set_username/", formData)
        .then(() => {
          localStorage.setItem("username", this.new_username);
          const toPath = this.$route.query.to || "/cart";
          this.$router.push(toPath);
        })

        .catch((error) => {
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.push(`${property}: ${error.response.data[property]}`);
            }
          } else {
            this.errors.push("Something went wrong. Please try again");

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
    padding-right: 25px;
    padding-left: 0px;
  }
}
.containerU {
  margin: 20px 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 50px;
}

@media (max-width: 550px) {
  .containerU {
    margin: 50px 0;
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

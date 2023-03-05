<template>
  <div class="containerU">
    <form
      @submit.prevent="PasswordForm"
      class="RegF RTL"
      v-if="$store.state.Lang"
    >
      <h1>تغيير كلمة المرور</h1>
      <div class="Input">
        <i class="bx bxs-lock-alt"></i>
        <label>كلمة المرور الجديدة</label>
        <input
          v-model="new_password"
          type="password"
          placeholder="كلمة المرور الجديدة"
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
        <button>تغيير كلمة المرور</button>
      </div>
      <router-link to="/User/Profile">تحرير اسم المستخدم</router-link>
    </form>
    <form @submit.prevent="PasswordForm" class="RegF" v-else>
      <h1>Change Password</h1>
      <div class="Input">
        <i class="bx bxs-lock-alt"></i>
        <label>New Password</label>
        <input
          v-model="new_password"
          type="password"
          placeholder="New Password"
        />
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
        <button>Change Password</button>
      </div>
      <router-link to="/User/Profile">Edit Username</router-link>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Password",
  data() {
    return {
      current_password: "",
      new_password: "",
      errors: [],
    };
  },
  mounted() {
    if (this.$store.state.Lang) {
      document.title = "تعديل كلمة السر | HEstore";
    } else {
      document.title = "Edit Password | HEstore";
    }
  },
  methods: {
    async PasswordForm() {
      const formData = {
        new_password: this.new_password,
        current_password: this.current_password,
      };
      await axios
        .post("/api/v1/users/set_password/", formData)
        .then(() => {
          axios.defaults.headers.common["Authorization"] = "";
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.removeItem("userid");
          this.$store.commit("removeToken");
          this.$router.push("/");
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

<template>
  <div class="Contact" v-if="$store.state.isAuthenticated">
    <form @submit.prevent="ContactForm" class="RTL" v-if="$store.state.Lang">
      <h1 class="title">اتصل بنا</h1>
      <div class="CInput">
        <label>رقم الهاتف</label>
        <input type="number" v-model="phone" />
      </div>
      <div class="CInput">
        <label>رسالة</label>
        <textarea v-model="message" cols="30" rows="10"></textarea>
      </div>
      <div class="errors" v-if="errors.length">
        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
      </div>
      <div class="CInput">
        <button>اتصل بنا</button>
      </div>
    </form>
    <form @submit.prevent="ContactForm" v-else>
      <h1 class="title">Contact Us</h1>
      <div class="CInput">
        <label>Phone</label>
        <input type="number" v-model="phone" />
      </div>
      <div class="CInput">
        <label>Message</label>
        <textarea v-model="message" cols="30" rows="10"></textarea>
      </div>
      <div class="errors" v-if="errors.length">
        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
      </div>
      <div class="CInput">
        <button>Contact Us</button>
      </div>
    </form>
  </div>
  <div class="NotLog" v-else>
    please <router-link to="/log-in">Login </router-link>to make feedback
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Contact",
  data() {
    return {
      phone: "",
      message: "",
      errors: [],
    };
  },
  mounted() {
    if (this.$store.state.Lang) {
      document.title = "اتصل بنا | HEstore";
    } else {
      document.title = "Contact Us | HEstore";
    }
  },
  methods: {
    ContactForm() {
      this.errors = [];

      if (this.phone === "") {
        this.errors.push("The phone number is missing ");
      }
      if (this.message === "") {
        this.errors.push("The message is missing ");
      }

      const Data = {
        phone: this.phone,
        message: this.message,
      };

      axios.post(`/api/v1/contact/`, Data).then((response) => {
        this.$router.push("/contact/S");
      });
    },
  },
};
</script>
<style lang="scss">
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
.NotLog {
  text-transform: capitalize;
}

.Contact {
  width: 100%;
  min-height: 100vh;
  display: grid;
  place-items: center;

  form {
    width: 400px;
    box-shadow: -2px 2px 3px 4px #3333334a;
    padding: 20px 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 25px;

    .CInput {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      width: 95%;

      input {
        width: 100%;
        height: 35px;
        padding: 0 5px;
        border-radius: 5px;
        border: 2px solid #3f62ffcf;
      }

      textarea {
        padding: 0 5px;
        width: 100%;
        border-radius: 10px;
        border: 2px solid #3f62ffcf;
      }

      button {
        width: 100%;
        height: 40px;
        border-radius: 50px;
        background: #333;
        color: #fff;
        border: none;
        transition: 0.5s;
        cursor: pointer;

        &:hover {
          box-shadow: inset 350px 0 0 #3f62ffcf;
        }
      }
    }
  }
}

@media (max-width: 450px) {
  .Contact {
    form {
      width: 95%;
    }
  }
}
</style>

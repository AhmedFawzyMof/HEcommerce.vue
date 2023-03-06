<template>
  <template v-if="$store.state.Lang" id="ar">
    <nav class="ArNav">
      <div class="Logo">
        <router-link to="/">HEstore</router-link>
      </div>
      <div class="search">
        <form method="get" action="/search" class="li">
          <input type="search" name="query" placeholder="البحث سريع" />
          <button><i class="bx bx-search-alt-2"></i></button>
        </form>
      </div>
      <div class="User">
        <button
          class="avatar"
          v-if="$store.state.isAuthenticated"
          @click="(UserMenu = !UserMenu), (showMobileMenu = false)"
          :class="{ 'is-active': UserMenu }"
        >
          {{ Uname.substring(2, []) }}
        </button>
        <div
          class="UserMenu"
          :class="{ 'is-active': UserMenu }"
          v-if="$store.state.isAuthenticated"
        >
          <span> {{ Uname.substring(2, []) }} </span>
          <h1 class="subtitle">{{ Uname }}</h1>
          <router-link to="/User/order-history">تاريخ الطلبات</router-link>
          <router-link to="/User/Profile">تعديل الملف الشخصي</router-link>
          <button class="logout" @click="logout()">تسجيل خروج</button>
        </div>
        <router-link to="/log-in" class="LoginAr" v-else
          >تسجيل الدخول</router-link
        >
      </div>
    </nav>
    <div class="subnav" id="ArSubnav">
      <router-link to="/all-products">جميع المنتجات</router-link>
      <button class="lang" @click="removelang()">
        <img src="/eng.png" /> En
      </button>

      <router-link to="/cart" class="cart">
        <span class="Cartcount" v-if="cartTotalLength">
          <p>{{ cartTotalLength }}</p>
        </span>
        <i class="bx bxs-cart-alt"></i>
      </router-link>
      <button
        class="menuBtn"
        @click="(showMobileMenu = !showMobileMenu), (UserMenu = false)"
        :class="{ 'is-active': showMobileMenu }"
      >
        <i class="bx bx-menu"></i>
        <i class="bx bx-x"></i>
      </button>
      <div class="Menu" :class="{ 'is-active': showMobileMenu }">
        <div class="CateBtn">
          <div class="Cate" v-for="category in categoris" :key="category.id">
            <router-link :to="category.get_absolute_url">
              {{ category.nameAr }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-else id="en">
    <nav>
      <div class="Logo">
        <router-link to="/">HEstore</router-link>
      </div>
      <div class="search">
        <form method="get" action="/search" class="li">
          <input type="search" name="query" placeholder="Quick Search" />
          <button><i class="bx bx-search-alt-2"></i></button>
        </form>
      </div>
      <div class="User">
        <button
          class="avatar"
          v-if="$store.state.isAuthenticated"
          @click="(UserMenu = !UserMenu), (showMobileMenu = false)"
          :class="{ 'is-active': UserMenu }"
        >
          {{ Uname.substring(2, []) }}
        </button>
        <div
          class="UserMenu"
          :class="{ 'is-active': UserMenu }"
          v-if="$store.state.isAuthenticated"
        >
          <span> {{ Uname.substring(2, []) }} </span>
          <h1 class="subtitle">{{ Uname }}</h1>
          <router-link to="/User/order-history">Order History</router-link>
          <router-link to="/User/Profile">Edit Profile</router-link>
          <button class="logout" @click="logout()">Logout</button>
        </div>
        <router-link to="/log-in" v-else>Login</router-link>
      </div>
    </nav>
    <div class="subnav">
      <router-link to="/all-products">all products</router-link>
      <button class="lang" @click="lang()">
        <img src="/ar.png" alt="Ar" /> Ar
      </button>

      <router-link to="/cart" class="cart">
        <span class="Cartcount" v-if="cartTotalLength">
          <p>{{ cartTotalLength }}</p>
        </span>
        <i class="bx bxs-cart-alt"></i>
      </router-link>
      <button
        class="menuBtn"
        @click="(showMobileMenu = !showMobileMenu), (UserMenu = false)"
        :class="{ 'is-active': showMobileMenu }"
      >
        <i class="bx bx-menu"></i>
        <i class="bx bx-x"></i>
      </button>
      <div class="Menu" :class="{ 'is-active': showMobileMenu }">
        <div class="CateBtn">
          <div class="Cate" v-for="category in categoris" :key="category.id">
            <router-link :to="category.get_absolute_url">
              {{ category.name }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  <div
    class="is-loading-bar has-text-centered"
    v-bind:class="{ 'is-loading': $store.state.isLoading }"
  >
    <div class="lds-dual-ring"></div>
  </div>
  <div class="Bcontainer" @click="(showMobileMenu = false), (UserMenu = false)">
    <router-view />
  </div>

  <footer class="footer RTL" v-if="$store.state.Lang">
    <div class="container">
      <div class="row">
        <div class="footer-col">
          <h4>احصل على مساعدة</h4>
          <ul>
            <li><router-link to="/faq">الأسئلة الشائعة</router-link></li>
            <li v-if="$store.state.isAuthenticated">
              <router-link to="/User/Profile">الملف الشخصي</router-link>
            </li>
            <li><router-link to="/contact">اتصل بنا</router-link></li>
            <li>
              <router-link to="/about-us">عنا</router-link>
            </li>
            <li v-if="$store.state.isAuthenticated">
              <router-link to="/User/order-history">>تاريخ الطلبات</router-link>
            </li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>متجر الكتروني</h4>
          <ul>
            <li v-for="category in categorisv2" :key="category.id">
              <router-link :to="category.get_absolute_url">{{
                category.nameAr
              }}</router-link>
            </li>
            <li>
              <router-link to="/all-products">جميع المنتجات</router-link>
            </li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>بحث</h4>
          <form method="get" action="/search" class="li">
            <input type="search" name="query" placeholder="البحث سريع" />
            <button><i class="bx bx-search-alt-2"></i></button>
          </form>
        </div>
        <div class="footer-col">
          <h4>تابعنا</h4>
          <div class="social-links">
            <a href="#"><i class="bx bxl-facebook"></i></a>
            <a href="#"><i class="bx bxl-twitter"></i></a>
            <a href="#"><i class="bx bxl-instagram-alt"></i></a>
            <a href="#"><i class="bx bxl-linkedin-square"></i></a>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <footer class="footer" v-else>
    <div class="container">
      <div class="row">
        <div class="footer-col">
          <h4>get help</h4>
          <ul>
            <li><router-link to="/faq">FAQ</router-link></li>
            <li v-if="$store.state.isAuthenticated">
              <router-link to="/User/Profile">profile</router-link>
            </li>
            <li><router-link to="/contact">contact us</router-link></li>
            <li>
              <router-link to="/about-us">about us</router-link>
            </li>
            <li v-if="$store.state.isAuthenticated">
              <router-link to="/User/order-history">order history</router-link>
            </li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>online shop</h4>
          <ul>
            <li v-for="category in categorisv2" :key="category.id">
              <router-link :to="category.get_absolute_url">{{
                category.name
              }}</router-link>
            </li>
            <li>
              <router-link to="/all-products">AllProducts</router-link>
            </li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>search</h4>
          <form method="get" action="/search" class="li">
            <input type="search" name="query" placeholder="Quick Search" />
            <button><i class="bx bx-search-alt-2"></i></button>
          </form>
        </div>
        <div class="footer-col">
          <h4>follow us</h4>
          <div class="social-links">
            <a href="#"><i class="bx bxl-facebook"></i></a>
            <a href="#"><i class="bx bxl-twitter"></i></a>
            <a href="#"><i class="bx bxl-instagram-alt"></i></a>
            <a href="#"><i class="bx bxl-linkedin-square"></i></a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      showMobileMenu: false,
      UserMenu: false,
      cart: {
        items: [],
      },
      categoris: [],
      categorisv2: [],
      Uname: "",
    };
  },
  beforeCreate() {
    this.$store.commit("initializeStore");

    const token = this.$store.state.token;
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },
  mounted() {
    this.getFooterCategory();
    this.getAllCategory();
    this.cart = this.$store.state.cart;
    if (localStorage.username) {
      this.Uname = localStorage.username;
    }
  },
  watch: {
    UserName(Uname) {
      localStorage.username = Uname;
    },
  },
  methods: {
    removelang() {
      localStorage.removeItem("lang");
      location.reload();
    },
    lang() {
      localStorage.setItem("lang", "ar");
      location.reload();
    },
    async getAllCategory() {
      this.$store.commit("setIsLoading", true);
      await axios.get("/api/v1/allcategoris").then((response) => {
        this.categoris = response.data;
      });
      this.$store.commit("setIsLoading", false);
    },
    async getFooterCategory() {
      this.$store.commit("setIsLoading", true);
      await axios.get("/api/v1/footercategoris").then((response) => {
        this.categorisv2 = response.data;
      });
      this.$store.commit("setIsLoading", false);
    },
    logout() {
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("userid");
      this.$store.commit("removeToken");
      this.$router.push("/");
    },
  },
  computed: {
    cartTotalLength() {
      let totalLength = 0;

      for (let i = 0; i < this.cart.items.length; i++) {
        totalLength += this.cart.items[i].quantity;
      }

      return totalLength;
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700&display=swap");

* {
  box-sizing: border-box;
  margin: 0%;
  padding: 0%;
  scroll-behavior: smooth;
  font-family: Cairo, Raleway;
}

button {
  font-family: Cairo, Raleway;
}

a {
  font-family: Cairo, Raleway;
}

.Bcontainer {
  padding: 20px 0;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.is-loading-bar {
  height: 0;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  &.is-loading {
    height: 80px;
  }
}
.ArNav {
  direction: rtl;

  .LoginAr {
    font-size: 15px;
  }
  .search {
    form {
      direction: ltr;
    }
  }

  .User {
    .UserMenu {
      right: -650%;
    }
  }
}

#ArSubnav {
  direction: rtl;

  .Menu {
    right: 100% !important;
    transform: translateX(100%);
    border-radius: 0px 10px 10px 0px;
    box-shadow: 2px 2px 2px 2px #3333334a;
  }
}

.RTL {
  .search {
    input {
      direction: ltr;
    }
  }
}
.search {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;

  form {
    width: 80%;
    height: 100%;
    display: grid;
    place-items: center;
    position: relative;

    input {
      width: 100%;
      height: 35px;
      border: 2px solid #1d6af8;
      border-radius: 10px;
      padding-left: 5px;
    }

    button {
      position: absolute;
      height: 35px;
      background: #1d6af8;
      color: #fff;
      cursor: pointer;
      border: none;
      width: 40px;
      display: grid;
      place-items: center;
      font-size: 25px;
      border-radius: 0 10px 10px 0;
      right: 0;
    }
  }
}
nav {
  padding: 0 10px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  place-items: center;
  font-size: 20px;
  height: 50px;
  box-shadow: 0 0 2px 2px #3333334a;

  .Logo {
    a {
      color: #333;
      transition: 0.3s;

      &:hover {
        color: #4f4f4f;
      }
    }
  }

  .User {
    position: relative;

    .UserMenu {
      position: absolute;
      background: #333;
      top: 100px;
      right: 0;
      display: grid;
      place-items: center;
      border-radius: 10px;
      padding: 15px 0;
      gap: 20px;
      width: 300px;
      transition: 0.4s;
      z-index: -1;
      opacity: 0;

      &.is-active {
        transition: 0.4s;
        z-index: 9;
        opacity: 1;
      }

      span {
        width: 50px;
        height: 50px;
        background: #eee;
        border-radius: 50px;
        display: grid;
        place-items: center;
        text-transform: uppercase;
        font-size: 30px;
        font-weight: 700;
      }
      h1 {
        text-transform: uppercase;
        color: #fff;
      }

      a {
        width: 90%;
        transition: 0.4s;
      }

      .logout {
        height: 40px;
        width: 90%;
        background: none;
        font-size: 20px;
        border-radius: 10px;
        border: none;
        color: #fff;
        cursor: pointer;
        transition: 0.4s;

        &:hover {
          background: #eee;
          color: #333;
        }
      }
    }
    .avatar {
      background: #eee;
      width: 40px;
      height: 40px;
      cursor: pointer;
      font-size: 18px;
      border: none;
      font-weight: 600;
      border-radius: 50px;
      text-transform: uppercase;
      box-shadow: 0 0 2px 2px #3333334a;
      transition: 0.4s;

      &.is-active {
        background: gray;
        color: #fff;
      }
    }
    a {
      background: #333;
      color: #fff;
      padding: 5px 15px;
      border-radius: 10px;
      display: grid;
      place-items: center;
      transition: 0.4s;

      &:hover {
        background: #eee;
        color: #333;
      }
    }
  }
}

.subnav {
  position: relative;
  height: 50px;
  background: #eee;
  display: grid;
  grid-template-columns: auto auto auto auto;
  place-items: center;

  .cart {
    color: #333;
    position: relative;

    i {
      font-size: 35px;
    }
    .Cartcount {
      position: absolute;
      left: 100%;
      transform: translateX(-50%);
      width: 20px;
      height: 20px;
      color: #fff;
      font-weight: 700;
      background: red;
      border-radius: 5px;
      box-shadow: 0 0 2px 2px #3333334a;

      p {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  .lang {
    height: 35px;
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #333;
    gap: 20px;
    padding: 0 7.5px;
    border-radius: 50px;
    border: none;
    cursor: pointer;
    box-shadow: 0 0 2px 2px #3333334a;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .Menu {
    position: absolute;
    padding: 10px 0;
    top: 55px;
    right: 0;
    min-height: 300px;
    width: 300px;
    background: #333;
    transition: 0.4s;
    opacity: 0;
    border-radius: 10px 0 0 10px;
    z-index: -1;
    box-shadow: -2px 2px 2px 2px #3333334a;

    &.is-active {
      transition: 0.4s;
      opacity: 1;
      z-index: 9;
    }
    .CateBtn {
      width: 100%;
      transition: 0.4s;
      min-height: 300px;
      overflow: hidden;
      display: grid;
      place-items: center;
      gap: 20px;

      .Cate {
        width: 80%;
        background: #eee;
        padding: 4px;
        border-radius: 5px;
        display: grid;
        place-items: center;

        a {
          width: 100%;
          display: grid;
          place-items: center;
          font-weight: 600;

          &:hover {
            text-shadow: none;
          }
        }
      }
      button {
        width: 100%;
        height: 30px;
        background: none;
        border: none;
        cursor: pointer;
        color: #fff;
        font-size: 22.5px;
        transition: 0.4s;

        &:hover {
          background: #eee;
          color: #333;
        }
      }
    }
  }

  .menuBtn {
    width: 35px;
    height: 35px;
    border-radius: 50px;
    position: relative;
    border: none;
    overflow: hidden;
    box-shadow: 0 0 2px 2px #3333334a;
    cursor: pointer;
    transition: 0.4s;

    i:first-child {
      font-size: 35px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transform: 0.4s;
    }

    i:last-child {
      font-size: 35px;
      position: absolute;
      top: 50%;
      left: 120%;
      transform: translate(-50%, -50%);
      transform: 0.4s;
    }

    &.is-active {
      transition: 0.4s;

      i:first-child {
        left: -50%;
        transition: 0.4s;
      }
      i:last-child {
        left: 50%;
        transition: 0.4s;
      }
    }
  }

  a {
    text-transform: capitalize;
    color: #333;
    transition: 0.4s;

    &:hover {
      color: #1d6af8;
      text-shadow: 0 0 2px #1d6af8;
    }
  }
}

@media (max-width: 550px) {
  nav {
    .User {
      a {
        padding: 5px 5px;
      }
    }
  }
}
</style>

<style lang="css">
.container {
  width: 100%;
  margin: auto;
}
.row {
  display: flex;
  flex-wrap: wrap;
}
ul {
  list-style: none;
}
.footer {
  background-color: #24262b;
  padding: 70px 0;
}
.footer-col {
  width: 25%;
  padding: 0 15px;
}
.footer-col h4 {
  font-size: 18px;
  color: #ffffff;
  text-transform: capitalize;
  margin-bottom: 35px;
  font-weight: 500;
  position: relative;
}
.footer-col form {
  width: 100%;
  height: 100%;
  position: relative;
}

.footer-col form input {
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: 2px solid #2c6cff;
  padding-left: 5px;
}
.footer-col form button {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  background: #2c6cff;
  border: none;
  color: #ffffff;
  font-size: 30px;
  border-radius: 0 10px 10px 0;
  cursor: pointer;
  display: grid;
  place-items: center;
}
.RTL .footer-col form input {
  direction: ltr;
}
.RTL .footer-col h4::before {
  content: "";
  position: absolute;
  right: 0;
  bottom: -10px;
  background-color: #2c6cff;
  height: 2px;
  box-sizing: border-box;
  width: 50px;
}
.footer-col h4::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: -10px;
  background-color: #2c6cff;
  height: 2px;
  box-sizing: border-box;
  width: 50px;
}
.footer-col ul li:not(:last-child) {
  margin-bottom: 10px;
}
.footer-col ul li a {
  font-size: 16px;
  text-transform: capitalize;
  color: #ffffff;
  text-decoration: none;
  font-weight: 300;
  color: #bbbbbb;
  display: block;
  transition: all 0.3s ease;
}
.footer-col ul li a:hover {
  color: #ffffff;
  padding-left: 8px;
}
.footer-col .social-links a {
  display: inline-block;
  height: 40px;
  width: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 0 10px 10px 0;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  color: #ffffff;
  transition: all 0.5s ease;
}
.footer-col .social-links a:hover {
  color: #24262b;
  background-color: #ffffff;
}

/*responsive*/
@media (max-width: 767px) {
  .footer-col {
    width: 50%;
    margin-bottom: 30px;
  }
}

@media (max-width: 574px) {
  .footer-col {
    width: 100%;
  }
}
</style>

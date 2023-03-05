<template>
  <div class="CContainer">
    <h1 class="title" v-if="$store.state.Lang">عربة التسوق الخاصة بي</h1>
    <h1 class="title" v-else>My Cart</h1>
    <div class="CartContainer" v-if="cartTotalLength">
      <CartItem
        v-for="item in cart.items"
        v-bind:key="item.product.id"
        v-bind:initialItem="item"
        v-on:removeFromCart="removeFromCart"
      />
    </div>

    <div class="CC" v-else>
      <h2 v-if="$store.state.Lang">
        العربة فارغة اذهب <router-link to="/">الى التسوق</router-link>
      </h2>
      <h2 v-else>
        the cart is empty go <router-link to="/">shopping...</router-link>
      </h2>
    </div>
    <div class="subtotal RTL" v-if="$store.state.Lang">
      <h1>ملخص :</h1>
      <h1>سعر الشحن : {{ shippingPrice.toFixed(2) }} ج.م</h1>
      <h1>الإجمالي : {{ cartTotalPrice }} ج.م</h1>
      <h1>الأغراض الموجودة في عربة : {{ cartTotalLength }}</h1>
      <template v-if="$store.state.isAuthenticated">
        <router-link class="checkoutBtn" to="/check-out" v-if="cartTotalLength">
          الدفع عند الاستلام
        </router-link>
        <router-link class="checkoutBtn" to="/pay-pal" v-if="cartTotalLength">
          paypal
        </router-link>
      </template>
      <template v-else>
        <div class="qq" v-if="cartTotalLength">
          <router-link to="/log-in"> الرجاء تسجيل الدخول للمتابعة</router-link>
        </div>
      </template>
    </div>
    <div class="subtotal" v-else>
      <h1>Summry :</h1>
      <h1>Shipping Price : {{ shippingPrice.toFixed(2) }} ج.م</h1>
      <h1>Total: {{ cartTotalPrice }} ج.م</h1>
      <h1>Items in Cart: {{ cartTotalLength }}</h1>
      <template v-if="$store.state.isAuthenticated">
        <router-link class="checkoutBtn" to="/check-out" v-if="cartTotalLength">
          cash on delivery
        </router-link>
        <router-link class="checkoutBtn" to="/pay-pal" v-if="cartTotalLength">
          paypal
        </router-link>
      </template>
      <template v-else>
        <div class="qq" v-if="cartTotalLength">
          <router-link to="/log-in"> Please Login to Continue</router-link>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import CartItem from "@/components/CartItem.vue";

export default {
  name: "Cart",
  components: {
    CartItem,
  },
  data() {
    return {
      cart: {
        items: [],
      },
    };
  },
  mounted() {
    if (localStorage.getItem("reloaded")) {
      localStorage.removeItem("reloaded");
    } else {
      localStorage.setItem("reloaded", "1");
      location.reload();
    }
    this.cart = this.$store.state.cart;

    if (this.$store.state.Lang) {
      document.title = "عربة التسوق الخاصة بي | HEstore";
    } else {
      document.title = "My Cart | HEstore";
    }
  },
  methods: {
    removeFromCart(item) {
      this.cart.items = this.cart.items.filter(
        (i) => i.product.id !== item.product.id
      );
    },
  },
  computed: {
    cartTotalLength() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.quantity);
      }, 0);
    },
    cartTotalPrice() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.product.price * curVal.quantity);
      }, 0);
    },
    shippingPrice() {
      let shippingPrice = this.cartTotalPrice * 0.1;
      if (this.cartTotalPrice > 600) {
        shippingPrice = 0;
      }
      return shippingPrice;
    },
  },
};
</script>

<style lang="scss">
.qq {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  text-transform: capitalize;
}
.CC {
  text-transform: capitalize;
}

.CContainer {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
}
.CartContainer {
  width: 90%;
  box-shadow: 0 0 3px 3px #3333335a;
  padding: 10px 10px;
  border-radius: 5px;
  display: grid;
  gap: 20px;
}
@media (max-width: 600px) {
  .CartContainer {
    width: 97%;
    .CartItem {
      grid-template-columns: repeat(7, auto);

      img {
        width: 40px;
        height: 40px;
      }
    }
  }
}
.subtotal {
  width: 400px;
  border-radius: 10px;
  box-shadow: 0 0 1px 2px #3333335a;
  color: black;
  padding: 10px 20px;
  display: grid;
  gap: 15px;

  h1:first-child {
    font-size: 25px;
    padding: 10px 0;
  }

  h1 {
    text-transform: capitalize;
  }

  .checkoutBtn {
    height: 30px;
    border: none;
    background: #333;
    color: #fff;
    border-radius: 10px 0 10px 0;
    transition: 0.5s;
    display: grid;
    place-items: center;
    text-transform: capitalize;

    &:hover {
      box-shadow: inset 400px 0 0 #2332ff;
    }
  }
}

@media (max-width: 390px) {
  .subtotal {
    width: 300px;
  }
}

@media (max-width: 450px) {
  .Table {
    width: 95%;
  }

  .subtotal {
    width: 350px;
  }
}
</style>

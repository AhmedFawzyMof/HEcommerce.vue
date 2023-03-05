<template>
  <div class="Container">
    <div class="subtotal RTL" v-if="$store.state.Lang">
      <h1>ملخص :</h1>
      <h1>سعر الشحن : {{ shippingPrice }} ج.م</h1>
      <h1>total: {{ cartTotalPrice }} ج.م</h1>
      <h1>الأغراض الموجودة في عربة : {{ cartTotalLength }}</h1>
      <p>
        الأغراض :
        <router-link
          v-for="item in cart.items"
          v-bind:key="item.product.id"
          to="{{ item.product.get_absolute_url }}"
        >
          ( {{ item.product.nameAr }} , {{ getItemTotal(item) }} ج.م )
        </router-link>
      </p>
    </div>
    <div class="subtotal" v-else>
      <h1>Summary:</h1>
      <h1>shipping price: {{ shippingPrice }} EGP</h1>
      <h1>total: {{ cartTotalPrice }} EGP</h1>
      <h1>items in cart: {{ cartTotalLength }}</h1>
      <p>
        items:
        <router-link
          v-for="item in cart.items"
          v-bind:key="item.product.id"
          to="{{ item.product.get_absolute_url }}"
        >
          ( {{ item.product.name }} , {{ getItemTotal(item) }} EGP )
        </router-link>
      </p>
    </div>
    <div class="RegF RTL" v-if="$store.state.Lang">
      <h1 class="subtitle">عنوان الشحن</h1>

      <p class="alrt">* جميع الحقول مطلوبة</p>
      <div class="placeorder">
        <label>الاسم الأول</label>
        <input type="text" v-model="first_name" />
      </div>
      <div class="placeorder">
        <label>اسم العائلة</label>
        <input type="text" v-model="last_name" />
      </div>
      <div class="placeorder">
        <label>بريد إلكتروني</label>
        <input type="email" v-model="email" />
      </div>
      <div class="placeorder">
        <label>رقم التليفون</label>
        <input type="tel" v-model="phone" />
      </div>
      <div class="placeorder">
        <label>رقم هاتف احتياطي</label>
        <input type="tel" v-model="phone2" />
      </div>
      <div class="placeorder">
        <label>العنوان</label>
        <input type="text" v-model="address" />
      </div>
      <div class="errors">
        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
      </div>
      <div class="placeorder">
        <button @click="FormErrors">تحقق من وجود أخطاء</button>
      </div>
      <div class="placeorder paypal" v-bind:class="{ 'is-active': showPaypal }">
        <div
          id="paypal-button-container"
          v-bind:on-approve="onApprove"
          v-bind:create-order="createOrder"
        ></div>
      </div>
    </div>
    <div class="RegF" v-else>
      <h1 class="subtitle">Shipping Address</h1>

      <p class="alrt">* All Fields Are Required</p>
      <div class="placeorder">
        <label>First Name</label>
        <input type="text" v-model="first_name" />
      </div>
      <div class="placeorder">
        <label>Last Name</label>
        <input type="text" v-model="last_name" />
      </div>
      <div class="placeorder">
        <label>E-Mail</label>
        <input type="email" v-model="email" />
      </div>
      <div class="placeorder">
        <label>Phone Numper</label>
        <input type="tel" v-model="phone" />
      </div>
      <div class="placeorder">
        <label>Spare Phone Number</label>
        <input type="tel" v-model="phone2" />
      </div>
      <div class="placeorder">
        <label>Address</label>
        <input type="text" v-model="address" />
      </div>
      <div class="errors">
        <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
      </div>
      <div class="placeorder">
        <button @click="FormErrors">check for errors</button>
      </div>
      <div class="placeorder paypal" v-bind:class="{ 'is-active': showPaypal }">
        <div
          id="paypal-button-container"
          v-bind:on-approve="onApprove"
          v-bind:create-order="createOrder"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import { loadScript } from "@paypal/paypal-js";

export default {
  name: "Paypal",
  beforeCreate: function () {
    loadScript({ "client-id": CLIENT_ID }).then((paypal) => {
      paypal
        .Buttons({
          createOrder: this.createOrder,
          onApprove: this.onApprove,
        })
        .render("#paypal-button-container");
    });
  },
  data() {
    return {
      showPaypal: false,
      cart: {
        items: [],
      },
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      phone2: "",
      address: "",
      paypal: true,
      errors: [],
    };
  },
  mounted() {
    if (this.$store.state.Lang) {
      document.title = "ادفع باستعمال باي بال | HEstore";
    } else {
      document.title = "Checkout With Paypal | HEstore";
    }

    this.cart = this.$store.state.cart;
  },

  methods: {
    FormErrors() {
      this.errors = [];

      if (this.$store.state.Lang) {
        if (this.first_name === "") {
          this.errors.push("الاسم الأول مفقود ");
        }
        if (this.last_name === "") {
          this.errors.push("الاسم الأخير مفقود ");
        }
        if (this.email === "") {
          this.errors.push("البريد الإلكتروني مفقود");
        }
        if (this.phone === "") {
          this.errors.push("الهاتف مفقود ");
        }
        if (this.phone2 === "") {
          this.errors.push("رقم الهاتف الاحتياطي مفقود ");
        }
        if (this.address === "") {
          this.errors.push("العنوان مفقود ");
        }
      } else {
        if (this.first_name === "") {
          this.errors.push("The first name is missing ");
        }
        if (this.last_name === "") {
          this.errors.push("The last name is missing ");
        }
        if (this.email === "") {
          this.errors.push("The email is missing ");
        }
        if (this.phone === "") {
          this.errors.push("The phone is missing ");
        }
        if (this.phone2 === "") {
          this.errors.push("The Spare Phone Number is missing ");
        }
        if (this.address === "") {
          this.errors.push("The address is missing ");
        }
      }

      if (this.errors.length) {
        this.errors.length;
      } else {
        this.showPaypal = !this.showPaypal;
      }
    },
    createOrder: function (data, actions) {
      console.log("Creating order...");
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: this.paypalTotal.toFixed(2),
            },
          },
        ],
      });
    },
    onApprove: function (data, actions) {
      console.log("Order approved...");
      return actions.order.capture().then(() => {
        const items = [];
        for (let i = 0; i < this.cart.items.length; i++) {
          const item = this.cart.items[i];
          const obj = {
            product: item.product.id,
            quantity: item.quantity,
            price: item.product.price * item.quantity,
            size: item.size,
            color: item.color,
          };

          items.push(obj);
        }
        const Data = {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          phone: this.phone,
          phone2: this.phone2,
          address: this.address,
          paypal: this.paypal,
          items: items,
          order_total: this.cartTotalPrice + this.shippingPrice,
        };
        axios.post("/api/v1/checkout/", Data).then((response) => {
          this.$store.commit("clearCart");

          this.$router.push("/cart/O-S");
        });
      });
    },

    getItemTotal(item) {
      return item.quantity * item.product.price;
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
    paypalTotal() {
      let paypalTotal = this.cartTotalPrice / 25;
      return paypalTotal;
    },
  },
};
const CLIENT_ID =
  "AXJXbAcg3x0pojk5DsilhVGSlG4hWdftBpE6epw5qD663Y5SQ8Wq9mhKgBtIdxm4d3ClU3IUND6KHDx2";
</script>
<style lang="scss">
#paypal-button-container {
  width: 100%;
}
.subtotal {
  p {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
  }
}

.paypal {
  height: 0;
  overflow: hidden;
  transition: 0.4s;

  &.is-active {
    height: 150px;
    transition: 0.4s;
  }
}

.Container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;

  margin: 50px 0;

  .nonerror {
    background: #7ed3008a;
  }

  .alrt {
    background: #7ed3008a;
    padding: 0 20px;
    color: #fff;
    border-radius: 50px;
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
  .placeorder {
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
      padding: 0 5px;
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
      text-transform: capitalize;

      &:hover {
        background: #1f65f0;
      }
    }
  }
  .ll {
    text-transform: capitalize;
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
}

@media (max-width: 400px) {
  .subtotal {
    width: 300px;
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

<template>
  <div class="CartItem RTL" v-if="$store.state.Lang">
    <img :src="item.product.get_image" />
    {{ item.product.price }} ج.م
    <p
      class="p"
      :style="{ backgroundColor: item.color }"
      v-if="item.product.color && item.product.color.length"
    ></p>
    <p v-else class="p" :style="{ backgroundColor: item.color }"></p>
    <p v-if="item.product.sizes && item.product.sizes.length">
      {{ item.size }}
    </p>
    <p v-else>
      {{ item.size }}
    </p>
    <p class="Q">
      <a @click="incrementQuantity(item)" class="QP"
        ><i class="bx bxs-plus-circle"></i
      ></a>
      {{ item.quantity }}
      <a @click="decrementQuantity(item)" class="QM"
        ><i class="bx bxs-minus-circle"></i
      ></a>
    </p>
    {{ item.product.price * item.quantity }} ج.م
    <button class="delete" @click="removeFromCart(item)"></button>
  </div>
  <div class="CartItem" v-else>
    <img :src="item.product.get_image" />
    {{ item.product.price }} EGP
    <p
      class="p"
      :style="{ backgroundColor: item.color }"
      v-if="item.product.color && item.product.color.length"
    ></p>
    <p v-else class="p" :style="{ backgroundColor: item.color }"></p>
    <p v-if="item.product.sizes && item.product.sizes.length">
      {{ item.size }}
    </p>
    <p v-else>
      {{ item.size }}
    </p>

    <p class="Q">
      <a @click="incrementQuantity(item)" class="QP"
        ><i class="bx bxs-plus-circle"></i
      ></a>
      {{ item.quantity }}
      <a @click="decrementQuantity(item)" class="QM"
        ><i class="bx bxs-minus-circle"></i
      ></a>
    </p>
    {{ item.product.price * item.quantity }} EGP
    <button id="delete" @click="removeFromCart(item)">
      <i class="bx bxs-x-circle"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    initialItem: Object,
  },
  data() {
    return {
      item: this.initialItem,
    };
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price;
    },
    decrementQuantity(item) {
      item.quantity -= 1;
      if (item.quantity === 0) {
        this.$emit("removeFromCart", item);
      }
      this.updateCart();
    },
    incrementQuantity(item) {
      item.quantity += 1;
      this.updateCart();
    },
    updateCart() {
      localStorage.setItem("cart", JSON.stringify(this.$store.state.cart));
    },
    removeFromCart(item) {
      this.$emit("removeFromCart", item);
      this.updateCart();
    },
  },
};
</script>

<style lang="scss">
.CartItem {
  display: grid;
  place-items: center;
  grid-template-columns: repeat(6, 1fr) auto;

  .p {
    width: 25px;
    height: 25px;
    border-radius: 50px;
  }
  .Q {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;

    a:first-child {
      i {
        transition: 0.4s;
      }

      &:hover i {
        color: green;
      }
    }
    a:last-child {
      i {
        transition: 0.4s;
      }

      &:hover i {
        color: #c2c205;
      }
    }
  }
  #delete {
    cursor: pointer;
    border-radius: 50px;
    border: none;
    background: none;
    width: 25px;
    height: 25px;
    font-size: 20px;
    display: grid;
    place-items: center;
    i {
      transition: 0.4s;
      color: gray;
    }

    &:hover i {
      color: red;
    }
  }
  img {
    width: 75px;
    height: 75px;
    border-radius: 10px;
    box-shadow: 0 0 5px 2px #3333335a;
  }
}
</style>

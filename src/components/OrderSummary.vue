<template>
  <h3 class="title RTL" v-if="$store.state.Lang">
    رقم الطلب # {{ order.id.substring(24) }}
  </h3>

  <h3 class="title" v-else>Order #{{ order.id.substring(24) }}</h3>

  <h4 class="subtitle" v-if="$store.state.Lang">المنتجات</h4>
  <h4 class="subtitle" v-else>Products</h4>
  <div class="DP RTL" v-if="$store.state.Lang">
    <div class="sucO" v-if="order.paypal">مدفوع ؟ : تم دفع الطلب</div>
    <div class="sucO" v-else-if="order.ispaid">مدفوع ؟ : تم دفع الطلب</div>
    <div class="failO" v-else>مدفوع ؟ : لم يتم دفع الطلب</div>
    <div class="sucO" v-if="order.Delivered">
      لقد تم تسليمه ؟ : تم تسليم الطلب
    </div>

    <div class="failO" v-else>لقد تم تسليمه ؟ : لم يتم تسليم الطلب بعد</div>
  </div>
  <div class="DP" v-else>
    <div class="sucO" v-if="order.paypal">Is Paid ? : The Order Was Paid</div>
    <div class="sucO" v-else-if="order.ispaid">
      Is Paid ? : The Order Was Paid
    </div>
    <div class="failO" v-else>Is Paid ? : The Order Was Not Paid</div>
    <div class="sucO" v-if="order.Delivered">
      Is Delivered ? : The Order Was Delivered
    </div>

    <div class="failO" v-else>
      Is Delivered ? : The Order Was Not Delivered Yet
    </div>
  </div>
  <div class="Table">
    <div class="OTH RTL" v-if="$store.state.Lang">
      <p>المنتج</p>
      <p>السعر</p>
      <p>الكمية</p>
      <p>الإجمالي</p>
      <p>اللون</p>
      <p>مقاس</p>
    </div>
    <div class="OTH" v-else>
      <p>Product</p>
      <p>Price</p>
      <p>Quantity</p>
      <p>Total</p>
      <h4>Color</h4>
      <h4>Size</h4>
    </div>
    <div class="OTB" v-if="$store.state.Lang">
      <div
        class="OTT RTL"
        v-for="item in order.items"
        v-bind:key="item.product.id"
      >
        <p>
          <router-link :to="item.product.get_absolute_url">
            {{ item.product.nameAr }}
          </router-link>
        </p>
        <p>{{ item.product.price }} ج.م</p>
        <p>{{ item.quantity }}</p>
        <p>{{ getItemTotal(item) }} ج.م</p>
        <p
          v-if="product.colors && product.colors.length"
          class="color"
          :style="{ backgroundColor: item.color }"
        ></p>
        <p v-else></p>
        <p v-if="product.sizes && product.sizes.length">{{ item.size }}</p>
        <p v-else></p>
      </div>
    </div>
    <div class="OTB" v-else>
      <div class="OTT" v-for="item in order.items" v-bind:key="item.product.id">
        <p>
          <router-link :to="item.product.get_absolute_url">
            {{ item.product.name }}
          </router-link>
        </p>
        <p>{{ item.product.price }} EGP</p>
        <p>{{ item.quantity }}</p>
        <p>{{ getItemTotal(item) }} EGP</p>
        <p
          v-if="product.colors && product.colors.length"
          class="color"
          :style="{ backgroundColor: item.color }"
        ></p>
        <p v-else></p>
        <p v-if="product.sizes && product.sizes.length">{{ item.size }}</p>
        <p v-else></p>
      </div>
    </div>
  </div>
  <div class="ORDERSTATUS RTL" v-if="$store.state.Lang">
    <div class="Order_total">
      <h2>إجمالي الطلب : {{ order.order_total }} ج.م</h2>
    </div>
    <div class="Order_Status RTL">
      <h2>حالة الطلب : {{ order.order_status_Ar }}</h2>
    </div>
  </div>
  <div class="ORDERSTATUS" v-else>
    <div class="Order_total">
      <h2>order-total : {{ order.order_total }} EGP</h2>
    </div>
    <div class="Order_Status">
      <h2>the order is : {{ order.order_status }}</h2>
    </div>
  </div>
  <!--
    
      -->
</template>

<script>
export default {
  name: "OrderSummary",
  props: {
    order: Object,
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price;
    },
    orderTotalLength(order) {
      return order.items.reduce((acc, curVal) => {
        return (acc += curVal.quantity);
      }, 0);
    },
  },
};
</script>

<style lang="scss">
.title {
  font-size: 27px;
}
.ORDERSTATUS {
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.Table {
  width: 90%;
  box-shadow: 0 0 1px 2px #3333335a;
  border-radius: 15px;
  display: grid;
  place-items: center;
  .OTH {
    width: 100%;
    display: grid;
    place-items: center;
    grid-template-columns: repeat(6, auto);
    border-bottom: 2px solid black;
    padding: 10px 0;

    p {
      font-weight: 700;
    }
  }

  .OTB {
    width: 100%;
    padding: 15px 0;
    display: grid;
    gap: 10px;

    .OTT {
      width: 100%;
      display: grid;
      place-items: center;
      padding: 10px 0;
      grid-template-columns: repeat(6, auto);

      .color {
        width: 30px;
        height: 30px;
        border-radius: 50px;
      }
    }
  }
}
.DP {
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .sucO {
    background: #00800093;
    color: #fff;
    padding: 5px 15px;
    border-radius: 50px;
  }

  .failO {
    background: #ff0000a4;
    color: #fff;
    padding: 5px 15px;
    border-radius: 50px;
  }
}
.Order_total {
  background: #eee;
  padding: 5px 15px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;

  h2 {
    font-size: 20px;
    font-weight: 700;
  }
}

.Order_Status {
  background: #eee;
  padding: 5px 15px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;

  h2 {
    font-size: 20px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  i {
    color: #3c4fff;
    font-size: 25px;
  }

  #progress {
    animation: status 1.2s linear infinite;
  }
}
@keyframes status {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@media (max-width: 670px) {
  .DP {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }
  .ORDERSTATUS {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }
}
</style>

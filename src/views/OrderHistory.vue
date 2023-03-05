<template>
  <div class="OContainer">
    <!---->
    <h1 class="title" v-if="$store.state.Lang">تاريخ الطلبات</h1>
    <h1 class="title" v-else>Order History</h1>

    <div class="oCont" v-if="orders.length">
      <OrderSummary
        v-for="order in orders"
        v-bind:key="order.id"
        v-bind:order="order"
      />
    </div>
    <div v-else>
      <h2 v-if="$store.state.Lang">
        لا توجد طلبات اذهب<router-link to="/"> للتسوق </router-link>
      </h2>
      <h2 v-else>
        There is no Orders go <router-link to="/">shopping...</router-link>
      </h2>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import OrderSummary from "@/components/OrderSummary.vue";

export default {
  name: "OrderHistory",
  components: {
    OrderSummary, //
  },
  data() {
    return {
      orders: [],
    };
  },
  mounted() {
    if (this.$store.state.Lang) {
      document.title = "تاريخ الطلبات | HEstore";
    } else {
      document.title = "Order History | HEstore";
    }

    this.getMyOrders();
  },
  methods: {
    async getMyOrders() {
      this.$store.commit("setIsLoading", true);
      await axios.get("/api/v1/orders/").then((response) => {
        this.orders = response.data;
      });
      this.$store.commit("setIsLoading", false);
    },
  },
};
</script>

<style lang="scss">
.OContainer {
  margin: 20px 0;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .oCont {
    width: 100;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
}
</style>

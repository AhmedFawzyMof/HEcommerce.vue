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
  
  <div class="loaddiv">
    <button v-if="OrdersLoaded.length >= 20" @click="loadMore" class="LoadBtn">
      Load More
    </button>
  </div>

</template>

<script>
import axios from "axios";
import OrderSummary from "@/components/OrderSummary.vue";

export default {
  name: "OrderHistory",
  components: {
    OrderSummary, 
  },
  data() {
    return {
      orders: [],
      length: 20,
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
    loadMore() {
      if (this.length > this.orders.length) return;
      this.length = this.length + 20;
    },
    async getMyOrders() {
      this.$store.commit("setIsLoading", true);
      await axios.get("/api/v1/orders/").then((response) => {
        this.orders = response.data;
      });
      this.$store.commit("setIsLoading", false);
    },
  },  
  computed: {
    OrdersLoaded() {
      return this.orders.slice(0, this.length);
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

.loaddiv {
  width: 300px;
  
  margin: 20px 0;
}

.LoadBtn {
  font-size: 20px;
  font-weight: 700;
  color: #333;
  background: #eeeeee65;
  box-shadow: 0 0 2px 2px #3333335b;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 50px;
  border: none;
  transition: 0.4s;
  &:hover {
    background: #3333335b;
    color: #eee;
  }
}
</style>

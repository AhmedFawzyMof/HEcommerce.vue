<template>
  <div class="con RTL" v-if="$store.state.Lang">
    <h1 class="subtitle">تم إجراء الطلب بنجاح</h1>
    <p>
      شكرا للشراء (
      <router-link to="/User/order-history"> تاريخ الطلبات </router-link>)
    </p>
  </div>

  <div class="con" v-else>
    <h1 class="subtitle">the order was made successfully</h1>
    <p>
      thanks for purchasing (
      <router-link to="/User/order-history"> Order History </router-link>)
    </p>
  </div>
</template>
<script>
export default {
  name: "OS",
  mounted() {
    if (this.$store.state.Lang) {
      document.title = "نجاح 🎉 | HEstore";
    } else {
      document.title = "Success 🎉 | HEstore";
    }

    if (localStorage.getItem("reloaded")) {
      localStorage.removeItem("reloaded");
    } else {
      localStorage.setItem("reloaded", "1");
      location.reload();
    }
  },
};
</script>

<style lang="scss">
.con {
  background: #eee;
  width: 300px;
  padding: 20px 5px;
  border-radius: 5px;
  box-shadow: -2px 2px 2px 2px #33333353;
  display: grid;
  place-items: center;
  gap: 30px;
  text-transform: capitalize;

  h1 {
    font-weight: 600;
  }

  p {
    font-size: 15px;
    font-weight: 600;
  }
}
</style>

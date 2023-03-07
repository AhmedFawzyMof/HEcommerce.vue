<template>
  <div class="cur RTL" v-if="$store.state.Lang">
    <router-link v-for="p in cur" :key="p.id" :to="p.get_absolute_url">
      <img :src="p.image" />
    </router-link>
  </div>
  <div class="cur" v-else>
    <router-link v-for="p in cur" :key="p.id" :to="p.get_absolute_url">
      <img :src="p.image" />
    </router-link>
  </div>
  <div class="PContainer">
    <ProductCard
      v-for="product in latestProducts"
      v-bind:key="product.id"
      v-bind:product="product"
    />
  </div>
</template>
<script>
import axios from "axios";
import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "HomeView",
  components: {
    ProductCard,
  },
  data() {
    return {
      cur: [],
      latestProducts: [],
      showMenu: false,
      search: null,
    };
  },
  mounted() {
    this.getCur();
    this.getLatestProducts();
    document.title = "HEstore";
  }, //
  methods: {
    async getCur() {
      this.$store.commit("setIsLoading", true);
      await axios.get("/api/v1/cur-products/").then((response) => {
        this.cur = response.data;
      });
      this.$store.commit("setIsLoading", false);
    },
    async getLatestProducts() {
      this.$store.commit("setIsLoading", true);
      await axios.get("/api/v1/latest-products").then((response) => {
        this.latestProducts = response.data;
      });
      this.$store.commit("setIsLoading", false);
    },
  },
};
</script>
<style lang="scss">
.cur {
  width: 100%;
  height: 75vh;
  display: grid;
  grid-template-columns: 65% 35%;
  grid-template-rows: repeat(2, 50%);

  a:first-child {
    width: 100%;
    height: 100%;
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 3;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 95%;
      border-radius: 10px;
      height: 95% !important;
    }
  }
  a:nth-child(2) {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 95%;
      border-radius: 10px;
      height: 95% !important;
    }
  }
  a:last-child {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 95%;
      border-radius: 10px;
      height: 95% !important;
    }
  }
}

@media (max-width: 750px) {
  .cur {
    min-height: 100vh;
    width: 100%;
    grid-template-columns: repeat(3, 100%);
    grid-template-rows: repeat(1, 1fr);
    overflow: scroll;

    a {
      width: 100% !important;
    }
  }
}

.PContainer {
  width: 100%;
  margin: 40px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
}
.allTags {
  display: flex;
  padding: 20px 0;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 20px;
  text-transform: uppercase;
  overflow-x: scroll;

  .theTag {
    background: #0440a882;
    color: #fff;
    padding: 5px 10px;
    border-radius: 50px;
    transition: 0.4s;

    &:hover {
      background: #33333360;
    }
  }
}
@media (max-width: 550px) {
  .allTags {
    gap: 10px;
  }
}
</style>

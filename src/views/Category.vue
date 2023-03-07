<template>
  <div class="CateContainer">
    <ProductCard
      v-for="product in productsLoaded"
      v-bind:key="product.id"
      v-bind:product="product"
    />
  </div>
  <div class="loaddiv">
    <button v-if="productsLoaded.length >= 20" @click="loadMore" class="LoadBtn">
      Load More
    </button>
  </div>
</template>
<script>
import axios from "axios";

import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "Category",
  components: { ProductCard },
  data() {
    return {
      category: {
        products: [],
      },
      length: 20,
    };
  },
  mounted() {
    this.getCategory();
  },
  watch: {
    $route(to, from) {
      if (to.name === "Category") {
        this.getCategory();
      }
    },
  },
  methods: {
    loadMore() {
      if (this.length > this.category.products.length) return;
      this.length = this.length + 20;
    },
    async getCategory() {
      const categorySlug = this.$route.params.category_slug;

      this.$store.commit("setIsLoading", true);

      await axios.get(`/api/v1/products/${categorySlug}/`).then((response) => {
        this.category = response.data;

        if (this.$store.state.Lang) {
          document.title = this.category.nameAr + " | HEstore";
        } else {
          document.title = this.category.name + " | HEstore";
        }
      });
      this.$store.commit("setIsLoading", false);
    },
  },
  computed: {
    productsLoaded() {
      return this.category.products.slice(0, this.length);
    },
  },
};
</script>

<style lang="scss">
.CateContainer {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
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

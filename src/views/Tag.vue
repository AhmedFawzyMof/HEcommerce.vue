<template>
  <div class="TagContainer">
    <ProductCard
      v-for="product in productsLoaded"
      v-bind:key="product.id"
      v-bind:product="product"
    />
  </div>
  <div class="loaddiv" v-if="$store.state.Lang">
    <button
      v-if="productsLoaded.length >= 20"
      @click="loadMore"
      class="LoadBtn"
    >
      Load More
    </button>
  </div>
  <div class="loaddiv" v-else>
    <button
      v-if="productsLoaded.length >= 20"
      @click="loadMore"
      class="LoadBtn"
    >
      تحميل المزيد
    </button>
  </div>
</template>
<script>
import axios from "axios";
import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "Tag",
  components: {
    ProductCard,
  },
  data() {
    return {
      tag: {
        products: [],
      },
      length: 20,
    };
  },
  mounted() {
    this.getTag();
  },
  watch: {
    $route(to, from) {
      if (to.name === "Tag") {
        this.getTag();
      }
    },
  },
  methods: {
    loadMore() {
      if (this.length > this.tag.products.length) return;
      this.length = this.length + 20;
    },
    async getTag() {
      const tagSlug = this.$route.params.tag_slug;

      this.$store.commit("setIsLoading", true);

      await axios.get(`/api/v1/tags/products/${tagSlug}/`).then((response) => {
        this.tag = response.data;
        if (this.$store.state.Lang) {
          document.title =
            this.tag.nameAr.replace("/", "").replace("/", "") + " | HEstore";
        } else {
          document.title = this.tag.slug + " | HEstore";
        }
      });
      this.$store.commit("setIsLoading", false);
    },
  },
  computed: {
    productsLoaded() {
      return this.tag.products.slice(0, this.length);
    },
  },
};
</script>

<style lang="scss">
.TagContainer {
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
}

.LoadBtn {
  width: 100%;
  margin: 20px 0;
  font-size: 20px;
  font-weight: 700;
  color: #333;
  background: #eeeeee65;
  box-shadow: 0 0 2px 2px #3333335b;
  padding: 7.5px 10px;
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

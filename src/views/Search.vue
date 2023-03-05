<template>
  <div class="container">
    <h1 class="title" v-if="$store.state.Lang">لقد بحثت عن</h1>
    <h1 class="title" v-else>You Searched For</h1>
    <div class="PContainer" v-if="products && products.length">
      <ProductCard
        v-for="product in products"
        v-bind:key="product.id"
        v-bind:product="product"
      />
    </div>
    <div class="notfound" v-else>
      <h1 class="subtitle" v-if="$store.state.Lang">
        غير موجود الرجاء المحاولة مرة أخرى
      </h1>
      <h1 class="subtitle" v-else>not found please try again</h1>
    </div>
  </div>
  <div class="pagingaiton">
    <template v-if="showPrevButton">
      <button @click="loadPrev()" class="prevBtn">
        <i class="bx bxs-left-arrow"></i>
      </button>
    </template>

    <div class="currentpage">
      {{ currentPage }}
    </div>

    <template v-if="showNextButton">
      <button @click="loadNext()" class="nextBtn">
        <i class="bx bxs-right-arrow"></i>
      </button>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "Search",
  components: {
    ProductCard,
  },
  data() {
    return {
      products: [],
      query: "",

      currentPage: 1,
      showNextButton: false,
      showPrevButton: false,
    };
  },
  mounted() {
    if (this.$store.state.Lang) {
      document.title = "بحث | HEstore";
    } else {
      document.title = "Search | HEstore";
    }
    let uri = window.location.search;
    let params = new URLSearchParams(uri);
    if (params.get("query")) {
      this.query = params.get("query");
      this.performSearch();
    }
  },
  methods: {
    loadNext() {
      this.currentPage += 1;
      this.performSearch();
    },
    loadPrev() {
      this.currentPage -= 1;
      this.performSearch();
    },
    async performSearch() {
      this.$store.commit("setIsLoading", true);
      await axios
        .post("/api/v1/products/search/", { query: this.query })
        .then((response) => {
          this.products = response.data.results;
          if (response.data.next) {
            this.showNextButton = true;
          }

          if (response.data.previous) {
            this.showPrevButton = true;
          }
        });
      this.$store.commit("setIsLoading", false);
    },
  },
};
</script>

<style lang="scss">
.container {
  width: 100%;
  min-height: 100%;
  display: grid;
  place-items: center;
}
.subtitle {
  margin-top: 50px;
  text-transform: capitalize;
}
.pagingaiton {
  margin: 20px 0;
  width: 300px;
  background: #eee;
  min-height: 50px;
  border-radius: 5px;
  display: flex;
  padding: 0 15px;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 3px 2px #33333348;
  position: relative;

  .currentpage {
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    background: #333;
    color: #eee;
    font-size: 20px;
    font-weight: 700;
    border-radius: 5px;
    box-shadow: 0 0 2px 2px #33333348;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  button {
    width: 35px;
    height: 35px;
    font-size: 25px;
    display: grid;
    place-items: center;
    color: #333;
    transition: 0.3s;
    cursor: pointer;
    background: none;
    border: none;

    &:hover {
      color: #3860ff;
    }
  }

  .nextBtn:hover {
    transform: translateX(15px);
  }
  .prevBtn:hover {
    transform: translateX(-15px);
  }
}
</style>

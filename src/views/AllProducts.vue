<template>
  <div class="FormContainer RTL" v-if="$store.state.Lang">
    <form @submit.prevent="Filters" class="fillters">
      <span class="Alart">* كل الحقول اختيارية</span>
      <div class="FInput">
        <label>السعر الأدنى</label>
        <input type="number" v-model="min_price" placeholder="السعر الأدنى" />
      </div>
      <div class="FInput">
        <label>فئة</label>
        <select v-model="category">
          <option
            v-for="category in categoris"
            :key="category.id"
            :value="category.id"
          >
            {{ category.nameAr }}
          </option>
        </select>
      </div>
      <div class="FInput">
        <label>اسم المنتج بالعربي</label>
        <input type="text" v-model="productnameAr" placeholder="اسم المنتج" />
      </div>
      <div class="FInput">
        <label>أقصى سعر</label>
        <input type="number" v-model="max_price" placeholder="أقصى سعر" />
      </div>
      <div class="FInput">
        <button type="submit">بحث</button>
      </div>
    </form>
  </div>
  <div class="FormContainer" v-else>
    <form @submit.prevent="Filters" class="fillters">
      <span class="Alart">* all field are optional</span>
      <div class="FInput">
        <label>Min Price</label>

        <input type="number" v-model="min_price" placeholder="min_price" />
      </div>
      <div class="FInput">
        <label>Category</label>
        <select v-model="category">
          <option
            v-for="category in categoris"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="FInput">
        <label>Product Name in Eng</label>
        <input type="text" v-model="productname" placeholder="product name" />
      </div>
      <div class="FInput">
        <label>Max Price</label>
        <input type="number" v-model="max_price" placeholder="max_price" />
      </div>
      <div class="FInput">
        <button type="submit">Search</button>
      </div>
    </form>
  </div>
  <div class="container">
<div class="notfound" v-if="products && products.length">
      <h1 class="subtitle" v-if="$store.state.Lang">
        غير موجود الرجاء المحاولة مرة أخرى
      </h1>
      <h1 class="subtitle" v-else>not found please try again</h1>
    </div>
    <div class="PContainer" v-else>
      <ProductCard
        v-for="product in allproducts"
        v-bind:key="product.id"
        v-bind:product="product"
      />
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
//
export default {
  name: "AllProducts",
  components: { ProductCard },
  data() {
    return {
      allproducts: [],
      categoris: [],
      category: "",
      min_price: "",
      max_price: "",
      productname: "",
      productnameAr: "",
      currentPage: 1,
      showNextButton: false,
      showPrevButton: false,
    };
  },
  mounted() {
    this.Page();
    this.Filters();
    this.getAllCategoris();
    this.getAllProducts();
    if (this.$store.state.Lang) {
      document.title = "جميع المنتجات | HEstore";
    } else {
      document.title = "All Products | HEstore";
    }
  },
  methods: {
    async getAllCategoris() {
      this.$store.commit("setIsLoading", true);
      await axios.get("/api/v1/allcategoris").then((response) => {
        this.categoris = response.data;
      });
      this.$store.commit("setIsLoading", false);
    },
    async Filters() {
      const category = this.category;
      const min_price = this.min_price;
      const max_price = this.max_price;
      const name = this.productname;
      const nameAr = this.productnameAr;

      this.$store.commit("setIsLoading", true);

      axios
        .get(
          `/api/v1/allproducts/?name=${name}&category=${category}&nameAr=${nameAr}&min_price=${min_price}&max_price=${max_price}`
        )
        .then((response) => {
          this.allproducts = response.data.results;
        });
      this.$store.commit("setIsLoading", false);
    },
    Page() {
      return this.currentPage;
    },
    loadNext() {
      this.currentPage += 1;
      this.getAllProducts();
    },
    loadPrev() {
      this.currentPage -= 1;
      this.getAllProducts();
    },
    async getAllProducts() {
      this.$store.commit("setIsLoading", true);
      await axios.get("/api/v1/allproducts/").then((response) => {
        this.allproducts = response.data.results;
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

.RTL {
  direction: rtl;

  form {
    .FInput {
      direction: rtl;

      input {
        direction: ltr;
      }
    }
  }
}

.FormContainer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;

  form {
    width: 500px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 15px;
    box-shadow: 0 0 3px 3px #33333348;
    padding: 15px;
    border-radius: 10px;

    .Alart {
      background: #2e74ff8b;
      color: #eee;
      padding: 0 10px;
      border-radius: 50px;
      text-transform: uppercase;
    }

    .FInput {
      width: 100%;
      display: flex;
      align-items: flex-start;
      flex-direction: column;

      input {
        width: 100%;
        height: 35px;
        border: 2px solid #333;
        border-radius: 10px;
        padding-left: 10px;
      }

      select {
        width: 100%;
        height: 35px;
        border: 2px solid #333;
        border-radius: 10px;
        background: #333;
        color: #fff;
      }

      button {
        width: 100%;
        height: 30px;
        border-radius: 40px;
        border: none;
        background: #333;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
@media (max-width: 500px) {
  .FormContainer {
    form {
      width: 450px;
    }
  }
}

@media (max-width: 450px) {
  .FormContainer {
    form {
      width: 400px;
    }
  }
}

@media (max-width: 400px) {
  .FormContainer {
    form {
      width: 350px;
    }
  }
}

@media (max-width: 350px) {
  .FormContainer {
    form {
      width: 300px;
    }
  }
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

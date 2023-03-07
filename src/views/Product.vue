<template>
  <div class="CONTAINER RTL" v-if="$store.state.Lang">
    <div class="ProductPage">
      <div class="PI">
        <img :src="product.image" />
      </div>
      <div class="PInfo">
        <div class="PQ">
          <h3>المنتج : {{ product.nameAr }}</h3>
          <div>
            <h2>وصف المنتج :</h2>
            <p>{{ product.description }}</p>
          </div>
          <div>
            <h2>العلامات :</h2>
            <div class="Tags">
              <router-link v-for="tag in product.tag" :to="tag">
                {{ tag.replace("/", "").replace("/", "") }}
              </router-link>
            </div>
          </div>
          <div id="sizes" v-if="product.sizes && product.sizes.length">
            <div class="Sizes">
              <div class="size" v-for="size in product.sizes">
                <input
                  type="radio"
                  :value="size"
                  v-model="sizes"
                  name="sizes"
                  :id="size"
                />
                <label :for="size">{{ size }}</label>
                <div class="border"></div>
              </div>
            </div>
          </div>
          <div class="div" v-else></div>
          <div id="colors" v-if="product.colors && product.colors.length">
            <div class="Colors">
              <div class="color" v-for="color in product.colors">
                <input
                  v-model="colors"
                  :value="color"
                  type="radio"
                  name="colors"
                  :id="color"
                />
                <label
                  :for="color"
                  :style="{ backgroundColor: color, color: color }"
                  >{{ color.substring(1, []) }}</label
                >
              </div>
            </div>
          </div>
          <div class="div" v-else></div>
          <div class="Quantity">
            <p><strong>السعر : </strong> {{ product.price }} ج.م</p>

            <button @click="addToCart">
              أضف إلى السلة<i class="bx bxs-cart-add"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="reviews">
      <h2 class="subtitle">المراجعات</h2>
      <div class="postreview">
        <form @submit.prevent="Review" v-if="$store.state.isAuthenticated">
          <div class="emoji">
            <div class="reactemoji">
              <input
                type="radio"
                v-model="react"
                name="react"
                id="sogood"
                value="😄"
              />
              <label for="sogood">😄</label>
            </div>
            <div class="reactemoji">
              <input
                type="radio"
                v-model="react"
                name="react"
                id="good"
                value="🙂"
              />
              <label for="good">🙂</label>
            </div>
            <div class="reactemoji">
              <input
                type="radio"
                v-model="react"
                name="react"
                id="notbad"
                value="😐"
              />
              <label for="notbad">😐</label>
            </div>
            <div class="reactemoji">
              <input
                type="radio"
                v-model="react"
                name="react"
                id="bad"
                value="😧"
              />
              <label for="bad">😧</label>
            </div>
            <div class="reactemoji">
              <input
                type="radio"
                v-model="react"
                name="react"
                id="sobad"
                value="😠"
              />
              <label for="sobad">😠</label>
            </div>
          </div>
          <div class="Stars">
            <input
              type="radio"
              id="star1"
              name="rate"
              value="⭐⭐⭐⭐⭐"
              v-model="rate"
            />
            <label for="star1">⭐</label>
            <input
              type="radio"
              id="star2"
              name="rate"
              value="⭐⭐⭐⭐"
              v-model="rate"
            />
            <label for="star2">⭐</label>
            <input
              type="radio"
              id="star3"
              name="rate"
              value="⭐⭐⭐"
              v-model="rate"
            />
            <label for="star3">⭐</label>
            <input
              type="radio"
              id="star4"
              name="rate"
              value="⭐⭐"
              v-model="rate"
            />
            <label for="star4">⭐</label>
            <input
              type="radio"
              id="star5"
              name="rate"
              value="⭐"
              v-model="rate"
            />
            <label for="star5">⭐</label>
          </div>
          <div class="Title">
            <input type="text" v-model="titles" placeholder="عنوان" />
          </div>
          <div class="comment">
            <textarea
              cols="20"
              v-model="comment"
              rows="10"
              placeholder="تعليق"
            ></textarea>
          </div>
          <div class="errors" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>
          <div class="reviewBTN">
            <button>تعليق</button>
          </div>
        </form>
        <div v-else class="qwes">
          <h1>
            please <router-link to="/log-in">login</router-link> to leave a
            review
          </h1>
        </div>
      </div>
      <div class="allreviews">
        <div
          class="comments"
          v-for="comment in comments"
          v-bind:key="comment.id"
        >
          <div class="commenthead">
            <span class="commentavatar">{{
              comment.get_username.substring(2, [])
            }}</span>
            <div>
              <span>{{ comment.get_username.substring(15, []) }}</span>
              <span>{{ comment.get_email.substring(15, []) }}</span>
            </div>
            <div class="re">
              <span>{{ comment.react }}</span>
              <span>{{ comment.rate }}</span>
            </div>
          </div>
          <div class="commentbody">
            <div class="comtitle">
              {{ comment.titles }}
            </div>
            <div class="com">
              {{ comment.comment }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="CONTAINER" v-else>
    <div class="ProductPage">
      <div class="PI">
        <img :src="product.image" />
      </div>
      <div class="PInfo">
        <div class="PQ">
          <h3>Product: {{ product.name }}</h3>
          <div>
            <h2>Description:</h2>
            <p>{{ product.description }}</p>
          </div>
          <div>
            <h2>Tags:</h2>
            <div class="Tags">
              <router-link v-for="tag in product.tag" :to="tag">
                {{ tag.replace("/", "").replace("/", "") }}
              </router-link>
            </div>
          </div>
          <div id="sizes" v-if="product.sizes && product.sizes.length">
            <div class="Sizes">
              <div class="size" v-for="size in product.sizes">
                <input
                  type="radio"
                  :value="size"
                  v-model="sizes"
                  name="sizes"
                  :id="size"
                />
                <label :for="size">{{ size }}</label>
                <div class="border"></div>
              </div>
            </div>
          </div>
          <div class="div" v-else></div>
          <div id="colors" v-if="product.colors && product.colors.length">
            <div class="Colors">
              <div class="color" v-for="color in product.colors">
                <input
                  v-model="colors"
                  :value="color"
                  type="radio"
                  name="colors"
                  :id="color"
                />
                <label
                  :for="color"
                  :style="{ backgroundColor: color, color: color }"
                  >{{ color.substring(1, []) }}</label
                >
              </div>
            </div>
          </div>
          <div class="div" v-else></div>

          <div class="Quantity">
            <p><strong>Price: </strong> {{ product.price }} EGP</p>
            <button @click="addToCart">
              Add To Cart <i class="bx bxs-cart-add"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="reviews">
      <h2 class="subtitle">Reviews</h2>
      <div class="postreview">
        <form @submit.prevent="Review" v-if="$store.state.isAuthenticated">
          <div class="emoji">
            <div class="reactemoji">
              <input
                type="radio"
                v-model="react"
                name="react"
                id="sogood"
                value="😄"
              />
              <label for="sogood">😄</label>
            </div>
            <div class="reactemoji">
              <input
                type="radio"
                v-model="react"
                name="react"
                id="good"
                value="🙂"
              />
              <label for="good">🙂</label>
            </div>
            <div class="reactemoji">
              <input
                type="radio"
                v-model="react"
                name="react"
                id="notbad"
                value="😐"
              />
              <label for="notbad">😐</label>
            </div>
            <div class="reactemoji">
              <input
                type="radio"
                v-model="react"
                name="react"
                id="bad"
                value="😧"
              />
              <label for="bad">😧</label>
            </div>
            <div class="reactemoji">
              <input
                type="radio"
                v-model="react"
                name="react"
                id="sobad"
                value="😠"
              />
              <label for="sobad">😠</label>
            </div>
          </div>
          <div class="Stars">
            <input
              type="radio"
              id="star1"
              name="rate"
              value="⭐⭐⭐⭐⭐"
              v-model="rate"
            />
            <label for="star1">⭐</label>
            <input
              type="radio"
              id="star2"
              name="rate"
              value="⭐⭐⭐⭐"
              v-model="rate"
            />
            <label for="star2">⭐</label>
            <input
              type="radio"
              id="star3"
              name="rate"
              value="⭐⭐⭐"
              v-model="rate"
            />
            <label for="star3">⭐</label>
            <input
              type="radio"
              id="star4"
              name="rate"
              value="⭐⭐"
              v-model="rate"
            />
            <label for="star4">⭐</label>
            <input
              type="radio"
              id="star5"
              name="rate"
              value="⭐"
              v-model="rate"
            />
            <label for="star5">⭐</label>
          </div>
          <div class="Title">
            <input type="text" v-model="titles" placeholder="Title" />
          </div>
          <div class="comment">
            <textarea
              cols="20"
              v-model="comment"
              rows="10"
              placeholder="Comment"
            ></textarea>
          </div>
          <div class="errors" v-if="errors.length">
            <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
          </div>
          <div class="reviewBTN">
            <button>comment</button>
          </div>
        </form>
        <div v-else class="qwes">
          <h1>
            please <router-link to="/log-in">login</router-link> to leave a
            review
          </h1>
        </div>
      </div>
      <div class="allreviews">
        <div
          class="comments"
          v-for="comment in comments"
          v-bind:key="comment.id"
        >
          <div class="commenthead">
            <span class="commentavatar">{{
              comment.get_username.substring(2, [])
            }}</span>
            <div>
              <span>{{ comment.get_username.substring(15, []) }}</span>
              <span>{{ comment.get_email.substring(15, []) }}</span>
            </div>
            <div class="re">
              <span>{{ comment.react }}</span>
              <span>{{ comment.rate }}</span>
            </div>
          </div>
          <div class="commentbody">
            <div class="comtitle">
              {{ comment.titles }}
            </div>
            <div class="com">
              {{ comment.comment }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { toast } from "bulma-toast";

export default {
  name: "Product",
  data() {
    return {
      comments: [],
      product: {},
      sizes: "",
      colors: "",
      quantity: 1,
      rate: "",
      react: "",
      titles: "",
      comment: "",
      productId: 1,
      productName: "",
      errors: [],
    };
  },
  mounted() {
    if (this.$store.state.Lang) {
      this.getArProduct();
    } else {
      this.getProduct();
    }
  },
  methods: {
    Review() {
      this.errors = [];

      if (this.rate === "") {
        this.errors.push("The Rate is missing ");
      }
      if (this.react === "") {
        this.errors.push("The Emoji is missing ");
      }
      if (this.titles === "") {
        this.errors.push("The titles is missing ");
      }
      if (this.comment === "") {
        this.errors.push("The comment is missing ");
      }

      if (isNaN(this.productId) || this.productId < 1) {
        this.productId = 1;
      }

      const Data = {
        product: this.productId,
        titles: this.titles,
        rate: this.rate,
        react: this.react,
        comment: this.comment,
      };

      axios.post(`/api/v1/products/post/comments/`, Data).then((response) => {
        if (localStorage.getItem("reloaded")) {
          localStorage.removeItem("reloaded");
        } else {
          localStorage.setItem("reloaded", "1");
          location.reload();
        }
      });
    },
    async getArProduct() {
      this.$store.commit("setIsLoading", true);

      const cate_slug = this.$route.params.category_slug;
      const prod_slug = this.$route.params.product_slug;

      await axios
        .get(`/api/v1/products/ar/${cate_slug}/${prod_slug}`)
        .then((response) => {
          this.product = response.data;
          this.productId = this.product.id;
          axios
            .get(`/api/v1/products/${this.product.id}/comments/`)
            .then((response) => {
              this.comments = response.data;
            });

          document.title = this.product.nameAr + " | HEstore";
        });
      this.$store.commit("setIsLoading", false);
    },
    async getProduct() {
      this.$store.commit("setIsLoading", true);

      const cate_slug = this.$route.params.category_slug;
      const prod_slug = this.$route.params.product_slug;

      await axios
        .get(`/api/v1/products/${cate_slug}/${prod_slug}`)
        .then((response) => {
          this.product = response.data;
          this.productId = this.product.id;
          axios
            .get(`/api/v1/products/${this.product.id}/comments/`)
            .then((response) => {
              this.comments = response.data;
            });

          document.title = this.product.name + " | HEstore";
        });
      this.$store.commit("setIsLoading", false);
    },
    //
    addToCart() {
      if (
        (this.product.sizes && this.product.sizes.length,
        this.product.colors && this.product.colors.length)
      ) {
        if (this.$store.state.Lang) {
          if ((this.colors === "", this.sizes === "")) {
            toast({
              message: "الرجاء تحديد اللون والحجم",
              type: "is-danger",
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: "bottom-right",
            });
          } else {
            const item = {
              product: this.product,
              quantity: this.quantity,
              color: this.colors,
              size: this.sizes,
            };

            this.$store.commit("addToCart", item);
          }
        } else {
          if ((this.colors === "", this.sizes === "")) {
            toast({
              message: "please select color and size",
              type: "is-danger",
              dismissible: true,
              pauseOnHover: true,
              duration: 2000,
              position: "bottom-right",
            });
          } else {
            const item = {
              product: this.product,
              quantity: this.quantity,
              color: this.colors,
              size: this.sizes,
            };

            this.$store.commit("addToCart", item);
          }
        }
      } else {
        if (this.product.sizes && this.product.sizes.length) {
          if (this.$store.state.Lang) {
            if (this.sizes === "") {
              toast({
                message: "الرجاء تحديد الحجم",
                type: "is-danger",
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: "bottom-right",
              });
            } else {
              const item = {
                product: this.product,
                quantity: this.quantity,
                color: this.colors,
                size: this.sizes,
              };
              this.$store.commit("addToCart", item);
            }
          } else {
            if (this.product.sizes && this.product.sizes.length) {
              if (this.sizes === "") {
                toast({
                  message: "please select size",
                  type: "is-danger",
                  dismissible: true,
                  pauseOnHover: true,
                  duration: 2000,
                  position: "bottom-right",
                });
              } else {
                const item = {
                  product: this.product,
                  quantity: this.quantity,
                  color: this.colors,
                  size: this.sizes,
                };
                this.$store.commit("addToCart", item);
              }
            } else {
              const item = {
                product: this.product,
                quantity: this.quantity,
                color: this.colors,
                size: this.sizes,
              };

              this.$store.commit("addToCart", item);
            }
          }
        }
        if (this.product.colors && this.product.colors.length) {
          if (this.$store.state.Lang) {
            if (this.colors === "") {
              toast({
                message: "الرجاء تحديد اللون",
                type: "is-danger",
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: "bottom-right",
              });
            } else {
              const item = {
                product: this.product,
                quantity: this.quantity,
                color: this.colors,
                size: this.sizes,
              };
              this.$store.commit("addToCart", item);
            }
          } else {
            if (this.product.colors && this.product.colors.length) {
              if (this.colors === "") {
                toast({
                  message: "please select color",
                  type: "is-danger",
                  dismissible: true,
                  pauseOnHover: true,
                  duration: 2000,
                  position: "bottom-right",
                });
              } else {
                const item = {
                  product: this.product,
                  quantity: this.quantity,
                  color: this.colors,
                  size: this.sizes,
                };
                this.$store.commit("addToCart", item);
              }
            } else {
              const item = {
                product: this.product,
                quantity: this.quantity,
                color: this.colors,
                size: this.sizes,
              };

              this.$store.commit("addToCart", item);
            }
          }
        }
      }
    },
    setIsLoading(state, status) {
      state.isLoading = status;
    },
  },
};
</script>

<style lang="scss">
.RTL {
  direction: rtl;
}

#sizes {
  display: grid;
  grid-template-rows: repeat(2, auto);
  gap: 25px;
}

#colors {
  display: grid;
  grid-template-rows: repeat(2, auto);
  gap: 25px;
}

.Colors {
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  width: 100%;
  height: 100%;
  gap: 15px;
  position: relative;

  .color {
    position: relative;
    display: grid;
    place-items: center;

    label {
      width: 45px;
      height: 25px;
      border-radius: 5px;
      padding: 0 9.2px;
      position: absolute;
      font-weight: 700;
      border: 2px solid #333;
      z-index: 9;
      color: #333;
      cursor: pointer;
      transition: 0.4s;
    }

    input {
      position: absolute;
      opacity: 1;
      z-index: 9;

      &:checked ~ label {
        transition: 0.4s;
        border: 2px solid #eee;
      }
    }
  }
}

.Sizes {
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  width: 100%;
  height: 100%;
  gap: 15px;
  position: relative;

  .size {
    position: relative;
    display: grid;
    place-items: center;

    .border {
      border-radius: 5px;
      height: 35px;
      border: 2px solid #333;
    }
    label {
      position: absolute;
      font-weight: 700;
      color: #333;
      cursor: pointer;
      transition: 0.4s;
    }
    input {
      position: absolute;
      opacity: 0;
      z-index: -1;

      &:checked ~ label {
        transition: 0.4s;
        color: #1538ff;
      }

      &:checked ~ .border {
        transition: 0.4s;
        border: 2px solid #1538ff;
      }
    }
  }
}

.allreviews {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
}

.qwes {
  h1 {
    text-transform: capitalize;
  }
}

.reviews {
  min-height: 65vh;
  width: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0;

  h2 {
    height: 40px;
  }

  .postreview {
    width: 100%;
    display: grid;
    place-items: center;

    form {
      border-radius: 15px;
      display: flex;
      gap: 20px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 500px;
      padding: 20px 0;
      border: 3px solid;

      .Title {
        width: 85%;
        display: flex;
        align-items: flex-start;
        flex-direction: column;

        input {
          height: 35px;
          border: 2px solid #333;
          padding: 0 5px;
          border-radius: 10px;
          width: 100%;
        }
      }
      .comment {
        width: 85%;
        display: flex;
        align-items: flex-start;
        flex-direction: column;

        textarea {
          border: 2px solid #333;
          border-radius: 10px;
          width: 100%;
          padding: 5px 10px;
        }
      }

      .emoji {
        width: 95%;
        align-items: center;
        justify-content: space-between;
        display: flex;
        font-size: 35px;
        height: 60px;
        direction: rtl;

        .reactemoji {
          width: 100%;
          position: relative;

          label {
            cursor: pointer;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0.5;
            transition: 0.4s;
          }

          input {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;

            &:checked ~ label {
              opacity: 1;
            }
          }
        }
      }

      .reviewBTN {
        width: 85%;

        button {
          width: 100%;
          height: 30px;
          border-radius: 5px;
          background: #333;
          border: none;
          color: #fff;
          text-transform: uppercase;
          font-size: 15px;
          cursor: pointer;
          transition: 0.4s;

          &:hover {
            background: #1538ff;
          }
        }
      }
    }
  }
}

.comments {
  direction: ltr;
  margin: 20px 0;
  width: 350px;
  height: auto;
  display: grid;
  gap: 20px;
  border-radius: 22.5px 5px 5px 5px;
  padding: 0 5px;
  box-shadow: 0 0 2px 2px #3333334f;

  .commenthead {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    position: relative;
    border-bottom: 1px solid #3333334f;

    div {
      margin-left: 45px;
      text-transform: capitalize;
      display: flex;
      flex-direction: column;
    }

    .re {
      display: grid;
      place-items: center;
      margin: 0;
    }
  }
  .commentavatar {
    position: absolute;
    top: 0;
    left: -5px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    text-transform: uppercase;
    background: #333;
    color: #fff;
  }
  .commentbody {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;

    .comtitle {
      width: 100%;
      display: grid;
      place-items: center;
      transform: translateY(-15px);
      border-bottom: 1px solid #3333334f;
    }

    .com {
      width: 100%;
      display: grid;
      place-items: center;
    }
  }
}

@media (max-width: 550px) {
  .postreview {
    form {
      width: 450px !important;
    }
  }
}

@media (max-width: 450px) {
  .postreview {
    form {
      width: 400px !important;
    }
  }
}

@media (max-width: 400px) {
  .postreview {
    form {
      width: 350px !important;
    }
  }
}

@media (max-width: 350px) {
  .postreview {
    form {
      width: 300px !important;
    }
  }
}

@media (max-width: 300px) {
  .postreview {
    form {
      width: 280px !important;
    }
  }
}

.ProductPage {
  width: 100%;
  min-height: 100vh;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(2, 1fr);
  margin: 20px;
  gap: 30px;

  .PI {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;

    img {
      border-radius: 10px;
      box-shadow: 0 0 2px 3px #3333334f;
      width: 90%;
      aspect-ratio: 1;
    }
  }

  .PInfo {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;

    .PQ {
      width: 90%;
      aspect-ratio: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;

      div {
        width: 100%;
      }

      .Quantity {
        height: 50%;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: space-evenly;

        input {
          width: 300px;
          height: 35px;
          padding-left: 10px;
          border: 2px solid #1538ff;
          border-radius: 20px;
        }

        button {
          width: 300px;
          height: 35px;
          border-radius: 20px;
          background: #333;
          cursor: pointer;
          color: #fff;
          border: none;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          transition: 0.4s;
          text-transform: uppercase;
          font-size: 17px;

          &:hover {
            background: #1538ff;
          }

          i {
            font-size: 27px;
          }
        }
      }
    }
  }
}

@media (max-width: 780px) {
  .ProductPage {
    margin: 20px 0;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 1fr);
    .PInfo {
      .PQ {
        align-items: center;
        justify-content: space-evenly;

        .Quantity {
          align-items: center;
        }
      }
    }
  }
}
</style>

<style lang="css">
.Stars {
  display: flex;
  align-items: center;
  width: 95%;
  justify-content: space-evenly;
  font-size: 35px;
  position: relative;
  direction: rtl;
}

.Stars input {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
}

.Stars label {
  filter: grayscale(100%) opacity(0.7);
  cursor: pointer;
  z-index: 99;
  transition: 0.4s;
}

.Stars label:hover,
.Stars label:hover ~ label,
.Stars input:checked ~ label {
  filter: grayscale(0%) opacity(1);
}

.Tags {
  width: 100%;
  display: flex;
  align-items: center;
  margin: 10px 0;
  gap: 15px;
  flex-wrap: wrap;
  text-transform: uppercase;
}

.Tags a {
  background: #0440a882;
  color: #fff;
  padding: 5px 10px;
  border-radius: 50px;
  transition: 0.4s;
}

.Tags a:hover {
  background: #33333360;
}
</style>

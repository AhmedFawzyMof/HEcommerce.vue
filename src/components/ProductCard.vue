<template>
  <div class="PCard">
    <div class="Pimg">
      <router-link v-bind:to="product.get_absolute_url">
        <img :src="product.image" />
      </router-link>
    </div>
    <!--v-if="$store.state.lang"-->
    <div class="Pbody RTL" v-if="$store.state.Lang">
      <router-link v-bind:to="product.get_absolute_url">
        <h3>{{ product.nameAr }}</h3>
      </router-link>
      <p>{{ product.price }} ج.م</p>
    </div>
    <div class="Pbody" v-else>
      <router-link v-bind:to="product.get_absolute_url">
        <h3>{{ product.name }}</h3>
      </router-link>
      <p>{{ product.price }} EGP</p>
    </div>
    <div class="div"></div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: Object,
  },
};
</script>

<style lang="scss">
.RTL {
  direction: rtl;
}

.heart {
  position: absolute;
  top: 10px;
  right: 5px;
  width: 35px;
  height: 35px;
  border-radius: 50px;
  border: none;
  background: none;
  font-size: 30px;
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    color: red;
  }
}
.PCard {
  width: 250px;
  height: 290px;
  display: grid;
  place-items: center;
  grid-template-rows: repeat(2, 1fr);
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 2px 2px #3333334b;
  position: relative;

  .Pimg {
    width: 100%;
    height: 250px;
    display: grid;
    place-items: center;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .Pbody {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;

    a {
      text-decoration: none;
      color: black;
    }
  }
}
</style>

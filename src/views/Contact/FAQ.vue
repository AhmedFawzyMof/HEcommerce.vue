<template>
  <div class="Contact">
    <div class="FAQ RTL" v-if="$store.state.Lang">
      <div class="QA">
        <div id="Q">
          <label for="Radio" class="subtitle">1 Lorem ipsum dolor si?</label>
          <input type="radio" id="Radio" />
        </div>
        <p class="A">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
          incidunt temporibus in explicabo laudantium, adipisci, molestias natus
          minima, consequatur facilis iure soluta accusantium aspernatur velit
          rem deleniti? Maiores, assumenda voluptate?
        </p>
      </div>
      <div class="QA">
        <div id="Q">
          <label for="Radio2" class="subtitle">2 Lorem ipsum dolor si?</label>
          <input type="radio" id="Radio2" />
        </div>
        <p class="A">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
          incidunt temporibus in explicabo laudantium, adipisci, molestias natus
          minima, consequatur facilis iure soluta accusantium aspernatur velit
          rem deleniti? Maiores, assumenda voluptate?
        </p>
      </div>
      <div class="QA">
        <div id="Q">
          <label for="Radio3" class="subtitle">3 Lorem ipsum dolor si?</label>
          <input type="radio" id="Radio3" />
        </div>
        <p class="A">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
          incidunt temporibus in explicabo laudantium, adipisci, molestias natus
          minima, consequatur facilis iure soluta accusantium aspernatur velit
          rem deleniti? Maiores, assumenda voluptate?
        </p>
      </div>
      <div class="QA">
        <div id="Q">
          <label for="Radio4" class="subtitle">4 Lorem ipsum dolor si?</label>
          <input type="radio" id="Radio4" />
        </div>
        <p class="A">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
          incidunt temporibus in explicabo laudantium, adipisci, molestias natus
          minima, consequatur facilis iure soluta accusantium aspernatur velit
          rem deleniti? Maiores, assumenda voluptate?
        </p>
      </div>
    </div>
    <div class="FAQ" v-else>
      <div class="QA">
        <div id="Q">
          <label for="Radio" class="subtitle">1 Lorem ipsum dolor si?</label>
          <input type="radio" id="Radio" />
        </div>
        <p class="A">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
          incidunt temporibus in explicabo laudantium, adipisci, molestias natus
          minima, consequatur facilis iure soluta accusantium aspernatur velit
          rem deleniti? Maiores, assumenda voluptate?
        </p>
      </div>
      <div class="QA">
        <div id="Q">
          <label for="Radio2" class="subtitle">2 Lorem ipsum dolor si?</label>
          <input type="radio" id="Radio2" />
        </div>
        <p class="A">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
          incidunt temporibus in explicabo laudantium, adipisci, molestias natus
          minima, consequatur facilis iure soluta accusantium aspernatur velit
          rem deleniti? Maiores, assumenda voluptate?
        </p>
      </div>
      <div class="QA">
        <div id="Q">
          <label for="Radio3" class="subtitle">3 Lorem ipsum dolor si?</label>
          <input type="radio" id="Radio3" />
        </div>
        <p class="A">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
          incidunt temporibus in explicabo laudantium, adipisci, molestias natus
          minima, consequatur facilis iure soluta accusantium aspernatur velit
          rem deleniti? Maiores, assumenda voluptate?
        </p>
      </div>
      <div class="QA">
        <div id="Q">
          <label for="Radio4" class="subtitle">4 Lorem ipsum dolor si?</label>
          <input type="radio" id="Radio4" />
        </div>
        <p class="A">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
          incidunt temporibus in explicabo laudantium, adipisci, molestias natus
          minima, consequatur facilis iure soluta accusantium aspernatur velit
          rem deleniti? Maiores, assumenda voluptate?
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "FAQ",
  mounted() {
    if (this.$store.state.Lang) {
      document.title = "الأسئلة الشائعة | HEstore";
    } else {
      document.title = "FAQ | HEstore";
    }
  },
};
</script>
<style lang="scss">
.FAQ {
  margin: 20px 0;
  width: 550px;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-direction: column;
  transition: 0.5s;

  .QA {
    width: 100%;
    overflow: hidden;
    height: 50px;
    transition: 0.5s;

    .A {
      transition: 0.5s;
      padding: 10px 10px;
    }

    &:focus-within .A {
      background: #eee;
      transform: 0.5s;
    }
    &:focus-within {
      height: auto;
      transform: 0.5s;
    }

    #Q {
      width: 100%;
      height: 50px;
      display: grid;
      place-items: center;
      background: #eee;
      border-radius: 10px;
      transition: 0.5s;
      position: relative;

      &:focus-within {
        background: #333;
        border-radius: 10px 10px 0px 0px;
      }

      &:focus-within label {
        color: #fff;
      }

      label {
        height: 100%;
        display: grid;
        transform: translateY(10px);
        place-items: center;
        width: 100%;
        font-weight: 700;
        transition: 0.5s;
        cursor: pointer;
      }

      input {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
      }
    }
  }
}
@media (max-width: 550px) {
  .FAQ {
    width: 95%;
  }
}
</style>

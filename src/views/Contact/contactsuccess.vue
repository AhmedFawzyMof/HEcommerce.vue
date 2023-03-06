<template>
  <div class="successmessage" v-if="$store.state.Lang">
    <h1 class="title">شكرا لإتصالك بنا</h1>
    <h1 class="subtitle">سوف نتواصل معك في أقرب وقت ممكن</h1>
  </div>
  <div class="successmessage" v-else>
    <h1 class="title">thanks for contacting us</h1>
    <h1 class="subtitle">we will contact with you as soon as possible</h1>
  </div>
</template>
<script>
export default {
  name: "contactsuccess",
  mounted() {
    if (this.$store.state.Lang) {
      document.title = "تم إرسال الرسالة بنجاح | HEstore";
    } else {
      document.title = "the message sent successfully | HEstore";
    }
  },
};
</script>
<style>
.successmessage {
  width: 500px;
  background: #eee;
  padding: 30px 20px;
  border-radius: 5px;
  box-shadow: -2px 2px 3px 3px #33333369;
  display: grid;
  place-items: center;
  gap: 30px;
  text-transform: capitalize;
}

@media (max-width: 500px) {
  .successmessage {
    width: 95%;
  }
}
</style>

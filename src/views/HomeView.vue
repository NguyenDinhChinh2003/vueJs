<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

</script>
<template>
  <div class="container-fluid">
    <div class="bg-warning">
      <Header></Header>
    </div>
    <!-- <Main></Main> -->
    <div class="container">
      <!-- sử dụng router-view khai báo vùng nội dung động theo url -->
      <router-view></router-view>
    </div>
    <div class="bg-success">
      <Footer></Footer>
    </div>
  </div>
</template>
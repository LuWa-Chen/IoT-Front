<template>
  <header>
    <link rel="stylesheet" href="https://unpkg.com/swiper@7/swiper-bundle.min.css"/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Jost:wght@100;200;300;400;500;600;700;800;900&family=Open+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../assets/sea_css/index-style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <div class="navbar">
      <div class="left-sec">
        <ul class="pc-navbar-list">
          <router-link :to="{name:'GamePage'}"><li><a id="active" href="#">臻Game</a></li></router-link>
          <li><a href="#">FAQ & 帮助</a></li>
          <router-link :to="{name:'P_Register' }" v-if="this.$store.state.isUser!='Publisher'"><li><a href="#">加入我们</a></li></router-link>
        </ul>
      </div>
      <div class="right-sec">
        <i class="fas fa-globe" @click="ToAdmin"></i>
        <div class="sign" @click="ToLogin" v-if="this.$store.state.userID==''">
            <i class="fas fa-user"></i>
            <p>登录</p>
        </div>
          <p>{{this.$store.state.userName}}</p>
          <a href="#">客户端下载</a>

    </div>
  </header>
</template>

<script>
export default {
  name: "GamePageHeader",
  data(){
  		return {

  		}
  	},
  methods:{}
}
</script>

<style scoped>
@import "../assets/sea_css/index-style.css";

</style>

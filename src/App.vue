<template>
  <div>
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="navbar-header">
            <!-- <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button> -->
            <!-- <a class="navbar-brand" href=""> -->
            <!-- </a> -->
        <img class="logo" src="./assets/logo01.svg" >
        <img class="h1" src="./assets/h1.svg" >
      </div>
      <router-link to="/field">Field Page</router-link>
      <!-- <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav navbar-right nav-icons">
          <li>
            <a href=""><img src="./assets/field.svg">場域</a>
          </li>
        </ul>
      </div> -->
    </nav>
    <router-view></router-view>
    <!-- <router-view/> -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.logo {
    height: 82px;
    /* margin: 0 5px 0 25px; */
    /* padding-bottom: 7px; */
}

.h1 {
    height: 45px;
}

</style>

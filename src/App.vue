<template>
  <div id='app'>
    <nav class="navbar appNav">
      <div id='logoZone'>
            <!-- <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button> -->
            <!-- <a class="navbar-brand" href=""> -->
            <!-- </a> -->
        <router-link to="/"><img class="logo" src="./assets/logo01.svg" ></router-link>
        <img class="h1" src="./assets/h1.svg" >
      </div>
      <div>
        <!-- <button type="button" class="btn btn-light"><router-link to="/">Home</router-link></button> -->
        <router-link to="/fieldList"><img class="rightLink" src="./assets/field.svg" ></router-link>
        <!-- <router-link :to="{name:'modal'}"><img class="rightLink" src="./assets/alarm.svg" ></router-link> -->
        <!-- <button type="button" class="btn btn-light"><router-link to="/fieldList">FieldList</router-link></button> -->
      </div>
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
  name: 'App',
  image: { 'backgroundColor': 'rgb(19, 224, 163)' }
  // image: { backgroundImage: 'url()' }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* height: 5%; */
  color: #2c3e50;
  /* background-color: rgb(196, 228, 255); */
  padding: 0.1em;
  /* margin-top: 60px; */
}

#logoZone {
  display: inline-block;
}

.appNav {
  /* display:inline-block; */
  background-color: rgb(0, 163, 141);
}

.logo {
    height: 82px;
    /* margin: 0 5px 0 25px; */
    /* padding-bottom: 7px; */
}

.rightLink {
  height: 50px;
  width: auto;
  display: inline-block;
  /* margin: 0 auto 5px; */
}

.h1 {
  margin-top: 5px;
  height: 45px;
}

</style>

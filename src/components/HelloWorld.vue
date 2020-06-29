<template>
  <div id="hello">
  <!-- <div> -->
    <!-- <Modaldog v-if='show' :msg='msg' style='display:block' @close="show = false">
    </Modaldog>
    <button class='btn btn-danger' @click="show = true">CLICK</button> -->
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import EditFieldModal from './EditFieldModal'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your SON OAM',
      show: false
    }
  },
  components: {
    Modaldog: EditFieldModal
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* .hello {
  height: 100%;
} */
#hello {
  background-color: rgb(222, 255, 255);
  /* height: 100%; */
  height: 800px;
}

/* h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>

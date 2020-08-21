<template>
  <div id="hello">
    <!-- <div class="q-pa-md q-gutter-sm"> -->
    <q-btn color="white" text-color="black" label="Standard" />
    <q-btn color="primary" label="Primary" />
    <q-btn color="secondary" label="Secondary" />
    <q-btn color="amber" glossy label="Amber" />
    <q-btn color="brown-5" label="Brown 5" />
    <q-btn color="deep-orange" glossy label="Deep Orange" />
    <q-btn color="purple" label="Purple" />
    <q-btn color="black" label="Black" />
    <!-- </div> -->
  <!-- <div> -->
    <!-- <Modaldog v-if='show' :msg='msg' style='display:block' @close="show = false">
    </Modaldog>
    <button class='btn btn-danger' @click="show = true">CLICK</button> -->
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import EditFieldModal from './EditFieldModal'
import { QBtn } from 'quasar-framework/dist/quasar.mat.esm'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your SON OAM',
      show: false
    }
  },
  components: {
    Modaldog: EditFieldModal,
    QBtn
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
  height: 900px;
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

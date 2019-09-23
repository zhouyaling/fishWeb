<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body{
  margin: 0;
  padding: 0;
  background-color: #000!important;
}

html{
  font-size: 10px;
}


.page{
    min-width: 28rem;
    max-width: 117rem;
    background-color: #fff;
    margin: 0 auto;
    padding-bottom: 6rem;
}

.fr{
  float: right;
}

.margin-bottom-18{
  margin-bottom: 1.8rem;
}
</style>

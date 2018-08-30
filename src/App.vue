<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
}
</script>

<style>
a:hover {
  text-decoration: none !important;
  color: none !important;
}
html,
body {
  height: 100%;
  min-width: 1300px;
}
.container {
  max-width: 1800px;
}
#app {
  height: 100%;
  background: #eeeeee
}
@media screen and (min-width: 1200px) {
  .container {
    max-width: 2000px !important;
  }
}
/* @media (min-width: 1200px)
.container {
  max-width: 1140px;
} */
</style>

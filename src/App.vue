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
}
.container {
  max-width: 1800px;
}
#app {
  height: 100%;
  background: #eeeeee
}
/* @media (min-width: 1200px)
.container {
  max-width: 1140px;
} */
</style>

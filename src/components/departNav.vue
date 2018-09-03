<template>
<div class="departNav">
  <input type="date">
</div>
</template>

<script>
export default {
  name: 'departNav'
}
</script>

<style scoped>
input {
  border: 1px solid #4D90FE;
  border-radius: 5px;
}
input::-webkit-datetime-edit-text{
  color: #4D90FE; padding: 0.3em; 
}
input::-webkit-inner-spin-button{
  visibility: hidden;
}
input::-webkit-clear-button{
  display: none;
}
</style>

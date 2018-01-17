<template>
  <div class="display-4">
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'notfound',
  data () {
    return {
      msg: 'The Page you are looking for is not found!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  margin-top: 10%;
}
</style>

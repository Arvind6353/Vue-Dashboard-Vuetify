<template>
  <div class="display-4">
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'errordetail',
  data () {
    return {
      msg: 'Some Internal Server Error Occurred!'
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

<template>
  <div class="display-3">
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'errordetail',
  data () {
    return {
      msg: 'Internal Server Error Occurred!'
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

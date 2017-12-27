<template>
  <div class="header">header</div>
</template>

<script>
export default {
  mounted () {
    this.$http.get('/ratings')
    .then((res) => {
      console.log(res.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style lang="stylus" scoped>

</style>
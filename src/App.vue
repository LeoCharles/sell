<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
      <router-view></router-view>
  </div>
</template>

<script>
  import header from 'components/header/header'

  // easy-mock上的数据地址
  const baseUrl = 'https://www.easy-mock.com/mock/5a3cd49ae4ff93383f3b01d9/api'
  const ERR_OK = 0

  export default {
    name: 'app',
    data () {
      return {
        seller: {}
      }
    },
    components: {
      'v-header': header
    },
    created () {
      this.$http.get(baseUrl + '/seller')
        .then((res) => {
          if (res.data.erron === ERR_OK) {
            this.seller = res.data.seller
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
</script>

<style lang="stylus" scoped>
  @import './common/stylus/mixin.styl'

  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7, 17, 27, .1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
            color: rgb(240, 20, 20)
</style>

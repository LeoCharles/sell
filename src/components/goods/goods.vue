<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
          <span class="text border-1px">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper"></div>
  </div>
</template>

<script>
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: []
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']

      this.$http.get(this.serverPath + '/goods')
        .then((res) => {
          if (res.erron === this.ERR_OK) {
            this.goods = res.data.goods
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden

    // 左侧菜单
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background-color: #f3f5f7
      .menu-item
        display: table // 水平垂直居中
        width: 56px
        height: 54px
        padding: 0 12px
        line-height: 14px
        .icon
          display: inline-block
          width: 12px
          height: 12px
          margin-right: 2px
          vertical-align: top
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          border-1px(rgba(7, 17, 27, .1))
          vertical-align: middle
          font-size: 12px


    // 商品
    .foods-wrapper
      flex: 1


</style>
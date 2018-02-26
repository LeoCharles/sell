<template>
  <div class="goods">
    <!-- 左侧菜单 -->
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="{'current': currentIndex === index}" @click="selectMenu(index, $event)">
          <span class="text border-1px" ref="menuList">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
            </span>
        </li>
      </ul>
    </div>
    <!-- 右侧商品 -->
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li @click="selectFood(food, $event)" v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售 {{food.sellCount}} 份</span>
                  <span>好评率 {{food.rating}} %</span>
                </div>
                <div class="price">
                  <span class="now">&yen;{{food.price}}</span><span class="old" v-show="food.oldPrice">&yen;{{food.oldPrice}}</span>
                </div>
                <!-- 购物数量 -->
                <div class="cartcontrol-wrapper">
                  <cartcontrol @add="addFood" :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 购物车 -->
    <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    <!-- 商品详情 -->
    <food @add="addFood" :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import shopcart from 'components/shopcart/shopcart'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import food from 'components/food/food'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      shopcart,
      cartcontrol,
      food
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods () {
        let foods = []
        this.goods.forEach((itme) => {
          itme.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']

      this.$http.get(this.serverPath + '/goods')
        .then((res) => {
          if (res.erron === this.ERR_OK) {
            this.goods = res.data.goods
            // 获取数据，DOM更新后
            this.$nextTick(() => {
              // 初始化滚动
              this._initScroll()
              // 计算高度
              this._calculateHeight()
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    methods: {
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3,
          click: true
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight () {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      selectMenu (index, event) {
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      selectFood (food, event) {
        if (!event._constructed) {
          return
        }
        this.selectedFood = food
        this.$refs.food.show()
      },
      _drop (target) {
        // 优化体验，异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target)
        })
      },
      addFood (target) {
        this._drop(target)
      }
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
        display: table
        width: 56px
        height: 54px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          margin-top: -1px
          z-index: 9
          background-color: #fff
          font-weight: 700
          color: #07111b
          .text
            border-none()
        .text
          display: table-cell
          width: 56px
          border-1px(rgba(7, 17, 27, .1))
          vertical-align: middle
          font-size: 12px
          .icon
            display: inline-block
            width: 12px
            height: 12px
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
    
    // 右侧商品
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px;
        height: 26px
        line-height: 26px
        border-left 2px solid #d9dde1
        background-color: #f3f5f7
        font-size: 12px
        color: rgb(147, 153, 159)
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, .1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            margin-bottom: 8px
            line-height: 12px
          .extra
            .count
              margin-right: 12px
          .price
            line-height: 24px
            font-weight: 700
            .now
              font-size: 14px
              margin-right: 8px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          // 购物数量控件
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
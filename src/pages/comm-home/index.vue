<template>
  <div class="container">
    <div class="banner-pic-list">
      <el-carousel height="200px" indicator-position="none">
        <el-carousel-item v-for="(item, index) in picList" :key="index">
          <img :src="item.slideshowPath" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="module-title">热门商品</div>

    <ul class="comm-list">
      <li
        v-for="(item, index) in commList"
        :key="index"
        @click="toGoodsDetail(item)">
        <img :src="item.goodsImagePath" alt="">
        <div class="book-info">{{item.goodsName}}</div>
        <div>￥{{item.goodsPrice}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '@/api/comm-home.js'

export default {
  name: 'comm-home',
  data () {
    return {
      picList: [
        // '../../../static/assets/u159.jpg',
        // '../../../static/assets/u161.jpg',
        // '../../../static/assets/u157.jpg'
      ],
      commList: []
    }
  },
  mounted () {
    this.getPicListData()
    this.getHotCommListData()
  },
  methods: {
    getPicListData () {
      req('getPicList', {
      }).then(data => {
        console.log('picList:')
        console.log(data)
        this.picList = data.data.list
      })
    },
    getHotCommListData () {
      req('getHotCommList', {
      }).then(data => {
        console.log(data)
        this.commList = data.data.list
      })
    },
    toGoodsDetail (data) {
      // console.log('home data: ')
      // console.log(data)
      sessionStorage.setItem('selectComm', JSON.stringify(data))
      this.$router.push({path: '/comm-detail'})
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #ddd;
}

.el-carousel {
  .el-carousel__container {
    .el-carousel__item {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.module-title {
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #fff;
  background: #ddd;
  margin-top: 10px;
}

.comm-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 10px;

  li {
    position: relative;
    width: 48%;
    background: #fff;
    padding: 10px;
    box-sizing: border-box;
    margin: 0 auto 10px;
    border-radius: 10px;

    img {
      width: 100%;
    }

    div:nth-child(2) {
      font-size: 12px;
      padding-left: 10px;
    }

    div:nth-child(3) {
      font-size: 12px;
      text-align: center;
      margin-top: 10px;
      color: red;
    }
  }

  li:last-child {
    margin-left: 4px;
  }
}
</style>

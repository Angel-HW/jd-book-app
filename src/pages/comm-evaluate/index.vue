<template>
  <div class="container">
     <div class="evaluate-title">
      <span :class="{active: evaluateBtnType === 'all'}" @click="getGoodsEvaluateData('', 'all')">全部评价</span>
      <span :class="{active: evaluateBtnType === 'perfect'}" @click="getGoodsEvaluateData('5', 'perfect')">好评</span>
      <span :class="{active: evaluateBtnType === 'good'}" @click="getGoodsEvaluateData('3', 'good')">中评</span>
      <span :class="{active: evaluateBtnType === 'differ'}" @click="getGoodsEvaluateData('1', 'differ')">差评</span>
    </div>

    <ul class="evaluate-list">
      <li v-for="(item, index) in list" :key="index">
        <!-- <div class="head-pic">
          <img src="../../assets/head_pic.png" alt="">
        </div> -->

        <div class="content">
          <div class="title">
            <div class="user-info">
              <div class="name">{{item.userAcct}}</div>
              <div class="date">{{item.createTime}}</div>
            </div>

            <div
              class="star"
              :style="{backgroundPosition: `${90 - item.evaluateScore*18}px 0`}">
            </div>
          </div>
          <div class="msg">{{item.evaluateContent}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import req from '@/api/comm-evaluate.js'

export default {
  name: 'comm-evaluate',
  data () {
    return {
      list: [],
      evaluateBtnType: 'all'
    }
  },
  mounted () {
    this.getGoodsEvaluateData('', 'all')
  },
  methods: {
    // 查询商品评价
    getGoodsEvaluateData (score = '', type) {
      this.evaluateBtnType = type
      let commData = JSON.parse(sessionStorage.getItem('selectComm'))
      let data = {
        goodsId: commData.goodsId,
        evaluateScore: score,
        pageSize: 100,
        pageNum: 1
      }
      if (!score) {
        delete data.evaluateScore
      }
      req('getEvaluates', {
        ...data
      }).then(data => {
        console.log(data)
        if (data.code === 0) {
          this.list = data.data.list
        } else {
          this.$message.info(data.msg)
          this.list = []
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #ddd;
  padding-bottom: 15px;
  box-sizing: border-box;
  .evaluate-title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    box-sizing: border-box;

    span {
      padding: 0 10px;
    }

    .active {
      color: #C39862;
      font-size: 20px;
    }
  }

  .evaluate-list {
    width: 95%;
    background: #fff;
    margin: 0 auto;
    border-radius: 10px;

    li {
      display: flex;

      // .head-pic {
      //   width: 50px;
      //   height: 50px;
      //   padding: 10px;

      //   img {
      //     width: 100%;
      //     height: 100%;
      //   }
      // }

      .content {
        flex: 1;
        padding: 10px;

        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 60px;

          .user-info {
            .date {
              color: #ddd;
              font-size: 14px;
            }
          }

          .star {
            width: 90px;
            height: 18px;
            background-image: url('../../assets/stars.png');
            background-position: 0 0;
            background-repeat: no-repeat;
          }
        }
      }
    }
  }
}
</style>

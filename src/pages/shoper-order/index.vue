<template>
  <div class="container">
    <div class="leader">
			<ul>
				<li :class="{active: this.orderType === 'all'}" @click="getShoperOrderListData('', 'all')">全部订单</li>
				<li :class="{active: this.orderType === 'payed'}" @click="getShoperOrderListData(1, 'payed')">已付款</li>
				<li :class="{active: this.orderType === 'pickup'}" @click="getShoperOrderListData(3, 'pickup')">待取货</li>
				<li :class="{active: this.orderType === 'confirm'}" @click="getShoperOrderListData(5, 'confirm')">已完成</li>
			</ul>
    </div>
    <div class="order-item" v-for="item of list" :key="item.orderId" @click="toPage(item)">
			<div class="item-top">
				<img src="../../assets/我的订单.png" alt="">
				<span>{{item.orderId}}</span>
				<span>
					{{
						item.orderStateId === 1 ? '已下单' :
						item.orderStateId === 2 ? '已取消' :
						item.orderStateId === 3 ? '已到货' :
						item.orderStateId === 4 ? '已取货' :
						item.orderStateId === 5 ? '已完成未评价' :
						'已完成已评价'
					}}
				</span>
			</div>
			<div class="item-center" v-for="(childItem, index) in item.goodsList" :key="index">
				<div class="img-con">
					<img :src="childItem.goodsImagePath" alt="">
				</div>
				<div class="text">
					<div class="text-con">
						{{childItem.goodsName}}
					</div>
					<div class="props-con">
						{{childItem.goodsDescribe}}
					</div>
					<div class="price-con">
						<span>￥</span>
						<span>{{childItem.goodsPrice}} &nbsp;</span>
						<span>x{{childItem.cartGoodsCount}}</span>
					</div>
				</div>
			</div>
			<div class="item-bottom">
				<span>共{{item.orderAllGoodsCount}}件商品，合计￥</span>
				<span>{{item.orderAllCost}}</span>
			</div>
			<!-- 店长 -->
			<div class="item-more">
				<div
					class="btn"
					@click.stop="changeOrderStateData(item, 2)"
					v-show="item.orderStateId === 1 || item.orderStateId === 3">
					<span>取消订单</span>
				</div>
				<div class="btn" @click.stop="changeOrderStateData(item, 3)" v-show="item.orderStateId === 1">
					<span>确认到货</span>
				</div>
				<div class="btn" @click.stop="changeOrderStateData(item, 1)" v-show="item.orderStateId === 3">
					<span>取消到货</span>
				</div>
				<div class="btn" @click.stop="changeOrderStateData(item, 5)" v-show="item.orderStateId === 3">
					<span>确认取货</span>
				</div>
				<div class="btn" @click.stop="changeOrderStateData(item, 3)" v-show="item.orderStateId === 4">
					<span>取消取货</span>
				</div>
			</div>
    </div>
  </div>
</template>

<script>
import req from '@/api/shoper-order.js'
export default {
  name: 'order-list',
  data () {
    return {
      list: [],
			orderType: 'all'
    }
	},
	mounted () {
		this.getShoperOrderListData('', 'all')
	},
  methods: {
		// 获取订单列表
		getShoperOrderListData (orderStateId = '', type) {
			let data = {
        orderStateId: orderStateId,
        pageSize: 100,
        pageNum: 1
      }
      if (!orderStateId) {
        delete data.orderStateId
      }
      this.orderType = type
			req('getShoperOrderList', {
				...data
			}).then(data => {
				console.log(data)
				if (data.code === 0) {
					this.list = data.data
				} else {
					this.$message.info(data.msg)
				}
			})
		},
		// 修改订单状态
		changeOrderStateData (item, changeState) {
			req('changeOrderState', {
				orderId: item.orderId,
				orderStateId: changeState,
				version: item.version
			}).then(data => {
				console.log(data)
				if (data.code === 0) {
					this.$message.success(data.msg)
					this.getShoperOrderListData('', this.orderType)
				} else {
					this.$message.error(data.msg)
				}
			})
		},
		toPage (data) {
			this.$router.push({path: '/order-detail', query: data})
		},
		evaluate (data) {
			console.log(data)
			this.$router.push({path: '/order-evaluate'})
		}
  }
}
</script>

<style lang="scss" scoped>
.container {
	padding-bottom: 60px;
	box-sizing: border-box;
}
.leader {
	height: 64px;
	width: 100%;
	ul {
		height: 100%;
		padding: 0 0 0 2.5%;
		margin: 0;
		display: flex;
		li {
			line-height: 64px;
			padding: 0;
			margin: 0;
			list-style: none;
			padding: 0 13px;
			font-size: 15px;
		}
		.active {
			font-size: 17px;
			color: rgb(195,152,98);
		}
	}
}
.order-item {
	width: 95%;
	margin: 0 auto 12px;
	background-color: white;
	border-radius: 8px;
	padding: 10px 15px;
	box-sizing: border-box;
	.item-top {
		width: 100%;
		display: flex;
		align-items: center;
		position: relative;
		img {
			width: 13px;
			height: 16px;
		}
		span:nth-child(2) {
			font-size: 16px;
			flex: 1;
			line-height: 38px;
			position: relative;
			left: 8px;
		}
		span:nth-child(3) {
			position: absolute;
			right: 0;
			font-size: 13px;
			color: rgb(195,152,98);
		}
	}
	.item-center {
		width: 100%;
		display: flex;
		box-sizing: border-box;
		padding-top: 5px;
		.img-con {
			flex: 1;
			text-align: center;
			img {
				width: 84px;
			}
		}
		.text {
			flex: 2.2;
			.text-con {
				font-size: 15px;
				line-height: 22px;
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.props-con {
				font-size: 13.5px;
				line-height: 26px;
				color: rgb(168,168,168);
			}
			.price-con {
				text-align: right;
				line-height: 26px;
				span:nth-child(1) {
					font-size: 11px;
					color: rgb(242,0,0);
				}
				span:nth-child(2) {
					font-size: 16px;
					color: rgb(242,0,0);
				}
				span:nth-child(3) {
					font-size: 11px;
					color: rgb(168,168,168);
				}
			}
		}
	}
	.item-bottom {
		width: 100%;
		line-height: 40px;
		text-align: right;
		padding-top: 5px;
		span:nth-child(1) {
			font-size: 15px;
		}
		span:nth-child(2) {
			font-size: 20px;
		}
	}
	.item-more {
		width: 100%;
		display: flex;
		.btn {
			width: 92px;
			height: 28px;
			border-radius: 20px;
			position: relative;
			border: 1.5px solid rgb(195,152,98);
			margin-left: auto;
			margin-top: 10px;
			margin-bottom: 6px;
			span {
				font-size: 15px;
				position: absolute;
				top: 50%;
				left: 50%;
				margin-top: -10.4px;
				margin-left: -25px;
				color: rgb(195,152,98);
			}
		}
	}
}
</style>

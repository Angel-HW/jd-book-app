import req from '../fetch/index.js'

const config = {
  // portExport: {
  //   url: '/api/media/stimulate/exportExcel',
  //   method: 'post',
  //   fileConfig: {
  //     type: 'file',
  //     fileName: '销售激励报表'
  //   }
  // },
  getCommDetail: {
    url: '/app/clientGoods/getGoods',
    method: 'post'
  }, 
  // 查询评价
  getEvaluates: {
    url: '/app/clientGoods/listGoodsEvaluates',
    method: 'post'
  },
  // 加入购物车
  addShopCar: {
    url: '/app/clientShopCart/addShoppingCart',
    method: 'post'
  },
  // 立即购买
  payNow: {
    url: '/app/clientOrder/addOrder',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request

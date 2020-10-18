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
  // 获取购物车列表
  getShopCar: {
    url: '/app/clientShopCart/listShoppingCarts',
    method: 'post'
  },
  // 删除
  deleteShopCar: {
    url: '/app/clientShopCart/deleteShoppingCart',
    method: 'post'
  },
  // 结算/新增订单
  addOrder: {
    url: '/app/clientOrder/addOrder',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request

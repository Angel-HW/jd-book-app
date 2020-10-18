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
  // 客户订单详情
  getOrderDetail: {
    url: '/app/clientOrder/listOrderDeepen',
    method: 'post'
  },
  // 店长订单详情
  getShoperOrderDetail: {
    url: '/app/managerOrder/listManagerOrderDeepen',
    method: 'post'
  },
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request

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
  // 获取一级分类
  getOneClassify: {
    url: '/app/clientGoods/listOneGoodsClassify',
    method: 'post'
  },
  // 获取二级分类
  getTwoClassify: {
    url: '/app/clientGoods/listGetClassGoods',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request

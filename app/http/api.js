export default {
  // 自由交易首页列表
  freeTradeIndex: {
    url: '/free/index',
    initParams: {
      limit: 10,
      image_size_times: 0.5,
    },
  },
  // 活动通知列表
  activityNotice: {
    url: '/notice/notice_list',
    initParams: {
      limit: 10,
      image_size_times: 0.35,
    },
  },
  // 自由交易某商品价格列表
  freeTradeGoodsPrice: {
    url: '/free/info',
    initParams: {
      limit: 10,
    },
  },
  // 自由交易商品鞋码
  freeTradeGoodsSizes: {
    url: '/free/goods_size',
  },
  // 自由交易某商品详情图
  freeTradeGoodsDetail: {
    url: '/goods/goods_image',
    initParams: {
      image_size_times: 1,
    },
  },
  // 自由交易某商品详情图
  freeTradeHistory: {
    url: '/free/free_historic',
  },
  // 自由交易发布列表
  freeTradePublishList: {
    url: '/goods/goods_list',
    initParams: {
      limit: 10,
      image_size_times: 0.5,
    },
  },
};

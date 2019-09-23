export default {
  // 配置参数
  appOptions: {
    url: '/user/get_constant',
  },

  // 自由交易首页列表
  freeTradeIndex: {
    url: '/free/index',
    initParams: {
      limit: 10,
      image_size_times: 0.5,
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
  // 自由交易某商品交易历史
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
  // 自由交易商品购买详情
  freeTradeBuyInfo: {
    url: '/free/free_trade_info',
  },
  // 自由交易卖家还在卖列表
  freeTradeUserRecommend: {
    url: '/free/get_user_goods',
    initParams: {
      image_size_times: 0.5,
    },
  },
  // 自由交易下单
  freeTradeToOrder: { url: '/order/do_buy_free' },


  // 活动通知列表
  activityNotice: {
    url: '/notice/notice_list',
    initParams: {
      limit: 10,
      image_size_times: 0.35,
    },
  },
  // 用户消息列表
  noticeMessage: {
    url: '/message/message_list',
    initParams: {
      limit: 10,
    },
  },


  // 我的库房列表
  warehouse: {
    url: '/order/order_goods_list',
    initParams: {
      limit: 10,
      image_size_times: 0.35,
      goods_status: 1,
    },
  },
  // 已出库列表
  sendOut: {
    url: '/order/order_goods_list',
    initParams: {
      limit: 10,
      image_size_times: 0.35,
      goods_status: 2,
    },
  },
  // 未完成列表
  uncomplete: {
    url: '/order/order_list',
    initParams: {
      limit: 10,
      image_size_times: 0.35,
      status: 0,
    },
  },
  // 库房商品上架
  warehousePutOnSale: { url: '/free/release_goods' },
  // 我的商品销售中的列表
  goodsOnSale: {
    url: '/free/goods_list',
    initParams: {
      limit: 10,
      image_size_times: 0.35,
      status: 0,
    },
  },
  // 我的商品销售中的列表
  goodsSelled: {
    url: '/free/goods_list',
    initParams: {
      limit: 10,
      image_size_times: 0.35,
      status: 1,
    },
  },


  // 余额流水明细
  balanceDetail: {
    url: '/user/user_balance',
    initParams: {
      limit: 10,
    },
  },


  getShoeSizeList: { url: '/free/get_all_size' },
  getMissionPrice: { url: '/order/do_add_free_trade' },
};

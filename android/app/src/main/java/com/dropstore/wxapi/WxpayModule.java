package com.dropstore.wxapi;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.tencent.mm.opensdk.modelpay.PayReq;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;

/**
 * 微信支付
 */
class WxpayModule extends ReactContextBaseJavaModule {

    private IWXAPI api;
    static String APP_ID = "";
    static Promise promise = null;

    WxpayModule(ReactApplicationContext reactContext) {
        super(reactContext);
        api = WXAPIFactory.createWXAPI(reactContext, null);
    }

    @Override
    public String getName() {
        return "Wxpay";
    }

    /**
     * 向微信注册
     *
     * @param APP_ID
     */
    @ReactMethod
    public void registerApp(String APP_ID) {
        WxpayModule.APP_ID = APP_ID;
        api.registerApp(APP_ID);
    }

    /**
     * 支付
     *
     * @param order   支付信息
     * @param promise
     */
    @ReactMethod
    public void pay(final ReadableMap order, Promise promise) {
        WxpayModule.promise = promise;
        PayReq request = new PayReq();
        if (order.hasKey("appid")) {
            request.appId = order.getString("appid");
        }
        if (order.hasKey("partnerid")) {
            request.appId = order.getString("partnerid");
        }
        if (order.hasKey("prepayid")) {
            request.appId = order.getString("prepayid");
        }
        if (order.hasKey("package")) {
            request.appId = order.getString("package");
        }
        if (order.hasKey("noncestr")) {
            request.appId = order.getString("noncestr");
        }
        if (order.hasKey("timestamp")) {
            request.appId = order.getString("timestamp");
        }
        if (order.hasKey("sign")) {
            request.appId = order.getString("sign");
        }
        api.sendReq(request);
    }

    /**
     * 判断是否支持微信
     *
     * @param promise
     */
    @ReactMethod
    public void isSupported(Promise promise) {
        boolean isSupported = api.isWXAppInstalled();
        promise.resolve(isSupported);
    }
}
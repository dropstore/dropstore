package com.dropstore;

import android.app.Application;

import com.dropstore.aliay.AlipayModuleReactPackage;
import com.dropstore.wxapi.WxpayPackage;
import com.facebook.react.ReactApplication;
import ca.jaysoo.extradimensions.ExtraDimensionsPackage;
import com.RNTextInputMask.RNTextInputMaskPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.example.qiepeipei.react_native_clear_cache.ClearCachePackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactnativecommunity.netinfo.NetInfoPackage;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

import com.BV.LinearGradient.LinearGradientPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.dropstore.share.RNUMConfigure;
import com.umeng.commonsdk.UMConfigure;
import com.umeng.socialize.PlatformConfig;
import com.dropstore.share.DplusReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new ExtraDimensionsPackage(),
            new RNTextInputMaskPackage(),
            new PickerPackage(),
            new ClearCachePackage(),
            new RNCWebViewPackage(),
                    new AsyncStoragePackage(),
                    new NetInfoPackage(),
                    new SplashScreenReactPackage(),
                    new LinearGradientPackage(),
                    new FastImageViewPackage(),
                    new RNGestureHandlerPackage(),
                    new ReanimatedPackage(),
                    new WxpayPackage(),
                    new AlipayModuleReactPackage(),
                    new DplusReactPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        RNUMConfigure.init(this, "5d53936f3fc19594650009c5", "Umeng", UMConfigure.DEVICE_TYPE_PHONE, "");
        // 配置平台key、secret信息
        PlatformConfig.setWeixin("wx4def04c004d5c07d", "de810c561534f71384850e79a7455ecb");
        PlatformConfig.setQQZone("110xxxxxx59", "3JjbG8aXxxxxsV");
        PlatformConfig.setSinaWeibo("27xxxxxxx964", "fac50980a44e3e3afdxxxa572887", "http://sns.whalecloud.com");
    }
}

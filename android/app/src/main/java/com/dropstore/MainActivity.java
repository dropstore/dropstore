package com.dropstore;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import org.devio.rn.splashscreen.SplashScreen;
import com.dropstore.share.ShareModule;
// import android.os.Build;
// import android.view.View;

public class MainActivity extends ReactActivity {
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "dropstore";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // if (Build.VERSION.SDK_INT > 11 && Build.VERSION.SDK_INT < 19) { // lower api
        //     View v = this.getWindow().getDecorView();
        //     v.setSystemUiVisibility(View.GONE);
        // } else if (Build.VERSION.SDK_INT >= 19) {
        //     //for new api versions.
        //     View decorView = getWindow().getDecorView();
        //     int uiOptions = View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
        //                     | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_FULLSCREEN;
        //     decorView.setSystemUiVisibility(uiOptions);
        // }
        SplashScreen.show(this, R.style.SplashScreenTheme);  // 启动页
        super.onCreate(savedInstanceState);
        ShareModule.initSocialSDK(this);
    }
}

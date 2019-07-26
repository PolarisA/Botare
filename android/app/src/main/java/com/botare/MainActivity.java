package com.botare;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.tencent.android.tpush.XGPushConfig;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Botare";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        XGPushConfig.enableDebug(this, true);

    }
}

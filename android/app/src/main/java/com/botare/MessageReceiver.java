package com.botare;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.tencent.android.tpush.XGPushBaseReceiver;
import com.tencent.android.tpush.XGPushClickedResult;
import com.tencent.android.tpush.XGPushRegisterResult;
import com.tencent.android.tpush.XGPushShowedResult;
import com.tencent.android.tpush.XGPushTextMessage;

public class MessageReceiver extends XGPushBaseReceiver {
    @Override
    public void onRegisterResult(Context context, int i, XGPushRegisterResult xgPushRegisterResult) {
        Log.d("XgMessageReceiver", "xgPushRegisterResult=" + xgPushRegisterResult);
    }

    @Override
    public void onUnregisterResult(Context context, int i) {

    }

    @Override
    public void onSetTagResult(Context context, int code, String tagName) {
        if (context == null) {
            return;
        }

        Log.d("XINGE", "[XINGE] onSetTagResult " + code + " " + tagName);

        Intent intent = new Intent(Constant.ACTION_BIND_TAGS);
        intent.putExtra("code", code);
        context.sendBroadcast(intent);
    }

    @Override
    public void onDeleteTagResult(Context context, int code, String tagName) {
        if (context == null) {
            return;
        }

        Log.d("XINGE", "[XINGE] onDeleteTagResult " + code + " " + tagName);

        Intent intent = new Intent(Constant.ACTION_UNBIND_TAGS);
        intent.putExtra("code", code);
        context.sendBroadcast(intent);
    }

    @Override
    public void onTextMessage(Context context, XGPushTextMessage message) {
        if (context == null) {
            return;
        }

        Log.d("XINGE", "[XINGE] onTextMessage " + message.toString());

        //构造消息，显示在自定义通知栏
//        XGLocalMessage msg = new XGLocalMessage();
//        msg.setTitle("信鸽推送");
//        msg.setContent(message.getTitle());
//        initCustomPushNotificationBuilder(context, msg);


        Intent intent = new Intent(Constant.ACTION_MESSAGE);

        String customContent = message.getCustomContent();
        if (customContent == null || customContent.isEmpty()) {
            // 某些第三方厂商会忽略自定义参数，因此用 content 做降级
            String content = message.getContent();
            // 如果 content 是个 json，就用他代替 customContent
            if (content != null && content.startsWith("{") && content.endsWith("}")) {
                customContent = content;

                // 华为会多加一层 content
                String prefix = "{\"content\":\"";
                String suffix = "\"}";

                if (customContent.startsWith(prefix)
                        && customContent.endsWith(suffix)
                ) {
                    customContent = customContent.substring(prefix.length(), customContent.length() - suffix.length());
                }

                customContent = customContent.replaceAll("\\\\\"", "\"");
            }
        }

        intent.putExtra("customContent", customContent == null ? "" : customContent);

        context.sendBroadcast(intent);
    }

//    @SuppressWarnings("unused")
//    private void initCustomPushNotificationBuilder(Context context, XGLocalMessage msg) {
//        XGCustomPushNotificationBuilder build = new XGCustomPushNotificationBuilder();
//        build.setSound(
//                RingtoneManager.getActualDefaultRingtoneUri(
//                        // 设置声音
//                        ProjectApplication.getApplication(), RingtoneManager.TYPE_ALARM))
////                        Application.getProcessName(), RingtoneManager.TYPE_ALARM))
//                // setSound(
//                // Uri.parse("android.resource://" + getPackageName()
//                // + "/" + R.raw.wind)) 设定Raw下指定声音文件
//                .setDefaults(Notification.DEFAULT_VIBRATE) // 振动
//                .setFlags(Notification.FLAG_NO_CLEAR); // 是否可清除
//        // 设置自定义通知layout,通知背景等可以在layout里设置
//        build.setLayoutId(R.layout.layout_notification);
//        // 设置自定义通知内容id
//        build.setLayoutTextId(R.id.content);
//        // 设置自定义通知标题id
//        build.setLayoutTitleId(R.id.title);
//        // 设置自定义通知图片id
//        build.setLayoutIconId(R.id.icon);
//        // 设置自定义通知图片资源
//        build.setLayoutIconDrawableId(R.drawable.logo);
//        // 设置状态栏的通知小图标
//        build.setIcon(R.drawable.right);
//        // 设置时间id
//        build.setLayoutTimeId(R.id.time);
//        // 若不设定以上自定义layout，又想简单指定通知栏图片资源
//        // build.setNotificationLargeIcon(R.drawable.ic_action_search);
//        // 客户端保存build_id
//        XGPushManager.setPushNotificationBuilder(ProjectApplication.getApplication(), 1, build);
//
//        XGPushManager.addLocalNotification(context, msg);
//    }

    @Override
    public void onNotifactionClickedResult(Context context, XGPushClickedResult result) {
        if (context == null) {
            return;
        }

        Log.d("XINGE", "[XINGE] onNotifactionClickedResult " + result.toString());

        Intent intent = new Intent(Constant.ACTION_NOTIFICATION);
        String title = result.getTitle();
        String content = result.getContent();
        String customContent = result.getCustomContent();

        intent.putExtra("title", title == null ? "" : title);
        intent.putExtra("content", content == null ? "" : content);
        intent.putExtra("customContent", customContent == null ? "" : customContent);

        long actionType = result.getActionType();
        if (actionType == XGPushClickedResult.NOTIFACTION_CLICKED_TYPE) {
            intent.putExtra("clicked", true);
        }
        if (actionType == XGPushClickedResult.NOTIFACTION_DELETED_TYPE) {
            intent.putExtra("deleted", true);
        }

        context.sendBroadcast(intent);
    }

    @Override
    public void onNotifactionShowedResult(Context context, XGPushShowedResult result) {
        if (context == null) {
            return;
        }

        Log.d("XINGE", "[XINGE] onNotifactionShowedResult " + result.toString());

        Intent intent = new Intent(Constant.ACTION_NOTIFICATION);
        String title = result.getTitle();
        String content = result.getContent();
        String customContent = result.getCustomContent();

        intent.putExtra("title", title == null ? "" : title);
        intent.putExtra("content", content == null ? "" : content);
        intent.putExtra("customContent", customContent == null ? "" : customContent);

        intent.putExtra("presented", true);

        context.sendBroadcast(intent);
    }
}

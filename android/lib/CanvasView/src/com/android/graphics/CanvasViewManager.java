  
package com.android.graphics;



import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import android.graphics.RectF;
import com.facebook.react.uimanager.LayoutShadowNode;
import androidx.annotation.*;

import java.util.Map;

import com.android.graphics.CanvasViewShadowNode;
import static java.security.AccessController.getContext;

import com.android.graphics.CanvasView;
import com.android.graphics.OnResourceLoadedListener;

public class CanvasViewManager extends SimpleViewManager<CanvasView> {

    public static final String REACT_CLASS = "CanvasView";

    public static final int COMMAND_SET_RESOLUTION = 3;
    public static final int COMMAND_ADD_RESOURCES = 4;
    public static final int COMMAND_ADD_SPRITE = 5;
    public static final int COMMAND_ADD_FRAME_ITEM = 6;
    public static final int COMMAND_FLUSH = 7;

    @Override
    public String getName() {
        return REACT_CLASS;
    }


    @Override
    protected CanvasView createViewInstance(ThemedReactContext reactContext) {
        CanvasView canvasView = new CanvasView(reactContext);
        onReceiveNativeEvent(reactContext, canvasView);
        return canvasView;
    }

    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.<String, Object>builder()
                .put("onResourceLoaded",
                        MapBuilder.of("registrationName", "onResourceLoaded"))
                .build();
    }

    protected void onReceiveNativeEvent(final ThemedReactContext reactContext, final CanvasView canvasView){
        canvasView.setOnResourceLoadedListener(new OnResourceLoadedListener(){
            @Override
            public void onResourceLoaded(String id){
                WritableMap event = Arguments.createMap();
                event.putString("id", id);
                reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(canvasView.getId(), "onResourceLoaded", event);
            }
        });
    }

     @Override
     public Map<String, Integer> getCommandsMap() {
       // You need to implement this method and return a map with the readable
       // name and constant for each of your commands. The name you specify
       // here is what you'll later use to access it in react-native.
       return MapBuilder.of(
         "addResources", COMMAND_ADD_RESOURCES,
         "addSprite", COMMAND_ADD_SPRITE,
         "flush", COMMAND_FLUSH,
         "setResolution", COMMAND_SET_RESOLUTION,
         "addFrameItem", COMMAND_ADD_FRAME_ITEM
       );
     }

     @Override
     public void receiveCommand(final CanvasView root, int commandId, ReadableArray args) {
       // This will be called whenever a command is sent from react-native.
       switch (commandId) {
         case COMMAND_SET_RESOLUTION: {
            root.setResolution(args.getInt(0));
            break;
         }
         case COMMAND_ADD_RESOURCES: {
            root.addResources(args.getString(0), args.getString(1));
            break;
         }
         case COMMAND_ADD_SPRITE: {
            for(int i = 0; i < 6; i++){
                if(args.isNull(i)) return;
            }

            RectF bounds = new RectF(
                (float)args.getDouble(2),
                (float)args.getDouble(3),
                (float)args.getDouble(2) + (float)args.getDouble(4),
                (float)args.getDouble(3) + (float)args.getDouble(5)
            );
            root.addSprite(args.getString(0), args.getString(1), bounds);
            break;
         }
         case COMMAND_ADD_FRAME_ITEM: {
            root.addFrameItem(
                args.getString(0),
                args.getString(1),
                (float)args.getDouble(2),
                (float)args.getDouble(3)
            );
            break;
         }
         case COMMAND_FLUSH: {
            root.flush();
            break;
         }
       }
     }


      @Override
      public LayoutShadowNode createShadowNodeInstance() {
        return new CanvasViewShadowNode();
      }

      @Override
      public Class<LayoutShadowNode> getShadowNodeClass() {
        return LayoutShadowNode.class;
      }

}
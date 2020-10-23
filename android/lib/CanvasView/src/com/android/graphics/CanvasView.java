/**
 * CanvasView.java
 *
 * Copyright (c) 2014 Tomohiro IKEDA (Korilakkuma)
 * Released under the MIT license
 */

package com.android.graphics;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Bitmap.CompressFormat;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;

import android.graphics.Path;
import android.graphics.PathEffect;
import android.graphics.PorterDuff;
import android.graphics.BitmapFactory;
import android.graphics.PorterDuffXfermode;
import android.graphics.RectF;
import android.graphics.Rect;
import android.graphics.Region;
import android.graphics.Matrix;
import android.graphics.Typeface;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.View.MeasureSpec;
import android.util.Log;
import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.lang.String;
import android.os.AsyncTask;


import java.io.*;
import java.io.IOException;
import java.net.URL;
import java.net.MalformedURLException;
import java.net.HttpURLConnection;
import java.io.InputStream;
import java.lang.Exception;
import java.lang.ref.WeakReference;

import com.android.graphics.LoadBitmapAsync;
import com.android.graphics.CanvasResources;
import com.android.graphics.FrameItem;
import com.android.graphics.OnResourceLoadedListener;

public class CanvasView extends View {
    private Context context;
    private OnResourceLoadedListener onLoadedListener;

    private Map<String, CanvasResources> resources = new HashMap<>();
    private ArrayList<FrameItem> frameItems = new ArrayList<>();

    private float gridSize;
    private int width;
    private int height;

    /**
     * Copy Constructor
     *
     * @param context
     * @param attrs
     * @param defStyle
     */
    public CanvasView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }

    /**
     * Copy Constructor
     * 
     * @param context
     * @param attrs
     */
    public CanvasView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    /**
     * Copy Constructor
     * 
     * @param context
     */
    public CanvasView(Context context) {
        super(context);
    }

    public void setOnResourceLoadedListener(OnResourceLoadedListener listener){
        this.onLoadedListener = listener;
    }


    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);

        final int widthMode = MeasureSpec.getMode(widthMeasureSpec);
        final int heightMode = MeasureSpec.getMode(heightMeasureSpec);
        int widthSize = MeasureSpec.getSize(widthMeasureSpec);
        int heightSize = MeasureSpec.getSize(heightMeasureSpec);

        this.width = widthSize;
        this.height = heightSize;
        setMeasuredDimension(widthSize, heightSize);
    }

    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        this.width = w;
        this.height = h;
        super.onSizeChanged(w, h, oldw, oldh);
        this.invalidate();
    }

    private Rect fromRectF(RectF rectF){
        return new Rect(
            (int)rectF.left,
            (int)rectF.top,
            (int)rectF.right,
            (int)rectF.bottom
        );
    }

    /**
     * This method updates the instance of Canvas (View)
     *
     * @param canvas the new instance of Canvas
     */
    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        canvas.clipRect(0, 0, this.width, this.height);

        for(int i = 0 ; i < this.frameItems.size(); i++){
              FrameItem frameItem = this.frameItems.get(i);
              CanvasResources resource = this.resources.get(frameItem.getResourceName());
              Bitmap bitmap = resource.getSource();
              RectF srcBounds = frameItem.getPositionBounds();
              Rect dstBounds = this.fromRectF(resource.getSpriteBounds(frameItem.getSpriteName()));
              if(bitmap != null && srcBounds != null && dstBounds != null){
                 canvas.drawBitmap(bitmap, dstBounds,  srcBounds, null);
              }
        }
        this.frameItems.clear();
    }


    /**
    * Refresh canvas
    */
    public void flush(){
        this.invalidate();
    }

    /*
    * Add canvas resources
    * load them from uri
    *
    * @param name
    * @param uri
    */
    public void addResources(String name, String uri){
        this.loadResources(name, uri);
    }

    /*
    * Add sprite coordination on certain resources
    *
    * @param resourcesName
    * @param spriteName
    * @param bounds
    */
    public void addSprite(String resourcesName, String spriteName, RectF bounds){
        CanvasResources resource = this.resources.get(resourcesName);
        if(resource == null) {
            CanvasResources newResource = new CanvasResources(resourcesName);
            newResource.addSprite(spriteName, bounds);
            this.resources.put(resourcesName, newResource);
        } else {
            resource.addSprite(spriteName, bounds);
            this.resources.put(resourcesName, resource);
        }
    }

    /*
    * async load resources from give uri string
    *
    * @param name
    * @param uri
    */
    private void loadResources(String name, String uri){
        new LoadBitmapAsync(this, name).execute(uri);
    }

    /*
    * add bitmap to resources collection
    *
    * @param name
    * @param bitmap
    */
    public void setResourcesBitmap(String name, Bitmap bitmap){
        CanvasResources resource = this.resources.get(name);
        if(resource == null){
            this.resources.put(name, new CanvasResources(bitmap, name));
        } else {
            resource.setSource(bitmap);
            this.resources.put(name, resource);
        }
        if(this.onLoadedListener != null){
            this.onLoadedListener.onResourceLoaded(name);
        }
    }
    /*
    * set canvas grid resolution
    *
    * @param resolution
    */
    public void setResolution(int resolution){
        this.gridSize = Math.max(this.width, this.height) / resolution;
    }

    /*
    * add next rendered frame item. it will be drawn after next call flush method
    *
    * @param resourcesName
    * @param spriteName
    * @param x
    * @param y
    */
    public void addFrameItem(String resourcesName, String spriteName, float x, float y){
        RectF bounds = new RectF(
            x * this.gridSize,
            y * this.gridSize,
            (x + 1) * this.gridSize,
            (y + 1) * this.gridSize
        );
        this.frameItems.add(new FrameItem(resourcesName, spriteName, bounds));
    }
}

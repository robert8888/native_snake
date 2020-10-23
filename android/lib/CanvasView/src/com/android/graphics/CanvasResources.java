package com.android.graphics;

import android.graphics.Bitmap;
import android.graphics.Rect;
import android.graphics.RectF;
import java.util.Map;
import java.util.HashMap;
import java.lang.String;

public class CanvasResources {
    private Bitmap source;
    private Map<String, RectF> sprites = new HashMap<>();
    private String id = null;

    public CanvasResources(Bitmap bitmap){
        this.source = bitmap;
    }

    public CanvasResources(String id){
        this.id = id;
    }

    public CanvasResources(Bitmap bitmap, String id){
        this.id = id;
        this.source = bitmap;
    }

    public String getId(){
        return this.id;
    }

    public void addSprite(String name, RectF bounds){
        this.sprites.put(name, bounds);
    }

    public RectF getSpriteBounds(String name){
        return this.sprites.get(name);
    }

    public Bitmap getSource(){
        return this.source;
    }

    public void setSource(Bitmap source){
        this.source = source;
    }
}

package com.android.graphics;

import java.lang.String;
import android.graphics.RectF;

public class FrameItem {
    private String resourcesName;
    private String spriteName;
    private RectF positionBounds;

    public FrameItem(String resources, String sprite, RectF bounds){
        this.resourcesName = resources;
        this.spriteName = sprite;
        this.positionBounds = bounds;
    }

    public String getResourceName(){
        return this.resourcesName;
    }

    public String getSpriteName(){
        return this.spriteName;
    }

    public RectF getPositionBounds(){
        return this.positionBounds;
    }
}
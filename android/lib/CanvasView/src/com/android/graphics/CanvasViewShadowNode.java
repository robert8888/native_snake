package com.android.graphics;


import com.facebook.yoga.YogaMeasureFunction;
import com.facebook.yoga.YogaNode;
import com.facebook.yoga.YogaMeasureMode;
import com.facebook.yoga.YogaMeasureOutput;
import com.facebook.react.uimanager.LayoutShadowNode;

public class CanvasViewShadowNode extends LayoutShadowNode implements YogaMeasureFunction {
    public CanvasViewShadowNode() {
        this.setMeasureFunction(this);
    }

    @Override
    public long measure(
      YogaNode node,
      float width, YogaMeasureMode widthMode,
      float height, YogaMeasureMode heightMode) {
        return YogaMeasureOutput.make(0, 0);
    }
}
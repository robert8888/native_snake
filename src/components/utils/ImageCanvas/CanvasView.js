import {requireNativeComponent} from "react-native";

export default requireNativeComponent(`CanvasView`, null, {
    nativeOnly: {
        onResourceLoaded: true,
    },
});

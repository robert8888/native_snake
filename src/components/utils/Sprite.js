import React, {useEffect, useCallback, useRef} from "react";
import ImageCanvas from "./ImageCanvas/ImageCanvas";
import {Image as NativeImage} from "react-native";
import theme from "../../theme/theme";
import {inject} from "mobx-react";

const Sprite = inject("config")(({style, resource, sprite, config}) => {
    const spriteCanvas = useRef();

    const loadResource = useCallback(()=>{
        if(!spriteCanvas.current) return;
        spriteCanvas.current.setResolution(1);

        const src = theme[config.current.themeName].images[resource].source;
        const uri  = NativeImage.resolveAssetSource(src).uri;
        spriteCanvas.current.addResources(resource, uri)


        const bounds = theme[config.current.themeName].images[resource].sprite[sprite];
        spriteCanvas.current.addSprite(resource, sprite, Object.values(bounds))

    }, [spriteCanvas, resource, sprite])

    useEffect(()=>loadResource(), []);

    const refresh = useCallback(()=>{
        if(!spriteCanvas.current) return;
        spriteCanvas.current.addFrameItem(resource, sprite, 0, 0);
        spriteCanvas.current.flush();
    },[spriteCanvas, resource, sprite])

    const onResourceLoaded = useCallback(()=>{
        refresh();
    }, [refresh])


    return (
        <ImageCanvas ref={spriteCanvas} onLayout={refresh} containerStyle={style} onResourceLoaded={onResourceLoaded}/>
    )
})

export default Sprite;
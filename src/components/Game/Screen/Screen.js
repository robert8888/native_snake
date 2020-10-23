import React, {useRef, useEffect, useCallback, useState} from "react";
import Canvas from 'react-native-canvas';
import {View, Image as NativeImage} from "react-native";
import styleSheet from "./StyleSheet"
import useStyle from "../../../utils/useStyle";
import { observer  } from 'mobx-react-lite';
import useTerminalOrientation from "./useTerminalOrientation";
import useSegmentOrientation from "./useSegmentOrientation";
import {inject} from "mobx-react";
import theme from "../../../theme/theme";
import ImageCanvas from "../../utils/ImageCanvas/ImageCanvas";

const Screen = inject("config", "viewBus")(observer(({config, viewBus}) => {
    const styles = useStyle(styleSheet, config);

    const getTerminalOrientation = useTerminalOrientation(config);
    const getSegmentOrientation = useSegmentOrientation(config);

    const imageCanvas = useRef();
    const background = useRef();

    const [canvasSize, setCanvasSize] = useState(null);
    const [gridSize, setGridSize] = useState();

    useEffect(function addImageResource(){
        const images = theme[config.current.themeName].images;
        for(let name of ["snake", "bonuses"]){
            const uri  = NativeImage.resolveAssetSource(images[name].source).uri;
            imageCanvas.current.addResources(name, uri)
        }
    }, [config, imageCanvas])

    useEffect(function addSprites(){
        const images = theme[config.current.themeName].images;
        for(let resourceName of ["snake", "bonuses"]){
            const sprites = images[resourceName].sprite;
            for(let spriteName in sprites){
                const rect = sprites[spriteName]
                imageCanvas.current.addSprite(resourceName, spriteName, Object.values(rect))
            }
        }
    }, [config, imageCanvas])

    const updateCanvasSize = useCallback(event =>{
        const layout = event.nativeEvent.layout;
        const size = {
            width: layout.width,
            height: layout.height,
        }
        const gridSize = (Math.min(size.width, size.height) - 8)/ config.current.gameSize;
        setCanvasSize(size)
        setGridSize(gridSize);
        imageCanvas.current.setResolution(config.current.gameSize);
    }, [setCanvasSize, setGridSize, imageCanvas])

    const renderBackground = useCallback((ctx) => {
        ctx.fillStyle = theme[config.current.themeName].colors.backgroundGrid;
        for(let row = 0; row < config.current.gameSize; row ++){
            for(let col = row % 2; col < config.current.gameSize; col+= 2){
                ctx.rect(gridSize * col, gridSize * row, gridSize, gridSize);
            }
        }
        ctx.fill();
    }, [canvasSize, gridSize, config]);

    useEffect(()=>{
        if(!config.current.drawBackground || !background || !canvasSize) return;
        const ctx = background.current.getContext('2d');
        ctx.canvas.width = canvasSize.width;
        ctx.canvas.height = canvasSize.height;
        renderBackground(ctx);
    }, [config, renderBackground, canvasSize, background])

    const renderSnake = useCallback((snake)=>{
        if(!snake) return;

        for(let i = 0 ; i < snake.segments.length; i++){
            const current = snake.segments[i];
            let spriteName;
            if(i === 0){ // head
                const next = snake.segments[i + 1];
                const orientation = getTerminalOrientation(current, next)
                spriteName = "head" + orientation;
            } else if(i === snake.segments.length - 1){ //tail
                const prev = snake.segments[i - 1];
                const orientation = getTerminalOrientation(current, prev)
                spriteName = "tail" + orientation;
            } else { // body
                const prev = snake.segments[i - 1];
                const next = snake.segments[i + 1];
                const orientation = getSegmentOrientation(prev, current, next);
                spriteName = "segment" + orientation;
            }
            if(!spriteName) continue;
            imageCanvas.current.addFrameItem("snake", spriteName, current.x, current.y);
        }
    }, [gridSize, config, imageCanvas])

    const renderBonuses = useCallback((bonuses) => {
        if(!bonuses) return;
        for(let bonus of bonuses){
            imageCanvas.current.addFrameItem("bonuses", bonus.type, bonus.x, bonus.y);
        }
    }, [gridSize])

    const render = useCallback((view) => {
        renderSnake(view?.snake);
        renderBonuses(view?.bonuses);
        imageCanvas.current.flush()
    }, [renderSnake, renderBonuses])

    useEffect(()=>{
        viewBus.setUpdateCallback(render);
    }, [viewBus])

    return (
        <View style={styles.wrapper} onLayout={updateCanvasSize}>
            <Canvas ref={background} style={styles.backgroundCanvas}/>
            <ImageCanvas ref={imageCanvas} containerStyle={styles.imageCanvas}/>
        </View>
    )
}))

export default Screen

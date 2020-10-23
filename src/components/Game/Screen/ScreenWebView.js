import React, {useRef, useEffect, useCallback, useState} from "react";
import Canvas from 'react-native-canvas';
import Image from 'react-native-canvas/dist/Image';
import {View, Image as NativeImage} from "react-native";
import styleSheet from "./StyleSheet"
import useStyle from "../../../utils/useStyle";
import { observer  } from 'mobx-react-lite';
import useTerminalOrientation from "./useTerminalOrientation";
import useSegmentOrientation from "./useSegmentOrientation";
import {inject} from "mobx-react";
import theme from "../../../theme/theme";

const ScreenWebView = inject("config", "view")(observer(({config, view}) => {
    const styles = useStyle(styleSheet, config);
    const {data} = view;

    const getTerminalOrientation = useTerminalOrientation(config)
    const getSegmentOrientation = useSegmentOrientation(config)
    const main = useRef();
    const background = useRef();
    const [mainRenderContext, setMainRenderContext] = useState(null)
    const [canvasSize, setCanvasSize] = useState(null);
    const [gridSize, setGridSize] = useState();
    const [imageResources, setImageResources] = useState(null);

    useEffect(function loadImageResource(){
        if(!main) return;
        const images = theme[config.current.themeName].images;
        const loads = [];
        for(let name in images){
            const image = new Image(main.current, gridSize, gridSize);
            image.src = NativeImage.resolveAssetSource(images[name].source).uri;
            loads.push(new Promise((res, rej) => {
                image.addEventListener("load", () => {
                    res([name, image])
                })
                image.addEventListener("error", () => {
                    rej(name);
                })
            }))
        }
        Promise.all(loads).then(resources =>
            setImageResources(new Map(resources))
        )
    }, [config ,setImageResources, main])

    const updateCanvasSize = useCallback(event =>{
        const layout = event.nativeEvent.layout;
        const size = {
            width: layout.width,
            height: layout.height,
        }
        const gridSize = (Math.min(size.width, size.height) - 4)/ config.current.gameSize;
        setCanvasSize(size)
        setGridSize(gridSize);
    }, [setCanvasSize, setGridSize])

    const updateMainCanvasRef = useCallback((ref) =>{
        main.current = ref;
        if(!main.current || !canvasSize) return;
        const ctx = main.current.getContext('2d');
        ctx.canvas.width = canvasSize.width;
        ctx.canvas.height = canvasSize.height;
        setMainRenderContext(ctx);
    }, [main, setMainRenderContext, canvasSize])

    const renderBackground = useCallback((ctx) => {
        ctx.fillStyle = theme[config.current.themeName].colors.backgroundGrid;
        for(let row = 0; row < config.current.gameSize; row ++){
            for(let col = row % 2; col < config.current.gameSize; col+= 2){
                ctx.rect(gridSize * col, gridSize * row, gridSize, gridSize);
            }
        }
        ctx.fill();
    }, [canvasSize, gridSize, config, setGridSize]);

    useEffect(()=>{
        if(!config.current.drawBackground || !background || !canvasSize) return;
        const ctx = background.current.getContext('2d');
        ctx.canvas.width = canvasSize.width;
        ctx.canvas.height = canvasSize.height;
        renderBackground(ctx);
    }, [config, renderBackground, canvasSize, background])


    const renderSnake = useCallback((ctx, snake)=>{
        if(!snake) return;
        const sprite = theme[config.current.themeName].images.snake.sprite;

        for(let i = 0 ; i < snake.segments.length; i++){
            const current = snake.segments[i];
            let rect = null;
            if(i === 0){ // head
                const next = snake.segments[i + 1];
                const orientation = getTerminalOrientation(current, next)
                rect = sprite.head[orientation];
            } else if(i === snake.segments.length - 1){ //tail
                const prev = snake.segments[i - 1];
                const orientation = getTerminalOrientation(current, prev)
                rect = sprite.tail[orientation];
            } else { // body
                const prev = snake.segments[i - 1];
                const next = snake.segments[i + 1];
                const orientation = getSegmentOrientation(prev, current, next);
                rect = sprite.segments[orientation];
            }

            if(!rect) continue;

            ctx.drawImage(imageResources.get("snake"),
                rect.x,
                rect.y,
                rect.width,
                rect.height,
                snake.segments[i].x * gridSize,
                snake.segments[i].y * gridSize,
                gridSize,
                gridSize
            )
        }

    }, [gridSize, imageResources, config])

    const renderBonuses = useCallback((ctx, bonuses) => {
        if(!bonuses) return;
        const sprite = theme[config.current.themeName].images.bonuses.sprite;
        for(let bonus of bonuses){
            const rect = sprite[bonus.type]
            ctx.drawImage(imageResources.get("bonuses"),
                rect.x,
                rect.y,
                rect.width,
                rect.height,
                bonus.x * gridSize,
                bonus.y * gridSize,
                gridSize,
                gridSize
            )
        }
    }, [gridSize, imageResources])

    const clear = useCallback((ctx) => {
        ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    }, [canvasSize])

    const render = useCallback((ctx, view) => {
        if(!imageResources) return;
        clear(ctx);
        renderSnake(ctx, view?.snake);
        renderBonuses(ctx, view?.bonuses);
    }, [imageResources, renderSnake, renderBonuses, clear])

    useEffect(function renderNextFrame(){
        render(mainRenderContext, data);
    }, [data , render, mainRenderContext]);

    return (
        <View style={styles.wrapper} onLayout={updateCanvasSize}>
            <Canvas ref={background} style={{position: "absolute"}}/>
            <Canvas ref={updateMainCanvasRef} style={{position: "absolute"}}/>
        </View>
    )
}))

export default ScreenWebView

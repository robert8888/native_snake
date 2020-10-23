import React, { Component } from 'react';
import { UIManager, findNodeHandle, View, Image, NativeModules } from 'react-native';
import CanvasView from "./CanvasView";


class ImageCanvas extends Component {

    constructor(props) {
        super(props);
        this.canvas = React.createRef(null);
        this.props.forwardRef.current = {
            setResolution: this.setResolution.bind(this),
            addResources: this.addResources.bind(this),
            addSprite: this.addSprite.bind(this),
            addFrameItem: this.addFrameItem.bind(this),
            flush: this.flush.bind(this),
        }
    }

    setResolution(resolution){
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.canvas.current),
            UIManager.CanvasView.Commands.setResolution,
            [resolution]
        )
    }


    addResources(name, uri){
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.canvas.current),
            UIManager.CanvasView.Commands.addResources,
            [name, uri]
        )
    }

    addSprite(resource, name, bounds){
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.canvas.current),
            UIManager.CanvasView.Commands.addSprite,
            [resource, name, ...bounds]
        )
    }

    addFrameItem(resources, sprite, x, y){
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.canvas.current),
            UIManager.CanvasView.Commands.addFrameItem,
            [resources, sprite, x, y]
        )
    }

    flush(){
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.canvas.current),
            UIManager.CanvasView.Commands.flush,
            []
        )
    }

    _onResourceLoaded(event){
        if(!this.props.onResourceLoaded){
            return;
        }
        this.props.onResourceLoaded(event.nativeEvent)
    }

    render() {
        return (
            <View style={this.props.containerStyle} onLayout={this.props.onLayout}>
                 <CanvasView
                     ref={this.canvas}
                     style={{height: "100%", width: "100%"}}
                     onResourceLoaded={this._onResourceLoaded.bind(this)}/>
            </View>
        )
    }
}



export default React.forwardRef((props, ref) =>
        (<ImageCanvas forwardRef={ref} {...props}/>)
    )
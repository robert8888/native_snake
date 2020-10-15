import React, {useCallback} from "react";
import {
    View
} from "react-native";
import _styles from "./StyleSheet";
import Screen from "./Screen/Screen";
import useSnake from "../../engine/useSnake";
import StatusBar from "./StatusBar/StatusBar";
import Controls from "./Controls/Controls";
import useStyle from "../../utils/useStyle";
import Touchable from "../utils/Touchable";
import Paused from "./PopUps/Paused";
import GameOver from "./PopUps/GameOver";
import {inject} from "mobx-react";


const Game = inject("config", "view", "results", "playState")
(({view, config, results, playState }) => {
    const styles = useStyle(_styles, config);
    const [controller, gameState] = useSnake({
        configStore: config,
        playStateStore: playState,
        viewStore: view,
        resultsStore: results,
    });

    return (
        <View style={styles.container}>
            <StatusBar/>
            <Touchable onPress={controller.togglePause}>
                    <Screen/>
            </Touchable>
            <Controls controller={controller}/>
            <Paused styles={styles} controller={controller} data={gameState}/>
            <GameOver styles={styles} controller={controller} data={gameState}/>
        </View>
    )
})

export default Game;

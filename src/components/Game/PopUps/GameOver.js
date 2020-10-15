import React from "react";
import {Button, Overlay} from "react-native-elements";
import {Text, View} from "react-native";
import useTimeFormatter from "./../../../utils/useTimeFormatter"
import {observer} from "mobx-react-lite";
import {inject} from "mobx-react";

const GameOver = inject("results")(observer(({data: gameState, styles, controller, results }) => {
    const {secondsToStr} = useTimeFormatter();
    const {results: data} = results;

    return (
        <Overlay overlayStyle={styles.overlay} isVisible={gameState.over}>
            <>
                <View style={styles.section}>
                    <Text style={styles.title}>Game Over</Text>
                    <View style={styles.group}>
                        <Text style={styles.label}>score: </Text>
                        <Text style={styles.value}>{(data?.score || 0)}</Text>
                    </View>
                    <View style={styles.group}>
                        <Text style={styles.label}>level: </Text>
                        <Text style={styles.value}>{(data?.level || 0)}</Text>
                    </View>
                    <View style={styles.group}>
                        <Text style={styles.label}>time: </Text>
                        <Text style={styles.value}>{secondsToStr(data?.time || 0)}</Text>
                    </View>
                </View>
                <View style={{...styles.section, ...styles.sectionBottom}}>
                    <Button title="Restart" buttonStyle={styles.button} onPress={controller.restart}/>
                </View>
            </>
        </Overlay>
    )
}))

export default GameOver;
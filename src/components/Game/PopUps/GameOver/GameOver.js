import React, {useCallback} from "react";
import {Button, Overlay} from "react-native-elements";
import {Text, View} from "react-native";
import ResultItem from "./ResultItem/ResultItem";
import useTimeFormatter from "./../../../../utils/useTimeFormatter"
import {observer} from "mobx-react-lite";
import {inject} from "mobx-react";
import useStyle from "../../../../utils/useStyle";
import styleSheet from "./StyleSheet";
import Separator from "../../../utils/Separator";


const GameOver = inject("results", "config")(observer(({config, data: gameState, controller, results }) => {
    const styles = useStyle(styleSheet, config)
    const {secondsToStr} = useTimeFormatter();
    const {last, all} = results;

    return (
        <Overlay overlayStyle={styles.overlay} isVisible={gameState.over}>
            <>
                <View style={styles.section}>
                    <Text style={styles.title}>Game Over</Text>
                    <View style={styles.group}>
                        <Text style={styles.label}>score: </Text>
                        <Text style={styles.value}>{(last?.score || 0)}</Text>
                    </View>
                    <View style={styles.group}>
                        <Text style={styles.label}>level: </Text>
                        <Text style={styles.value}>{(last?.level || 0)}</Text>
                    </View>
                    <View style={styles.group}>
                        <Text style={styles.label}>time: </Text>
                        <Text style={styles.value}>{secondsToStr(last?.time || 0)}</Text>
                    </View>
                </View>
                <View style={{...styles.section, ...styles.sectionResults}}>
                    <Separator style={styles.separator}/>
                    {last && last.difficulty && all[last.difficulty] &&
                        all[last.difficulty].map((result, index) =>(
                            <ResultItem data={result} index={index + 1} current={result.id === last.id}/>
                    )) }
                </View>

                <View style={{...styles.section, ...styles.sectionBottom}}>
                    <Button title="Restart" buttonStyle={styles.button} onPress={controller.restart}/>
                </View>
            </>
        </Overlay>
    )
}))

export default GameOver;
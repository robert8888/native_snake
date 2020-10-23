import React, {useCallback, useRef} from "react";
import {View, Text} from "react-native";
import styleSheet from "./StyleSheet";
import useStyle from "../../../utils/useStyle";
import {observer} from "mobx-react-lite"
import {inject} from "mobx-react";
import Sprite from "./../../utils/Sprite";


const StatusBar = inject("playState", "config")(observer(({playState: state, config}) =>{
    const styles = useStyle(styleSheet, config);
    const heartCanvas = useRef();
    //const state = useGamePlayStore();

    const fillUpTo = useCallback((value, n = 5) => {
        if(value >= 0){
            value = value.toString();
            return value.padStart(n, "0");
        } else {
            value *= -1;
            value = value.toString();
            value = value.padStart(n - 1, "0");
            return "-" + value;
        }

    },[])

    return (
        <View style={styles.container}>
            <View style={styles.group}>
                <Text style={{...styles.score, ...styles.value}}>
                    {`Score: ${fillUpTo(state.score, 5)}`}
                </Text>
            </View>

            <View style={styles.group}>
                <Text style={styles.lives}>{state.lives}</Text>
                <Sprite style={styles.spriteImage} resource="bonuses" sprite="heart"/>
            </View>

            <View style={styles.group}>
                <Text style={styles.lives}>{state.diamonds}</Text>
                <Sprite style={styles.spriteImage} resource="bonuses" sprite="diamond"/>
            </View>

            <View style={styles.group}>
                <Text style={styles.level}>
                    {`Level: ${fillUpTo(state.level, 2)}`}
                </Text>
            </View>
        </View>
    )
}))

export default StatusBar;


import React, {useCallback} from "react";
import {View, Text} from "react-native";
import styleSheet from "./StyleSheet";
import useStyle from "../../../utils/useStyle";
// import {useGamePlayStore} from "../../../store/game.play.store";
import {observer} from "mobx-react-lite"
import {inject} from "mobx-react";

const StatusBar = inject("playState", "config")(observer(({playState: state, config}) =>{
    const styles = useStyle(styleSheet, config);
    //const state = useGamePlayStore();

    const fillUpTo = useCallback((value, n = 5) => {
        value = value.toString();
        return value.padStart(n - value.length + 1, "0");
    },[])


    return (
        <View style={styles.container}>
            <Text style={{...styles.score, ...styles.value}}>
                {`Score: ${fillUpTo(state.score, 5)}`}
            </Text>

            <Text style={styles.level}>
                {`Level: ${fillUpTo(state.level, 2)}`}
            </Text>
        </View>
    )
}))

export default StatusBar;


import React from "react";
import {View, Text} from "react-native";
import {inject} from "mobx-react";
import StyleSheet from "./StyleSheet";
import useStyle from "../../../../../utils/useStyle";

const ResultItem = inject("config")(({config, current = false, data, index}) =>{
    const styles = useStyle(StyleSheet, config)

    return(
        <View style={styles.row}>
            <Text style={{...styles.index, ...(current ? styles.current : {})}}>{index}</Text>
            <Text style={{...styles.level, ...(current ? styles.current : {})}}>{data.level}</Text>
            <Text style={{...styles.score, ...(current ? styles.current : {})}}>{data.score}</Text>
        </View>
    )
})

export default ResultItem;
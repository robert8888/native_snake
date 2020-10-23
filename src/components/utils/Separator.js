import React from "react";
import {View} from "react-native";

const Separator = ({style}) => {
    return <View style={{...{
        height: 2,
        width: "100%",
        backgroundColor: "white",
    },...style}}/>
}

export default Separator
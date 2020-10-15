import React from "react";
import {Switch as NativeSwitch} from "react-native";
import themes from "./../../theme/theme";
import {inject} from "mobx-react";

const Switch = inject("config")(({
    onChange,
    value,
    config,
}) =>{
    const theme = themes[config.current.themeName];

    return (
        <NativeSwitch
                onValueChange={onChange}
                value={value}
                thumbColor={theme.colors.primary}
                trackColor={{true: theme.colors.light, false: "gray"}}
                ios_backgroundColor={theme.colors.light}/>
    )
})

export default Switch
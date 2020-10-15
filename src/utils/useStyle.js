import React, {useMemo} from "react";
// import {useConfigurationStore} from "../store/configuration.store";
import {StyleSheet} from "react-native";
import themes from "../theme/theme";

export default function useStyle(styles, config){
    //const config = useConfigurationStore();
    const theme = themes[config.current.themeName]

    return useMemo(()=>{
        return StyleSheet.create(styles(config))
    }, [config, styles, theme])
}
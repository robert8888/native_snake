import React, {useCallback, useMemo, useState} from "react";
import {Text, TouchableHighlight, View} from "react-native";
import Switch from "./../utils/Switch";
import {useHistory} from "react-router-native";
import useStyle from "../../utils/useStyle";
import styleSheet from "./StyleSheet"
import Icon from "react-native-vector-icons/Entypo";
//import {useConfigurationStore} from "../../store/configuration.store";
import themes from "../../theme/theme";
import Dropdown from "../utils/Dropdown/Dropdown";
import {observer} from "mobx-react-lite"
import {inject} from "mobx-react";

const Settings = inject("config")(observer(({config}) => {
 //   const config = useConfigurationStore();
    const styles = useStyle(styleSheet, config)
    const history = useHistory()


    const onChangeWallTroughs = useCallback(value =>{
        if(config.current.difficulty === "master") return;
        config.update({wallThrough : value})
    }, [config])

    const onChangeBackgroundDraw = useCallback(value =>{
        if(config.current.difficulty === "master") return;
        config.update({drawBackground: value});
    }, [config])


    const difficulties = useMemo(() => {
        return [
            {label: "Beginner", value: "beginner"},
            {label: "Easy", value: "easy"},
            {label: "Normal", value: "normal"},
            {label: "Hard", value: "hard"},
            {label: "Master", value: "master"},
        ]
    }, [])


    const onChangeDifficulty = useCallback(value => {
        const nextConfig = {}
        switch (value){
            case "beginner" : {
                nextConfig.gameSize = 25;
                nextConfig.wallThrough = true;
                nextConfig.levelSpeedRatio = 0.99;
                nextConfig.startSteepInterval = 1200;
                nextConfig.drawBackground = true;
                break;
            }
            case "easy" : {
                nextConfig.gameSize = 25;
                nextConfig.wallThrough = true;
                nextConfig.levelSpeedRatio = 0.98;
                nextConfig.startSteepInterval = 1000;
                break;
            }
            case "normal" : {
                nextConfig.gameSize = 20;
                nextConfig.wallThrough = true;
                nextConfig.levelSpeedRatio = 0.95;
                nextConfig.startSteepInterval = 1000;
                break;
            }
            case "hard" : {
                nextConfig.gameSize = 20;
                nextConfig.wallThrough = false;
                nextConfig.levelSpeedRatio = 0.93;
                nextConfig.startSteepInterval = 900;
                nextConfig.drawBackground = false;
                break;
            }
            case "master" : {
                nextConfig.gameSize = 15;
                nextConfig.wallThrough = false
                nextConfig.levelSpeedRatio = 0.90;
                nextConfig.startSteepInterval = 800;
                nextConfig.themeName = "red";
                nextConfig.drawBackground = false;
                break;
            }
        }
        nextConfig.difficulty = value;
        config.update(nextConfig)
    }, [config])


    const themeNames = useMemo(() => {
        return Object.keys(themes).map(name => ({
                label: name.charAt(0).toUpperCase() + name.slice(1), value: name
        }))
    }, [themes])

    const onThemeChange = useCallback((value) => {
        if(config.current.difficulty === "master") return;
        config.update({themeName : value})
    }, [config])

    return (
        <View>
            <View>
                <View style={styles.header}>
                    <TouchableHighlight onPress={history.goBack}>
                        <Icon name={"back"} style={styles.nav} size={50}/>
                    </TouchableHighlight>
                    <View pointerEvents={"none"} style={styles.titleWrapper}>
                        <Text style={styles.title}>Settings</Text>
                    </View>
                </View>
            </View>
            <View>
                <View style={styles.group}>
                    <Text style={styles.label}>Walk through walls</Text>
                    <Switch value={config.current.wallThrough} onChange={onChangeWallTroughs}/>
                </View>
                <View style={styles.group}>
                    <Text style={styles.label}>Display background grid</Text>
                    <Switch value={config.current.drawBackground} onChange={onChangeBackgroundDraw}/>
                </View>
                <View style={styles.group}>
                    <Text style={styles.label}>Difficulty</Text>
                    <Dropdown
                        items={difficulties}
                        value={config.current.difficulty}
                        onChange={onChangeDifficulty}/>
                </View>
                <View style={styles.group}>
                    <Text style={styles.label}>Theme</Text>
                    <Dropdown
                        items={themeNames}
                        value={config.current.themeName}
                        onChange={onThemeChange}/>
                </View>

            </View>
        </View>
    )
}))

export default Settings;
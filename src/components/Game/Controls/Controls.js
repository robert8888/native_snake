import React, {useMemo} from "react";
import {View} from "react-native";
import styleSheet from "./StyleSheet";
import themes from "../../../theme/theme"
import GenericButton from "./Button"
import useStyle from "../../../utils/useStyle";
import {inject} from "mobx-react";
//import {useConfigurationStore} from "../../../store/configuration.store";

const Controls = inject("config")(({controller, config}) =>{
    //const config = useConfigurationStore();
    const styles = useStyle(styleSheet, config);
    const theme = themes[config.current.themeName];

    const Button = useMemo(() => GenericButton(styles, theme), [styles, theme])

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Button iconName="arrow-up" onPress={controller.up}/>
                <Button iconName="arrow-right" onPress={controller.right}/>
            </View>
            <View style={styles.row}>
                <Button iconName="arrow-left" onPress={controller.left}/>
                <Button iconName="arrow-down" onPress={controller.down}/>
            </View>

        </View>
    )
})

export default Controls;
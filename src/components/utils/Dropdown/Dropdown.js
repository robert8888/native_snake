import React, {useCallback, useMemo} from "react";
import {Text, View} from "react-native";
import { Dropdown as DropdownMaterial } from 'react-native-material-dropdown';
import useStyle from "../../../utils/useStyle";
import themes from "./../../../theme/theme";
import {inject} from "mobx-react";

const Dropdown = inject("config")(({
    value,
    items,
    onChange,
    config
}) =>{
    const styles = useStyle(styleSheet, config);
    const themeName = config.current.themeName;

    const theme = useMemo(() =>{
        return themes[themeName]
    }, [themeName])

    const renderBase = useCallback(({title}) =>{
        return (
            <Text style={styles.base}>
                {title}
            </Text>
        )
    }, [])

    return (
        <View>
            <DropdownMaterial
                data={items}
                textColor={theme.colors.light}
                baseColor={theme.colors.light}
                itemColor={theme.colors.light}
                renderBase={renderBase}
                fontSize={16}
                labelFontSize={0}
                useNativeDriver={false}
                labelHeight={0}
                placeholder={value}
                containerStyle={styles.container}
                pickerStyle={styles.picker}
                itemTextStyle={styles.itemText}
                lineWidth={0}
                itemCount={6}
                activeLineWidth={0}
                disabledLineWidth={0}
                onChangeText={onChange}
                value={value}
                initialNumToRender={10}
            />
        </View>
    )
})

const styleSheet = (config) => ({
    base: {
        color: themes[config.current.themeName].colors.light,
        fontSize: 16,
        textAlign: "right",
        height: 30,
        lineHeight: 30
    },
    container: {
        width: 100,
        height: 30,
        backgroundColor: themes[config.current.themeName].colors.background,
    },
    picker: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: themes[config.current.themeName].colors.primary,
        backgroundColor: themes[config.current.themeName].colors.background,
    },

    itemText:{
        color: themes[config.current.themeName].colors.light,
        fontSize: 24,
        textAlign: "right"
    }

})

export default Dropdown
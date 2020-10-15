import React from "react";
import {useHistory} from "react-router-native"
import {
    View,
    Text,
    Image, TouchableHighlight,
} from "react-native"
import {
    Button,
} from "react-native-elements";
import styleSheet from "./StyleSheet";
import useStyle from "../../utils/useStyle";
import Icon from "react-native-vector-icons/FontAwesome";
import themes from "../../theme/theme";
import {observer} from "mobx-react-lite"
import {inject} from "mobx-react";
//import {useConfigurationStore} from "../../store/configuration.store";

const Start = inject("config")(observer(({config}) => {
    const history = useHistory();
    const styles = useStyle(styleSheet, config);
 //   const config = useConfigurationStore();
    const theme = themes[config.current.themeName];

    const onPressStart = () => {
        history.push("/game")
    }

    const onPressSetting = () =>{
        history.push("/settings")
    }

    return (
        <View style={styles.container}>
            <TouchableHighlight style={styles.icon} onPress={onPressSetting}>
                <Icon name="gears" size={28} color={theme.colors.light}/>
            </TouchableHighlight>

            <Text style={styles.title}>
                SNAKE
            </Text>
            <Image
                style={styles.logo}
                source={theme.images.cobra.source}/>
            <Button
                title={"START"}
                onPress={onPressStart}
                buttonStyle={styles.buttonStart}/>
        </View>
    )
}))

export default Start;


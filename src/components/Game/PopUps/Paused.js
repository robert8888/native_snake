import React, {useCallback} from 'react';
import {Button, Overlay} from "react-native-elements";
import {Text, View} from "react-native";
import {useHistory} from "react-router-native"
import Touchable from "../../utils/Touchable";
import Icon from "react-native-vector-icons/FontAwesome";


const Paused = ({data: gameState, styles, controller}) => {
    const history = useHistory();

    const close = useCallback(() =>{
        controller.finish();
        history.goBack();
    }, [controller, history])

    return (
        <Overlay isVisible={gameState.paused} overlayStyle={{...styles.overlay, ...styles.overlaySmall}}>
            <>
                <View style={styles.close}>
                    <Touchable onPress={close}>
                        <Icon name="close" size={25} color={"white"}/>
                    </Touchable>
                </View>
                <View style={styles.section}>
                    <Touchable onPress={controller.togglePause}>
                        <Text style={styles.title}>
                            Paused
                        </Text>
                    </Touchable>
                </View>
                <View style={styles.section}>
                    <Button title="Resume" buttonStyle={styles.button} onPress={controller.togglePause}/>
                </View>
            </>
        </Overlay>
    )
}

export default Paused
import React from "react"
import {Button as NativeButton} from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';

const Button = ({onPress, iconName, styles, theme}) => {
    return (
        <NativeButton buttonStyle={styles.button} onPress={onPress} icon={
            <Icon iconStyle={styles.icon} name={iconName} size={24} color={theme.colors.secondary}/>
        }/>
    )
}
const StyledButton = (styles, theme) => ({onPress, iconName}) =>
    <Button theme={theme} styles={styles} onPress={onPress} iconName={iconName}/>

export default StyledButton;

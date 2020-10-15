import React from "react";
import {
    TouchableWithoutFeedback, View
} from "react-native";

const Touchable = ({children, ...props}) => (
    <TouchableWithoutFeedback {...props}>
        <View>
            {children}
        </View>
    </TouchableWithoutFeedback>
)

export default Touchable;
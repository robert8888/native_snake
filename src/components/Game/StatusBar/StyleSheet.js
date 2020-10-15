import {StyleSheet} from "react-native";

export default () => ({
    container: {
        height: 60,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingVertical: 5,
        paddingHorizontal: "1%",
    },

    containerScore: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        backgroundColor: "red"
    },
    score: {
        color: "white",
        fontSize: 16,
        fontFamily: "RobotoMono-Bold",
        letterSpacing: 2,
    },

    level: {
        color: "white",
        fontSize: 16,
        fontFamily: "RobotoMono-Bold",
        letterSpacing: 2,
    },

})
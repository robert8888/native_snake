import {StyleSheet} from "react-native";

export default () => ({
    container: {
        height: 20,
        marginTop: 40,
        marginBottom: 5,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingHorizontal: "1%",
    },

    group:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "100%",
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

    lives:{
        color: "white",
        fontSize: 16,
        fontFamily: "RobotoMono-Bold",
        letterSpacing: 2,
    },

    spriteImage: {
       aspectRatio: 1,
       height: "100%",
       padding: 2,
    }

})
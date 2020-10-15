import theme from "../../theme/theme";

export default config => ({
    container: {
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",


    },
    title: {
        fontSize: 60,
        fontFamily: "Anton-Regular",
        color: "white",
    },
    buttonStart: {
        backgroundColor: theme[config.current.themeName].colors.primary,
        borderColor: theme[config.current.themeName].colors.primary,
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 40
    },
    logo:{
        width: 200,
        height: 220,
    },
    icon:{
        position: "absolute",
        top: 20,
        right: "5%",
    }
})
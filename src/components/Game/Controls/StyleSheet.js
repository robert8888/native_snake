import theme from "../../../theme/theme"

export default (config) => ({
    container : {
        width: "98%",
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
    },
    row: {
        padding: 10,
        flexGrow: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    button: {
        backgroundColor: "transparent",
        margin: 0,
        borderWidth: 1,
        borderColor: theme[config.current.themeName].colors.light,
        flexShrink: 1,
        flexGrow: 1,
        width: 150,
    },

    icon:{
        color: theme[config.current.themeName].colors.secondary,
    },
})
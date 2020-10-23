import themes from "../../../theme/theme";

export default config => ({
    wrapper: {
        borderWidth: 1,
        borderColor: themes[config.current.themeName].colors.light + "88",
        width: "99%",
        aspectRatio: 1,
        paddingTop: 4,
        paddingLeft: 4,
    },
    imageCanvas: {
        width: "100%",
        height: "100%",
        // borderColor: themes[config.current.themeName].colors.secondary,
        // borderWidth: 2
    },
    backgroundCanvas:{
        position:"absolute",
        top: 4,
        left: 4
    }
})

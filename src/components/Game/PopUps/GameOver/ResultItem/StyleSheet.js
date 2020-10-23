import themes from "./../../../../../theme/theme";

const label = (config) => ({
    color: themes[config.current.themeName].colors.light,
    fontSize: 14,
    fontFamily: "Anton-Regular",
})

export default (config) => ({
    row:{
      display: "flex",
      flexDirection: "row",
      width: "60%",
      marginHorizontal: "auto",
      justifyContent: "space-between",
    },

    index: {
        ...label(config),
        marginRight: "58%",
    },
    level: {
        ...label(config),
        flex: 1,
    },
    score: {
        ...label(config)
    },

    current: {
        color: themes[config.current.themeName].colors.secondary,
    }
})
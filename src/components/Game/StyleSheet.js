import theme from "./../../theme/theme"

export default (config) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
    },

    overlay: {
        width: "80%",
        minHeight: "70%",
        maxHeight: "90%",
        backgroundColor: theme[config.current.themeName].colors.background,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: theme[config.current.themeName].colors.secondary,
        justifyContent: "space-between",
    },
    overlaySmall :{
        minHeight: "30%",
        height: "30%",
    },

    section: {
        alignItems: "center",
        display: "flex",
        flexGrow: 2,
        marginBottom: 5,
    },

    sectionBottom:{
        flexGrow: 1
    },

    group: {
        width: "70%",
        marginHorizontal: "auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },


    title: {
        width: "100%",
        textAlign: "center",
        color: theme[config.current.themeName].colors.light,
        fontSize: 40,
        fontFamily: "Anton-Regular",
        marginBottom: 10,
    },

    label:{

        textAlign: "left",
        color: theme[config.current.themeName].colors.light,
        fontSize: 20,
        fontFamily: "Anton-Regular",
    },

    resultsLabel: {
        fontSize: 16,
    },

    resultsCurrent: {
        color: theme[config.current.themeName].colors.primary,
    },


    value:{
        textAlign: "left",
        color: theme[config.current.themeName].colors.light,
        fontSize: 20,
        fontFamily: "Anton-Regular",
    },

    button: {
        backgroundColor: theme[config.current.themeName].colors.primary,
        borderColor: theme[config.current.themeName].colors.primary,
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 40,
    },

    close: {
        position: "absolute",
        top: 20,
        right: 20,
        color: theme[config.current.themeName].colors.light,
    }
})

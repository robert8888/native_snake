import theme from "../../theme/theme";

export default (config) => ({
    header: {
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: theme[config.current.themeName].colors.secondary,
    },
    nav: {
        color: theme[config.current.themeName].colors.light,
        fontSize: 18,
        marginLeft: "2%",
        lineHeight: 50,
        elevation: 1,
        zIndex: 1,
    },
    titleWrapper: {
        position: "absolute",
        width: "100%",
        elevation: 1,
        zIndex: 1,
    },
    title: {
        textAlign: "center",
        fontSize: 24,
        lineHeight: 50,
        fontWeight: "700",
        color: theme[config.current.themeName].colors.light,
        elevation: 1,
        zIndex: 1,
    },

    group:{
        paddingVertical: 10,
        paddingHorizontal: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: theme[config.current.themeName].colors.light + "22",
        elevation: 1,
        zIndex: 1,
    },

    label: {
        color: theme[config.current.themeName].colors.light,
        fontSize: 16,
        letterSpacing: 1,

    },
    switch:{
        //backgroundColor: "blue"
    }
})
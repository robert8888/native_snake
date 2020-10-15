import theme from "./../../../theme/theme"

export default config => ({
    wrapper: {
        borderWidth: 1,
        borderColor: theme.green.colors.light + "88",
        width: "99%",
        aspectRatio: 1,
    },

})

// const field = {
//     width: 1 / config.size  * 100 + "%",
//     aspectRatio: 1,
//     borderWidth: 0.2,
//     borderColor: theme.green.colors.primary + "cc",
// }
//
// export const fieldStyles = StyleSheet.create({
//     empty: {
//         ...field
//     },
//     meal: {
//         ...field
//     },
//     snake: {
//         ...field
//     },
//     snakeHead: {
//         ...field
//     },
//     snakeTail: {
//         ...field
//     },
// })
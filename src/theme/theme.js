// const snake_sprite = {
//     head: {
//         up: {x: 192.5, y: 0, width: 62.5, height: 62.5},
//         right: {x: 257.5, y: 0, width: 62.5, height: 62.5},
//         down: {x: 257, y: 65, width: 62.5, height: 62.5},
//         left: {x: 192.5, y: 64, width: 62.5, height: 62.5},
//     },
//     segments: {
//         horizontal: {x: 62.5, y: 0, width: 60, height: 62.5},
//         vertical: {x: 129, y: 62.5, width: 62.5, height: 62.5},
//         rightUp: {x: 130, y: 0, width: 62.5, height: 62.5},
//         rightDown: {x: 129, y: 128, width: 62.5, height: 62.5},
//         leftUp: {x: 0, y: 0, width: 62.5, height: 62.5},
//         leftDown: {x: 0, y: 65, width: 62.5, height: 62.5},
//     },
//     tail: {
//         up: {x: 257.5, y: 190, width: 62.5, height: 62.5},
//         right: {x: 192.5, y: 192.5, width: 62.5, height: 62.5},
//         down: {x: 192.5, y: 130, width: 62.5, height: 62.5},
//         left: {x: 255, y: 127.5, width: 62.5, height: 62.5},
//     }
// }

const snake_sprite = {
    headUp: {x: 192.5, y: 0, width: 62.5, height: 62.5},
    headRight: {x: 257.5, y: 0, width: 62.5, height: 62.5},
    headDown: {x: 257, y: 65, width: 62.5, height: 62.5},
    headLeft: {x: 192.5, y: 64, width: 62.5, height: 62.5},
    segmentHorizontal: {x: 62.5, y: 0, width: 60, height: 62.5},
    segmentVertical: {x: 129, y: 62.5, width: 62.5, height: 62.5},
    segmentRightUp: {x: 130, y: 0, width: 62.5, height: 62.5},
    segmentRightDown: {x: 129, y: 128, width: 62.5, height: 62.5},
    segmentLeftUp: {x: 0, y: 0, width: 62.5, height: 62.5},
    segmentLeftDown: {x: 0, y: 65, width: 62.5, height: 62.5},
    tailUp: {x: 257.5, y: 190, width: 62.5, height: 62.5},
    tailRight: {x: 192.5, y: 192.5, width: 62.5, height: 62.5},
    tailDown: {x: 192.5, y: 130, width: 62.5, height: 62.5},
    tailLeft: {x: 255, y: 127.5, width: 62.5, height: 62.5},
}

const bonuses_sprite = {
    redApple: {x: -2, y: 0, width: 125, height: 140},
    greenApple: {x: -2, y: 430, width: 125, height: 140},
    goldApple: {x: -2, y: 290, width: 125, height: 140},
    turtle: {x: -2, y: 595, width: 125, height: 110},
    diamond: {x: -2, y: 700, width: 125, height: 130},
    heart: {x: -2, y: 830, width: 140, height: 140},
    bomb: {x: 6, y: 970, width: 125, height: 140},
    sword: {x: 6, y: 1120, width: 125, height: 140},
}




export default {
    green: {
        colors: {
            primary: "#04620c",
            secondary: "#32dc32",
            light: "#f7fff7",
            background: "black",
            backgroundGrid: "#0d180d",
        },
        images: {
            snake: {
                source: require("./../assets/img/snake_sprite_green.png"),
                sprite: snake_sprite

            },
            bonuses:{
                source: require("./../assets/img/bonuses_sprite.png"),
                sprite: bonuses_sprite
            },
            cobra: {
                source: require("./../assets/img/cobra_green.png")
            }
        }
    },



    blue: {
        colors: {
            primary: "#044762",
            secondary: "#32b4dc",
            light: "#f7fff7",
            background: "black",
            backgroundGrid: "#03282b",
        },
        images: {
            snake: {
                source: require("./../assets/img/snake_sprite_blue.png"),
                sprite: snake_sprite

            },
            bonuses:{
                source: require("./../assets/img/bonuses_sprite.png"),
                sprite: bonuses_sprite
            },
            cobra: {
                source: require("./../assets/img/cobra_blue.png")
            }
        }
    },


    red: {
        colors: {
            primary: "#620404",
            secondary: "#dc3232",
            light: "#f7fff7",
            background: "black",
            backgroundGrid: "#2b0303",
        },
        images: {
            snake: {
                source: require("./../assets/img/snake_sprite_red.png"),
                sprite: snake_sprite

            },
            bonuses:{
                source: require("./../assets/img/bonuses_sprite.png"),
                sprite: bonuses_sprite
            },
            cobra: {
                source: require("./../assets/img/cobra_red.png")
            }
        }
    },

}
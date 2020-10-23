export default {
    beginner: {
        gameSize : 25,
        levelSpeedRatio : 0.98,
        startSteepInterval : 1200,
        wallThrough: true,
        turtleProbability : 1/200,
        turtleExpiryLimitRange : [5000, 20000],
        turtleLimit : 2,

        lives : 3,
        heartProbability : 1/200,
        heartExpiryLimitRange : [5000, 10000],
        heartLimit : 2,

        diamondProbability : 1/25,
        diamondLimit : 3,
        diamondExpiryLimitRange : [10000, 50000],

        bombProbability: 1/100,
        bombLimit: 1,
        bombExpiryLimitRange: [5000, 10000],

        swordProbability: 1/750,
        swordLimit: 2,
        swordExpiryLimitRange: [2000, 10000],
        swordCutRange: [30, 60], // catting about 30 to 50 %

    },
    easy: {
        gameSize : 25,
        levelSpeedRatio : 0.975,
        startSteepInterval : 1000,
        wallThrough: true,
        turtleProbability : 1/200,
        turtleExpiryLimitRange : [5000, 20000],
        turtleLimit : 2,

        lives : 2,
        heartProbability : 1/200,
        heartExpiryLimitRange : [5000, 10000],
        heartLimit : 2,

        diamondProbability : 1/20,
        diamondLimit : 3,
        diamondExpiryLimitRange : [10000, 45000],

        bombProbability: 1/50,
        bombLimit: 2,
        bombExpiryLimitRange: [5000, 10000],

        swordProbability: 1/750,
        swordLimit: 1,
        swordExpiryLimitRange: [2000, 10000],
        swordCutRange: [30, 50], // catting about 30 to 50 %
    },
    normal: {
        gameSize : 20,
        levelSpeedRatio : 0.965,
        startSteepInterval : 1000,
        wallThrough: true,
        turtleProbability : 1/150,
        turtleExpiryLimitRange : [5000, 15000],
        turtleLimit : 1,

        lives : 1,
        heartProbability : 1/150,
        heartExpiryLimitRange : [5000, 8500],
        heartLimit : 2,

        diamondProbability : 1/20,
        diamondLimit : 3,
        diamondExpiryLimitRange : [5000, 45000],

        bombProbability: 1/25,
        bombLimit: 5,
        bombExpiryLimitRange: [5000, 30000],

        swordProbability: 1/1000,
        swordLimit: 1,
        swordExpiryLimitRange: [1000, 10000],
        swordCutRange: [20, 45],
    },
    hard: {
        gameSize : 20,
        levelSpeedRatio : 0.945,
        startSteepInterval : 900,
        wallThrough: false,
        turtleProbability : 1/250,
        turtleExpiryLimitRange : [5000, 12000],
        turtleLimit : 1,

        lives : 1,
        heartProbability : 1/250,
        heartExpiryLimitRange : [5000, 8500],
        heartLimit : 1,

        diamondProbability : 1/20,
        diamondLimit : 3,
        diamondExpiryLimitRange : [5000, 30000],

        bombProbability: 1/10,
        bombLimit: 5,
        bombExpiryLimitRange: [5000, 40000],

        swordProbability: 1/1000,
        swordLimit: 1,
        swordExpiryLimitRange: [1000, 10000],
        swordCutRange: [15, 35],
    },
    master: {
        gameSize: 20,
        wallThrough: false,
        levelSpeedRatio: 0.90,
        startSteepInterval: 800,
        themeName: "red",
        drawBackground: false,

        turtleProbability : 1/250,
        turtleExpiryLimitRange : [5000, 12000],
        turtleLimit : 1,

        lives : 1,
        heartProbability : 1/250,
        heartExpiryLimitRange : [5000, 8500],
        heartLimit : 1,

        diamondProbability : 1/30,
        diamondLimit : 2,
        diamondExpiryLimitRange : [5000, 30000],

        bombProbability: 1/5,
        bombLimit: 5,
        bombExpiryLimitRange: [5000, 40000],

        swordProbability: 1/1000,
        swordLimit: 1,
        swordExpiryLimitRange: [1000, 10000],
        swordCutRange: [15, 35],

    }
}
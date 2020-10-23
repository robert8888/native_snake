import React, {useMemo, useState, useCallback, useEffect, useRef} from "react";
import DIRECTIONS from "./model/Directions";
import Coordinates from "./model/Coordinates";
import Snake from "./model/Snake";
import useBonusGenerator from "./useBonusGenerator";
import idGenerator from "./.././utils/IdGenerator";
import Turtle from "./model/Turtle";
import useRandomCordinates from "./useRandomCordinates";
import random from "../utils/randome";
import Heart from "./model/Heart";
import Diamond from "./model/Diamond";
import Bomb from "./model/Bomb";
import Sword from "./model/Sword";

export default function useSnake({
 playStateStore: playState,
 configStore: config,
 resultsStore: results,
 viewBus
}){
    const [generateBonuses] = useBonusGenerator(config);
    const getRandomCoordinates = useRandomCordinates(config.current.gameSize);

    const [gameState, setGameState] = useState({
        over: false,
        results: null,
        paused: false,
    })

    const localPlayState = useRef({
        score: 0,
        level: 0,
        speed: config.current.startSteepInterval,
        start: 0,
        paused: false,
        lives: 0,
        diamonds: 0,
        over: false,
    })

    const restartIntervalHandle = useRef(null)
    const direction = useRef(DIRECTIONS.UP);
    const lastStepDirection = useRef(direction.current);
    const nextStepHandler = useRef();
    const snake = useRef(null);
    const bonuses = useRef(new Map());

    const move = useCallback((nextDirection, oppositeDirection) => {
        if(lastStepDirection.current === oppositeDirection) return;
        if(lastStepDirection.current === nextDirection){
            nextStepHandler.current()
        } else {
            direction.current = nextDirection;
        }
    }, [direction, lastStepDirection, nextStepHandler])

    const up = useCallback(()=>{
        move(DIRECTIONS.UP, DIRECTIONS.DOWN)
    }, [move]);

    const down = useCallback(()=>{
        move(DIRECTIONS.DOWN, DIRECTIONS.UP)
    }, [move]);

    const left = useCallback(()=>{
        move(DIRECTIONS.LEFT, DIRECTIONS.RIGHT)
    }, [move]);

    const right = useCallback(()=>{
        move(DIRECTIONS.RIGHT, DIRECTIONS.LEFT)
    }, [move]);

    const updateLocalState = useCallback((callback) => {
        localPlayState.current = callback(localPlayState.current);
        playState.update(localPlayState.current);
    }, [playState, localPlayState])

    const restartState = useCallback(() => {
        updateLocalState(() => ({
            score: 0,
            level: 0,
            speed: config.current.startSteepInterval,
            paused: false,
            start: new Date().getTime(),
            lives: config.current.lives,
            diamonds: 0,
            over:false,
        }))
        setGameState({
            over:false,
            paused: false,
        })

        direction.current = DIRECTIONS.UP;
        snake.current = new Snake(new Coordinates(config.current.gameSize / 2, config.current.gameSize / 2));
        bonuses.current = new Map();
        const bonus = generateBonuses(snake.current.segmentsIds);
        bonuses.current.set(bonus.toString(), bonus);

        restartIntervalHandle.current(true);
    }, [direction, bonuses, snake, updateLocalState, setGameState, restartIntervalHandle])

    const restart = useCallback(()=>{
        restartState();
    }, [restartState, restartIntervalHandle])

    const finish = useCallback(()=>{
        setGameState(state => ({...state, gameOver: true}))
    }, [setGameState])

    const togglePause = useCallback(() => {
        setGameState(state => ({...state, paused: !state.paused}))
        updateLocalState(state => ({...state, paused: !state.paused}))
    }, [setGameState])

    const gameOver = useCallback(()=>{
        results.pushResult({
            id: idGenerator(),
            difficulty: config.current.difficulty,
            score: localPlayState.current.score,
            level: localPlayState.current.level,
            time: new Date().getTime() - localPlayState.current.start,
            over: true,
        })
        setGameState({
            over: true,
            paused: true,
        })
        localPlayState.current.over = true;
    }, [results, localPlayState, setGameState])

    const controller = useMemo(()=>{
        return {
            up, down, left, right, togglePause, restart, finish
        }
    }, [up, down, left, right, togglePause, restart, finish])

    const updateView = useCallback(()=>{
        viewBus?.update && typeof viewBus.update === "function" &&
            viewBus.update({
                snake: snake.current.toView(),
                bonuses: [...bonuses.current.values()].map(bonus => bonus.toView()),
            })
    }, [localPlayState, snake, bonuses, viewBus])

    const getTakenCoordinates = useCallback(() => {
        return new Set([...snake.current.segmentsIds].concat(...bonuses.current.keys()))
    }, [snake, bonuses])

    const getBonusesByType = useCallback((type) =>
        [...bonuses.current.values()].filter(bonus => bonus.type === type)
    , [bonuses])

    const removeNthTypeBonus = useCallback((type, n) => {
        let count = -1;
        for(let entire of bonuses.current.entries()){
            if(entire[1].type === type){
                if(count + 1 === n){
                    bonuses.current.delete(entire[0])
                    return;
                } else {
                    count++
                }
            }
        }
    }, [bonuses])

    const consumeBonus = useCallback((next) => {
        const bonus = bonuses.current.get(next.toString());
        bonuses.current.delete(bonus.toString());
        if(bonus.isApple){
            snake.current.eat(next);

            const nextBonus = generateBonuses(getTakenCoordinates());
            bonuses.current.set(nextBonus.toString(), nextBonus);
        } else {
            snake.current.crawl(next);
        }

        updateLocalState(state => {
            const {state: nextState, snake: nextSnake} = bonus.modify(state, snake.current);
            if(nextSnake) snake.current = nextSnake;
            return nextState
        });
    }, [bonuses, snake, updateLocalState, localPlayState, getTakenCoordinates])


    const createRandomBonus = useCallback((type, classConstructor) => {
        const probability = Math.random();
        if(probability > 0 &&  probability < config.current[type + "Probability"]){
            if(getBonusesByType(type).length === config.current[type +"Limit"]){
                //removeNthTypeBonus(type, random(0, config.current.turtleLimit))
            } else {
                const coordinates = getRandomCoordinates(getTakenCoordinates())
                const turtle = new classConstructor(coordinates, config.current);
                bonuses.current.set(turtle.toString(), turtle);
            }
        }

    }, [config])

    const randomBonuses = useCallback(()=>{
        createRandomBonus("turtle", Turtle);
        createRandomBonus("heart", Heart);
        createRandomBonus("diamond", Diamond);
        createRandomBonus("bomb", Bomb);
        createRandomBonus("sword", Sword);
    }, [createRandomBonus, config]);

    const updateBonusesExpire = useCallback(()=>{
        for(let bonus of bonuses.current.values()){
            if(bonus.isExpired()){
                bonuses.current.delete(bonus.toString());
            }
        }
    }, [])

    const updateBonuses = useCallback(()=>{
        updateBonusesExpire();
        randomBonuses()
    }, [updateBonusesExpire, randomBonuses])

    const collision = useCallback((next)=>{
        localPlayState.current.lives--;
        if(localPlayState.current.lives === 0){
            localPlayState.current.over = true;
        } else {
            snake.current.crawl(next);
            updateLocalState((state) => ({
                ...state,
                score : state.score - 100
            }))
        }
    }, [localPlayState, gameOver])

    const step = useCallback(()=>{
        if(!snake.current) return;

        const wallThrough = config.current.wallThrough;
        const size = config.current.gameSize;
        let next = snake.current.head;
        switch (direction.current){
            case DIRECTIONS.UP: {
                let y = next.y - 1;
                if(y < 0){
                    if(wallThrough){
                        y = size - 1;
                    } else {
                        localPlayState.current.over = true;
                        return;
                    }
                }
                next = new Coordinates(next.x, y);
                break;
            }
            case DIRECTIONS.DOWN: {
                let y = next.y + 1;
                if(y >= size){
                    if(wallThrough){
                        y = 0;
                    } else {
                        localPlayState.current.over = true;
                        return;
                    }
                }
                next = new Coordinates(next.x, y);
                break;
            }
            case DIRECTIONS.RIGHT: {
                let x = next.x + 1;
                if(x >= size){
                    if(wallThrough){
                        x = 0;
                    } else {
                        localPlayState.current.over = true;
                        return;
                    }
                }
                next = new Coordinates(x, next.y);
                break;
            }
            case DIRECTIONS.LEFT: {
                let x = next.x - 1;
                if(x < 0){
                    if(wallThrough){
                        x = size - 1;
                    } else {
                        localPlayState.current.over = true;
                        return;
                    }
                }
                next = new Coordinates(x, next.y);
                break;
            }
        }

        if(snake.current.has(next)){
            collision(next);
            return;
        }

        if(bonuses.current.has(next.toString())){
            consumeBonus(next)
        } else {
            snake.current.crawl(next);
        }
        lastStepDirection.current = direction.current;

        updateBonuses();

        updateView();
    }, [localPlayState, collision, config,  direction,snake, updateView, randomBonuses, lastStepDirection])

    useEffect(() => nextStepHandler.current = step, [step, nextStepHandler]);

    const tick = useCallback(()=>{
        if(localPlayState.current.over) {
            gameOver();
            return;
        }
        if(!localPlayState.current.paused){
            step();
        }
        setTimeout(tick, localPlayState.current.speed);
    }, [step, localPlayState, setGameState, gameOver]);

    const restartClock = useCallback((force = false) => tick(), [tick])

    useEffect(() =>{
        restartIntervalHandle.current = restartClock;
    }, [restartClock, restartIntervalHandle])

    useEffect(()=>{
        restart();
    }, [restart])

    return [controller, gameState]
}
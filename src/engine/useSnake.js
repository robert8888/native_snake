import React, {useMemo, useState, useCallback, useEffect, useRef} from "react";
import DIRECTIONS from "./model/Directions";
import Coordinates from "./model/Coordinates";
import Snake from "./model/Snake";
import useBonusGenerator from "./useBonusGenerator";

export default function useSnake({
 playStateStore: playState,
 configStore: config,
 resultsStore: results,
 viewStore: view
}){
    const [generateBonuses] = useBonusGenerator(config.current);

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
    })

    const stepIntervalHandle = useRef(null);
    const restartIntervalHandle = useRef(null)
    const direction = useRef(DIRECTIONS.UP);
    const lastStepDirection = useRef(direction.current);
    const snake = useRef(null);
    const bonuses = useRef(new Map());

    const up = useCallback(()=>{
        if(lastStepDirection.current === DIRECTIONS.DOWN) return;
        direction.current = DIRECTIONS.UP;
    }, [direction, lastStepDirection]);

    const down = useCallback(()=>{
        if(lastStepDirection.current === DIRECTIONS.UP) return;
        direction.current = DIRECTIONS.DOWN;
    }, [direction, lastStepDirection]);

    const left = useCallback(()=>{
        if(lastStepDirection.current === DIRECTIONS.RIGHT) return;
        direction.current = DIRECTIONS.LEFT;
    }, [direction, lastStepDirection]);

    const right = useCallback(()=>{
        if(lastStepDirection.current === DIRECTIONS.LEFT) return;
        direction.current = DIRECTIONS.RIGHT;
    }, [direction, lastStepDirection]);

    const updateLocalState = useCallback((callback) => {
        localPlayState.current = callback(localPlayState.current);
        playState.update(localPlayState.current);
        restartIntervalHandle.current();
    }, [playState, localPlayState])

    const restartState = useCallback(() => {
        updateLocalState(() => ({
            score: 0,
            level: 0,
            speed: config.current.startSteepInterval,
            paused: false,
            start: new Date().getTime(),
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
        restartState();
        clearInterval(stepIntervalHandle.current)
    }, [restartState, stepIntervalHandle])

    const togglePause = useCallback(() => {
        setGameState(state => ({...state, paused: !state.paused}))
        updateLocalState(state => ({...state, paused: !state.paused}))
    }, [setGameState])

    const gameOver = useCallback(()=>{
        results.pushResult({
            score: localPlayState.current.score,
            level: localPlayState.current.level,
            time: new Date().getTime() - localPlayState.current.start,
        })
        setGameState({
            over: true,
            paused: true,
        })
        clearInterval(stepIntervalHandle.current)
    }, [results, localPlayState, setGameState])

    const controller = useMemo(()=>{
        return {
            up, down, left, right, togglePause, restart, finish
        }
    }, [up, down, left, right, togglePause, restart, finish])

    const updateView = useCallback(()=>{
        view.update({
            snake: snake.current.toView(),
            bonuses: [...bonuses.current.values()].map(bonus => bonus.toView()),
        })
    }, [localPlayState, snake, bonuses, view])

    const consumeBonus = useCallback((next) => {
        const bonus = bonuses.current.get(next.toString());
        bonuses.current.delete(bonus.toString());
        snake.current.eat(next);

        const nextBonus = generateBonuses(snake.current.segmentsIds);
        bonuses.current.set(nextBonus.toString(), nextBonus);

        updateLocalState(state => bonus.modify(state));
    }, [bonuses, snake, updateLocalState, localPlayState])


    const step = useCallback(()=>{
        if(localPlayState.current.paused) return;

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
                        gameOver()
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
                        gameOver();
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
                        gameOver();
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
                        gameOver();
                        return;
                    }
                }
                next = new Coordinates(x, next.y);
                break;
            }
        }

        if(snake.current.has(next)){
            gameOver();
            return;
        }

        if(bonuses.current.has(next.toString())){
            consumeBonus(next)
        } else {
            snake.current.crawl(next);
        }
        lastStepDirection.current = direction.current;
    }, [localPlayState, gameOver, config, direction, updateView, lastStepDirection])

    const tick = useCallback(()=>{
        step();
        updateView();
    }, [step, updateView])

    const restartClock = useCallback((force = false) => {
        if(stepIntervalHandle.current){
            clearInterval(stepIntervalHandle.current)
        };
        if(gameState.over && !force) return;
        stepIntervalHandle.current = setInterval(tick, localPlayState.current.speed);
    }, [tick, stepIntervalHandle, localPlayState, gameState])

    useEffect(() =>{
        restartIntervalHandle.current = restartClock;
    }, [restartClock, restartIntervalHandle])

    useEffect(()=>{
        restart();
    }, [restart])

    return [controller, gameState]
}
import {makeAutoObservable, runInAction} from "mobx";
import React, {useContext} from "react";
import AsyncStorage from "@react-native-community/async-storage";

export class GameResultsStore {
    all = {
        beginner: [],
        easy: [],
        normal: [],
        hard: [],
        master: [],
    }
    last = null;

    constructor() {
        makeAutoObservable(this);
        this._restoreFromStore().catch(err => {
            console.warn("During restoring game results data occurred problem. " + err.message)
        })
    }

    _restoreFromStore = async() => {
        const storageValues = {};
        for(let difficulty in this.all){
            if(this.all.hasOwnProperty(difficulty)){
                const result = await AsyncStorage.getItem(difficulty);
                if(result){
                    storageValues[difficulty] = JSON.parse(result)
                }
            }
        }
        runInAction(()=>{
            Object.assign(this.all, storageValues);
        })
    }

    _storeData(difficulty, results){
        AsyncStorage.setItem(difficulty, JSON.stringify(results)).catch(err => {
            console.warn("Unable to store game results data on local storage. " + err.message)
        })
    }

    pushResult(result){
        this.last = result;
        const results = this.all[result.difficulty];
        results.push(result);
        this.all[result.difficulty] = results.sort((a, b) => b.score - a.score).slice(0,5);

        this._storeData(result.difficulty, results);
    }

}

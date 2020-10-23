import React from "react";
import {makeAutoObservable} from 'mobx';

export class GameViewBusStore {
    callback = () => null;

    constructor() {
        makeAutoObservable(this);
    }

    setUpdateCallback(callback){
        this.callback = callback;
    }

    get update(){
        return this.callback;
    }
}


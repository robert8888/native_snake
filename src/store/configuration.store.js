import React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import {makeAutoObservable, runInAction} from 'mobx';

export class ConfigurationStore {
    _config = {
        gameSize: 25,
        levelSpeedRatio: 0.98,
        startSteepInterval: 1000,
        themeName: "green",
        wallThrough: true,
        difficulty: "easy",
        drawBackground: false,
    }

    constructor() {
        makeAutoObservable(this);
        this._restoreFromStore().catch((error) => {
            console.warn("During restore value from local storage occur problem", error.message);
        })
    }

    _restoreFromStore = async() =>{
        const nextStore = {}
        for(let key in this._config){
            if(!this._config.hasOwnProperty(key)) continue;
            let item = JSON.parse(await AsyncStorage.getItem(key));
            if(!item) continue;
            let value;
            switch (item.type){
                case "number": {
                    value = parseFloat(item.value);
                    break;
                }
                case "boolean": {
                    value = !!value;
                    break;
                }
                case "object" : {
                    value = JSON.parse(item.value);
                    break;
                }
                default : {
                    value = item.value
                }
            }

            nextStore[key] = value
        }

        runInAction( () => {
            this._config = Object.assign(this._config, nextStore);
        })
    }

    _storeData = async(data) => {
        for(let key in data){
            if(data.hasOwnProperty(key))
            await AsyncStorage.setItem(key, JSON.stringify({
                type: typeof data[key],
                value: typeof data[key] === "object" ? JSON.stringify(data[key]) : data[key].toString()
            }))
        }
    }

    update(data){
        for(let key in data){
            if(data.hasOwnProperty(key))
            this._config[key] = data[key]
        }
        this._storeData(data).catch(error => {
            console.warn("Unable to store config data in local storage", error.message)
        })
    }

    get current(){
        return this._config;
    }
}

// const ConfigurationContext = React.createContext(null);
//
// export const ConfigurationProvider = ({children}) => {
//     return (
//         <ConfigurationContext.Provider value={new ConfigurationStore()}>
//              {children}
//         </ConfigurationContext.Provider>
//     )
// }
//
// export const useConfigurationStore = () => React.useContext(ConfigurationContext);



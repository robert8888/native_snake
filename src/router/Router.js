import React from 'react';
import {NativeRouter, Route} from "react-router-native";

import Start from "./../components/Start/Start";
import Settings from "./../components/Settings/Settings";
import Game from "./../components/Game/Game";


const Router = () =>{

    return (
        <NativeRouter>
            <Route exact path={"/"} component={Start}/>
            <Route exact path={"/game"} component={Game}/>
            <Route exact path={"/settings"} component={Settings}/>
        </NativeRouter>
    )
}

export default Router;
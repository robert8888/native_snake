import React from "react";
import {ConfigurationStore} from "./configuration.store";
import {GameViewStore} from "./game.view.store";
import {GamePlayStateStore} from "./game.play.store";
import {GameResultsStore} from "./game.results.store";
import {Provider} from "mobx-react";

const RootStoreProvider = ({children}) => (
    <Provider
        config={new ConfigurationStore()}
        view={new GameViewStore()}
        playState={new GamePlayStateStore()}
        results={new GameResultsStore()}>
            {children}
    </Provider>
)

export default RootStoreProvider
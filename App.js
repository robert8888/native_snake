import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
} from 'react-native';
import Router from "./src/router/Router";
//import {ConfigurationProvider} from "./src/store/configuration.store";
import RootStoreProvider from "./src/store/root.store";


const App: () => React$Node = () => {
  return (
    <>
      <RootStoreProvider>
      {/*<ConfigurationProvider>*/}
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.container}>
            <Router/>
          </View>
        </SafeAreaView>
      </RootStoreProvider>
      {/*</ConfigurationProvider>*/}
    </>
  );
};

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: "black",
  },
  container:{
    width: "100%",
    height: "100%",
    backgroundColor: "black"
  }
});

export default App;

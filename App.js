import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View, SafeAreaView, TouchableOpacity } from 'react-native';
import RNShake from 'react-native-shake';
import Torch from 'react-native-torch';


const App = () => {
  const [toggle, setToggle] = useState(false)

  //vai quarda seta o valor de toggle como true e false
  const handleChangeToggle = () => setToggle((oldToggle) => !oldToggle) 

  //vai ser usado par liga/desliga a flash
  //quem controla o flash é o Torch
  useEffect(() => {
    Torch.switchState(toggle)
  },[toggle])

  //pegando o movimento de balançar do celular
  useEffect(() => {
    const subscription = RNShake.addListener(() => {
      setToggle((oldToggle) => !oldToggle)
    })
    //desmontando componente
    return () => subscription.remove()
  },[])

  return (
    <SafeAreaView style={toggle ? styles.continueLigth : styles.container}>
      <StatusBar style={toggle ? 'dark' : 'light'} />
      <View>

        <TouchableOpacity onPress={handleChangeToggle}>
          <Image source={toggle
            ? require('./assets/icons/eco-light.png')
            : require('./assets/icons/eco-light-off.png')
          } style={toggle ? styles.lightingOn : styles.lightingOff} />

          <Image source={toggle
            ? require('./assets/icons/logo-dio.png')
            : require('./assets/icons/logo-dio-white.png')
          } style={styles.dio} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueLigth: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },
  dio: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 200,
    height: 150,
  }
});
import { useState, useEffect } from 'react';
import { Text, TextInput, Alert } from 'react-native';
import ScreenWrapper from './components/screen-wrappers/ScreenWrapper';

// 🔹 Componente do Sensor (IMPORTANTE)
function Sensor() {
  const [distancia, setDistancia] = useState<number>(0);

  // 🔹 Inicialização + intervalo + cleanup
  useEffect(() => {
    console.log('📡 Sistema de Sensores Iniciado');

    const interval = setInterval(() => {
      console.log('📡 Monitorando...');
    }, 2000);

    return () => {
      clearInterval(interval);
      console.log('📴 Sistema de Sensores Desligado');
    };
  }, []);

  // 🔹 Monitoramento da distância
  useEffect(() => {
    if (distancia < 20 && distancia > 0) {
      Alert.alert('⚠️ PERIGO: Muito Próximo!');
    }
  }, [distancia]);

  return (
    <>
      <Text>Sensor de Estacionamento</Text>

      <Text>Distância (cm): {distancia}</Text>

      <TextInput
        placeholder="Digite a distância em cm"
        keyboardType="numeric"
        onChangeText={(text) => setDistancia(Number(text))}
      />
    </>
  );
}

// 🔹 Componente principal (controle de ligar/desligar)
export default function App() {
  const [mostrarSensor, setMostrarSensor] = useState<boolean>(true);

  return (
    <ScreenWrapper gap={10} center>
      <Text onPress={() => setMostrarSensor(!mostrarSensor)}>
        {mostrarSensor ? 'Desligar Sensor' : 'Ligar Sensor'}
      </Text>

      {mostrarSensor && <Sensor />}
    </ScreenWrapper>
  );
}
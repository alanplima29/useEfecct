import { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import ScreenWrapper from "./components/screen-wrappers/ScreenWrapper";

/**
 * Componente Sensor
 * Responsável por simular o funcionamento de um sensor de estacionamento.
 */
function Sensor() {
  // Estado que armazena a distância informada pelo usuário
  const [distancia, setDistancia] = useState<number>(0);

  /**
   * Define a cor do indicador com base na distância
   * - Menor que 20: perigo
   * - Entre 20 e 40: atenção
   * - Maior que 40: seguro
   */
  const getColor = () => {
    if (distancia < 20) return "#ff4d4d";
    if (distancia < 40) return "#ffaa00";
    return "#4caf50";
  };

  /**
   * useEffect com array vazio []
   * Executado apenas na montagem do componente (mount)
   * Responsável por:
   * - Iniciar o sistema
   * - Criar um intervalo que simula o monitoramento contínuo
   * - Retornar função de limpeza (cleanup)
   */
  useEffect(() => {
    console.log("Sistema de Sensores Iniciado");

    const interval = setInterval(() => {
      console.log("Monitorando sensor...");
    }, 2000);

    // Função de limpeza executada ao desmontar o componente
    return () => {
      clearInterval(interval);
      console.log("Sistema de Sensores Desligado");
    };
  }, []);

  /**
   * useEffect com dependência [distancia]
   * Executado sempre que a distância é alterada (update)
   * Responsável por:
   * - Verificar se a distância é menor que 20 cm
   * - Exibir alerta de perigo
   */
  useEffect(() => {
    const valorTexto = String(distancia);

    if (valorTexto.length >= 2 && distancia < 20 && distancia > 0) {
      Alert.alert("PERIGO: Distância muito próxima");
    }
  }, [distancia]);
  return (
    <View style={styles.sensorContainer}>
      <Text style={styles.title}>Sensor de Estacionamento</Text>

      {/* Indicador visual de proximidade */}
      <View style={[styles.indicator, { backgroundColor: getColor() }]} />

      {/* Exibição da distância atual */}
      <Text style={styles.distance}>{distancia} cm</Text>

      {/* Entrada de dados */}
      <TextInput
        style={styles.input}
        placeholder="Digite a distância em cm"
        keyboardType="numeric"
        onChangeText={(text) => setDistancia(Number(text))}
      />
    </View>
  );
}

/**
 * Componente principal
 * Responsável por controlar a exibição do sensor
 * Permite simular o ciclo de vida (mount/unmount)
 */
export default function App() {
  // Estado que controla se o sensor está visível
  const [mostrarSensor, setMostrarSensor] = useState<boolean>(true);

  return (
    <ScreenWrapper gap={10} center>
      {/* Botão simples para ligar/desligar o sensor */}
      <Text
        style={styles.toggle}
        onPress={() => setMostrarSensor(!mostrarSensor)}
      >
        {mostrarSensor ? "Desligar Sensor" : "Ligar Sensor"}
      </Text>

      {/* Renderização condicional para testar unmount */}
      {mostrarSensor && <Sensor />}
    </ScreenWrapper>
  );
}

/**
 * Estilos da aplicação
 */
const styles = StyleSheet.create({
  sensorContainer: {
    alignItems: "center",
    gap: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  indicator: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  distance: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: 200,
    padding: 10,
    borderRadius: 8,
    textAlign: "center",
  },
  toggle: {
    fontSize: 16,
    color: "blue",
    marginBottom: 10,
  },
});

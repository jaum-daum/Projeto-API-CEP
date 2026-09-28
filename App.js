import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

export default function App() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('null');

  const buscarCep = async () => {
    try {
      const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setEndereco(resposta.data);
    } catch (error) {
      console.log('Erro ao buscar o CEP');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Busca CEP</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o CEP"
        value={cep}
        onChangeText={setCep}
      />

      <TouchableOpacity style={styles.botao} onPress={buscarCep}>
        <Text style={styles.textoBotao}>Buscar</Text>
      </TouchableOpacity>

      {endereco && (
        <View style={styles.resultado}>
          <Text>Logradouro: {endereco.logradouro}</Text>
          <Text>Bairro: {endereco.bairro}</Text>
          <Text>
            Cidade: {endereco.localidade} - {endereco.uf}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  botao: {
    width: '100%',
    height: 45,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  resultado: {
    marginTop: 20,
    width: '100%',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});

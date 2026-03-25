import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../services/FirebaseConfig";
import { useRouter } from "expo-router";

export default function CadastroScreen() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const router = useRouter();

  const handleCadastro = () => {
    if (!nome || !email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }
    createUserWithEmailAndPassword(auth, email, senha)
      .then(async (userCredential) => {
        await updateProfile(userCredential.user, { displayName: nome });
        router.replace("/Home");
      })
      .catch((error) => {
        console.log(error.code, error.message);
        if (error.code === "auth/email-already-in-use") {
          Alert.alert("Erro", "Este e-mail já está cadastrado.");
        } else if (error.code === "auth/weak-password") {
          Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
        } else {
          Alert.alert("Erro", "Não foi possível criar a conta.");
        }
      });
  };

  return (
    <View style={styles.container}>

      <Image 
        source={require("../assets/logo.png")} 
        style={styles.logo}
      />

      <Text style={styles.titulo}>Criar Conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        placeholderTextColor="#aaa"
        autoComplete="off"
        autoCapitalize="words"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
        <Text style={styles.textoBotao}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.link}>Já tem conta? Fazer login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({

  container: { 
    flex: 1, 
    backgroundColor: "#0F0F13", 
    justifyContent: "center", 
    padding: 20 
  },

  titulo: { 
    fontSize: 28, 
    fontWeight: "bold", 
    color: "#fff", 
    marginBottom: 30, 
    textAlign: "center" 
  },

  input: { 
    backgroundColor: "#1C1B23", 
    color: "#fff", 
    borderRadius: 10, 
    padding: 15, 
    minHeight: 52,
    marginBottom: 15, 
    fontSize: 16, 
    borderWidth: 1, 
    borderColor: "#2D2B3D" 
  },

  botao: { 
    backgroundColor: "#7C3AED", 
    padding: 15, 
    borderRadius: 10, 
    alignItems: "center" 
  },

  textoBotao: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "bold" 
  },

  link: { 
    marginTop: 20, 
    color: "#9D6FF7", 
    textAlign: "center", 
    fontSize: 15 
  },

   logo: {
    width: 300,
    height: 300,
    alignSelf: "center",
    marginTop: -80, 
    marginBottom: -80,   
    resizeMode: "contain",
  }
  
});
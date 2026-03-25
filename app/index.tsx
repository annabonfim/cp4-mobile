import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/FirebaseConfig";
import { useRouter, Link } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }
    signInWithEmailAndPassword(auth, email, senha)
      .then(() => router.replace("/Home"))
      .catch((error) => {
        console.log(error.code, error.message);
        Alert.alert("Erro", "E-mail ou senha inválidos.");
      });
  };

  return (
    
    <View style={styles.container}>

      <Image 
        source={require("../assets/logo.png")} 
        style={styles.logo}
      />

      <Text style={styles.titulo}>Meu Boletim - Login</Text>

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

      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>

      <Link href="/Cadastro" style={styles.link}>
        Não tem conta? Cadastre-se
      </Link>

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
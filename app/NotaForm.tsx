import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
  KeyboardAvoidingView, Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { auth } from "../services/FirebaseConfig";
import { criarNota, atualizarNota } from "../services/NotaService";

export default function NoteForm() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const isEditing = !!params.id;

  const [titulo, setTitulo] = useState(params.titulo as string ?? "");
  const [conteudo, setConteudo] = useState(params.conteudo as string ?? "");

  const salvarNota = async () => {
    if (!titulo.trim() || !conteudo.trim()) {
      Alert.alert("Atenção", "Preencha o título e o conteúdo.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Erro", "Nenhum usuário autenticado.");
      return;
    }

    try {
      if (isEditing) {
        await atualizarNota(params.id as string, titulo.trim(), conteudo.trim());
        Alert.alert("Sucesso", "Nota atualizada!");
      } else {
        await criarNota(user.uid, titulo.trim(), conteudo.trim());
        Alert.alert("Sucesso", "Nota criada!");
      }
      router.back();
    } catch (error) {
      console.log("Erro ao salvar nota:", error);
      Alert.alert("Erro", "Não foi possível salvar a nota.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.voltar}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.titulo}>
            {isEditing ? "Editar Nota" : "Nova Nota"}
          </Text>
          <View style={{ width: 60 }} />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Título"
          placeholderTextColor="#aaa"
          value={titulo}
          onChangeText={setTitulo}
        />

        <TextInput
          style={[styles.input, styles.inputConteudo]}
          placeholder="Conteúdo"
          placeholderTextColor="#aaa"
          multiline
          value={conteudo}
          onChangeText={setConteudo}
        />

        <TouchableOpacity style={styles.botao} onPress={salvarNota}>
          <Text style={styles.botaoTexto}>Salvar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  container: { 
    flex: 1, 
    backgroundColor: "#0F0F13" 
  },

  inner: { 
    flex: 1, 
    padding: 20 
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  voltar: { 
    color: "#9D6FF7", 
    fontSize: 16 
  },

  titulo: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: "#fff" 
  },

  input: {
    backgroundColor: "#1C1B23",
    color: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#2D2B3D",
  },

  inputConteudo: {
    height: 200,
    textAlignVertical: "top",
  },

  botao: {
    backgroundColor: "#7C3AED",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },

  botaoTexto: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "bold" 
  },
});
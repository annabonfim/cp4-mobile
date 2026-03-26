import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/FirebaseConfig";
import { Nota, deletarNota, escutarNotas } from "../services/NotaService";
import ItemNota from "./components/ItemNota";
import { Ionicons } from "@expo/vector-icons";


export default function Home() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const router = useRouter();

  useEffect(() => {
    let unsubscribeNotas: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (unsubscribeNotas) {
        unsubscribeNotas();
        unsubscribeNotas = undefined;
      }

      if (!user) {
        router.replace("/");
        return;
      }

      unsubscribeNotas = escutarNotas(
        user.uid,
        (dados) => setNotas(dados),
        (error) => console.log("Erro ao buscar notas:", error)
      );
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeNotas) unsubscribeNotas();
    };
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
  };

  const confirmarDelecao = (nota: Nota) => {
  Alert.alert("Deletar Nota", `Deseja deletar "${nota.titulo}"?`, [
    { text: "Cancelar", style: "cancel" },
    {
      text: "Deletar",
      style: "destructive",
      onPress: async () => {
        try {
          const user = auth.currentUser;
          if (!user) return;
          await deletarNota(user.uid, nota.id);
        } catch (error) {
          Alert.alert("Erro", "Não foi possível deletar a nota.");
        }
      },
    },
  ]);
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Minhas Notas</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="exit-outline" size={28} color="#E83F5B" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notas}
        style={styles.lista}
        contentContainerStyle={styles.listaConteudo}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemNota
            titulo={item.titulo}
            conteudo={item.conteudo}
            onEditPress={() =>
              router.push({ pathname: "/NotaForm", params: { id: item.id, titulo: item.titulo, conteudo: item.conteudo } })
            }
            onDeletePress={() => confirmarDelecao(item)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma nota criada ainda.</Text>
        }
      />

      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => router.push("/NotaForm")}
      >
        <Text style={styles.botaoAdicionarTexto}>+ Nova Nota</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  container: { 
    flex: 1, 
    backgroundColor: "#121212" 
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingBottom: 10,
  },

  titulo: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: "#fff" 
  },

  logoutTexto: { 
    color: "#E83F5B", 
    fontSize: 16 
  },

  lista: { 
    flex: 1 
  },

  listaConteudo: { 
    gap: 10, 
    paddingVertical: 10, 
    paddingBottom: 20 
  },

  emptyText: { 
    color: "#aaa", 
    textAlign: "center", 
    fontSize: 16, 
    marginTop: 40 
  },

  botaoAdicionar: {
    backgroundColor: "#7C3AED",
    margin: 16,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  botaoAdicionarTexto: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold" 
  }
});
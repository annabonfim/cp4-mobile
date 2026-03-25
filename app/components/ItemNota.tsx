import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  titulo: string;
  conteudo: string;
  onEditPress: () => void;
  onDeletePress: () => void;
};

export default function ItemNota({ titulo, conteudo, onEditPress, onDeletePress }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.textos}>
        <Text style={styles.titulo} numberOfLines={1}>{titulo}</Text>
        <Text style={styles.conteudo} numberOfLines={2}>{conteudo}</Text>
      </View>
      <View style={styles.botoes}>
        <TouchableOpacity style={styles.botaoEditar} onPress={onEditPress}>
          <Text style={styles.textoBotao}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoDeletar} onPress={onDeletePress}>
          <Text style={styles.textoBotao}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#1C1B23",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#2D2B3D",
  },

  textos: { marginBottom: 10 },
  titulo: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold", 
    marginBottom: 4 
  },

  conteudo: { 
    color: "#9B9BA8", 
    fontSize: 14 
  },

  botoes: { 
    flexDirection: "row", 
    gap: 8 
  },

  botaoEditar: {
    flex: 1,
    backgroundColor: "#7C3AED",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },

  botaoDeletar: {
    flex: 1,
    backgroundColor: "#E83F5B",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },

  textoBotao: { 
    color: "#fff", 
    fontWeight: "600" 
  },
  
});
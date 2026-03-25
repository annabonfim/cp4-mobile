import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./FirebaseConfig";

export type Nota = {
  id: string;
  titulo: string;
  conteudo: string;
  criadoEm?: any;
};

export async function criarNota(uid: string, titulo: string, conteudo: string) {
  await addDoc(collection(db, "notas"), {
    uid,
    titulo,
    conteudo,
    criadoEm: serverTimestamp(),
  });
}

export async function atualizarNota(notaId: string, titulo: string, conteudo: string) {
  const notaRef = doc(db, "notas", notaId);
  await updateDoc(notaRef, { titulo, conteudo });
}

export async function deletarNota(notaId: string) {
  const notaRef = doc(db, "notas", notaId);
  await deleteDoc(notaRef);
}

export function escutarNotas(
  uid: string,
  callback: (notas: Nota[]) => void,
  onError?: (error: Error) => void
) {
  const q = query(
    collection(db, "notas"),
    where("uid", "==", uid),
    orderBy("criadoEm", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const notas = snapshot.docs.map((doc) => ({
        id: doc.id,
        titulo: doc.data().titulo as string,
        conteudo: doc.data().conteudo as string,
        criadoEm: doc.data().criadoEm,
      }));
      callback(notas);
    },
    onError
  );
}
# 📓 Meu Boletim

App de notas com autenticação desenvolvido em React Native com Expo, Firebase Authentication e Firestore.

---

## 👥 Integrantes

| Nome | RM |
|------|----|
| Anna Beatriz de Araujo Bonfim | RM 559561 |

---

## 📽️ Vídeo de Demonstração

> 🔗 [Assista ao vídeo de demonstração aqui](#)

---

## 📱 Sobre o Projeto

O **Meu Boletim** é um aplicativo mobile de notas com autenticação de usuários. Cada usuário possui suas próprias notas, que são salvas e sincronizadas em tempo real com o Firestore. O app foi desenvolvido como projeto do **CheckPoint 4** da disciplina de **Mobile Application Development** na FIAP.

### Funcionalidades

- ✅ Cadastro de usuário com nome, e-mail e senha
- ✅ Login e logout
- ✅ Criar nota
- ✅ Listar notas do usuário logado
- ✅ Editar nota
- ✅ Deletar nota com confirmação
- ✅ Cada usuário vê apenas suas próprias notas

---

## 🛠️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/) (SDK 55)
- [Expo Router](https://expo.github.io/router/) — navegação baseada em arquivos
- [Firebase Authentication](https://firebase.google.com/products/auth) — autenticação de usuários
- [Cloud Firestore](https://firebase.google.com/products/firestore) — banco de dados em tempo real
- [TypeScript](https://www.typescriptlang.org/)
- [@expo/vector-icons](https://docs.expo.dev/guides/icons/) — ícones

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [Expo Go](https://expo.dev/client) instalado no celular ou emulador configurado
- Conta no [Firebase](https://firebase.google.com/)

### Passo a passo

**1. Clone o repositório**
```bash
git clone https://github.com/annabonfim/cp4-mobile.git
cd cp4-mobile
```

**2. Crie o arquivo `.npmrc`** na raiz do projeto com o seguinte conteúdo:
```
legacy-peer-deps=true
```

**3. Instale as dependências**
```bash
npm install
```

**4. Configure o Firebase**

- Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
- Ative o **Authentication** com o provedor **E-mail/senha**
- Crie um banco de dados **Firestore** em modo de teste
- Copie as credenciais do seu projeto e substitua no arquivo `services/FirebaseConfig.tsx`

**5. Rode o projeto**
```bash
npx expo start
```

**6. Abra no celular ou emulador**

Escaneie o QR code com o app **Expo Go** (Android) ou a câmera (iOS).

Ou use os atalhos no terminal:
- Pressione `a` para abrir no emulador Android
- Pressione `i` para abrir no simulador iOS
- Pressione `w` para abrir no navegador

---

## 📁 Estrutura do Projeto

```
cp4-mobile/
├── app/
│   ├── _layout.tsx           # Configuração de navegação
│   ├── index.tsx             # Tela de Login
│   ├── Cadastro.tsx          # Tela de Cadastro
│   ├── Home.tsx              # Tela principal (lista de notas)
│   ├── NotaForm.tsx          # Tela de criar/editar nota
│   └── components/
│       └── ItemNota.tsx      # Componente de card de nota
├── services/
│   ├── FirebaseConfig.tsx    # Configuração do Firebase
│   └── NotaService.ts        # Funções de CRUD das notas
└── assets/
    └── logo.png
```
---

## 🔥 Firestore

As notas são salvas na subcoleção `usuarios/{uid}/notas` com a seguinte estrutura:
```json
{
  "titulo": "título da nota",
  "conteudo": "conteúdo da nota",
  "criadoEm": "timestamp"
}
```

Cada usuário possui sua própria subcoleção, garantindo isolamento total dos dados.

---

## 📸 Screenshots

| Login | Cadastro | Home | Nova Nota |
|-------|----------|------|-----------|
| ![Login](#) | ![Cadastro](#) | ![Home](#) | ![Nova Nota](#) |

---

## 📌 Observações

- O projeto utiliza `.npmrc` com `legacy-peer-deps=true` para resolver conflitos de dependências do Expo Router com o npm versão 7+
- A sessão do usuário é gerenciada pelo Firebase Authentication via `onAuthStateChanged`
- O índice composto do Firestore (campo `uid` + `criadoEm`) precisa ser criado no Firebase Console na primeira execução — o link é gerado automaticamente no terminal

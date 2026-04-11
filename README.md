# Synapse — Frontend
#Estive aqui. Prof. Rondineli Seba Salomão

Interface web da plataforma Synapse. Permite ao usuário submeter vídeos do YouTube, visualizar o quiz gerado e interagir com o agente tutor em uma sessão de estudos.

## Funcionalidades

- **Autenticação** — telas de login e cadastro com persistência de token (localStorage)
- **Geração de quiz** — formulário para colar URL do YouTube e definir número de perguntas
- **Visualização do quiz** — exibe resumo do vídeo e redireciona para a sessão
- **Sessão de estudo** — interface de chat com o agente tutor, flashcards com alternativas clicáveis e feedback em tempo real
- **Histórico** — lista de sessões concluídas com score

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Framework | React 19 |
| Build tool | Vite |
| Estilização | TailwindCSS v4 |
| Roteamento | React Router DOM v7 |
| HTTP client | Axios |
| Estado global | Context API (AuthContext) |

## Estrutura

```
src/
├── pages/       # Home, Login, Register, Quiz, Session, History
├── components/  # Navbar, FlashCard, ChatBubble, LoadingState
├── services/    # api.js — axios instance + todas as chamadas à API
└── store/       # AuthContext.jsx — autenticação global
```

## Como rodar

```bash
cp .env.example .env
# ajuste VITE_API_BASE_URL se necessário

npm install
npm run dev
```

Disponível em `http://localhost:5173`.

# 📋 To-Do List Avançado

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-000000?style=for-the-badge&logo=framer&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

Um **gerenciador de tarefas moderno, funcional e visualmente impressionante**, construído com React e Tailwind CSS. Ideal para organizar sua rotina com categorias, prioridades, data/hora e muito mais!

✨ **Totalmente responsivo** | 💾 **Persistência automática** | 📤 **Exportação para CSV** | 🎨 **Design futurista**

---

## 🌟 Funcionalidades

- ✅ **Adicionar, editar e excluir tarefas**
- 🗂️ **Categorias**: Casa, Trabalho, Escola, Faculdade
- 📅 **Data e hora** obrigatórias para cada tarefa
- 🔴 **Prioridades**: Alta, Média, Baixa (com ícones visuais)
- 📊 **Dashboard em tempo real** com:
  - Total de tarefas
  - Concluídas / Pendentes / Atrasadas
  - Contagem por prioridade e categoria
- ⚠️ **Detecção automática de tarefas atrasadas**
- 📤 **Exportar tarefas para CSV** (por categoria ou todas)
- 🗑️ **Limpar todas as tarefas** (com confirmação)
- 💾 **Persistência com `localStorage`** (nada se perde ao recarregar!)
- 🧭 **Navegação por categoria** com URLs reais (`/casa`, `/trabalho`, etc.)
- 🎨 **Layout em duas colunas** (formulário + resumo)
- 📱 **Totalmente responsivo** (móvel, tablet, desktop)

---

## 🖼️ Prévia

### Desktop
![Desktop Preview](https://via.placeholder.com/800x500/1e293b/ffffff?text=To-Do+List+Desktop+Preview)
> *(Substitua pelo print real do seu app!)*

### Mobile
![Mobile Preview](https://via.placeholder.com/300x600/1e293b/ffffff?text=To-Do+List+Mobile+Preview)

---

## 🛠️ Tecnologias Utilizadas

| Ferramenta | Propósito |
|-----------|----------|
| **React** | Biblioteca principal para interface |
| **Tailwind CSS** | Estilização rápida e moderna |
| **Framer Motion** | Animações suaves e micro-interações |
| **React Router DOM** | Navegação entre categorias |
| **localStorage** | Persistência de dados no navegador |
| **ESLint + Prettier** | Qualidade e padronização de código |

---

## 🚀 Como Rodar Localmente

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/to-do-list.git
   cd to-do-list
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm start
   ```

4. **Acesse no navegador**
   ```
   http://localhost:3000
   ```

---

## 🌐 Deploy Online (Vercel)

Este projeto está configurado para deploy automático com **Vercel**. Basta:

1. Conectar seu repositório ao [Vercel](https://vercel.com)
2. Clicar em **Deploy**
3. Pronto! Seu app estará online em minutos.

> 🔗 **Link de exemplo**: [https://to-do-list.vercel.app](https://to-do-list.vercel.app) *(substitua pelo seu)*

---

## 📁 Estrutura do Projeto

```
to-do-list/
├── public/
├── src/
│   ├── components/
│   │   ├── CaixaStatus.jsx
│   │   ├── Formulario.jsx
│   │   └── ResumoTarefas.jsx
│   ├── App.js
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── package.json
└── README.md
```

---

## 💡 Dicas de Uso

- **Tarefas atrasadas** são detectadas automaticamente (data/hora no passado + não concluída).
- Use o **botão "Exportar CSV"** para fazer backup ou analisar suas tarefas em planilhas.
- Clique no ícone ✏️ para **editar uma tarefa existente**.
- Navegue pelas categorias no header para **filtrar rapidamente**.

---

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:

- Abrir uma **issue** para relatar bugs ou sugerir melhorias
- Enviar um **pull request** com novas funcionalidades

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## ✨ Feito com ❤️ por [Seu Nome]

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/seu-perfil)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/seu-usuario)

> "Organize seu tempo, conquiste seus objetivos."
```

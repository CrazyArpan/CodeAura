<div align="center">

# ⚡ CodeAura

**A sleek, blazing-fast in-browser code editor with multi-language execution.**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-latest-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Monaco](https://img.shields.io/badge/Monaco_Editor-VS_Code_Engine-007ACC?style=flat-square&logo=visualstudiocode)](https://microsoft.github.io/monaco-editor/)
[![Judge0](https://img.shields.io/badge/Powered_by-Judge0-FF6B6B?style=flat-square)](https://judge0.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)

</div>

---

## ✨ What is CodeAura?

CodeAura is a browser-based IDE that lets you write, run, and preview code — no setup, no install, no friction. Switch languages on the fly, run your code against a real execution engine, and get instant output. It's built for developers who want speed.

> Write code. Hit run. See it work.

---

## 🚀 Features

| Feature | Details |
|---|---|
| 🧠 **Monaco Editor** | The exact engine powering VS Code — autocomplete, syntax highlighting, and keybindings included |
| ⚡ **Judge0 Execution** | Real server-side code execution with time and memory stats |
| 🌐 **Web Preview** | Live HTML/CSS/JS projects rendered in a new tab with zero config |
| 🎨 **Dynamic Theming** | The UI accent color shifts to match your selected language |
| 📁 **Multi-File Workspace** | Create, rename, and delete files within your session |
| 📊 **Rich Output Panel** | Color-coded stdout, stderr, execution time, and memory usage |
| ↕️ **Resizable Panels** | Drag the divider to give more space to your editor or output |
| 🧩 **Glassmorphism UI** | Modern blurred-glass modals and panels |

---

## 🛠️ Supported Languages

<div align="center">

| Language | Runner | Extension |
|---|---|---|
| 🐍 Python | Judge0 | `.py` |
| 🟨 JavaScript (Node.js) | Judge0 | `.js` |
| 🔷 TypeScript | Judge0 | `.ts` |
| ☕ Java | Judge0 | `.java` |
| ⚙️ C++ | Judge0 | `.cpp` |
| 🔵 C | Judge0 | `.c` |
| 🦀 Rust | Judge0 | `.rs` |
| 🐹 Go | Judge0 | `.go` |
| 🖥️ Bash | Judge0 | `.sh` |
| 🌐 HTML / CSS / JS | In-browser | `.html` |

</div>

---

## 🏗️ Tech Stack

```
Frontend     → React 18 + Vite
Editor       → @monaco-editor/react (VS Code engine)
Execution    → Judge0 CE API (server-side sandboxed runner)
Icons        → Lucide React
Styling      → Vanilla CSS with CSS custom properties
```

---

## 🧑‍💻 Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/code-aura.git
cd code-aura/python-editor

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and start coding.

> **Note:** You'll need a Judge0 API key for server-side language execution. Add it to your environment or the `useJudge0` hook config.

---

## 📂 Project Structure

```
src/
├── components/
│   ├── Header.jsx        # Toolbar: filename, language picker, run button
│   ├── Sidebar.jsx       # File explorer with add/delete
│   ├── CodeEditor.jsx    # Monaco editor wrapper
│   ├── OutputPanel.jsx   # Execution output with color-coded lines
│   └── ResizeHandle.jsx  # Draggable panel divider
├── hooks/
│   └── useJudge0.js      # Judge0 API integration
├── utils/
│   └── languages.js      # Language configs: IDs, colors, default code
└── App.jsx               # Root layout and state management
```

---

## 🎨 Dynamic Language Theming

Each language has its own accent color. When you switch languages, the entire UI instantly recolors to match:

- 🟡 **JavaScript** → Amber
- 🟠 **HTML** → Orange-Red  
- 🔵 **Python** → Blue
- 🟣 **C++** → Violet
- 🔴 **Java** → Red
- 🩵 **Go / C** → Cyan
- 🟠 **Rust** → Orange
- 🟢 **Bash** → Emerald

---

## 📄 License

MIT — do whatever you want with it.

---

<div align="center">
  Built with ☕ and too many late nights.
</div>

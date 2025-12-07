# FinGuardian — AI-Powered Personal Finance Coach

FinGuardian is a next-generation financial visibility and coaching tool built with **Next.js 15**, **TypeScript**, **Prisma**, **SQLite**, and **on-device LLM inference** (via Ollama).  
It transforms raw transaction history into immediate clarity, actionable insights, and personalized coaching.

This project was developed as part of a 48-hour prototype challenge and demonstrates:
- High-quality engineering practices  
- Secure architecture  
- ML-backed financial reasoning  
- UX tailored toward clarity and behavior change  

---

## ✨ Features

### **Financial Dashboard**
- Month-by-month spending visualization  
- Income, expenses, net savings  
- Category-level spending  
- 12 months of synthetic realistic financial data  
- Three-month trend extraction

### **AI Financial Coach**
Powered locally using **Gemma2:9b** or **Qwen 32B** via Ollama:

- Generates human-quality financial insights  
- Avoids hallucination via numeric grounding  
- Detects anomalies like:
  - spending spikes  
  - travel bursts  
  - holiday overspending  
  - subscription creep  
  - forgotten trials  
- Provides 11th-grade reading-level suggestions  
- Allows **two-way chat** with stateful memory

### **Budget Sentry**
- Configurable category budgets  
- Near-limit and over-limit detection  
- Color-coded UX and progress bars  
- Designed for quick scan behavior

### **Security-first Architecture**
- No external APIs required for prototype  
- All inference runs on-device  
- No financial data leaves your machine  
- Clear path defined for production hardening (Plaid + encrypted DB)

---

## Tech Stack

- **Next.js 15 (App Router)**
- **TypeScript**
- **Prisma ORM**
- **SQLite (local dev)**
- **Tailwind v4 + shadcn/ui**
- **Ollama (running Gemma2:9b)**
- **React Server Components**
- **asynchronous LLM UI**

---

## Getting Started

### 1. Install dependencies

```bash
npm install

```
### 2. Initialize and Seed Prisma DB 
```bash
npx prisma generate
npx prisma migrate dev
npm run seed
```

### 3. Download and start Ollama model
```bash
ollama pull gemma2:9b
ollama pull 
ollama serve
```

### 4. Configure model for higher-spec machines (Tested on M3 Pro Apple Silicon w/ 38GB Unified Memory)
```bash
ollama create gemma2-9b-8k -f models/gemma2-9b-8k.Modelfile 
```

### 5. Start node server
```bash
npm run dev
```

### 6. Open app

navigate to **http://localhost:3000**


# FinGuardian — AI-Powered Personal Finance Coach

FinGuardian is a next-generation financial visibility and coaching tool built with **Next.js 15**, **TypeScript**, **Prisma**, **SQLite**, and **on-device LLM inference** (via Ollama).  
It transforms raw transaction history into immediate clarity, actionable insights, and personalized coaching.

This project was developed as part of a 48-hour prototype challenge and demonstrates:
- High-quality engineering practices  
- Secure architecture  
- ML-backed financial reasoning  
- UX tailored toward financial  clarity and encouraging positive behavior change

## Demo Video
[![FinGuardian Demo](https://img.youtube.com/vi/EY6e8Rf-n_s/0.jpg)](https://www.youtube.com/watch?v=EY6e8Rf-n_s)
### [Watch the demo on YouTube](https://www.youtube.com/watch?v=EY6e8Rf-n_s)
---

## Features

### **Financial Dashboard**
- Month-by-month spending visualization  
- Income, expenses, net savings  
- Category-level spending  
- 12 months of synthetic realistic financial data  
- Three-month trend extraction
<img width="1920" height="1974" alt="image" src="https://github.com/user-attachments/assets/145b783d-9664-453b-bbc3-f3fc6bc9172d" />



### **AI Financial Coach**
Powered locally using **Gemma2:9b** via Ollama:

- Generates high quality financial insights  
- Avoids hallucination via numeric grounding  
- Detects anomalies like:
  - spending spikes  
  - travel bursts  
  - holiday overspending  
  - subscription creep  
  - forgotten trials  
- Provides 11th-grade reading-level suggestions  
- Allows **two-way chat** with stateful memory
<img width="1872" height="983" alt="image" src="https://github.com/user-attachments/assets/0d78752d-c9ef-44b0-bb5f-f23ef5dad668" />




### **Budget Sentry**
- Configurable category budgets  
- Near-limit and over-limit detection  
- Progress bars and color-coded UI for urgency signaling
- Designed for quickly scanning, rather than taking a deep dive.
<img width="1872" height="447" alt="image" src="https://github.com/user-attachments/assets/10e8feac-9bc8-4aa7-bf98-10f84d7b09e6" />


### **Security-first Architecture**
- No unsecure external APIs required
- All inference runs on-device
- No financial data leaves your machine  
- Clear path defined for production hardening (Plaid + DB encryption)

---

## Tech Stack

- **Next.js 15 (App Router)**
- **TypeScript**
- **Prisma ORM**
- **SQLite (local dev)**
- **Tailwind v4 + shadcn/ui**
- **Ollama (running Gemma2:9b)**
- **React Server Components**
- **Asynchronous LLM UI**

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


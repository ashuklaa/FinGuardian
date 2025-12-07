# FinGuardian — Technical Design Document

## 1. Overview

FinGuardian is a 48-hour prototype to showcase AI being applied in a fiduciary use case, utilizing raw financial transaction data to provide personalized, trustworthy insights.  

The success metrics used to evaluate completeness of this MVP:

- **Behavior change**
- **Financial visibility**
- **Security and trust**
- **AI-enhanced analysis**
- **Clean, maintainable code**

---

## 2. Core Requirements & Success Metrics

### 2.1 Behavioral Change  
Finn, the AI assistant, provides:
- Specific, numeric suggestions  
- Rolling three month trend-based insights 
- Subscription creep detection  
- Spending spike detection  
- Encouraging, non-judgmental language  
- Actionable insights 

### 2.2 Financial Visibility  
In addition to the capabilities of the AI Coach, data visualization is also an important aspect of understanding finances. This dashboard showcases the following metrics for a clean, all-around picture:
- Income, expenses, net savings  
- Category-level spending  
- Transaction history  
- Budget utilization  
- AI insights by month

### 2.3 Security & Trust  
When handling financial data, it must be stored according to regulations and should convey a strong trust sentiment to end users. This MVP version exemplifies this ideology by implementing the following:
- Local, on-device LLM inference
- Prisma layer for DB integrity  
- Server-isolated data access (Client components cannot call data access APIs or Prisma schemas directly)
- Production migration plan: 
  - Implement OAUTH/SSO
  - Gate API with JWT
  - Encrypting database at rest
  - Utilize secure 3rd-party financial APIs only (i.e. Plaid)

### 2.4 AI Application  
Implemented using:
- On-device LLM via Ollama
- A structured system prompt enforcing numeric grounding  (see src/server/ai/getFinanceInsights.tsx)
- Trend extraction using deterministic preprocessing for certain datapoints to allow for simultaneous visualization
- Per-month contextual analysis
- User conversational memory fed into each LLM request for better context and personalization

---

## 3. System Architecture

### 3.1 High-Level Diagram
Client UI 
  -> (fetch) -> API Route (/api/insights) 
  -> LLM Service (Ollama local server)
  -> AI response returned to UI

All computation, including LLM inference, remains on device.

---

## 4. Data Model

### Key Entities
- **User**
- **Account**
- **Transaction**
- **CategoryBudget**

Each category budget contains:
- `monthlyLimit`
- `isFixed` (for deterministic expenses)
- Automatic status classification: `ok`, `near`, `over`

Twelve months of realistic synthetic data include:
- Income
- Rent  
- Utilities  
- Travel anomalies  
- Shopping spikes  
- Coffee/Dining upward trends  
- Subscription creep  
- Abandoned free trials  

This allows the AI coach to demonstrate **forecasting**, **pattern recognition**, and **anomaly detection**.

---

## 5. AI Pipeline

### 5.1 Preprocessing
Before calling the model, the app computes:
- Monthly totals  
- Category totals  
- Three-month transaction data snippets  
- Top merchants  
- Budget utilization  
- User chat history  

### 5.2 Prompt Engineering

The system prompt enforces:
- 11th-grade lexile (found to be most commonly understandable by AI users) 
- No hallucination by requiring the use of empirical data in each line of the response
- Statistical grounding, only allowing calculations on provided numbers
- Avoiding unrealistic suggestions 
- No scolding language 
- Markdown formatting  
- Full English output in case a model with Chinese tokenization is used (i.e. Qwen:32b, etc.)  

### 5.3 Model Execution
The request:

```json
{
  "model": "gemma2:9b",
  "prompt": "<system prompt + user inputs>",
  "stream": false
}
```

### 5.4 Response Handling

The client UI uses:
- NextJS-style "suspense" boundaries with client component injection
- Skeleton loaders
- Markdown rendering with ReactMarkdown
- Chat bubble conversational UI for Finn Chat

## 6. Security Considerations
### 6.1 Prototype Security
- All inference is local
- No network calls
- SQLite DB only stores synthetic data
- Server-only functions for sensitive logic

### 6.2 Production Security Plan
If adopted professionally:
- JWT for all API conversions of server-side domain functions
- Replace SQLite with Postgres encrypted-at-rest
- Use Plaid for real transaction ingestion
- Apply robust input sanitization and train model to favor system prompt over user section for prompt injection prevention 

### 6.3 Model deployment:
- Enterprise GPU cluster, or on-device inference
- Utilize HTTPS-only transport
- Implement RBAC / OAuth / session tokens

## 7. UI/UX Design
### 7.1 Goals
- Zero cognitive friction
- Fast scanning
- Emotionally supportive financial coaching
- Dark/light mode
- Easy readability
### 7.2 Components
- shadcn/ui
- Cyber-orange color palette/corporate branding
- Chat interface with DM-style chat bubbles
**Production Plans:** style-match with host or parent app/website for consistent theming

## 8. Engineering Quality Practices
- Modular directory structure
- Server-only finance computation modules
- Modularized frontend components assembled in pages
- Maximal type-safety wherever possible, especially around AI communications and DB communications
- Smooth error boundaries
- Client components only where necessary (AI Insights, so that rest of page may server-load while waiting)
- Purposeful avoidance of global client state (local state per-component)
- Prisma schema normalized and validated

## 9. Future Enhancements
### 9.1 Short-Term
- User authentication with middleware
- Migration to Postgres encrypted-at-rest instance
- Statistical forecasting
- Debt payoff strategization for loans and revolving account balances
- Category auto-classification model
- Multi-currency support
- Adding colorblind mode, other accessibility settings(WCAG, Aria/Screenreader compatibility) for better incusive UI design

### 9.2 Long-Term
- Plaid Integration for real transaction data
- End-to-end encryption for all network traffic between APIs and UI
- Mobile app for frictionless access
- On-device model fine-tuning

## 10. Conclusion
FinGuardian demonstrates how a modern on-device AI-powered finance app can:
- Provide clarity into the complete picture
- Encourage and reinforce positive financial habits 
- Build trust with end users by promising responsible data handling
- Operate securely and provide world-class threat mitigation
- Scale into a massive production-ready platform when ready

Implementing deterministic calculation functions while allowing AI to perform reasoning on raw data creates a feature-complete financial data visualization application.  This allows models to do heavy lifting with inference, while providing empirical data calculated to yield more reliable insights.


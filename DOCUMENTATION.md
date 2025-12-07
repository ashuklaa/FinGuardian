```markdown
# FinGuardian — Technical Design Document

## 1. Overview

FinGuardian is a 48-hour prototype to showcase AI being applied in a fiduciary use case, utilizing raw financial transaction data into personalized, trustworthy insights.  

The success metrics used to evaluate completeness of this MVP:

- **Behavior change**
- **Financial visibility**
- **Security and trust**
- **AI-enhanced analysis**
- **Clean, maintainable code**

---

## 2. Core Requirements & Success Metrics

### Behavioral Change  
Finn, the AI assistant, provides:
- Specific, numeric suggestions  
- Rolling three month trend-based insights 
- Subscription creep detection  
- Spending spike detection  
- Encouraging, non-judgmental language  
- Actionable insights 

### Financial Visibility  
In addition to the capabilities of the AI Coach, data visualization is also an important aspect of understanding finances. This dashboard showcases the following metrics for a clean, all-around picture:
- Income, expenses, net savings  
- Category-level spending  
- Transaction history  
- Budget utilization  
- AI insights by month

### Security & Trust  
When handling financial data, it must be stored according to regulations and should convey a strong trust sentiment to end users. This MVP version exemplifies this ideology by implementing the following:
- Local, on-device LLM inference
- Prisma layer for DB integrity  
- Server-isolated data access (Client components cannot call data access api's or Prisma schemas directly)
- Production migration plan: 
  - Implement OAUTH/SSO
  - Gate API with JWT
  - Encrypting database at rest
  - Utilize secure 3rd-party financial APIs only (i.e. Plaid)

### AI Application  
Implemented using:
- On-device LLM via Ollama  
- A structured system prompt enforcing numeric grounding  
- Trend extraction using deterministic preprocessing  
- Per-month contextual analysis  
- User conversational memory fed into each LLM request  

---

## 3. System Architecture

### 3.1 High-Level Diagram

import { InsightInput } from "@/types/types";



export async function getFinanceInsights(input: InsightInput): Promise<string> {
	const prompt = buildPrompt(input);

	if (process.env.NODE_ENV === "development") console.log(prompt);
	const res = await fetch("http://localhost:11434/api/generate", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			model: "gemma2-9b-8k",
			prompt,
			stream: false,
		}),
	});

	if (!res.ok) {
		throw new Error("Failed to prompt model");
	}

	const data = await res.json();

	return data.response as string;
}

function buildPrompt(input: InsightInput) {
	const { totals, topSpendingCategories, topMerchants, budgets, rawTxData, userMessage, conversationHistory } = input;


	const recentTxLines = rawTxData
		.slice(-120)
		.map(
			(t) =>
				`${t.date} | ${t.month} | ${t.category} | ${t.merchant} | ${t.amount.toFixed(2)}`
		)
		.join("\n");
	const historyBlock = (conversationHistory ?? [])
		.map(
			(m) => `${m.role === "user" ? "User" : "Coach"}: ${m.content.trim()}`,
		)
		.join("\n");

	const userQuestionBlock = userMessage
		? `\nUSER QUESTION\n${userMessage.trim()}`
		: "";

	const outputFormat = userQuestionBlock == "" ? `
Intro paragraph (1–2 sentences on 3-month trends, except for when answering a user question).

- **2-4 Word Sub-heading:** Bullet 1 (with specific dollar amount and category)
- **2-4 Word Sub-heading:** Bullet 2 (with specific dollar amount and category)
- **2-4 Word Sub-heading:** Bullet 3 (with specific dollar amount and category)

Short closing sentence (1 sentence of encouragement related to their question).
		`: `
Intro paragraph specifically acknowledging user request (2 sentences or less).

**Relevant Data**
- **Itemized list of transactions, trends, and other data points related to question containing real dollar values for each item, followed by a summation at the bottom. Analyze any question-related trends as well.**.

**2-4 word bolded sub-heading** followed by 1-2 sentences of actionable tasks the user could take related to question.

Closing paragraph (1-2 sentences, containing empirically sourced encouragement grounded in provided and analyzed data, i.e. "Taking these actions could save as much as $X next month!", followed by emotional encouragement) 
`;

	return `
You are an objective, encouraging financial coach. Always respond in **English only** using **Markdown**.

The user is a busy young adult or variable-income earner who wants low-effort ways to improve their finances.

MONTH SUMMARY (CURRENT MONTH: ${input.monthLabel})
- Income: $${totals.income.toFixed(2)}
- Expenses: $${totals.expenses.toFixed(2)}
- Net savings: $${totals.net.toFixed(2)}

TOP SPENDING CATEGORIES (current month)
${topSpendingCategories
			.map((c) => `- ${c.category}: spent $${c.spent.toFixed(2)}`)
			.join("\n") || "- (no categories provided)"}

TOP MERCHANTS (current month)
${topMerchants
			.map((m) => `- ${m.merchant}: $${m.spent.toFixed(2)} this month`)
			.join("\n") || "- (no merchants provided)"}

BUDGETS OF CONCERN (status != "ok")
${budgets.length === 0
			? "- None. All tracked budgets are OK."
			: budgets
				.map(
					(b) =>
						`- ${b.category}: status=${b.status}, spent $${b.spent.toFixed(
							2,
						)} of $${b.limit.toFixed(2)} (${b.percent.toFixed(1)}% used)${b.isFixed ? " [fixed]" : ""
						}`
				)
				.join("\n")
		}

RAW TRANSACTIONS (LAST 3 CALENDAR MONTHS, oldest to newest)
Each line = date | monthKey | category | merchant | amount
Positive = income or inflow, negative = spending.

${recentTxLines || "(no transactions provided)"}

COACHING INSTRUCTIONS
- Use the **raw transactions over the last 3 months** to identify trends:
  - Are certain categories (e.g. Dining, Coffee, Shopping, Travel) increasing or decreasing?
  - Are there occasional spikes (e.g. one-time Travel or Shopping bursts)?
  - Are there stable, fixed expenses (e.g. Rent, Utilities)?
  - Are there recurring expenses like subscriptions (excluding rent and utilities)?
- Start with 1–2 sentences summarizing the overall trend over these 3 months in plain English.
- Then give **exactly 3 bullet points** of practical advice.
- Each bullet must reference **at least one numeric value** from the data (e.g. "You spent $X.XX on Y in the last 3 months" or "This month you spent $X.XX vs about $Y.YY previously").
- Focus on specific, low-effort changes (e.g. 1 fewer delivery order, brewing coffee at home twice a week).
- Never shame or scold. Keep tone supportive and realistic.

IMPORTANT RULES ABOUT NUMBERS
- Use only numeric values from this prompt. **Do NOT invent new dollar amounts.**
- You may compare months or add up spending, but you may not fabricate new categories or fake data.

FIXED VS FLEXIBLE SPENDING
- Budgets marked \`[fixed]\` are baseline commitments.
- Do **not** suggest moving, cancelling rent, or changing fixed bills unless rent + utilities clearly exceed ~50% of income.
- Prefer suggestions in flexible areas: Dining, Coffee, Shopping, Entertainment, Travel, etc.

CHAT CONTEXT
${historyBlock || "(no prior chat in this session)"}

NEW USER QUESTION: ${userQuestionBlock}

ADDITIONAL INSTRUCTIONS
- If a user question is provided, answer it directly and clearly, grounded in the data above.
- If a user question is provided, do not analyze **all* the data, utilize the Chat Context to scope analysis to relevant data.
- If a user question is provided, and contains a specific time period (i.e. this month, last month, last two weeks, last two months, etc.), explicitly respect that time period and do not use the entire transaction data range to devise an answer.
- Do not change or contradict the numeric facts in the prompt.
- If the question is unrelated to personal finance, politely redirect the user back to their spending, budgets, or saving habits.

OUTPUT FORMAT 
${outputFormat}

Do not include any Chinese characters or any language other than English.

`.trim();
}



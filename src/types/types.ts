export type CoachInsightsPanelClientProps = {
	year: number;
	monthIndex: number;
	userMessage?: string;
	conversationHistory?: string[];
};

export type InsightsState =
	| { status: "idle" | "loading"; text: null; error: null }
	| { status: "error"; text: null; error: string }
	| { status: "ready"; text: string; error: null };


export type DashboardSummary = {
	year: number;
	month: number;
	monthDisplay: string;
	grossIncome: number;
	grossExpense: number;
	netSavings: number;
	categoryExpenses: {
		category: string;
		amount: number;
	}[]
}

export type ConversationTurn = {
	role: "user" | "ai";
	content: string;
}

export type MerchantSummary = {
	merchant: string;
	spent: number;
};

export type InsightInput = {
	monthLabel: string;
	totals: {
		income: number;
		expenses: number;
		net: number;
	};
	topSpendingCategories: {
		category: string;
		spent: number;
		limit?: number;
	}[];
	topMerchants: {
		merchant: string;
		spent: number;
	}[];
	budgets: {
		category: string;
		limit: number;
		spent: number;
		remaining: number;
		percent: number;
		status: string;
		isFixed: boolean;

	}[];
	rawTxData: AITransaction[];
	userMessage?: string;
	conversationHistory?: ConversationTurn[];
}

export type AITransaction = {
	date: string;
	month: string;
	merchant: string;
	category: string;
	amount: number;
}

export type BudgetStatus = 'ok' | 'near' | 'over';

export type BudgetItem = {
	category: string;
	spendLimit: number;
	spentAmount: number;
	budgetRemaining: number;
	percentUtil: number,
	status: BudgetStatus,
	isFixed: boolean,

}
export type BudgetUtilization = {
	year: number,
	month: number,
	items: BudgetItem[],
}

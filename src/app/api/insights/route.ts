import { prisma } from "@/lib/db";
import { getFinanceInsights } from "@/server/ai/getFinanceInsights";
import { getMonthlyBudgetUtilization } from "@/server/budgets/getMonthlyBudgetUtilization";
import { getDashboardSummary } from "@/server/dashboard/getDashboardSummary";
import { getTopMerchants } from "@/server/merchants/getTopMerchants";
import { getTransactionsFromWindow } from "@/server/transactions/getTransactionsFromWindow";
import { InsightInput } from "@/types/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		// const { searchParams } = new URL(req.url);
		const body = await req.json();
		if (process.env.NODE_ENV === "development") console.log("BODY: ", body);
		const { paramYear, paramMonthIdx, userMessage, conversationHistory } = body;
		// const paramYear = searchParams.get("year");
		// const paramMonthIdx = searchParams.get("monthIndex");
		// const userMessage = searchParams.get("userMessage") ?? "";


		if (!paramYear || !paramMonthIdx) {
			return NextResponse.json(
				{ error: "Missing param monthIndex or year" },
				{ status: 400 },
			)
		}

		const year = Number(paramYear);
		const monthIdx = Number(paramMonthIdx);


		if (Number.isNaN(year) || Number.isNaN(monthIdx)) {
			return NextResponse.json(
				{ error: "Invalid year or monthIndex" },
				{ status: 400 },
			);
		}

		const user = await prisma.user.findFirst({
			where: { email: "ashuklaa@panw.com" },
		});


		if (!user) {
			return NextResponse.json(
				{ error: "User ashuklaa not found." },
				{ status: 404 },
			);
		}

		const userId = user.id;

		const [summary, budgetUtilization, topMerchants, transactions] = await Promise.all([
			getDashboardSummary(userId, year, monthIdx),
			getMonthlyBudgetUtilization(userId, year, monthIdx),
			getTopMerchants(userId, year, monthIdx, 5),
			getTransactionsFromWindow(userId, year, monthIdx)
		]);

		const topSpendingCategories = summary.categoryExpenses
			.filter((c) => c.amount < 0)
			.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount))
			.slice(0, 5)
			.map((c) => ({
				category: c.category,
				spent: Math.abs(c.amount),
				limit: budgetUtilization.items.find((i) => i.category === c.category)?.spendLimit ?? undefined
			}));


		const budgetStatus: InsightInput["budgets"] = budgetUtilization.items.map((b) => ({
			category: b.category,
			limit: b.spendLimit,
			spent: b.spentAmount,
			remaining: b.budgetRemaining,
			percent: b.percentUtil,
			status: b.status,
			isFixed: b.isFixed,
		}));

		const insightInput: InsightInput = {
			monthLabel: summary.monthDisplay,
			totals: {
				income: summary.grossIncome,
				expenses: Math.abs(summary.grossExpense),
				net: summary.netSavings,
			},
			topSpendingCategories,
			topMerchants,
			budgets: budgetStatus,
			rawTxData: transactions,
			userMessage,
			conversationHistory,
		};

		const insightsResponse = await getFinanceInsights(insightInput);





		return NextResponse.json({ insightsResponse });
	} catch (err) {
		console.error("Error in /api/insights:", err);
		return NextResponse.json(
			{ error: "Failed to generate insights" },
			{ status: 500 },
		);
	}
}

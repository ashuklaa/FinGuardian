import { prisma } from "@/lib/db";
import { BudgetStatus, BudgetUtilization } from "@/types/types";


export async function getMonthlyBudgetUtilization(userId: string, year?: number, month?: number): Promise<BudgetUtilization> {
	const requestYear = year ?? new Date().getFullYear()
	const requestMonth = month ?? new Date().getMonth()

	const monthStart = new Date(requestYear, requestMonth, 1, 0, 0, 0, 0)
	const monthEnd = new Date(requestYear, requestMonth + 1, 0, 23, 59, 59, 999)

	const categoryBudgets = await prisma.categoryBudget.findMany({
		where: {
			userId,
		},
	});
	const categoryTotals = await prisma.transaction.groupBy({
		by: ["category"],
		where: {
			userId,
			date: {
				gte: monthStart,
				lte: monthEnd,
			}
		},
		_sum: {
			amount: true,
		}
	})
	if (process.env.NODE_ENV === "development") console.log(categoryBudgets, categoryTotals)
	const spendMap = new Map<string, number>();
	for (const row of categoryTotals) {
		const spend = Math.abs(Number(row._sum.amount ?? 0))
		spendMap.set(row.category, spend)
	}

	const items = categoryBudgets.map((budget) => {
		const spendLimit = Number(budget.monthlyLimit ?? 0);
		const spentAmount = spendMap.get(budget.category) ?? 0;

		const budgetRemaining = Math.max(spendLimit - spentAmount, 0);
		const percentUtil = spendLimit > 0 ? (spentAmount / spendLimit) * 100 : 0;
		let status: BudgetStatus = 'ok' as const;

		if (percentUtil > 100)
			status = "over" as const;
		else if (percentUtil >= 70)
			status = "near" as const;

		return {
			category: budget.category,
			spendLimit,
			spentAmount,
			budgetRemaining,
			percentUtil,
			status,
			isFixed: budget.isFixed,
		};
	})


	return {
		year: requestYear,
		month: requestMonth,
		items,
	};
}

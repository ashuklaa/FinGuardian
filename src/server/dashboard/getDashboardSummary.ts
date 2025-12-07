import { prisma } from "@/lib/db";
import { DashboardSummary } from "@/types/types";


export const getDashboardSummary = async (userId: string, year?: number, month?: number): Promise<DashboardSummary> => {
	const now = new Date()


	const requestYear = year ?? now.getFullYear();
	const requestMonth = month ?? now.getMonth();

	const monthStart = new Date(requestYear, requestMonth, 1, 0, 0, 0, 0)
	const monthEnd = new Date(requestYear, requestMonth + 1, 0, 23, 59, 59, 999)

	if (process.env.NODE_ENV === "development") console.log(monthStart, monthEnd)

	const transactions = await prisma.transaction.findMany({
		where: {
			userId,
			date: {
				gte: monthStart,
				lte: monthEnd,
			}
		},
	});
	if (process.env.NODE_ENV === "development") console.log(transactions)

	let grossIncome = 0;
	let grossExpense = 0;

	const catMap = new Map<string, number>();

	for (const transaction of transactions) {
		const amt = Number(transaction.amount);

		if (amt > 0) {
			grossIncome += amt;
		} else {
			grossExpense += amt;
		}

		const currentCategoryTotal = catMap.get(transaction.category) ?? 0;
		catMap.set(transaction.category, currentCategoryTotal + amt)
	}

	const categoryExpenses = Array.from(catMap.entries()).map(([category, amount]) => ({
		category,
		amount,
	}));

	return {
		year: requestYear,
		month: requestMonth,
		monthDisplay: monthStart.toLocaleString("default", {
			month: "long",
			year: "numeric",
		}), grossIncome,
		grossExpense,
		netSavings: grossIncome + grossExpense,
		categoryExpenses,
	}
}


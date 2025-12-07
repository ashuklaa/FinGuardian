import { prisma } from "@/lib/db";
import { AITransaction } from "@/types/types";

export async function getTransactionsFromWindow(userId: string, year: number, monthIndex: number): Promise<AITransaction[]> {
	const monthWindowStart = monthIndex - 2; //quarter window arbitrary

	let startYear = year;
	let month = monthWindowStart;

	if (monthWindowStart < 0) {
		month = 12 + monthWindowStart;
		startYear = year - 1;
	}

	const windowStartDate = new Date(startYear, month, 1, 0, 0, 0, 0);
	const windowEndDate = new Date(year, monthIndex + 1, 0, 23, 59, 59, 999);

	const transactions = await prisma.transaction.findMany(
		{
			where: {
				userId,
				date: {
					gte: windowStartDate,
					lte: windowEndDate,
				}
			},
			orderBy: {
				date: "asc",
			}
		},
	);

	return transactions.map((t) => {
		const date = new Date(t.date as any);
		const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

		return {
			date: date.toISOString().slice(0, 10),
			month: monthKey,
			merchant: t.merchant,
			category: t.category,
			amount: Number(t.amount),
		};
	});


}


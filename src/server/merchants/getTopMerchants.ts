import { prisma } from "@/lib/db";
import { MerchantSummary } from "@/types/types";


export async function getTopMerchants(
	userId: string,
	year: number,
	month: number,
	limit = 3,
): Promise<MerchantSummary[]> {
	const start = new Date(year, month, 1, 0, 0, 0, 0);
	const end = new Date(year, month + 1, 0, 23, 59, 59, 999);

	const rows = await prisma.transaction.groupBy({
		by: ["merchant"],
		where: {
			userId,
			date: {
				gte: start,
				lte: end,
			},
			amount: {
				lt: 0,
			},
		},
		_sum: {
			amount: true,
		},
	});

	return rows
		.map((row) => ({
			merchant: row.merchant,
			spent: Math.abs(Number(row._sum.amount ?? 0)),
		}))
		.sort((a, b) => b.spent - a.spent)
		.slice(0, limit);
}

import { prisma } from "@/lib/db";
import { getDashboardSummary } from "@/server/dashboard/getDashboardSummary";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { ClientInsightsPanel } from "@/features/dashboard/components/ClientInsightsPanel";
import { getTransactionsFromWindow } from "@/server/transactions/getTransactionsFromWindow";
import { getMonthlyBudgetUtilization } from "@/server/budgets/getMonthlyBudgetUtilization";
import DashboardSummaryCard from "@/features/dashboard/components/DashboardSummaryCard";
import TransactionSummary from "@/features/dashboard/components/RecentTransactionsTable";
import CategorySpendingTable from "@/features/dashboard/components/SpendingByCategoryChart";
import BudgetSentry from "@/features/dashboard/components/budgetSentry";
import { Badge } from "@/components/ui/badge";


export const dynamic = "force-dynamic";

export function statusBadge(status: string) {
	switch (status) {
		case "over":
			return (
				<Badge className="bg-destructive/15 text-destructive border border-destructive/30" >
					Over budget
				</Badge>
			);
		case "near":
			return (
				<Badge className="bg-primary/10 text-primary border border-primary/30" >
					Near limit
				</Badge>
			);
		default:
			return (
				<Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 border border-emerald-500/30" >
					On track
				</Badge>
			);
	}
}


async function getDemoUserId() {
	const user = await prisma.user.findFirst({
		where: { email: "ashuklaa@panw.com" },
	});

	if (!user) {
		throw new Error("Demo user not found.");
	}

	return user.id;
}

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ month?: string }>; }) {
	const current = new Date();
	const params = await searchParams;

	let year = current.getFullYear();
	let month = current.getMonth();

	if (params.month) {
		const [yr, mth] = params.month.split("-").map(Number);
		year = yr;
		month = mth - 1;
	}

	const userId = await getDemoUserId();
	const [summary, transactionHistory, budgetUtilization] = await Promise.all([
		getDashboardSummary(userId, year, month),
		getTransactionsFromWindow(userId, year, month),
		getMonthlyBudgetUtilization(userId, year, month),
	]);

	const currentMonthKey = `${year}-${String(month + 1).padStart(2, "0")}`;
	const currentMonthTransactions = transactionHistory.filter((t) => t.month === currentMonthKey);

	const prevMonth = new Date(summary.year, summary.month - 1, 1);
	const nextMonth = new Date(summary.year, summary.month + 1, 1);

	const prevSearchParam = `${prevMonth.getFullYear()}-${String(prevMonth.getMonth() + 1).padStart(2, "0")}`;
	const nextSearchParam = `${nextMonth.getFullYear()}-${String(nextMonth.getMonth() + 1).padStart(2, "0")}`;

	const latestAllowed = new Date(current.getFullYear(), current.getMonth(), 1);

	const isNextDisabled =
		nextMonth.getFullYear() > latestAllowed.getFullYear() ||
		(nextMonth.getFullYear() === latestAllowed.getFullYear() &&
			nextMonth.getMonth() > latestAllowed.getMonth());

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold tracking-tight">
					Overview — {summary.monthDisplay}
				</h1>

				<div className="flex items-center gap-2">
					<Button variant="outline" size="icon" asChild>
						<Link href={`/dashboard?month=${prevSearchParam}`}>
							<ChevronLeft className="w-4 h-4" />
						</Link>
					</Button>

					{isNextDisabled ? (
						<Button
							variant="outline"
							size="icon"
							disabled
						>
							<ChevronRight className="w-4 h-4" />
						</Button>
					) : (
						<Button variant="outline" size="icon" asChild>
							<Link href={`/dashboard?month=${nextSearchParam}`}>
								<ChevronRight className="w-4 h-4" />
							</Link>
						</Button>
					)}
				</div>
			</div>
			<DashboardSummaryCard summary={summary} />
			<ClientInsightsPanel year={year} monthIndex={month} />
			<div className="grid gap-4 md:grid-cols-2">
				<TransactionSummary summary={summary} currentMonthTransactions={currentMonthTransactions} />
				<CategorySpendingTable summary={summary} />
			</div>
			<BudgetSentry budgetUtilization={budgetUtilization} />
		</div >
	);
}

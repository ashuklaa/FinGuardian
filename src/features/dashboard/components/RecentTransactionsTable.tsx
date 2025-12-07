import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatCurrency } from "@/lib/utils";
import { AITransaction, DashboardSummary } from "@/types/types";

export default function TransactionSummary({ summary, currentMonthTransactions }: { summary: DashboardSummary, currentMonthTransactions: AITransaction[] }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Transactions — {summary.monthDisplay}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-2">
					{currentMonthTransactions.length === 0 ? (
						<p className="text-sm text-muted-foreground">
							No transactions recorded for this month.
						</p>
					) : (
						currentMonthTransactions
							.slice(-15) // cap rows for UI
							.reverse()
							.map((t) => (
								<div
									key={`${t.date}-${t.merchant}-${t.amount}-${t.category}`}
									className="flex items-center justify-between text-xs py-1 border-b border-border/40 last:border-none"
								>
									<div className="flex flex-col">
										<span className="font-medium">{t.merchant}</span>
										<span className="text-[0.7rem] text-muted-foreground">
											{t.date} · {t.category}
										</span>
									</div>
									<span
										className={cn(
											"font-semibold",
											t.amount < 0 ? "text-primary" : "text-emerald-500",
										)}
									>
										{t.amount < 0 ? "-" : "+"}
										{formatCurrency(Math.abs(t.amount))}
									</span>
								</div>
							))
					)}
				</div>
			</CardContent >
		</Card>
	)

}

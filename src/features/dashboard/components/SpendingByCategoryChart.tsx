import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { DashboardSummary } from "@/types/types";


export default function CategorySpendingTable({ summary }: { summary: DashboardSummary }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Spending by Category</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-2">
					{summary.categoryExpenses
						.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount))
						.filter((cat) => cat.category !== "Income")
						.map((c) => (
							<div key={c.category} className="flex justify-between py-2 border-b border-border last:border-none">
								<span>{c.category}</span>
								<span>{formatCurrency(Math.abs(c.amount))}</span>
							</div>
						))}
				</div>
			</CardContent>
		</Card>
	)
}


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { DashboardSummary } from "@/types/types";

export default function DashboardSummaryCard({ summary }: { summary: DashboardSummary }) {

	return (

		<div className="grid gap-4 md:grid-cols-3">
			<Card>
				<CardHeader>
					<CardTitle>Total Income</CardTitle>
				</CardHeader>
				<CardContent className="text-2xl font-bold">
					{formatCurrency(summary.grossIncome)}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Total Expenses</CardTitle>
				</CardHeader>
				<CardContent className="text-2xl font-bold">
					{formatCurrency(Math.abs(summary.grossExpense))}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Net Savings</CardTitle>
				</CardHeader>
				<CardContent className="text-2xl font-bold">
					{formatCurrency(summary.netSavings)}
				</CardContent>
			</Card>
		</div>

	)
}

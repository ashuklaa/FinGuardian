import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BudgetUtilization } from "@/types/types";
import { formatCurrency } from "@/lib/utils";
import { statusBadge } from "@/app/(appPrivate)/dashboard/page";

export default function BudgetSentry({ budgetUtilization }: { budgetUtilization: BudgetUtilization }) {
	return (

		<Card>
			<CardHeader>
				<CardTitle>Budget Sentry</CardTitle>
			</CardHeader>
			<CardContent>
				{budgetUtilization.items.length === 0 ? (
					<p className="text-sm text-muted-foreground">
						No budgets configured yet for this month.
					</p>
				) : (
					<div className="space-y-6">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Category</TableHead>
									<TableHead className="text-right">Limit</TableHead>
									<TableHead className="text-right">Spent</TableHead>
									<TableHead className="text-right">Remaining</TableHead>
									<TableHead className="text-right">Usage</TableHead>
									<TableHead className="text-right">Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{budgetUtilization.items.sort((a, b) => {
									const order: Record<string, number> = {
										over: 0,
										near: 1,
										ok: 2,
									};

									const statusDiff = (order[a.status] ?? 3) - (order[b.status] ?? 3);
									if (statusDiff !== 0) return statusDiff;

									return b.percentUtil - a.percentUtil;
								})


									.map((item) => {
										const safePercent = Math.min(Math.max(item.percentUtil, 0), 999);

										return (
											<TableRow key={item.category}>
												<TableCell className="font-medium">{item.category}</TableCell>
												<TableCell className="text-right">
													{formatCurrency(item.spendLimit)}
												</TableCell>
												<TableCell className="text-right">
													{formatCurrency(Math.abs(item.spentAmount))}
												</TableCell>
												<TableCell className="text-right">
													{formatCurrency(item.budgetRemaining)}
												</TableCell>
												<TableCell className="text-right">
													<div className="flex flex-col items-end gap-1">
														<span className="text-xs text-muted-foreground">
															{safePercent.toFixed(0)}%
														</span>
														<div className="w-40">
															<Progress value={Math.min(safePercent, 100)} />
														</div>
													</div>
												</TableCell>
												<TableCell className="text-right">
													{statusBadge(item.status)}
												</TableCell>
											</TableRow>
										);
									})}
							</TableBody>
						</Table>

						{/* Optional: small legend */}
						<div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
							<span>
								<span className="inline-block h-2 w-2 rounded-full bg-emerald-500 mr-1" />
								On track
							</span>
							<span>
								<span className="inline-block h-2 w-2 rounded-full bg-primary mr-1" />
								Near limit
							</span>
							<span>
								<span className="inline-block h-2 w-2 rounded-full bg-destructive mr-1" />
								Over budget
							</span>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	)


}

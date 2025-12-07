"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CoachChatInput } from "./ChatInput";
import { CoachInsightsPanelClientProps, ConversationTurn, InsightsState } from "@/types/types";

function CoachInsightsSkeleton() {
	return (
		<Card className="border-dashed border-border">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Sparkles />
					Finn AI - Financial Insights
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-3">
					<div className="h-3 w-5/6 rounded-full bg-muted animate-pulse" />
					<div className="h-3 w-4/5 rounded-full bg-muted animate-pulse" />
					<div className="h-3 w-3/5 rounded-full bg-muted animate-pulse" />
				</div>
				<div className="mt-4 h-2 w-2/3 rounded-full bg-muted/70 animate-pulse" />
			</CardContent>
		</Card>
	);
}

function ChatHistory({ messages }: { messages: ConversationTurn[] }) {
	return (
		<div className="mt-4 space-y-3 max-h-105 overflow-y-auto pr-1">
			{messages.length === 0 ? (
				<p className="text-xs text-muted-foreground">
					Ask a question to start a conversation with your coach about this month’s spending.
				</p>
			) : (
				messages.map((m, idx) => {
					const isUser = m.role === "user";

					return (
						<div
							key={idx}
							className={`flex ${isUser ? "justify-end" : "justify-start"}`}
						>
							<div
								className={[
									"max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm whitespace-pre-wrap",
									isUser
										? "bg-primary/85 text-primary-foreground rounded-br-sm"
										: "bg-muted text-foreground rounded-bl-sm",
								].join(" ")}
							>

								<ReactMarkdown remarkPlugins={[remarkGfm]}>
									{m.content}
								</ReactMarkdown>
							</div>
						</div>
					);
				})
			)}
		</div>
	);
}

export function ClientInsightsPanel({
	year,
	monthIndex,
	userMessage,
	conversationHistory
}: CoachInsightsPanelClientProps) {
	const [state, setState] = useState<InsightsState>({
		status: "idle",
		text: null,
		error: null,
	});
	const [isLoading, setIsLoading] = useState(false);
	const [messages, setMessages] = useState<ConversationTurn[]>([]);

	async function handleSend(message: string) {
		const trimmed = message.trim();
		if (!trimmed || isLoading) return;
		setIsLoading(true);
		const convHistWithNewMsg: ConversationTurn[] = [
			...messages,
			{
				role: "user" as const,
				content: trimmed,
			},
		];
		setMessages(convHistWithNewMsg);
		try {
			const res = await fetch("/api/insights", {
				method: "POST",
				cache: "no-store",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					paramYear: year,
					paramMonthIdx: monthIndex,
					userMessage: trimmed,
					conversationHistory: convHistWithNewMsg,
				}),
			});

			if (!res.ok) {
				throw new Error("Failed to fetch insights");
			}

			const data = await res.json();

			const aiResponse: string =
				(data.insightsResponse ?? "").trim();

			if (aiResponse) {
				setMessages((prev: ConversationTurn[]) => [
					...prev,
					{
						role: "ai" as const,
						content: aiResponse,
					},
				]);
			}
		} catch (err) {
			console.error("Error sending message to coach:", err);
			setMessages((prev: ConversationTurn[]) => [
				...prev,
				{
					role: "ai" as const,
					content:
						"I ran into a problem generating a response. Please try again in a moment.",
				},
			]);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		let cancelled = false;

		setState({ status: "loading", text: null, error: null });
		setMessages([]);

		async function load() {
			try {
				const res = await fetch("/api/insights", {
					method: "POST",
					cache: "no-store",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						paramYear: year,
						paramMonthIdx: monthIndex,
						userMessage: userMessage ?? "",
						conversationHistory: conversationHistory ?? [],
					}),
				});

				if (!res.ok) {
					throw new Error("Failed to fetch insights");
				}

				const data = await res.json();

				if (cancelled) return;

				setState({
					status: "ready",
					text: data.insightsResponse ?? "",
					error: null,
				});
			} catch (err) {
				if (cancelled) return;
				setState({
					status: "error",
					text: null,
					error: "Could not load insights right now.",
				});
			}
		}

		load();

		return () => {
			cancelled = true;
		};
	}, [year, monthIndex]);

	if (state.status === "loading" || state.status === "idle") {
		return <>
			<CoachInsightsSkeleton />
			<ChatHistory messages={messages} />
			<CoachChatInput onSendAction={handleSend} isLoading={isLoading} />
		</>
	}

	if (state.status === "error" || !state.text) {
		return (
			<Card className="border-primary/40">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Sparkles />
						Finn AI - Financial Insights
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">
						{state.error ?? "No insights available for this month yet."}
					</p>


					<ChatHistory messages={messages} />
					<CoachChatInput onSendAction={handleSend} isLoading={isLoading} />
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="border-primary/40">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Sparkles />
					Finn AI - Financial Insights
				</CardTitle>
			</CardHeader>
			<CardContent>
				<h2 className="text-xl font-semibold tracking-tight">Monthly Insights</h2>
				<div className="p-4 rounded-xl bg-muted/30 border border-border prose dark:prose-invert max-w-none text-md leading-relaxed dm-bubble">
					<ReactMarkdown remarkPlugins={[remarkGfm]}>
						{state.text}
					</ReactMarkdown>
				</div>


				<Separator className="my-4" />
				<h2 className="text-xl font-semibold tracking-tight">Finn Chat</h2>
				<ChatHistory messages={messages} />
				<CoachChatInput onSendAction={handleSend} isLoading={isLoading} />

				<p className="mt-3 text-[0.7rem] text-muted-foreground">
					Generated on-device by Gemma2:9b from provided transactions, categories, and
					budgets. AI may produce inaccurate information, always verify output.
				</p>
			</CardContent>
		</Card>
	);
}

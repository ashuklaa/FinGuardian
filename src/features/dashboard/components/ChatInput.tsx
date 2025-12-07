"use client";

import { useState, KeyboardEvent, FormEvent } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type CoachChatInputProps = {
	onSendAction: (message: string) => Promise<void> | void;
	isLoading?: boolean;
};

export function CoachChatInput({ onSendAction, isLoading }: CoachChatInputProps) {
	const [value, setValue] = useState("");

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		const trimmed = value.trim();
		if (!trimmed || isLoading) return;

		await onSendAction(trimmed);
		setValue("");
	}

	function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			void handleSubmit(e as unknown as FormEvent);
		}
	}

	return (
		<>
			<Separator className="my-4" />

			<form
				onSubmit={handleSubmit}
				className="space-y-2"
			>
				<div className="flex items-end gap-2">
					<Textarea
						value={value}
						onChange={(e) => setValue(e.target.value)}
						onKeyDown={handleKeyDown}
						rows={2}
						placeholder="Why is my spending higher this month compared to last month?"
						className="min-h-[20px] resize-none text-sm"
						disabled={isLoading}
					/>

					<Button
						type="submit"
						size="icon"
						disabled={isLoading || !value.trim()}
						className="min-h-[20px]"
					>
						{isLoading ? (
							<span className="h-4 w-4 animate-pulse rounded-full border-2 border-primary border-r-transparent" />
						) : (
							<span className="text-sm font-semibold">➤</span>
						)}
					</Button >
				</div>

				<p className="text-[0.7rem] text-muted-foreground">
					Press <span className="font-mono">Enter</span> to send,{" "}
					<span className="font-mono">Shift+Enter</span> for a new line.
				</p>
			</form>
		</>
	);
}

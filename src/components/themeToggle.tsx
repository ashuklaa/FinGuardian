"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

export function ThemeToggle() {
	const [theme, setTheme] = useState<Theme>("light");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);

		const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;

		if (stored === "dark" || stored === "light") {
			applyTheme(stored as Theme);
			return;
		}

		if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			applyTheme("dark");
		} else {
			applyTheme("light");
		}
	}, []);

	function applyTheme(next: Theme) {
		setTheme(next);

		const root = document.documentElement;

		if (next === "dark") {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}

		try {
			localStorage.setItem("theme", next);
		} catch {
		}
	}

	if (!mounted) {
		return null;
	}

	const isDark = theme === "dark";

	return (
		<Button
			type="button"
			variant="outline"
			size="icon"
			onClick={() => applyTheme(isDark ? "light" : "dark")}
			aria-label="Toggle dark mode"
			className="relative"
		>
			<Sun
				className={`h-4 w-4 transition-all ${isDark ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
					}`}
			/>
			<Moon
				className={`h-4 w-4 absolute transition-all ${isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"
					}`}
			/>
		</Button>
	);
}

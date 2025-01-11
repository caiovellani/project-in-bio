import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

export default function Button({
	children,
	variant = "primary",
	...props
}: {
	children: ReactNode;
	variant?: "primary" | "secondary" | "ghost";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			{...props}
			className={cn(
				"p-3 text-white rounded-xl font-bold whitespace-nowrap hover:opacity-95 disabled:opacity-70",
				variant === "primary" && "bg-accent-purple",
				variant === "secondary" && "bg-background-tertiary",
				variant === "ghost" && "border-border-primary",
			)}
		>
			{children}
		</button>
	);
}

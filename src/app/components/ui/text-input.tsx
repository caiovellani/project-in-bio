import { cn } from "../../lib/utils";

export default function TextInput(
	props: React.InputHTMLAttributes<HTMLInputElement>,
) {
	return (
		<input
			{...props}
			className={cn(
				`
        w-full p-3 bg-background-secondary text-white placeholder:text-content-placeholder rounded-xl 
        border border-transparent hover:border-border-secondary hover:text-content-body active:border-border-tertiary focus:outline-none focus:ring-2 focus:ring-purple-600
      `,
				props.className,
			)}
		/>
	);
}

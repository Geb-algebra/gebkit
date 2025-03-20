import * as React from "react";

import { cn } from "~/utils/css";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
	return (
		<textarea
			data-slot="textarea"
			className={cn(
				"border-input bg-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30",
				"shadow-neumorphic-hole rounded-md flex field-sizing-content min-h-16 w-full px-4 py-3 text-base transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus:shadow-neumorphic-button-pressed disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				className,
			)}
			{...props}
		/>
	);
}

export { Textarea };

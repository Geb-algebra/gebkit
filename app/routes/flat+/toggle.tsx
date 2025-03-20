import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import fs from "node:fs";
import path from "node:path";
import React from "react";
import { Toggle } from "~/components/flat/toggle";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/toggle";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/toggle.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["@radix-ui/react-toggle"],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	const [boldPressed, setBoldPressed] = React.useState(false);
	const [italicPressed, setItalicPressed] = React.useState(false);
	const [underlinePressed, setUnderlinePressed] = React.useState(false);

	return (
		<ComponentPage name="Toggle" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="grid gap-8">
				{/* Basic Toggle */}
				<div className="space-y-2">
					<h4 className="text-sm font-medium">Basic Toggle</h4>
					<div className="flex flex-wrap gap-2">
						<Toggle aria-label="Toggle bold">
							<BoldIcon className="h-4 w-4" />
						</Toggle>
						<Toggle aria-label="Toggle italic">
							<ItalicIcon className="h-4 w-4" />
						</Toggle>
						<Toggle aria-label="Toggle underline">
							<UnderlineIcon className="h-4 w-4" />
						</Toggle>
					</div>
				</div>

				{/* Toggle with state */}
				<div className="space-y-2">
					<h4 className="text-sm font-medium">Toggle with state</h4>
					<div className="flex flex-wrap gap-2">
						<Toggle aria-label="Toggle bold" pressed={boldPressed} onPressedChange={setBoldPressed}>
							<BoldIcon className="h-4 w-4" />
						</Toggle>
						<Toggle
							aria-label="Toggle italic"
							pressed={italicPressed}
							onPressedChange={setItalicPressed}
						>
							<ItalicIcon className="h-4 w-4" />
						</Toggle>
						<Toggle
							aria-label="Toggle underline"
							pressed={underlinePressed}
							onPressedChange={setUnderlinePressed}
						>
							<UnderlineIcon className="h-4 w-4" />
						</Toggle>
					</div>
					<div className="mt-4 p-4 border rounded-md">
						<p
							className={`${boldPressed ? "font-bold" : ""} ${italicPressed ? "italic" : ""} ${underlinePressed ? "underline" : ""}`}
						>
							This text changes based on the toggle states.
						</p>
					</div>
				</div>

				{/* Toggle Variants */}
				<div className="space-y-2">
					<h4 className="text-sm font-medium">Toggle Variants</h4>
					<div className="flex flex-wrap gap-2">
						<Toggle variant="default" aria-label="Toggle default">
							Default
						</Toggle>
						<Toggle variant="outline" aria-label="Toggle outline">
							Outline
						</Toggle>
					</div>
				</div>

				{/* Toggle Sizes */}
				<div className="space-y-2">
					<h4 className="text-sm font-medium">Toggle Sizes</h4>
					<div className="flex flex-wrap gap-2 items-center">
						<Toggle size="sm" aria-label="Toggle small">
							<BoldIcon className="h-3 w-3" />
						</Toggle>
						<Toggle size="default" aria-label="Toggle default">
							<BoldIcon className="h-4 w-4" />
						</Toggle>
						<Toggle size="lg" aria-label="Toggle large">
							<BoldIcon className="h-5 w-5" />
						</Toggle>
					</div>
				</div>

				{/* Toggle Group Example */}
				<div className="space-y-2">
					<h4 className="text-sm font-medium">Toggle Group (using flex)</h4>
					<div className="inline-flex rounded-md border shadow-sm">
						<Toggle
							variant="outline"
							className="rounded-r-none border-r-0"
							aria-label="Toggle bold"
						>
							<BoldIcon className="h-4 w-4" />
						</Toggle>
						<Toggle
							variant="outline"
							className="rounded-none border-x-0"
							aria-label="Toggle italic"
						>
							<ItalicIcon className="h-4 w-4" />
						</Toggle>
						<Toggle
							variant="outline"
							className="rounded-l-none border-l-0"
							aria-label="Toggle underline"
						>
							<UnderlineIcon className="h-4 w-4" />
						</Toggle>
					</div>
				</div>

				{/* Disabled Toggle */}
				<div className="space-y-2">
					<h4 className="text-sm font-medium">Disabled Toggle</h4>
					<div className="flex flex-wrap gap-2">
						<Toggle disabled aria-label="Toggle disabled">
							<BoldIcon className="h-4 w-4" />
						</Toggle>
						<Toggle variant="outline" disabled aria-label="Toggle outline disabled">
							Disabled
						</Toggle>
					</div>
				</div>
			</div>
		</ComponentPage>
	);
}

import { ChevronsUpDownIcon } from "lucide-react";
import fs from "node:fs";
import path from "node:path";
import React from "react";
import { Button } from "~/components/flat/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/flat/collapsible";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/collapsible";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/collapsible.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["@radix-ui/react-collapsible"],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<ComponentPage name="Collapsible" dependencies={loaderData.dependencies} code={loaderData.code}>
			<Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full max-w-md space-y-2">
				<div className="flex items-center justify-between space-x-4 px-4">
					<h4 className="text-sm font-semibold">@johndoe</h4>
					<CollapsibleTrigger asChild>
						<Button variant="ghost" size="sm" className="w-9 p-0">
							<ChevronsUpDownIcon className="h-4 w-4" />
							<span className="sr-only">Toggle</span>
						</Button>
					</CollapsibleTrigger>
				</div>
				<div className="rounded-md border px-4 py-3 font-mono text-sm">Last seen: 2 hours ago</div>
				<CollapsibleContent className="space-y-2">
					<div className="rounded-md border px-4 py-3 font-mono text-sm">
						Email: john.doe@example.com
					</div>
					<div className="rounded-md border px-4 py-3 font-mono text-sm">Status: Active</div>
					<div className="rounded-md border px-4 py-3 font-mono text-sm">Role: Developer</div>
				</CollapsibleContent>
			</Collapsible>
		</ComponentPage>
	);
}

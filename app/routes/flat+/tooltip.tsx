import fs from "node:fs";
import path from "node:path";
import { Button } from "~/components/flat/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "~/components/flat/tooltip";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/tooltip";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/tooltip.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["@radix-ui/react-tooltip"],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<ComponentPage name="Tooltip" dependencies={loaderData.dependencies} code={loaderData.code}>
			<TooltipProvider>
				<div className="flex items-center gap-4">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="outline">Hover Me</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>This is a tooltip</p>
						</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="outline">Top Tooltip</Button>
						</TooltipTrigger>
						<TooltipContent side="top">
							<p>Appears on top</p>
						</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="outline">Bottom Tooltip</Button>
						</TooltipTrigger>
						<TooltipContent side="bottom">
							<p>Appears on bottom</p>
						</TooltipContent>
					</Tooltip>
				</div>
			</TooltipProvider>
		</ComponentPage>
	);
}

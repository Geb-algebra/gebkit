import fs from "node:fs";
import path from "node:path";
import { Button } from "~/components/flat/button";
import { Input } from "~/components/flat/input";
import { Label } from "~/components/flat/label";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/flat/popover";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/popover";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/popover.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["@radix-ui/react-popover"],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<ComponentPage name="Popover" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="flex flex-col items-center gap-8">
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="outline">Open popover</Button>
					</PopoverTrigger>
					<PopoverContent className="w-80">
						<div className="grid gap-4">
							<div className="space-y-2">
								<h4 className="font-medium leading-none">Dimensions</h4>
								<p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
							</div>
							<div className="grid gap-2">
								<div className="grid grid-cols-3 items-center gap-4">
									<Label htmlFor="width">Width</Label>
									<Input id="width" defaultValue="100%" className="col-span-2 h-8" />
								</div>
								<div className="grid grid-cols-3 items-center gap-4">
									<Label htmlFor="maxWidth">Max. width</Label>
									<Input id="maxWidth" defaultValue="300px" className="col-span-2 h-8" />
								</div>
								<div className="grid grid-cols-3 items-center gap-4">
									<Label htmlFor="height">Height</Label>
									<Input id="height" defaultValue="25px" className="col-span-2 h-8" />
								</div>
								<div className="grid grid-cols-3 items-center gap-4">
									<Label htmlFor="maxHeight">Max. height</Label>
									<Input id="maxHeight" defaultValue="none" className="col-span-2 h-8" />
								</div>
							</div>
						</div>
					</PopoverContent>
				</Popover>
			</div>
		</ComponentPage>
	);
}

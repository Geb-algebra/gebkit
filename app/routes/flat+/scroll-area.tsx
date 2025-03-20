import fs from "node:fs";
import path from "node:path";
import { ScrollArea } from "~/components/flat/scroll-area";
import { Separator } from "~/components/flat/separator";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/scroll-area";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/scroll-area.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["@radix-ui/react-scroll-area"],
	};
}

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<ComponentPage name="Scroll Area" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="grid gap-8">
				<div className="grid gap-2">
					<h4 className="text-sm font-medium">Vertical Scroll</h4>
					<ScrollArea className="h-72 w-48 rounded-md border">
						<div className="p-4">
							<h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
							{tags.map((tag) => (
								<div key={tag} className="text-sm">
									{tag}
									<Separator className="my-2" />
								</div>
							))}
						</div>
					</ScrollArea>
				</div>

				<div className="grid gap-2">
					<h4 className="text-sm font-medium">Horizontal Scroll</h4>
					<ScrollArea className="w-96 whitespace-nowrap rounded-md border">
						<div className="flex w-max space-x-4 p-4">
							{Array.from({ length: 50 }, (_, i) => (
								<div key={`item-${i}`} className="w-40 shrink-0 rounded-md border p-4">
									<div className="font-medium">Item {i + 1}</div>
									<div className="text-sm text-muted-foreground">Description for item {i + 1}</div>
								</div>
							))}
						</div>
					</ScrollArea>
				</div>
			</div>
		</ComponentPage>
	);
}

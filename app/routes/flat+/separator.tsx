import fs from "node:fs";
import path from "node:path";
import { Separator } from "~/components/flat/separator";
import ComponentPage from "~/components/page/ComponentPage";
import type { Route } from "./+types/separator";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/flat/separator.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["@radix-ui/react-separator"],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<ComponentPage name="Separator" dependencies={loaderData.dependencies} code={loaderData.code}>
			<div className="grid gap-8 max-w-3xl">
				<div>
					<div className="space-y-1">
						<h4 className="text-sm font-medium leading-none">Horizontal Separator</h4>
						<p className="text-sm text-muted-foreground">A visual divider between content</p>
					</div>
					<Separator className="my-4" />
					<div className="flex h-5 items-center space-x-4 text-sm">
						<div>Settings</div>
						<Separator orientation="vertical" />
						<div>Account</div>
						<Separator orientation="vertical" />
						<div>Profile</div>
					</div>
				</div>

				<div className="flex space-x-10">
					<div className="space-y-4">
						<h4 className="text-sm font-medium leading-none">Vertical Separator</h4>
						<Separator orientation="vertical" className="h-32" />
					</div>

					<div className="grid gap-4">
						<h4 className="text-sm font-medium leading-none">Custom Styling</h4>
						<Separator className="my-2 bg-primary" />
						<Separator className="my-2 bg-red-500" />
						<Separator className="my-2 bg-green-500" />
						<Separator className="my-2 bg-blue-500" />
					</div>

					<div className="flex h-40 items-start">
						<div className="space-y-2 pr-4">
							<h4 className="text-sm font-medium leading-none">Left Column</h4>
							<p className="text-sm text-muted-foreground">Content on the left</p>
						</div>
						<Separator orientation="vertical" className="h-full mx-4" />
						<div className="space-y-2 pl-4">
							<h4 className="text-sm font-medium leading-none">Right Column</h4>
							<p className="text-sm text-muted-foreground">Content on the right</p>
						</div>
					</div>
				</div>
			</div>
		</ComponentPage>
	);
}

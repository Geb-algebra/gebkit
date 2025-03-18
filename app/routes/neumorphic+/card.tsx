import fs from "node:fs";
import path from "node:path";
import { Label } from "~/components/flat/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/flat/select";
import { Button } from "~/components/neumorphic/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/neumorphic/card";
import ComponentPage from "~/components/page/ComponentPageNeumo";
import type { Route } from "./+types/switch";

export async function loader({ request }: Route.LoaderArgs) {
	const code = await fs.promises.readFile(
		path.join(process.cwd(), "app/components/neumorphic/switch.tsx"),
		"utf-8",
	);
	return {
		code,
		dependencies: ["@radix-ui/react-switch"],
	};
}

export default function Page({ loaderData }: Route.ComponentProps) {
	return (
		<ComponentPage name="Switch" dependencies={loaderData.dependencies} code={loaderData.code}>
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>Create project</CardTitle>
					<CardDescription>Deploy your new project in one-click.</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="name">Name</Label>
								<input id="name" placeholder="Name of your project" />
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="framework">Framework</Label>
								<Select>
									<SelectTrigger id="framework">
										<SelectValue placeholder="Select" />
									</SelectTrigger>
									<SelectContent position="popper">
										<SelectItem value="next">Next.js</SelectItem>
										<SelectItem value="sveltekit">SvelteKit</SelectItem>
										<SelectItem value="astro">Astro</SelectItem>
										<SelectItem value="nuxt">Nuxt.js</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button variant="outline">Cancel</Button>
					<Button>Deploy</Button>
				</CardFooter>
			</Card>
		</ComponentPage>
	);
}
